import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios from '@/api/axios';
import { MutationConfig } from '@/api/react-query';
import { useAuth } from '@/context/AuthProvider';

export function getGuestEnergyQueryKey(userId?: number) {
  return ['guest-energy', userId];
}

export async function getGuestEnergy(userId: number): Promise<Api.GuestEnergy | null> {
  try {
    return await axios.get<Api.GuestEnergy>(`/users/${userId}/guest-energy`) as unknown as Api.GuestEnergy;
  } catch (error: any) {
    if (error?.response?.status === 500 || error?.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

async function replaceGuestPartners(userId: number, partners: Api.Partner[]) {
  const payload = partners.map((partner) => ({
    names: partner.names,
    lastName: partner.lastName,
    scdLastName: partner.scdLastName,
    date: partner.date,
  }));

  try {
    // Reemplazo atómico (deleteMany + create en una transacción en el backend).
    await axios.put(`/users/${userId}/guest-energy/partners`, { partners: payload });
    return;
  } catch (error) {
    // Fallback para backends sin el endpoint atómico desplegado todavía.
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      throw error;
    }
  }

  // Fallback no atómico (borrar-todo + recrear). Quitar cuando el endpoint
  // atómico esté desplegado en todos los entornos.
  const currentGuestEnergy = await getGuestEnergy(userId);

  if (currentGuestEnergy?.guestPartners?.length) {
    await Promise.all(
      currentGuestEnergy.guestPartners.map((partner) => (
        axios.delete(`/users/${userId}/guest-energy/partners/${partner.id}`)
      )),
    );
  }

  await Promise.all(
    payload.map((partner) => (
      axios.post(`/users/${userId}/guest-energy/partners`, partner)
    )),
  );
}

async function replaceGuestGroupMembers(userId: number, members: Api.GroupMember[]) {
  const payload = members.map((member) => ({
    name: member.name,
    lastName: member.lastName,
    scdLastName: member.scdLastName,
    date: member.date,
    dateInit: member.dateInit,
  }));

  try {
    // Reemplazo atómico (deleteMany + create en una transacción en el backend).
    await axios.put(`/users/${userId}/guest-energy/group-members`, { members: payload });
    return;
  } catch (error) {
    // Fallback para backends sin el endpoint atómico desplegado todavía.
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      throw error;
    }
  }

  // Fallback no atómico (borrar-todo + recrear). Quitar cuando el endpoint
  // atómico esté desplegado en todos los entornos.
  const currentGuestEnergy = await getGuestEnergy(userId);

  if (currentGuestEnergy?.guestGroupMembers?.length) {
    await Promise.all(
      currentGuestEnergy.guestGroupMembers.map((member) => (
        axios.delete(`/users/${userId}/guest-energy/group-members/${member.id}`)
      )),
    );
  }

  await Promise.all(
    payload.map((member) => (
      axios.post(`/users/${userId}/guest-energy/group-members`, member)
    )),
  );
}

export async function saveGuestEnergy({
  userId,
  guestEnergy,
}: {
  userId: number;
  guestEnergy: Api.GuestEnergyPartner | Api.GuestEnergyGroup;
}) {
  const isPartner = 'guestPartner' in guestEnergy;

  if (isPartner) {
    await axios.post(`/users/${userId}/guest-energy`, {
      partnerName: guestEnergy.name,
      partnerMeetYear: guestEnergy.guestMeetYear,
      groupName: null,
      groupYear: null,
    });

    await replaceGuestPartners(userId, guestEnergy.guestPartner);
  } else {
    await axios.post(`/users/${userId}/guest-energy`, {
      partnerName: null,
      partnerMeetYear: null,
      groupName: guestEnergy.name,
      groupYear: guestEnergy.guestYearGroup,
    });

    await replaceGuestGroupMembers(userId, guestEnergy.guestGroup);
  }

  return getGuestEnergy(userId);
}

function mapGuestEnergyToLegacySession(guestEnergy: Api.GuestEnergy | null): Api.GuestSession {
  if (!guestEnergy) {
    return {
      guestEnergyPartner: {
        name: '',
        guestPartner: [],
        guestMeetYear: 0,
      },
      guestEnergyGroup: {
        name: '',
        guestGroup: [],
        guestYearGroup: 0,
      },
    };
  }

  return {
    guestEnergyPartner: {
      name: guestEnergy.guest.partnerName || '',
      guestMeetYear: guestEnergy.guest.partnerMeetYear || 0,
      guestPartner: guestEnergy.guestPartners.map((partner) => ({
        id: partner.id,
        names: partner.names,
        lastName: partner.lastName,
        scdLastName: partner.scdLastName,
        date: partner.date,
      })),
    },
    guestEnergyGroup: {
      name: guestEnergy.guest.groupName || '',
      guestYearGroup: guestEnergy.guest.groupYear || 0,
      guestGroup: guestEnergy.guestGroupMembers.map((member) => ({
        id: member.id,
        name: member.name,
        lastName: member.lastName,
        scdLastName: member.scdLastName,
        date: member.date,
        dateInit: member.dateInit,
      })),
    },
  };
}

export function useGuestEnergyQuery(config?: any) {
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useQuery(
    getGuestEnergyQueryKey(userId),
    () => getGuestEnergy(userId as number),
    {
      enabled: Boolean(userId),
      ...config,
    },
  );
}

export function useGuestEnergySession(config?: any) {
  const query = useGuestEnergyQuery(config);

  const guestSession = useMemo(
    () => mapGuestEnergyToLegacySession(query.data || null),
    [query.data],
  );

  return {
    ...query,
    guestSession,
  };
}

export function useSaveGuestEnergy(config?: MutationConfig<typeof saveGuestEnergy>) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useMutation(saveGuestEnergy, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getGuestEnergyQueryKey(userId));
      config?.onSuccess?.(data, variables, context);
    },
  });
}

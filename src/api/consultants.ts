import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios from '@/api/axios';
import { MutationConfig } from '@/api/react-query';
import { useAuth } from '@/context/AuthProvider';

type BackendPartnerData = Omit<Api.PartnerData, 'partner'> & {
  partner?: Api.Partner[];
  partners?: Api.Partner[];
};

type BackendConsultant = Omit<Api.Consultant, 'notes' | 'partnerData' | 'partner'> & {
  notes?: Api.Note[];
  partner?: Api.Partner[];
  partnerData?: BackendPartnerData[];
  partners?: Api.Partner[];
};

function mapNotesToLegacyShape(notes?: Api.Note[]): Api.NotesByDate {
  if (!notes?.length) {
    return {};
  }

  return notes.reduce<Api.NotesByDate>((acc, note) => {
    if (!acc[note.dateKey]) {
      acc[note.dateKey] = {};
    }

    acc[note.dateKey][note.pathKey] = note.value ?? '';
    return acc;
  }, {});
}

function mapConsultant(consultant: BackendConsultant): Api.Consultant {
  return {
    ...consultant,
    notes: Array.isArray(consultant.notes)
      ? mapNotesToLegacyShape(consultant.notes)
      : consultant.notes,
    partner: consultant.partners || consultant.partner || [],
    partnerData: (consultant.partnerData || []).map((partnerData) => ({
      ...partnerData,
      partner: partnerData.partners || partnerData.partner || [],
    })),
    groupData: (consultant.groupData || []).map((groupData) => ({
      ...groupData,
      members: groupData.members || [],
    })),
  };
}

export function getConsultantsQueryKey(userId?: number) {
  return ['consultants', userId];
}

export async function getConsultantsByUserId(userId: number): Promise<Api.Consultant[]> {
  const response = await axios.get<BackendConsultant[]>(`/consultants/user/${userId}`) as unknown as BackendConsultant[];
  return response.map(mapConsultant);
}

export async function createConsultant(consultant: Api.Consultant): Promise<Api.Consultant> {
  const response = await axios.post<BackendConsultant>('/consultants', consultant) as unknown as BackendConsultant;
  return mapConsultant(response);
}

export async function updateConsultant({
  consultantId,
  consultant,
}: {
  consultantId: string;
  consultant: Partial<Api.Consultant>;
}): Promise<Api.Consultant> {
  const response = await axios.put<BackendConsultant>(`/consultants/${consultantId}`, consultant) as unknown as BackendConsultant;
  return mapConsultant(response);
}

export async function deleteConsultant(consultantId: string): Promise<Api.Consultant> {
  const response = await axios.delete<BackendConsultant>(`/consultants/${consultantId}`) as unknown as BackendConsultant;
  return mapConsultant(response);
}

export async function upsertConsultantNote({
  consultantId,
  note,
}: {
  consultantId: string;
  note: Pick<Api.Note, 'dateKey' | 'pathKey' | 'value'>;
}): Promise<Api.Note> {
  return axios.post<Api.Note>(`/consultants/${consultantId}/notes`, note) as unknown as Api.Note;
}

export function useConsultantsQuery(config?: any) {
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useQuery(
    getConsultantsQueryKey(userId),
    () => getConsultantsByUserId(userId as number),
    {
      enabled: Boolean(userId),
      ...config,
    },
  );
}

export function useCreateConsultant(config?: MutationConfig<typeof createConsultant>) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useMutation(createConsultant, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getConsultantsQueryKey(userId));
      config?.onSuccess?.(data, variables, context);
    },
  });
}

export function useUpdateConsultant(config?: MutationConfig<typeof updateConsultant>) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useMutation(updateConsultant, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getConsultantsQueryKey(userId));
      config?.onSuccess?.(data, variables, context);
    },
  });
}

export function useDeleteConsultant(config?: MutationConfig<typeof deleteConsultant>) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useMutation(deleteConsultant, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getConsultantsQueryKey(userId));
      config?.onSuccess?.(data, variables, context);
    },
  });
}

export function useUpsertConsultantNote(config?: MutationConfig<typeof upsertConsultantNote>) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return useMutation(upsertConsultantNote, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getConsultantsQueryKey(userId));
      config?.onSuccess?.(data, variables, context);
    },
  });
}

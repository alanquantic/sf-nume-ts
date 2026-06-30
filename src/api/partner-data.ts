import { useMutation, useQueryClient } from 'react-query';

import { getConsultantsQueryKey } from '@/api/consultants';
import { useAuth } from '@/context/AuthProvider';

import axios from './axios';

async function createPartnerData({
  consultantId,
  partnerData,
}: {
  consultantId: string;
  partnerData: Omit<Api.PartnerData, 'id' | 'consultantId' | 'partner'>;
}) {
  return axios.post<Api.PartnerData>(`/partner-data/${consultantId}`, partnerData) as unknown as Api.PartnerData;
}

async function updatePartnerData({
  partnerDataId,
  partnerData,
}: {
  partnerDataId: string;
  partnerData: Partial<Api.PartnerData>;
}) {
  return axios.put<Api.PartnerData>(`/partner-data/${partnerDataId}`, partnerData) as unknown as Api.PartnerData;
}

async function deletePartnerData(partnerDataId: string) {
  return axios.delete<Api.PartnerData>(`/partner-data/${partnerDataId}`) as unknown as Api.PartnerData;
}

async function createPartner({
  partnerDataId,
  partner,
}: {
  partnerDataId: string;
  partner: Omit<Api.Partner, 'id' | 'partnerDataId'>;
}) {
  return axios.post<Api.Partner>(`/partner-data/${partnerDataId}/partner`, partner) as unknown as Api.Partner;
}

async function updatePartner({
  partnerId,
  partner,
}: {
  partnerId: string;
  partner: Partial<Api.Partner>;
}) {
  return axios.put<Api.Partner>(`/partner-data/partner/${partnerId}`, partner) as unknown as Api.Partner;
}

async function deletePartner(partnerId: string) {
  return axios.delete<Api.Partner>(`/partner-data/partner/${partnerId}`) as unknown as Api.Partner;
}

function useInvalidateConsultants() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return () => queryClient.invalidateQueries(getConsultantsQueryKey(userId));
}

export function useCreatePartnerData() {
  const invalidate = useInvalidateConsultants();
  return useMutation(createPartnerData, { onSuccess: invalidate });
}

export function useUpdatePartnerData() {
  const invalidate = useInvalidateConsultants();
  return useMutation(updatePartnerData, { onSuccess: invalidate });
}

export function useDeletePartnerData() {
  const invalidate = useInvalidateConsultants();
  return useMutation(deletePartnerData, { onSuccess: invalidate });
}

export function useCreatePartner() {
  const invalidate = useInvalidateConsultants();
  return useMutation(createPartner, { onSuccess: invalidate });
}

export function useUpdatePartner() {
  const invalidate = useInvalidateConsultants();
  return useMutation(updatePartner, { onSuccess: invalidate });
}

export function useDeletePartner() {
  const invalidate = useInvalidateConsultants();
  return useMutation(deletePartner, { onSuccess: invalidate });
}

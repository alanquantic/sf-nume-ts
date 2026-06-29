import { useMutation, useQueryClient } from 'react-query';

import { getConsultantsQueryKey } from '@/api/consultants';
import { useAuth } from '@/context/AuthProvider';

import axios from './axios';

async function createCreateName({
  consultantId,
  createName,
}: {
  consultantId: string;
  createName: Omit<Api.CreateName, 'id' | 'consultantId'>;
}) {
  return axios.post<Api.CreateName>(`/create-names/${consultantId}`, createName) as unknown as Api.CreateName;
}

async function updateCreateName({
  createNameId,
  createName,
}: {
  createNameId: string;
  createName: Partial<Api.CreateName>;
}) {
  return axios.put<Api.CreateName>(`/create-names/${createNameId}`, createName) as unknown as Api.CreateName;
}

async function deleteCreateName(createNameId: string) {
  return axios.delete<Api.CreateName>(`/create-names/${createNameId}`) as unknown as Api.CreateName;
}

function useInvalidateConsultants() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return () => queryClient.invalidateQueries(getConsultantsQueryKey(userId));
}

export function useCreateCreateName() {
  const invalidate = useInvalidateConsultants();
  return useMutation(createCreateName, { onSuccess: invalidate });
}

export function useUpdateCreateName() {
  const invalidate = useInvalidateConsultants();
  return useMutation(updateCreateName, { onSuccess: invalidate });
}

export function useDeleteCreateName() {
  const invalidate = useInvalidateConsultants();
  return useMutation(deleteCreateName, { onSuccess: invalidate });
}

import { useMutation, useQueryClient } from 'react-query';

import { getConsultantsQueryKey } from '@/api/consultants';
import { useAuth } from '@/context/AuthProvider';

import axios from './axios';

async function createGroupData({
  consultantId,
  groupData,
}: {
  consultantId: string;
  groupData: Omit<Api.GroupData, 'id' | 'consultantId' | 'members'>;
}) {
  return axios.post<Api.GroupData>(`/group-data/${consultantId}`, groupData) as unknown as Api.GroupData;
}

async function updateGroupData({
  groupDataId,
  groupData,
}: {
  groupDataId: string;
  groupData: Partial<Api.GroupData>;
}) {
  return axios.put<Api.GroupData>(`/group-data/${groupDataId}`, groupData) as unknown as Api.GroupData;
}

async function deleteGroupData(groupDataId: string) {
  return axios.delete<Api.GroupData>(`/group-data/${groupDataId}`) as unknown as Api.GroupData;
}

async function createGroupMember({
  groupDataId,
  member,
}: {
  groupDataId: string;
  member: Omit<Api.GroupMember, 'id' | 'groupDataId'>;
}) {
  return axios.post<Api.GroupMember>(`/group-data/${groupDataId}/member`, member) as unknown as Api.GroupMember;
}

async function updateGroupMember({
  memberId,
  member,
}: {
  memberId: string;
  member: Partial<Api.GroupMember>;
}) {
  return axios.put<Api.GroupMember>(`/group-data/member/${memberId}`, member) as unknown as Api.GroupMember;
}

async function deleteGroupMember(memberId: string) {
  return axios.delete<Api.GroupMember>(`/group-data/member/${memberId}`) as unknown as Api.GroupMember;
}

function useInvalidateConsultants() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  return () => queryClient.invalidateQueries(getConsultantsQueryKey(userId));
}

export function useCreateGroupData() {
  const invalidate = useInvalidateConsultants();
  return useMutation(createGroupData, { onSuccess: invalidate });
}

export function useUpdateGroupData() {
  const invalidate = useInvalidateConsultants();
  return useMutation(updateGroupData, { onSuccess: invalidate });
}

export function useDeleteGroupData() {
  const invalidate = useInvalidateConsultants();
  return useMutation(deleteGroupData, { onSuccess: invalidate });
}

export function useCreateGroupMember() {
  const invalidate = useInvalidateConsultants();
  return useMutation(createGroupMember, { onSuccess: invalidate });
}

export function useUpdateGroupMember() {
  const invalidate = useInvalidateConsultants();
  return useMutation(updateGroupMember, { onSuccess: invalidate });
}

export function useDeleteGroupMember() {
  const invalidate = useInvalidateConsultants();
  return useMutation(deleteGroupMember, { onSuccess: invalidate });
}

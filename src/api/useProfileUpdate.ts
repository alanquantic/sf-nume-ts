import { useMutation, useQueryClient } from 'react-query';

import axios from '@/api/axios';
import { useAuth } from '@/context/AuthProvider';

async function updateProfile({
  userId,
  userProfile,
}: {
  userId: number;
  userProfile: Api.ProfileUser;
}) {
  return axios.put(`/users/${userId}`, {
    firstName: userProfile.names,
    lastName: userProfile.lastName,
    scdLastName: userProfile.scdLastName,
    birthDate: userProfile.date,
    phone: userProfile.tel,
    companyDirection: userProfile.address,
    companyLogo: userProfile.logoURL,
    companyName: userProfile.company,
    companyPhone: userProfile.phone,
    companyWebsite: userProfile.webSite,
  });
}

function makeProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;

  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('auth-user');
    },
  });

  return {
    ...mutation,
    mutateAsync: (userProfile: Api.ProfileUser) => (
      mutation.mutateAsync({
        userId: userId as number,
        userProfile,
      })
    ),
  };
}

export default makeProfile;

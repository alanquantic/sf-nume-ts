import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';

async function postProfile(userProfile: Api.ProfileUser) { // CRUD
  const res = await axios.post('/wp-json/app/v1/p', userProfile); // TODO: change endpoint to V2
  return res;
}

const makeProfile = makeMutation(['update-profile'], postProfile, ['auth-user']);

export default makeProfile;

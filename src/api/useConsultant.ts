import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';

async function postConsultants(consultants: Api.Consultant[]) { // CRUD
  const res = await axios.post('/wp-json/app/v1/u', consultants); // TODO: change endpoint to V2
  return res;
}

const makeConsultant = makeMutation(['add-consultant'], postConsultants, ['auth-user']);

export default makeConsultant;

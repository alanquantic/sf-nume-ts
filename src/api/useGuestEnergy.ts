import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';

async function postGuestEnergy(guestEnergy: Api.GuestEnergyPartner | Api.GuestEnergyGroup) {
  const isPartner = 'guestPartner' in guestEnergy;

  const payload = {
    guestEnergyPartner: isPartner ? guestEnergy : null,
    guestEnergyGroup: !isPartner ? guestEnergy : null,
  };
  const res = await axios.post('/wp-json/app/v3/energy', payload);
  return res;
}

const makeGuestEnergy = makeMutation(['add-guest-energy'], postGuestEnergy, ['auth-user']);

export default makeGuestEnergy;

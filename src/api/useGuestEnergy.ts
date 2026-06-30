import { useSaveGuestEnergy } from '@/api/guest-energy';
import { useAuth } from '@/context/AuthProvider';

function makeGuestEnergy() {
  const { user } = useAuth();
  const userId = user?.user?.id;
  const mutation = useSaveGuestEnergy();

  return {
    ...mutation,
    mutateAsync: (guestEnergy: Api.GuestEnergyPartner | Api.GuestEnergyGroup) => (
      mutation.mutateAsync({
        userId: userId as number,
        guestEnergy,
      })
    ),
  };
}

export default makeGuestEnergy;

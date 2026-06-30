import { useConsultantsQuery } from '@/api/consultants';

const useConsultants = () => {
  const { data } = useConsultantsQuery();
  const consultants = data ?? [];

  return {
    consultants,
  };
};

export default useConsultants;

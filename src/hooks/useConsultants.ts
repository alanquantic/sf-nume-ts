import { useConsultantsQuery } from '@/api/consultants';
import useConsult from '@/hooks/useConsult';

const useConsultants = () => {
  const { selectConsultant } = useConsult();
  const { data } = useConsultantsQuery();
  const consultants = data ?? [];

  const addConsultant = (newConsultant: Api.Consultant): Api.Consultant[] => {
    selectConsultant(newConsultant);
    return [...consultants, newConsultant];
  };

  const removeConsultant = (consultantId: string): Api.Consultant[] => consultants.filter((consultant) => consultant?.id !== consultantId);

  const updateConsultant = (consultantId: string, newConsultant: Api.Consultant): Api.Consultant[] => {
    const updatedConsultants = consultants.map((consultant) => {
      if (consultant?.id === consultantId) {
        // Solo retornar el nuevo consultant sin llamar a selectConsultant
        // para evitar limpiar activePartnerData y selectedPartnersAsPersons
        // El componente que llama debe usar updateConsultantPartners para actualizar el contexto
        return newConsultant;
      }
      return consultant;
    });
    return updatedConsultants;
  };

  return {
    consultants,
    addConsultant,
    removeConsultant,
    updateConsultant,
  };
};

export default useConsultants;

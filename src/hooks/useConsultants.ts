import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';

const useConsultants = () => {
  const { user } = useAuth();
  const { selectConsultant } = useConsult();
  const consultants = user?.consultants ?? [];

  const addConsultant = (newConsultant: Api.Consultant): Api.Consultant[] => {
    // Seleccionar el nuevo consultant como activo
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

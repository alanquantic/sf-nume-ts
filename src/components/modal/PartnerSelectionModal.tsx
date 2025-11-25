import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeGuestEnergy from '@/api/useGuestEnergy';
import MyModal from '@/components/MyModal';
import useEnergy from '@/hooks/useEnergy';
import { isValidDate } from '@/utils/constants';
import Swal from 'sweetalert2';

type PartnerSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  guestPartnerProps: Api.GuestEnergyPartner | null;
};

function PartnerSelectionModal({
  isOpen,
  setIsOpen,
  guestPartnerProps,
}: PartnerSelectionModalProps) {
  const { t } = useTranslation();
  const updateGuestEnergy = makeGuestEnergy();
  const { selectActiveGuestPartner } = useEnergy();

  const [yearMeet, setYearMeet] = useState(0);
  const [name, setName] = useState('');
  const [partnerOne, setPartnerOne] = useState({
    name: '',
    birthDate: '',
  });
  const [partnerTwo, setPartnerTwo] = useState({
    name: '',
    birthDate: '',
  });
  useEffect(() => {
    if (guestPartnerProps) {
      setYearMeet(guestPartnerProps.guestMeetYear || 0);
      setName(guestPartnerProps.name || '');
      setPartnerOne({
        name: guestPartnerProps.guestPartner?.[0]?.names || '',
        birthDate: guestPartnerProps.guestPartner?.[0]?.date || '',
      });
      setPartnerTwo({
        name: guestPartnerProps.guestPartner?.[1]?.names || '',
        birthDate: guestPartnerProps.guestPartner?.[1]?.date || '',
      });
    }
  }, [guestPartnerProps]);

  // IMPORTANTE: El return debe estar DESPUÉS de TODOS los hooks

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate(partnerOne.birthDate) || !isValidDate(partnerTwo.birthDate)) {
      return;
    }

    const partnerOneTemp: Api.Partner = {
      id: Math.random().toString(36).substring(2, 9) || '',
      names: partnerOne.name || '',
      lastName: '',
      scdLastName: '',
      date: partnerOne.birthDate || '',
    };
    const partnerTwoTemp: Api.Partner = {
      id: Math.random().toString(36).substring(2, 9) || '',
      names: partnerTwo.name || '',
      lastName: '',
      scdLastName: '',
      date: partnerTwo.birthDate || '',
    };

    const guestEnergyPartner: Api.GuestEnergyPartner = {
      guestPartner: [partnerOneTemp, partnerTwoTemp],
      guestMeetYear: yearMeet,
      name,
    };

    try {
      await updateGuestEnergy.mutateAsync(guestEnergyPartner).then(() => {
        selectActiveGuestPartner({ guestPartner: [partnerOneTemp, partnerTwoTemp], guestMeetYear: yearMeet, name });
        setIsOpen(false);
        Swal.fire({
          title: t('modal.partner.successSave') as string,
          text: t('modal.partner.successSaveMessage') as string,
          icon: 'success',
          confirmButtonText: t('modal.partner.accept') as string,
        });
      });
    } catch (err) {
      Swal.fire({
        title: t('modal.partner.errorSave') as string,
        text: err instanceof Error ? err.message : t('modal.partner.unknownError') as string,
        icon: 'error',
        confirmButtonText: t('modal.partner.accept') as string,
      });
    }
  };

  return (
    <MyModal
      size="small"
      title={t('modal.partner.guestPartner') as string}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="form-group gap-2">
            <p>{t('modal.partner.namePartner')}</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
          <div className="form-group gap-2">
            <p>{t('modal.partner.partnerOne')}</p>
            <input
              type="text"
              name="partnerOne"
              value={partnerOne.name}
              placeholder={t('forms.name') as string}
              onChange={(e) => setPartnerOne({ ...partnerOne, name: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            <input
              type="date"
              name="partnerOneBirthDate"
              value={partnerOne.birthDate}
              onChange={(e) => setPartnerOne({ ...partnerOne, birthDate: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
          <div className="form-group gap-2">
            <p>{t('modal.partner.partnerTwo')}</p>
            <input
              type="text"
              name="partnerTwo"
              value={partnerTwo.name}
              placeholder={t('forms.name') as string}
              onChange={(e) => setPartnerTwo({ ...partnerTwo, name: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            <input
              type="date"
              name="partnerTwoBirthDate"
              value={partnerTwo.birthDate}
              onChange={(e) => setPartnerTwo({ ...partnerTwo, birthDate: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
          <div className="form-group gap-2">
            <p>{t('modal.partner.yearMeet')}</p>
            <input
              type="number"
              name="yearMeet"
              value={yearMeet}
              onChange={(e) => setYearMeet(Number(e.target.value))}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-cancel"
          >
            {t('modal.partner.cancel')}
          </button>
          <button
            type="submit"
            className="btn"
          >
            {t('modal.partner.save')}
          </button>
        </div>
      </form>
    </MyModal>
  );
}

export default PartnerSelectionModal;

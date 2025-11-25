import cx from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import partnerImg from '@/assets/partner.png';
import { TiPlus } from 'react-icons/ti';

import PartnerSelectionModal from '@/components/modal/PartnerSelectionModal';
import useConsult from '@/hooks/useConsult';
import useEnergy from '@/hooks/useEnergy';
import { useEffect } from 'react';

type UniversalEnergyPartnerProps = {
  setActive: () => void;
  selected: boolean;
};

function UniversalEnergyPartner({
  setActive, selected,
}: UniversalEnergyPartnerProps) {
  const { calculationYear, calculationDate } = useConsult();
  const {
    setActiveSelection, selectedType, activeGuestPartner, guestPartner,
  } = useEnergy();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efecto para establecer automáticamente la pareja seleccionada como selección activa
  useEffect(() => {
    if (selectedType === 'partner') {
      setActiveSelection(activeGuestPartner || undefined);
    }
  }, [selectedType, setActiveSelection]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ul className={cx(
      'flex flex-col items-center',
      { 'opacity-25': !activeGuestPartner },
      'order-2',
    )}
    >
      <li className="mb-2">
        <img src={partnerImg} width={55} height={55} alt="partner_disabled" />
      </li>
      <li
        className={cx('text-center', {
          'text-main-700': !selected,
          'text-black': selected,
          'cursor-pointer': activeGuestPartner,
          'cursor-not-allowed opacity-50': !activeGuestPartner,
        })}
      >
        <button
          type="button"
          onClick={() => {
            if (activeGuestPartner) {
              setActive();
            }
          }}
          disabled={!activeGuestPartner}
          className="w-full"
        >
          {_.toUpper(t('home.energy') as string)}
          <br />
          <div className="font-black">
            {_.toUpper(t('home.partneral') as string)}
          </div>
        </button>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-[13px] inner-shadow mt-3 mb-6 font-black cursor-pointer')}>
        {/* Modal de selección de parejas */}
        <button type="button" onClick={openModal} className="w-full h-full flex items-center justify-center">
          {!activeGuestPartner && (
            <div className="flex items-center justify-center">
              <TiPlus />
            </div>
          )}
          {guestPartner && (
            <div className="flex items-center justify-center">
              { guestPartner.name || t('home.selectPartner')}
            </div>
          )}
        </button>
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestPartner ? activeGuestPartner.calcPersonalDay(calculationDate) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestPartner ? activeGuestPartner.calcPersonalWeek(calculationDate.day, calculationDate.month, calculationDate.year) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestPartner ? activeGuestPartner.calcPersonalMonth(calculationDate) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestPartner ? activeGuestPartner.calcPersonalYear(calculationYear) : ''}
      </li>

      <PartnerSelectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        guestPartnerProps={guestPartner || null}
      />
    </ul>
  );
}

export default UniversalEnergyPartner;

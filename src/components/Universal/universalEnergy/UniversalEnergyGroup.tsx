import cx from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import groupImg from '@/assets/group.png';

import GroupSelectionModal from '@/components/modal/GroupSelectionModal';
import useConsult from '@/hooks/useConsult';
import useEnergy from '@/hooks/useEnergy';
import { useEffect } from 'react';

type UniversalEnergyGroupProps = {
  setActive: () => void;
  selected: boolean;
};

function UniversalEnergyGroup({
  setActive, selected,
}: UniversalEnergyGroupProps) {
  const { calculationYear, calculationDate } = useConsult();
  const {
    setActiveSelection, selectedType, guestGroup, activeGuestGroup,
  } = useEnergy();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efecto para establecer automáticamente el grupo seleccionado como selección activa
  useEffect(() => {
    if (selectedType === 'group') {
      setActiveSelection(activeGuestGroup || undefined);
    }
  }, [selectedType, setActiveSelection]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ul className={cx(
      'flex flex-col items-center',
      { 'opacity-25': !activeGuestGroup },
      'order-3',
    )}
    >
      <li className="mb-2">
        <img src={groupImg} width={55} height={55} alt="group_disabled" />
      </li>
      <li
        className={cx('text-center', {
          'text-main-700': !selected,
          'text-black': selected,
          'cursor-pointer': activeGuestGroup,
          'cursor-not-allowed opacity-50': !activeGuestGroup,
        })}
      >
        <button
          type="button"
          onClick={() => {
            if (activeGuestGroup) {
              setActive();
            }
          }}
          disabled={!activeGuestGroup}
          className="w-full"
        >
          {_.toUpper(t('home.energy') as string)}
          <br />
          <div className="font-black">
            {_.toUpper(t('home.groupal') as string)}
          </div>
        </button>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-[13px] inner-shadow mt-3 mb-6 font-black cursor-pointer')}>
        {/* Modal de selección de grupos */}
        <button type="button" onClick={openModal} className="w-full h-full flex items-center justify-center">
          {!activeGuestGroup && (
            <div className="flex items-center justify-center">
              <TiPlus />
            </div>
          )}
          {guestGroup && (
            <div className="flex items-center justify-center">
              {guestGroup.name || t('home.selectGroup')}
            </div>
          )}
        </button>
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestGroup ? activeGuestGroup.calcPersonalDay(calculationDate) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestGroup ? activeGuestGroup.calcPersonalWeek(calculationDate.day, calculationDate.month, calculationYear) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestGroup ? activeGuestGroup.calcPersonalMonth(calculationDate) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {activeGuestGroup ? activeGuestGroup.calcPersonalYear(calculationYear) : ''}
      </li>

      <GroupSelectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        guestGroupProps={guestGroup || null}
      />
    </ul>
  );
}

export default UniversalEnergyGroup;

import cx from 'classnames';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import personImg from '@/assets/pp.png';

// import GuestFormModal from '@/components/modal/GuestFormModal';
import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

type UniversalEnergyPersonProps = {
  person: Person;
  setActive: () => void;
  // handleUpdateGuest: (consultant: Partial<Api.Guest>) => void; // Desactivado
  selected: boolean;
};

function UniversalEnergyPerson({
  person, setActive, /* handleUpdateGuest, */ selected,
}: UniversalEnergyPersonProps) {
  const { calculationYear, calculationDate } = useConsult();
  const { t } = useTranslation();
  const {
    /* id, */ name, birthDate,
  } = person;

  return (
    <ul className={cx(
      'flex flex-col items-center',
      { 'opacity-25': !name },
      'order-1',
    )}
    >
      <li className="mb-2">
        <img src={personImg} width={55} height={55} alt="personal_disabled" />
      </li>
      <li
        className={cx('text-center cursor-pointer', {
          'text-main-700': !selected,
          'text-black': selected,
        })}
      >
        <button type="button" onClick={setActive}>
          {_.toUpper(t('home.energy') as string)}
          <br />
          <div className="font-black">
            {_.toUpper(t('home.personal') as string)}
          </div>
        </button>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-[13px] inner-shadow mt-3 mb-6 font-black')}>
        {/* Modal de edición desactivado */}
        {(!name && !birthDate) && (
          <div className="flex items-center justify-center">
            <TiPlus />
          </div>
        )}
        {(name && birthDate) && (
          <div className="flex items-center justify-center">
            {name}
          </div>
        )}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {person && person.calcPersonalDay(calculationDate)}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {person && person.calcPersonalWeek(calculationDate)}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {person && person.calcPersonalMonth(calculationDate)}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {person && person.calcPersonalYear(calculationYear)}
      </li>
    </ul>
  );
}

export default UniversalEnergyPerson;

import cx from 'classnames';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';
import { formatDate } from '@/utils/constants';

type UniversalEnergyValuesProps = {
  setActive: () => void;
  selected: boolean;
};

function UniversalEnergyValues({ setActive, selected }: UniversalEnergyValuesProps) {
  const { consultationDate, calculationDate, calculationYear } = useConsult();

  const { t } = useTranslation();

  const u = new Universal();

  return (
    <ul className="flex flex-col items-center relative">
      <li className="mb-2">
        <img src="/assets/ic-universal.svg" alt="universal" width={55} height={55} />
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
            {_.toUpper(t('home.universal') as string)}
          </div>
        </button>

      </li>
      <li className="rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 inner-shadow mt-3 mb-6 font-black text-[13px] text-center">
        {formatDate({ date: consultationDate, format: 'short', locale: t('locale') as string })}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name={_.toUpper(t('home.day') as string)}
      >
        {u.calcUniversalDay(calculationDate)}
        {u.calcUniversalDayISK(calculationDate)}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name={_.toUpper(t('home.week') as string)}
      >
        {u.calcCurrentUniversalWeek(calculationDate)}
        {u.calcCurrentUniversalWeekISK(calculationDate)}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name={_.toUpper(t('home.month') as string)}
      >
        {u.calcUniversalMonth(calculationDate)}
        {u.calcUniversalMonthISK(calculationDate)}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name={_.toUpper(t('home.year') as string)}
      >
        {u.calcUniversalYear(calculationYear)}
        {u.calcUniversalYearISK(calculationYear)}
      </li>
    </ul>
  );
}

export default UniversalEnergyValues;

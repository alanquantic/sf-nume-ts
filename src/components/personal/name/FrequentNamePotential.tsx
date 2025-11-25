import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

export default function FrequentNamePotential() {
  const { t } = useTranslation();
  const { consultant, calculationDate } = useConsult();

  if (!consultant) return null;
  const nameCycles = consultant.calcNameCycles();

  return (
    <div className="pinnacle-wrap">
      <div className="flex justify-between px-9 py-3 border-b-2 border-gray-500">
        <div className="flex items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mr-3">{t('name.potential.letterCycle')}</p>
          <div className="w-10 h-10 text-2xl font-black text-black flex justify-center items-center bg-white border border-blue rounded-full inner-shadow">
            {consultant.nameCount()}
          </div>
        </div>
        <div className="flex items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mr-3">{t('name.potential.importantAges')}</p>
          <div className="h-10 text-2xl font-black text-black flex justify-center items-center bg-red border border-red inner-shadow px-4 rounded-md">
            {nameCycles.toString()}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-9 py-3">
        <div className="flex items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mr-3">
            {t('name.potential.personalYear')}
          </p>
          <div className="w-10 h-10 text-2xl font-black text-black flex justify-center items-center bg-white border border-main rounded-full inner-shadow">
            {consultant.calcPersonalYear(calculationDate.year)}
          </div>
          <div className="w-8 flex items-center justify-center">
            <svg
              width="20"
              height="42"
              viewBox="0 0 20 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.54602"
                y1="41.6486"
                x2="19.4036"
                y2="0.790452"
                stroke="black"
                strokeOpacity="0.45"
              />
            </svg>
          </div>
          <div className="w-10 h-10 text-2xl font-black text-black flex justify-center items-center bg-white border border-main rounded-full inner-shadow">
            {consultant.calcAgeDigit(calculationDate.year)}
          </div>
          <p className="text-13 ml-3">
            {t('name.potential.ageDigit')}
          </p>
        </div>

        <div className="flex items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mr-3">
            {t('name.potential.personalNumber')}
          </p>
          <div className="w-10 h-10 text-2xl font-black text-black flex justify-center items-center bg-purple-30 border border-main rounded-full inner-shadow-gold">
            {consultant.calcPersonalNumber()}
          </div>
          <div className="w-8 flex items-center justify-center">
            <svg
              width="20"
              height="42"
              viewBox="0 0 20 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.54602"
                y1="41.6486"
                x2="19.4036"
                y2="0.790452"
                stroke="black"
                strokeOpacity="0.45"
              />
            </svg>
          </div>
          <div className="w-10 h-10 text-2xl font-black text-black flex justify-center items-center bg-aguamarina-30 border border-aguamarina rounded-full inner-shadow">
            {consultant.calcMaturity()}
          </div>
          <p className="text-13 ml-3">{t('name.potential.maturity')}</p>
        </div>
      </div>
    </div>
  );
}

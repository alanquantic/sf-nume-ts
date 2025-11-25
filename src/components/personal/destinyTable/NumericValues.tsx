import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

export default function NumericValues() {
  const { t } = useTranslation();
  const { consultant } = useConsult();
  if (!consultant) return null;
  const nameCycles = consultant.calcNameCycles();
  const nameSubCycles = consultant.calcNameSubCycles();
  return (
    <div className="pinnacle-wrap px-8 py-6">
      <div className="flex justify-around">
        <div className="flex flex-col items-center justify-center">
          <strong className="text-13 text-gray-400 mb-2">
            {t('destinyTable.numericValues.letterTotal')}
          </strong>
          <div className="border border-blue w-10 h-10 rounded-md flex items-center justify-center text-xl font-bold inner-shadow mx-2">
            {consultant.nameCount()}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <strong className="text-13 text-gray-400 mb-2">
            {t('destinyTable.numericValues.nameCycles')}
          </strong>
          <div className="h-10 text-2xl  text-black flex justify-center items-center bg-white border border-red inner-shadow px-4 rounded-md">
            {nameCycles.toString()}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <strong className="text-13 text-gray-400 mb-2">
            {t('destinyTable.numericValues.nameSubCycles')}
          </strong>
          <div className="h-10 text-2xl  text-black flex justify-center items-center bg-white border border-green inner-shadow px-4 rounded-md">
            {nameSubCycles.slice(0, 10).toString()}
          </div>
        </div>
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-center text-gray-500 font-bold">
              <p className="text-13 mr-3">
                {t('destinyTable.numericValues.personalYear')}
              </p>
              <div className="w-10 h-10 text-2xl font-black text-black flex justify-center items-center bg-white border border-main rounded-full inner-shadow">
                {consultant.calcPersonalYear()}
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
                {consultant.calcAgeDigit()}
              </div>
              <p className="text-13 ml-3">
                {t('destinyTable.numericValues.ageDigit')}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center text-gray-500 font-bold">
              <p className="text-13 mr-3">
                {t('destinyTable.numericValues.personalNumber')}
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
              <p className="text-13 ml-3">
                {t('destinyTable.numericValues.maturity')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

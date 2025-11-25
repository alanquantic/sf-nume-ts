import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import { generateUniqueKey } from '@/utils/numbers';
import StageOne from './StageOne';

function NineYearsCycle() {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!consultant) return null;

  const hasDouble = consultant.hasDoubleStage();
  const nineYearCycle = consultant.getNineYearCycleStage(calculationDate.year);

  return (
    <div className="grid grid-cols-9 px-4 py-8 w-full">
      <div className="col-start-4 col-end-6 flex justify-between items-center mb-6 row-start-1">
        {t('vibrationTime.nineYearsCycle.stage')}
        {' '}
        {consultant.getLifeStageNumber(calculationDate)}
        :
        <CircleNumber size="sm" appearance="green-50" border="green">
          {consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate))}
          {consultant.calcLifeStageISK(consultant.getLifeStageNumber(calculationDate))}
          {hasDouble && `/${consultant.calcLifeStage(consultant.getDoubleLifeStageNumber(calculationDate))}`}
          {hasDouble && `${consultant.calcLifeStageISK(consultant.getDoubleLifeStageNumber(calculationDate))}`}

        </CircleNumber>
      </div>
      {nineYearCycle.map((year, i) => (
        <div key={generateUniqueKey()} className={`col-start-${i + 1} row-start-2 border-t-2 border-green-700 pt-5`}>
          <CircleNumber size="sm" appearance={(year === calculationDate.year) ? 'purple-30' : 'white'} border="main">
            {consultant.calcPersonalYear(year)}
            {consultant.calcPersonalYearISK(year)}
          </CircleNumber>
          {(consultant.getLifeStageNumber(calculationDate) !== 1)
            ? (
              <b className={`
            ${(year === calculationDate.year) ? 'text-black' : 'text-gray-300'}
            `}
              >
                {`${year}`}
              </b>
            ) : ''}
        </div>
      ))}
      {(consultant.getLifeStageNumber(calculationDate) === 1) ? <StageOne /> : null}
      <div className="col-start-4 border-r-2 row-start-1 border-green-700 h-4 mt-12" />
      <div className="col-start-1  row-start-2 flex justify-start h-4">
        <div className="border-r-2 border-green-700" />
      </div>
      <div className="col-start-10 row-start-2 flex justify-end h-4">
        <div className="border-l-2 border-green-700" />
      </div>
    </div>
  );
}
export default NineYearsCycle;

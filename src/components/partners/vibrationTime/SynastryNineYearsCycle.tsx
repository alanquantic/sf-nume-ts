import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Synastry from '@/resources/Synastry';
import { formatMasterNumber, generateUniqueKey, isMasterNumber } from '@/utils/numbers';

function SynastryNineYearsCycle({ synastry }: { synastry: Synastry | Group }) {
  const { calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!synastry) return null;

  const currentStage = synastry.getLifeStageNumber(calculationDate.month, calculationDate.year);
  const currentStageCheck = currentStage === 4 ? synastry.getHCheck() : null;
  const currentStageIsMaster = isMasterNumber(currentStageCheck);
  const currentStageValue = currentStageIsMaster
    ? formatMasterNumber(currentStageCheck)
    : synastry.calcLifeStage(currentStage);
  const nineYearCycle = synastry.getNineYearCycleStage(calculationDate.year);

  return (
    <div className="grid grid-cols-9 px-4 py-8 w-full">
      <div className="col-start-4 col-end-6 flex justify-between items-center mb-6 row-start-1">
        {t('vibrationTime.nineYearsCycle.stage')}
        {' '}
        {currentStage}
        :
        <CircleNumber size="sm" appearance="green-50" border="green">
          <span className={currentStageIsMaster ? 'text-sm' : ''}>
            {currentStageValue}
            {synastry.calcLifeStageISK(currentStage)}
          </span>
        </CircleNumber>
      </div>
      {nineYearCycle.map((year, i) => (
        <div key={generateUniqueKey()} className={`col-start-${i + 1} row-start-2 border-t-2 border-green-700 pt-5`}>
          <CircleNumber size="sm" appearance={(year === calculationDate.year) ? 'purple-30' : 'white'} border="main">
            {synastry.calcPersonalYear(year)}
            {synastry.calcPersonalYearISK(year)}
          </CircleNumber>

          <b className={`
            ${(year === calculationDate.year) ? 'text-black' : 'text-gray-300'}
            `}
          >
            {`${year}`}
          </b>

        </div>
      ))}
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
export default SynastryNineYearsCycle;

import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';

function ActiveEnergy() {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;

  const hasDouble = consultant.hasDoubleStage();
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-6 px-4 py-8 w-full ">
      <b className="col-start-1 row-start-1 text-sm">{t('vibrationTime.energy.stage')}</b>
      <div className="col-start-1 row-start-2 row-span-2 m-auto">
        <CircleNumber size="sm" appearance="green-50" border="green">
          {consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate))}
          {consultant.calcLifeStageISK(consultant.getLifeStageNumber(calculationDate))}
          {hasDouble && `/${consultant.calcLifeStage(consultant.getDoubleLifeStageNumber(calculationDate))}`}
          {hasDouble && `${consultant.calcLifeStageISK(consultant.getDoubleLifeStageNumber(calculationDate))}`}
        </CircleNumber>
      </div>
      <b className="col-start-2 row-start-2 text-sm pl-1">{t('vibrationTime.energy.year')}</b>
      <div className="col-start-2 row-start-3 row-span-2  bg-secondary text-xl font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
        {consultant.calcPersonalYear(calculationDate.year)}
        {consultant.calcPersonalYearISK(calculationDate.year)}
      </div>
      <b className="col-start-3 row-start-3 text-sm pl-1">{t('vibrationTime.energy.quarter')}</b>
      <div className="col-start-3 row-start-4 row-span-2 bg-green-70 text-xl font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
        {consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year)}
        {consultant.calcCurrentQuarterISK(calculationDate.month, calculationDate.year)}
      </div>
      <b className="col-start-4 row-start-4 text-sm pl-1">{t('vibrationTime.energy.month')}</b>
      <div className="col-start-4 row-start-5 row-span-2  bg-gold-50 text-xl font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
        {consultant.calcPersonalMonth(calculationDate)}
        {consultant.calcPersonalMonthISK(calculationDate)}
      </div>
      <b className="col-start-5 row-start-5 text-sm pl-1">{t('vibrationTime.energy.week')}</b>
      <div className="col-start-5 row-start-6 row-span-2  bg-ble-week-temp text-xl font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
        {consultant.calcPersonalWeek(calculationDate)}
        {consultant.calcPersonalWeekISK(calculationDate)}
      </div>
      <b className="col-start-6 row-start-6 text-sm pl-1">{t('vibrationTime.energy.day')}</b>
      <div className="col-start-6 row-start-7 row-span-2  bg-red-day text-xl font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
        {consultant.calcPersonalDay(calculationDate)}
        {consultant.calcPersonalDayISK(calculationDate)}
      </div>
      <div className="col-start-1 row-start-1 row-end-10 flex justify-end mt-2">
        <div className="border-r-2 border-t-2 border-b-2 w-3 h-full  border-gray-300" />
      </div>
      <div className="border-t-2 col-start-2 row-start-2 border-gray-300 w-2" />
      <div className="col-start-2 row-start-2 row-end-9 flex justify-end mt-2">
        <div className="border-r-2 border-t-2 border-b-2 w-3 h-full  border-gray-300" />
      </div>
      <div className="border-t-2 col-start-3 row-start-3 border-gray-300 w-2" />
      <div className="col-start-3 row-start-3 row-span-6 flex justify-end mt-2">
        <div className="border-r-2 border-t-2 border-b-2 w-3 h-full  border-gray-300" />
      </div>
      <div className="border-t-2 col-start-4 row-start-4 border-gray-300 w-2" />
      <div className="col-start-4 row-start-4 row-span-6 flex justify-end mt-2">
        <div className="border-r-2 border-t-2 border-b-2 w-3 h-full  border-gray-300" />
      </div>
      <div className="border-t-2 col-start-5 row-start-5 border-gray-300 w-2" />
      <div className="col-start-5 row-start-5 row-span-6 flex justify-end mt-2">
        <div className="border-r-2 border-t-2 border-b-2 w-3 h-full  border-gray-300" />
      </div>
      <div className="border-t-2 col-start-6 row-start-6 border-gray-300 w-2" />
    </div>

  );
}
export default ActiveEnergy;

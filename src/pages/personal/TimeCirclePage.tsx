import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import TimeCircle from '@/components/personal/timeCircle/TimeCircle';
import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';
import { formatDate } from '@/utils/constants';
import { getMonthName } from '@/utils/numbers';

function TimeCirclePage() {
  const { consultant, calculationDate, consultationDate } = useConsult();
  const { t } = useTranslation();
  const universal = new Universal();
  if (!consultant) return (<NoConsultantSelected />);
  return (
    <div className="page-content bg-cover grid grid-cols-12">
      <div className="col-span-6 flex justify-center items-center py-5 my-5">
        <TimeCircle consultant={consultant} />
      </div>
      <div className="col-span-6 mt-9 pt-9" style={{ backgroundImage: 'url(/assets/bk-man.png)', backgroundPositionX: 'right', backgroundRepeat: 'no-repeat' }}>
        <div className="relative">
          <img src="/assets/newSlide.png" alt="" />
          <span className="time-circle-sem-1">
            {consultant.calcSelectPersonalWeek(4, calculationDate)}
            {consultant.calcSelectPersonalWeekISK(4, calculationDate)}
          </span>
          <span className="time-circle-sem-2">
            {consultant.calcSelectPersonalWeek(3, calculationDate)}
            {consultant.calcSelectPersonalWeekISK(3, calculationDate)}
          </span>
          <span className="time-circle-sem-3">
            {consultant.calcSelectPersonalWeek(2, calculationDate)}
            {consultant.calcSelectPersonalWeekISK(2, calculationDate)}
          </span>
          <span className="time-circle-sem-4">
            {consultant.calcSelectPersonalWeek(1, calculationDate)}
            {consultant.calcSelectPersonalWeekISK(1, calculationDate)}
          </span>
          <span className="time-circle-months">
            {consultant.calcPersonalMonth(calculationDate)}
            {consultant.calcPersonalMonthISK(calculationDate)}
            {' '}
            /
            {' '}
            {universal.calcUniversalMonth(calculationDate)}
            {universal.calcUniversalMonthISK(calculationDate)}
          </span>
          <span className="time-circle-quater">{consultant.getQuarterMonth(calculationDate.month, calculationDate.year)}</span>
          <span className="time-circle-name-month text-white font-bold text-xs">{getMonthName(calculationDate.month)}</span>
        </div>
        <div className="mt-5 text-center text-2xl">
          <div>{t('timeCircle.consult')}</div>
          <div className="font-bold">{formatDate({ date: consultationDate, format: 'long', locale: t('locale') as string })}</div>
        </div>

      </div>
    </div>
  );
}
export default TimeCirclePage;

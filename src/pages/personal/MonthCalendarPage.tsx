import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import SingleMonth from '@/components/personal/annualCalendar/SingleMonth';

import SectionTitle from '@/components/SectionTitle';
import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';

export default function MonthCalendarPage() {
  const { t } = useTranslation();
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return (<NoConsultantSelected />);
  const u = new Universal();
  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 gap-6 pb-9 pt-10">
        <div className="col-span-12">
          <SectionTitle title={t('monthCalendar.title')} />

          <div className="pinnacle-wrap gird grid-cols-2 px-4 py-8 w-full">
            <div className="col-start-1 row-start-1 col-end-3 flex items-center justify-start">
              <div className="text-xl text-black font-bold px-2">
                {calculationDate.year}
                :
              </div>
              <div className="text-sm text-gray-500 px-2 font-bold">
                {t('monthCalendar.personalYear')}
              </div>
              <div className=" px-2">
                <CircleNumber size="sm" appearance="purple-30" border="main">
                  {consultant.calcPersonalYear(calculationDate.year)}
                  {consultant.calcPersonalYearISK(calculationDate.year)}
                </CircleNumber>
              </div>
              <div className="text-black font-bold text-xl px-2"> / </div>
              <div className=" px-2">
                <CircleNumber size="sm" appearance="main" border="main">
                  {u.calcUniversalYear(calculationDate.year)}
                  {u.calcUniversalYearISK(calculationDate.year)}
                </CircleNumber>
              </div>
              <div className="text-sm text-gray-500 px-2 font-bold">
                {t('monthCalendar.universalYear')}
              </div>
            </div>
            <div className="row-start-2 col-start-1 col-end-3">
              <SingleMonth
                month={calculationDate.month}
                showMonthSelector
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

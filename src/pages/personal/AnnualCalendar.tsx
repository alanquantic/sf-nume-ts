import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import SingleMonth from '@/components/personal/annualCalendar/SingleMonth';
import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';

function AnnualCalendar() {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return (<NoConsultantSelected />);
  const u = new Universal();
  const allMonths = getAllMonths();
  return (
    <div className="page-content bg-cover">
      <div className="grid grid-cols-12 mt-8 gap-6 pb-9 pt-10">
        <div className="col-span-12">
          <SectionTitle title={t('annualCalendar.annualCalendar')} />
          <div className="section-wrap px-2 py-7 grid grid-cols-2 w-full ">
            <div className="col-start-1 row-start-1 col-end-3 flex items-center justify-center">
              <div className="text-xl text-black font-bold px-2">
                {calculationDate.year}
                :
              </div>
              <div className="text-sm text-gray-500 px-2 font-bold">
                {t('annualCalendar.personalYear')}
                {' '}
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
                {t('annualCalendar.universalYear')}
                {' '}
              </div>
            </div>
            {allMonths.map((month, index) => <SingleMonth month={index + 1} showMonthSelector={false} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AnnualCalendar;

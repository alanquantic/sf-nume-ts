import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import PartnersSingleMonth from '@/components/partners/calendar/PartnersSingleMonth';
import SectionTitle from '@/components/SectionTitle';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';

function SynastryAnnualCalendar() {
  const {
    consultant, calculationDate, activePartnerData, selectedPartnersAsPersons,
  } = useContext(ConsultContext);
  const { t } = useTranslation();

  if (!consultant) return (<NoConsultantSelected />);

  if (!activePartnerData) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectPartner />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('sinastry.noPartnerSelected')}</h3>
            <p className="text-gray-600">{t('sinastry.noPartnerSelectedMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectPartner />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('sinastry.notEnoughMembers')}</h3>
            <p className="text-gray-600">
              {t('sinastry.notEnoughMembersMessage', { name: activePartnerData.name })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const partner1 = selectedPartnersAsPersons[0];
  const partner2 = selectedPartnersAsPersons[1];
  const synastry = new Synastry(partner1, partner2);
  const u = new Universal();
  const allMonths = getAllMonths();

  return (
    <div className="page-content bg-cover">
      <SelectPartner />
      <div className="grid grid-cols-12 mt-8 gap-6 pb-9">
        <div className="col-span-12">
          <SectionTitle title={t('annualCalendar.annualCalendar')} color="bg-red-day" />
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
                  {synastry.calcPersonalYear(calculationDate.year)}
                  {synastry.calcPersonalYearISK(calculationDate.year)}
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
            {allMonths.map((month, index) => <PartnersSingleMonth month={index + 1} showMonthSelector={false} consultant={synastry} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SynastryAnnualCalendar;

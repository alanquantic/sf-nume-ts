import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import TimeCircle from '@/components/partners/timeCircle/TimeCircle';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { formatDate } from '@/utils/constants';
import { getMonthName } from '@/utils/numbers';

function SynastryTimeCirclePage() {
  const {
    consultant, activePartnerData, selectedPartnersAsPersons, calculationDate, consultationDate,
  } = useContext(ConsultContext);
  const { t } = useTranslation();

  const universal = new Universal();

  if (!consultant) return (<NoConsultantSelected />);

  if (!activePartnerData || !selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10 px-4 mx-auto">
        <SelectPartner />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('sinastry.noPartnerForTimeCircle')}</h3>
            <p className="text-gray-600">{t('sinastry.noPartnerForTimeCircleMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Create synastry instance between the two partners
  const partner1 = selectedPartnersAsPersons[0];
  const partner2 = selectedPartnersAsPersons[1];
  const synastryPerson = new Synastry(partner1, partner2);

  return (
    <div className="page-content bg-cover grid grid-cols-12">
      <SelectPartner />
      <div className="col-span-6 flex justify-center items-center py-5 my-5">
        <TimeCircle consultant={synastryPerson} />
      </div>
      <div className="col-span-6 mt-9 pt-9" style={{ backgroundImage: 'url(/assets/bk-man.png)', backgroundPositionX: 'right', backgroundRepeat: 'no-repeat' }}>
        <div className="relative">
          <img src="/assets/newSlide.png" alt="" />
          <span className="time-circle-sem-1">
            {synastryPerson.calcSelectPersonalWeek(4, calculationDate)}
            {synastryPerson.calcSelectPersonalWeekISK(4, calculationDate)}
          </span>
          <span className="time-circle-sem-2">
            {synastryPerson.calcSelectPersonalWeek(3, calculationDate)}
            {synastryPerson.calcSelectPersonalWeekISK(3, calculationDate)}
          </span>
          <span className="time-circle-sem-3">
            {synastryPerson.calcSelectPersonalWeek(2, calculationDate)}
            {synastryPerson.calcSelectPersonalWeekISK(2, calculationDate)}
          </span>
          <span className="time-circle-sem-4">
            {synastryPerson.calcSelectPersonalWeek(1, calculationDate)}
            {synastryPerson.calcSelectPersonalWeekISK(1, calculationDate)}
          </span>
          <span className="time-circle-months">
            {synastryPerson.calcPersonalMonth(calculationDate)}
            {synastryPerson.calcPersonalMonthISK(calculationDate)}
            {' '}
            /
            {' '}
            {universal.calcUniversalMonth(calculationDate)}
            {universal.calcUniversalMonthISK(calculationDate)}
          </span>
          <span className="time-circle-quater">{synastryPerson.getQuarterMonth(calculationDate.month, calculationDate.year)}</span>
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
export default SynastryTimeCirclePage;

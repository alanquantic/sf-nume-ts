import { useTranslation } from 'react-i18next';

import SelectGroup from '@/components/group/SelectGroup';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import TimeCircle from '@/components/personal/timeCircle/TimeCircle';
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Universal from '@/resources/Universal';
import { formatDate } from '@/utils/constants';
import { getMonthName } from '@/utils/numbers';

function GroupTimeCirclePage() {
  const {
    consultant, activeGroup, selectedGroup, calculationDate, consultationDate,
  } = useConsult();
  const { t } = useTranslation();
  const universal = new Universal();
  if (!consultant) return (<NoConsultantSelected />);
  if (!activeGroup) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('group.noGroupSelected')}</h3>
            <p className="text-gray-600">{t('group.noGroupSelectedMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGroup || selectedGroup.length === 0) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('group.noMembersInGroup')}</h3>
            <p className="text-gray-600">
              {t('group.noMembersInGroupMessage', { groupName: activeGroup.name })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const GroupPerson = new Group(selectedGroup, activeGroup.lastInit);

  return (
    <div className="page-content bg-cover grid grid-cols-12">
      <SelectGroup />
      <div className="col-span-6 flex justify-center items-center py-5 my-5">
        <TimeCircle consultant={GroupPerson} />
      </div>
      <div className="col-span-6 mt-9 pt-9" style={{ backgroundImage: 'url(/assets/bk-man.png)', backgroundPositionX: 'right', backgroundRepeat: 'no-repeat' }}>
        <div className="relative">
          <img src="/assets/newSlide.png" alt="" />
          <span className="time-circle-sem-1">
            {GroupPerson.calcSelectPersonalWeek(4, calculationDate)}
            {GroupPerson.calcSelectPersonalWeekISK(4, calculationDate)}
          </span>
          <span className="time-circle-sem-2">
            {GroupPerson.calcSelectPersonalWeek(3, calculationDate)}
            {GroupPerson.calcSelectPersonalWeekISK(3, calculationDate)}
          </span>
          <span className="time-circle-sem-3">
            {GroupPerson.calcSelectPersonalWeek(2, calculationDate)}
            {GroupPerson.calcSelectPersonalWeekISK(2, calculationDate)}
          </span>
          <span className="time-circle-sem-4">
            {GroupPerson.calcSelectPersonalWeek(1, calculationDate)}
            {GroupPerson.calcSelectPersonalWeekISK(1, calculationDate)}
          </span>
          <span className="time-circle-months">
            {GroupPerson.calcPersonalMonth(calculationDate)}
            {GroupPerson.calcPersonalMonthISK(calculationDate)}
            {' '}
            /
            {' '}
            {universal.calcUniversalMonth(calculationDate)}
            {universal.calcUniversalMonthISK(calculationDate)}
          </span>
          <span className="time-circle-quater">{GroupPerson.getQuarterMonth(calculationDate.month, calculationDate.year)}</span>
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
export default GroupTimeCirclePage;

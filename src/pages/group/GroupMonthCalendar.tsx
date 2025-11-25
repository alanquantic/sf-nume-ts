import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import SelectGroup from '@/components/group/SelectGroup';
import NoConsultantSelected from '@/components/NoConsultantSelected';

import GroupSingleMonth from '@/components/group/calendar/GroupSingleMonth';
import SectionTitle from '@/components/SectionTitle';
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Universal from '@/resources/Universal';

export default function GroupMonthCalendarPage() {
  const { t } = useTranslation();
  const {
    consultant, calculationDate, activeGroup, selectedGroup,
  } = useConsult();

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
  const u = new Universal();
  return (
    <div className="page-content bg-cover pb-10">
      <SelectGroup />
      <div className="grid grid-cols-12 mt-8 gap-6 pb-9">
        <div className="col-span-12">
          <SectionTitle title={t('monthCalendar.title')} color="bg-group" />

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
                  {GroupPerson.calcPersonalYear(calculationDate.year)}
                  {GroupPerson.calcPersonalYearISK(calculationDate.year)}
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
              <GroupSingleMonth
                month={calculationDate.month}
                showMonthSelector
                consultant={GroupPerson}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

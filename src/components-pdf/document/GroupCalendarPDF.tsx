import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import calendarOne from '../assets/g-calendar-annual-1.jpg';
import calendarTwo from '../assets/g-calendar-annual-2.jpg';
import calendarThree from '../assets/g-calendar-annual-3.jpg';
import GroupCalendarHead from '../groupCalendarAnnual/GroupCalendarHead';
import GroupCalendarMonthsOne from '../groupCalendarAnnual/GroupCalendarMonthOne';
import GroupCalendarMonthsThree from '../groupCalendarAnnual/GroupCalendarMonthThree';
import GroupCalendarMonthsTwo from '../groupCalendarAnnual/GroupCalendarMonthTwo';
import GroupData from '../groupPinnacle/GroupData';

export default function GroupCalendarPDF({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  const universalCalcs = new Universal();
  return [
    {
      bg: calendarOne,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupCalendarHead groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
    <GroupCalendarMonthsOne groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
  </>,
    },
    {
      bg: calendarTwo,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupCalendarHead groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
    <GroupCalendarMonthsTwo groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
  </>,
    },
    {
      bg: calendarThree,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupCalendarHead groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
    <GroupCalendarMonthsThree groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
  </>,
    },
  ];
}

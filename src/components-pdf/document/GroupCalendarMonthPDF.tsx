import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import calendarMonth from '../assets/g-calendar-month.jpg';
import GroupCalendarHeadMonth from '../groupCalendarMonth/GroupCalendarHeadMonth';
import GroupCalendarMonth from '../groupCalendarMonth/GroupCalendarMonth';
import GroupData from '../groupPinnacle/GroupData';

export default function GroupCalendarMonthPDF({ groupConsult, date, month }: { groupConsult: Group, date: SplittedDate, month: number }) {
  const universalCalcs = new Universal();
  return {
    bg: calendarMonth,
    children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupCalendarHeadMonth groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
    <GroupCalendarMonth groupConsult={groupConsult} date={date} month={month} universalCalcs={universalCalcs} />
  </>,
  };
}

import Person, { SplittedDate } from '@/resources/Person';
import CalendarHeadMonth from '../calendarMonth/CalendarHeadMonth';
import CalendarMonth from '../calendarMonth/CalendarMonth';

import Universal from '@/resources/Universal';
import calendar from '../assets/calendar-month.jpg';

export default function MonthPDF({ consultant, date, month }: { consultant: Person, date: SplittedDate, month: number }) {
  const universalCalcs = new Universal();
  return {
    bg: calendar,
    children:
  <>
    <CalendarHeadMonth consultant={consultant} date={date} universalCalcs={universalCalcs} />
    <CalendarMonth consultant={consultant} date={date} month={month} universalCalcs={universalCalcs} />
  </>,
  };
}

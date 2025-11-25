import Person, { SplittedDate } from '@/resources/Person';
import Universal from '@/resources/Universal';
import calendar2 from '../assets/calendar-02.jpg';
import calendar from '../assets/calendar.jpg';
import CalendarHead from '../calendarAnual/CalendarHead';
import CalendarMonths from '../calendarAnual/CalendarMonths';
import CalendarMonths2 from '../calendarAnual/CalendarMonths2';

export default function CalendarPDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const universalCalcs = new Universal();
  return [{
    bg: calendar,
    children:
  <>
    <CalendarHead consultant={consultant} date={date} universalCalcs={universalCalcs} />
    <CalendarMonths consultant={consultant} date={date} universalCalcs={universalCalcs} />
  </>,
  }, {
    bg: calendar2,
    children:
  <>
    <CalendarHead consultant={consultant} date={date} universalCalcs={universalCalcs} />
    <CalendarMonths2 consultant={consultant} date={date} universalCalcs={universalCalcs} />
  </>,
  }];
}

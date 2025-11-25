import Synastry, { SplittedDate } from '@/resources/Synastry';

import Universal from '@/resources/Universal';
import sCalendarMonth from '../assets/s-calendar-month.jpg';
import SynastryCalendarHeadMonth from '../synastryCalendarMonth/SynastryCalendarHeadMonth';
import SynastryCalendarMonth from '../synastryCalendarMonth/SynastryCalendarMonth';
import SynastryData from '../synastryVibrationTime/SynastryData';

export default function SynastryCalendarMonthPDF({ synastry, date, month }: { synastry: Synastry, date: SplittedDate, month: number }) {
  const universalCalcs = new Universal();
  return {
    bg: sCalendarMonth,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryCalendarHeadMonth synastry={synastry} date={date} universalCalcs={universalCalcs} />
    <SynastryCalendarMonth synastry={synastry} date={date} month={month} universalCalcs={universalCalcs} />
  </>,
  };
}

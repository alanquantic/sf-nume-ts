import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import sCalendarOne from '../assets/s-calendar-annual-1.jpg';
import sCalendarTwo from '../assets/s-calendar-annual-2.jpg';
import SynastryCalendarHead from '../synastryCalendarAnnual/SynastryCalendarHead';
import SynastryCalendarMonthsOne from '../synastryCalendarAnnual/SynastryCalendarMonthOne';
import SynastryCalendarMonthsTwo from '../synastryCalendarAnnual/SynastryCalendarMonthTwo';
import SynastryData from '../synastryVibrationTime/SynastryData';

export default function SynastryCalendarPDF({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  const universalCalcs = new Universal();
  return [{
    bg: sCalendarOne,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryCalendarHead synastry={synastry} date={date} universalCalcs={universalCalcs} />
    <SynastryCalendarMonthsOne synastry={synastry} date={date} universalCalcs={universalCalcs} />
  </>,
  }, {
    bg: sCalendarTwo,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryCalendarHead synastry={synastry} date={date} universalCalcs={universalCalcs} />
    <SynastryCalendarMonthsTwo synastry={synastry} date={date} universalCalcs={universalCalcs} />
  </>,
  }];
}

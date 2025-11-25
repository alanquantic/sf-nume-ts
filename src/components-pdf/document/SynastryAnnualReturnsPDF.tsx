import SynastryAnnualReturns from '../synastryAnnualReturns/SynastryAnnualReturns';
import SynastryTimeCycle from '../synastryAnnualReturns/SynastryTimeCicle';
import SynastryData from '../synastryVibrationTime/SynastryData';

import Synastry, { SplittedDate } from '@/resources/Synastry';
import annualImage from '../assets/s-annual-returns.jpg';

export default function SynastryAnnualReturnsPDF({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  return {
    bg: annualImage,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryAnnualReturns synastry={synastry} date={date} />
    <SynastryTimeCycle synastry={synastry} date={date} />
  </>,
  };
}

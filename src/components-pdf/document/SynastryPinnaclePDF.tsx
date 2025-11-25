import { PDFPageConfig } from '@/types/pdf.types';
import SynastryAnnualReturns from '../synastryPinnacle/SynastryAnnualReturns';
import SynastryNames from '../synastryPinnacle/SynastryNames';
import SynastryPinnacles from '../synastryPinnacle/SynastryPinnacles';
import SynastryData from '../synastryVibrationTime/SynastryData';

import Synastry, { SplittedDate } from '@/resources/Synastry';
import sPinnacle from '../assets/s-pinnacle.jpg';

export default function SynastryPinnaclePDF({ synastry, date }: { synastry: Synastry, date: SplittedDate }): PDFPageConfig {
  return {
    bg: sPinnacle,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryNames synastry={synastry} />
    <SynastryPinnacles synastry={synastry} />
    <SynastryAnnualReturns synastry={synastry} date={date} />
  </>,
  };
}

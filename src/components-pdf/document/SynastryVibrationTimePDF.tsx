import SynastryData from '../synastryVibrationTime/SynastryData';
import SynastryEnergy from '../synastryVibrationTime/SynastryEnergy';
import SynastryLine from '../synastryVibrationTime/SynastryLine';
import SynastryNineCycle from '../synastryVibrationTime/SynastryNineCycle';
import SynastryTimeCurve from '../synastryVibrationTime/SynastryTimeCurve';
import SynastryVTQuaterM from '../synastryVibrationTime/SynastryVTQuaterM';
import SynastryVTQuarterY from '../synastryVibrationTime/SynastryVTQuaterY';

import Synastry, { SplittedDate } from '@/resources/Synastry';
import synastry1 from '../assets/s-time-vibration.jpg';
import synastry2 from '../assets/s-time-vibration2.jpg';

export default function SynastryVibrationTimePDF({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  return [{
    bg: synastry1,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryVTQuaterM synastry={synastry} date={date} />
    <SynastryEnergy synastry={synastry} date={date} />
    <SynastryNineCycle synastry={synastry} date={date} />
    <SynastryVTQuarterY synastry={synastry} date={date} />

  </>,
  }, {
    bg: synastry2,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryTimeCurve synastry={synastry} date={date} />
    <SynastryLine synastry={synastry} date={date} />
  </>,
  }];
}

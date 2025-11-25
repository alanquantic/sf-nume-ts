import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import circleTime from '../assets/s-circle-time.jpg';
import SynastryCircleTime from '../synastryCircleTime/SynastryCircleTime';
import SynastryMonthCircle from '../synastryCircleTime/SynastryMonthCircle';
import SynastryData from '../synastryVibrationTime/SynastryData';

export default function SynastryCircleTimePDF({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  const universalCalcs = new Universal();
  return {
    bg: circleTime,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <SynastryCircleTime synastry={synastry} date={date} universalCalcs={universalCalcs} />
    <SynastryMonthCircle synastry={synastry} date={date} universalCalcs={universalCalcs} />
  </>,

  };
}

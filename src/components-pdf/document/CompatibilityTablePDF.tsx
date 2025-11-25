import Synastry, { SplittedDate } from '@/resources/Synastry';
import compatibility from '../assets/s-compatibility.jpg';
import CompatibilityTable from '../compatibilityTable/CompatibilityValues';
import SynastryData from '../synastryVibrationTime/SynastryData';

export default function CompatibilityTablePDF({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  return {
    bg: compatibility,
    children:
  <>
    <SynastryData synastry={synastry} date={date} horizontal={false} />
    <CompatibilityTable synastry={synastry} />
  </>,
  };
}

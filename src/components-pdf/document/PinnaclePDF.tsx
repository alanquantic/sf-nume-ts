import Person, { SplittedDate } from '@/resources/Person';
import { PDFPageConfig } from '@/types/pdf.types';
import AnnualReturns from '../AnnualReturns';
import PinnacleImage2 from '../assets/newPinacle3.jpg';
import BridgeStage from '../BridgeStage';
import Pinnacle from '../pinnacle/Pinnacle';
import PinnacleName from '../pinnacle/PinnacleName';
import PinnaclePotential from '../pinnacle/PinnaclePotential';
import PinnacleTimeCurve from '../pinnacle/PinnacleTimeCurve';

export default function PinnaclePDF({ consultant, date }: { consultant: Person, date: SplittedDate }):PDFPageConfig {
  return {
    bg: PinnacleImage2,
    children:
  <>
    <PinnacleName consultant={consultant} />
    <PinnaclePotential consultant={consultant} />
    <Pinnacle consultant={consultant} />
    <BridgeStage consultant={consultant} />
    <AnnualReturns consultant={consultant} opts={date} />
    <PinnacleTimeCurve consultant={consultant} />
  </>,
  };
}

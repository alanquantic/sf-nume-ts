import Person, { SplittedDate } from '@/resources/Person';
import AnnualReturnsVibration from '../AnnualReturnsVibration';
import timeImage from '../assets/time_vibration.jpg';
import VibrationTimeCycle from '../VibrationTimeCycle';
import VibrationTimeQuarterM from '../VibrationTimeQuarterM';
import VibrationTimeQuarterY from '../VibrationTimeQuarterY';
import VibrationTimeStages from '../VibrationTimeStages';

export default function TimeVibrationPDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  return {
    bg: timeImage,
    children:
  <>
    <VibrationTimeStages consultant={consultant} date={date} />
    <VibrationTimeQuarterM consultant={consultant} date={date} />
    <VibrationTimeCycle consultant={consultant} date={date} />
    <VibrationTimeQuarterY consultant={consultant} date={date} />
    <AnnualReturnsVibration consultant={consultant} date={date} />
    {/* @TODO: create copy of annual returns (name) for time vibration */}
  </>,
  };
}

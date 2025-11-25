import Circle from '../circleTime/Circle';
import MonthCircle from '../circleTime/MonthCircle';

import Person, { SplittedDate } from '@/resources/Person';
import Universal from '@/resources/Universal';
import circle from '../assets/circle_time.jpg';

export default function CircleTimePDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const universalCalcs = new Universal();
  return {
    bg: circle,
    children:
  <>
    <Circle consultant={consultant} date={date} universalCalcs={universalCalcs} />
    <MonthCircle consultant={consultant} date={date} universalCalcs={universalCalcs} />
  </>,
  };
}

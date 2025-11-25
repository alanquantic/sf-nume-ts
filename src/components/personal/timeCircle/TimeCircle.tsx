import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import TimeCirclePastMonths from './TimeCirclePastMonths';
import TimeCircleWeeks from './TimeCircleWeeks';

type TimeCircleProps = {
  consultant?: Person | Synastry | Group;
};

function TimeCircle({ consultant }: TimeCircleProps) {
  const { calculationDate } = useConsult();
  return (
    <div className="relative time-circle">
      <img src="/assets/time-circle.png" className="relative" alt="Time Circle" />
      <img className="circle-tempo-arrow" src="/assets/time-circle-arrow.png" alt="" />
      <TimeCirclePastMonths />
      <span className="time-circle-year">{consultant?.calcPersonalYear(calculationDate.year)}</span>
      <TimeCircleWeeks consultant={consultant} />
    </div>
  );
}

TimeCircle.defaultProps = {
  consultant: undefined,
};

export default TimeCircle;

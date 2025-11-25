import TimeCirclePastMonths from '@/components/personal/timeCircle/TimeCirclePastMonths';
import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';
import TimeCircleWeeksUniversal from './timeCricleWeeksUniversal';

export default function TimeCircleUniversal() {
  const { calculationDate } = useConsult();
  const u = new Universal();
  return (
    <div className="relative time-circle">
      <img src="/assets/time-circle.png" className="relative" alt="Time Circle" />
      <img className="circle-tempo-arrow" src="/assets/time-circle-arrow.png" alt="" />
      <TimeCirclePastMonths />
      <span className="time-circle-year">{u.calcUniversalYear(calculationDate.year)}</span>
      <TimeCircleWeeksUniversal />
    </div>
  );
}

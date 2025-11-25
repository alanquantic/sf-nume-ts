/* eslint-disable no-plusplus */
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import Universal from '@/resources/Universal';

type TimeCircleWeeksProps = {
  consultant?: Person | Synastry | Group;
};

function TimeCircleWeeks({ consultant }: TimeCircleWeeksProps) {
  const { consultationDate, calculationDate } = useConsult();

  const u = new Universal();
  const year = consultationDate.getFullYear();

  const numbers: JSX.Element[] = [];

  const layerWeeks: { className: string, month: number, week: 1 | 2 | 3 | 4 }[] = [
    { className: 'time-circle-w w-1', month: 1, week: 1 },
    { className: 'time-circle-w w-2', month: 1, week: 2 },
    { className: 'time-circle-w w-3', month: 1, week: 3 },
    { className: 'time-circle-w w-4', month: 1, week: 4 },
    { className: 'time-circle-w w-5', month: 2, week: 1 },
    { className: 'time-circle-w w-6', month: 2, week: 2 },
    { className: 'time-circle-w w-7', month: 2, week: 3 },
    { className: 'time-circle-w w-8', month: 2, week: 4 },
    { className: 'time-circle-w w-9', month: 3, week: 1 },
    { className: 'time-circle-w w-10', month: 3, week: 2 },
    { className: 'time-circle-w w-11', month: 3, week: 3 },
    { className: 'time-circle-w w-12', month: 3, week: 4 },
    { className: 'time-circle-w w-13', month: 4, week: 1 },
    { className: 'time-circle-w w-14', month: 4, week: 2 },
    { className: 'time-circle-w w-15', month: 4, week: 3 },
    { className: 'time-circle-w w-16', month: 4, week: 4 },
    { className: 'time-circle-w w-17', month: 5, week: 1 },
    { className: 'time-circle-w w-18', month: 5, week: 2 },
    { className: 'time-circle-w w-19', month: 5, week: 3 },
    { className: 'time-circle-w w-20', month: 5, week: 4 },
    { className: 'time-circle-w w-21', month: 6, week: 1 },
    { className: 'time-circle-w w-22', month: 6, week: 2 },
    { className: 'time-circle-w w-23', month: 6, week: 3 },
    { className: 'time-circle-w w-24', month: 6, week: 4 },
    { className: 'time-circle-w w-25', month: 7, week: 1 },
    { className: 'time-circle-w w-26', month: 7, week: 2 },
    { className: 'time-circle-w w-27', month: 7, week: 3 },
    { className: 'time-circle-w w-28', month: 7, week: 4 },
    { className: 'time-circle-w w-29', month: 8, week: 1 },
    { className: 'time-circle-w w-30', month: 8, week: 2 },
    { className: 'time-circle-w w-31', month: 8, week: 3 },
    { className: 'time-circle-w w-32', month: 8, week: 4 },
    { className: 'time-circle-w w-33', month: 9, week: 1 },
    { className: 'time-circle-w w-34', month: 9, week: 2 },
    { className: 'time-circle-w w-35', month: 9, week: 3 },
    { className: 'time-circle-w w-36', month: 9, week: 4 },
    { className: 'time-circle-w w-37', month: 10, week: 1 },
    { className: 'time-circle-w w-38', month: 10, week: 2 },
    { className: 'time-circle-w w-39', month: 10, week: 3 },
    { className: 'time-circle-w w-40', month: 10, week: 4 },
    { className: 'time-circle-w w-41', month: 11, week: 1 },
    { className: 'time-circle-w w-42', month: 11, week: 2 },
    { className: 'time-circle-w w-43', month: 11, week: 3 },
    { className: 'time-circle-w w-44', month: 11, week: 4 },
    { className: 'time-circle-w w-45', month: 12, week: 1 },
    { className: 'time-circle-w w-46', month: 12, week: 2 },
    { className: 'time-circle-w w-47', month: 12, week: 3 },
    { className: 'time-circle-w w-48', month: 12, week: 4 },
  ];

  layerWeeks.forEach((layer) => {
    const { month, week } = layer;
    numbers.push(
      <span className={layer.className} key={`${month}-${week}`}>
        {consultant?.calcSelectPersonalWeek(week, { ...calculationDate, month })}
        {consultant?.calcSelectPersonalWeekISK(week, { ...calculationDate, month })}
      </span>,
    );
  });

  const layerMonths = { className: 'time-circle-pm m-' };
  for (let i = 1; i <= 12; i++) {
    numbers.push(
      <span className={`${layerMonths.className}${i}`} key={`${year}-${i}`}>
        {consultant?.calcPersonalMonth({ ...calculationDate, month: i })}
        {consultant?.calcPersonalMonthISK({ ...calculationDate, month: i })}
        /
        {u.calcUniversalMonth({ ...calculationDate, month: i })}
        {u.calcUniversalMonthISK({ ...calculationDate, month: i })}
      </span>,
    );
  }

  const layerQuarters = { className: 'time-quarter q-' };
  for (let i = 1; i <= 12; i++) {
    numbers.push(
      <span className={`${layerQuarters.className}${i}`} key={`q-${i}`}>
        {consultant?.getQuarterMonth(i, calculationDate.year)}
        {consultant?.getQuarterMonthISK(i, calculationDate.year)}
      </span>,
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{numbers}</>;
}

TimeCircleWeeks.defaultProps = {
  consultant: undefined,
};

export default TimeCircleWeeks;

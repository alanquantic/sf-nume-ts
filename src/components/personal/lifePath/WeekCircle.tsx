import {
  endOfMonth, format,
} from 'date-fns';

import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

type WeekNumber = 1 | 2 | 3 | 4;

export default function WeekCircle({
  week, currentWeek, consultant, newDate, currentMonthName,
}: {
  week: WeekNumber;
  currentWeek: WeekNumber;
  consultant: Person;
  newDate: Date;
  currentMonthName: string;
}) {
  const { calculationDate } = useConsult();
  return (
    <div
      className={`
      cicle-year bg-blue-week text-xl font-bold flex items-center justify-center rounded-md w-10 h-10
      ${currentWeek === week ? 'week-active' : ''}
    `}
    >
      {consultant.calcSelectPersonalWeek(week, calculationDate)}
      {consultant.calcSelectPersonalWeekISK(week, calculationDate)}
      <div className={`path-week-des ${currentWeek === week ? 'path-week-active' : ''}`}>
        {week === 4
          ? `22-${format(endOfMonth(newDate), 'dd')} ${currentMonthName}`
          : `${(week - 1) * 7 + 1}-${week * 7} ${currentMonthName}`}
      </div>
    </div>
  );
}

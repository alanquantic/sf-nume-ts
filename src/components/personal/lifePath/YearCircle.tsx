import { getYear } from 'date-fns';

import Person from '@/resources/Person';

export default function YearCircle({
  year, currentYear, consultant, now,
}: { year: number; currentYear: number; consultant: Person; now: Date }) {
  return (
    <div>
      <div
        className={`
        row-start-2 text-xl font-bold flex items-center justify-center rounded-md h-10 relative mt-6
        ${currentYear === year ? 'bg-secondary path-personal-vibration-active' : 'bg-purple-30'}
      `}
      >
        {consultant.calcPersonalYear(year)}
        {consultant.calcPersonalYearISK(year)}
      </div>
      <div
        className={`
        row-start-3 text-13 font-bold text-center my-1 relative
        ${getYear(now) === year ? 'text-secondary path-personal-year-active' : 'text-gray-400'}
      `}
      >
        {year}
      </div>
    </div>
  );
}

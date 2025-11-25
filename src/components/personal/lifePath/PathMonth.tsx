import { getYear } from 'date-fns';

import useConsult from '@/hooks/useConsult';

import { capitalize } from '@/utils/numbers';
import { useTranslation } from 'react-i18next';

interface MonthData {
  month: string;
  index: number;
  isActive: boolean;
}

interface QuarterData {
  months: MonthData[];
  isActive: boolean;
}

function PathMonth() {
  const { consultant, consultationDate } = useConsult();
  const { t, i18n } = useTranslation();

  if (!consultant) return null;

  const listOfMonths = consultant.getCustomMonths();
  const index = listOfMonths.findIndex((i) => i === capitalize(t('months.january') as string));

  // Get current month info - use current language
  const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
  const actualMonth = capitalize(consultationDate.toLocaleString(locale, { month: 'long' }));
  const currentYear = getYear(consultationDate);

  // Calculate quarters based on index
  const calculateQuarters = (): QuarterData[] => {
    const quarters: QuarterData[] = [];
    const currentMonth = capitalize(actualMonth);

    const createQuarterData = (monthIndices: number[]): MonthData[] => monthIndices.map((monthIndex) => ({
      month: listOfMonths[monthIndex],
      index: monthIndex,
      isActive: listOfMonths[monthIndex] === currentMonth,
    }));

    switch (index) {
      case 0:
        quarters.push(
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
        );
        break;
      case 1:
        quarters.push(
          { months: createQuarterData([1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0]), isActive: false },
        );
        break;
      case 2:
      case 3:
        quarters.push(
          { months: createQuarterData([3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2]), isActive: false },
        );
        break;
      case 4:
        quarters.push(
          { months: createQuarterData([4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3]), isActive: false },
        );
        break;
      case 5:
        quarters.push(
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
        );
        break;
      case 6:
        quarters.push(
          { months: createQuarterData([6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5]), isActive: false },
        );
        break;
      case 7:
        quarters.push(
          { months: createQuarterData([7, 8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6]), isActive: false },
        );
        break;
      case 8:
        quarters.push(
          { months: createQuarterData([8]), isActive: false },
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7]), isActive: false },
        );
        break;
      case 9:
        quarters.push(
          { months: createQuarterData([9, 10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
        );
        break;
      case 10:
        quarters.push(
          { months: createQuarterData([10, 11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9]), isActive: false },
        );
        break;
      case 11:
        quarters.push(
          { months: createQuarterData([11]), isActive: false },
          { months: createQuarterData([0, 1, 2, 3, 4]), isActive: false },
          { months: createQuarterData([5, 6, 7, 8]), isActive: false },
          { months: createQuarterData([9, 10]), isActive: false },
        );
        break;
      default:
        break;
    }

    // Mark active quarter
    return quarters.map((quarter) => ({
      ...quarter,
      isActive: quarter.months.some((month) => month.isActive),
    }));
  };

  const quarters = calculateQuarters();
  const activeQuarter = quarters.find((quarter) => quarter.isActive);

  if (!activeQuarter) return null;

  return (
    <div className="flex justify-between mt-5">
      {activeQuarter.months.map(({ month, index: monthIndex, isActive }) => (
        <div
          key={month}
          className={`
            cicle-year bg-gold-30 text-xl font-bold flex items-center justify-center rounded-md w-10 h-10
            ${isActive ? 'month-active' : ''}
          `}
        >
          {consultant.calcPersonalMonth({ month: monthIndex + 1, day: 1, year: currentYear })}
          {consultant.calcPersonalMonthISK({ month: monthIndex + 1, day: 1, year: currentYear })}
          <div className={`path-month-des ${isActive ? 'path-month-active' : ''}`}>
            {month}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PathMonth;

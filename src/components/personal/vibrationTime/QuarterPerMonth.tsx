/* eslint-disable max-len */
import useConsult from '@/hooks/useConsult';
import { useTranslation } from 'react-i18next';

import {
  capitalize,
  getAllMonths,
} from '@/utils/numbers';

function QuarterPerMonth() {
  const { t } = useTranslation();
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;

  const listOfMonths = consultant.getCustomMonths();
  const allMonths = getAllMonths();
  const personalYear = consultant.calcPersonalYear(calculationDate.year);
  const personalYearISK = consultant.calcPersonalYearISK(calculationDate.year);
  const lastYear = calculationDate.year - 1;

  const personalQuarter = {
    quarterOne: consultant.getQuarterOne(),
    quarterOneISK: consultant.getQuarterOneISK(),
    quarterTwo: consultant.getQuarterTwo(calculationDate.year),
    quarterTwoISK: consultant.getQuarterTwoISK(calculationDate.year),
    quarterThree: consultant.getQuarterThree(calculationDate.year),
    quarterThreeISK: consultant.getQuarterThreeISK(calculationDate.year),
    quarterTwoLast: consultant.getQuarterTwo(lastYear),
    quarterTwoLastISK: consultant.getQuarterTwoISK(lastYear),
    quarterThreeLast: consultant.getQuarterThree(lastYear),
    quarterThreeLastISK: consultant.getQuarterThreeISK(lastYear),
  };

  const monthsValues = {
    monthOne: '',
    monthOneValue: '',
    isMonthOne: false,
    monthTwo: '',
    monthTwoValue: '',
    isMonthTwo: false,
    monthThree: '',
    monthThreeValue: '',
    isMonthThree: false,
    monthFour: '',
    monthFourValue: '',
    isMonthFour: false,
  };

  const actualMonth = allMonths[calculationDate.month - 1];
  const index = listOfMonths.findIndex((i) => i === capitalize(t('months.january') as string));
  const currentMonth = listOfMonths.findIndex((i) => i === capitalize(actualMonth));

  switch (index) {
    case 0:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[4] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThree}${personalQuarter.quarterThreeISK}`;
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthThree = true; }
      break;
    case 1:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[4] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthFour = t('quarters.inMonth', { month: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      if (currentMonth >= 1 && currentMonth <= 4) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthThree = true; }
      if (currentMonth === 0) { monthsValues.isMonthFour = true; }
      break;
    case 2:
    case 3:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[4] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthFour = t('quarters.monthRange', { from: listOfMonths[0], to: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      if (currentMonth >= 3 && currentMonth <= 4) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthThree = true; }
      if (currentMonth >= 0 && currentMonth <= 2) { monthsValues.isMonthFour = true; }
      break;
    case 4:
      monthsValues.monthOne = t('quarters.inMonth', { month: listOfMonths[index] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthFour = t('quarters.monthRange', { from: listOfMonths[0], to: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      if (currentMonth === 4) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthThree = true; }
      if (currentMonth >= 0 && currentMonth <= 7) { monthsValues.isMonthFour = true; }
      break;
    case 5:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[8] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[12], to: listOfMonths[4] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthThree = true; }

      break;
    case 6:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[8] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[12], to: listOfMonths[4] });
      monthsValues.monthFour = t('quarters.inMonth', { month: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      if (currentMonth >= 6 && currentMonth <= 8) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthThree = true; }
      if (currentMonth === 5) { monthsValues.isMonthFour = true; }
      break;
    case 7:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[8] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[12], to: listOfMonths[4] });
      monthsValues.monthFour = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      if (currentMonth >= 7 && currentMonth <= 8) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthThree = true; }
      if (currentMonth >= 5 && currentMonth <= index - 1) { monthsValues.isMonthFour = true; }
      break;
    case 8:
      monthsValues.monthOne = t('quarters.inMonth', { month: listOfMonths[index] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[11] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[12], to: listOfMonths[4] });
      monthsValues.monthFour = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[index - 1] });

      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwoLast}${personalQuarter.quarterTwoLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      if (currentMonth === 8) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthThree = true; }
      if (currentMonth >= 5 && currentMonth <= 7) { monthsValues.isMonthFour = true; }
      break;
    case 9:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[11] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[0], to: listOfMonths[4] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      if (currentMonth >= index && currentMonth <= 11) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthThree = true; }

      break;
    case 10:
      monthsValues.monthOne = t('quarters.monthRange', { from: listOfMonths[index], to: listOfMonths[11] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[0], to: listOfMonths[4] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthFour = t('quarters.inMonth', { month: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThree}${personalQuarter.quarterThreeISK}`;
      if (currentMonth >= index && currentMonth <= 11) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthThree = true; }
      if (currentMonth === index - 1) { monthsValues.isMonthFour = true; }
      break;
    case 11:
      monthsValues.monthOne = t('quarters.inMonth', { month: listOfMonths[index] });
      monthsValues.monthTwo = t('quarters.monthRange', { from: listOfMonths[0], to: listOfMonths[4] });
      monthsValues.monthThree = t('quarters.monthRange', { from: listOfMonths[5], to: listOfMonths[8] });
      monthsValues.monthFour = t('quarters.monthRange', { from: listOfMonths[9], to: listOfMonths[index - 1] });
      monthsValues.monthOneValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThreeLast}${personalQuarter.quarterThreeLastISK}`;
      monthsValues.monthTwoValue = `${personalYear + personalYearISK}/${personalQuarter.quarterOne}${personalQuarter.quarterOneISK}`;
      monthsValues.monthThreeValue = `${personalYear + personalYearISK}/${personalQuarter.quarterTwo}${personalQuarter.quarterTwoISK}`;
      monthsValues.monthFourValue = `${personalYear + personalYearISK}/${personalQuarter.quarterThree}${personalQuarter.quarterThreeISK}`;
      if (currentMonth === index) { monthsValues.isMonthOne = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { monthsValues.isMonthTwo = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { monthsValues.isMonthThree = true; }
      if (currentMonth >= 9 && currentMonth <= index - 1) { monthsValues.isMonthFour = true; }
      break;
    default:
  }

  return (
    <div className="h-full">
      <div className="items-center text-black flex justify-center text-xl font-bold bg-black bg-opacity-15 border-t border-solid border-gray-300 h-14">{calculationDate.year}</div>
      <div>
        <div className={` ${monthsValues.isMonthOne ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center  font-bold border-t border-gray-300 flex justify-center  h-14 text-xl`}>{monthsValues.monthOne}</div>
        <div className={`${monthsValues.isMonthOne ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center flex justify-center border-t border-gray-300 font-bold h-12 text-xl`}>{monthsValues.monthOneValue}</div>
      </div>
      <div>
        <div className={`${monthsValues.isMonthTwo ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center font-bold border-t border-gray-300 flex justify-center h-14 text-xl`}>{monthsValues.monthTwo}</div>
        <div className={`${monthsValues.isMonthTwo ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center flex justify-center border-t border-gray-300 font-bold h-12 text-xl`}>{monthsValues.monthTwoValue}</div>
      </div>
      <div>
        <div className={`${monthsValues.isMonthThree ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center font-bold border-t border-gray-300 flex justify-center  h-14 text-xl`}>{monthsValues.monthThree}</div>
        <div className={`${monthsValues.isMonthThree ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center flex justify-center border-t border-gray-300 font-bold h-12 text-xl`}>{monthsValues.monthThreeValue}</div>
      </div>
      {(monthsValues.monthFourValue !== '')
        ? (
          <div>
            <div className={`${monthsValues.isMonthFour ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center font-bold border-t border-gray-300 flex justify-center h-14 text-xl`}>{monthsValues.monthFour}</div>
            <div className={`${monthsValues.isMonthFour ? 'text-black bg-black bg-opacity-15 ' : 'text-gray-500'} items-center flex justify-center border-t border-gray-300 font-bold h-12 text-xl`}>{monthsValues.monthFourValue}</div>
          </div>
        )
        : ''}
    </div>
  );
}
export default QuarterPerMonth;

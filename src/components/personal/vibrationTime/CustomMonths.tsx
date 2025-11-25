/* eslint-disable max-len */
import React from 'react';

import useConsult from '@/hooks/useConsult';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

type YearIndex = {
  year:number,
  i:number
};
function CustomMonths({ year, i }:YearIndex) {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!consultant) return null;
  const listOfMonths = consultant.getCustomMonths();
  // Use birth month index (0-11) instead of searching for 'Enero'
  const indexOfMonth = listOfMonths.findIndex((index) => index === capitalize(t('months.january') as string));
  const bornFirst = consultant.getDayOfBirth();
  const isCurrentYear = year === calculationDate.year;
  const isPreviousYear = year === calculationDate.year - 1;

  const isBoldFont = (
    (isCurrentYear || (isPreviousYear && indexOfMonth >= 1 && indexOfMonth <= 4))
    || (isCurrentYear && indexOfMonth >= 5 && indexOfMonth <= 8)
    || (indexOfMonth === 0 && (isCurrentYear || isPreviousYear))
    || (indexOfMonth >= 9 && indexOfMonth <= 11 && isCurrentYear)
    || (isPreviousYear && indexOfMonth >= 5 && indexOfMonth <= 8)
    || (isPreviousYear && indexOfMonth >= 1 && indexOfMonth <= 4)
  );

  const isGrayText = !isCurrentYear;
  return (
    <React.Fragment key={year}>
      <div className={` ${isCurrentYear ? 'text-yellow-500' : ''} col-start-${i + 3} row-start-1 flex justify-center items-center  bg-main text-white font-bold border border-gray-500`}>{year}</div>
      <div className={` ${isCurrentYear ? 'font-bold' : ''} col-start-${i + 3} row-start-2 flex justify-center items-center p-1 bg-purple-30 border border-gray-500`}>
        {consultant.calcPersonalYear(year)}
        {consultant.calcPersonalYearISK(year)}
      </div>
      <div className={`${isGrayText && 'text-gray-500'} ${isBoldFont && 'font-bold '}
        col-start-${i + 3} row-start-3 ${bornFirst === 1 ? 'row-span-4' : 'row-span-5'}  text-5xl flex justify-center items-center border border-gray-500 text-gray-500 `}
      >
        {consultant.getQuarterOne()}
        {consultant.getQuarterOneISK()}
      </div>
      <div className={` ${isBoldFont && 'font-bold '} ${isGrayText && 'text-gray-500'}
        col-start-${i + 3} ${bornFirst === 1 ? 'row-start-7' : 'row-start-8'}  row-span-4  text-5xl flex justify-center items-center border border-gray-500 text-gray-500`}
      >
        {consultant.getQuarterTwo(year)}
        {consultant.getQuarterTwoISK(year)}
      </div>
      <div className={` ${isBoldFont && ' font-bold'} ${isGrayText && 'text-gray-500'}
        col-start-${i + 3} ${bornFirst === 1 ? 'row-start-11' : 'row-start-12'}  row-span-4  text-5xl flex justify-center items-center border border-gray-500 text-gray-500 `}
      >
        {consultant.getQuarterThree(year)}
        {consultant.getQuarterThreeISK(year)}
      </div>

    </React.Fragment>
  );
}
export default CustomMonths;

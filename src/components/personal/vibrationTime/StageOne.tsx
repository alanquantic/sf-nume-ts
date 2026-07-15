import useConsult from '@/hooks/useConsult';
import { generateUniqueKey, sliceIntoChunks } from '@/utils/numbers';

function StageOne() {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;
  const birthYear = consultant.getYearOfBirth();
  const duration = consultant.calcLifeStageDuration(1) - birthYear;
  const startYear = birthYear;
  const stageOneEndYear = birthYear + duration;
  const endYear = Math.min(stageOneEndYear, calculationDate.year);
  const realYears = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  const nineYearCycleOfBirth = consultant.getNineYearCycleStage(birthYear);
  const paddingYears = nineYearCycleOfBirth.filter((year) => year < birthYear).map(() => 0);
  const arrayOfYears = [...paddingYears, ...realYears];

  const rows = sliceIntoChunks(arrayOfYears, 9);
  const displayRows = rows.map((row, i) => {
    if (!rows[i + 1]) return row;
    return [...row, rows[i + 1][0]];
  });
  const normalizedRows = Array.from({ length: 4 }, (_, rowIndex) => {
    const row = displayRows[rowIndex] || [];
    return Array.from({ length: 10 }, (_, colIndex) => row[colIndex] || 0);
  });
  return (
    <>
      {normalizedRows.map((years:number[], i) => years.map((year:number, j) => (
        <b key={generateUniqueKey()} className={`  col-start-${j + 1} row-start-${i + 3} ${(year === calculationDate.year) ? 'text-black' : 'text-gray-300'}`}>
          {' '}
          {year === 0 ? '' : year}
        </b>
      )))}
    </>
  );
}
export default StageOne;

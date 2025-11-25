import useConsult from '@/hooks/useConsult';
import { generateUniqueKey, sliceIntoChunks } from '@/utils/numbers';

function StageOne() {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;
  const birthYear = consultant.getYearOfBirth();
  const duration = consultant.calcLifeStageDuration(1) - birthYear;
  const startYear = birthYear;
  const endYear = birthYear + duration;
  const arrayOfYears = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  const nineYearCycleOfBirth = consultant.getNineYearCycleStage(birthYear);

  nineYearCycleOfBirth.forEach((e) => {
    if (e < birthYear) {
      arrayOfYears.push(0);
    }
  });

  const rows = sliceIntoChunks(arrayOfYears, 9);
  rows.forEach((row, i) => {
    if (rows[i + 1]) {
      row.push(rows[i + 1][0]);
    }
  });
  return (
    <>
      {rows.map((years:number[], i) => years.map((year:number, j) => (
        <b key={generateUniqueKey()} className={`  col-start-${j + 1} row-start-${i + 3} ${(year === calculationDate.year) ? 'text-black' : 'text-gray-300'}`}>
          {' '}
          {year}
        </b>
      )))}
    </>
  );
}
export default StageOne;

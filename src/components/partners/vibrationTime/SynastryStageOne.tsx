import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Synastry from '@/resources/Synastry';
import { generateUniqueKey, sliceIntoChunks } from '@/utils/numbers';

function StageOne({ synastry }: { synastry: Synastry | Group }) {
  const { calculationDate } = useConsult();
  if (!synastry) return null;
  const birthYear = synastry.getYearOfBirth();
  const duration = synastry.calcLifeStageDuration(1) - birthYear;
  const startYear = birthYear;
  const endYear = birthYear + duration;
  const arrayOfYears = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  const nineYearCycleOfBirth = synastry.getNineYearCycleStage(birthYear);

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

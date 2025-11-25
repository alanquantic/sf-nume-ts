import Person, { SplittedDate } from '@/resources/Person';
import nameImage from '../assets/destinity-table.jpg';
import nameImage2 from '../assets/destinity-table2.jpg';
import DestinityNumericalValues from '../destinityTable/DestinityNumericalValues';
import DestinityTable from '../destinityTable/DestinityTable';

export default function DestinyPDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const table = consultant.getDestinityTable();
  const table1 = table.slice(0, 30);
  const table2 = table.slice(30, 60);
  const table3 = table.slice(60, 90);
  const table4 = table.slice(90, 120);
  const table5 = table.slice(120, 150);
  const nameCycles = consultant.calcNameCycles();
  const nameSubCycles = consultant.calcNameSubCycles();

  return [
    {
      bg: nameImage,
      children: (
        <>
          <DestinityTable consultant={consultant} newDate={date} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table1} slice={0} start={0} />
          <DestinityTable consultant={consultant} newDate={date} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table2} slice={1} start={30} />
        </>
      ),
    },
    {
      bg: nameImage,
      children: (
        <>
          <DestinityTable consultant={consultant} newDate={date} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table3} slice={0} start={60} />
          <DestinityTable consultant={consultant} newDate={date} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table4} slice={1} start={90} />
        </>
      ),
    },
    {
      bg: nameImage2,
      children: (
        <>
          <DestinityTable consultant={consultant} newDate={date} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table5} slice={0} start={120} />
          <DestinityNumericalValues consultant={consultant} date={date} />
        </>
      ),
    },
  ];
}

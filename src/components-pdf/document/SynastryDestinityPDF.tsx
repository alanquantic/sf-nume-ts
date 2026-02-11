import { SplittedDate } from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import nameImage from '../assets/s-destinity-table.jpg';

import nameImage2 from '../assets/s-destinity-table.jpg';
import SynastryDestinityTable from '../synastryDestinyTable/SynastryDestinyTable';
import SynastryData from '../synastryVibrationTime/SynastryData';

export default function SynastryDestinityPDF({ synastry, date, partnerYear }: { synastry: Synastry, date: SplittedDate, partnerYear: number }) {
  const ageMeet = partnerYear - synastry.consultant.birthDate.getFullYear();
  const t = synastry.consultant.getDestinityTable();
  const table = t.slice(ageMeet);

  const table1 = table.slice(0, 11);
  const table2 = table.slice(11, 22);
  const table3 = table.slice(22, 33);
  const table4 = table.slice(33, 44);
  const table5 = table.slice(44, 55);
  const table6 = table.slice(55, 66);

  // const ageMeetP = moment(synastry.partner.yearMeet).year() - partner.birthDate.year()
  const ageMeetP = partnerYear - synastry.partner.birthDate.getFullYear();

  let partnerTable = [];
  let partnerTable1 = [];
  let partnerTable2 = [];
  let partnerTable3 = [];
  let partnerTable4 = [];
  let partnerTable5 = [];
  let partnerTable6 = [];

  const tP = synastry.partner.getDestinityTable();
  partnerTable = tP.slice(ageMeetP);
  partnerTable1 = partnerTable.slice(0, 11);
  partnerTable2 = partnerTable.slice(11, 22);
  partnerTable3 = partnerTable.slice(22, 33);
  partnerTable4 = partnerTable.slice(33, 44);
  partnerTable5 = partnerTable.slice(44, 55);
  partnerTable6 = partnerTable.slice(55, 66);

  return [{
    bg: nameImage,
    children: (
      <>
        <SynastryData synastry={synastry} date={date} horizontal />
        <SynastryDestinityTable
          table={table1}
          date={date}
          start={0 + ageMeet}
          consultant={synastry.consultant}
          partner={synastry.partner}
          tableP={partnerTable1}
          startP={0 + ageMeetP}
          slice={0}
          yearMeet={partnerYear}
        />
        <SynastryDestinityTable
          date={date}
          slice={1}
          table={table2}
          start={11 + ageMeet}
          consultant={synastry.consultant}
          partner={synastry.partner}
          tableP={partnerTable2}
          startP={11 + ageMeetP}
          yearMeet={partnerYear}
        />
      </>),
  }, {
    bg: nameImage2,
    children: (
      <>
        <SynastryData synastry={synastry} date={date} horizontal />
        <SynastryDestinityTable
          table={table3}
          date={date}
          start={22 + ageMeet}
          consultant={synastry.consultant}
          partner={synastry.partner}
          tableP={partnerTable3}
          startP={22 + ageMeetP}
          slice={0}
          yearMeet={partnerYear}
        />
        <SynastryDestinityTable
          date={date}
          slice={1}
          table={table4}
          start={33 + ageMeet}
          consultant={synastry.consultant}
          partner={synastry.partner}
          tableP={partnerTable4}
          startP={33 + ageMeetP}
          yearMeet={partnerYear}
        />
      </>),
  }, {
    bg: nameImage2,
    children: (
      <>
        <SynastryData synastry={synastry} date={date} horizontal />
        <SynastryDestinityTable
          table={table5}
          date={date}
          start={44 + ageMeet}
          consultant={synastry.consultant}
          partner={synastry.partner}
          tableP={partnerTable5}
          startP={44 + ageMeetP}
          slice={0}
          yearMeet={partnerYear}
        />
        <SynastryDestinityTable
          date={date}
          slice={1}
          table={table6}
          start={55 + ageMeet}
          consultant={synastry.consultant}
          partner={synastry.partner}
          tableP={partnerTable6}
          startP={55 + ageMeetP}
          yearMeet={partnerYear}
        />
      </>
    ),
  },
  ];
}

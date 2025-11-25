import useConsult from '@/hooks/useConsult';
import ActiveName from './ActiveName';

export default function NameCycle() {
  const { consultant } = useConsult();
  if (!consultant) return null;

  const table = consultant.getNameSetting();
  const table1 = table.slice(0, 31);
  const table2 = table.slice(31, 62);
  const table3 = table.slice(62, 93);
  const table4 = table.slice(93, 124);
  const table5 = table.slice(124, 155);
  const table6 = table.slice(155, 186);

  const nameCycles = consultant.calcNameCycles();
  const nameSubCycles = consultant.calcNameSubCycles();
  return (
    <div className="pinnacle-wrap px-8 py-8">
      <ActiveName
        table={table1}
        start={0}
        nameCycles={nameCycles}
        nameSubCycles={nameSubCycles}
      />
      <ActiveName
        table={table2}
        start={31}
        nameCycles={nameCycles}
        nameSubCycles={nameSubCycles}
      />
      <ActiveName
        table={table3}
        start={62}
        nameCycles={nameCycles}
        nameSubCycles={nameSubCycles}
      />
      <ActiveName
        table={table4}
        start={93}
        nameCycles={nameCycles}
        nameSubCycles={nameSubCycles}
      />
      <ActiveName
        table={table5}
        start={124}
        nameCycles={nameCycles}
        nameSubCycles={nameSubCycles}
      />
      <ActiveName
        table={table6}
        start={155}
        nameCycles={nameCycles}
        nameSubCycles={nameSubCycles}
      />
    </div>
  );
}

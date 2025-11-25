import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import DestinyTable from '@/components/personal/destinyTable/DestinyTable';
import NumericValues from '@/components/personal/destinyTable/NumericValues';
import SectionTitle from '@/components/SectionTitle';
import useConsult from '@/hooks/useConsult';

export default function DestinyTablePage() {
  const { t } = useTranslation();
  const { consultant } = useConsult();
  if (!consultant) return (<NoConsultantSelected />);

  const table = consultant.getDestinityTable();
  const table1 = table.slice(0, 30);
  const table2 = table.slice(30, 60);
  const table3 = table.slice(60, 90);
  const table4 = table.slice(90, 120);
  const table5 = table.slice(120, 150);
  const table6 = table.slice(150, 180);

  const nameCycles = consultant.calcNameCycles();
  const nameSubCycles = consultant.calcNameSubCycles();

  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 gap-6 pt-10 relative">
        <div className="col-span-12 mb-5">
          <SectionTitle title={t('destinyTable.title')} />
          <div className="pinnacle-wrap px-8 pb-3 pt-10">
            <DestinyTable
              table={table1}
              start={0}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table2}
              start={30}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table3}
              start={60}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table4}
              start={90}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table5}
              start={120}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table6}
              start={150}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
          </div>
        </div>
        <div className="col-span-12 mb-5">
          <SectionTitle title={t('destinyTable.numericValues.title')} />
          <NumericValues />
        </div>
      </div>
    </div>
  );
}

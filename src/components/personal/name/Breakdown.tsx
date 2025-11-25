import useConsult from '@/hooks/useConsult';
import NameBreakdown from './NameBreakdown';

type UngroupName = {
  v: number;
  L: string;
  c: number;
  checkL?: string;
};

export default function Breakdown({ checkBreakdown }: { checkBreakdown: boolean }) {
  const { consultant } = useConsult();
  if (!consultant) return null;
  const {
    lastName, scdLastName, nameView,
  } = consultant;
  const names = nameView.toLocaleLowerCase().split(' ');

  const ungroupNames = names.map((el: string) => ({
    name: consultant.getUngroupName(el),
    values: consultant.getUngroupNameValues(el),
    total: consultant.getUngroupNameTotal(el),
  }));

  ungroupNames.forEach((el: { name: UngroupName[] }) => {
    for (let index = el.name.length; index < 28; index += 1) {
      el.name.push({} as UngroupName);
    }
  });

  const ungroupLast = consultant.getUngroupName(lastName);
  const ungroupLastV = consultant.getUngroupNameValues(lastName);
  const ungroupLastT = consultant.getUngroupNameTotal(lastName);

  for (let index = ungroupLast.length; index < 28; index += 1) {
    ungroupLast.push({} as UngroupName);
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName);
  const ungroupSCDLastV = consultant.getUngroupNameValues(scdLastName);
  const ungroupSCDLastT = consultant.getUngroupNameTotal(scdLastName);

  for (let index = ungroupSCDLast.length; index < 28; index += 1) {
    ungroupSCDLast.push({} as UngroupName);
  }

  return (
    <div className="pinnacle-wrap px-8 py-8">
      {ungroupNames.map((ungroup, index) => (
        <NameBreakdown
          checkBreakdown={checkBreakdown}
          name={ungroup.name}
          values={ungroup.values}
          total={ungroup.total}
          description={`N${index + 1}`}
        />
      ))}
      <NameBreakdown
        checkBreakdown={checkBreakdown}
        name={ungroupLast}
        values={ungroupLastV}
        total={ungroupLastT}
        description="AP"
      />
      <NameBreakdown
        checkBreakdown={checkBreakdown}
        name={ungroupSCDLast}
        values={ungroupSCDLastV}
        total={ungroupSCDLastT}
        description="AM"
      />
    </div>
  );
}

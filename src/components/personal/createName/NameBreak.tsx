import Person from '@/resources/Person';
import { reduceNumber } from '@/utils/numbers';
import NameBreakdown from './NameBreakdown';

type NameBreakProps = {
  createNameObj: Person;
  checkBreakdown: boolean;
};

type UngroupName = {
  v: number;
  L: string;
  c: number;
  checkL?: string;
};
type Ungroup = {
  ungroupNameI: UngroupName[];
};

export default function NameBreak({ createNameObj, checkBreakdown }: NameBreakProps) {
  const ungroupName = createNameObj.getUngroupName();
  const ungroupNameT = createNameObj.getUngroupNameTotal();
  const unGroupNameV = createNameObj.getUngroupNameValues();

  let ungroup: Ungroup[] = [];
  const split = 28;
  let tables = 0;
  let count = 0;
  do {
    count = (tables + 1) * split;
    const ungroupNameI = ungroupName.slice(tables * split, count);
    while (ungroupNameI.length < 28) {
      ungroupNameI.push({} as UngroupName);
    }
    ungroup = [
      ...ungroup,
      {
        ungroupNameI,
      },
    ];
    tables += 1;
  } while (count < ungroupName.length);
  return (
    <div className="pinnacle-wrap px-8 py-8">
      <div className="flex justify-center">
        <div className="">
          {
            ungroup.map((group) => (
              <NameBreakdown
                name={group.ungroupNameI}
                description=" "
              />
            ))
          }
        </div>
        <div className="nameBreakdown mb-4 flex">
          <div className="ml-5">
            <div className={`
                          text-13 w-30 h-30 bg-gold bg-opacity-10 rounded-md inner-shadow
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
            >
              {checkBreakdown ? ungroupNameT[0].v : reduceNumber(unGroupNameV[0].vA)}
            </div>
            <div className={`
                          text-13 w-30 h-30 font-bold bg-main text-white rounded-md inner-shadow
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
            >
              {checkBreakdown ? ungroupNameT[0].checkL : ungroupNameT[0].L}
            </div>
            <div className={`
                          text-13 w-30 h-30 bg-gold bg-opacity-10 rounded-md inner-shadow
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
            >
              {checkBreakdown ? ungroupNameT[0].c : reduceNumber(unGroupNameV[0].cA)}
            </div>
          </div>
          <div className="ml-3">
            <div className={`
                          text-13 w-30 h-30 font-bold
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
            >
              V
            </div>
            <div className={`
                          text-13 h-30 font-bold
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
            >
              N
            </div>
            <div className={`
                          text-13 w-30 h-30 font-bold
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
            >
              C
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

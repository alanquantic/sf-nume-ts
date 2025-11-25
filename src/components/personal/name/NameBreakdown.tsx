import { reduceNumber } from '@/utils/numbers';

type NameBreakdownProps = {
  name: any;
  values: any;
  total: any;
  description: string;
  checkBreakdown: boolean;
};

export default function NameBreakdown({
  name, values, total, description, checkBreakdown,
}: NameBreakdownProps) {
  const hasValues = () => values !== undefined;

  const hasTotals = () => total !== undefined && description !== undefined;

  return (
    <div className="nameBreakdown flex mb-4 justify-center">
      <div className="mr-3">
        <div className="text-13 w-30 h-30 font-bold">V</div>
        <div className="text-13 h-30 font-bold">
          {description}
          {' '}
        </div>
        <div className="text-13 w-30 h-30 font-bold">C </div>
      </div>

      { name.map((el: any, i: number, row: any) => (
        <div className="destinityValue border-l border-gray-500" key={el.timestamp}>
          <div className={`text-13 w-30 h-30 bg-black bg-opacity-10 border-t border-gray-500 ${i + 1 === row.length ? 'border-r' : ''}`}>
            {el.v !== 0 ? el.v : ''}
          </div>
          <div className={`text-13 w-30 h-30 font-bold bg-main-40 border-t border-b border-gray-500 ${i + 1 === row.length ? 'border-r' : ''}`}>
            {el.L}
          </div>
          <div className={`text-13 w-30 h-30 bg-black bg-opacity-10 border-b border-gray-500 ${i + 1 === row.length ? 'border-r' : ''}`}>
            {el.c !== 0 ? el.c : ''}
          </div>
        </div>
      ))}

      { hasValues()
        ? (
          <div className="">
            <div className="text-13 w-30 h-30 bg-black bg-opacity-10 ml-5 rounded-md inner-shadow">
              {values[0].v !== 0 ? values[0].v : ''}
            </div>
            <div className="w-30 h-30" />
            <div className="text-13 w-30 h-30 bg-black bg-opacity-10 ml-5 rounded-md inner-shadow">
              {values[0].c !== 0 ? values[0].c : ''}
            </div>
          </div>
        ) : ''}

      { hasTotals()
        ? (
          <>
            <div className="ml-5">
              <div className="text-13 w-30 h-30 bg-gold bg-opacity-10 rounded-md inner-shadow">
                {checkBreakdown ? total[0].v : reduceNumber(values[0].vA)}
              </div>
              <div className="text-13 w-30 h-30 font-bold bg-main text-white rounded-md inner-shadow">
                {checkBreakdown ? total[0].checkL : total[0].L}
              </div>
              <div className="text-13 w-30 h-30 bg-gold bg-opacity-10 rounded-md inner-shadow">
                {checkBreakdown ? total[0].c : reduceNumber(values[0].cA)}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-13 w-30 h-30 font-bold">V </div>
              <div className="text-13 h-30 font-bold">
                {description}
                {' '}
              </div>
              <div className="text-13 w-30 h-30 font-bold">C </div>
            </div>
          </>
        )
        : ''}
    </div>
  );
}

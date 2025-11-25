import useConsult from '@/hooks/useConsult';

type ActiveNameProps = {
  table: any;
  start: number;
  nameCycles: number[];
  nameSubCycles: number[];
};

export default function ActiveName({
  table, start, nameCycles, nameSubCycles,
}: ActiveNameProps) {
  const { consultationDate: newDate, consultant } = useConsult();

  if (!consultant) return null;
  if (table.length === 0) return null;

  const consultantAge = consultant.getYearsOld(newDate.getFullYear());
  const isCycle = (i: number) => (i === consultantAge ? false : nameCycles.includes(i));
  const isSubCycle = (i: number) => (i === consultantAge ? false : nameSubCycles.includes(i));
  const bkConfig = (i:number, bg: string) => {
    if (i === consultantAge) {
      return 'bg-red-80';
    }
    if (isCycle(i)) {
      return 'bg-gold-10';
    }
    if (isSubCycle(i)) {
      return 'bg-gold-5';
    }
    return bg;
  };
  return (
    <div className="active-name flex mb-8 justify-center">
      <div className="">
        <div className="h-30 text-13 font-bold flex items-center bg-main-30 border-t border-gray-500 border-r border-l px-1">Año </div>
        <div className="h-30 text-13 font-bold flex items-center bg-main-15 border border-gray-500 px-1">Edad </div>
        <div className="h-60 text-13 font-bold flex items-center bg-black bg-opacity-15 border-b border-l border-gray-500 border-r px-1">
          Ciclo del
          <br />
          Nombre
          {' '}
        </div>
      </div>
      {table.map((el: any, i: number) => (
        <div className="w-8" key={el.timestamp}>
          <div className={`h-30 text-11 ${bkConfig(i + start, 'bg-main-30')} flex items-center justify-center border-t border-gray-500 border-r w-8`}>
            {consultant.getYearOfBirth() + i + start}
            {' '}
          </div>
          <div className={`h-30 text-13 ${bkConfig(i + start, 'bg-main-15')} flex items-center justify-center border-r border-t border-b border-gray-500`}>
            {i + start}
            {' '}
          </div>
          <div className={`h-60 text-13 ${bkConfig(i + start, '')} text-black border-r border-b border-gray-500 flex flex-col items-center justify-center bg-gray-300`}>
            <strong className="h-30 flex items-center justify-center border-b border-gray-500 w-full text-center ">{el.pmC}</strong>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={`h-30 text-xs flex items-center justify-center ${!isCycle ? 'bg-white' : ''} w-full text-center overflow-hidden ${bkConfig(i + start, 'bg-white')} `}>
              {el.pmN}
              /
              {el.pmD}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

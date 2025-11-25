import Person from '@/resources/Person';

type InclusionTableProps = {
  createNameObj: Person;
};

export default function InclusionTable({ createNameObj }: InclusionTableProps) {
  return (
    <div className="pinnacle-wrap px-8 py-10">
      <div className="grid grid-cols-10 gap-3">
        <div className=" gap-4 flex justify-center items-center flex-col">
          <div className="h-5" />
          <div className="w-full col-start-1 row-start-2 col-span-2 h-10 text-13 font-black text-gray-400 flex justify-center items-center">
            Casas:
          </div>
          <div className="w-full col-start-1 row-start-3 col-span-2 h-10 text-13 font-black text-gray-400 flex justify-center items-center">
            Habs:
          </div>
        </div>

        {Object.entries(createNameObj.getAppearances()).map((el) => (
          <div className="gap-4 flex justify-center items-center flex-col">
            <div className="text-13 text-gray-500 h-5">
              {el[1].v}
              {' '}
            </div>
            <div className="h-10 w-10 text-xl font-bold flex justify-center items-center bg-purple-30 border border-main rounded-md inner-shadow">
              {el[0]}
              {' '}
            </div>
            <div className="h-10 w-10 text-xl font-bold flex justify-center items-center bg-gray-300 border border-gray-500 rounded-md inner-shadow">
              {el[1].a}
              {' '}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

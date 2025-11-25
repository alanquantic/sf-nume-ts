type NameBreakdownProps = {
  name: UngroupName[];
  description: string;
};
type UngroupName = {
  v: number;
  L: string;
  checkL?: string;
  c: number;
};

export default function NameBreakdown({
  name, description,
}: NameBreakdownProps) {
  return (
    <div className="nameBreakdown flex mb-4 justify-center">
      <div className="mr-3">
        <div className="text-13 w-30 h-30 font-bold">V </div>
        <div className="text-13 h-30 font-bold">
          {description}
          {' '}
        </div>
        <div className="text-13 w-30 h-30 font-bold">C </div>
      </div>

      { name.map((el, i, row) => (
        <div className="destinityValue border-l border-gray-500">
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
    </div>
  );
}

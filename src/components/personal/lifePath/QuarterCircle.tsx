interface QuarterData {
  id: string;
  months: string;
  value: string;
  isActive: boolean;
}

export default function QuarterCircle({ value, months, isActive }: Omit<QuarterData, 'id'>) {
  return (
    <div
      className={`
      cicle-year bg-green-30 text-xl font-bold flex items-center justify-center rounded-md w-10 h-10
      ${isActive ? 'quater-active' : ''}
    `}
    >
      {value}
      <div className={`path-quarter-des ${isActive ? 'path-quater-active' : ''}`}>
        {months}
      </div>
    </div>
  );
}

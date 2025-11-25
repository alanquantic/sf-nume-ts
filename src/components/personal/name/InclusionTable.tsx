import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

export default function InclusionTable() {
  const { consultant } = useConsult();
  if (!consultant) return null;

  const { t } = useTranslation();

  const appearances = consultant.getAppearances();
  return (
    <div className="pinnacle-wrap px-8 py-8">
      <div className="grid grid-cols-11 gap-3">
        <div className="col-span-2 gap-4 flex justify-center items-center flex-col">
          <div className="h-5" />
          <div className="w-full col-start-1 row-start-2 col-span-2 h-10 text-xl font-black text-black flex justify-center items-center bg-purple-30 border border-main rounded-md inner-shadow">
            {t('name.inclusionTable.houses')}
          </div>
          <div className="w-full col-start-1 row-start-3 col-span-2 h-10 text-xl font-black text-black flex justify-center items-center bg-gray-300 border-gray-500 border rounded-md inner-shadow">
            {t('name.inclusionTable.inhabitants')}
          </div>
        </div>

        {Object.entries(appearances).map((el) => (
          <div
            key={`${el[0]}-${el[1].v}-${el[1].a}`}
            className="gap-4 flex justify-center items-center flex-col"
          >
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

import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

export default function BalanceExistential() {
  const { consultant } = useConsult();
  if (!consultant) return null;

  const { t } = useTranslation();

  const appearances = consultant.getAppearances();
  const balanceExistential = [
    {
      name: t('name.balanceExistential.physicalPlane'),
      v: appearances[4].a + appearances[5].a,
      c: 'bg-red border-red',
      cT: 'text-red',
      d: t('name.balanceExistential.physicalPlaneValues'),
    },
    {
      name: t('name.balanceExistential.mentalPlane'),
      v: appearances[1].a + appearances[8].a,
      c: 'bg-green border-green',
      cT: 'text-green',
      d: t('name.balanceExistential.mentalPlaneValues'),
    },
    {
      name: t('name.balanceExistential.emotionalPlane'),
      v: appearances[2].a + appearances[3].a + appearances[6].a,
      c: 'bg-blue-30 border-blue',
      cT: 'text-blue',
      d: t('name.balanceExistential.emotionalPlaneValues'),
    },
    {
      name: t('name.balanceExistential.spiritualPlane'),
      v: appearances[7].a + appearances[9].a,
      c: 'bg-main-40 border-main',
      cT: 'text-main',
      d: t('name.balanceExistential.spiritualPlaneValues'),
    },
  ];

  return (
    <div className="pinnacle-wrap px-8 py-8">
      <div>
        <div className="flex">
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.firstPlace')}
          </div>
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.secondPlace')}
          </div>
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.thirdPlace')}
          </div>
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.fourthPlace')}
          </div>
        </div>
        <div className="flex">
          {balanceExistential.map((el) => (
            <div
              key={`${el.name}-${el.v}-${el.c}-${el.cT}-${el.d}`}
              className="balanceExistential flex justify-center items-center flex-col w-1/4"
              data-value={el.v}
            >
              <div
                className={`h-10 w-10 text-xl font-bold flex justify-center items-center bg-white border border-gray-500 rounded-md inner-shadow my-4 ${el.c}`}
              >
                {el.v}
              </div>
              <div className={`text-13 font-bold ${el.cT}`}>{el.name}</div>
              <div className="text-13 text-gray-500">{el.d}</div>
              {/* <div className='text-13 text-gray-500 h-5'>{el[1].v} </div>
                <div className='h-10 w-10 text-xl font-bold flex justify-center items-center bg-purple-30 border border-main rounded-md inner-shadow'>{el[0]} </div>
                <div className='h-10 w-10 text-xl font-bold flex justify-center items-center bg-gray-300 border border-gray-500 rounded-md inner-shadow'>{el[1].a} </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

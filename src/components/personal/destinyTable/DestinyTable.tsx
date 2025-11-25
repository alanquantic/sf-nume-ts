import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';
import { reduceNumber } from '@/utils/numbers';

type DestinyTableProps = {
  table: any;
  start: any;
  consultant: Person;
  nameCycles: any;
  nameSubCycles: any;
};
type DestinyTableValuesProps = {
  pmC: string;
  pmN: number;
  pmD: number;
  pMC: string;
  pMN: number;
  pMD: number;
  pfC: string;
  pfN: number;
  pfD: number;
};

export default function DestinyTable({
  table,
  start,
  consultant,
  nameCycles,
  nameSubCycles,
}: DestinyTableProps) {
  const { t } = useTranslation();
  const { calculationDate } = useConsult();
  const single = consultant.getSingle();
  const [binomActive, setBinomActive] = useState(false);
  const consultantAge = consultant.getYearsOld(calculationDate.year);

  const isCycle = (i: number) => (i === consultantAge ? false : nameCycles.includes(i));
  const isSubCycle = (i: number) => (i === consultantAge ? false : nameSubCycles.includes(i));
  const bkConfig = (i: number, bg: string) => {
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
    <div className="">
      <div className="destinity-table flex mb-8 justify-center">
        <div className="w-32 z-0">
          <div className="h-6 w-32 text-13 font-black bg-main-30 border-t border-gray-400 border-l border-r flex items-center justify-start px-1">
            {t('destinyTable.year')}
          </div>
          <div className="h-6 text-13 font-black bg-black bg-opacity-10 border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.age')}
          </div>
          <div className="h-12 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.mentalPlane')}
          </div>
          <div className="h-12 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.physicalPlane')}
          </div>
          <div className="h-12 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.emotionalPlane')}
          </div>
          <button
            type="button"
            className={` ${
              binomActive ? 'bg-gold' : 'bg-yellow'
            } h-10 z-0 font-bold mb-1 rounded-tl-3xl  rounded-tr-3xl rounded-bl-3xl flex justify-center items-center absolute btn-destiny text-13 text-white px-2`}
            onClick={() => {
              setBinomActive(!binomActive);
            }}
          >
            {t('destinyTable.binomials')}
          </button>
          <div className="h-10 text-13 font-black bg-pink border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.spiritualPlane')}
          </div>
          {/* <div className='h-10 text-13 font-black bg-gray-300 text-gray-500 border-b border-gray-400 border-l border-r px-1'>Ciclo del<br/>Nombre </div> */}
          <div className="mt-5 h-10 text-13 font-black bg-gray bg-opacity-15 border-b border-l border-r border-t border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.personalYear')}
          </div>
          <div className="h-10 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
            {t('destinyTable.destinyNumber')}
          </div>
        </div>
        {table.map((el: DestinyTableValuesProps, i: number) => (
          <div className="nameBreakdown">
            <div
              className={`h-6 w-30 text-10  ${bkConfig(
                i + start,
                'bg-main-30',
              )} text-center border-t border-gray-400 border-r`}
            >
              {consultant.getYearOfBirth() + i + start}
            </div>
            <div
              className={`h-6 w-30 text-13 ${bkConfig(
                i + start,
                'bg-black bg-opacity-10',
              )} text-center border-b border-r border-gray-400`}
            >
              {i + start}
              {' '}
            </div>
            <div
              className={`h-12 w-30 text-13 ${bkConfig(
                i + start,
                'bg-white',
              )} border-b border-r border-gray-400 flex flex-col`}
            >
              <strong className="h-6 text-center border-b border-gray-400 w-full">
                {el.pmC}
              </strong>
              <p className="h-6 text-center text-10 pt-1">
                {el.pmN}
                /
                {el.pmD}
              </p>
            </div>
            <div
              className={`h-12 w-30 text-13 ${bkConfig(
                i + start,
                'bg-white',
              )} border-b border-r border-gray-400 flex flex-col`}
            >
              <strong className="h-6 text-center border-b border-gray-400 w-full">
                {el.pMC}
              </strong>
              <p className="h-6 text-center text-10 pt-1">
                {el.pMN}
                /
                {el.pMD}
              </p>
            </div>
            <div
              className={`h-12 w-30 text-13 ${bkConfig(
                i + start,
                'bg-white',
              )} border-b border-r border-gray-400 flex flex-col`}
            >
              <strong className="h-6 text-center border-b border-gray-400 w-full">
                {single ? el.pfC : ''}
              </strong>
              <p className="h-6 text-center text-10 pt-1">
                {single ? `${el.pfN}/${el.pfD}` : ''}
              </p>
            </div>
            <div
              className={`h-10 w-30 ${bkConfig(
                i + start,
                'bg-pink',
              )} border-b border-r border-gray-400 flex items-center justify-center ${
                binomActive ? 'text-xs' : 'text-13'
              }`}
            >
              <strong>
                {binomActive
                && `${reduceNumber(
                  el.pmN + el.pMN + (single ? el.pfN : 0),
                )}/`}
                {reduceNumber(el.pmD + el.pMD + (single ? el.pfD : 0))}
              </strong>
            </div>

            <div
              className={`mt-5 h-10 w-30 text-13 ${bkConfig(
                i + start,
                'bg-gray bg-opacity-15',
              )} border-b border-r border-t border-gray-400 flex items-center justify-center`}
            >
              {consultant.calcPersonalYear(
                consultant.getYearOfBirth() + i + start,
              )}
            </div>
            <div
              className={`h-10 w-30 text-13 ${bkConfig(
                i + start,
                'bg-white',
              )} border-b border-r border-gray-400 flex items-center justify-center`}
            >
              {reduceNumber(
                el.pmD
                + el.pMD
                + (single ? el.pfD : 0)
                + consultant.calcPersonalYear(
                  consultant.getYearOfBirth() + i + start,
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

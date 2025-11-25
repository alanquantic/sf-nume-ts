import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';
import { reduceNumberISK } from '@/utils/numbers';

type UngroupName = {
  v: number;
  L: string;
  c: number;
};

export default function ActiveNameComponents({ checkActiveName }: { checkActiveName: boolean }) {
  const { consultant } = useConsult();
  if (!consultant) return null;
  const { t } = useTranslation();

  const {
    name, lastName, scdLastName, nameView,
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
  const ungroupLastT = consultant.getUngroupNameTotal(lastName);

  for (let index = ungroupLast.length; index < 28; index += 1) {
    ungroupLast.push({} as UngroupName);
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName);
  const ungroupSCDLastT = consultant.getUngroupNameTotal(scdLastName);

  for (let index = ungroupSCDLast.length; index < 28; index += 1) {
    ungroupSCDLast.push({} as UngroupName);
  }

  const ungroupName = consultant.getUngroupName(name);
  const ungroupNameT = consultant.getUngroupNameTotal(name);

  for (let index = ungroupName.length; index < 28; index += 1) {
    ungroupName.push({} as UngroupName);
  }

  return (
    <div className="pinnacle-wrap px-8 py-8">
      <div className="grid grid-cols-24">
        <div className="col-span-15">
          <div className="flex items-center mb-6">
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.vowels')}
            </div>
            {ungroupNames.map((ungroup) => (
              <div className="flex items-center" key={ungroup.name.length}>
                <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
                  {ungroup.total[0].v}
                </div>
                <div className="col-span-2 text-13 font-bold text-gray-500">
                  +
                </div>
              </div>
            ))}
            <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
              {ungroupLastT[0].v}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              +
            </div>
            <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
              {ungroupSCDLastT[0].v}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className=" w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bg-black bg-opacity-15">
              {consultant.calcSoulNumberFull()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow mx-4">
              {checkActiveName ? consultant.getSoulCheck() : consultant.calcSoulNumber()}
              {consultant.calcSoulNumberISK()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.soulNumber')}
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.consonants')}
            </div>
            {ungroupNames.map((ungroup) => (
              <div className="flex items-center">
                <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
                  {ungroup.total[0].c}
                </div>
                <div className="col-span-2 text-13 font-bold text-gray-500">
                  +
                </div>
              </div>
            ))}
            <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
              {ungroupLastT[0].c}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              +
            </div>
            <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
              {ungroupSCDLastT[0].c}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className=" w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bg-black bg-opacity-15">
              {consultant.calcSoulExpresionFull()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow-gold mx-4">
              {consultant.calcSoulExpression()}
              {consultant.calcSoulExpressionISK()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.expressionNumber')}
            </div>
          </div>
          <div className="flex items-center">
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.totals')}
            </div>
            {ungroupNames.map((ungroup) => (
              <div className="flex items-center">
                <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
                  {reduceNumberISK(
                    ungroup.total[0].v + ungroup.total[0].c,
                  )}
                </div>
                <div className="col-span-2 text-13 font-bold text-gray-500">
                  +
                </div>
              </div>
            ))}
            <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
              {reduceNumberISK(
                ungroupLastT[0].v + ungroupLastT[0].c,
              )}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              +
            </div>
            <div className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2">
              {reduceNumberISK(
                ungroupSCDLastT[0].v + ungroupSCDLastT[0].c,
              )}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className=" w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bg-black bg-opacity-15">
              {consultant.calcNameFull()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow mx-4">
              {consultant.calcName()}
              {consultant.calcNameISK()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.powerOfNameNumber')}
            </div>
          </div>
        </div>
        <div className="col-span-9 border-l border-gray-500">
          <div className="flex items-center mb-6 pl-6">
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.absentValues')}
            </div>
            <div className="h-10 text-xl font-black text-black flex justify-center items-center bg-white border border-red inner-shadow px-4 rounded-md">
              {consultant.getAbsencesName()}
            </div>
          </div>
          <div className="flex items-center mb-6 pl-6">
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.initials')}
            </div>
            <div className="h-10 text-2xl font-black text-black flex justify-center items-center bg-white border border-green inner-shadow px-2 rounded-md mx-2">
              {consultant.getInitials()}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className="h-10 w-10 text-2xl font-black text-black flex justify-center items-center bg-white border border-green inner-shadow px-4 rounded-full mx-2">
              {consultant.calcInitials()}
            </div>
          </div>
          <div className="flex items-center mb-6 pl-6">
            <div className="col-span-2 text-13 font-bold text-gray-500 w-32">
              {t('name.activeName.activeName')}
            </div>
            <div
              className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bottom-letter"
              data-letter="V"
            >
              {ungroupNameT[0].vA}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              +
            </div>
            <div
              className="border border-blue w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bottom-letter"
              data-letter="C"
            >
              {ungroupNameT[0].cA}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className=" w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bg-black bg-opacity-15">
              {ungroupNameT[0].cA + ungroupNameT[0].vA}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className=" w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold inner-shadow mx-2 bg-black bg-opacity-15">
              {reduceNumberISK(
                ungroupNameT[0].cA + ungroupNameT[0].vA,
              )}
            </div>
            <div className="col-span-2 text-13 font-bold text-gray-500">
              =
            </div>
            <div className="h-10 w-10 text-2xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue inner-shadow px-4 rounded-full mx-2">
              {ungroupNameT[0].L}
              {consultant.karmic.includes(
                reduceNumberISK(
                  ungroupNameT[0].c + ungroupNameT[0].v,
                ),
              )
                ? '*'
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

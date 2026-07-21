import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

export default function NumericalValuesOfTheName({
  checkN,
}: {
  checkN: boolean;
}) {
  const { t } = useTranslation();
  const { consultant } = useConsult();

  if (!consultant) return null;

  return (
    <div className="pinnacle-wrap px-8 py-3">
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">{t('name.numericValues.name')}</p>
          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow">
            {!checkN
              ? `${consultant.calcName()}${consultant.calcNameViewISK()}`
              : `${consultant.getNameCheck()}${consultant.getNameCheckISK()}`}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">{t('name.numericValues.soul')}</p>
          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow-gold">
            {!checkN
              ? `${consultant.calcSoulNumber()}${consultant.calcSoulNumberViewISK()}`
              : `${consultant.getSoulCheck()}${consultant.calcSoulNumberISK()}`}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">{t('name.numericValues.expression')}</p>
          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow">
            {!checkN
              ? `${consultant.calcSoulExpression()}${consultant.calcSoulExpressionViewISK()}`
              : `${consultant.getExpressionSoulCheck()}${consultant.calcSoulExpressionISK()}`}
          </div>
        </div>
      </div>
    </div>
  );
}

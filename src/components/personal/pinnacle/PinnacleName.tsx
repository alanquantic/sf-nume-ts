import { useTranslation } from 'react-i18next';

/* eslint-disable jsx-a11y/label-has-associated-control */
import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';

export function PinnacleName({ isVerificationActive }: { isVerificationActive: boolean }) {
  const { consultant } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return null;

  return (
    <div className=" p-4">
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10">{t('pinnacle.name.name')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {(!isVerificationActive) ? `${consultant.calcName()}${consultant.calcNameISK()}` : `${consultant.getNameCheck()}${consultant.getNameCheckISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.soul')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue" radiant="true">
          {(!isVerificationActive) ? `${consultant.calcSoulNumber()}${consultant.calcSoulNumberISK()}` : `${consultant.getSoulCheck()}${consultant.calcSoulNumberISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.expression')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {(!isVerificationActive) ? `${consultant.calcSoulExpression()}${consultant.calcSoulExpressionISK()}` : `${consultant.getExpressionSoulCheck()}${consultant.calcSoulExpressionISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.maturity')}</label>
        <CircleNumber size="sm" appearance="aguamarina-30" border="aguamarina">
          {consultant.calcMaturity()}
          {consultant.calcMaturityISK()}
        </CircleNumber>
      </div>
    </div>
  );
}

export default PinnacleName;

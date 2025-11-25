import { useTranslation } from 'react-i18next';

/* eslint-disable jsx-a11y/label-has-associated-control */
import CircleNumber from '@/components/CircleNumber';
import Group from '@/resources/Group';
import Person from '@/resources/Person';

type PinnacleNameProps = {
  Consultant: Person | Group;
  main: 'bg-active-radial' | '';
  isVerificationActive: boolean;
};

export function GroupPinnacleName({ Consultant, main, isVerificationActive }: PinnacleNameProps) {
  const { t } = useTranslation();

  if (!Consultant) return null;

  return (
    <div className={`pinnacle-wrap p-4 flex justify-between items-baseline ${main}`}>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10">{t('pinnacle.name.name')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          { (isVerificationActive) ? `${Consultant.getNameCheck()}${Consultant.calcNameISK()}` : `${Consultant.calcName()}${Consultant.calcNameISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.soul')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue" radiant="true">
          { (isVerificationActive) ? `${Consultant.getSoulCheck()}${Consultant.calcSoulNumberISK()}` : `${Consultant.calcSoulNumber()}${Consultant.calcSoulNumberISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.expression')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          { (isVerificationActive) ? `${Consultant.getExpressionSoulCheck()}${Consultant.calcSoulExpressionISK()}` : `${Consultant.calcSoulExpression()}${Consultant.calcSoulExpressionISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.maturity')}</label>
        <CircleNumber size="sm" appearance="aguamarina-30" border="aguamarina">
          {Consultant.calcMaturity()}
          {Consultant.calcMaturityISK()}
        </CircleNumber>
      </div>
    </div>
  );
}

export default GroupPinnacleName;

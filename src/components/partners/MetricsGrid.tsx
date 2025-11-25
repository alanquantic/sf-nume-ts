import CircleNumber from '@/components/CircleNumber';
import { useTranslation } from 'react-i18next';

interface SynastryMetrics {
  name: string;
  soul: string;
  expression: string;
  maturity: string;
}

interface MetricsGridProps {
  metrics: SynastryMetrics;
}

function MetricsGrid({ metrics }: MetricsGridProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">{t('pinnacle.name.name')}</span>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {metrics.name}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">{t('pinnacle.name.soul')}</span>
        <CircleNumber size="sm" appearance="blue-30" border="blue" radiant>
          {metrics.soul}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">{t('pinnacle.name.expression')}</span>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {metrics.expression}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">{t('pinnacle.name.maturity')}</span>
        <CircleNumber size="sm" appearance="aguamarina-30" border="aguamarina">
          {metrics.maturity}
        </CircleNumber>
      </div>
    </div>
  );
}

export default MetricsGrid;

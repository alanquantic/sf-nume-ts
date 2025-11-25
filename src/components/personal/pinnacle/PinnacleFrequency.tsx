/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';

function PinnacleFrequency() {
  const { consultant } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-xs mt-1">
          {t('pinnacle.frequency.reaction')}
        </label>
        <CircleNumber size="sm" appearance="purple-30" border="purple">
          {consultant.calcReaction()}
          {consultant.calcReactionISK()}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-xs mt-3">
          {t('pinnacle.frequency.synthesis')}
        </label>
        <CircleNumber size="sm" appearance="purple-30" border="purple">
          {consultant.calcSynthesis()}
          {consultant.calcSynthesisISK()}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-xs mt-3">
          {t('pinnacle.frequency.gift')}
        </label>
        <CircleNumber size="sm" appearance="purple-30" border="purple">
          {consultant.calcGift()}
          {consultant.calcGiftISK()}
        </CircleNumber>
      </div>
    </>
  );
}

export default PinnacleFrequency;

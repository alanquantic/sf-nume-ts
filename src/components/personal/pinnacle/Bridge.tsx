import { useTranslation } from 'react-i18next';

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import { getResBridge } from '@/utils/numbers';

type BridgeState = {
  top: string | number;
  right: string | number;
  bottom: string | number;
  left: string | number;
  center: string | number;
  stageStart: string;
  stageEnd: string;
  stageDoubleStart: string;
  stageDoubleEnd: string;
  hasDouble: boolean;
  descriptiontop: string;
  descriptionbottom: string;
  descriptionright: string;
  descriptionleft: string;
};

type BridgeProps = {
  stage: 1 | 2 | 3 | 4;
  showVerification?: boolean;
};

function Bridge({ stage, showVerification }: BridgeProps) {
  const { consultant } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return null;

  const bridgeState: Record<1 | 2 | 3 | 4, BridgeState> = {
    1: {
      top: `${consultant.getE()}${consultant.getEISK()}`,
      right: `${consultant.getB()}${consultant.getBISK()}`,
      bottom: consultant.getK(),
      left: consultant.getA(),
      center: getResBridge(consultant.getE(), consultant.getK()),
      stageStart: `0 - ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth()}`,
      stageEnd: `${consultant.calcLifeStageDuration(6) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(7) - consultant.getYearOfBirth()}`,
      stageDoubleStart: `0 - ${consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth()}`,
      stageDoubleEnd: `${consultant.calcDoubleLifeStageDuration(6) - consultant.getYearOfBirth()} - ${consultant.calcDoubleLifeStageDuration(7) - consultant.getYearOfBirth()}`,
      hasDouble: consultant.hasDoubleStage(),
      descriptionbottom: 'K',
      descriptiontop: 'E',
      descriptionright: 'B',
      descriptionleft: 'A',
    },
    2: {
      top: `${consultant.getF()}${consultant.getFISK()}`,
      right: `${consultant.getC()}${consultant.getCISK()}`,
      bottom: consultant.getL(),
      left: `${consultant.getB()}${consultant.getBISK()}`,
      center: getResBridge(consultant.getF(), consultant.getL()),
      stageStart: `${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(2) - consultant.getYearOfBirth()}`,
      stageEnd: `${consultant.calcLifeStageDuration(5) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(6) - consultant.getYearOfBirth()}`,
      stageDoubleStart: `${consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth()} - ${consultant.calcDoubleLifeStageDuration(2) - consultant.getYearOfBirth()}`,
      stageDoubleEnd: `${consultant.calcDoubleLifeStageDuration(5) - consultant.getYearOfBirth()} - ${consultant.calcDoubleLifeStageDuration(6) - consultant.getYearOfBirth()}`,
      hasDouble: consultant.hasDoubleStage(),
      descriptiontop: 'L',
      descriptionleft: 'F',
      descriptionright: 'C',
      descriptionbottom: 'B',
    },
    3: {
      top: `${consultant.getG()}${consultant.getGISK()}`,
      right: `${consultant.getF()}${consultant.getFISK()}`,
      bottom: consultant.getM(),
      left: `${consultant.getE()}${consultant.getEISK()}`,
      center: getResBridge(consultant.getG(), consultant.getM()),
      stageStart: `${consultant.calcLifeStageDuration(2) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(3) - consultant.getYearOfBirth()}`,
      stageEnd: `${consultant.calcLifeStageDuration(4) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(5) - consultant.getYearOfBirth()}`,
      stageDoubleStart: `${consultant.calcDoubleLifeStageDuration(2) - consultant.getYearOfBirth()} - ${consultant.calcDoubleLifeStageDuration(3) - consultant.getYearOfBirth()}`,
      stageDoubleEnd: `${consultant.calcDoubleLifeStageDuration(4) - consultant.getYearOfBirth()} - ${consultant.calcDoubleLifeStageDuration(5) - consultant.getYearOfBirth()}`,
      hasDouble: consultant.hasDoubleStage(),
      descriptiontop: 'M',
      descriptionleft: 'G',
      descriptionright: 'F',
      descriptionbottom: 'E',
    },
    4: {
      top: showVerification ? `${consultant.getHCheck()}${consultant.getHISK()}` : `${consultant.getH()}${consultant.getHISKCheck()}`,
      right: `${consultant.getC()}${consultant.getCISK()}`,
      bottom: consultant.getN(),
      left: consultant.getA(),
      center: getResBridge(consultant.getH(), consultant.getN()),
      stageStart: `${consultant.calcLifeStageDuration(3) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(4) - consultant.getYearOfBirth()}`,
      stageEnd: '',
      stageDoubleStart: `${consultant.calcDoubleLifeStageDuration(3) - consultant.getYearOfBirth()} - ${consultant.calcDoubleLifeStageDuration(4) - consultant.getYearOfBirth()}`,
      stageDoubleEnd: '',
      hasDouble: consultant.hasDoubleStage(),
      descriptionbottom: 'N',
      descriptiontop: 'H',
      descriptionright: 'C',
      descriptionleft: 'A',
    },
  };

  return (
    <>
      <div className="w-full flex items-center justify-center bg-opacity-100">
        <div className="grid grid-cols-3 mt-3 gap-2 bridge-wrap relative">
          <CircleNumber size="xs" appearance="green" border="green" position="et" descriptiontop={bridgeState[stage].descriptiontop}>
            {bridgeState[stage].top}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="purple" position="el" descriptionleft={bridgeState[stage].descriptionleft}>
            {bridgeState[stage].left}
          </CircleNumber>
          <CircleNumber size="xs" appearance="gold" border="gold" position="ec">
            {bridgeState[stage].center}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="main" position="er" descriptionright={bridgeState[stage].descriptionright}>
            {bridgeState[stage].right}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="red" position="eb" descriptionbottom={bridgeState[stage].descriptionbottom}>
            {bridgeState[stage].bottom}
          </CircleNumber>
        </div>
      </div>
      <div className="grid text-xs mt-5 text-13 ml-4">
        <div className="flex gap-1">
          <FaArrowAltCircleUp color="#51A133" size={14} className="mr-1" />
          {t('pinnacle.bridge.duration', { amount: bridgeState[stage].stageStart })}
        </div>
        {bridgeState[stage].stageEnd
          && (
            <div className="flex gap-1 mt-2">
              <FaArrowAltCircleDown color="#663366" size={14} className="mr-1" />
              {t('pinnacle.bridge.duration', { amount: bridgeState[stage].stageEnd })}
            </div>
          )}
        {bridgeState[stage].stageStart !== bridgeState[stage].stageDoubleStart && (
          <>
            {bridgeState[stage].hasDouble && (
              <div className="flex gap-1 mt-4">
                <FaArrowAltCircleUp color="#51A133" size={14} />
                {' '}
                {bridgeState[stage].stageDoubleStart}
              </div>
            )}
            {bridgeState[stage].stageDoubleEnd
              && (
                <div className="flex gap-1 mt-2">
                  <FaArrowAltCircleDown color="#663366" size={14} />
                  {' '}
                  {bridgeState[stage].stageDoubleEnd}
                </div>
              )}
          </>
        )}
      </div>
    </>
  );
}

Bridge.defaultProps = {
  showVerification: false,
};

export default Bridge;

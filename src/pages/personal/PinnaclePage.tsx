import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import Bridge from '@/components/personal/pinnacle/Bridge';
import Pinnacle from '@/components/personal/pinnacle/Pinnacle';
import PinnacleFrequency from '@/components/personal/pinnacle/PinnacleFrequency';
import PinnacleName from '@/components/personal/pinnacle/PinnacleName';
import TimeCurve from '@/components/personal/pinnacle/TimeCurve';
import useConsult from '@/hooks/useConsult';
import { useState } from 'react';

function PinnaclePage() {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();
  const [isPinnacleVerificationActive, setIsPinnacleVerificationActive] = useState(false);
  const [isPinnacleNameVerificationActive, setIsPinnacleNameVerificationActive] = useState(false);
  const [isCurveTimeVerificationActive, setIsCurveTimeVerificationActive] = useState(false);

  if (!consultant) return (<NoConsultantSelected />);

  const activeStage = consultant.getLifeStageNumber(calculationDate);
  const activeScdStage = consultant.getDoubleLifeStageNumber(calculationDate);
  const secondStage = consultant.hasDoubleStage();

  const handlePinnacleVerification = () => {
    setIsPinnacleVerificationActive(!isPinnacleVerificationActive);
  };

  const handlePinnacleNameVerification = () => {
    setIsPinnacleNameVerificationActive(!isPinnacleNameVerificationActive);
  };
  const handleCurveTimeVerification = () => {
    setIsCurveTimeVerificationActive(!isCurveTimeVerificationActive);
  };

  const annualReturnCurrent = consultant.annualReturn(calculationDate);
  const annualReturnLastYear = consultant.annualReturn({ ...calculationDate, year: calculationDate.year - 1 });
  const annualReturnNextYear = consultant.annualReturn({ ...calculationDate, year: calculationDate.year + 1 });

  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid grid-cols-10 grid-rows-12 mt-8 gap-4">
        <div className="col-span-3 row-span-6">
          <SectionTitle
            title={t('pinnacle.title')}
            button={{
              text: t('pinnacle.verification') as string,
              handle: handlePinnacleVerification,
              isActive: isPinnacleVerificationActive,
            }}
          />
          <div className="section-wrap px-2 py-7 h-560">
            <Pinnacle size="sm" isVerificationActive={isPinnacleVerificationActive} />
          </div>
        </div>

        <div className="col-start-4 col-end-5 row-span-3">
          <SectionTitle
            title={t('pinnacle.name.name')}
            button={{
              text: '',
              handle: handlePinnacleNameVerification,
              isActive: isPinnacleNameVerificationActive,
            }}
            fontSize="text-9"
          />
          <div className="section-wrap">
            <PinnacleName isVerificationActive={isPinnacleNameVerificationActive} />
          </div>
        </div>

        <div className="col-span-6 row-span-3">
          <SectionTitle title={t('pinnacle.bridge.bridge')} />
          <div className="section-wrap grid grid-cols-4 h-[285px]">
            <div className={cx(
              'py-5 px-2 border-b border-solid border-gray-300',
              (activeStage === 1 || activeStage === 7) || (secondStage && (activeScdStage === 1 || activeScdStage === 7)) ? 'bg-active-radial' : 'border-r border-gray-200',
            )}
            >
              <h2 className="text-xs font-bold text-center">
                {t('pinnacle.bridge.bridgeX', { stage: 1 })}
              </h2>
              <Bridge stage={1} />
            </div>
            <div className={cx(
              'py-5 px-2 border-b border-solid border-gray-300',
              (activeStage === 2 || activeStage === 6) || (secondStage && (activeScdStage === 2 || activeScdStage === 6)) ? 'bg-active-radial' : 'border-r border-gray-200',
            )}
            >
              <h2 className="text-xs font-bold text-center">
                {t('pinnacle.bridge.bridgeX', { stage: 2 })}
              </h2>
              <Bridge stage={2} />
            </div>
            <div className={cx(
              'py-5 px-2 border-b border-solid border-gray-300',
              (activeStage === 3 || activeStage === 5) || (secondStage && (activeScdStage === 3 || activeScdStage === 5)) ? 'bg-active-radial' : 'border-r border-gray-200',
            )}
            >
              <h2 className="text-xs font-bold text-center">
                {t('pinnacle.bridge.bridgeX', { stage: 3 })}
              </h2>
              <Bridge stage={3} />
            </div>
            <div className={cx(
              'py-5 px-2 border-b border-solid border-gray-300',
              activeStage === 4 || (secondStage && activeScdStage === 4) ? 'bg-active-radial' : null,
            )}
            >
              <h2 className="text-xs font-bold text-center">
                {t('pinnacle.bridge.bridgeX', { stage: 4 })}
              </h2>
              <Bridge stage={4} />
            </div>
          </div>
        </div>

        <div className="col-start-5 col-end-11 row-span-4">
          <SectionTitle title={t('pinnacle.annualReturns.annualReturns')} />
          <div className="section-wrap grid grid-cols-3">
            <div className="px-1 py-8 border-b border-solid border-gray-300">
              <AnnualReturn size="xs" annualReturn={annualReturnLastYear} />
            </div>
            <div className="px-1 py-8 border-b border-solid border-gray-300 bg-active-radial bg-opacity-15">
              <AnnualReturn size="xs" annualReturn={annualReturnCurrent} current />
            </div>
            <div className="px-1 py-8">
              <AnnualReturn size="xs" annualReturn={annualReturnNextYear} />
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-2 col-start-4 row-start-4 ">
          <SectionTitle title={t('pinnacle.frequency.frequency')} fontSize="text-9" />
          <div className="section-wrap grid grid-cols-1 p-3 h-[285px]">
            <PinnacleFrequency />
          </div>
        </div>

        <div className="col-span-10 mb-10">
          <SectionTitle
            title={t('pinnacle.timeCurve.timeCurve')}
            button={{
              text: t('pinnacle.verification') as string,
              handle: handleCurveTimeVerification,
              isActive: isCurveTimeVerificationActive,
            }}
          />
          <div className="section-wrap px-8 py-8">
            <TimeCurve isPartner={false} isVerificationActive={isCurveTimeVerificationActive} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default PinnaclePage;

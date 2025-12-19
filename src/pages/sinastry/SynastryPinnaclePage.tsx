import {
  useCallback, useContext,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import MetricsGrid from '@/components/partners/MetricsGrid';
import PinnacleComponent from '@/components/partners/Pinnacle/Pinnacle';
import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import SectionTitle from '@/components/SectionTitle';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';

// Types
interface CheckboxState {
  checkP1: boolean;
  checkN1: boolean;
  checkP2: boolean;
  checkN2: boolean;
  checkP: boolean;
  checkN: boolean;
}

interface SynastryMetrics {
  name: string;
  soul: string;
  expression: string;
  maturity: string;
}

export default function SynastryPinnaclePage() {
  const {
    consultant, activePartnerData, selectedPartnersAsPersons, calculationDate,
  } = useContext(ConsultContext);
  const { t } = useTranslation();

  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    checkP1: false,
    checkN1: false,
    checkP2: false,
    checkN2: false,
    checkP: false,
    checkN: false,
  });

  // Toggle functions
  const createToggle = useCallback((key: keyof CheckboxState) => () => {
    setCheckboxState((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggles = {
    checkPinacle: createToggle('checkP'),
    checkName: createToggle('checkN'),
    checkPinacle1: createToggle('checkP1'),
    checkName1: createToggle('checkN1'),
    checkPinacle2: createToggle('checkP2'),
    checkName2: createToggle('checkN2'),
  };

  // Early returns
  if (!consultant) {
    return <NoConsultantSelected />;
  }

  // Verificar que hay datos de pareja válidos con al menos 2 miembros
  const hasValidPartnerData = activePartnerData 
    && selectedPartnersAsPersons 
    && Array.isArray(selectedPartnersAsPersons) 
    && selectedPartnersAsPersons.length >= 2;

  if (!hasValidPartnerData) {
    return (
      <div className="page-content bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>{t('sinastry.selectPartnerWithMembersMinimum')}</strong>
        </div>
      </div>
    );
  }

  // Use the already converted Person objects from context
  const partner1 = selectedPartnersAsPersons[0];
  const partner2 = selectedPartnersAsPersons[1];

  // Create synastry instance between the two partners (not consultant)
  const synastry = new Synastry(partner1, partner2);

  // Calculate annual returns for both partners and synastry
  const annualReturns = {
    partner1: partner1.annualReturn(calculationDate),
    partner2: partner2.annualReturn(calculationDate),
    synastry: synastry.annualReturn(calculationDate.year),
  };

  // Calculate synastry metrics directly
  const synastryMetrics: SynastryMetrics = {
    name: checkboxState.checkN
      ? `${synastry.getNameCheck()}${synastry.calcNameISK()}`
      : `${synastry.calcName()}${synastry.calcNameISK()}`,
    soul: checkboxState.checkN
      ? `${synastry.getSoulCheck()}${synastry.calcSoulNumberISK()}`
      : `${synastry.calcSoulNumber()}${synastry.calcSoulNumberISK()}`,
    expression: checkboxState.checkN
      ? `${synastry.getExpressionSoulCheck()}${synastry.calcSoulExpressionISK()}`
      : `${synastry.calcSoulExpression()}${synastry.calcSoulExpressionISK()}`,
    maturity: `${synastry.calcMaturity()}${synastry.calcMaturityISK()}`,
  };

  // Calculate partner1 metrics directly
  const partner1Metrics: SynastryMetrics = {
    name: checkboxState.checkN1
      ? `${partner1.getNameCheck()}${partner1.calcNameISK()}`
      : `${partner1.calcName()}${partner1.calcNameISK()}`,
    soul: checkboxState.checkN1
      ? `${partner1.getSoulCheck()}${partner1.calcSoulNumberISK()}`
      : `${partner1.calcSoulNumber()}${partner1.calcSoulNumberISK()}`,
    expression: checkboxState.checkN1
      ? `${partner1.getExpressionSoulCheck()}${partner1.calcSoulExpressionISK()}`
      : `${partner1.calcSoulExpression()}${partner1.calcSoulExpressionISK()}`,
    maturity: `${partner1.calcMaturity()}${partner1.calcMaturityISK()}`,
  };

  // Calculate partner2 metrics directly
  const partner2Metrics: SynastryMetrics = {
    name: checkboxState.checkN2
      ? `${partner2.getNameCheck()}${partner2.calcNameISK()}`
      : `${partner2.calcName()}${partner2.calcNameISK()}`,
    soul: checkboxState.checkN2
      ? `${partner2.getSoulCheck()}${partner2.calcSoulNumberISK()}`
      : `${partner2.calcSoulNumber()}${partner2.calcSoulNumberISK()}`,
    expression: checkboxState.checkN2
      ? `${partner2.getExpressionSoulCheck()}${partner2.calcSoulExpressionISK()}`
      : `${partner2.calcSoulExpression()}${partner2.calcSoulExpressionISK()}`,
    maturity: `${partner2.calcMaturity()}${partner2.calcMaturityISK()}`,
  };

  return (
    <div className="page-content bg-cover pb-10">
      <SelectPartner />

      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Synastry Metrics */}
        <div className="col-span-4 mb-1">
          <SectionTitle
            title={t('sinastry.pinnacle.partnerName')}
            color="bg-red-day"
            button={{
              text: checkboxState.checkN ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
              handle: toggles.checkName,
              isActive: checkboxState.checkN,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
            <MetricsGrid metrics={synastryMetrics} />
          </div>
        </div>

        {/* Partner 1 Metrics */}
        <div className="col-span-4 mb-1">

          <SectionTitle
            title={`${t('forms.name')}: ${partner1.nameView}`}
            color=" bg-red-day"
            button={{
              text: checkboxState.checkN1 ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
              handle: toggles.checkName1,
              isActive: checkboxState.checkN1,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            <MetricsGrid metrics={partner1Metrics} />
          </div>
        </div>

        {/* Partner 2 Metrics */}
        <div className="col-span-4 mb-1">

          <SectionTitle
            title={`${t('forms.name')}: ${partner2.nameView}`}
            color=" bg-red-day"
            button={{
              text: checkboxState.checkN2 ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
              handle: toggles.checkName2,
              isActive: checkboxState.checkN2,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            <MetricsGrid metrics={partner2Metrics} />
          </div>
        </div>

        {/* Pinnacles */}
        <div className="col-span-4 mb-1">

          <SectionTitle
            title={t('sinastry.pinnacle.partnerPinnacle')}
            color=" bg-red-day"
            button={{
              text: checkboxState.checkP1 ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
              handle: toggles.checkPinacle1,
              isActive: checkboxState.checkP1,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
            <PinnacleComponent entity={synastry} isVerificationActive={checkboxState.checkP1} size="sm" />
          </div>
        </div>

        <div className="col-span-4 mb-1">

          <SectionTitle
            title={`${t('common.pinnacle')}: ${partner1.nameView}`}
            color=" bg-red-day"
            button={{
              text: checkboxState.checkP2 ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
              handle: toggles.checkPinacle2,
              isActive: checkboxState.checkP2,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            <PinnacleComponent entity={partner1} isVerificationActive={checkboxState.checkP2} size="sm" />
          </div>
        </div>

        <div className="col-span-4 mb-1">

          <SectionTitle
            title={`${t('common.pinnacle')}: ${partner2.nameView}`}
            color=" bg-red-day"
            button={{
              text: checkboxState.checkP ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
              handle: toggles.checkPinacle,
              isActive: checkboxState.checkP,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            <PinnacleComponent entity={partner2} isVerificationActive={checkboxState.checkP} size="sm" />
          </div>
        </div>

        {/* Annual Returns */}
        <div className="col-span-4 mb-1">
          <SectionTitle
            title={t('sinastry.pinnacle.partnerReturn')}
            color=" bg-red-day"
          />

          <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
            <AnnualReturn annualReturn={annualReturns.synastry} current months size="xl" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <SectionTitle
            title={`${t('common.pinnacle')}: ${partner1.nameView}`}
            color=" bg-red-day"
          />

          <div className="pinnacle-wrap px-5 py-4">
            <AnnualReturn annualReturn={annualReturns.partner1} current months size="xl" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <SectionTitle
            title={`${t('common.pinnacle')}: ${partner2.nameView}`}
            color=" bg-red-day"
          />
          <div className="pinnacle-wrap px-5 py-4">
            <AnnualReturn annualReturn={annualReturns.partner2} current months size="xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

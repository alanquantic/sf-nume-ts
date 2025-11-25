/* eslint-disable max-len */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import ActiveNameComponents from '@/components/personal/name/ActiveNameComponents';
import BalanceExistential from '@/components/personal/name/BalanceExistential';
import Breakdown from '@/components/personal/name/Breakdown';
import FrequentNamePotential from '@/components/personal/name/FrequentNamePotential';
import InclusionTable from '@/components/personal/name/InclusionTable';
import NameCycle from '@/components/personal/name/NameCycle';
import NumericalValuesOfTheName from '@/components/personal/name/numericalValuesOfTheName';
import SectionTitle from '@/components/SectionTitle';
import useConsult from '@/hooks/useConsult';

type UngroupName = {
  v: number;
  L: string;
  c: number;
};

function NamePage() {
  const { consultant } = useConsult();
  const { t } = useTranslation();
  const [checkN, setcheckN] = useState(false);
  const [checkBreakdown, setcheckBreakdown] = useState(false);
  const [checkActiveName, setcheckActiveName] = useState(false);

  if (!consultant) return (<NoConsultantSelected />);

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

  for (let index = ungroupLast.length; index < 28; index += 1) {
    ungroupLast.push({} as UngroupName);
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName);

  for (let index = ungroupSCDLast.length; index < 28; index += 1) {
    ungroupSCDLast.push({} as UngroupName);
  }

  const ungroupName = consultant.getUngroupName(name);

  for (let index = ungroupName.length; index < 28; index += 1) {
    ungroupName.push({} as UngroupName);
  }

  const checkName = () => {
    if (checkN) {
      setcheckN(false);
    } else {
      setcheckN(true);
    }
  };

  const checkBreakdownFunction = () => {
    if (checkBreakdown) {
      setcheckBreakdown(false);
    } else {
      setcheckBreakdown(true);
    }
  };

  const checkActiveNameFunction = () => {
    if (checkActiveName) {
      setcheckActiveName(false);
    } else {
      setcheckActiveName(true);
    }
  };

  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 gap-6 pt-10">
        <div className="col-span-5">
          <SectionTitle
            title={t('name.numericValues.title')}
            button={{
              handle: checkName,
              isActive: checkN,
              text: t('common.verification'),
            }}
          />
          <NumericalValuesOfTheName
            checkN={checkN}
          />
        </div>
        <div className="col-span-7">
          <SectionTitle title={t('name.potential.title')} />
          <FrequentNamePotential />
        </div>

        <div className="col-span-12 mb-5">
          <SectionTitle
            title={t('name.breakdown.title')}
            button={{
              handle: checkBreakdownFunction,
              isActive: checkBreakdown,
              text: t('common.verification'),
            }}
          />
          <Breakdown checkBreakdown={checkBreakdown} />
        </div>

        <div className="col-span-12 mb-5">
          <SectionTitle
            title={t('name.activeName.title')}
            button={{
              handle: checkActiveNameFunction,
              isActive: checkActiveName,
              text: t('common.verification'),
            }}
          />
          <ActiveNameComponents checkActiveName={checkActiveName} />
        </div>

        <div className="col-span-12 mb-5">
          <SectionTitle title={t('name.nameCycle.title')} />
          <NameCycle />
        </div>

        <div className="col-span-12 mb-5">
          <SectionTitle title={t('name.balanceExistential.title')} />
          <BalanceExistential />
        </div>

        <div className="col-span-12 mb-5">
          <SectionTitle title={t('name.inclusionTable.title')} />
          <InclusionTable />
        </div>
      </div>
    </div>

  );
}

export default NamePage;

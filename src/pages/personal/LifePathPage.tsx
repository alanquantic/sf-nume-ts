import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import HierarchyLine from '@/components/personal/lifePath/HierarchyLine';
import LearningStage from '@/components/personal/lifePath/LearningStage';
import NineYearsCycle from '@/components/personal/lifePath/NineYearsCycle';
import SectionTitle from '@/components/SectionTitle';
import useConsult from '@/hooks/useConsult';

function LifePathPage() {
  const { t } = useTranslation();
  const { consultant } = useConsult();

  if (!consultant) return (<NoConsultantSelected />);

  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid mt-8 gap-4">
        <div className="col-span-12">
          <SectionTitle title={t('lifePath.nineYearsCycle.title')} />
          <div className="section-wrap px-2 py-7">
            <NineYearsCycle />
          </div>
        </div>
        <div className="col-span-12">
          <SectionTitle title={t('lifePath.learningStage.title')} />
          <div className="section-wrap px-2 py-7">
            <LearningStage />
          </div>
        </div>
        <div className="col-span-12">
          <SectionTitle title={t('lifePath.hierarchyLine.title')} />
          <div className="section-wrap px-2 py-7">
            <HierarchyLine />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifePathPage;

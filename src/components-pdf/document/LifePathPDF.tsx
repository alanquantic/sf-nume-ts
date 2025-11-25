import Person, { SplittedDate } from '@/resources/Person';
import i18n from '@/utils/i18n';
import lifePathImage from '../assets/life-path.jpg';
import LifePath9Years from '../lifePath/LifePath9Years';
import LifePathDialogs from '../lifePath/LifePathDialogs';
import LifePathLearningStage from '../lifePath/LifePathLearningStage';
import LifePathPersonalMonths from '../lifePath/LifePathPersonalMonths';
import LifePathPersonalWeeks from '../lifePath/LifePathPersonalWeeks';
import LifePathPersonalYears from '../lifePath/LifePathPersonalYears';
import LifePathQuarters from '../lifePath/LifePathQuarters';

export default function LifePathPDF({ consultant, date, newDate }: { consultant: Person, date: SplittedDate, newDate: Date }) {
  // Get translations for LifePath9Years
  const translations = {
    yearLabel: i18n.t('lifePath.nineYearsCycle.yearX', { year: '' }).replace('{{year}}', '').replace(/\s+/g, ' ').trim(),
    cycles: {
      1: [
        i18n.t('lifePath.nineYearsCycle.cycles.1.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.1.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.1.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.1.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.1.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.1.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.1.6'),
      ],
      3: [
        i18n.t('lifePath.nineYearsCycle.cycles.3.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.3.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.3.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.3.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.3.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.3.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.3.6'),
      ],
      4: [
        i18n.t('lifePath.nineYearsCycle.cycles.4.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.4.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.4.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.4.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.4.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.4.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.4.6'),
      ],
      5: [
        i18n.t('lifePath.nineYearsCycle.cycles.5.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.5.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.5.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.5.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.5.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.5.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.5.6'),
      ],
      6: [
        i18n.t('lifePath.nineYearsCycle.cycles.6.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.6.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.6.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.6.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.6.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.6.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.6.6'),
      ],
      7: [
        i18n.t('lifePath.nineYearsCycle.cycles.7.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.7.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.7.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.7.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.7.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.7.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.7.6'),
      ],
      8: [
        i18n.t('lifePath.nineYearsCycle.cycles.8.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.8.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.8.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.8.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.8.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.8.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.8.6'),
      ],
      9: [
        i18n.t('lifePath.nineYearsCycle.cycles.9.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.9.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.9.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.9.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.9.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.9.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.9.6'),
      ],
      11: [
        i18n.t('lifePath.nineYearsCycle.cycles.11.0'),
        i18n.t('lifePath.nineYearsCycle.cycles.11.1'),
        i18n.t('lifePath.nineYearsCycle.cycles.11.2'),
        i18n.t('lifePath.nineYearsCycle.cycles.11.3'),
        i18n.t('lifePath.nineYearsCycle.cycles.11.4'),
        i18n.t('lifePath.nineYearsCycle.cycles.11.5'),
        i18n.t('lifePath.nineYearsCycle.cycles.11.6'),
      ],
    },
  };

  return {
    bg: lifePathImage,
    children:
  <>
    <LifePath9Years consultant={consultant} now={date} translations={translations} />
    <LifePathLearningStage consultant={consultant} now={date} />
    <LifePathPersonalYears consultant={consultant} now={date} />
    <LifePathQuarters consultant={consultant} now={date} />
    <LifePathPersonalMonths consultant={consultant} now={date} newDate={newDate} />
    <LifePathPersonalWeeks consultant={consultant} now={date} newDate={newDate} />
    <LifePathDialogs consultant={consultant} now={date} />
  </>,
  };
}

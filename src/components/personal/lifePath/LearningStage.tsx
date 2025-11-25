import {
  getDate,
  getYear,
} from 'date-fns';
import { useTranslation } from 'react-i18next';

import { capitalize } from '@/utils/numbers';

import PathMonth from '@/components/personal/lifePath/PathMonth';
import QuarterCircle from '@/components/personal/lifePath/QuarterCircle';
import StageCircle from '@/components/personal/lifePath/StageCircle';
import WeekCircle from '@/components/personal/lifePath/WeekCircle';
import YearCircle from '@/components/personal/lifePath/YearCircle';
import useConsult from '@/hooks/useConsult';

interface QuarterData {
  id: string;
  months: string;
  value: string;
  isActive: boolean;
}

type WeekNumber = 1 | 2 | 3 | 4;

function LearningStage() {
  const { t, i18n } = useTranslation();
  const { consultant, consultationDate, calculationDate } = useConsult();

  if (!consultant) return null;

  const listOfMonths = consultant.getCustomMonths();
  // Use birth month index (0-11) instead of searching for 'Enero'
  const index = consultant.getMonthOfBirth();
  const listOfMonths3 = listOfMonths.map((e:string) => e.substring(0, 3));

  const currentYear = getYear(consultationDate);
  const lastYear = currentYear - 1;
  const now = new Date();
  const newDate = consultationDate;

  // TODO: Move to isolated file

  // Get quarter values
  const getQuarterValues = () => {
    const current = {
      q1: Number(consultant.getQuarterOne()),
      q2: Number(consultant.getQuarterTwo(currentYear)),
      q3: Number(consultant.getQuarterThree(currentYear)),
      q2last: Number(consultant.getQuarterTwo(lastYear)),
      q3last: Number(consultant.getQuarterThree(lastYear)),
    };

    const karmic = {
      q1: consultant.getQuarterOneISK(),
      q2: consultant.getQuarterTwoISK(currentYear),
      q3: consultant.getQuarterThreeISK(currentYear),
      q2Last: consultant.getQuarterTwoISK(lastYear),
      q3Last: consultant.getQuarterThreeISK(lastYear),
    };

    return { current, karmic };
  };

  const { current, karmic } = getQuarterValues();

  // Get current month info - use current language
  const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
  const currentMonthName = capitalize(consultationDate.toLocaleString(locale, { month: 'long' }));
  const currentMonth = listOfMonths.findIndex((i) => i === currentMonthName);

  // Calculate quarters based on index
  const calculateQuarters = (): QuarterData[] => {
    const quarters: QuarterData[] = [];

    switch (index) {
      case 0:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3}${karmic.q3}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
        );
        break;
      case 1:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[index - 1]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth === 0,
          },
        );
        break;
      case 2:
      case 3:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 3 && currentMonth <= 4,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[0]} - ${listOfMonths3[index - 1]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 2,
          },
        );
        break;
      case 4:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth === 4,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[0]} - ${listOfMonths3[index - 1]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 7,
          },
        );
        break;
      case 5:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[8]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[0]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
        );
        break;
      case 6:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[8]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth >= 6 && currentMonth <= 8,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[12]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[index - 1]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth === 5,
          },
        );
        break;
      case 7:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[8]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth >= 7 && currentMonth <= 8,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[12]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[5]} - ${listOfMonths3[index - 1]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth >= 5 && currentMonth <= 6,
          },
        );
        break;
      case 8:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]}`,
            value: `${current.q2last}${karmic.q2Last}`,
            isActive: currentMonth === 8,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[9]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[12]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[5]} - ${listOfMonths3[index - 1]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth >= 5 && currentMonth <= 7,
          },
        );
        break;
      case 9:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 9 && currentMonth <= 11,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[0]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
        );
        break;
      case 10:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]} - ${listOfMonths3[11]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth >= 10 && currentMonth <= 11,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[0]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q4',
            months: ` ${listOfMonths3[index - 1]}`,
            value: `${current.q3}${karmic.q3}`,
            isActive: currentMonth === 9,
          },
        );
        break;
      case 11:
        quarters.push(
          {
            id: 'q1',
            months: `${listOfMonths3[index]}`,
            value: `${current.q3last}${karmic.q3Last}`,
            isActive: currentMonth === 11,
          },
          {
            id: 'q2',
            months: `${listOfMonths3[0]} - ${listOfMonths3[4]}`,
            value: `${current.q1}${karmic.q1}`,
            isActive: currentMonth >= 0 && currentMonth <= 4,
          },
          {
            id: 'q3',
            months: `${listOfMonths3[5]} - ${listOfMonths3[8]}`,
            value: `${current.q2}${karmic.q2}`,
            isActive: currentMonth >= 5 && currentMonth <= 8,
          },
          {
            id: 'q4',
            months: `${listOfMonths3[9]} - ${listOfMonths3[index - 1]}`,
            value: `${current.q3}${karmic.q3}`,
            isActive: currentMonth >= 9 && currentMonth <= 10,
          },
        );
        break;
      default:
        break;
    }

    return quarters;
  };

  const quarters = calculateQuarters();
  const activeStage = consultant.getLifeStageNumber(calculationDate);
  const currentWeek = Math.ceil(getDate(newDate) / 7) as WeekNumber;
  // Calculate cycle years
  const cycle = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div>
      <div className="col-span-24 mb-10">
        <div className="px-8 py-8">
          <div className="grid grid-cols-10 border-b-2 border-gray-400 border-dashed mb-3 pb-2">
            <div className="col-span-3 text-13 font-black pt-3">
              {t('lifePath.learningStage.lifeStage')}
            </div>
            <div className="col-span-7 flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((stage) => (
                <StageCircle key={stage} stage={stage} activeStage={activeStage} consultant={consultant} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 border-b-2 border-gray-400 border-dashed mb-3 pt-4 pb-2">
            <div className="col-span-3 text-13 font-black pt-3">
              {t('lifePath.learningStage.personalYear')}
            </div>
            <div className="col-span-7 grid grid-cols-10 gap-x-6 border-4 border-b-0 border-secondary">
              <div className="bg-purple-30 text-13 font-bold flex items-center justify-center col-span-10 h-7">
                {t('lifePath.learningStage.nineYearCycle')}
              </div>

              {cycle.map((year) => (
                <YearCircle key={year} year={year} currentYear={getYear(newDate)} consultant={consultant} now={now} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 border-b-2 border-gray-400 border-dashed mb-3 pt-3 pb-12">
            <div className="col-span-3 text-13 font-black pt-3">
              {t('lifePath.learningStage.quarters')}
            </div>
            <div className="col-span-7 border-4 border-b-0 border-green">
              <div className="bg-green-30 text-13 font-bold flex items-center justify-center h-7">
                {t('lifePath.learningStage.quartersLabel')}
              </div>

              <div className="flex justify-between mt-5">
                {quarters.map((quarter) => (
                  <QuarterCircle
                    key={quarter.id}
                    value={quarter.value}
                    months={quarter.months}
                    isActive={quarter.isActive}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-10 border-b-2 border-gray-400 border-dashed mb-3 pt-4 pb-12">
            <div className="col-span-3 text-13 font-black pt-3 h-7">
              {t('lifePath.learningStage.personalMonths')}
            </div>
            <div className="col-span-7 border-4 border-b-0 border-gold">
              <div className="bg-gold-30 text-13 font-bold flex items-center justify-center h-7">
                {t('lifePath.learningStage.personalMonthsLabel')}
              </div>
              <PathMonth />
            </div>
          </div>

          <div className="grid grid-cols-10 mb-3 pt-3 pb-12">
            <div className="col-span-3 text-13 font-black pt-3 h-7">
              {t('lifePath.learningStage.personalWeeks')}
            </div>
            <div className="col-span-7 border-4 border-b-0 border-blue-week">
              <div className="bg-blue-week text-13 font-bold flex items-center justify-center h-7">
                {t('lifePath.learningStage.personalWeeksLabel')}
                {' '}
                {currentWeek}
              </div>

              <div className="flex justify-between mt-5">
                {([1, 2, 3, 4] as WeekNumber[]).map((week) => (
                  <WeekCircle
                    key={week}
                    week={week}
                    currentWeek={currentWeek}
                    consultant={consultant}
                    newDate={newDate}
                    currentMonthName={currentMonthName}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningStage;

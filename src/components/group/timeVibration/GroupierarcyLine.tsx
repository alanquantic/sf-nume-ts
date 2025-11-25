/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import { getResHierarchy, getSumHierarchy } from '@/utils/numbers';

export default function GroupHierarchyLine({ groupConsult }: { groupConsult: Group }) {
  const {
    calculationDate, calculationYear,
  } = useConsult();
  const { t } = useTranslation();
  if (!groupConsult) return null;

  return (
    <div>
      <div className="w-full flex items-center justify-center bg-opacity-100">
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.dialogue')}</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(groupConsult.getB(), groupConsult.calcLifeStage(groupConsult.getLifeStageNumber(calculationDate.month, calculationDate.year)))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {groupConsult.getB()}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {groupConsult.calcLifeStage(groupConsult.getLifeStageNumber(calculationDate.month, calculationDate.year))}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(groupConsult.getB(), groupConsult.calcLifeStage(groupConsult.getLifeStageNumber(calculationDate.month, calculationDate.year)))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.challenge')}</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">{t('hierarchyLine.np')}</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">{t('hierarchyLine.stage')}</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.dialogue')}</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(groupConsult.calcLifeStage(groupConsult.getLifeStageNumber(calculationDate.month, calculationDate.year)), groupConsult.calcPersonalYear(calculationYear))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {groupConsult.calcLifeStage(groupConsult.getLifeStageNumber(calculationDate.month, calculationDate.year))}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {groupConsult.calcPersonalYear(calculationYear)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(groupConsult.calcLifeStage(groupConsult.getLifeStageNumber(calculationDate.month, calculationDate.year)), groupConsult.calcPersonalYear(calculationYear))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.challenge')}</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">{t('hierarchyLine.stage')}</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">{t('hierarchyLine.personalYear')}</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.dialogue')}</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(groupConsult.calcPersonalYear(calculationYear), groupConsult.calcCurrentQuarter(calculationDate.year))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {groupConsult.calcPersonalYear(calculationYear)}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {groupConsult.calcCurrentQuarter(calculationDate.year)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(groupConsult.calcPersonalYear(calculationYear), groupConsult.calcCurrentQuarter(calculationDate.year))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.challenge')}</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">{t('hierarchyLine.personalYear')}</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">{t('hierarchyLine.quarter')}</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.dialogue')}</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(groupConsult.calcCurrentQuarter(calculationDate.year), groupConsult.calcPersonalMonth(calculationDate))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {groupConsult.calcCurrentQuarter(calculationDate.year)}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {groupConsult.calcPersonalMonth(calculationDate)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(groupConsult.calcCurrentQuarter(calculationDate.year), groupConsult.calcPersonalMonth(calculationDate))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.challenge')}</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">{t('hierarchyLine.quarter')}</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">{t('hierarchyLine.personalMonth')}</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center ">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.dialogue')}</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(groupConsult.calcPersonalMonth(calculationDate), Number(groupConsult.calcPersonalWeek(calculationDate.day, calculationDate.month, calculationDate.year)))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {groupConsult.calcPersonalMonth(calculationDate)}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {groupConsult.calcPersonalWeek(calculationDate.day, calculationDate.month, calculationDate.year)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(groupConsult.calcPersonalMonth(calculationDate), Number(groupConsult.calcPersonalWeek(calculationDate.day, calculationDate.month, calculationDate.year)))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">{t('hierarchyLine.challenge')}</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">{t('hierarchyLine.personalMonth')}</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">{t('hierarchyLine.personalWeek')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

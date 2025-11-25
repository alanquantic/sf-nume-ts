import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import SelectGroup from '@/components/group/SelectGroup';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';

export default function GroupAnnualReturnsPage() {
  const {
    consultant, activeGroup, selectedGroup, calculationDate,
  } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return (<NoConsultantSelected />);

  if (!activeGroup) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('group.noGroupSelected')}</h3>
            <p className="text-gray-600">{t('group.noGroupSelectedMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGroup || selectedGroup.length === 0) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('group.noMembersInGroup')}</h3>
            <p className="text-gray-600">
              {t('group.noMembersInGroupMessage', { groupName: activeGroup.name })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Crear el objeto Group solo si tenemos datos válidos
  const GroupPerson = new Group(selectedGroup, activeGroup.lastInit);

  const now = calculationDate.year;

  // Helper function to generate year data
  const generateYearData = (yearOffset: number) => {
    const year = now + yearOffset;
    return {
      year,
      annualReturn: GroupPerson.annualReturn(year),
      personalYear: GroupPerson.calcPersonalYear(year),
      yearsOld: GroupPerson.getYearsOld(year),
    };
  };

  // Generate data for all years (-4 to +4)
  const yearsData = Array.from({ length: 9 }, (_, index) => generateYearData(index - 4));

  return (
    <div className="page-content bg-cover pb-10 px-4">
      <SelectGroup />
      <div className="grid grid-cols-12 mt-8 pb-10">
        <div className="col-span-13">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-group p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('annualReturns.title')}
          </div>
          <div className="pinnacle-wrap grid grid-cols-3 p-1">
            {yearsData.map((data, index) => {
              const isCurrentYear = data.year === now;
              const isCenter = index === 4; // Current year is in the center

              // Determine border classes based on position
              const getBorderClasses = () => {
                if (isCenter) return 'border-gray-400 border';
                if (index === 1 || index === 7) return 'border-gray-400 border-r border-l';
                if (index === 3 || index === 5) return 'border-gray-400 border-t border-b';
                return '';
              };

              return (
                <div
                  key={data.year}
                  className={`p-4 h-80 ${isCurrentYear ? 'bg-active-radial' : 'bg-white'} ${getBorderClasses()}`}
                >
                  <AnnualReturn
                    current={isCurrentYear}
                    annualReturn={data.annualReturn}
                    personalYear={data.personalYear}
                    yearsOld={data.yearsOld}
                    year={data.year}
                    size="xs"
                    group
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

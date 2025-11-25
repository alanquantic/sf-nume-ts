import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import AnnualReturn from '@/components/personal/vibrationTime/AnnualReturn';
import SectionTitle from '@/components/SectionTitle';
import useConsult from '@/hooks/useConsult';

export default function AnnualReturnsPage() {
  const { consultant, consultationDate, calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!consultant) return (<NoConsultantSelected />);

  const now = consultationDate.getFullYear();

  // Helper function to generate year data
  const generateYearData = (yearOffset: number) => {
    const year = now + yearOffset;
    return {
      year,
      annualReturn: consultant.annualReturn({ ...calculationDate, year }),
      personalYear: consultant.calcPersonalYear(year),
      yearsOld: consultant.getYearsOld(year),
    };
  };

  // Generate data for all years (-4 to +4)
  const yearsData = Array.from({ length: 9 }, (_, index) => generateYearData(index - 4));
  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 pb-10 pt-10">
        <div className="col-span-13">
          <SectionTitle title={t('annualReturns.title')} />
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

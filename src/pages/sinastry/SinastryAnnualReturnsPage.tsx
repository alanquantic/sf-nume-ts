import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';

export default function SinastryAnnualReturnsPage() {
  const { consultant, selectedPartnersAsPersons, calculationDate } = useContext(ConsultContext);
  const { t } = useTranslation();

  if (!consultant) return (<NoConsultantSelected />);

  // Verificar que tengamos al menos 2 personas en el grupo de parejas
  if (!selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="page-content bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>{t('sinastry.selectPartnerWithMembers')}</strong>
        </div>
      </div>
    );
  }

  // Tomar la pareja 1 y 2 del grupo seleccionado
  const partner1 = selectedPartnersAsPersons[0];
  const partner2 = selectedPartnersAsPersons[1];

  const synastry = new Synastry(partner1, partner2);

  const now = calculationDate.year;
  const annualReturn = synastry.annualReturn(now);
  const personalYear = synastry.calcPersonalYear(now);
  const yearsOld = synastry.getYearsOld(now);

  const y1 = calculationDate.year - 4;
  const annualReturnY1 = synastry.annualReturn(y1);
  const personalYearY1 = synastry.calcPersonalYear(y1);
  const yearsOldY1 = synastry.getYearsOld(y1);

  const y2 = calculationDate.year - 3;
  const annualReturnY2 = synastry.annualReturn(y2);
  const personalYearY2 = synastry.calcPersonalYear(y2);
  const yearsOldY2 = synastry.getYearsOld(y2);

  const y3 = calculationDate.year - 2;
  const annualReturnY3 = synastry.annualReturn(y3);
  const personalYearY3 = synastry.calcPersonalYear(y3);
  const yearsOldY3 = synastry.getYearsOld(y3);

  const y4 = calculationDate.year - 1;
  const annualReturnY4 = synastry.annualReturn(y4);
  const personalYearY4 = synastry.calcPersonalYear(y4);
  const yearsOldY4 = synastry.getYearsOld(y4);

  const y6 = calculationDate.year + 1;
  const annualReturnY6 = synastry.annualReturn(y6);
  const personalYearY6 = synastry.calcPersonalYear(y6);
  const yearsOldY6 = synastry.getYearsOld(y6);

  const y7 = calculationDate.year + 2;
  const annualReturnY7 = synastry.annualReturn(y7);
  const personalYearY7 = synastry.calcPersonalYear(y7);
  const yearsOldY7 = synastry.getYearsOld(y7);

  const y8 = calculationDate.year + 3;
  const annualReturnY8 = synastry.annualReturn(y8);
  const personalYearY8 = synastry.calcPersonalYear(y8);
  const yearsOldY8 = synastry.getYearsOld(y8);

  const y9 = calculationDate.year + 4;
  const annualReturnY9 = synastry.annualReturn(y9);
  const personalYearY9 = synastry.calcPersonalYear(y9);
  const yearsOldY9 = synastry.getYearsOld(y9);

  return (
    <div className="page-content bg-cover pb-10">
      <SelectPartner />
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12">
          <SectionTitle title={t('sinastry.returns')} color="bg-red-day" />

          <div className="pinnacle-wrap grid grid-cols-3 p-1">
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY1}
                personalYear={personalYearY1}
                yearsOld={yearsOldY1}
                year={y1}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-r border-l">
              <AnnualReturn
                annualReturn={annualReturnY2}
                personalYear={personalYearY2}
                yearsOld={yearsOldY2}
                year={y2}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY3}
                personalYear={personalYearY3}
                yearsOld={yearsOldY3}
                year={y3}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-t border-b">
              <AnnualReturn
                annualReturn={annualReturnY4}
                personalYear={personalYearY4}
                yearsOld={yearsOldY4}
                year={y4}
                group
                size="xl"
              />
            </div>
            <div className="bg-active-radial p-4 h-80 border-gray-400 border">
              <AnnualReturn
                current
                annualReturn={annualReturn}
                personalYear={personalYear}
                yearsOld={yearsOld}
                year={now}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-t border-b">
              <AnnualReturn
                annualReturn={annualReturnY6}
                personalYear={personalYearY6}
                yearsOld={yearsOldY6}
                year={y6}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY7}
                personalYear={personalYearY7}
                yearsOld={yearsOldY7}
                year={y7}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-r border-l">
              <AnnualReturn
                annualReturn={annualReturnY8}
                personalYear={personalYearY8}
                yearsOld={yearsOldY8}
                year={y8}
                group
                size="xl"
              />
            </div>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY9}
                personalYear={personalYearY9}
                yearsOld={yearsOldY9}
                year={y9}
                group
                size="xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

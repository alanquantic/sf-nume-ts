import Synastry, { SplittedDate } from '@/resources/Synastry';
import { StyleSheet, View } from '@react-pdf/renderer';
import SynastryAnnualReturn from './SynastryAnnualReturn';

export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '151px',
    left: '12px',
    width: '533px',
  },
  wrap: {
    backgroundColor: 'blue',
    position: 'absolute',
  },
});

export default function SynastryAnnualReturns({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  const annualReturnCurrent = synastry.annualReturn(date.year);
  const personalYear = synastry.calcPersonalYear(date.year);
  const yearsOld = synastry.getYearsOld(date.year);

  const y1 = date.year - 4;
  const annualReturnY1 = synastry.annualReturn(y1);
  const personalYearY1 = synastry.calcPersonalYear(y1);
  const yearsOldY1 = synastry.getYearsOld(y1);

  const y2 = date.year - 3;
  const annualReturnY2 = synastry.annualReturn(y2);
  const personalYearY2 = synastry.calcPersonalYear(y2);
  const yearsOldY2 = synastry.getYearsOld(y2);

  const y3 = date.year - 2;
  const annualReturnY3 = synastry.annualReturn(y3);
  const personalYearY3 = synastry.calcPersonalYear(y3);
  const yearsOldY3 = synastry.getYearsOld(y3);

  const y4 = date.year - 1;
  const annualReturnY4 = synastry.annualReturn(y4);
  const personalYearY4 = synastry.calcPersonalYear(y4);
  const yearsOldY4 = synastry.getYearsOld(y4);

  const y6 = date.year + 1;
  const annualReturnY6 = synastry.annualReturn(y6);
  const personalYearY6 = synastry.calcPersonalYear(y6);
  const yearsOldY6 = synastry.getYearsOld(y6);

  const y7 = date.year + 2;
  const annualReturnY7 = synastry.annualReturn(y7);
  const personalYearY7 = synastry.calcPersonalYear(y7);
  const yearsOldY7 = synastry.getYearsOld(y7);

  const y8 = date.year + 3;
  const annualReturnY8 = synastry.annualReturn(y8);
  const personalYearY8 = synastry.calcPersonalYear(y8);
  const yearsOldY8 = synastry.getYearsOld(y8);

  const y9 = date.year + 4;
  const annualReturnY9 = synastry.annualReturn(y9);
  const personalYearY9 = synastry.calcPersonalYear(y9);
  const yearsOldY9 = synastry.getYearsOld(y9);

  return (
    <View style={data.container}>
      <View style={[data.wrap]}>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY1}
            personalYear={personalYearY1}
            yearsOld={yearsOldY1}
            year={y1}
            top={0}
            left={0}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY2}
            personalYear={personalYearY2}
            yearsOld={yearsOldY2}
            year={y2}
            top={0}
            left={177}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY3}
            personalYear={personalYearY3}
            yearsOld={yearsOldY3}
            year={y3}
            top={0}
            left={353}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY4}
            personalYear={personalYearY4}
            yearsOld={yearsOldY4}
            year={y4}
            top={138}
            left={0}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnCurrent}
            personalYear={personalYear}
            yearsOld={yearsOld}
            year={date.year}
            top={138}
            left={177}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY6}
            personalYear={personalYearY6}
            yearsOld={yearsOldY6}
            year={y6}
            top={138}
            left={353}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY7}
            personalYear={personalYearY7}
            yearsOld={yearsOldY7}
            year={y7}
            top={275}
            left={0}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY8}
            personalYear={personalYearY8}
            yearsOld={yearsOldY8}
            year={y8}
            top={275}
            left={177}
          />
        </View>
        <View>
          <SynastryAnnualReturn
            annualReturn={annualReturnY9}
            personalYear={personalYearY9}
            yearsOld={yearsOldY9}
            year={y9}
            top={275}
            left={353}
          />
        </View>
      </View>
    </View>
  );
}

import Group, { SplittedDate } from '@/resources/Group';
import { StyleSheet, View } from '@react-pdf/renderer';
import GroupAnnualReturn from './GroupAnnualReturn';

export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '262px',
    left: '15px',
    width: '533px',
  },
  wrap: {
    backgroundColor: 'blue',
    position: 'absolute',
  },
});
export default function GroupAnnualReturns({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  const annualReturnCurrent = groupConsult.annualReturn(date.year);
  const personalYear = groupConsult.calcPersonalYear(date.year);
  const yearsOld = groupConsult.getYearsOld(date.year);

  const y1 = date.year - 4;
  const annualReturnY1 = groupConsult.annualReturn(y1);
  const personalYearY1 = groupConsult.calcPersonalYear(y1);
  const yearsOldY1 = groupConsult.getYearsOld(y1);

  const y2 = date.year - 3;
  const annualReturnY2 = groupConsult.annualReturn(y2);
  const personalYearY2 = groupConsult.calcPersonalYear(y2);
  const yearsOldY2 = groupConsult.getYearsOld(y2);

  const y3 = date.year - 2;
  const annualReturnY3 = groupConsult.annualReturn(y3);
  const personalYearY3 = groupConsult.calcPersonalYear(y3);
  const yearsOldY3 = groupConsult.getYearsOld(y3);

  const y4 = date.year - 1;
  const annualReturnY4 = groupConsult.annualReturn(y4);
  const personalYearY4 = groupConsult.calcPersonalYear(y4);
  const yearsOldY4 = groupConsult.getYearsOld(y4);

  const y6 = date.year + 1;
  const annualReturnY6 = groupConsult.annualReturn(y6);
  const personalYearY6 = groupConsult.calcPersonalYear(y6);
  const yearsOldY6 = groupConsult.getYearsOld(y6);

  const y7 = date.year + 2;
  const annualReturnY7 = groupConsult.annualReturn(y7);
  const personalYearY7 = groupConsult.calcPersonalYear(y7);
  const yearsOldY7 = groupConsult.getYearsOld(y7);

  const y8 = date.year + 3;
  const annualReturnY8 = groupConsult.annualReturn(y8);
  const personalYearY8 = groupConsult.calcPersonalYear(y8);
  const yearsOldY8 = groupConsult.getYearsOld(y8);

  const y9 = date.year + 4;
  const annualReturnY9 = groupConsult.annualReturn(y9);
  const personalYearY9 = groupConsult.calcPersonalYear(y9);
  const yearsOldY9 = groupConsult.getYearsOld(y9);

  return (
    <View style={data.container}>
      <View style={[data.wrap]}>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY1}
            personalYear={personalYearY1}
            yearsOld={yearsOldY1}
            year={y1}
            top={0}
            left={0}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY2}
            personalYear={personalYearY2}
            yearsOld={yearsOldY2}
            year={y2}
            top={0}
            left={177}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY3}
            personalYear={personalYearY3}
            yearsOld={yearsOldY3}
            year={y3}
            top={0}
            left={353}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY4}
            personalYear={personalYearY4}
            yearsOld={yearsOldY4}
            year={y4}
            top={138}
            left={0}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnCurrent}
            personalYear={personalYear}
            yearsOld={yearsOld}
            year={date.year}
            top={138}
            left={177}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY6}
            personalYear={personalYearY6}
            yearsOld={yearsOldY6}
            year={y6}
            top={138}
            left={353}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY7}
            personalYear={personalYearY7}
            yearsOld={yearsOldY7}
            year={y7}
            top={275}
            left={0}
          />
        </View>
        <View>
          <GroupAnnualReturn
            annualReturn={annualReturnY8}
            personalYear={personalYearY8}
            yearsOld={yearsOldY8}
            year={y8}
            top={275}
            left={177}
          />
        </View>
        <View>
          <GroupAnnualReturn
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

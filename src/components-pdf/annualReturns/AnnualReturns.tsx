import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, View } from '@react-pdf/renderer';
import AnnualReturnPDF from './AnnualReturn';

const annual = StyleSheet.create({
  container: {
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: '0px',
    left: '0px',
    fontSize: '10px',

  },
  wrap: {
    position: 'relative',
  },
  return: {
    position: 'absolute',
    width: '176px',
    height: '136px',
  },
  return_1: {
    top: '0',
    left: '0',
  },
  return_2: {
    top: '0',
    left: '1',
  },
  return_3: {
    top: '0',
    left: '2',
  },
  return_4: {
    top: '1',
    left: '0',
  },
  return_5: {
    top: '1',
    left: '1',
  },
  return_6: {
    top: '1',
    left: '2',
  },
  return_7: {
    top: '2',
    left: '0',
  },
  return_8: {
    top: '2',
    left: '1',
  },
  return_9: {
    top: '2',
    left: '2',
  },
});

export default function AnnualReturns({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const now = date.year;
  const annualReturn = consultant.annualReturn(date);
  const personalYear = consultant.calcPersonalYear(date.year);
  const yearsOld = consultant.getYearsOld(date.year);

  const y1 = date.year - 4;
  const annualReturnY1 = consultant.annualReturn({ ...date, year: y1 });
  const personalYearY1 = consultant.calcPersonalYear(y1);
  const yearsOldY1 = consultant.getYearsOld(y1);

  const y2 = date.year - 3;
  const annualReturnY2 = consultant.annualReturn({ ...date, year: y2 });
  const personalYearY2 = consultant.calcPersonalYear(y2);
  const yearsOldY2 = consultant.getYearsOld(y2);

  const y3 = date.year - 2;
  const annualReturnY3 = consultant.annualReturn({ ...date, year: y3 });
  const personalYearY3 = consultant.calcPersonalYear(y3);
  const yearsOldY3 = consultant.getYearsOld(y3);

  const y4 = date.year - 1;
  const annualReturnY4 = consultant.annualReturn({ ...date, year: y4 });
  const personalYearY4 = consultant.calcPersonalYear(y4);
  const yearsOldY4 = consultant.getYearsOld(y4);

  const y6 = date.year + 1;
  const annualReturnY6 = consultant.annualReturn({ ...date, year: y6 });
  const personalYearY6 = consultant.calcPersonalYear(y6);
  const yearsOldY6 = consultant.getYearsOld(y6);

  const y7 = date.year + 2;
  const annualReturnY7 = consultant.annualReturn({ ...date, year: y7 });
  const personalYearY7 = consultant.calcPersonalYear(y7);
  const yearsOldY7 = consultant.getYearsOld(y7);

  const y8 = date.year + 3;
  const annualReturnY8 = consultant.annualReturn({ ...date, year: y8 });
  const personalYearY8 = consultant.calcPersonalYear(y8);
  const yearsOldY8 = consultant.getYearsOld(y8);

  const y9 = date.year + 4;
  const annualReturnY9 = consultant.annualReturn({ ...date, year: y9 });
  const personalYearY9 = consultant.calcPersonalYear(y9);
  const yearsOldY9 = consultant.getYearsOld(y9);
  return (
    <View style={annual.container}>
      <View style={annual.wrap}>
        <View style={[annual.return, annual.return_1]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY1}
            personalYear={personalYearY1}
            yearsOld={yearsOldY1}
            year={y1}
            top={0}
            left={0}
          />
        </View>
        <View style={[annual.return, annual.return_2]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY2}
            personalYear={personalYearY2}
            yearsOld={yearsOldY2}
            year={y2}
            top={0}
            left={176}
          />
        </View>
        <View style={[annual.return, annual.return_3]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY3}
            personalYear={personalYearY3}
            yearsOld={yearsOldY3}
            year={y3}
            top={0}
            left={352}
          />
        </View>
        <View style={[annual.return, annual.return_4]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY4}
            personalYear={personalYearY4}
            yearsOld={yearsOldY4}
            year={y4}
            top={136}
            left={0}
          />
        </View>
        <View style={[annual.return, annual.return_5]}>
          <AnnualReturnPDF
            annualReturn={annualReturn}
            personalYear={personalYear}
            yearsOld={yearsOld}
            year={now}
            top={136}
            left={176}
          />
        </View>
        <View style={[annual.return, annual.return_6]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY6}
            personalYear={personalYearY6}
            yearsOld={yearsOldY6}
            year={y6}
            top={136}
            left={352}
          />
        </View>
        <View style={[annual.return, annual.return_7]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY7}
            personalYear={personalYearY7}
            yearsOld={yearsOldY7}
            year={y7}
            top={272}
            left={0}
          />
        </View>
        <View style={[annual.return, annual.return_8]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY8}
            personalYear={personalYearY8}
            yearsOld={yearsOldY8}
            year={y8}
            top={272}
            left={176}
          />
        </View>
        <View style={[annual.return, annual.return_9]}>
          <AnnualReturnPDF
            annualReturn={annualReturnY9}
            personalYear={personalYearY9}
            yearsOld={yearsOldY9}
            year={y9}
            top={272}
            left={352}
          />
        </View>
      </View>
    </View>
  );
}

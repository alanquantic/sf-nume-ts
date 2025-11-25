import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, View } from '@react-pdf/renderer';
import AnnualReturnVibration from './AnnualReturnVibration';

export const annualReturn = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0000',
    position: 'absolute',
    top: '530px',
    width: '523px',
    left: '45px',
    fontSize: '10px',

  },
  wrap: {
    position: 'relative',
  },
  return_1: {
    position: 'absolute',
    top: '2px',
    left: '0px',
    height: '150px',
    width: '119px',
    // backgroundColor: '#ff000012',
  },
  return_2: {
    position: 'absolute',
    top: '2px',
    left: '177px',
    height: '148px',
    width: '119px',
    // backgroundColor: '#00ff0012',
  },
  return_3: {
    position: 'absolute',
    top: '2px',
    left: '350px',
    height: '148px',
    width: '119px',
    // backgroundColor: '#0000ff12',
  },
});

export default function AnnualReturnsVibration({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const annualReturnCurrent = consultant.annualReturn(date);
  const annualReturnLastYear = consultant.annualReturn({ ...date, year: date.year - 1 });
  const annualReturnNextYear = consultant.annualReturn({ ...date, year: date.year + 1 });

  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        <View style={annualReturn.return_1}>
          <AnnualReturnVibration annualReturn={annualReturnLastYear} />
        </View>
        <View style={annualReturn.return_2}>
          <AnnualReturnVibration annualReturn={annualReturnCurrent} />
        </View>
        <View style={annualReturn.return_3}>
          <AnnualReturnVibration annualReturn={annualReturnNextYear} />
        </View>
      </View>
    </View>
  );
}

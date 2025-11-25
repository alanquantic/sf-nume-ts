import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, View } from '@react-pdf/renderer';
import AnnualReturn from './AnnualReturn';

export const annualReturn = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0000',
    position: 'absolute',
    top: '511px',
    width: '119px',
    left: '18px',
    fontSize: '10px',

  },
  wrap: {
    position: 'relative',
  },
  return_1: {
    position: 'absolute',
    top: '0px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#ff0000',
  },
  return_2: {
    position: 'absolute',
    top: '0px',
    left: '174px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#00ff00',
  },
  return_3: {
    position: 'absolute',
    top: '0px',
    left: '348px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#0000ff',
  },
});

export default function AnnualReturns({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const annualReturnCurrent = consultant.annualReturn(date);
  const annualReturnLastYear = consultant.annualReturn({ ...date, year: date.year - 1 });
  const annualReturnNextYear = consultant.annualReturn({ ...date, year: date.year + 1 });

  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        <View style={annualReturn.return_1}>
          <AnnualReturn annualReturn={annualReturnLastYear} />
        </View>
        <View style={annualReturn.return_2}>
          <AnnualReturn annualReturn={annualReturnCurrent} />
        </View>
        <View style={annualReturn.return_3}>
          <AnnualReturn annualReturn={annualReturnNextYear} />
        </View>
      </View>
    </View>
  );
}

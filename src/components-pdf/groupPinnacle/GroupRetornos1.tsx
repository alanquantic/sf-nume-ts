import Group, { SplittedDate } from '@/resources/Group';
import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import AnnualReturn from './AnnualReturn';

export const annualReturn = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0000',
    position: 'absolute',
    top: '553px',
    width: '119px',
    left: '12px',
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
    left: '184px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#00ff00',
  },
  return_3: {
    position: 'absolute',
    top: '0px',
    left: '360px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#0000ff',
  },
  name: {
    idth: '60px',
    top: -18,
    left: 70,
    fontSize: '8px',
    color: '#ffffff',
    position: 'absolute',
  },
});

export default function GroupReturns1({ groupConsult, date, members }: { groupConsult: Group, date: SplittedDate, members: Person[] }) {
  const annualReturnCurrent = groupConsult.annualReturn(date.year);
  const annualReturnLastYear = members[0]?.annualReturn(date);
  const annualReturnNextYear = members[1]?.annualReturn(date);

  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        {(members[0]) ? (
          <View style={annualReturn.return_2}>
            <View style={annualReturn.name}><Text>{members[0].nameView}</Text></View>
            <AnnualReturn annualReturn={annualReturnLastYear} />
          </View>
        ) : null}
        <View style={annualReturn.return_1}>
          <AnnualReturn annualReturn={annualReturnCurrent} />
        </View>
        {(members[1]) ? (
          <View style={annualReturn.return_3}>
            <View style={annualReturn.name}><Text>{members[1].nameView}</Text></View>
            <AnnualReturn annualReturn={annualReturnNextYear} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

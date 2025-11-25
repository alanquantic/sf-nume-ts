import { SplittedDate } from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import SynastryAnnualReturn from './SynastryAnnualReturn';

export const annualReturn = StyleSheet.create({
  container: {
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: '503px',
    width: '119px',
    left: '14px',
    fontSize: '10px',

  },
  wrap: {
    position: 'relative',
  },
  return_1: {
    position: 'absolute',
    top: '0px',
    height: '134px',
    width: '169px',
    // backgroundColor: '#ff0000',
  },
  return_2: {
    position: 'absolute',
    top: '0px',
    left: '182px',
    height: '134px',
    width: '169px',
    // backgroundColor: '#00ff00',
  },
  return_3: {
    position: 'absolute',
    top: '0px',
    left: '361px',
    height: '134px',
    width: '169px',
    // backgroundColor: '#0000ff',
  },
  name: {
    fontSize: 10,
    position: 'absolute',
    top: -20,
    left: 60,
    color: '#FFF',
  },
  partnerName: {
    fontSize: 10,
    position: 'absolute',
    top: -20,
    left: 60,
    color: '#FFF',
  },
});

export default function SynastryAnnualReturns({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  const annualReturnPersonOne = synastry.consultant.annualReturn(date);
  const annualReturnSynastry = synastry.annualReturn(date.year);
  const annualReturnPersonTwo = synastry.partner.annualReturn(date);

  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        <View style={annualReturn.return_1}>
          <SynastryAnnualReturn annualReturn={annualReturnSynastry} />
        </View>
        <View style={annualReturn.return_2}>
          <View style={annualReturn.name}><Text>{synastry.consultant.name}</Text></View>
          <SynastryAnnualReturn annualReturn={annualReturnPersonOne} />
        </View>
        <View style={annualReturn.return_3}>
          <View style={annualReturn.name}><Text>{synastry.partner.name}</Text></View>
          <SynastryAnnualReturn annualReturn={annualReturnPersonTwo} />
        </View>
      </View>
    </View>
  );
}

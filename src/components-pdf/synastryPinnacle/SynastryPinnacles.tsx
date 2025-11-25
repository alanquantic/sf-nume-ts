import Synastry from '@/resources/Synastry';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import SynastryPinnacle from './SynastryPinnacle';

export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '250px',
    left: '12px',
    width: '532px',
    backgroundColor: 'red',
  },
  wrap: {
    // backgroundColor: 'blue',
    position: 'absolute',
  },
  synastry: {
    position: 'relative',
    left: 18,
  },
  consultant: {
    position: 'relative',
    left: 198,
  },
  partner: {
    position: 'relative',
    left: 382,
  },
  number: {
    width: 24,
    height: 24,
    fontSize: 14,
    // backgroundColor: '#ff000023',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 10,
    position: 'absolute',
    top: 2,
    left: 57,
    color: '#FFF',
  },
  partnerName: {
    fontSize: 10,
    position: 'absolute',
    top: 2,
    left: 57,
    color: '#FFF',
  },
});

export default function SynastryPinnacles({ synastry }: { synastry: Synastry }) {
  const { consultant, partner } = synastry;
  return (
    <View style={data.container}>
      <View style={[data.wrap, data.synastry]}>
        <SynastryPinnacle synastry={synastry} />
      </View>
      <View style={[data.wrap, data.consultant]}>
        <View style={data.name}>
          <Text>{consultant.name}</Text>
        </View>
        <SynastryPinnacle synastry={consultant} />
      </View>
      <View style={[data.wrap, data.partner]}>
        <View style={data.partnerName}>
          <Text>{partner.name}</Text>
        </View>
        <SynastryPinnacle synastry={partner} />
      </View>
    </View>
  );
}

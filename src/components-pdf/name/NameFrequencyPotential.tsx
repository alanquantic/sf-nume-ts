import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '119px',
    left: '302px',
    fontSize: '7px',
    width: '308px',
    height: '107px',
    transform: 'rotate(-90deg)',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
  },
});

export default function NameFrequencyPotential({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, { left: 61, top: 26 }]}>
          <Text>
            {consultant.nameCount()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 199, top: 25, width: 92 }]}>
          <Text>
            {consultant.calcNameCycles().toString()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 61, top: 71 }]}>
          <Text>
            {consultant.calcPersonalYear()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 91, top: 71 }]}>
          <Text>
            {consultant.calcOneDigitYearsOld()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 198, top: 71 }]}>
          <Text>
            {consultant.calcPersonalNumber()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 234, top: 71 }]}>
          <Text>
            {consultant.calcMaturity()}
          </Text>
        </View>
      </View>
      <Text>-</Text>
    </View>
  );
}

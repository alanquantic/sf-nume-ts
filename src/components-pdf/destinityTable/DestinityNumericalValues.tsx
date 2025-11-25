import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '300px',
    left: '21px',
    fontSize: '7px',
    width: '669px',
    height: '105px',
    transform: 'rotate(-90deg)',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
  },
});

export default function DestinityNumericalValues({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, { left: 24, top: 56 }]}>
          <Text>
            {consultant.nameCount()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 108, top: 57, width: 148 }]}>
          <Text>
            {consultant.calcNameCycles().toString()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, {
          left: 286, top: 57, width: 148, overflow: 'hidden',
        }]}
        >
          <Text>
            {consultant.calcNameSubCycles().slice(0, 9).toString()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 541, top: 31 }]}>
          <Text>
            {consultant.calcPersonalYear(date.year)}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 578, top: 30 }]}>
          <Text>
            {consultant.calcOneDigitYearsOld()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 542, top: 70 }]}>
          <Text>
            {consultant.calcPersonalNumber()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 582, top: 69 }]}>
          <Text>
            {consultant.calcMaturity()}
          </Text>
        </View>
      </View>
      <Text>-</Text>
    </View>
  );
}

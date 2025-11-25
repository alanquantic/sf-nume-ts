import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '26px',
    left: '238px',
    fontSize: '7px',
    width: '271px',
    // backgroundColor: 'red',
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
    fontSize: '11px',
    top: '39px',
  },
  name: {
    left: '19px',
  },
  soul: {
    left: '90px',
  },
  soul_expresion: {
    left: '161px',
  },
  nameCount: {
    top: '6px',
    left: '60px',
  },
  nameCycles: {
    top: '6px',
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
    left: '205px',
  },
  calcPersonalYear: {
    top: '38px',
    left: '60px',
  },
  calcOneDigitYearsOld: {
    top: '38px',
    left: '90px',
  },
  calcPersonalNumber: {
    top: '38px',
    left: '197px',
  },
  calcMaturity: {
    top: '38px',
    left: '233px',
  },
});

export default function NamePotential({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const nameCycles = consultant.calcNameCycles();
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, pinnacleName.nameCount]}>
          <Text>
            {consultant.nameCount()}
          </Text>
        </View>
        <View style={[pinnacleName.nameCycles]}>
          <Text>
            {nameCycles.toString()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.calcPersonalYear]}>
          <Text>
            {consultant.calcPersonalYear(date.year)}
          </Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.calcOneDigitYearsOld]}>
          <Text>
            {consultant.calcOneDigitYearsOld()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.calcPersonalNumber]}>
          <Text>
            {consultant.calcPersonalNumber()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.calcMaturity]}>
          <Text>
            {consultant.calcMaturity()}
          </Text>
        </View>
      </View>
    </View>
  );
}

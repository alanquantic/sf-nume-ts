import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '7px',
    width: '271px',
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '16px',
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
});

export default function NameValues({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, pinnacleName.name]}>
          <Text>
            {consultant.calcName()}
            {consultant.calcNameISK()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.soul]}>
          <Text>
            {consultant.calcSoulNumber()}
            {consultant.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.soul_expresion]}>
          <Text>
            {consultant.calcSoulExpression()}
            {consultant.calcSoulExpressionISK()}
          </Text>
        </View>
      </View>
    </View>
  );
}

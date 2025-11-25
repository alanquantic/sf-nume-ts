import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '128px',
    left: '11px',
    fontSize: '7px',
    width: '271px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#0000ff90',
    position: 'absolute',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
    top: '27px',
  },
});

export default function CreateNumeric({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, { left: 22 }]}>
          <Text>
            {consultant.calcName()}
            {consultant.calcNameISK()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 85 }]}>
          <Text>
            {consultant.calcSoulNumber()}
            {consultant.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 151 }]}>
          <Text>
            {consultant.calcSoulExpression()}
            {consultant.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 220 }]}>
          <Text>
            {consultant.calcMaturity()}
            {consultant.calcMaturityISK()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { left: 313 }]}>
          <Text>{consultant.nameCount()}</Text>
        </View>
      </View>
      <View>-</View>
    </View>
  );
}

import Synastry from '@/resources/Synastry';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '30px',
    left: '12px',
    width: '532px',
    // backgroundColor: 'red'
  },
  wrap: {
    // backgroundColor: 'blue',
    position: 'absolute',
    top: 144,
  },
  synastry: {
    position: 'relative',
  },
  consultant: {
    position: 'relative',
    left: 181,
  },
  partner: {
    position: 'relative',
    left: 362,
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
    top: 1,
    left: 57,
    color: '#FFF',
  },
});

export default function SynastryNames({ synastry }: { synastry: Synastry }) {
  const { consultant, partner } = synastry;
  return (
    <View style={data.container}>
      <View style={[data.wrap, data.synastry]}>
        <View style={[data.number, { top: 32, left: 11 }]}>
          <Text>
            {synastry.calcName()}
            {synastry.calcNameISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 50 }]}>
          <Text>
            {synastry.calcSoulNumber()}
            {synastry.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 90 }]}>
          <Text>
            {synastry.calcSoulExpression()}
            {synastry.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 135 }]}>
          <Text>
            {synastry.calcMaturity()}
            {synastry.calcMaturityISK()}
          </Text>
        </View>
      </View>
      <View style={[data.wrap, data.consultant]}>
        <View style={data.name}>
          <Text>{consultant.name}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 11 }]}>
          <Text>
            {consultant.calcName()}
            {consultant.calcNameISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 50 }]}>
          <Text>
            {consultant.calcSoulNumber()}
            {consultant.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 90 }]}>
          <Text>
            {consultant.calcSoulExpression()}
            {consultant.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 135 }]}>
          <Text>
            {consultant.calcMaturity()}
            {consultant.calcMaturityISK()}
          </Text>
        </View>
      </View>
      <View style={[data.wrap, data.partner]}>
        <View style={data.partnerName}>
          <Text>{partner.name}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 11 }]}>
          <Text>
            {partner.calcName()}
            {partner.calcNameISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 50 }]}>
          <Text>
            {partner.calcSoulNumber()}
            {partner.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 90 }]}>
          <Text>
            {partner.calcSoulExpression()}
            {partner.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[data.number, { top: 32, left: 135 }]}>
          <Text>
            {partner.calcMaturity()}
            {partner.calcMaturityISK()}
          </Text>
        </View>
      </View>
    </View>
  );
}

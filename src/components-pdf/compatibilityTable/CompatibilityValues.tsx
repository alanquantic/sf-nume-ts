import Synastry from '@/resources/Synastry';
import { getCompatibility } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const comp = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '220px',
    top: '205px',
    left: '155px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  squad: {
    width: '20px',
    height: '20px',
    borderRadius: '7px',
    fontSize: '12px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '20px',
    height: '20px',
    borderRadius: '25px',
    fontSize: '8px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  p1: { left: '20px' },
  p2: { left: '80px' },
  CN: { left: '160px' },
  row1: { top: '8px' },
  row2: { top: '36px' },
  row3: { top: '66px' },
  row4: { top: '96px' },
  row5: { top: '127px' },
  row6: { top: '159px' },
  row7: { top: '189px' },
  row8: { top: '218px' },
  text: {
    fontSize: '12px',
    fontWeight: 'bold',
  },
});

export default function CompatibilityTable({ synastry }: { synastry: Synastry }) {
  const { consultant } = synastry;
  const { partner } = synastry;
  return (
    <View style={comp.container}>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row1, comp.p1]}>
          <Text style={comp.text}>
            {consultant.calcSoulNumber()}
            {consultant.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row1, comp.p2]}>
          <Text style={comp.text}>
            {partner.calcSoulNumber()}
            {partner.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row1, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.calcSoulNumber(), partner.calcSoulNumber())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row2, comp.p1]}>
          <Text style={comp.text}>
            {consultant.calcSoulExpression()}
            {consultant.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row2, comp.p2]}>
          <Text style={comp.text}>
            {partner.calcSoulExpression()}
            {partner.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row2, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.calcSoulExpression(), partner.calcSoulExpression())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row3, comp.p1]}>
          <Text style={comp.text}>
            {consultant.calcName()}
            {consultant.calcNameISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row3, comp.p2]}>
          <Text style={comp.text}>
            {partner.calcName()}
            {partner.calcNameISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row3, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.calcName(), partner.calcName())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row4, comp.p1]}>
          <Text style={comp.text}>
            {consultant.getB()}
            {consultant.getBISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row4, comp.p2]}>
          <Text style={comp.text}>
            {partner.getB()}
            {partner.getBISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row4, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.getB(), partner.getB())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row5, comp.p1]}>
          <Text style={comp.text}>
            {consultant.getD()}
            {consultant.getDISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row5, comp.p2]}>
          <Text style={comp.text}>
            {partner.getD()}
            {partner.getDISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row5, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.getD(), partner.getD())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row6, comp.p1]}>
          <Text style={comp.text}>
            {consultant.getI()}
            {consultant.getIISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row6, comp.p2]}>
          <Text style={comp.text}>
            {partner.getI()}
            {partner.getIISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row6, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.getI(), partner.getI())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row7, comp.p1]}>
          <Text style={comp.text}>
            {consultant.getH()}
            {consultant.getHISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row7, comp.p2]}>
          <Text style={comp.text}>
            {partner.getH()}
            {partner.getHISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row7, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.getH(), partner.getH())}</Text></View>
      </View>
      <View style={[comp.row]}>
        <View style={[comp.squad, comp.row8, comp.p1]}>
          <Text style={comp.text}>
            {consultant.calcMaturity()}
            {consultant.calcMaturityISK()}
          </Text>
        </View>
        <View style={[comp.squad, comp.row8, comp.p2]}>
          <Text style={comp.text}>
            {partner.calcMaturity()}
            {partner.calcMaturityISK()}
          </Text>
        </View>
        <View style={[comp.circle, comp.row8, comp.CN]}><Text style={comp.text}>{getCompatibility(consultant.calcMaturity(), partner.calcMaturity())}</Text></View>
      </View>
    </View>
  );
}

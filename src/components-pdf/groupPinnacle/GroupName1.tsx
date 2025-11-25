import Group from '@/resources/Group';
import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '240px',
    left: '15px',
    width: '527px',
    // border:1,
    // borderColor:'#333'
  },
  wrap: {
    position: 'relative',
    width: '170px',
  },
  wrap1: {
    top: '0px',
    left: '0px',
    position: 'absolute',
  },
  wrap2: {
    top: '0px',
    left: '180px',
    position: 'absolute',
  },
  wrap3: {
    top: '0px',
    left: '360px',
    position: 'absolute',
  },
  bar: {
    backgroundColor: '#333',
    width: '170px',
    height: '10px',
  },
  letter: {
    width: '24px',
    height: '24px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '14px',
  },
  name: {
    width: '60px',
    top: 0,
    left: 70,
    fontSize: '8px',
    color: '#ffffff',
    position: 'absolute',
  },
  A: {
    top: 32,
    left: 10,
  },
  B: {
    left: 49,
    top: 32,
  },
  C: {
    top: 31,
    left: 87,
  },
  D: {
    top: 31,
    left: 135,
  },
  /* container:{
    position:'absolute',
    top:'240px',
    left:'15px',
    width:'527px',
    border:1,
    borderColor:'#333'
  },
  bar:{
    backgroundColor:'#333',
    width:'170px',
    height:'10px'
  },
  pinnacle:{
    top:'60px'
  },
  names:{
    top:'0px',
    left:'0px'
  } */
});

export default function GroupName1({ groupConsult, members }: { groupConsult: Group, members: Person[] }) {
  return (
    <View style={style.container}>
      <View style={[style.wrap, style.wrap1]}>
        <View style={[style.letter, style.A]}>
          <Text>
            {groupConsult.calcName()}
            {groupConsult.calcNameISK()}
          </Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>
            {groupConsult.calcSoulNumber()}
            {groupConsult.calcSoulNumberISK()}
          </Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>
            {groupConsult.calcSoulExpression()}
            {groupConsult.calcSoulExpressionISK()}
          </Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>
            {groupConsult.calcMaturity()}
            {groupConsult.calcMaturityISK()}
          </Text>
        </View>
      </View>
      {(members[0] !== undefined) ? (
        <View style={[style.wrap, style.wrap2]}>
          <View style={style.name}><Text>{members[0].nameView}</Text></View>
          <View style={[style.letter, style.A]}>
            <Text>
              {members[0].calcName()}
              {members[0].calcNameISK()}
            </Text>
          </View>
          <View style={[style.letter, style.B]}>
            <Text>
              {members[0].calcSoulNumber()}
              {members[0].calcSoulNumberISK()}
            </Text>
          </View>
          <View style={[style.letter, style.C]}>
            <Text>
              {members[0].calcSoulExpression()}
              {members[0].calcSoulExpressionISK()}
            </Text>
          </View>
          <View style={[style.letter, style.D]}>
            <Text>
              {members[0].calcMaturity()}
              {members[0].calcMaturityISK()}
            </Text>
          </View>
        </View>
      ) : null}
      {(members[1] !== undefined) ? (
        <View style={[style.wrap, style.wrap3]}>
          <View style={style.name}><Text>{members[1].nameView}</Text></View>
          <View style={[style.letter, style.A]}>
            <Text>
              {members[1].calcName()}
              {members[1].calcNameISK()}
            </Text>
          </View>
          <View style={[style.letter, style.B]}>
            <Text>
              {members[1].calcSoulNumber()}
              {members[1].calcSoulNumberISK()}
            </Text>
          </View>
          <View style={[style.letter, style.C]}>
            <Text>
              {members[1].calcSoulExpression()}
              {members[1].calcSoulExpressionISK()}
            </Text>
          </View>
          <View style={[style.letter, style.D]}>
            <Text>
              {members[1].calcMaturity()}
              {members[1].calcMaturityISK()}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

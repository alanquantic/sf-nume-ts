import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '310px',
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
    width: '14px',
    height: '14px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '7px',
  },
  letter_main: {
    width: '20px',
    height: '20px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '10px',
  },
  abs: {
    width: '40px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    position: 'absolute',
    fontSize: '7px',
  },
  name: {
    width: '60px',
    top: 0,
    left: 80,
    fontSize: '8px',
    color: '#ffffff',
    position: 'absolute',
  },
  A: {
    top: 93,
    left: 32,
  },
  B: {
    left: 60,
    top: 86,
  },
  C: {
    top: 90,
    left: 95,
  },
  D: {
    top: 91,
    left: 117,
  },
  E: {
    left: 47,
    top: 62,
  },
  F: {
    top: 62,
    left: 79,
  },
  G: {
    top: 39,
    left: 63,
  },
  H: {
    top: 16,
    left: 63,
  },
  I: {
    top: 62,
    left: 63,
  },
  J: {
    top: 62,
    left: 108,
  },
  K: {
    top: 121,
    left: 47,
  },
  O: {
    top: 121,
    left: 63,
  },
  L: {
    top: 121,
    left: 79,
  },
  W: {
    top: 143,
    left: 27,
  },
  M: {
    top: 144,
    left: 63,
  },
  N: {
    top: 167,
    left: 63,
  },
  P: {
    top: 167,
    left: 40,
  },
  Q: {
    top: 189,
    left: 47,
  },
  R: {
    top: 189,
    left: 63,
  },
  S: {
    top: 189,
    left: 79,
  },
  ausensia: {
    top: 183,
    left: 102,
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

export default function GroupPinnacle2({ members }: { members: Person[] }) {
  return (
    <View style={style.container}>
      {members[0] !== undefined ? (
        <View style={[style.wrap, style.wrap1]}>
          <View style={style.name}><Text>{members[0].nameView}</Text></View>
          <View style={[style.letter, style.A]}>
            <Text>
              {members[0].getA()}
              {members[0].getAISK()}
            </Text>
          </View>
          <View style={[style.letter_main, style.B]}>
            <Text>
              {members[0].getB()}
              {members[0].getBISK()}
            </Text>
          </View>
          <View style={[style.letter, style.C]}>
            <Text>
              {members[0].getC()}
              {members[0].getCISK()}
            </Text>
          </View>
          <View style={[style.letter, style.D]}>
            <Text>
              {members[0].getD()}
              {members[0].getDISK()}
            </Text>
          </View>

          <View style={[style.letter, style.E]}>
            <Text>
              {members[0].getE()}
              {members[0].getEISK()}
            </Text>
          </View>
          <View style={[style.letter, style.F]}>
            <Text>
              {members[0].getF()}
              {members[0].getFISK()}
            </Text>
          </View>
          <View style={[style.letter, style.I]}>
            <Text>
              {members[0].getI()}
              {members[0].getIISK()}
            </Text>
          </View>

          <View style={[style.letter, style.H]}>
            <Text>
              {members[0].getH()}
              {members[0].getHISK()}
            </Text>
          </View>
          <View style={[style.letter, style.G]}>
            <Text>
              {members[0].getG()}
              {members[0].getGISK()}
            </Text>
          </View>

          <View style={[style.letter, style.J]}>
            <Text>
              {members[0].getJ()}
              {members[0].getJISK()}
            </Text>
          </View>

          <View style={[style.letter, style.K]}>
            <Text>{members[0].getK()}</Text>
          </View>
          <View style={[style.letter, style.O]}>
            <Text>{members[0].getO()}</Text>
          </View>
          <View style={[style.letter, style.L]}>
            <Text>{members[0].getL()}</Text>
          </View>

          <View style={[style.letter, style.M]}>
            <Text>{members[0].getM()}</Text>
          </View>

          <View style={[style.letter, style.P]}>
            <Text>{members[0].getP()}</Text>
          </View>
          <View style={[style.letter, style.N]}>
            <Text>{members[0].getN()}</Text>
          </View>

          <View style={[style.letter, style.R]}>
            <Text>{members[0].getR()}</Text>
          </View>
          <View style={[style.letter, style.Q]}>
            <Text>{members[0].getQ()}</Text>
          </View>
          <View style={[style.letter, style.S]}>
            <Text>{members[0].getS()}</Text>
          </View>

          <View style={[style.letter, style.W]}>
            <Text>{members[0].getW()}</Text>
          </View>
          <View style={[style.abs, style.ausensia]}>
            <Text>{members[0].getAbsences()}</Text>
          </View>
        </View>
      ) : null}
      {members[1] !== undefined ? (
        <View style={[style.wrap, style.wrap2]}>
          <View style={style.name}><Text>{members[1].nameView}</Text></View>
          <View style={[style.letter, style.A]}>
            <Text>
              {members[1].getA()}
              {members[1].getAISK()}
            </Text>
          </View>
          <View style={[style.letter_main, style.B]}>
            <Text>
              {members[1].getB()}
              {members[1].getBISK()}
            </Text>
          </View>
          <View style={[style.letter, style.C]}>
            <Text>
              {members[1].getC()}
              {members[1].getCISK()}
            </Text>
          </View>
          <View style={[style.letter, style.D]}>
            <Text>
              {members[1].getD()}
              {members[1].getDISK()}
            </Text>
          </View>

          <View style={[style.letter, style.E]}>
            <Text>
              {members[1].getE()}
              {members[1].getEISK()}
            </Text>
          </View>
          <View style={[style.letter, style.F]}>
            <Text>
              {members[1].getF()}
              {members[1].getFISK()}
            </Text>
          </View>
          <View style={[style.letter, style.I]}>
            <Text>
              {members[1].getI()}
              {members[1].getIISK()}
            </Text>
          </View>

          <View style={[style.letter, style.H]}>
            <Text>
              {members[1].getH()}
              {members[1].getHISK()}
            </Text>
          </View>
          <View style={[style.letter, style.G]}>
            <Text>
              {members[1].getG()}
              {members[1].getGISK()}
            </Text>
          </View>

          <View style={[style.letter, style.J]}>
            <Text>
              {members[1].getJ()}
              {members[1].getJISK()}
            </Text>
          </View>

          <View style={[style.letter, style.K]}>
            <Text>{members[1].getK()}</Text>
          </View>
          <View style={[style.letter, style.O]}>
            <Text>{members[1].getO()}</Text>
          </View>
          <View style={[style.letter, style.L]}>
            <Text>{members[1].getL()}</Text>
          </View>

          <View style={[style.letter, style.M]}>
            <Text>{members[1].getM()}</Text>
          </View>

          <View style={[style.letter, style.P]}>
            <Text>{members[1].getP()}</Text>
          </View>
          <View style={[style.letter, style.N]}>
            <Text>{members[1].getN()}</Text>
          </View>

          <View style={[style.letter, style.R]}>
            <Text>{members[1].getR()}</Text>
          </View>
          <View style={[style.letter, style.Q]}>
            <Text>{members[1].getQ()}</Text>
          </View>
          <View style={[style.letter, style.S]}>
            <Text>{members[1].getS()}</Text>
          </View>

          <View style={[style.letter, style.W]}>
            <Text>{members[1].getW()}</Text>
          </View>
          <View style={[style.abs, style.ausensia]}>
            <Text>{members[1].getAbsences()}</Text>
          </View>
        </View>
      ) : null}
      {members[2] !== undefined ? (
        <View style={[style.wrap, style.wrap3]}>
          <View style={style.name}><Text>{members[2].nameView}</Text></View>
          <View style={[style.letter, style.A]}>
            <Text>
              {members[2].getA()}
              {members[2].getAISK()}
            </Text>
          </View>
          <View style={[style.letter_main, style.B]}>
            <Text>
              {members[2].getB()}
              {members[2].getBISK()}
            </Text>
          </View>
          <View style={[style.letter, style.C]}>
            <Text>
              {members[2].getC()}
              {members[2].getCISK()}
            </Text>
          </View>
          <View style={[style.letter, style.D]}>
            <Text>
              {members[2].getD()}
              {members[2].getDISK()}
            </Text>
          </View>

          <View style={[style.letter, style.E]}>
            <Text>
              {members[2].getE()}
              {members[2].getEISK()}
            </Text>
          </View>
          <View style={[style.letter, style.F]}>
            <Text>
              {members[2].getF()}
              {members[2].getFISK()}
            </Text>
          </View>
          <View style={[style.letter, style.I]}>
            <Text>
              {members[2].getI()}
              {members[2].getIISK()}
            </Text>
          </View>

          <View style={[style.letter, style.H]}>
            <Text>
              {members[2].getH()}
              {members[2].getHISK()}
            </Text>
          </View>
          <View style={[style.letter, style.G]}>
            <Text>
              {members[2].getG()}
              {members[2].getGISK()}
            </Text>
          </View>

          <View style={[style.letter, style.J]}>
            <Text>
              {members[2].getJ()}
              {members[2].getJISK()}
            </Text>
          </View>

          <View style={[style.letter, style.K]}>
            <Text>{members[2].getK()}</Text>
          </View>
          <View style={[style.letter, style.O]}>
            <Text>{members[2].getO()}</Text>
          </View>
          <View style={[style.letter, style.L]}>
            <Text>{members[2].getL()}</Text>
          </View>

          <View style={[style.letter, style.M]}>
            <Text>{members[2].getM()}</Text>
          </View>

          <View style={[style.letter, style.P]}>
            <Text>{members[2].getP()}</Text>
          </View>
          <View style={[style.letter, style.N]}>
            <Text>{members[2].getN()}</Text>
          </View>

          <View style={[style.letter, style.R]}>
            <Text>{members[2].getR()}</Text>
          </View>
          <View style={[style.letter, style.Q]}>
            <Text>{members[2].getQ()}</Text>
          </View>
          <View style={[style.letter, style.S]}>
            <Text>{members[2].getS()}</Text>
          </View>

          <View style={[style.letter, style.W]}>
            <Text>{members[2].getW()}</Text>
          </View>
          <View style={[style.abs, style.ausensia]}>
            <Text>{members[2].getAbsences()}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '63px',
    left: '10px',
    width: '271px',
  },
  wrap: {
  },
  bar: {
    opacity: 0,
    fontSize: '7px',
    backgroundColor: '#000',
    fontWeight: 'bold',
    color: '#fff',
    padding: '3px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  letter: {
    width: '30px',
    height: '30px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
  },
  letter_main: {
    width: '50px',
    height: '50px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '30px',
  },
  A: {
    top: '173',
    left: '12px',
  },
  B: {
    top: '163',
    left: '83.4px',
  },
  C: {
    top: '173',
    left: '174px',
  },
  D: {
    top: '173',
    left: '228.4px',
  },
  E: {
    top: '115',
    left: '56px',
  },
  I: {
    top: '115',
    left: '92.7px',
  },
  F: {
    top: '115',
    left: '132px',
  },
  G: {
    top: '65',
    left: '92.7px',
  },
  H: {
    top: '15',
    left: '92.7px',
  },
  J: {
    top: '115',
    left: '201px',
  },
  O: {
    top: '235',
    left: '92.7px',
  },
  K: {
    top: '235',
    left: '56px',
  },
  L: {
    top: '235',
    left: '132px',
  },
  M: {
    top: '285',
    left: '92.7px',
  },
  N: {
    top: '335',
    left: '92.7px',
  },
  R: {
    top: '385',
    left: '92.7px',
  },
  Q: {
    top: '385',
    left: '56px',
  },
  S: {
    top: '385',
    left: '132px',
  },
  P: {
    top: '335',
    left: '39.5px',
  },
  W: {
    top: '285',
    left: '13px',
  },
  ausensias: {
    position: 'absolute',
    top: '360px',
    left: '190px',
    width: '60px',
    height: '55px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000'
  },
  reaccion: {
    top: '-27.8px',
    left: '219.4px',
  },
  sintesis: {
    top: '-32.3px',
    left: '219.4px',
  },
  regalo: {
    top: '-32.3px',
    left: '219.4px',
  },
});

export default function Pinnacle({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnacle.container}>
      <View style={pinnacle.bar}>
        <Text>
          Pináculo
        </Text>
      </View>
      <View style={pinnacle.wrap}>
        <View style={[pinnacle.letter, pinnacle.A]}>
          <Text>{consultant.getA()}</Text>
        </View>
        <View style={[pinnacle.letter_main, pinnacle.B]}>
          <Text>{consultant.getB()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.C]}>
          <Text>{consultant.getC()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.D]}>
          <Text>{consultant.getD()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.E]}>
          <Text>{consultant.getE()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.F]}>
          <Text>{consultant.getF()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.I]}>
          <Text>{consultant.getI()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.H]}>
          <Text>{consultant.getH()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.G]}>
          <Text>{consultant.getG()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.J]}>
          <Text>{consultant.getJ()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.K]}>
          <Text>{consultant.getK()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.O]}>
          <Text>{consultant.getO()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.L]}>
          <Text>{consultant.getL()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.M]}>
          <Text>{consultant.getM()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.P]}>
          <Text>{consultant.getP()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.N]}>
          <Text>{consultant.getN()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.R]}>
          <Text>{consultant.getR()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.Q]}>
          <Text>{consultant.getQ()}</Text>
        </View>
        <View style={[pinnacle.letter, pinnacle.S]}>
          <Text>{consultant.getS()}</Text>
        </View>

        <View style={[pinnacle.letter, pinnacle.W]}>
          <Text>{consultant.getW()}</Text>
        </View>

        <View style={[pinnacle.ausensias]}>
          <Text>{ consultant.getAbsences()}</Text>
        </View>
      </View>
    </View>
  );
}

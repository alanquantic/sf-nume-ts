import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '13px',
    // right: '14px',
    // fontSize: '7px',
    // width: '135px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#0000ff90',
    position: 'absolute',
    width: '14px',
    height: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '7px',
    top: '63px',
    left: 53,
  },
  circle_main: {
    width: '20px',
    height: '20px',
  },
});

export default function SynastryPinnacle({ synastry }: { synastry: Synastry | Person }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, { left: 16, top: 80 }]}>
          <Text>{synastry.getA()}</Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.circle_main, { left: 44, top: 76, fontSize: 10 }]}>
          <Text>{synastry.getB()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 79, top: 80 }]}>
          <Text>{synastry.getC()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 101, top: 80 }]}>
          <Text>{synastry.getD()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 31, top: 50 }]}>
          <Text>{synastry.getE()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 50 }]}>
          <Text>{synastry.getI()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 64, top: 50 }]}>
          <Text>{synastry.getF()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 47, top: 4 }]}>
          <Text>{synastry.getH()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 27 }]}>
          <Text>{synastry.getG()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 92, top: 50 }]}>
          <Text>{synastry.getJ()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 31, top: 110 }]}>
          <Text>{synastry.getK()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 110 }]}>
          <Text>{synastry.getO()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 64, top: 110 }]}>
          <Text>{synastry.getL()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 47, top: 132 }]}>
          <Text>{synastry.getM()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 24, top: 156 }]}>
          <Text>{synastry.getP()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 156 }]}>
          <Text>{synastry.getN()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 47, top: 178 }]}>
          <Text>{synastry.getR()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 31, top: 178 }]}>
          <Text>{synastry.getQ()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 64, top: 178 }]}>
          <Text>{synastry.getS()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 12, top: 132 }]}>
          <Text>{synastry.getW()}</Text>
        </View>

        <View style={[pinnacleName.circle, {
          left: 86, top: 169, width: 40, height: 22,
        }]}
        >
          <Text>{synastry.getAbsences()}</Text>
        </View>
      </View>
    </View>
  );
}

import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '126px',
    right: '14px',
    fontSize: '7px',
    width: '135px',
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

export default function CreatePinnacle({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, { left: 16, top: 80 }]}>
          <Text>{consultant.getA()}</Text>
        </View>
        <View style={[pinnacleName.circle, pinnacleName.circle_main, { left: 44, top: 76, fontSize: 10 }]}>
          <Text>{consultant.getB()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 79, top: 80 }]}>
          <Text>{consultant.getC()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 101, top: 80 }]}>
          <Text>{consultant.getD()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 31, top: 50 }]}>
          <Text>{consultant.getE()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 50 }]}>
          <Text>{consultant.getI()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 64, top: 50 }]}>
          <Text>{consultant.getF()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 47, top: 4 }]}>
          <Text>{consultant.getH()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 27 }]}>
          <Text>{consultant.getG()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 92, top: 50 }]}>
          <Text>{consultant.getJ()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 31, top: 110 }]}>
          <Text>{consultant.getK()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 110 }]}>
          <Text>{consultant.getO()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 64, top: 110 }]}>
          <Text>{consultant.getL()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 47, top: 132 }]}>
          <Text>{consultant.getM()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 24, top: 156 }]}>
          <Text>{consultant.getP()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 47, top: 156 }]}>
          <Text>{consultant.getN()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 47, top: 178 }]}>
          <Text>{consultant.getR()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 31, top: 178 }]}>
          <Text>{consultant.getQ()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 64, top: 178 }]}>
          <Text>{consultant.getS()}</Text>
        </View>

        <View style={[pinnacleName.circle, { left: 12, top: 132 }]}>
          <Text>{consultant.getW()}</Text>
        </View>

        <View style={[pinnacleName.circle, {
          left: 86, top: 169, width: 40, height: 22,
        }]}
        >
          <Text>{consultant.getAbsences()}</Text>
        </View>
        {/* <Text>-</Text> */}
      </View>
    </View>
  );
}

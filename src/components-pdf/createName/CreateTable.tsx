import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '227px',
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
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
    top: '63px',
    left: 53,
  },
  hab1: {
    left: '90px',
  },
  hab2: {
    left: '128px',
  },
  hab3: {
    left: '165px',
  },
  hab4: {
    left: '200px',
  },
  hab5: {
    left: '238px',
  },
  hab6: {
    left: '274px',
  },
  hab7: {
    left: '312px',
  },
  hab8: {
    left: '349px',
  },
});

export default function CreateTable({ consultant }: { consultant: Person }) {
  const appearances = consultant.getAppearances();

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        {Object.entries(appearances).map((el, i) => (
          <View style={[pinnacleName.circle, pinnacleName[`hab${i}` as keyof typeof pinnacleName]]}>
            <Text>
              {el[1].a}
              {' '}
            </Text>
          </View>
        ))}
      </View>
      <View>-</View>
    </View>
  );
}

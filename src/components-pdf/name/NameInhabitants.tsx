import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '595px',
    left: '14px',
    fontSize: '7px',
    width: '271px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
    top: '69px',
    left: '103px',
  },
  hab1: {
    left: '149px',
  },
  hab2: {
    left: '196px',
  },
  hab3: {
    left: '246px',
  },
  hab4: {
    left: '295px',
  },
  hab5: {
    left: '342px',
  },
  hab6: {
    left: '391px',
  },
  hab7: {
    left: '441px',
  },
  hab8: {
    left: '489px',
  },
});

export default function NameInhabitants({ consultant }: { consultant: Person }) {
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
    </View>
  );
}

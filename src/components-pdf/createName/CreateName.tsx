import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '0px',
    left: '11px',
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
    // width: '20px',
    height: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '7px',
    top: '29px',
  },
});

export default function CreateName({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.circle, { left: 74, top: 42 }]}>
          <Text>{consultant.fullName}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 135, top: 70, height: 13 }]}>
          <Text>{consultant.getDayOfBirth()}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 202, top: 70, height: 13 }]}>
          <Text>{consultant.getMonthOfBirth() + 1}</Text>
        </View>
        <View style={[pinnacleName.circle, { left: 270, top: 70, height: 13 }]}>
          <Text>{consultant.getYearOfBirth()}</Text>
        </View>
      </View>
    </View>
  );
}

import { AnnualReturn } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const aReturn = StyleSheet.create({
  return_year: {
    // backgroundColor: '#00000050',
    position: 'absolute',
    width: '25px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    top: '0px',
    left: '43px',

  },
  return_age: {
    // backgroundColor: '#00000050',
    position: 'absolute',
    width: '48px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    top: '0px',
    left: '99px',

  },
  circle: {
    // backgroundColor: '#00000050',
    position: 'absolute',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  return_top: {
    top: '42px',
    left: '75px',

  },
  return_sl_left: {
    top: '64px',
    left: '51px',

  },
  return_sl_mid: {
    top: '64px',
    left: '75px',
  },
  return_sl_rig: {
    top: '64px',
    left: '99px',

  },
  return_tl_left: {
    top: '88px',
    left: '30px',
  },
  return_tl_mid: {
    top: '88px',
    left: '75px',
  },
  return_tl_rig: {
    top: '86px',
    left: '121px',
  },
  return_bottom: {
    top: '111px',
    left: '75px',
  },
});

export default function SynastryAnnualReturn({ annualReturn }: { annualReturn: AnnualReturn }) {
  return (
    <>
      <View style={aReturn.return_year}>
        <Text>{annualReturn.yearToCalculate}</Text>
      </View>
      <View style={aReturn.return_age}>
        <Text>
          {annualReturn.age}
          {' '}
          años
        </Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_top]}>
        <Text>{annualReturn.F}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_sl_left]}>
        <Text>{annualReturn.D}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_sl_mid]}>
        <Text>{annualReturn.G}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_sl_rig]}>
        <Text>{annualReturn.E}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_tl_left]}>
        <Text>{annualReturn.A}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_tl_mid]}>
        <Text>{annualReturn.B}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_tl_rig]}>
        <Text>{annualReturn.C}</Text>
      </View>
      <View style={[aReturn.circle, aReturn.return_bottom]}>
        <Text>{annualReturn.H}</Text>
      </View>
    </>
  );
}

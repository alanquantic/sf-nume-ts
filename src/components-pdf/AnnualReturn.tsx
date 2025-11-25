import { AnnualReturn as AnnualReturnType } from '@/resources/Person';
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
    top: '15px',
    left: '16px',

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
    top: '15px',
    left: '69px',

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
    top: '47px',
    left: '50px',

  },
  return_sl_left: {
    top: '68px',
    left: '26px',

  },
  return_sl_mid: {
    top: '68px',
    left: '50px',
  },
  return_sl_rig: {
    top: '68px',
    left: '74px',

  },
  return_tl_left: {
    top: '90px',
    left: '10px',
  },
  return_tl_mid: {
    top: '89px',
    left: '50px',
  },
  return_tl_rig: {
    top: '90px',
    left: '91px',
  },
  return_bottom: {
    top: '112px',
    left: '50px',
  },
});

export default function AnnualReturn({ annualReturn }: { annualReturn: AnnualReturnType }) {
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

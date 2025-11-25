import { StyleSheet, Text, View } from '@react-pdf/renderer';
import Group from '../../resources/Group';

export const timeCurve = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '505px',
    left: '9px',
    width: '535px',
    fontSize: '12px',
    textAlign: 'center',
    // color: '#fff'
  },
  wrap: {
    position: 'relative',
  },
  item: {
    position: 'absolute',
    // backgroundColor: '#00ff0080',

  },
  s1_duration: {

    top: '125px', // +14
    left: '82px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s2_duration: {

    top: '107px',
    left: '194px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s3_duration: {

    top: '78px',
    left: '248px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s4_duration: {

    top: '62px',
    left: '306px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s5_duration: {

    top: '78px',
    left: '354px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s6_duration: {
    top: '107px',
    left: '411px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s7_duration: {
    top: '125px',
    left: '470px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

  },
  s1_vibration: {
    top: '105px', // +14
    left: '82px',
  },
  s2_vibration: {
    top: '87px',
    left: '194px',
  },
  s3_vibration: {
    top: '58px',
    left: '248px',
  },
  s4_vibration: {
    top: '42px',
    left: '306px',
  },
  s5_vibration: {
    top: '57px',
    left: '354px',
  },
  s6_vibration: {
    top: '87px',
    left: '411px',
  },
  s7_vibration: {
    top: '102px',
    left: '470px',
  },

  s1_begining: {
    top: '142px',
    left: '10px',
    fontSize: '8px',
  },
  s2_begining: {
    top: '142px',
    left: '165px',
    fontSize: '8px',
  },
  s3_begining: {
    top: '142px',
    left: '222px',
    fontSize: '8px',
  },
  s4_begining: {
    top: '142px',
    left: '277px',
    fontSize: '8px',
  },
  s5_begining: {
    top: '142px',
    left: '331px',
    fontSize: '8px',
  },
  s6_begining: {
    top: '142px',
    left: '387px',
    fontSize: '8px',
  },
  s7_begining: {
    top: '142px',
    left: '450px',
    fontSize: '8px',
  },
  ending: {
    top: '142px',
    left: '480px',
    fontSize: '8px',
  },
});

export default function GroupTimeCurve({ groupConsult }:{ groupConsult: Group }) {
  return (
    <View style={timeCurve.container}>
      <View style={timeCurve.wrap}>
        <View style={[timeCurve.item, timeCurve.s1_duration]}>
          <Text>{groupConsult.getK()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s2_duration]}>
          <Text>{groupConsult.getL()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s3_duration]}>
          <Text>{groupConsult.getM()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s4_duration]}>
          <Text>{groupConsult.getN()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s5_duration]}>
          <Text>{groupConsult.getM()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s6_duration]}>
          <Text>{groupConsult.getL()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s7_duration]}>
          <Text>{groupConsult.getK()}</Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s1_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(1)}
            {groupConsult.calcLifeStageISK(1)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s2_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(2)}
            {groupConsult.calcLifeStageISK(2)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s3_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(3)}
            {groupConsult.calcLifeStageISK(3)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s4_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(4)}
            {groupConsult.calcLifeStageISK(4)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s5_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(3)}
            {groupConsult.calcLifeStageISK(3)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s6_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(2)}
            {groupConsult.calcLifeStageISK(2)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s7_vibration]}>
          <Text>
            {groupConsult.calcLifeStage(1)}
            {groupConsult.calcLifeStageISK(1)}
          </Text>
        </View>

        <View style={[timeCurve.item, timeCurve.s1_begining]}>
          <Text>{groupConsult.getYearTimeCurve()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s2_begining]}>
          <Text>{groupConsult.calcLifeStageDuration(1)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s3_begining]}>
          <Text>{groupConsult.calcLifeStageDuration(2)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s4_begining]}>
          <Text>{groupConsult.calcLifeStageDuration(3)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s5_begining]}>
          <Text>{groupConsult.calcLifeStageDuration(4)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s6_begining]}>
          <Text>{groupConsult.calcLifeStageDuration(5)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s7_begining]}>
          <Text>{groupConsult.calcLifeStageDuration(6)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.ending]}>
          <Text>
            En adelante...
          </Text>
        </View>
      </View>
    </View>
  );
}

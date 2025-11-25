import Synastry, { SplittedDate } from '@/resources/Synastry';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import bgTimeCurve from '../assets/s-time-vibration-time-bk.png';

export const timeCurve = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '143px',
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
  active: {
    width: '50px',
    height: '122px',
    backgroundColor: '#CDCDCD',
  },
  activeLarge: {
    width: '157px',
    height: '122px',
    backgroundColor: '#CDCDCD',
  },
  activeLast: {
    width: '70px',
    height: '122px',
    backgroundColor: '#CDCDCD',
  },
  active_1: {
    position: 'absolute',
    top: 20,
    left: 17,
  },
  active_2: {
    position: 'absolute',
    top: 20,
    left: 176,
  },
  active_3: {
    position: 'absolute',
    top: 20,
    left: 231,
  },
  active_4: {
    position: 'absolute',
    top: 20,
    left: 286,
  },
  active_5: {
    position: 'absolute',
    top: 20,
    left: 341,
  },
  active_6: {
    position: 'absolute',
    top: 20,
    left: 398,
  },
  active_7: {
    position: 'absolute',
    top: 20,
    left: 451,
  },
});

export default function SynastryTimeCurve({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  const activeStage = synastry.getLifeStageNumber(date.month, date.year);
  return (
    <View style={[timeCurve.container]}>

      <View style={{ position: 'absolute', top: 0, zIndex: 3 }}>
        <Image src={bgTimeCurve} style={{ position: 'absolute', top: -10, width: '535px' }} />
      </View>
      <View style={[timeCurve.wrap, { zIndex: 2 }]}>
        <View style={[timeCurve.item, timeCurve.s1_duration]}>
          <Text>{synastry.getK()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s2_duration]}>
          <Text>{synastry.getL()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s3_duration]}>
          <Text>{synastry.getM()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s4_duration]}>
          <Text>{synastry.getN()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s5_duration]}>
          <Text>{synastry.getM()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s6_duration]}>
          <Text>{synastry.getL()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s7_duration]}>
          <Text>{synastry.getK()}</Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s1_vibration]}>
          <Text>
            {synastry.calcLifeStage(1)}
            {synastry.calcLifeStageISK(1)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s2_vibration]}>
          <Text>
            {synastry.calcLifeStage(2)}
            {synastry.calcLifeStageISK(2)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s3_vibration]}>
          <Text>
            {synastry.calcLifeStage(3)}
            {synastry.calcLifeStageISK(3)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s4_vibration]}>
          <Text>
            {synastry.calcLifeStage(4)}
            {synastry.calcLifeStageISK(4)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s5_vibration]}>
          <Text>
            {synastry.calcLifeStage(3)}
            {synastry.calcLifeStageISK(3)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s6_vibration]}>
          <Text>
            {synastry.calcLifeStage(2)}
            {synastry.calcLifeStageISK(2)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s7_vibration]}>
          <Text>
            {synastry.calcLifeStage(1)}
            {synastry.calcLifeStageISK(1)}
          </Text>
        </View>

        <View style={[timeCurve.item, timeCurve.s1_begining]}>
          <Text>{synastry.getYearTimeCurve()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s2_begining]}>
          <Text>{synastry.calcLifeStageDuration(1)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s3_begining]}>
          <Text>{synastry.calcLifeStageDuration(2)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s4_begining]}>
          <Text>{synastry.calcLifeStageDuration(3)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s5_begining]}>
          <Text>{synastry.calcLifeStageDuration(4)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s6_begining]}>
          <Text>{synastry.calcLifeStageDuration(5)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s7_begining]}>
          <Text>{synastry.calcLifeStageDuration(6)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.ending]}>
          <Text>
            En adelante...
          </Text>
        </View>
      </View>
      <View style={{ zIndex: 4 }}>
        {(activeStage === 1) ? <View style={[timeCurve.activeLarge, timeCurve.active_1]} /> : null}
        {(activeStage === 2) ? <View style={[timeCurve.active, timeCurve.active_2]} /> : null}
        {(activeStage === 3) ? <View style={[timeCurve.active, timeCurve.active_3]} /> : null}
        {(activeStage === 4) ? <View style={[timeCurve.active, timeCurve.active_4]} /> : null}
        {(activeStage === 5) ? <View style={[timeCurve.active, timeCurve.active_5]} /> : null}
        {(activeStage === 6) ? <View style={[timeCurve.active, timeCurve.active_6]} /> : null}
        {(activeStage === 7) ? <View style={[timeCurve.activeLast, timeCurve.active_7]} /> : null}

      </View>
    </View>
  );
}

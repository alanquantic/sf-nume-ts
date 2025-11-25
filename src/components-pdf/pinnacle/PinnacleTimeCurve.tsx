import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import bgTimeCurve from '../assets/curvaPerson.png';

export const timeCurve = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '531px',
    left: '9px',
    width: '535px',
    fontSize: '8px',
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
    width: '155px',
    top: '76px',
    left: '18px',
  },
  s1_duration_d: {
    width: '155px',
    top: '86px',
    left: '18px',
  },
  s2_duration: {
    width: '51px',
    top: '55px',
    left: '175px',
  },
  s2_duration_d: {
    width: '51px',
    top: '65px',
    left: '175px',
  },
  s3_duration: {
    width: '51px',
    top: '33px',
    left: '232px',
  },
  s3_duration_d: {
    width: '51px',
    top: '43px',
    left: '232px',
  },
  s4_duration: {
    width: '51px',
    top: '15px',
    left: '287px',
  },
  s4_duration_d: {
    width: '51px',
    top: '26px',
    left: '287px',
  },
  s5_duration: {
    width: '51px',
    top: '34px',
    left: '341px',
  },
  s5_duration_d: {
    width: '51px',
    top: '44px',
    left: '341px',
  },
  s6_duration: {
    width: '51px',
    top: '55px',
    left: '397px',
  },
  s6_duration_d: {
    width: '51px',
    top: '65px',
    left: '397px',
  },
  s7_duration: {
    width: '51px',
    top: '79px',
    left: '460px',
  },
  s7_duration_d: {
    width: '51px',
    top: '89px',
    left: '460px',
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
  },
  s2_begining: {
    top: '142px',
    left: '165px',
  },
  s3_begining: {
    top: '142px',
    left: '222px',
  },
  s4_begining: {
    top: '142px',
    left: '277px',
  },
  s5_begining: {
    top: '142px',
    left: '331px',
  },
  s6_begining: {
    top: '142px',
    left: '387px',
  },
  s7_begining: {
    top: '142px',
    left: '450px',
  },
  ending: {
    top: '142px',
    left: '480px',
  },
  s1_retorn: {

    top: '125px', // +14
    left: '82px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s2_retorn: {

    top: '107px',
    left: '194px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s3_retorn: {

    top: '78px',
    left: '248px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s4_retorn: {

    top: '62px',
    left: '306px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s5_retorn: {

    top: '78px',
    left: '354px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s6_retorn: {
    top: '107px',
    left: '411px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s7_retorn: {
    top: '125px',
    left: '470px',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    width: '50px',
    height: '122px',
    backgroundColor: '#7E7E7E',
  },
  activeLarge: {
    width: '157px',
    height: '122px',
    backgroundColor: '#7E7E7E',
  },
  activeLast: {
    width: '70px',
    height: '122px',
    backgroundColor: '#7E7E7E',
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

export default function PinnacleTimeCurve({ consultant }: { consultant: Person }) {
  const { calculationDate } = useConsult();
  const activeStage = consultant.getLifeStageNumber(calculationDate);
  const dobleStage = consultant.hasDoubleStage();
  const activeSecondStage = consultant.getDoubleLifeStageNumber(calculationDate);
  return (
    <View style={timeCurve.container}>
      <View style={{ position: 'absolute', top: 0, zIndex: 3 }}>
        <Image src={bgTimeCurve} style={{ position: 'absolute', top: -8, width: '535px' }} />
      </View>
      <View style={[timeCurve.wrap, { zIndex: 2 }]}>
        <View style={[timeCurve.item, timeCurve.s1_duration]}>
          <Text>
            Del nacimiento a los
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth()}
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s1_duration_d]}>
            <Text>
              Del nacimiento a los
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth()}
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s2_duration]}>
          <Text>
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth()}
            {' '}
            -
            {' '}
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 9}
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s2_duration_d]}>
            <Text>
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth()}
              {' '}
              -
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 9 }
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s3_duration]}>
          <Text>
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 9}
            {' '}
            -
            {' '}
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 18}
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s3_duration_d]}>
            <Text>
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 9}
              {' '}
              -
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 18 }
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s4_duration]}>
          <Text>
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 18}
            {' '}
            -
            {' '}
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 27}
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s4_duration_d]}>
            <Text>
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 18}
              {' '}
              -
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 27 }
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s5_duration]}>
          <Text>
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 27}
            {' '}
            -
            {' '}
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 36}
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s5_duration_d]}>
            <Text>
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 27}
              {' '}
              -
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 36 }
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s6_duration]}>
          <Text>
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 36}
            {' '}
            -
            {' '}
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 45}
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s6_duration_d]}>
            <Text>
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 36}
              {' '}
              -
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 45 }
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s7_duration]}>
          <Text>
            {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 45}
            {' '}
            - ...
          </Text>
        </View>
        {dobleStage ? (
          <View style={[timeCurve.item, timeCurve.s7_duration_d]}>
            <Text>
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 45}
              {' '}
              - ...
              {' '}
            </Text>
          </View>
        ) : null}
        <View style={[timeCurve.item, timeCurve.s1_retorn]}>
          <Text>{consultant.getK()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s2_retorn]}>
          <Text>{consultant.getL()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s3_retorn]}>
          <Text>{consultant.getM()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s4_retorn]}>
          <Text>{consultant.getN()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s5_retorn]}>
          <Text>{consultant.getM()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s6_retorn]}>
          <Text>{consultant.getL()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s7_retorn]}>
          <Text>{consultant.getK()}</Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s1_vibration]}>
          <Text>
            {consultant.calcLifeStage(1)}
            {consultant.calcLifeStageISK(1)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s2_vibration]}>
          <Text>
            {consultant.calcLifeStage(2)}
            {consultant.calcLifeStageISK(2)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s3_vibration]}>
          <Text>
            {consultant.calcLifeStage(3)}
            {consultant.calcLifeStageISK(3)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s4_vibration]}>
          <Text>
            {consultant.calcLifeStage(4)}
            {consultant.calcLifeStageISK(4)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s5_vibration]}>
          <Text>
            {consultant.calcLifeStage(3)}
            {consultant.calcLifeStageISK(3)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s6_vibration]}>
          <Text>
            {consultant.calcLifeStage(2)}
            {consultant.calcLifeStageISK(2)}
          </Text>
        </View>
        <View style={[timeCurve.circle, timeCurve.s7_vibration]}>
          <Text>
            {consultant.calcLifeStage(1)}
            {consultant.calcLifeStageISK(1)}
          </Text>
        </View>

        <View style={[timeCurve.item, timeCurve.s1_begining]}>
          <Text>{consultant.getYearTimeCurve()}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s2_begining]}>
          <Text>{consultant.calcLifeStageDuration(1)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s3_begining]}>
          <Text>{consultant.calcLifeStageDuration(2)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s4_begining]}>
          <Text>{consultant.calcLifeStageDuration(3)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s5_begining]}>
          <Text>{consultant.calcLifeStageDuration(4)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s6_begining]}>
          <Text>{consultant.calcLifeStageDuration(5)}</Text>
        </View>
        <View style={[timeCurve.item, timeCurve.s7_begining]}>
          <Text>{consultant.calcLifeStageDuration(6)}</Text>
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
        {(activeSecondStage === 1) ? <View style={[timeCurve.activeLarge, timeCurve.active_1]} /> : null}
        {(activeSecondStage === 2) ? <View style={[timeCurve.active, timeCurve.active_2]} /> : null}
        {(activeSecondStage === 3) ? <View style={[timeCurve.active, timeCurve.active_3]} /> : null}
        {(activeSecondStage === 4) ? <View style={[timeCurve.active, timeCurve.active_4]} /> : null}
        {(activeSecondStage === 5) ? <View style={[timeCurve.active, timeCurve.active_5]} /> : null}
        {(activeSecondStage === 6) ? <View style={[timeCurve.active, timeCurve.active_6]} /> : null}
        {(activeSecondStage === 7) ? <View style={[timeCurve.activeLast, timeCurve.active_7]} /> : null}

      </View>
    </View>
  );
}

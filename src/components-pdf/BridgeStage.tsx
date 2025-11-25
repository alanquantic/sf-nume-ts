import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import { getResBridge } from '../utils/numbers';
import bgTimeCurve from './assets/bridge.png';

export const pinnacleStage = StyleSheet.create({
  container: {
    // backgroundColor: '#ff000012',
    position: 'absolute',
    top: '76px',
    width: '105px',
    left: '306px',
    fontSize: '10px',
  },
  wrap: {
    position: 'relative',
  },
  bridge_1: {
    // backgroundColor: 'blue',
    top: '0px',
    left: '2px',
    width: '105px',
    height: '112px',
    position: 'relative',
  },
  bridge_2: {
    // backgroundColor: '#ff000012',
    top: '-2px',
    left: '2px',
    width: '105px',
    height: '112px',
    position: 'relative',
  },
  bridge_3: {
    // backgroundColor: 'blue',
    top: '-5px',
    left: '2px',
    width: '105px',
    height: '112px',
    position: 'relative',
  },
  bridge_4: {
    // backgroundColor: 'green',
    top: '-10px',
    left: '2px',
    width: '105px',
    height: '112px',
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  bridgeTop: {
    top: '20.5px',
    left: '42.5px',
  },
  bridgeLeft: {
    top: '43px',
    left: '20.5px',
  },
  bridgeCenter: {
    top: '43px',
    left: '42.5px',
  },
  bridgeRight: {
    top: '43px',
    left: '64.5px',
  },
  bridgeBottom: {
    top: '65px',
    left: '42.5px',
  },
  returnStart: {
    top: '100px',
    left: '5px',
    fontSize: '7px',
    position: 'absolute',
  },
  returnEnd: {
    top: '100px',
    right: '5px',
    fontSize: '7px',
    position: 'absolute',
  },
  active: {
    width: '103px',
    height: '110px',
    backgroundColor: '#CDCDCD',
  },
  active_1: {
    position: 'absolute',
    top: '0px',
    left: '2px',
  },
  active_2: {
    position: 'absolute',
    top: '110px',
    left: '2px',
  },
  active_3: {
    position: 'absolute',
    top: '220px',
    left: '2px',
  },
  active_4: {
    position: 'absolute',
    top: '328px',
    left: '2px',
  },
});

export default function BridgeStage({ consultant }: { consultant: Person }) {
  const { calculationDate } = useConsult();
  const activeStage = consultant.getLifeStageNumber(calculationDate);
  return (
    <View style={pinnacleStage.container}>
      <View style={{ zIndex: 4 }}>
        {(activeStage === 1 || activeStage === 7) ? <View style={[pinnacleStage.active, pinnacleStage.active_1]} /> : null}
        {(activeStage === 2 || activeStage === 6) ? <View style={[pinnacleStage.active, pinnacleStage.active_2]} /> : null}
        {(activeStage === 3 || activeStage === 5) ? <View style={[pinnacleStage.active, pinnacleStage.active_3]} /> : null}
        {(activeStage === 4) ? <View style={[pinnacleStage.active, pinnacleStage.active_4]} /> : null}
      </View>
      <View style={{ position: 'absolute', top: 0, zIndex: 3 }}>
        <Image src={bgTimeCurve} style={{ position: 'absolute', top: -20, width: '105px' }} />
      </View>
      <View style={[pinnacleStage.wrap, { zIndex: 2 }]}>
        <View style={[pinnacleStage.bridge_1]}>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeTop]}>
            <Text>
              {consultant.getE()}
              {consultant.getEISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeLeft]}>
            <Text>
              {consultant.getA()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeCenter]}>
            <Text>
              {getResBridge(consultant.getE(), consultant.getK())}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeRight]}>
            <Text>
              {consultant.getB()}
              {consultant.getBISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeBottom]}>
            <Text>
              {consultant.getK()}
            </Text>
          </View>
          <View style={pinnacleStage.returnStart}>
            <Text>
              0 -
              {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
          <View style={pinnacleStage.returnEnd}>
            <Text>
              {consultant.calcLifeStageDuration(6) - consultant.getYearOfBirth()}
              {' '}
              -
              {' '}
              {consultant.calcLifeStageDuration(7) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
        </View>
        <View style={[pinnacleStage.bridge_2]}>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeTop]}>
            <Text>
              {consultant.getF()}
              {consultant.getFISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeLeft]}>
            <Text>
              {consultant.getB()}
              {consultant.getBISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeCenter]}>
            <Text>
              {getResBridge(consultant.getF(), consultant.getL())}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeRight]}>
            <Text>
              {consultant.getC()}
              {consultant.getCISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeBottom]}>
            <Text>
              {consultant.getL()}
            </Text>
          </View>
          <View style={pinnacleStage.returnStart}>
            <Text>
              {consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() }
              {' '}
              -
              {' '}
              {consultant.calcLifeStageDuration(2) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
          <View style={pinnacleStage.returnEnd}>
            <Text>
              {consultant.calcLifeStageDuration(5) - consultant.getYearOfBirth()}
              {' '}
              -
              {' '}
              {consultant.calcLifeStageDuration(6) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
        </View>
        <View style={[pinnacleStage.bridge_3]}>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeTop]}>
            <Text>
              {consultant.getG()}
              {consultant.getGISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeLeft]}>
            <Text>
              {consultant.getE()}
              {consultant.getEISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeCenter]}>
            <Text>
              {getResBridge(consultant.getG(), consultant.getM())}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeRight]}>
            <Text>
              {consultant.getF()}
              {consultant.getFISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeBottom]}>
            <Text>
              {consultant.getM()}
            </Text>
          </View>
          <View style={pinnacleStage.returnStart}>
            <Text>
              {consultant.calcLifeStageDuration(2) - consultant.getYearOfBirth() }
              {' '}
              -
              {' '}
              {consultant.calcLifeStageDuration(3) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
          <View style={pinnacleStage.returnEnd}>
            <Text>
              {consultant.calcLifeStageDuration(4) - consultant.getYearOfBirth()}
              {' '}
              -
              {' '}
              {consultant.calcLifeStageDuration(5) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
        </View>
        <View style={[pinnacleStage.bridge_4]}>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeTop]}>
            <Text>
              {consultant.getH()}
              {consultant.getHISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeLeft]}>
            <Text>
              {consultant.getA()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeCenter]}>
            <Text>
              {getResBridge(consultant.getH(), consultant.getN())}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeRight]}>
            <Text>
              {consultant.getC()}
              {consultant.getCISK()}
            </Text>
          </View>
          <View style={[pinnacleStage.circle, pinnacleStage.bridgeBottom]}>
            <Text>
              {consultant.getN()}
            </Text>
          </View>
          <View style={pinnacleStage.returnStart}>
            <Text>
              {consultant.calcLifeStageDuration(3) - consultant.getYearOfBirth() }
              {' '}
              -
              {' '}
              {consultant.calcLifeStageDuration(4) - consultant.getYearOfBirth()}
              {' '}
              años
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
}

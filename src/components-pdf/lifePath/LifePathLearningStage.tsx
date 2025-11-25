import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const lifePath = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '186px',
    left: '11px',
    fontSize: '7px',
    width: '533px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
  },
  lifeStage: {
    position: 'absolute',
    left: '171px',
    width: '323px',
    top: '22px',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lifeStageItem: {
    width: '30px',
    height: '30px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
  },
  active: {
    backgroundColor: '#C2DEB8',
    width: '30px',
    height: '30px',
    borderRadius: 40,
  },
});

export default function LifePathLearningStage({ consultant, now }: { consultant: Person, now: SplittedDate }) {
  const activeStage = consultant.getLifeStageNumber(now);
  return (
    <View style={lifePath.container}>
      <View style={lifePath.wrap}>
        <View style={lifePath.lifeStage}>
          {(activeStage === 1) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(1)}
                {consultant.calcLifeStageISK(1)}
              </Text>
            </View>
          ) : (
            <View style={[lifePath.lifeStageItem]}>
              <Text>
                {consultant.calcLifeStage(1)}
                {consultant.calcLifeStageISK(1)}
              </Text>
            </View>
          )}
          {(activeStage === 2) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(2)}
                {consultant.calcLifeStageISK(2)}
              </Text>
            </View>
          ) : (
            <View style={lifePath.lifeStageItem}>
              <Text>
                {consultant.calcLifeStage(2)}
                {consultant.calcLifeStageISK(2)}
              </Text>
            </View>
          )}
          {(activeStage === 3) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(3)}
                {consultant.calcLifeStageISK(3)}
              </Text>
            </View>
          ) : (
            <View style={[lifePath.lifeStageItem]}>
              <Text>
                {consultant.calcLifeStage(3)}
                {consultant.calcLifeStageISK(3)}
              </Text>
            </View>
          )}
          {(activeStage === 4) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(4)}
                {consultant.calcLifeStageISK(4)}
              </Text>
            </View>
          ) : (
            <View style={lifePath.lifeStageItem}>
              <Text>
                {consultant.calcLifeStage(4)}
                {consultant.calcLifeStageISK(4)}
              </Text>
            </View>
          )}
          {(activeStage === 5) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(3)}
                {consultant.calcLifeStageISK(3)}
              </Text>
            </View>
          ) : (
            <View style={[lifePath.lifeStageItem]}>
              <Text>
                {consultant.calcLifeStage(3)}
                {consultant.calcLifeStageISK(3)}
              </Text>
            </View>
          )}
          {(activeStage === 6) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(2)}
                {consultant.calcLifeStageISK(2)}
              </Text>
            </View>
          ) : (
            <View style={[lifePath.lifeStageItem]}>
              <Text>
                {consultant.calcLifeStage(2)}
                {consultant.calcLifeStageISK(2)}
              </Text>
            </View>
          )}
          {(activeStage === 7) ? (
            <View style={[lifePath.lifeStageItem, lifePath.active]}>
              <Text>
                {consultant.calcLifeStage(1)}
                {consultant.calcLifeStageISK(1)}
              </Text>
            </View>
          ) : (
            <View style={[lifePath.lifeStageItem]}>
              <Text>
                {consultant.calcLifeStage(1)}
                {consultant.calcLifeStageISK(1)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

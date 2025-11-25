import Person, { SplittedDate } from '@/resources/Person';
import { getResHierarchy, getSumHierarchy } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const lifePathDialogs = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '576px',
    left: '11px',
    fontSize: '7px',
    width: '531px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
  },
  item: {
    position: 'absolute',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    fontSize: '11px',
  },
  top: {
    top: '25px',
    left: '37px',
  },
  left: {
    top: '46px',
    left: '14px',
  },
  right: {
    top: '46px',
    left: '58px',
  },
  bottom: {
    top: '70px',
    left: '37px',
  },
  wrap_2: {
    left: '104px',
  },
  wrap_3: {
    left: '218px',
  },
  wrap_4: {
    left: '317px',
  },
  wrap_5: {
    left: '423px',
  },
});

export default function LifePathDialogs({ consultant, now }: { consultant: Person, now: SplittedDate }) {
  return (
    <View style={lifePathDialogs.container}>
      <View style={[lifePathDialogs.wrap]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(consultant.getB(), consultant.getLifeStage(now.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{consultant.getB()}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{consultant.getLifeStage(now.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(consultant.getB(), consultant.getLifeStage(now.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_2]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(consultant.getLifeStage(now.year), consultant.calcPersonalYear(now.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{consultant.getLifeStage(now.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{consultant.calcPersonalYear(now.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(consultant.getLifeStage(now.year), consultant.calcPersonalYear(now.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_3]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(consultant.calcPersonalYear(now.year), consultant.calcCurrentQuarter(now.month, now.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{consultant.calcPersonalYear(now.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{consultant.calcCurrentQuarter(now.month, now.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(consultant.calcPersonalYear(now.year), consultant.calcCurrentQuarter(now.month, now.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_4]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(consultant.calcCurrentQuarter(now.month, now.year), consultant.calcPersonalMonth(now))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{consultant.calcCurrentQuarter(now.month, now.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{consultant.calcPersonalMonth(now)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(consultant.calcCurrentQuarter(now.month, now.year), consultant.calcPersonalMonth(now))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_5]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(consultant.calcPersonalMonth(now), Number(consultant.calcPersonalWeek(now)))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{consultant.calcPersonalMonth(now)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{consultant.calcPersonalWeek(now)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(consultant.calcPersonalMonth(now), Number(consultant.calcPersonalWeek(now)))}</Text>
        </View>
      </View>
    </View>
  );
}

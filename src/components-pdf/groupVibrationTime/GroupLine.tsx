import Group, { SplittedDate } from '@/resources/Group';
import { getResHierarchy, getSumHierarchy } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const lifePathDialogs = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '515px',
    left: '11px',
    fontSize: '7px',
    width: '531px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
    backgroundColor: 'red',
    width: 106,
  },
  item: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    fontSize: '11px',
  },
  top: {
    top: '25px',
    left: '43px',
  },
  left: {
    top: '46px',
    left: '20px',
  },
  right: {
    top: '46px',
    left: '65px',
  },
  bottom: {
    top: '70px',
    left: '43px',
  },
  wrap_2: {
    left: '106px',
  },
  wrap_3: {
    left: '212px',
  },
  wrap_4: {
    left: '318px',
  },
  wrap_5: {
    left: '424px',
  },
});

export default function GroupLine({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  return (
    <View style={lifePathDialogs.container}>
      <View style={[lifePathDialogs.wrap]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(groupConsult.getB(), groupConsult.getLifeStage(date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{groupConsult.getB()}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{groupConsult.getLifeStage(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(groupConsult.getB(), groupConsult.getLifeStage(date.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_2]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(groupConsult.getLifeStage(date.year), groupConsult.calcPersonalYear(date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{groupConsult.getLifeStage(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{groupConsult.calcPersonalYear(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(groupConsult.getLifeStage(date.year), groupConsult.calcPersonalYear(date.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_3]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(groupConsult.calcPersonalYear(date.year), groupConsult.calcCurrentQuarter(date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{groupConsult.calcPersonalYear(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{groupConsult.calcCurrentQuarter(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(groupConsult.calcPersonalYear(date.year), groupConsult.calcCurrentQuarter(date.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_4]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(groupConsult.calcCurrentQuarter(date.year), groupConsult.calcPersonalMonth(date))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{groupConsult.calcCurrentQuarter(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{groupConsult.calcPersonalMonth(date)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(groupConsult.calcCurrentQuarter(date.year), groupConsult.calcPersonalMonth(date))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_5]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(groupConsult.calcPersonalMonth(date), groupConsult.calcPersonalWeek(date.year, date.month, date.day))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{groupConsult.calcPersonalMonth(date)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{groupConsult.calcPersonalWeek(date.day, date.month, date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(groupConsult.calcPersonalMonth(date), groupConsult.calcPersonalWeek(date.day, date.month, date.year))}</Text>
        </View>
      </View>
    </View>
  );
}

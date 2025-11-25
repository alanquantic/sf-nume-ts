import Synastry, { SplittedDate } from '@/resources/Synastry';
import { getResHierarchy, getSumHierarchy } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const lifePathDialogs = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '337px',
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

export default function SynastryLine({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  return (
    <View style={lifePathDialogs.container}>
      <View style={[lifePathDialogs.wrap]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(synastry.getB(), synastry.getLifeStage(date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.getB()}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.getLifeStage(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(synastry.getB(), synastry.getLifeStage(date.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_2]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(synastry.getLifeStage(date.year), synastry.calcPersonalYear(date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.getLifeStage(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcPersonalYear(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(synastry.getLifeStage(date.year), synastry.calcPersonalYear(date.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_3]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(synastry.calcPersonalYear(date.year), synastry.calcCurrentQuarter(date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.calcPersonalYear(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcCurrentQuarter(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(synastry.calcPersonalYear(date.year), synastry.calcCurrentQuarter(date.year))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_4]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(synastry.calcCurrentQuarter(date.year), synastry.calcPersonalMonth(date))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.calcCurrentQuarter(date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcPersonalMonth(date)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(synastry.calcCurrentQuarter(date.year), synastry.calcPersonalMonth(date))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_5]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{getSumHierarchy(synastry.calcPersonalMonth(date), synastry.calcPersonalWeek(date.day, date.month, date.year))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.calcPersonalMonth(date)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcPersonalWeek(date.day, date.month, date.year)}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{getResHierarchy(synastry.calcPersonalMonth(date), synastry.calcPersonalWeek(date.day, date.month, date.year))}</Text>
        </View>
      </View>
    </View>
  );
}

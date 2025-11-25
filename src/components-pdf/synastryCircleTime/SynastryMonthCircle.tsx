import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import {
  StyleSheet,
  Text, View,
} from '@react-pdf/renderer';

export const synastryCircle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  wrap: {
    position: 'relative',
  },
  body: {
    width: '250px',
    top: '495px',
    left: '100px',
  },
  font: {
    fontSize: '14px',
    position: 'absolute',
  },
  fontName: {
    transform: 'rotate(78)',
    color: '#fff',
    top: 120,
    left: 70,
    fontWeight: 700,
  },
});

export default function SynastryMonthCircle({ synastry, date, universalCalcs }: { synastry: Synastry, date: SplittedDate, universalCalcs: Universal }) {
  const currentMonth = date.month;
  const months = getAllMonths();
  const nameOfMonth = months[currentMonth - 1];
  return (
    <View style={synastryCircle.container}>
      <View style={[synastryCircle.body, synastryCircle.wrap]}>
        <Text style={[synastryCircle.font, { top: 50, left: 180 }]}>
          {synastry.calcSelectPersonalWeek(4, date)}
          {synastry.calcSelectPersonalWeekISK(4, date)}
        </Text>
        <Text style={[synastryCircle.font, { top: 75, left: 190 }]}>
          {synastry.calcSelectPersonalWeek(3, date)}
          {synastry.calcSelectPersonalWeekISK(3, date)}
        </Text>
        <Text style={[synastryCircle.font, { top: 105, left: 195 }]}>
          {synastry.calcSelectPersonalWeek(2, date)}
          {synastry.calcSelectPersonalWeekISK(2, date)}
        </Text>
        <Text style={[synastryCircle.font, { top: 135, left: 200 }]}>
          {synastry.calcSelectPersonalWeek(1, date)}
          {synastry.calcSelectPersonalWeekISK(1, date)}
        </Text>
        <Text style={[synastryCircle.font, { top: 110, left: 110 }]}>
          {synastry.calcPersonalMonth(date)}
          {synastry.calcPersonalMonthISK(date)}
          {' '}
          /
          {universalCalcs.calcUniversalMonth(date)}
          {universalCalcs.calcUniversalMonthISK(date)}
        </Text>
        <Text style={[synastryCircle.font, { top: 135, left: 50 }]}>{synastry.getQuarterMonth(currentMonth, date.year)}</Text>
        <Text style={[synastryCircle.font, synastryCircle.fontName]}>{nameOfMonth.toUpperCase().substr(0, 3)}</Text>
      </View>
    </View>
  );
}

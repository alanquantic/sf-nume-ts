import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import {
  StyleSheet,
  Text, View,
} from '@react-pdf/renderer';

export const groupCircle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  wrap: {
    position: 'relative',
  },
  body: {
    width: '250px',
    top: '350px',
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

export default function GroupMonthCircle({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  const currentMonth = date.month;
  const months = getAllMonths();
  const nameOfMonth = months[currentMonth - 1];
  return (
    <View style={groupCircle.container}>
      <View style={[groupCircle.body, groupCircle.wrap]}>
        <Text style={[groupCircle.font, { top: 50, left: 180 }]}>
          {groupConsult.calcSelectPersonalWeek(4, date)}
          {groupConsult.calcSelectPersonalWeekISK(4, date)}
        </Text>
        <Text style={[groupCircle.font, { top: 75, left: 190 }]}>
          {groupConsult.calcSelectPersonalWeek(3, date)}
          {groupConsult.calcSelectPersonalWeekISK(3, date)}
        </Text>
        <Text style={[groupCircle.font, { top: 105, left: 195 }]}>
          {groupConsult.calcSelectPersonalWeek(2, date)}
          {groupConsult.calcSelectPersonalWeekISK(2, date)}
        </Text>
        <Text style={[groupCircle.font, { top: 135, left: 200 }]}>
          {groupConsult.calcSelectPersonalWeek(1, date)}
          {groupConsult.calcSelectPersonalWeekISK(1, date)}
        </Text>
        <Text style={[groupCircle.font, { top: 110, left: 110 }]}>
          {groupConsult.calcPersonalMonth(date)}
          {groupConsult.calcPersonalMonthISK(date)}
          {' '}
          /
          {universalCalcs.calcUniversalMonth(date)}
          {universalCalcs.calcUniversalMonthISK(date)}
        </Text>
        <Text style={[groupCircle.font, { top: 135, left: 50 }]}>{groupConsult.getQuarterMonth(currentMonth, date.year)}</Text>
        <Text style={[groupCircle.font, groupCircle.fontName]}>{nameOfMonth.toUpperCase().substr(0, 3)}</Text>
      </View>
    </View>
  );
}

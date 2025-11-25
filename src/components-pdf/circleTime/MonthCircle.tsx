import Person, { SplittedDate } from '@/resources/Person';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import {
  StyleSheet,
  Text, View,
} from '@react-pdf/renderer';

export const circle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  wrap: {
    position: 'relative',
  },
  body: {
    width: '250px',
    top: '470px',
    left: '100px',
  },
  font: {
    fontSize: '14px',
    position: 'absolute',
  },
  fontName: {
    transform: 'rotate(78)',
    color: '#fff',
    top: 95,
    left: 70,
    fontWeight: 700,
  },
});

export default function MonthCircle({ consultant, date, universalCalcs }: { consultant: Person, date: SplittedDate, universalCalcs: Universal }) {
  const currentMonth = date.month;
  const months = getAllMonths();
  const nameOfMonth = months[currentMonth - 1];
  return (
    <View style={circle.container}>
      <View style={[circle.body, circle.wrap]}>
        <Text style={[circle.font, { top: 25, left: 180 }]}>
          {consultant.calcSelectPersonalWeek(4, date)}
          {consultant.calcSelectPersonalWeekISK(4, date)}
        </Text>
        <Text style={[circle.font, { top: 50, left: 190 }]}>
          {consultant.calcSelectPersonalWeek(3, date)}
          {consultant.calcSelectPersonalWeekISK(3, date)}
        </Text>
        <Text style={[circle.font, { top: 80, left: 195 }]}>
          {consultant.calcSelectPersonalWeek(2, date)}
          {consultant.calcSelectPersonalWeekISK(2, date)}
        </Text>
        <Text style={[circle.font, { top: 110, left: 200 }]}>
          {consultant.calcSelectPersonalWeek(1, date)}
          {consultant.calcSelectPersonalWeekISK(1, date)}
        </Text>
        <Text style={[circle.font, { top: 85, left: 110 }]}>
          {consultant.calcPersonalMonth(date)}
          {consultant.calcPersonalMonthISK(date)}
          {' '}
          /
          {universalCalcs.calcUniversalMonth(date)}
          {universalCalcs.calcUniversalMonthISK(date)}
        </Text>
        <Text style={[circle.font, { top: 110, left: 50 }]}>{consultant.getQuarterMonth(currentMonth, date.year)}</Text>
        <Text style={[circle.font, circle.fontName]}>{nameOfMonth.toUpperCase().substr(0, 3)}</Text>
      </View>
    </View>
  );
}

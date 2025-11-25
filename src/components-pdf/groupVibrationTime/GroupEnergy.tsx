import Group, { SplittedDate } from '@/resources/Group';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const energy = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '260px',
    left: '15px',
    width: '356px',
  },
  text: {
    position: 'absolute',
    fontSize: '12px',
  },
});

export default function GroupEnergy({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  const currentYear = date.year;
  const currentMonth = date.month;
  const currentDay = date.day;

  return (
    <View style={energy.container}>
      <View>
        <Text style={[energy.text, { top: 30, left: 30 }]}>
          {groupConsult.getLifeStage(currentYear)}
          {groupConsult.getLifeStageISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 35, left: 85 }]}>
          {groupConsult.calcPersonalYear(currentYear)}
          {groupConsult.calcPersonalYearISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 40, left: 140 }]}>
          {groupConsult.calcCurrentQuarter(date.year)}
          {groupConsult.calcCurrentQuarterISK(date.year)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 50, left: 200 }]}>
          {groupConsult.calcPersonalMonth(date)}
          {groupConsult.calcPersonalMonthISK(date)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 65, left: 255 }]}>
          {groupConsult.calcPersonalWeek(currentYear, currentMonth, currentDay)}
          {groupConsult.calcPersonalWeekISK(currentYear, currentMonth, currentDay)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 75, left: 320 }]}>
          {groupConsult.calcPersonalDay(date)}
          {groupConsult.calcPersonalDayISK(date)}
        </Text>
      </View>

    </View>
  );
}

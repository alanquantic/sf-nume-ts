import Synastry, { SplittedDate } from '@/resources/Synastry';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const energy = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '150px',
    left: '15px',
    width: '356px',
  },
  text: {
    position: 'absolute',
    fontSize: '12px',
  },
});

export default function SynastryEnergy({ synastry, date }: { synastry: Synastry, date: SplittedDate }) {
  const currentYear = date.year;
  const currentMonth = date.month;
  const currentDay = date.day;

  return (
    <View style={energy.container}>
      <View>
        <Text style={[energy.text, { top: 30, left: 30 }]}>
          {synastry.getLifeStage(currentYear)}
          {synastry.getLifeStageISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 35, left: 85 }]}>
          {synastry.calcPersonalYear(currentYear)}
          {synastry.calcPersonalYearISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 40, left: 140 }]}>
          {synastry.calcCurrentQuarter(currentYear)}
          {synastry.calcCurrentQuarterISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 50, left: 200 }]}>
          {synastry.calcPersonalMonth(date)}
          {synastry.calcPersonalMonthISK(date)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 65, left: 255 }]}>
          {synastry.calcPersonalWeek(currentDay, currentMonth, currentYear)}
          {synastry.calcPersonalWeekISK(currentDay, currentMonth, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 75, left: 320 }]}>
          {synastry.calcPersonalDay(date)}
          {synastry.calcPersonalDayISK(date)}
        </Text>
      </View>

    </View>
  );
}

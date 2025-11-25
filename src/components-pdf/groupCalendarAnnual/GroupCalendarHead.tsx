import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const calendar = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  year: {
    top: '285px',
    left: '100px',
  },
  persYear: {
    width: '30px',
    top: '285px',
    left: '240px',
    fontSize: '12px',
  },
  univYear: {
    width: '30px',
    top: '285px',
    left: '300px',
    fontSize: '12px',
  },
});

export default function GroupCalendarHead({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  return (
    <View style={calendar.container}>

      <View style={calendar.head}><Text style={calendar.year}>{date.year}</Text></View>
      <View style={calendar.head}>
        <Text style={calendar.persYear}>
          {groupConsult.calcPersonalYear(date.year)}
          {groupConsult.calcPersonalYearISK(date.year)}
        </Text>
      </View>
      <View style={calendar.head}>
        <Text style={calendar.univYear}>
          {universalCalcs.calcUniversalYear(date.year)}
          {universalCalcs.calcUniversalYearISK(date.year)}
        </Text>
      </View>

    </View>
  );
}

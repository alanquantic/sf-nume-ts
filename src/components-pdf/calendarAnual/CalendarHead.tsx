import Person, { SplittedDate } from '@/resources/Person';
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
    top: '45px',
    left: '100px',
  },
  persYear: {
    width: '30px',
    top: '45px',
    left: '240px',
    fontSize: '12px',
  },
  univYear: {
    width: '30px',
    top: '45px',
    left: '300px',
    fontSize: '12px',
  },
});

export default function CalendarHead({ consultant, date, universalCalcs }: { consultant: Person, date: SplittedDate, universalCalcs: Universal }) {
  return (
    <View style={calendar.container}>

      <View style={calendar.head}><Text style={calendar.year}>{date.year}</Text></View>
      <View style={calendar.head}>
        <Text style={calendar.persYear}>
          {consultant.calcPersonalYear(date.year)}
          {consultant.calcPersonalYearISK(date.year)}
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

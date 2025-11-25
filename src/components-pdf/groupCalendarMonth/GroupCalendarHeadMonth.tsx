import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const groupCalendarM = StyleSheet.create({
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
    top: '270px',
    left: '100px',
  },
  month: {
    top: '180px',
    left: '50px',
    color: '#000',
  },
  persYear: {
    width: '30px',
    top: '270px',
    left: '250px',
    fontSize: '12px',
  },
  univYear: {
    width: '30px',
    top: '270px',
    left: '310px',
    fontSize: '12px',
  },
});
export default function GroupCalendarHeadMonth({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  return (
    <View style={groupCalendarM.container}>

      <View style={groupCalendarM.head}><Text style={groupCalendarM.year}>{date.year}</Text></View>
      <View style={groupCalendarM.head}>
        <Text style={groupCalendarM.persYear}>
          {groupConsult.calcPersonalYear(date.year)}
          {groupConsult.calcPersonalYearISK(date.year)}
        </Text>
      </View>
      <View style={groupCalendarM.head}>
        <Text style={groupCalendarM.univYear}>
          {universalCalcs.calcUniversalYear(date.year)}
          {universalCalcs.calcUniversalYearISK(date.year)}
        </Text>
      </View>

    </View>
  );
}

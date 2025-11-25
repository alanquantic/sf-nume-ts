import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const synastryCalendarM = StyleSheet.create({
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
    top: '190px',
    left: '100px',
  },
  month: {
    top: '100px',
    left: '50px',
    color: '#000',
  },
  persYear: {
    width: '30px',
    top: '190px',
    left: '240px',
    fontSize: '12px',
  },
  univYear: {
    width: '30px',
    top: '190px',
    left: '300px',
    fontSize: '12px',
  },
});
export default function SynastryCalendarHeadMonth({ synastry, date, universalCalcs }: { synastry: Synastry, date: SplittedDate, universalCalcs: Universal }) {
  return (
    <View style={synastryCalendarM.container}>

      <View style={synastryCalendarM.head}><Text style={synastryCalendarM.year}>{date.year}</Text></View>
      <View style={synastryCalendarM.head}>
        <Text style={synastryCalendarM.persYear}>
          {synastry.calcPersonalYear(date.year)}
          {synastry.calcPersonalYearISK(date.year)}
        </Text>
      </View>
      <View style={synastryCalendarM.head}>
        <Text style={synastryCalendarM.univYear}>
          {universalCalcs.calcUniversalYear(date.year)}
          {universalCalcs.calcUniversalYearISK(date.year)}
        </Text>
      </View>

    </View>
  );
}

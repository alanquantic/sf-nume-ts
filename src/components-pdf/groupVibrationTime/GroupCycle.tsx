/* eslint-disable max-len */
import Group, { SplittedDate } from '@/resources/Group';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const cycle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '378px',
    left: '15px',
    width: '356px',
  },
  cyleMap: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: '8px',
    position: 'absolute',
  },
  number: {
    fontSize: '12px',
    position: 'absolute',
  },
  circle: {
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '25px',
  },
});
export function Cycle({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  const currentYear = date.year;
  const niceCycle = groupConsult.getNineYearCycleStage(currentYear);

  return (
    <>
      {niceCycle.map((year, index) => (
        <View>
          <View style={[cycle.circle, { top: 51, left: 14 + (14 * index), backgroundColor: `${(year === currentYear) ? '#D6C5E9' : ''}` }]}><Text style={[cycle.number]}>{groupConsult.calcPersonalYear(year)}</Text></View>
          <Text style={[cycle.text, { top: 80, left: 14 + (14 * index), color: `${(year === currentYear) ? '#000' : '#7E7E7E'}` }]}>{year}</Text>
        </View>
      ))}
    </>
  );
}
export default function GroupCycle({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  const currentYear = date.year;
  return (
    <View style={cycle.container}>
      <View style={[cycle.cyleMap, { width: '80px' }]}>
        <Text style={[cycle.text, { top: 25, left: 130, width: '50px' }]}>
          Etapa:
          {groupConsult.getLifeStageNumber(date.month, currentYear)}
          :
          {' '}
        </Text>
        <Text style={[cycle.number, { top: 23, left: 173, width: '30px' }]}>
          {groupConsult.getLifeStage(currentYear)}
          {groupConsult.getLifeStageISK(currentYear)}
        </Text>
      </View>
      <View style={cycle.cyleMap}>
        <Cycle groupConsult={groupConsult} date={date} />
      </View>
    </View>
  );
}

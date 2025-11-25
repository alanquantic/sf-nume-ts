import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const lifePath = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '266px',
    left: '11px',
    fontSize: '7px',
    width: '533px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
  },
  personalYears: {
    position: 'absolute',
    left: '173px',
    width: '317px',
    top: '12px',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: '20px',
    height: '20px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    backgroundColor: '#D7BFD5',
    borderRadius: '4px',
  },
  year: {
    width: '20px',
    height: '12px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '8px',
    // backgroundColor: 'red'
  },
  itemWrap: {
    fontSize: '12px',
  },
});

export default function LifePathPersonalYears({ consultant, now }: { consultant: Person, now: SplittedDate }) {
  const newDate = now;
  const newCycle = consultant.getNineYearCycleStage(newDate.year);
  return (
    <View style={lifePath.container}>
      <View style={lifePath.wrap}>
        <View style={lifePath.personalYears}>
          {newCycle.map((cycle) => (
            <View style={lifePath.itemWrap}>
              <View style={[lifePath.item, { backgroundColor: `${cycle === now.year ? '#9F5D9B' : '#D7BFD5'}` }]}>
                <Text>
                  {consultant.calcPersonalYear(cycle)}
                  {consultant.calcPersonalYearISK(cycle)}
                </Text>
              </View>
              <View style={lifePath.year}>
                <Text>{cycle}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { endOfMonth, format } from 'date-fns';
import { capitalize } from 'lodash';

export const lifePath = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '485px',
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
    backgroundColor: '#C3E9EA',
  },
  year: {
    position: 'absolute',
    top: '20px',
    left: '-20px',
    width: '65px',
    height: '12px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '8px',
  },
  itemWrap: {
    fontSize: '12px',
  },
});

export default function LifePathPersonalWeeks({ consultant, now, newDate }: { consultant: Person, now: SplittedDate, newDate: Date }) {
  const listOfMonths = consultant.getCustomMonths();

  // Use month index directly from the date (0-11)
  const currentMonth = newDate.getMonth();
  const currentMonthName = capitalize(listOfMonths[currentMonth]);

  return (
    <View style={lifePath.container}>
      <View style={lifePath.wrap}>
        <View style={lifePath.personalYears}>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${now.day >= 1 && now.day < 8 ? '#52B8C8' : '#C3E9EA'}` }]}>
              <Text>
                {consultant.calcSelectPersonalWeek(1, now)}
                {consultant.calcSelectPersonalWeekISK(1, now)}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                1-7
                {currentMonthName}
              </Text>
            </View>
          </View>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${now.day > 7 && now.day < 15 ? '#52B8C8' : '#C3E9EA'}` }]}>
              <Text>
                {consultant.calcSelectPersonalWeek(2, now)}
                {consultant.calcSelectPersonalWeekISK(2, now)}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                8-14
                {currentMonthName}
              </Text>
            </View>
          </View>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${now.day > 14 && now.day < 22 ? '#52B8C8' : '#C3E9EA'}` }]}>
              <Text>
                {consultant.calcSelectPersonalWeek(3, now)}
                {consultant.calcSelectPersonalWeekISK(3, now)}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                15-21
                {currentMonthName}
              </Text>
            </View>
          </View>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${now.day > 21 ? '#52B8C8' : '#C3E9EA'}` }]}>
              <Text>
                {consultant.calcSelectPersonalWeek(4, now)}
                {consultant.calcSelectPersonalWeekISK(4, now)}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                22-
                {format(endOfMonth(newDate.getMonth()), 'dd')}
                {' '}
                {currentMonthName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

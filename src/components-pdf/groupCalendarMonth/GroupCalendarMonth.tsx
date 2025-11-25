/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const groupCalendarM = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrap: {
    position: 'relative',
  },
  monthContain: {
    top: '378px',
    left: '30px',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: '100px',
    top: '345px',
    left: '100px',
    fontSize: '10px',
    color: '#663366',
    fontWeight: 'bold',
  },
  persMont: {
    width: '20px',
    top: '345px',
    left: '150px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  univMont: {
    width: '20px',
    top: '345px',
    left: '163px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  headQuater: {
    width: '170px',
    top: '345px',
    left: '240px',
    fontSize: '16px',
    color: '#fff',
    fontWeight: 'bold',
  },
  daysWeek: {
    width: '396px',
    top: '393px',
    display: 'flex',
    flexDirection: 'row',
    left: '130px',
    position: 'absolute',
  },
  daysofWeek: {
    width: '57px',
    height: '25px',
    backgroundColor: '#E2E2E2',
    color: '#7E7E7E',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderColor: '#7E7E7E',
  },
  weekContaniner: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    display: 'flex',
    flexDirection: 'column',
  },
  weektext: {
    fontSize: '14px',
    textAlign: 'center',
    color: '#000',
  },
  week: {
    width: '70px',
    height: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysRow: {
    width: '399px',
    display: 'flex',
    flexDirection: 'row',
  },
  daysContainer: {
    width: '399px',
    top: '0px',
    display: 'flex',
    flexDirection: 'column',
    left: '100px',
  },
  example: {
    width: '56.5px',
    height: '40px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: 1,
    borderRightColor: '#7E7E7E',
    borderBottom: 1,
    borderBottomColor: '#7E7E7E',
  },
  days: {
    fontSize: '14px',
    color: '#7E7E7E',
  },
  calcDays: {
    fontSize: '16px',
    color: '#000',
    fontWeight: 'bold',
  },

});

export function DaysOfTheWeek({ month, groupConsult, date }: { month: number, groupConsult: Group, date: SplittedDate }) {
  const daysCustom = groupConsult.getDaysOfWeekCustom(month, date.year);
  return (
    <>
      {daysCustom.map((day) => <View style={groupCalendarM.daysofWeek}><Text>{day[0]}</Text></View>)}
    </>
  );
}
export function MonthsInDay({
  month, groupConsult, date, universalCalcs, sem1, sem2, sem3, sem4,
}: { month: number, groupConsult: Group, date: SplittedDate, universalCalcs: Universal, sem1: boolean, sem2: boolean, sem3: boolean, sem4: boolean }) {
  const mes = groupConsult.getAllDaysInMonth(month, date.year);
  const semOne = mes.slice(0, 7);
  const semTwo = mes.slice(7, 14);
  const semThr = mes.slice(14, 21);
  const semFou = mes.slice(21, 28);
  const semFive = mes.slice(28);

  return (
    <>
      <View style={groupCalendarM.daysRow}>
        {semOne.map((day) => (
          <View style={[groupCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay(date)}
              {groupConsult.calcPersonalDayISK(date)}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarM.daysRow}>
        {semTwo.map((day) => (
          <View style={[groupCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarM.calcDays, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay(date)}
              {groupConsult.calcPersonalDayISK(date)}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarM.daysRow}>
        {semThr.map((day) => (
          <View style={[groupCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay(date)}
              {groupConsult.calcPersonalDayISK(date)}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarM.daysRow}>
        {semFou.map((day) => (
          <View style={[groupCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay(date)}
              {groupConsult.calcPersonalDayISK(date)}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarM.daysRow}>
        {semFive.map((day) => (
          <View style={[groupCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay(date)}
              {groupConsult.calcPersonalDayISK(date)}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

export default function GroupCalendarMonth({
  groupConsult, date, month, universalCalcs,
}: { groupConsult: Group, date: SplittedDate, month: number, universalCalcs: Universal }) {
  let sem1 = false;
  let sem2 = false;
  let sem3 = false;
  let sem4 = false;
  if (date.day >= 1 && date.day <= 7) { sem1 = true; }
  if (date.day >= 8 && date.day <= 14) { sem2 = true; }
  if (date.day >= 15 && date.day <= 21) { sem3 = true; }
  if (date.day >= 22) { sem4 = true; }
  const monthToCalculate = getAllMonths();
  const daysOfMonth = groupConsult.getAllDaysInMonth(month, date.year);

  return (
    <View style={groupCalendarM.container}>
      <View style={groupCalendarM.row}>
        <View style={groupCalendarM.head}><Text style={groupCalendarM.name}>{monthToCalculate[month - 1]}</Text></View>
        <View style={groupCalendarM.head}>
          <Text style={groupCalendarM.persMont}>
            {groupConsult.calcPersonalMonth({ ...date, month })}
            {groupConsult.calcPersonalMonthISK({ ...date, month })}
          </Text>
        </View>
        <View style={groupCalendarM.head}>
          <Text style={groupCalendarM.univMont}>
            {universalCalcs.calcUniversalMonth({ ...date, month })}
            {universalCalcs.calcUniversalMonthISK({ ...date, month })}
          </Text>
        </View>
        <View style={groupCalendarM.head}>
          <Text style={groupCalendarM.headQuater}>
            Cuatrimestre:
            {groupConsult.getQuarterMonth(month, date.year)}
            {groupConsult.getQuarterMonthISK(month, date.year)}
          </Text>
        </View>
      </View>
      <View style={groupCalendarM.daysWeek}>
        <DaysOfTheWeek month={month} groupConsult={groupConsult} date={date} />
      </View>
      <View style={[groupCalendarM.wrap, groupCalendarM.monthContain]}>
        <View style={groupCalendarM.weekContaniner}>
          <View style={[groupCalendarM.week, { backgroundColor: `${(sem1 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[groupCalendarM.weektext, { color: '#7E7E7E' }]}>1a Sem</Text>
            <Text style={[groupCalendarM.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(1, { ...date, month })}
              {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month })}
            </Text>
          </View>
          <View style={[groupCalendarM.week, { backgroundColor: `${(sem2 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[groupCalendarM.weektext, { color: '#7E7E7E' }]}>2a Sem</Text>
            <Text style={[groupCalendarM.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(2, { ...date, month })}
              {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month })}
            </Text>
          </View>
          <View style={[groupCalendarM.week, { backgroundColor: `${(sem3 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[groupCalendarM.weektext, { color: '#7E7E7E' }]}>3a Sem</Text>
            <Text style={[groupCalendarM.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(3, { ...date, month })}
              {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month })}
            </Text>
          </View>
          <View style={[groupCalendarM.week, { backgroundColor: `${(sem4 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[groupCalendarM.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
            <Text style={[groupCalendarM.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(4, { ...date, month })}
              {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month })}
            </Text>
          </View>
          {daysOfMonth.length > 28
            ? (
              <View style={[groupCalendarM.week, { backgroundColor: `${(sem4 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
                <Text style={[groupCalendarM.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
                <Text style={[groupCalendarM.weektext, { fontWeight: 'bold' }]}>
                  {groupConsult.calcSelectPersonalWeek(4, { ...date, month })}
                  {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month })}
                </Text>
              </View>
            ) : ''}

        </View>
        <View style={[groupCalendarM.daysContainer]}>
          <MonthsInDay month={month} groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
        </View>
      </View>
    </View>
  );
}

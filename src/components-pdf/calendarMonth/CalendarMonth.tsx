/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Person, { SplittedDate } from '@/resources/Person';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const calendar = StyleSheet.create({
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
    top: '128px',
    left: '30px',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: '100px',
    top: '95px',
    left: '100px',
    fontSize: '10px',
    color: '#663366',
    fontWeight: 'bold',
  },
  persMont: {
    width: '20px',
    top: '95px',
    left: '150px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  univMont: {
    width: '20px',
    top: '95px',
    left: '163px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  headQuater: {
    width: '170px',
    top: '95px',
    left: '240px',
    fontSize: '16px',
    color: '#fff',
    fontWeight: 'bold',
  },
  daysWeek: {
    width: '396px',
    top: '122px',
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

export function DaysOfTheWeek({ month, consultant, date }: { month: number, consultant: Person, date: SplittedDate }) {
  const daysCustom = consultant.getDaysOfWeekCustom(month, date.year);
  return (
    <>
      {daysCustom.map((day) => <View style={calendar.daysofWeek}><Text>{day[0]}</Text></View>)}
    </>
  );
}
export function MonthsInDay({
  month, consultant, date, universalCalcs, sem1, sem2, sem3, sem4,
}: { month: number, consultant: Person, date: SplittedDate, universalCalcs: Universal, sem1: boolean, sem2: boolean, sem3: boolean, sem4: boolean }) {
  const mes = consultant.getAllDaysInMonth(month, date.year);
  const semOne = mes.slice(0, 7);
  const semTwo = mes.slice(7, 14);
  const semThr = mes.slice(14, 21);
  const semFou = mes.slice(21, 28);
  const semFive = mes.slice(28);

  return (
    <>
      <View style={calendar.daysRow}>
        {semOne.map((day) => (
          <View style={[calendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {consultant.calcPersonalDay({ ...date, day, month })}
              {consultant.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={calendar.daysRow}>
        {semTwo.map((day) => (
          <View style={[calendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>
              {consultant.calcPersonalDay({ ...date, day, month })}
              {consultant.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={calendar.daysRow}>
        {semThr.map((day) => (
          <View style={[calendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {consultant.calcPersonalDay({ ...date, day, month })}
              {consultant.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={calendar.daysRow}>
        {semFou.map((day) => (
          <View style={[calendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {consultant.calcPersonalDay({ ...date, day, month })}
              {consultant.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={calendar.daysRow}>
        {semFive.map((day) => (
          <View style={[calendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {consultant.calcPersonalDay({ ...date, day, month })}
              {consultant.calcPersonalDayISK({ ...date, day, month })}
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

export default function CalendarMonth({
  consultant, date, month, universalCalcs,
}: { consultant: Person, date: SplittedDate, month: number, universalCalcs: Universal }) {
  let sem1 = false;
  let sem2 = false;
  let sem3 = false;
  let sem4 = false;
  if (date.day >= 1 && date.day <= 7) { sem1 = true; }
  if (date.day >= 8 && date.day <= 14) { sem2 = true; }
  if (date.day >= 15 && date.day <= 21) { sem3 = true; }
  if (date.day >= 22) { sem4 = true; }
  const monthToCalculate = getAllMonths();
  const daysOfMonth = consultant.getAllDaysInMonth(month, date.year);

  return (
    <View style={calendar.container}>
      <View style={calendar.row}>
        <View style={calendar.head}><Text style={calendar.name}>{monthToCalculate[month - 1]}</Text></View>
        <View style={calendar.head}>
          <Text style={calendar.persMont}>
            {consultant.calcPersonalMonth({ ...date, month })}
            {consultant.calcPersonalMonthISK({ ...date, month })}
          </Text>
        </View>
        <View style={calendar.head}>
          <Text style={calendar.univMont}>
            {universalCalcs.calcUniversalMonth({ ...date, month })}
            {universalCalcs.calcUniversalMonthISK({ ...date, month })}
          </Text>
        </View>
        <View style={calendar.head}>
          <Text style={calendar.headQuater}>
            Cuatrimestre:
            {consultant.getQuarterMonth(month, date.year)}
            {consultant.getQuarterMonthISK(month, date.year)}
          </Text>
        </View>
      </View>
      <View style={calendar.daysWeek}>
        <DaysOfTheWeek month={month} consultant={consultant} date={date} />
      </View>
      <View style={[calendar.wrap, calendar.monthContain]}>
        <View style={calendar.weekContaniner}>
          <View style={[calendar.week, { backgroundColor: `${(sem1 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(1, { ...date, month })}
              {consultant.calcSelectPersonalWeekISK(1, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month })}
            </Text>
          </View>
          <View style={[calendar.week, { backgroundColor: `${(sem2 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(2, { ...date, month })}
              {consultant.calcSelectPersonalWeekISK(2, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month })}
            </Text>
          </View>
          <View style={[calendar.week, { backgroundColor: `${(sem3 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(3, { ...date, month })}
              {consultant.calcSelectPersonalWeekISK(3, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month })}
            </Text>
          </View>
          <View style={[calendar.week, { backgroundColor: `${(sem4 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(4, { ...date, month })}
              {consultant.calcSelectPersonalWeekISK(4, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month })}
            </Text>
          </View>
          {daysOfMonth.length > 28
            ? (
              <View style={[calendar.week, { backgroundColor: `${(sem4 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
                <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
                <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
                  {consultant.calcSelectPersonalWeek(4, { ...date, month })}
                  {consultant.calcSelectPersonalWeekISK(4, { ...date, month })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month })}
                </Text>
              </View>
            ) : ''}

        </View>
        <View style={[calendar.daysContainer]}>
          <MonthsInDay month={month} consultant={consultant} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
        </View>
      </View>
    </View>
  );
}

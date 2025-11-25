/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const synastryCalendarM = StyleSheet.create({
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
    top: '273px',
    left: '30px',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: '100px',
    top: '240px',
    left: '100px',
    fontSize: '10px',
    color: '#663366',
    fontWeight: 'bold',
  },
  persMont: {
    width: '20px',
    top: '240px',
    left: '150px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  univMont: {
    width: '20px',
    top: '240px',
    left: '163px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  headQuater: {
    width: '170px',
    top: '240px',
    left: '240px',
    fontSize: '16px',
    color: '#fff',
    fontWeight: 'bold',
  },
  daysWeek: {
    width: '396px',
    top: '287px',
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

export function DaysOfTheWeek({ month, synastry, date }: { month: number, synastry: Synastry, date: SplittedDate }) {
  const daysCustom = synastry.getDaysOfWeekCustom(month, date.year);
  return (
    <>
      {daysCustom.map((day) => <View style={synastryCalendarM.daysofWeek}><Text>{day[0]}</Text></View>)}
    </>
  );
}
export function MonthsInDay({
  month, synastry, date, universalCalcs, sem1, sem2, sem3, sem4,
}: { month: number, synastry: Synastry, date: SplittedDate, universalCalcs: Universal, sem1: boolean, sem2: boolean, sem3: boolean, sem4: boolean }) {
  const mes = synastry.getAllDaysInMonth(month, date.year);
  const semOne = mes.slice(0, 7);
  const semTwo = mes.slice(7, 14);
  const semThr = mes.slice(14, 21);
  const semFou = mes.slice(21, 28);
  const semFive = mes.slice(28);

  return (
    <>
      <View style={synastryCalendarM.daysRow}>
        {semOne.map((day) => (
          <View style={[synastryCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarM.daysRow}>
        {semTwo.map((day) => (
          <View style={[synastryCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarM.calcDays, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarM.daysRow}>
        {semThr.map((day) => (
          <View style={[synastryCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarM.daysRow}>
        {semFou.map((day) => (
          <View style={[synastryCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarM.daysRow}>
        {semFive.map((day) => (
          <View style={[synastryCalendarM.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarM.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarM.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
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

export default function SynastryCalendarMonth({
  synastry, date, month, universalCalcs,
}: { synastry: Synastry, date: SplittedDate, month: number, universalCalcs: Universal }) {
  let sem1 = false;
  let sem2 = false;
  let sem3 = false;
  let sem4 = false;
  if (date.day >= 1 && date.day <= 7) { sem1 = true; }
  if (date.day >= 8 && date.day <= 14) { sem2 = true; }
  if (date.day >= 15 && date.day <= 21) { sem3 = true; }
  if (date.day >= 22) { sem4 = true; }
  const monthToCalculate = getAllMonths();
  const daysOfMonth = synastry.getAllDaysInMonth(month, date.year);

  return (
    <View style={synastryCalendarM.container}>
      <View style={synastryCalendarM.row}>
        <View style={synastryCalendarM.head}><Text style={synastryCalendarM.name}>{monthToCalculate[month - 1]}</Text></View>
        <View style={synastryCalendarM.head}>
          <Text style={synastryCalendarM.persMont}>
            {synastry.calcPersonalMonth({ ...date, month })}
            {synastry.calcPersonalMonthISK({ ...date, month })}
          </Text>
        </View>
        <View style={synastryCalendarM.head}>
          <Text style={synastryCalendarM.univMont}>
            {universalCalcs.calcUniversalMonth({ ...date, month })}
            {universalCalcs.calcUniversalMonthISK({ ...date, month })}
          </Text>
        </View>
        <View style={synastryCalendarM.head}>
          <Text style={synastryCalendarM.headQuater}>
            Cuatrimestre:
            {synastry.getQuarterMonth(month, date.year)}
            {synastry.getQuarterMonthISK(month, date.year)}
          </Text>
        </View>
      </View>
      <View style={synastryCalendarM.daysWeek}>
        <DaysOfTheWeek month={month} synastry={synastry} date={date} />
      </View>
      <View style={[synastryCalendarM.wrap, synastryCalendarM.monthContain]}>
        <View style={synastryCalendarM.weekContaniner}>
          <View style={[synastryCalendarM.week, { backgroundColor: `${(sem1 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[synastryCalendarM.weektext, { color: '#7E7E7E' }]}>1a Sem</Text>
            <Text style={[synastryCalendarM.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(1, { ...date, month })}
              {synastry.calcSelectPersonalWeekISK(1, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month })}
            </Text>
          </View>
          <View style={[synastryCalendarM.week, { backgroundColor: `${(sem2 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[synastryCalendarM.weektext, { color: '#7E7E7E' }]}>2a Sem</Text>
            <Text style={[synastryCalendarM.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(2, { ...date, month })}
              {synastry.calcSelectPersonalWeekISK(2, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month })}
            </Text>
          </View>
          <View style={[synastryCalendarM.week, { backgroundColor: `${(sem3 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[synastryCalendarM.weektext, { color: '#7E7E7E' }]}>3a Sem</Text>
            <Text style={[synastryCalendarM.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(3, { ...date, month })}
              {synastry.calcSelectPersonalWeekISK(3, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month })}
            </Text>
          </View>
          <View style={[synastryCalendarM.week, { backgroundColor: `${(sem4 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
            <Text style={[synastryCalendarM.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
            <Text style={[synastryCalendarM.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(4, { ...date, month })}
              {synastry.calcSelectPersonalWeekISK(4, { ...date, month })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month })}
            </Text>
          </View>
          {daysOfMonth.length > 28
            ? (
              <View style={[synastryCalendarM.week, { backgroundColor: `${(sem4 === true && date.month + 1 === month) ? '#DCA8A9' : ''}` }]}>
                <Text style={[synastryCalendarM.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
                <Text style={[synastryCalendarM.weektext, { fontWeight: 'bold' }]}>
                  {synastry.calcSelectPersonalWeek(4, { ...date, month })}
                  {synastry.calcSelectPersonalWeekISK(4, { ...date, month })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month })}
                </Text>
              </View>
            ) : ''}

        </View>
        <View style={[synastryCalendarM.daysContainer]}>
          <MonthsInDay month={month} synastry={synastry} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
        </View>
      </View>
    </View>
  );
}

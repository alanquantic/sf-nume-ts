/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const groupCalendarTwo = StyleSheet.create({
  example: {
    width: '25px',
    height: '17px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
  },
  wrap: {
    position: 'relative',
  },
  wrap1: {
    top: '129px',
    left: '16px',
  },
  wrap2: {
    top: '129px',
    left: '264px',
  },
  wrap3: {
    top: '282px',
    left: '16px',
  },
  wrap4: {
    top: '282px',
    left: '263px',
  },
  wrap5: {
    top: '433px',
    left: '16px',
  },
  wrap6: {
    top: '434px',
    left: '263px',
  },
  wrap7: {
    top: '584px',
    left: '16px',
  },
  wrap8: {
    top: '585px',
    left: '263px',
  },
  head: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week1: {
    width: '33px',
    top: '241px',
    left: '29px',
    position: 'absolute',
  },
  week2: {
    width: '33px',
    top: '258px',
    left: '29px',
    position: 'absolute',
  },
  week3: {
    width: '33px',
    top: '274px',
    left: '29px',
    position: 'absolute',
  },
  week4: {
    width: '33px',
    top: '293px',
    left: '29px',
    position: 'absolute',
  },
  week5: {
    width: '33px',
    top: '310px',
    left: '29px',
    position: 'absolute',
  },
  days: {
    fontSize: '6px',
    color: '#7E7E7E',
  },
  calcDays: {
    fontSize: '7px',
    color: '#000',
    fontWeight: 'bold',
  },
  daysRow: {
    width: '176px',
    display: 'flex',
    flexDirection: 'row',
  },
  daysContainer: {
    width: '175px',
    top: '241px',
    display: 'flex',
    flexDirection: 'column',
    left: '74px',
    position: 'absolute',
  },
  daysWeek: {
    width: '175px',
    top: '231px',
    display: 'flex',
    flexDirection: 'row',
    left: '73px',
    position: 'absolute',
  },
  daysofWeek: {
    width: '25px',
    height: '10px',
    backgroundColor: '#E2E2E2',
    color: '#7E7E7E',
    fontSize: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderColor: '#7E7E7E',
  },
  weektext: {
    fontSize: '7px',
    textAlign: 'center',
    color: '#000',
  },
  headMonth: {
    top: '214px',
    left: '51px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
  headQuater: {
    top: '214px',
    left: '166px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
});
export function DaysOfTheWeek({ month, groupConsult, date }: { month: number, groupConsult: Group, date: SplittedDate }) {
  const daysCustom = groupConsult.getDaysOfWeekCustom(month, date.year);
  return (
    <>
      {daysCustom.map((day) => <View style={groupCalendarTwo.daysofWeek}><Text>{day[0]}</Text></View>)}
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
      <View style={groupCalendarTwo.daysRow}>
        {semOne.map((day) => (
          <View style={[groupCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTwo.daysRow}>
        {semTwo.map((day) => (
          <View style={[groupCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTwo.daysRow}>
        {semThr.map((day) => (
          <View style={[groupCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTwo.daysRow}>
        {semFou.map((day) => (
          <View style={[groupCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTwo.daysRow}>
        {semFive.map((day) => (
          <View style={[groupCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
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

export default function SynastryCalendarMonthsTwo({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  const meses = [
    {
      nombre: 'mayo',
      dias: groupConsult.getAllDaysInMonth(5, date.year),
      style: groupCalendarTwo.wrap1,
    },
    {
      nombre: 'junio',
      dias: groupConsult.getAllDaysInMonth(6, date.year),
      style: groupCalendarTwo.wrap2,
    },
    {
      nombre: 'julio',
      dias: groupConsult.getAllDaysInMonth(7, date.year),
      style: groupCalendarTwo.wrap3,
    },
    {
      nombre: 'agosto',
      dias: groupConsult.getAllDaysInMonth(8, date.year),
      style: groupCalendarTwo.wrap4,
    },
  ];
  let sem1 = false;
  let sem2 = false;
  let sem3 = false;
  let sem4 = false;
  if (date.day >= 1 && date.day <= 7) { sem1 = true; }
  if (date.day >= 8 && date.day <= 14) { sem2 = true; }
  if (date.day >= 15 && date.day <= 21) { sem3 = true; }
  if (date.day >= 22) { sem4 = true; }

  const allMonths = getAllMonths();

  return (
    <View style={groupCalendarTwo.container}>
      {meses.map((mes: { nombre: string, dias: number[], style: any }, index: number) => (
        <View style={[groupCalendarTwo.wrap, mes.style]}>
          <View style={groupCalendarTwo.head}>
            <Text style={groupCalendarTwo.headMonth}>
              {allMonths[4 + index]}
              {' '}
              {groupConsult.calcPersonalMonth({ ...date, month: 5 + index })}
              {groupConsult.calcPersonalMonthISK({ ...date, month: 5 + index })}
              /
              {universalCalcs.calcUniversalMonth({ ...date, month: 5 + index })}
              {universalCalcs.calcUniversalMonthISK({ ...date, month: 5 + index })}
            </Text>
          </View>
          <View style={groupCalendarTwo.head}>
            <Text style={groupCalendarTwo.headQuater}>
              Cuatrimestre:
              {groupConsult.getQuarterMonth(5 + index, date.year)}
              {groupConsult.getQuarterMonthISK(5 + index, date.year)}
            </Text>
          </View>
          <View style={[groupCalendarTwo.week1, { backgroundColor: `${(sem1 === true && date.month === 5 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTwo.weektext}>1a Sem</Text>
            <Text style={[groupCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 5 + index })}
              {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 5 + index })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month: 5 + index })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month: 5 + index })}
            </Text>
          </View>
          <View style={[groupCalendarTwo.week2, { backgroundColor: `${(sem2 === true && date.month === 5 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTwo.weektext}>2a Sem</Text>
            <Text style={[groupCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 5 + index })}
              {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 5 + index })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month: 5 + index })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month: 5 + index })}
            </Text>
          </View>
          <View style={[groupCalendarTwo.week3, { backgroundColor: `${(sem3 === true && date.month === 5 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTwo.weektext}>3a Sem</Text>
            <Text style={[groupCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 5 + index })}
              {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 5 + index })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month: 5 + index })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month: 5 + index })}
            </Text>
          </View>
          <View style={[groupCalendarTwo.week4, { backgroundColor: `${(sem4 === true && date.month === 5 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTwo.weektext}>4a Sem</Text>
            <Text style={[groupCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 5 + index })}
              {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 5 + index })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month: 5 + index })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 5 + index })}
            </Text>
          </View>
          {mes.dias.length > 28
            ? (
              <View style={[groupCalendarTwo.week5, { backgroundColor: `${(sem4 === true && date.month === 5 + index) ? '#DCA8A9' : ''}` }]}>
                <Text style={groupCalendarTwo.weektext}>4a Sem</Text>
                <Text style={[groupCalendarTwo.weektext, { fontWeight: 'bold' }]}>
                  {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 5 + index })}
                  {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 5 + index })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month: 5 + index })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 5 + index })}
                </Text>
              </View>
            ) : ''}
          <View style={groupCalendarTwo.daysWeek}>
            <DaysOfTheWeek month={5 + index} groupConsult={groupConsult} date={date} />
          </View>
          <View style={groupCalendarTwo.daysContainer}>
            <MonthsInDay month={5 + index} groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
          </View>

        </View>
      ))}

    </View>
  );
}

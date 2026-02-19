/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const groupCalendar = StyleSheet.create({
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
    left: '264px',
  },
  wrap5: {
    top: '433px',
    left: '16px',
  },
  wrap6: {
    top: '434px',
    left: '264px',
  },
  wrap7: {
    top: '584px',
    left: '16px',
  },
  wrap8: {
    top: '585px',
    left: '264px',
  },
  head: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week1: {
    width: '31px',
    top: '241px',
    left: '27px',
    position: 'absolute',
  },
  week2: {
    width: '31px',
    top: '258px',
    left: '29px',
    position: 'absolute',
  },
  week3: {
    width: '31px',
    top: '274px',
    left: '29px',
    position: 'absolute',
  },
  week4: {
    width: '31px',
    top: '293px',
    left: '29px',
    position: 'absolute',
  },
  week5: {
    width: '31px',
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
      {daysCustom.map((day) => <View style={groupCalendar.daysofWeek}><Text>{day[0]}</Text></View>)}
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
      <View style={groupCalendar.daysRow}>
        {semOne.map((day) => (
          <View style={[groupCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendar.daysRow}>
        {semTwo.map((day) => (
          <View style={[groupCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendar.daysRow}>
        {semThr.map((day) => (
          <View style={[groupCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendar.daysRow}>
        {semFou.map((day) => (
          <View style={[groupCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendar.daysRow}>
        {semFive.map((day) => (
          <View style={[groupCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
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

export default function GroupCalendarMonthsOne({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  const meses = [
    {
      nombre: 'enero',
      dias: groupConsult.getAllDaysInMonth(1, date.year),
      style: groupCalendar.wrap1,
    },
    {
      nombre: 'febrero',
      dias: groupConsult.getAllDaysInMonth(2, date.year),
      style: groupCalendar.wrap2,
    },
    {
      nombre: 'marzo',
      dias: groupConsult.getAllDaysInMonth(3, date.year),
      style: groupCalendar.wrap3,
    },
    {
      nombre: 'abril',
      dias: groupConsult.getAllDaysInMonth(4, date.year),
      style: groupCalendar.wrap4,
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
    <View style={groupCalendar.container}>
      {meses.map((mes: { nombre: string, dias: number[], style: any }, index: number) => (
        <View style={[groupCalendar.wrap, mes.style]}>
          <View style={groupCalendar.head}>
            <Text style={groupCalendar.headMonth}>
              {allMonths[index]}
              {' '}
              {groupConsult.calcPersonalMonth({ ...date, month: index + 1 })}
              {groupConsult.calcPersonalMonthISK({ ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalMonth({ ...date, month: index + 1 })}
              {universalCalcs.calcUniversalMonthISK({ ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={groupCalendar.head}>
            <Text style={groupCalendar.headQuater}>
              Cuatrimestre:
              {groupConsult.getQuarterMonth(index + 1, date.year)}
              {groupConsult.getQuarterMonthISK(index + 1, date.year)}
            </Text>
          </View>
          <View style={[groupCalendar.week1, { backgroundColor: `${(sem1 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendar.weektext}>1a Sem</Text>
            <Text style={[groupCalendar.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(1, { ...date, month: index + 1 })}
              {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={[groupCalendar.week2, { backgroundColor: `${(sem2 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendar.weektext}>2a Sem</Text>
            <Text style={[groupCalendar.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(2, { ...date, month: index + 1 })}
              {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={[groupCalendar.week3, { backgroundColor: `${(sem3 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendar.weektext}>3a Sem</Text>
            <Text style={[groupCalendar.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(3, { ...date, month: index + 1 })}
              {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={[groupCalendar.week4, { backgroundColor: `${(sem4 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendar.weektext}>4a Sem</Text>
            <Text style={[groupCalendar.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(4, { ...date, month: index + 1 })}
              {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month: index + 1 })}
            </Text>
          </View>
          {mes.dias.length > 28
            ? (
              <View style={[groupCalendar.week5, { backgroundColor: `${(sem4 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
                <Text style={groupCalendar.weektext}>4a Sem</Text>
                <Text style={[groupCalendar.weektext, { fontWeight: 'bold' }]}>
                  {groupConsult.calcSelectPersonalWeek(4, { ...date, month: index + 1 })}
                  {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: index + 1 })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month: index + 1 })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month: index + 1 })}
                </Text>
              </View>
            ) : ''}
          <View style={groupCalendar.daysWeek}>
            <DaysOfTheWeek month={index + 1} groupConsult={groupConsult} date={date} />
          </View>
          <View style={groupCalendar.daysContainer}>
            <MonthsInDay month={index + 1} groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
          </View>

        </View>
      ))}

    </View>
  );
}

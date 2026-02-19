/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const groupCalendarTree = StyleSheet.create({
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
      {daysCustom.map((day) => <View style={groupCalendarTree.daysofWeek}><Text>{day[0]}</Text></View>)}
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
      <View style={groupCalendarTree.daysRow}>
        {semOne.map((day) => (
          <View style={[groupCalendarTree.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTree.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTree.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTree.daysRow}>
        {semTwo.map((day) => (
          <View style={[groupCalendarTree.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTree.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTree.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTree.daysRow}>
        {semThr.map((day) => (
          <View style={[groupCalendarTree.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTree.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTree.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTree.daysRow}>
        {semFou.map((day) => (
          <View style={[groupCalendarTree.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTree.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTree.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {groupConsult.calcPersonalDay({ ...date, day, month })}
              {groupConsult.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={groupCalendarTree.daysRow}>
        {semFive.map((day) => (
          <View style={[groupCalendarTree.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[groupCalendarTree.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[groupCalendarTree.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
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

export default function SynastryCalendarMonthsThree({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  const meses = [
    {
      nombre: 'septiembre',
      dias: groupConsult.getAllDaysInMonth(9, date.year),
      style: groupCalendarTree.wrap1,
    },
    {
      nombre: 'octubre',
      dias: groupConsult.getAllDaysInMonth(10, date.year),
      style: groupCalendarTree.wrap2,
    },
    {
      nombre: 'noviembre',
      dias: groupConsult.getAllDaysInMonth(11, date.year),
      style: groupCalendarTree.wrap3,
    },
    {
      nombre: 'diciembre',
      dias: groupConsult.getAllDaysInMonth(12, date.year),
      style: groupCalendarTree.wrap4,
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
    <View style={groupCalendarTree.container}>
      {meses.map((mes: { nombre: string, dias: number[], style: any }, index: number) => (
        <View style={[groupCalendarTree.wrap, mes.style]}>
          <View style={groupCalendarTree.head}>
            <Text style={groupCalendarTree.headMonth}>
              {allMonths[8 + index]}
              {' '}
              {groupConsult.calcPersonalMonth({ ...date, month: 9 + index })}
              {groupConsult.calcPersonalMonthISK({ ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalMonth({ ...date, month: 9 + index })}
              {universalCalcs.calcUniversalMonthISK({ ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={groupCalendarTree.head}>
            <Text style={groupCalendarTree.headQuater}>
              Cuatrimestre:
              {groupConsult.getQuarterMonth(9 + index, date.year)}
              {groupConsult.getQuarterMonthISK(9 + index, date.year)}
            </Text>
          </View>
          <View style={[groupCalendarTree.week1, { backgroundColor: `${(sem1 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTree.weektext}>1a Sem</Text>
            <Text style={[groupCalendarTree.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 9 + index })}
              {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={[groupCalendarTree.week2, { backgroundColor: `${(sem2 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTree.weektext}>2a Sem</Text>
            <Text style={[groupCalendarTree.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 9 + index })}
              {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={[groupCalendarTree.week3, { backgroundColor: `${(sem3 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTree.weektext}>3a Sem</Text>
            <Text style={[groupCalendarTree.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 9 + index })}
              {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={[groupCalendarTree.week4, { backgroundColor: `${(sem4 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={groupCalendarTree.weektext}>4a Sem</Text>
            <Text style={[groupCalendarTree.weektext, { fontWeight: 'bold' }]}>
              {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 9 + index })}
              {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 9 + index })}
            </Text>
          </View>
          {mes.dias.length > 28
            ? (
              <View style={[groupCalendarTree.week5, { backgroundColor: `${(sem4 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
                <Text style={groupCalendarTree.weektext}>4a Sem</Text>
                <Text style={[groupCalendarTree.weektext, { fontWeight: 'bold' }]}>
                  {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 9 + index })}
                  {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 9 + index })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month: 9 + index })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 9 + index })}
                </Text>
              </View>
            ) : ''}
          <View style={groupCalendarTree.daysWeek}>
            <DaysOfTheWeek month={9 + index} groupConsult={groupConsult} date={date} />
          </View>
          <View style={groupCalendarTree.daysContainer}>
            <MonthsInDay month={9 + index} groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
          </View>

        </View>
      ))}

    </View>
  );
}

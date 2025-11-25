/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import Person, { SplittedDate } from '@/resources/Person';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const calendar = StyleSheet.create({
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
    top: '0px',
    left: '15px',
  },
  wrap2: {
    top: '0px',
    left: '263px',
  },
  wrap3: {
    top: '153px',
    left: '15px',
  },
  wrap4: {
    top: '153px',
    left: '262px',
  },
  wrap5: {
    top: '304px',
    left: '15px',
  },
  wrap6: {
    top: '305px',
    left: '262px',
  },
  wrap7: {
    top: '455px',
    left: '15px',
  },
  wrap8: {
    top: '456px',
    left: '262px',
  },
  head: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week1: {
    width: '33px',
    top: '112px',
    left: '28px',
    position: 'absolute',
  },
  week2: {
    width: '33px',
    top: '129px',
    left: '28px',
    position: 'absolute',
  },
  week3: {
    width: '33px',
    top: '145px',
    left: '28px',
    position: 'absolute',
  },
  week4: {
    width: '33px',
    top: '164px',
    left: '28px',
    position: 'absolute',
  },
  week5: {
    width: '33px',
    top: '181px',
    left: '28px',
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
    top: '112px',
    display: 'flex',
    flexDirection: 'column',
    left: '73px',
    position: 'absolute',
  },
  daysWeek: {
    width: '175px',
    top: '102px',
    display: 'flex',
    flexDirection: 'row',
    left: '72px',
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
    top: '85px',
    left: '50px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
  headQuater: {
    top: '85px',
    left: '165px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
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

export default function CalendarMonths2({ consultant, date, universalCalcs }: { consultant: Person, date: SplittedDate, universalCalcs: Universal }) {
  const meses = [
    {
      nombre: 'septiembre',
      dias: consultant.getAllDaysInMonth(9, date.year),
      style: calendar.wrap1,
    },
    {
      nombre: 'octubre',
      dias: consultant.getAllDaysInMonth(10, date.year),
      style: calendar.wrap2,
    },
    {
      nombre: 'noviembre',
      dias: consultant.getAllDaysInMonth(11, date.year),
      style: calendar.wrap3,
    },
    {
      nombre: 'diciembre',
      dias: consultant.getAllDaysInMonth(12, date.year),
      style: calendar.wrap4,
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
    <View style={calendar.container}>
      {meses.map((mes: { nombre: string, dias: number[], style: any }, index: number) => (
        <View style={[calendar.wrap, mes.style]}>
          <View style={calendar.head}>
            <Text style={calendar.headMonth}>
              {allMonths[8 + index]}
              {' '}
              {consultant.calcPersonalMonth({ ...date, month: 9 + index })}
              {consultant.calcPersonalMonthISK({ ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalMonth({ ...date, month: 9 + index })}
              {universalCalcs.calcUniversalMonthISK({ ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={calendar.head}>
            <Text style={calendar.headQuater}>
              Cuatrimestre:
              {consultant.getQuarterMonth(9 + index, date.year)}
              {consultant.getQuarterMonthISK(9 + index, date.year)}
            </Text>
          </View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(1, { ...date, month: 9 + index })}
              {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(2, { ...date, month: 9 + index })}
              {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(3, { ...date, month: 9 + index })}
              {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month: 9 + index })}
            </Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
              {consultant.calcSelectPersonalWeek(4, { ...date, month: 9 + index })}
              {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 9 + index })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month: 9 + index })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 9 + index })}
            </Text>
          </View>
          {mes.dias.length > 28
            ? (
              <View style={[calendar.week5, { backgroundColor: `${(sem4 === true && date.month === 9 + index) ? '#DCA8A9' : ''}` }]}>
                <Text style={calendar.weektext}>4a Sem</Text>
                <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>
                  {consultant.calcSelectPersonalWeek(4, { ...date, month: 9 + index })}
                  {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 9 + index })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month: 9 + index })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 9 + index })}
                </Text>
              </View>
            ) : ''}
          <View style={calendar.daysWeek}>
            <DaysOfTheWeek month={9 + index} consultant={consultant} date={date} />
          </View>
          <View style={calendar.daysContainer}>
            <MonthsInDay month={9 + index} consultant={consultant} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
          </View>

        </View>
      ))}

    </View>
  );
}

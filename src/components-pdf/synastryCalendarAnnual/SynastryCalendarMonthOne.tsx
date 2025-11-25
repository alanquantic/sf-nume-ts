/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const synastryCalendar = StyleSheet.create({
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
    top: '63px',
    left: '16px',
  },
  wrap2: {
    top: '63px',
    left: '264px',
  },
  wrap3: {
    top: '216px',
    left: '16px',
  },
  wrap4: {
    top: '216px',
    left: '264px',
  },
  wrap5: {
    top: '367px',
    left: '16px',
  },
  wrap6: {
    top: '368px',
    left: '264px',
  },
  wrap7: {
    top: '518px',
    left: '16px',
  },
  wrap8: {
    top: '519px',
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
    top: '175px',
    left: '27px',
    position: 'absolute',
  },
  week2: {
    width: '31px',
    top: '192px',
    left: '29px',
    position: 'absolute',
  },
  week3: {
    width: '31px',
    top: '208px',
    left: '29px',
    position: 'absolute',
  },
  week4: {
    width: '31px',
    top: '227px',
    left: '29px',
    position: 'absolute',
  },
  week5: {
    width: '31px',
    top: '244px',
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
    top: '175px',
    display: 'flex',
    flexDirection: 'column',
    left: '74px',
    position: 'absolute',
  },
  daysWeek: {
    width: '175px',
    top: '165px',
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
    top: '148px',
    left: '51px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
  headQuater: {
    top: '148px',
    left: '166px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
});
export function DaysOfTheWeek({ month, synastry, date }: { month: number, synastry: Synastry, date: SplittedDate }) {
  const daysCustom = synastry.getDaysOfWeekCustom(month, date.year);
  return (
    <>
      {daysCustom.map((day) => <View style={synastryCalendar.daysofWeek}><Text>{day[0]}</Text></View>)}
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
      <View style={synastryCalendar.daysRow}>
        {semOne.map((day) => (
          <View style={[synastryCalendar.example, { backgroundColor: `${(day === date.day && month === date.month + 1) ? '#C77575' : ((sem1 === true) && month === date.month + 1) ? '#DCA8A9' : (month === date.month + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendar.days, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendar.calcDays, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendar.daysRow}>
        {semTwo.map((day) => (
          <View style={[synastryCalendar.example, { backgroundColor: `${(day === date.day && month === date.month + 1) ? '#C77575' : ((sem2 === true) && month === date.month + 1) ? '#DCA8A9' : (month === date.month + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendar.days, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendar.calcDays, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendar.daysRow}>
        {semThr.map((day) => (
          <View style={[synastryCalendar.example, { backgroundColor: `${(day === date.day && month === date.month + 1) ? '#C77575' : (sem3 === true && month === date.month + 1) ? '#DCA8A9' : (month === date.month + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendar.daysRow}>
        {semFou.map((day) => (
          <View style={[synastryCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendar.daysRow}>
        {semFive.map((day) => (
          <View style={[synastryCalendar.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendar.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendar.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
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

export default function SynastryCalendarMonthsOne({ synastry, date, universalCalcs }: { synastry: Synastry, date: SplittedDate, universalCalcs: Universal }) {
  const meses = [
    {
      nombre: 'enero',
      dias: synastry.getAllDaysInMonth(1, date.year),
      style: synastryCalendar.wrap1,
    },
    {
      nombre: 'febrero',
      dias: synastry.getAllDaysInMonth(2, date.year),
      style: synastryCalendar.wrap2,
    },
    {
      nombre: 'marzo',
      dias: synastry.getAllDaysInMonth(3, date.year),
      style: synastryCalendar.wrap3,
    },
    {
      nombre: 'abril',
      dias: synastry.getAllDaysInMonth(4, date.year),
      style: synastryCalendar.wrap4,
    },
    {
      nombre: 'mayo',
      dias: synastry.getAllDaysInMonth(5, date.year),
      style: synastryCalendar.wrap5,
    },
    {
      nombre: 'junio',
      dias: synastry.getAllDaysInMonth(6, date.year),
      style: synastryCalendar.wrap6,
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
    <View style={synastryCalendar.container}>
      {meses.map((mes: { nombre: string, dias: number[], style: any }, index: number) => (
        <View style={[synastryCalendar.wrap, mes.style]}>
          <View style={synastryCalendar.head}>
            <Text style={synastryCalendar.headMonth}>
              {allMonths[index]}
              {' '}
              {synastry.calcPersonalMonth({ ...date, month: index + 1 })}
              {synastry.calcPersonalMonthISK({ ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalMonth({ ...date, month: index + 1 })}
              {universalCalcs.calcUniversalMonthISK({ ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={synastryCalendar.head}>
            <Text style={synastryCalendar.headQuater}>
              Cuatrimestre:
              {synastry.getQuarterMonth(index + 1, date.year)}
              {synastry.getQuarterMonthISK(index + 1, date.year)}
            </Text>
          </View>
          <View style={[synastryCalendar.week1, { backgroundColor: `${(sem1 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendar.weektext}>1a Sem</Text>
            <Text style={[synastryCalendar.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(1, { ...date, month: index + 1 })}
              {synastry.calcSelectPersonalWeekISK(1, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={[synastryCalendar.week2, { backgroundColor: `${(sem2 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendar.weektext}>2a Sem</Text>
            <Text style={[synastryCalendar.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(2, { ...date, month: index + 1 })}
              {synastry.calcSelectPersonalWeekISK(2, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={[synastryCalendar.week3, { backgroundColor: `${(sem3 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendar.weektext}>3a Sem</Text>
            <Text style={[synastryCalendar.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(3, { ...date, month: index + 1 })}
              {synastry.calcSelectPersonalWeekISK(3, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month: index + 1 })}
            </Text>
          </View>
          <View style={[synastryCalendar.week4, { backgroundColor: `${(sem4 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendar.weektext}>4a Sem</Text>
            <Text style={[synastryCalendar.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(4, { ...date, month: index + 1 })}
              {synastry.calcSelectPersonalWeekISK(4, { ...date, month: index + 1 })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month: index + 1 })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month: index + 1 })}
            </Text>
          </View>
          {mes.dias.length > 28
            ? (
              <View style={[synastryCalendar.week5, { backgroundColor: `${(sem4 === true && date.month + 1 === index + 1) ? '#DCA8A9' : ''}` }]}>
                <Text style={synastryCalendar.weektext}>4a Sem</Text>
                <Text style={[synastryCalendar.weektext, { fontWeight: 'bold' }]}>
                  {synastry.calcSelectPersonalWeek(4, { ...date, month: index + 1 })}
                  {synastry.calcSelectPersonalWeekISK(4, { ...date, month: index + 1 })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month: index + 1 })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month: index + 1 })}
                </Text>
              </View>
            ) : ''}
          <View style={synastryCalendar.daysWeek}>
            <DaysOfTheWeek month={index + 1} synastry={synastry} date={date} />
          </View>
          <View style={synastryCalendar.daysContainer}>
            <MonthsInDay month={index + 1} synastry={synastry} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
          </View>

        </View>
      ))}

    </View>
  );
}

/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const synastryCalendarTwo = StyleSheet.create({
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
    left: '19px',
  },
  wrap2: {
    top: '63px',
    left: '267px',
  },
  wrap3: {
    top: '216px',
    left: '19px',
  },
  wrap4: {
    top: '216px',
    left: '266px',
  },
  wrap5: {
    top: '367px',
    left: '19px',
  },
  wrap6: {
    top: '368px',
    left: '266px',
  },
  wrap7: {
    top: '518px',
    left: '19px',
  },
  wrap8: {
    top: '519px',
    left: '266px',
  },
  head: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week1: {
    width: '33px',
    top: '175px',
    left: '32px',
    position: 'absolute',
  },
  week2: {
    width: '33px',
    top: '192px',
    left: '32px',
    position: 'absolute',
  },
  week3: {
    width: '33px',
    top: '208px',
    left: '32px',
    position: 'absolute',
  },
  week4: {
    width: '33px',
    top: '227px',
    left: '32px',
    position: 'absolute',
  },
  week5: {
    width: '33px',
    top: '244px',
    left: '32px',
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
    left: '77px',
    position: 'absolute',
  },
  daysWeek: {
    width: '175px',
    top: '165px',
    display: 'flex',
    flexDirection: 'row',
    left: '76px',
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
    left: '54px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
  headQuater: {
    top: '148px',
    left: '169px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute',
  },
});
export function DaysOfTheWeek({ month, synastry, date }: { month: number, synastry: Synastry, date: SplittedDate }) {
  const daysCustom = synastry.getDaysOfWeekCustom(month, date.year);
  return (
    <>
      {daysCustom.map((day) => <View style={synastryCalendarTwo.daysofWeek}><Text>{day[0]}</Text></View>)}
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
      <View style={synastryCalendarTwo.daysRow}>
        {semOne.map((day) => (
          <View style={[synastryCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem1 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarTwo.daysRow}>
        {semTwo.map((day) => (
          <View style={[synastryCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem2 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month + 1) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarTwo.daysRow}>
        {semThr.map((day) => (
          <View style={[synastryCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : (sem3 === true && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarTwo.daysRow}>
        {semFou.map((day) => (
          <View style={[synastryCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
              {synastry.calcPersonalDay({ ...date, day, month })}
              {synastry.calcPersonalDayISK({ ...date, day, month })}
              /
              {universalCalcs.calcUniversalDay({ ...date, day, month })}
              {universalCalcs.calcUniversalDayISK({ ...date, day, month })}
            </Text>
          </View>
        ))}
      </View>
      <View style={synastryCalendarTwo.daysRow}>
        {semFive.map((day) => (
          <View style={[synastryCalendarTwo.example, { backgroundColor: `${(day === date.day && month === date.month) ? '#C77575' : ((sem4 === true) && month === date.month) ? '#DCA8A9' : (month === date.month) ? '#FBEDD9' : ''}` }]}>
            <Text style={[synastryCalendarTwo.days, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[synastryCalendarTwo.calcDays, { color: `${(day === date.day && month === date.month) ? '#fff' : ''}` }]}>
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

export default function SynastryCalendarMonthsTwo({ synastry, date, universalCalcs }: { synastry: Synastry, date: SplittedDate, universalCalcs: Universal }) {
  const meses = [
    {
      nombre: 'julio',
      dias: synastry.getAllDaysInMonth(7, date.year),
      style: synastryCalendarTwo.wrap1,
    },
    {
      nombre: 'agosto',
      dias: synastry.getAllDaysInMonth(8, date.year),
      style: synastryCalendarTwo.wrap2,
    },
    {
      nombre: 'septiembre',
      dias: synastry.getAllDaysInMonth(9, date.year),
      style: synastryCalendarTwo.wrap3,
    },
    {
      nombre: 'octubre',
      dias: synastry.getAllDaysInMonth(10, date.year),
      style: synastryCalendarTwo.wrap4,
    },
    {
      nombre: 'noviembre',
      dias: synastry.getAllDaysInMonth(11, date.year),
      style: synastryCalendarTwo.wrap5,
    },
    {
      nombre: 'diciembre',
      dias: synastry.getAllDaysInMonth(12, date.year),
      style: synastryCalendarTwo.wrap6,
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
    <View style={synastryCalendarTwo.container}>
      {meses.map((mes: { nombre: string, dias: number[], style: any }, index: number) => (
        <View style={[synastryCalendarTwo.wrap, mes.style]}>
          <View style={synastryCalendarTwo.head}>
            <Text style={synastryCalendarTwo.headMonth}>
              {allMonths[6 + index]}
              {' '}
              {synastry.calcPersonalMonth({ ...date, month: 7 + index })}
              {synastry.calcPersonalMonthISK({ ...date, month: 7 + index })}
              /
              {universalCalcs.calcUniversalMonth({ ...date, month: 7 + index })}
              {universalCalcs.calcUniversalMonthISK({ ...date, month: 7 + index })}
            </Text>
          </View>
          <View style={synastryCalendarTwo.head}>
            <Text style={synastryCalendarTwo.headQuater}>
              Cuatrimestre:
              {synastry.getQuarterMonth(7 + index, date.year)}
              {synastry.getQuarterMonthISK(7 + index, date.year)}
            </Text>
          </View>
          <View style={[synastryCalendarTwo.week1, { backgroundColor: `${(sem1 === true && date.month === 7 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendarTwo.weektext}>1a Sem</Text>
            <Text style={[synastryCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(1, { ...date, month: 7 + index })}
              {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 7 + index })}
              /
              {universalCalcs.calcUniversalWeek(1, { ...date, month: 7 + index })}
              {universalCalcs.calcUniversalWeekISK(1, { ...date, month: 7 + index })}
            </Text>
          </View>
          <View style={[synastryCalendarTwo.week2, { backgroundColor: `${(sem2 === true && date.month === 7 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendarTwo.weektext}>2a Sem</Text>
            <Text style={[synastryCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(2, { ...date, month: 7 + index })}
              {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 7 + index })}
              /
              {universalCalcs.calcUniversalWeek(2, { ...date, month: 7 + index })}
              {universalCalcs.calcUniversalWeekISK(2, { ...date, month: 7 + index })}
            </Text>
          </View>
          <View style={[synastryCalendarTwo.week3, { backgroundColor: `${(sem3 === true && date.month === 7 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendarTwo.weektext}>3a Sem</Text>
            <Text style={[synastryCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(3, { ...date, month: 7 + index })}
              {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 7 + index })}
              /
              {universalCalcs.calcUniversalWeek(3, { ...date, month: 7 + index })}
              {universalCalcs.calcUniversalWeekISK(3, { ...date, month: 7 + index })}
            </Text>
          </View>
          <View style={[synastryCalendarTwo.week4, { backgroundColor: `${(sem4 === true && date.month === 7 + index) ? '#DCA8A9' : ''}` }]}>
            <Text style={synastryCalendarTwo.weektext}>4a Sem</Text>
            <Text style={[synastryCalendarTwo.weektext, { fontWeight: 'bold' }]}>
              {synastry.calcSelectPersonalWeek(4, { ...date, month: 7 + index })}
              {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 7 + index })}
              /
              {universalCalcs.calcUniversalWeek(4, { ...date, month: 7 + index })}
              {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 7 + index })}
            </Text>
          </View>
          {mes.dias.length > 28
            ? (
              <View style={[synastryCalendarTwo.week5, { backgroundColor: `${(sem4 === true && date.month === 7 + index) ? '#DCA8A9' : ''}` }]}>
                <Text style={synastryCalendarTwo.weektext}>4a Sem</Text>
                <Text style={[synastryCalendarTwo.weektext, { fontWeight: 'bold' }]}>
                  {synastry.calcSelectPersonalWeek(4, { ...date, month: 7 + index })}
                  {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 7 + index })}
                  /
                  {universalCalcs.calcUniversalWeek(4, { ...date, month: 7 + index })}
                  {universalCalcs.calcUniversalWeekISK(4, { ...date, month: 7 + index })}
                </Text>
              </View>
            ) : ''}
          <View style={synastryCalendarTwo.daysWeek}>
            <DaysOfTheWeek month={7 + index} synastry={synastry} date={date} />
          </View>
          <View style={synastryCalendarTwo.daysContainer}>
            <MonthsInDay month={7 + index} synastry={synastry} date={date} universalCalcs={universalCalcs} sem1={sem1} sem2={sem2} sem3={sem3} sem4={sem4} />
          </View>

        </View>
      ))}

    </View>
  );
}

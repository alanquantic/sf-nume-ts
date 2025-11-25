import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const cycle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '135px',
    left: '10px',
    fontSize: '7px',
    width: '356px',
  },
  bar: {
    backgroundColor: '#000',
    fontWeight: 'bold',
    color: '#fff',
    padding: '3px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    fontSize: '8px',
  },
  wrap: {
    border: '1px solid gray',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderTopWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '104px',
    padding: '5px',
  },
  circle: {
    paddingTop: '3px',
    textAlign: 'center',
    fontSize: '10px',
    fontFamily: 'Open Sans',
    width: '20px',
    height: '20px',
    borderRadius: '25px',
    border: '1px',
    backgroundColor: '#A2CA94',
    borderColor: '#51A133',
    fontWeight: 'bold',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_1: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '5px',
  },
  itemMap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: '8px',
    paddingLeft: '5px',
  },
  title_circle: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    border: '1px',
    borderColor: '#663366',
    borderRadius: '25px',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    paddingTop: '7px',
    fontWeight: 'bold',
  },
  borderC: {
    width: '100%',
    height: '10px',
    borderTop: '2px',
    borderLeft: '2px',
    borderRight: '2px',
    borderColor: '#51A133',
  },
  borderH: {
    borderRight: '2px',
    borderRightColor: '#51A133',
    width: '50%',
    height: '10px',
    top: '1px',
  },
});

export default function VibrationTimeCycle({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const nineYearCycle = consultant.getNineYearCycleStage(date.year);
  const personalYears: number[] = [];
  nineYearCycle.forEach((year: number) => {
    personalYears.push(consultant.calcPersonalYear(year));
  });

  return (
    <View style={cycle.container}>
      <View style={cycle.bar}>
        <Text>Ciclo de 9 años</Text>
      </View>
      <View style={cycle.wrap}>
        <View style={cycle.item_1}>
          <Text style={[cycle.title, { fontWeight: 'bold' }]}>
            Etapa
            {consultant.getLifeStageNumber(date)}
          </Text>
          <Text style={cycle.circle}>
            {consultant.calcLifeStage(consultant.getLifeStageNumber(date))}
            {consultant.calcLifeStageISK(consultant.getLifeStageNumber(date))}
          </Text>
        </View>
        <View style={cycle.borderH} />
        <View style={cycle.borderC} />
        <View style={cycle.item}>
          {nineYearCycle.map((year) => (
            <View style={cycle.itemMap}>
              {year === date.year ? (
                <Text style={[cycle.title_circle, { backgroundColor: '#D8C7EB' }]}>
                  {consultant.calcPersonalYear(year)}
                  {(consultant.calcPersonalYear(year) === 2) ? '/11' : ''}
                  {(consultant.calcPersonalYear(year) === 4) ? '/22' : ''}
                  {consultant.calcPersonalYearISK(year)}
                </Text>
              )
                : (
                  <Text style={[cycle.title_circle]}>
                    {consultant.calcPersonalYear(year)}
                    {(consultant.calcPersonalYear(year) === 2) ? '/11' : ''}
                    {(consultant.calcPersonalYear(year) === 4) ? '/22' : ''}
                    {consultant.calcPersonalYearISK(year)}
                  </Text>
                )}
              {(year === date.year) ? <Text style={[cycle.title, { fontWeight: 'bold' }]}>{year}</Text> : <Text style={[cycle.title, { color: '#7E7E7E' }]}>{year}</Text>}
              {(consultant.getLifeStageNumber(date) === 1) ? <Text style={[cycle.title, { color: '#7E7E7E' }]}>{year + 9}</Text> : ''}
              {(consultant.getLifeStageNumber(date) === 1) ? <Text style={[cycle.title, { color: '#7E7E7E' }]}>{year + 18}</Text> : ''}
            </View>
          ))}
        </View>

      </View>
    </View>
  );
}

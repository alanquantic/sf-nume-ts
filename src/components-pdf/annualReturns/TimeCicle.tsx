import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const cycle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '475px',
    left: '12px',
    fontSize: '7px',
    width: '531px',
  },
  bar: {
    // backgroundColor: '#000',
    fontWeight: 'bold',
    color: '#fff',
    padding: '3px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    fontSize: '8px',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '104px',
    padding: '5px',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    paddingTop: '3px',
    textAlign: 'center',
    fontSize: '20px',
    fontFamily: 'Open Sans',
    width: '40px',
    height: '40px',
    borderRadius: '25px',
    // border: '1px',
    // backgroundColor: '#A2CA94',
    // borderColor: '#51A133',
    fontWeight: 'bold',
    top: '23px',
  },
  item: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ff000012',
    width: '500px',
    top: '95px',
    left: '15px',
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
    fontSize: '15px',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: '8px',
    paddingLeft: '5px',
  },
  title_circle: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    // border: '1px',
    // borderColor: '#663366',
    borderRadius: '25px',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    paddingTop: '7px',
    fontWeight: 'bold',
  },
});
export default function TimeCycle({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const nineYearCycle = consultant.getNineYearCycleStage(date.year);
  const personalYears: number[] = [];
  nineYearCycle.forEach((year: number) => {
    personalYears.push(consultant.calcPersonalYear(year));
  });

  return (
    <View style={cycle.container}>
      <View style={cycle.wrap}>
        <View style={cycle.item_1}>
          <Text style={[cycle.title, {
            position: 'absolute', left: 200, width: 40, top: 40, fontWeight: 'bold',
          }]}
          >
            Etapa
            {consultant.getLifeStageNumber(date)}
          </Text>
          <Text style={cycle.circle}>
            {consultant.calcLifeStage(consultant.getLifeStageNumber(date))}
            {consultant.calcLifeStageISK(consultant.getLifeStageNumber(date))}
          </Text>
        </View>
        <View style={cycle.item}>
          {nineYearCycle.map((year) => (
            <View style={cycle.itemMap}>
              {year === date.year ? (
                <Text style={[cycle.title_circle]}>
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

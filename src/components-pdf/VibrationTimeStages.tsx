import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const vibrationStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '10px',
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
    flexDirection: 'row',
    height: '102px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  item: {
    width: '50px',
    marginLeft: '5px',
  },
  title: {
    fontSize: '8px',
    fontFamily: 'Open Sans',
    textAlign: 'center',

  },
  circle: {
    paddingTop: '3px',
    fontSize: '12px',
    textAlign: 'center',
    width: '20px',
    height: '20px',
    left: '10px',
    borderRadius: '25px',
    backgroundColor: '#A2CA94',
    border: '1px',
    borderColor: '#51A133',
  },
  squad: {
    paddingTop: '3px',
    fontSize: '12px',
    textAlign: 'center',
    width: '20px',
    height: '20px',
    left: '10px',
    borderRadius: '5px',
  },
  item_1: {
    top: '5px',
  },
  item_2: {
    top: '15px',
  },
  item_3: {
    top: '25px',
  },
  item_4: {
    top: '35px',
  },
  item_5: {
    top: '45px',
  },
  item_6: {
    top: '55px',
  },
  borderSpace: {
    width: '6px',
    borderTop: '2px',
    borderTopColor: '#BFBFBF',
    borderBottom: '2px',
    borderBottomColor: '#BFBFBF',
    borderRight: '2px',
    borderRightColor: '#BFBFBF',
  },
  space_1: {
    height: '90px',
  },
  space_2: {
    height: '80px',
  },
  space_3: {
    height: '70px',
  },
  space_4: {
    height: '60px',
  },
  space_5: {
    height: '50px',
  },
  borderR: {
    borderTop: '2px',
    borderTopColor: '#BFBFBF',
    width: '4px',
    left: '-1px',
  },
});

export default function VibrationTimeStage({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  return (
    <View style={vibrationStyle.container}>
      <View style={vibrationStyle.bar}>
        <Text>Energías Activas </Text>
      </View>
      <View style={vibrationStyle.wrap}>
        <View style={[vibrationStyle.item, vibrationStyle.item_1]}>
          <Text style={vibrationStyle.title}>
            Etapa
            {'\n'}
            {' '}
            Actual
          </Text>
          <Text style={vibrationStyle.circle}>
            {consultant.getLifeStage(date.year)}
            {consultant.getLifeStageISK(date.year)}
          </Text>
        </View>

        <View style={[vibrationStyle.space_1, vibrationStyle.borderSpace, vibrationStyle.item_1]} />
        <View style={[vibrationStyle.borderR, vibrationStyle.item_2]} />

        <View style={[vibrationStyle.item, vibrationStyle.item_2]}>
          <Text style={vibrationStyle.title}>
            Año
            {'\n'}
            {' '}
            Personal
          </Text>
          <Text style={[vibrationStyle.squad, { backgroundColor: '#9F5D9B' }]}>
            {consultant.calcPersonalYear(date.year)}
            {consultant.calcPersonalYearISK(date.year)}
          </Text>
        </View>

        <View style={[vibrationStyle.space_2, vibrationStyle.borderSpace, vibrationStyle.item_2]} />
        <View style={[vibrationStyle.borderR, vibrationStyle.item_3]} />

        <View style={[vibrationStyle.item, vibrationStyle.item_3]}>
          <Text style={vibrationStyle.title}>
            Cuatri-
            {'\n'}
            {' '}
            mestre
          </Text>
          <Text style={[vibrationStyle.squad, { backgroundColor: '#66AB8E' }]}>
            {consultant.calcCurrentQuarter(date.month, date.year)}
            {consultant.calcCurrentQuarterISK(date.month, date.year)}
          </Text>
        </View>

        <View style={[vibrationStyle.space_3, vibrationStyle.borderSpace, vibrationStyle.item_3]} />
        <View style={[vibrationStyle.borderR, vibrationStyle.item_4]} />

        <View style={[vibrationStyle.item, vibrationStyle.item_4]}>
          <Text style={vibrationStyle.title}>
            Mes
            {'\n'}
            {' '}
            Personal
          </Text>
          <Text style={[vibrationStyle.squad, { backgroundColor: '#E7B62C' }]}>
            {consultant.calcPersonalMonth(date)}
            {consultant.calcPersonalMonthISK(date)}
          </Text>
        </View>

        <View style={[vibrationStyle.space_4, vibrationStyle.borderSpace, vibrationStyle.item_4]} />
        <View style={[vibrationStyle.borderR, vibrationStyle.item_5]} />

        <View style={[vibrationStyle.item, vibrationStyle.item_5]}>
          <Text style={vibrationStyle.title}>
            Semana
            {'\n'}
            {' '}
            Personal
          </Text>
          <Text style={[vibrationStyle.squad, { backgroundColor: '#52B8C8' }]}>
            {consultant.calcPersonalWeek(date)}
            {consultant.calcPersonalWeekISK(date)}
          </Text>
        </View>

        <View style={[vibrationStyle.space_5, vibrationStyle.borderSpace, vibrationStyle.item_5]} />
        <View style={[vibrationStyle.borderR, vibrationStyle.item_6]} />

        <View style={[vibrationStyle.item, vibrationStyle.item_6]}>
          <Text style={vibrationStyle.title}>
            Día
            {'\n'}
            {' '}
            Personal
          </Text>
          <Text style={[vibrationStyle.squad, { backgroundColor: '#FA8072' }]}>
            {consultant.calcPersonalDay(date)}
            {consultant.calcPersonalDayISK(date)}
          </Text>
        </View>

      </View>
    </View>
  );
}

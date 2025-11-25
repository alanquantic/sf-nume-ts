import useConsult from '@/hooks/useConsult';
import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

const quaterY = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '280px',
    left: '10px',
    right: '10px',
    fontSize: '7px',
    width: '523px',
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
    height: '224px',
    padding: '8px',
    position: 'relative',
  },
  item: {
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#BFBFBF',
    textAlign: 'center',
    paddingTop: '2px',
    zIndex: '2',
    fontFamily: 'Open Sans',
    color: '#7E7E7E',
  },
  backQ1: {
    position: 'absolute',
    width: '50px',
    height: '65px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '27px',

  },
  backQ2: {
    position: 'absolute',
    width: '50px',
    height: '52px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '92px',

  },
  backQ3: {
    position: 'absolute',
    width: '50px',
    height: '52px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '142px',
  },
  pos1: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '27px',
  },
  pos2: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '40px',
  },
  pos3: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '53px',
  },
  pos4: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '66px',
  },
  pos5: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '79px',
  },
  pos6: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '92px',
  },
  pos7: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '105px',
  },
  pos8: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '118px',
  },
  pos9: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '131px',
  },
  pos10: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '144px',
  },
  pos11: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '157px',
  },
  pos12: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '170px',
  },
  pos13: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '183px',
  },
  itemQ1: {
    width: '50px',
    height: '65px',
    border: '1px',
    borderColor: '#BFBFBF',
    textAlign: 'center',
    zIndex: '2',
    fontFamily: 'Open Sans',
    fontSize: '25px',
    color: '#7E7E7E',
    paddingTop: '8px',
  },
  itemQ23: {
    width: '50px',
    height: '52px',
    border: '1px',
    borderColor: '#BFBFBF',
    textAlign: 'center',
    zIndex: '2',
    fontFamily: 'Open Sans',
    fontSize: '25px',
    color: '#7E7E7E',
    paddingTop: '6px',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bg_main: {
    backgroundColor: '#320033',
    color: '#fff',
    fontWeight: 'bold',
  },
  bg_main_select: {
    backgroundColor: '#320033',
    color: '#E3AC5A',
    fontWeight: 'bold',
  },
  bg_sec: {
    backgroundColor: '#AD99AD',
  },
  font_1: {
    backgroundColor: '#D6D6D6',
    fontWeight: 'bold',
  },
  font_2: {
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
  },
  lineEnero: {
    height: '2px',
    width: '500px',
    zIndex: '9',
    backgroundColor: '#EBD398',
    position: 'absolute',
    left: '0px',
  },
  datePos1Up: {
    position: 'absolute',
    top: '22px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos1Down: {
    position: 'absolute',
    top: '74px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos2Up: {
    position: 'absolute',
    top: '89px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos2Down: {
    position: 'absolute',
    top: '126px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos3Up: {
    position: 'absolute',
    top: '139px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos3Down: {
    position: 'absolute',
    top: '178px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
});
function FontSelect({ consultant }: { consultant: Person }) {
  const { t } = useTranslation();
  const listOfMonths = consultant.getCustomMonths();
  const indexOfMonth = listOfMonths.findIndex((i) => i === capitalize(t('months.january') as string));
  if (indexOfMonth === 0) {
    return (
      <>
        <Text style={[quaterY.backQ1, { left: '257px' }]} />
        <Text style={[quaterY.backQ2, { left: '257px' }]} />
        <Text style={[quaterY.pos10, { left: '257px' }]} />
        <Text style={[quaterY.pos11, { left: '257px' }]} />
        <Text style={[quaterY.pos12, { left: '257px' }]} />
        {(consultant.getDayOfBirth() > 1)
          ? (
            <>
              <Text style={[quaterY.pos13, { left: '257px' }]} />
              <Text style={[quaterY.lineEnero, { top: '27px' }]} />
            </>
          )
          : (
            <>
              <Text style={[quaterY.pos13, { left: '207px', height: '16px' }]} />
              <Text style={[quaterY.lineEnero, { top: '183px' }]} />
            </>
          )}
      </>
    );
  }
  if (indexOfMonth === 1) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '200px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos1, { left: '250px' }]} />
        <Text style={[quaterY.pos2, { left: '200px' }]} />
        <Text style={[quaterY.pos3, { left: '200px' }]} />
        <Text style={[quaterY.pos4, { left: '200px' }]} />
        <Text style={[quaterY.pos5, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '40px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 2) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '200px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos1, { left: '250px' }]} />
        <Text style={[quaterY.pos2, { left: '250px' }]} />
        <Text style={[quaterY.pos3, { left: '200px' }]} />
        <Text style={[quaterY.pos4, { left: '200px' }]} />
        <Text style={[quaterY.pos5, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '53px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 3) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '200px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos1, { left: '250px' }]} />
        <Text style={[quaterY.pos2, { left: '250px' }]} />
        <Text style={[quaterY.pos3, { left: '250px' }]} />
        <Text style={[quaterY.pos4, { left: '200px' }]} />
        <Text style={[quaterY.pos5, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '66px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 4) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '200px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos1, { left: '250px' }]} />
        <Text style={[quaterY.pos2, { left: '250px' }]} />
        <Text style={[quaterY.pos3, { left: '250px' }]} />
        <Text style={[quaterY.pos4, { left: '200px' }]} />
        <Text style={[quaterY.pos5, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '79px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 5) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ2, { left: '200px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '92px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 6) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos6, { left: '250px' }]} />
        <Text style={[quaterY.pos7, { left: '200px' }]} />
        <Text style={[quaterY.pos8, { left: '200px' }]} />
        <Text style={[quaterY.pos9, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '105px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 7) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos6, { left: '250px' }]} />
        <Text style={[quaterY.pos7, { left: '250px' }]} />
        <Text style={[quaterY.pos8, { left: '200px' }]} />
        <Text style={[quaterY.pos9, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '118px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 8) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.pos6, { left: '250px' }]} />
        <Text style={[quaterY.pos7, { left: '250px' }]} />
        <Text style={[quaterY.pos8, { left: '250px' }]} />
        <Text style={[quaterY.pos9, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '131px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 9) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ2, { left: '250px' }]} />
        <Text style={[quaterY.backQ3, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '144px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 10) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ2, { left: '250px' }]} />
        <Text style={[quaterY.pos10, { left: '250px' }]} />
        <Text style={[quaterY.pos11, { left: '200px' }]} />
        <Text style={[quaterY.pos12, { left: '200px' }]} />
        <Text style={[quaterY.pos13, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '157px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 11) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '250px' }]} />
        <Text style={[quaterY.backQ2, { left: '250px' }]} />
        <Text style={[quaterY.pos10, { left: '250px' }]} />
        <Text style={[quaterY.pos11, { left: '250px' }]} />
        <Text style={[quaterY.pos12, { left: '200px' }]} />
        <Text style={[quaterY.pos13, { left: '200px' }]} />
        <Text style={[quaterY.lineEnero, { top: '170px' }]} />
      </View>
    );
  }
  return <View />;
}

function Ciclo({ consultant, cycleNineY }: { consultant: Person, cycleNineY: number[] }) {
  const { t } = useTranslation();
  const { calculationDate } = useConsult();
  const listOfMonths = consultant.getCustomMonths();
  const indexOfMonth = listOfMonths.findIndex((i) => i === capitalize(t('months.january') as string));

  return (
    <View style={quaterY.flex}>
      {cycleNineY.map((m: number) => (
        <View>
          {(m === calculationDate.year) ? <Text style={[quaterY.item, quaterY.bg_main_select]}>{m}</Text> : <Text style={[quaterY.item, quaterY.bg_main]}>{m}</Text>}
          {(m === calculationDate.year) ? (
            <Text style={[quaterY.item, quaterY.bg_sec, { color: '#000' }, { fontWeight: 'bold' }]}>
              {consultant.calcPersonalYear(m)}
              {consultant.calcPersonalYearISK(m)}
            </Text>
          ) : (
            <Text style={[quaterY.item, quaterY.bg_sec, { color: '#000' }]}>
              {consultant.calcPersonalYear(m)}
              {consultant.calcPersonalYearISK(m)}
            </Text>
          )}
          <Text style={quaterY.itemQ1}>
            {consultant.getQuarterOne()}
            {consultant.getQuarterOneISK()}
          </Text>
          <Text style={quaterY.itemQ23}>
            {consultant.getQuarterTwo(m)}
            {consultant.getQuarterTwoISK(m)}
          </Text>
          <Text style={quaterY.itemQ23}>
            {consultant.getQuarterThree(m)}
            {consultant.getQuarterThreeISK(m)}
          </Text>
          {indexOfMonth >= 0 && indexOfMonth < 5 ? <Text style={quaterY.datePos1Up}>{m}</Text> : ''}
          {indexOfMonth !== 0 && indexOfMonth < 5 ? <Text style={quaterY.datePos1Down}>{m + 1}</Text> : ''}
          {indexOfMonth > 4 && indexOfMonth < 9 ? <Text style={quaterY.datePos2Up}>{m}</Text> : ''}
          {indexOfMonth > 4 && indexOfMonth < 9 ? <Text style={quaterY.datePos2Down}>{m + 1}</Text> : ''}
          {indexOfMonth > 8 && indexOfMonth < 12 ? <Text style={quaterY.datePos3Up}>{m}</Text> : ''}
          {indexOfMonth > 8 && indexOfMonth < 12 ? <Text style={quaterY.datePos3Down}>{m + 1}</Text> : ''}
        </View>
      ))}
    </View>
  );
}

export default function VibrationTimeQuarterY({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  const cycleNineY = consultant.getNineYearCycle(date);
  const listOfMonths = consultant.getCustomMonths();
  const m1 = listOfMonths[0];
  const m2 = listOfMonths[1];
  const m3 = listOfMonths[2];
  const m4 = listOfMonths[3];
  const m5 = listOfMonths[4];
  const m6 = listOfMonths[5];
  const m7 = listOfMonths[6];
  const m8 = listOfMonths[7];
  const m9 = listOfMonths[8];
  const m10 = listOfMonths[9];
  const m11 = listOfMonths[10];
  const m12 = listOfMonths[11];
  const m13 = listOfMonths[12];

  return (
    <View style={quaterY.container}>
      <View style={quaterY.bar}>
        <Text>Cuatrimestres por Año</Text>
      </View>
      <View style={quaterY.wrap}>
        <FontSelect consultant={consultant} />
        <View style={quaterY.flex}>
          <View>
            <Text style={[quaterY.item, quaterY.bg_main]}>Año Calend</Text>
            <Text style={[quaterY.item, quaterY.bg_sec, { fontWeight: 'bold' }, { color: '#000' }]}>A. Personal</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m1}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m2}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m3}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m4}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m5}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m6}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m7}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m8}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m9}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m10}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m11}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m12}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m13}</Text>
          </View>
          <Ciclo cycleNineY={cycleNineY} consultant={consultant} />
        </View>
      </View>
    </View>
  );
}

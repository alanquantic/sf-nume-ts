import Person, { SplittedDate } from '@/resources/Person';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalize } from 'lodash';

export const lifePath = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '339px',
    left: '11px',
    fontSize: '7px',
    width: '533px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
  },
  personalYears: {
    position: 'absolute',
    left: '173px',
    width: '317px',
    top: '12px',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: '20px',
    height: '20px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    backgroundColor: '#BEE1D1',
  },
  year: {
    position: 'absolute',
    top: '20px',
    left: '-10px',
    width: '45px',
    height: '12px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '8px',
  },
  itemWrap: {
    fontSize: '12px',
  },
});

export default function LifePathQuarters({ consultant, now }: { consultant: Person, now: SplittedDate }) {
  // @TODO: refactor

  let m1; let m2; let m3; let m4; let cm1; let cm2; let cm3; let
    cm4 = '';
  const listOfMonths = consultant.getCustomMonths();
  // Find the birth month index (0-11) in the custom months array
  const birthMonth = consultant.getMonthOfBirth(); // 0-11
  const index = birthMonth;

  const quarter1 = consultant.getQuarterOne();
  const quarter2 = consultant.getQuarterTwo(now.year);
  const quarter3 = consultant.getQuarterThree(now.year);

  const lastYear = now.year - 1;

  const quarter1LastYear = consultant.getQuarterOne();
  const quarter2LastYear = consultant.getQuarterTwo(lastYear);
  const quarter3LastYear = consultant.getQuarterThree(lastYear);

  const quarter1Karmico = consultant.getQuarterOneISK();
  const quarter2Karmico = consultant.getQuarterTwoISK(now.year);
  const quarter3Karmico = consultant.getQuarterThreeISK(now.year);
  const quarter2KarmicoLast = consultant.getQuarterTwoISK(lastYear);
  const quarter3KarmicoLast = consultant.getQuarterThreeISK(lastYear);

  let ism1 = false; let ism2 = false; let ism3 = false; let
    ism4 = false;

  const allMonth = getAllMonths();

  const monthIndex = allMonth.findIndex((i:string) => i === format((new Date(now.year, now.month, now.day)), 'MMMM', { locale: es }));
  const actualMonth = allMonth[monthIndex];

  const currentMonth = listOfMonths.findIndex((i) => i === capitalize(actualMonth));
  const listOfMonths3 = listOfMonths.map((e) => e.substring(0, 3));

  switch (index) {
    case 0:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[4]}`;
      m2 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      m3 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      cm1 = quarter1 + quarter1Karmico;
      cm2 = quarter2 + quarter2Karmico;
      cm3 = quarter3 + quarter3Karmico;
      if (currentMonth >= 0 && currentMonth <= 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      break;
    case 1:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[4]}`;
      m2 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      m3 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m4 = listOfMonths3[index - 1];
      cm1 = quarter1LastYear + quarter1Karmico;
      cm2 = quarter2LastYear + quarter2KarmicoLast;
      cm3 = quarter3LastYear + quarter3KarmicoLast;
      cm4 = quarter1 + quarter1Karmico;
      if (currentMonth >= 1 && currentMonth <= 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      if (currentMonth === 0) { ism4 = true; }
      break;
    case 2:
    case 3:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[4]}`;
      m2 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      m3 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m4 = `${listOfMonths3[0]} - ${listOfMonths3[index - 1]}`;
      cm1 = quarter1LastYear + quarter1Karmico;
      cm2 = quarter2LastYear + quarter2KarmicoLast;
      cm3 = quarter3LastYear + quarter3KarmicoLast;
      cm4 = quarter1 + quarter1Karmico;
      if (currentMonth >= 3 && currentMonth <= 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      if (currentMonth >= 0 && currentMonth <= 2) { ism4 = true; }
      break;
    case 4:
      m1 = `${listOfMonths3[index]}`;
      m2 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      m3 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m4 = `${listOfMonths3[0]} - ${listOfMonths3[index - 1]}`;
      cm1 = quarter1LastYear + quarter1Karmico;
      cm2 = quarter2LastYear + quarter2KarmicoLast;
      cm3 = quarter3LastYear + quarter3KarmicoLast;
      cm4 = quarter1 + quarter1Karmico;
      if (currentMonth === 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      if (currentMonth >= 0 && currentMonth <= 7) { ism4 = true; }
      break;
    case 5:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[8]}`;
      m2 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m3 = `${listOfMonths3[12]} - ${listOfMonths3[4]}`;
      cm1 = quarter2LastYear + quarter2KarmicoLast;
      cm2 = quarter3LastYear + quarter3KarmicoLast;
      cm3 = quarter1 + quarter1Karmico;
      if (currentMonth >= 5 && currentMonth <= 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }

      break;
    case 6:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[8]}`;
      m2 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m3 = `${listOfMonths3[12]} - ${listOfMonths3[4]}`;
      m4 = listOfMonths3[index - 1];
      cm1 = quarter2LastYear + quarter2KarmicoLast;
      cm2 = quarter3LastYear + quarter3KarmicoLast;
      cm3 = quarter1 + quarter1Karmico;
      cm4 = quarter2 + quarter2Karmico;
      if (currentMonth >= 6 && currentMonth <= 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }
      if (currentMonth === 5) { ism4 = true; }
      break;
    case 7:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[8]}`;
      m2 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m3 = `${listOfMonths3[12]} - ${listOfMonths3[4]}`;
      m4 = `${listOfMonths3[5]} - ${listOfMonths3[index - 1]}`;
      cm1 = quarter2LastYear + quarter2KarmicoLast;
      cm2 = quarter3LastYear + quarter3KarmicoLast;
      cm3 = quarter1 + quarter1Karmico;
      cm4 = quarter2 + quarter2Karmico;
      if (currentMonth >= 7 && currentMonth <= 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }
      if (currentMonth >= 5 && currentMonth <= index - 1) { ism4 = true; }
      break;
    case 8:
      m1 = `${listOfMonths3[index]}`;
      m2 = `${listOfMonths3[9]} - ${listOfMonths3[11]}`;
      m3 = `${listOfMonths3[12]} - ${listOfMonths3[4]}`;
      m4 = `${listOfMonths3[5]} - ${listOfMonths3[index - 1]}`;

      cm1 = quarter2LastYear + quarter2KarmicoLast;
      cm2 = quarter3LastYear + quarter3KarmicoLast;
      cm3 = quarter1 + quarter1Karmico;
      cm4 = quarter2 + quarter2Karmico;
      if (currentMonth === 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }
      if (currentMonth >= 5 && currentMonth <= 7) { ism4 = true; }
      break;
    case 9:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[11]}`;
      m2 = `${listOfMonths3[0]} - ${listOfMonths3[4]}`;
      m3 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      cm1 = quarter3LastYear + quarter3KarmicoLast;
      cm2 = quarter1 + quarter1Karmico;
      cm3 = quarter2 + quarter2Karmico;
      if (currentMonth >= index && currentMonth <= 11) { ism1 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism2 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism3 = true; }

      break;
    case 10:
      m1 = `${listOfMonths3[index]} - ${listOfMonths3[11]}`;
      m2 = `${listOfMonths3[0]} - ${listOfMonths3[4]}`;
      m3 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      m4 = listOfMonths3[index - 1];
      cm1 = quarter3LastYear + quarter3KarmicoLast;
      cm2 = quarter1 + quarter1Karmico;
      cm3 = quarter2 + quarter2Karmico;
      cm4 = quarter3 + quarter3Karmico;
      if (currentMonth >= index && currentMonth <= 11) { ism1 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism2 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism3 = true; }
      if (currentMonth === index - 1) { ism4 = true; }
      break;
    case 11:
      m1 = `${listOfMonths3[index]}`;
      m2 = `${listOfMonths3[0]} - ${listOfMonths3[4]}`;
      m3 = `${listOfMonths3[5]} - ${listOfMonths3[8]}`;
      m4 = `${listOfMonths3[9]} - ${listOfMonths3[index - 1]}`;
      cm1 = quarter3LastYear + quarter3KarmicoLast;
      cm2 = quarter1 + quarter1Karmico;
      cm3 = quarter2 + quarter2Karmico;
      cm4 = quarter3 + quarter3Karmico;
      if (currentMonth === index) { ism1 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism2 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism3 = true; }
      if (currentMonth >= 9 && currentMonth <= index - 1) { ism4 = true; }
      break;
    default:
      break;
  }

  return (
    <View style={lifePath.container}>
      <View style={lifePath.wrap}>
        <View style={lifePath.personalYears}>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${ism1 ? '#66AB8E' : '#BEE1D1'}` }]}>
              <Text>
                {' '}
                {cm1}
                {' '}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                {' '}
                {m1?.toUpperCase()}
                {' '}
              </Text>
            </View>
          </View>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${ism2 ? '#66AB8E' : '#BEE1D1'}` }]}>
              <Text>
                {' '}
                {cm2}
                {' '}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                {' '}
                {m2?.toUpperCase()}
                {' '}
              </Text>
            </View>
          </View>
          <View style={lifePath.itemWrap}>
            <View style={[lifePath.item, { backgroundColor: `${ism3 ? '#66AB8E' : '#BEE1D1'}` }]}>
              <Text>
                {' '}
                {cm3}
                {' '}
              </Text>
            </View>
            <View style={lifePath.year}>
              <Text>
                {' '}
                {m3?.toUpperCase()}
                {' '}
              </Text>
            </View>
          </View>
          {(m4 !== undefined) && (
            <View style={lifePath.itemWrap}>
              <View style={[lifePath.item, { backgroundColor: `${ism4 ? '#66AB8E' : '#BEE1D1'}` }]}>
                <Text>{cm4}</Text>
              </View>
              <View style={lifePath.year}>
                <Text>{m4.toUpperCase()}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

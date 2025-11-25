import { AnnualReturn } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const aReturn = StyleSheet.create({
  table: {
    position: 'absolute',
  },
  tableTitle: {
    fontSize: 8,
    position: 'absolute',
    color: '#fff',
  },
  tableItem: {
    fontSize: 8,
    position: 'absolute',
    backgroundColor: '#00000050',
    color: '#7E7E7E',
  },
  personalYear: {
    position: 'absolute',
    width: '81px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '8px',
    textAlign: 'center',

    // backgroundColor: '#00000050',
  },
  circle: {
    // backgroundColor: '#00000050',
    position: 'absolute',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '8px',
  },
});
type AnnualReturnProps = {
  annualReturn: AnnualReturn;
  top: number;
  left: number;
  personalYear: number;
  yearsOld: number;
  year: number;
};
const calcAge = (age: number, year: number) => {
  let Age = age;
  let Year = year;

  const yearsOld = [Age];
  const years = [Year];

  while (Age - 9 > 0 && yearsOld.length < 9) {
    Age -= 9;
    yearsOld.push(Age);

    Year -= 9;
    years.push(Year);
  }
  if (yearsOld.length < 9) {
    Age = age;
    Year = year;
    while (Age + 9 > 0 && yearsOld.length < 9) {
      Age += 9;
      yearsOld.unshift(Age);
      Year += 9;
      years.unshift(Year);
    }
  }
  yearsOld.reverse();
  years.reverse();
  const table = yearsOld.map((e, i) => [e, years[i]]);
  return Object.entries(table);
};

export default function AnnualReturnPDF({
  annualReturn, top, left, personalYear, yearsOld, year,
}: AnnualReturnProps) {
  return (
    <>
      <View style={[aReturn.circle, { top: 67 + top, left: 116 + left }]}>
        <Text>{annualReturn.F}</Text>
      </View>
      <View style={[aReturn.circle, { top: 67 + top, left: 116 + left }]}>
        <Text>{annualReturn.F}</Text>
      </View>
      <View style={[aReturn.circle, { top: 89 + top, left: 92 + left }]}>
        <Text>{annualReturn.D}</Text>
      </View>
      <View style={[aReturn.circle, { top: 89 + top, left: 116 + left }]}>
        <Text>{annualReturn.G}</Text>
      </View>
      <View style={[aReturn.circle, { top: 89 + top, left: 140 + left }]}>
        <Text>{annualReturn.E}</Text>
      </View>
      <View style={[aReturn.circle, { top: 112 + top, left: 70 + left }]}>
        <Text>{annualReturn.A}</Text>
      </View>
      <View style={[aReturn.circle, { top: 112 + top, left: 116 + left }]}>
        <Text>{annualReturn.B}</Text>
      </View>
      <View style={[aReturn.circle, { top: 111 + top, left: 162 + left }]}>
        <Text>{annualReturn.C}</Text>
      </View>
      <View style={[aReturn.circle, { top: 135 + top, left: 116 + left }]}>
        <Text>{annualReturn.H}</Text>
      </View>
      <View style={[aReturn.personalYear, { top: 38 + top, left: 85 + left }]}>
        <Text>Año Personal</Text>
        <Text>{personalYear}</Text>
      </View>
      <View style={[aReturn.table]}>
        <Text style={[aReturn.tableTitle, { top: 43 + top, left: 22 + left }]}>Año</Text>
        <Text style={[aReturn.tableTitle, { top: 43 + top, left: 22 + left + 22 }]}>Edad</Text>
      </View>
      {
        calcAge(yearsOld, year).map((e, i) => (
          <View style={[aReturn.table]}>
            <Text style={[aReturn.tableItem, { top: 53 + top + (i * 11.5), left: 22 + left }]}>{e[1][1]}</Text>
            <Text style={[aReturn.tableItem, { top: 53 + top + (i * 11.5), left: 30 + left + 20 }]}>{e[1][0]}</Text>
          </View>
        ))
      }
    </>
  );
}

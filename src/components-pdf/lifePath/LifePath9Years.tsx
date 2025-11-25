import Person, { SplittedDate } from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const lifePath = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '24px',
    left: '10px',
    fontSize: '7px',
    width: '533px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  item: {
    position: 'absolute',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  year: {
    position: 'absolute',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    fontSize: '12px',
  },
  phrase: {
    position: 'absolute',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '7px',
  },
  currentYear: {
    left: '25px',
    top: '23px',
    width: '50px',
  },
  currentYear_1: {
    top: '31px',
    left: '116px',
    width: '22px',
  },
  currentYear_2: {
    top: '31px',
    left: '217px',
    width: '22px',
  },
  currentYear_3: {
    top: '31px',
    left: '317px',
    width: '22px',
  },
  currentYear_4: {
    top: '31px',
    left: '415px',
    width: '22px',
  },
  currentYearVibration: {
    left: '21px',
    top: '43px',
    width: '50px',
    height: '19px',
    fontSize: '12px',
  },
  currentYearVibration_1: {
    top: '41px',
    left: '116px',
  },
  currentYearVibration_2: {
    top: '41px',
    left: '217px',
  },
  currentYearVibration_3: {
    top: '41px',
    left: '317px',
  },
  currentYearVibration_4: {
    top: '41px',
    left: '415px',
  },
  currentYearPhrase: {
    top: '85px',
    left: '10px',
    width: '70px',
  },
  currentYearPhrase_1: {
    top: '101px',
    left: '90px',
    width: '70px',
  },
  currentYearPhrase_2: {
    top: '85px',
    left: '190px',
    width: '70px',
  },
  currentYearPhrase_3: {
    top: '101px',
    left: '290px',
    width: '70px',
  },
  currentYearPhrase_4: {
    top: '85px',
    left: '390px',
    width: '70px',
  },
});

export default function LifePath9Years({ consultant, now, translations }: { consultant: Person, now: SplittedDate, translations: { yearLabel: string, cycles: Record<number, string[]> } }) {
  const personalYear = consultant.calcPersonalYear(now.year);
  const yearOfBirth = consultant.getYearOfBirth();
  const cyclePhrases = translations.cycles[personalYear] || [];

  return (
    <View style={lifePath.container}>
      <View style={lifePath.wrap}>
        <View style={[lifePath.item, lifePath.currentYear]}>
          <Text>{now.year}</Text>
        </View>
        <View style={[lifePath.item, lifePath.currentYearVibration]}>
          <Text>
            {translations.yearLabel}
            {personalYear}
          </Text>
        </View>
        <View style={[lifePath.phrase, lifePath.currentYearPhrase]}>
          <Text>{cyclePhrases[0]}</Text>
          <Text>{cyclePhrases[1]}</Text>
          <Text>{cyclePhrases[2]}</Text>
        </View>
        {(now.year - 27 > yearOfBirth)
          && (
          <>
            <View style={[lifePath.year, lifePath.currentYear_1]}>
              <Text>{now.year - 27}</Text>
            </View>
            <View style={[lifePath.circle, lifePath.currentYearVibration_1]}>
              <Text>{personalYear}</Text>
            </View>
            <View style={[lifePath.phrase, lifePath.currentYearPhrase_1]}>
              <Text>{cyclePhrases[3]}</Text>
            </View>
          </>
          )}
        {(now.year - 18 > yearOfBirth)
          && (
          <>
            <View style={[lifePath.year, lifePath.currentYear_2]}>
              <Text>{now.year - 18}</Text>
            </View>
            <View style={[lifePath.circle, lifePath.currentYearVibration_2]}>
              <Text>{personalYear}</Text>
            </View>
            <View style={[lifePath.phrase, lifePath.currentYearPhrase_2]}>
              <Text>{cyclePhrases[4]}</Text>
            </View>
          </>
          )}
        {(now.year - 9 > yearOfBirth)
          && (
          <>
            <View style={[lifePath.year, lifePath.currentYear_3]}>
              <Text>{now.year - 9}</Text>
            </View>
            <View style={[lifePath.circle, lifePath.currentYearVibration_3]}>
              <Text>{personalYear}</Text>
            </View>
            <View style={[lifePath.phrase, lifePath.currentYearPhrase_3]}>
              <Text>{cyclePhrases[5]}</Text>
            </View>
          </>
          )}
        <View style={[lifePath.year, lifePath.currentYear_4]}>
          <Text>{now.year}</Text>
        </View>
        <View style={[lifePath.circle, lifePath.currentYearVibration_4]}>
          <Text>{personalYear}</Text>
        </View>
        <View style={[lifePath.phrase, lifePath.currentYearPhrase_4]}>
          <Text>{cyclePhrases[6]}</Text>
        </View>
      </View>
    </View>
  );
}

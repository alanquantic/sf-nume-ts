import Synastry, { SplittedDate } from '@/resources/Synastry';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

interface SynastryDataProps {
  synastry: Synastry;
  date: SplittedDate;
  horizontal: boolean;
}

export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '30px',
    left: '15px',
    width: '533px',
    // backgroundColor: 'red'
  },
  textName: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    width: '240px',
    left: '80px',
  },
  textBirth: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    width: '50px',
    right: '65px',
  },
  textAge: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    width: '20px',
    right: '10px',
  },
  partners: {
    display: 'flex',
    flexDirection: 'row',
  },
  textYear: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    left: '140px',
    top: 75,
  },
});

export default function SynastryData({ synastry, date, horizontal }: SynastryDataProps) {
  const { consultant, partner } = synastry;
  const yearMet = synastry.getYearMeet();

  if (horizontal) {
    return (
      <View style={[data.container, {
        transform: 'rotate(-90deg)', width: 660, top: 320, left: -310,
      }]}
      >
        <View style={data.partners}>
          <Text style={[data.textName, { top: 18 }, { left: 50 }]}>{consultant.fullName}</Text>
          <Text style={[data.textBirth, { top: 18 }, { right: 220 }]}>{consultant.getFormBirthDate()}</Text>
          <Text style={[data.textAge, { top: 18 }, { right: 175 }]}>{consultant.getYearsOld(date.year)}</Text>
        </View>
        <View style={data.partners}>
          <Text style={[data.textName, { top: 45 }, { left: 50 }]}>{partner.fullName}</Text>
          <Text style={[data.textBirth, { top: 45 }, { right: 220 }]}>{partner.getFormBirthDate()}</Text>
          <Text style={[data.textAge, { top: 45 }, { right: 175 }]}>{partner.getYearsOld(date.year)}</Text>
        </View>
        <View>
          <Text style={[data.textYear, { top: 45, left: 525 }]}>{yearMet}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[data.container]}>
      <View style={data.partners}>
        <Text style={[data.textName, { top: 18 }]}>{consultant.fullName}</Text>
        <Text style={[data.textBirth, { top: 18 }]}>{consultant.getFormBirthDate()}</Text>
        <Text style={[data.textAge, { top: 18 }]}>{consultant.getYearsOld(date.year)}</Text>
      </View>
      <View style={data.partners}>
        <Text style={[data.textName, { top: 45 }]}>{partner.fullName}</Text>
        <Text style={[data.textBirth, { top: 45 }]}>{partner.getFormBirthDate()}</Text>
        <Text style={[data.textAge, { top: 45 }]}>{partner.getYearsOld(date.year)}</Text>
      </View>
      <View>
        <Text style={[data.textYear]}>{yearMet}</Text>
      </View>
      {/* <Text>-</Text> */}
    </View>
  );
}

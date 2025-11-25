import Group from '@/resources/Group';
import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const style = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '527px',
    top: '20px',
    left: '15px',
    right: '10px',
  },
  person: {
    top: '20px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
  },
  name: {
    left: '80px',
    width: '200px',
  },
  birthday: {
    right: '55px',
    width: '50px',
  },
  age: {
    right: '5px',
    width: '20px',
  },
  date: {
    width: '100px',
    left: '130px',
    top: '190px',
  },
});

export function GroupMembers({ members }: { members: Person[] }) {
  const cap = members;
  return (
    <>
      {cap.map((data, i) => (
        <View style={style.row}>
          <Text style={[style.text, style.name, { top: 0 + (21 * i) }]}>{data.fullName}</Text>
          <Text style={[style.text, style.birthday, { top: 0 + (21 * i) }]}>{data.getFormBirthDate()}</Text>
          <Text style={[style.text, style.age, { top: 0 + (21 * i) }]}>{data.getYearsOld()}</Text>
        </View>
      ))}
    </>
  );
}

export default function GroupData({ groupConsult }: { groupConsult: Group }) {
  return (
    <View style={style.container}>
      <View style={style.person}>
        <GroupMembers members={groupConsult.group} />
      </View>
      <View style={style.date}>
        <Text style={style.text}>{groupConsult.groupDate}</Text>
      </View>
    </View>
  );
}

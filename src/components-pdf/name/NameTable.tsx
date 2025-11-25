import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '115px',
    left: '11px',
    fontSize: '7px',
    width: '536px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '8px',
    top: '39px',
  },
  name: {
    position: 'absolute',
    top: '16px',
    left: '33px',
    // backgroundColor: '#00000090',
    width: '14px',
    height: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soul: {
    left: '90px',
  },
  soul_expresion: {
    left: '161px',
  },
});
type UnGroupName = {
  v: number;
  L: string;
  c: number;
};

export default function NameTable({ consultant }: { consultant: Person }) {
  const { name, lastName, scdLastName } = consultant;
  const names = name.split(' ');
  const unGroupNames = names.map((el: string) => ({
    name: consultant.getUngroupName(el),
    values: consultant.getUngroupNameValues(el),
    total: consultant.getUngroupNameTotal(el),
  }));

  const unGroupLast = consultant.getUngroupName(lastName);
  const unGroupLastV = consultant.getUngroupNameValues(lastName);
  const unGroupLastT = consultant.getUngroupNameTotal(lastName);

  for (let index = unGroupLast.length; index < 28; index += 1) {
    unGroupLast.push({} as UnGroupName);
  }

  const unGroupSCDLast = consultant.getUngroupName(scdLastName);
  const unGroupSCDLastV = consultant.getUngroupNameValues(scdLastName);
  const unGroupSCDLastT = consultant.getUngroupNameTotal(scdLastName);

  for (let index = unGroupSCDLast.length; index < 28; index += 1) {
    unGroupSCDLast.push({} as UnGroupName);
  }

  const unGroupName = consultant.getUngroupName(name);
  const unGroupNameV = consultant.getUngroupNameValues(name);
  const unGroupNameT = consultant.getUngroupNameTotal(name);

  for (let index = unGroupName.length; index < 28; index += 1) {
    unGroupName.push({} as UnGroupName);
  }

  const table = (nam: UnGroupName[]) => nam.map((el, i) => (
    <>
      <View style={[pinnacleName.name, { top: 16, left: 33 + (i * 14) }]}>
        <Text>
          {el.v !== 0 ? el.v : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: 30, left: 33 + (i * 14) }]}>
        <Text>
          {el.L}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: 44, left: 33 + (i * 14) }]}>
        <Text>
          {el.c !== 0 ? el.c : ''}
        </Text>
      </View>
    </>
  ));
  const results = (values: UnGroupName[], total: UnGroupName[], top = 0) => (
    <>
      <View style={[pinnacleName.name, { top: (top + 14), left: 468 }]}>
        <Text>
          {values[0].v !== 0 ? values[0].v : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 43), left: 468 }]}>
        <Text>
          {values[0].c !== 0 ? values[0].c : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 14), left: 489 }]}>
        <Text>
          {total[0].v !== 0 ? total[0].v : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 28), left: 489 }]}>
        <Text>
          {total[0].L}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 43), left: 489 }]}>
        <Text>
          {total[0].c !== 0 ? total[0].c : ''}
        </Text>
      </View>
    </>
  );

  return (
    <View style={pinnacleName.container}>
      {unGroupNames.map((ungroup, i) => (
        <>
          <View style={[pinnacleName.wrap, { top: (63 * i) }]}>
            {table(ungroup.name)}
          </View>
          <View style={[pinnacleName.wrap, { top: (63 * i) }]}>
            {results(ungroup.values, ungroup.total.map((el) => ({ ...el, L: el.L.toString() })))}
          </View>
        </>
      ))}

      <View style={[pinnacleName.wrap, { top: 125 }]}>
        {table(unGroupLast)}
      </View>
      <View style={[pinnacleName.wrap, { top: 125 }]}>
        {results(unGroupLastV, unGroupLastT.map((el) => ({ ...el, L: el.L.toString() })))}
      </View>

      <View style={[pinnacleName.wrap, { top: 188 }]}>
        {table(unGroupSCDLast)}
      </View>
      <View style={[pinnacleName.wrap, { top: 188 }]}>
        {results(unGroupSCDLastV, unGroupSCDLastT.map((el) => ({ ...el, L: el.L.toString() })))}
      </View>

      <View style={[pinnacleName.wrap, { top: 251 }]}>
        {table(unGroupName)}
      </View>
      <View style={[pinnacleName.wrap, { top: 252 }]}>
        {results(unGroupNameV, unGroupNameT.map((el) => ({ ...el, L: el.L.toString() })))}
      </View>
    </View>
  );
}

import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

type UnGroupName = {
  v: number;
  L: string;
  c: number;
};
type UnGroup = {
  ungroupNameI: UnGroupName[];
};
type UnGroupNameTotal = {
  v: number;
  L: number;
  c: number;
  vA: number;
  LA: number;
  cA: number;
};

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '360px',
    left: '17px',
    fontSize: '7px',
    width: '271px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#0000ff90',
    position: 'absolute',
    width: '14px',
    height: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '10px',
    top: '63px',
    left: 53,
    border: '1px solid #7E7E7E',
  },
});
export default function CreateBreakdown({ consultant }: { consultant: Person }) {
  const ungroupName: UnGroupName[] = consultant.getUngroupName();
  const ungroupNameT: UnGroupNameTotal[] = consultant.getUngroupNameTotal();

  let ungroup: UnGroup[] = [];
  const split = 32;
  let tables = 0;
  let count = 0;
  do {
    count = (tables + 1) * split;
    const ungroupNameI: UnGroupName[] = ungroupName.slice(tables * split, count);
    while (ungroupNameI.length < 32) {
      ungroupNameI.push({} as UnGroupName);
    }
    ungroup = [
      ...ungroup,
      {
        ungroupNameI,
      },
    ];
    tables += 1;
  } while (count < ungroupName.length);

  const table = (name: UnGroupName[], top = 0) => name.map((el, i) => (
    <>
      <View style={[pinnacleName.circle, { top: 12 + top, left: 34 + (i * 13), backgroundColor: '#e5e5e5' }]}>
        <Text>
          {el.v !== 0 ? el.v : ''}
        </Text>
      </View>
      <View style={[pinnacleName.circle, { top: 26 + top, left: 34 + (i * 13), backgroundColor: '#c2b3c2' }]}>
        <Text>
          {el.L}
        </Text>
      </View>
      <View style={[pinnacleName.circle, { top: 40 + top, left: 34 + (i * 13), backgroundColor: '#e5e5e5' }]}>
        <Text>
          {el.c !== 0 ? el.c : ''}
        </Text>
      </View>
    </>
  ));

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        {ungroup.map((group, i) => table(group.ungroupNameI, i * 51))}

        <View style={[pinnacleName.circle, {
          top: 29, left: 470, width: 20, height: 20, border: 0,
        }]}
        >
          <Text>
            {ungroupNameT[0].v !== 0 ? ungroupNameT[0].v : ''}
          </Text>
        </View>
        <View style={[pinnacleName.circle, {
          top: 58, left: 470, width: 20, height: 20, border: 0,
        }]}
        >
          <Text>
            {ungroupNameT[0].L}
          </Text>
        </View>
        <View style={[pinnacleName.circle, {
          top: 84, left: 470, width: 20, height: 20, border: 0,
        }]}
        >
          <Text>
            {ungroupNameT[0].c !== 0 ? ungroupNameT[0].c : ''}
          </Text>
        </View>

      </View>
    </View>
  );
}

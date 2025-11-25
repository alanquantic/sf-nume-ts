import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '16px',
    left: '35px',
    fontSize: '7px',
    width: '348px',
  },
  wrap: {
    position: 'relative',
  },
  table: {

    position: 'relative',
    transform: 'rotate(-90deg)',
  },
});
export const valuesPlanes = StyleSheet.create({
  bf: {
    backgroundColor: '#F3BDBE',
    borderColor: '#DE6364',
    borderWidth: 1,
  },
  bm: {
    backgroundColor: '#B6D1AD',
    borderColor: '#51A233',
    borderWidth: 1,
  },
  bem: {
    backgroundColor: '#B3CDF2',
    borderColor: '#0D6BE2',
    borderWidth: 1,
  },
  bms: {
    backgroundColor: '#BCA9BD',
    borderColor: '#6A3061',
    borderWidth: 1,
  },
});

export default function NameBalance({ consultant }: { consultant: Person }) {
  const appearances = consultant.getAppearances();

  const balanceExistential = {
    'Plano Físico': {
      v: appearances[4].a + appearances[5].a,
      c: '#de6363',
      cT: 'text-red',
      d: '(Valores 4/22 y 5)',
    },
    'Plano Mental': {
      v: appearances[1].a + appearances[8].a,
      c: '#51A133 ',
      cT: 'text-green',
      d: '(Valores 1 y 8)',
    },
    'Plano Emocional': {
      v: appearances[2].a + appearances[3].a + appearances[6].a,
      c: '#31FFFF',
      cT: 'text-blue',
      d: '(Valores 2/11, 3 y 6)',
    },
    'Plano Espiritual': {
      v: appearances[7].a + appearances[9].a,
      c: '#69306',
      cT: 'text-main',
      d: '(Valores 7 y 9)',
    },
  };

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.table, {
          top: 478, left: 262, display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
        }]}
        >
          {Object.entries(balanceExistential).map((el, i) => (
            <View style={{ textAlign: 'center' }}>
              <View style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '15px',
              }}
              >
                <Text style={[
                  (el[1].cT === 'text-red') && valuesPlanes.bf,
                  (el[1].cT === 'text-green') && valuesPlanes.bm,
                  (el[1].cT === 'text-blue') && valuesPlanes.bem,
                  (el[1].cT === 'text-main') && valuesPlanes.bms,
                  {
                    textAlign: 'center',
                    fontSize: 12,
                    marginRight: 10,
                    marginBottom: 5,
                    paddingTop: 10,
                    width: 30,
                    height: 30,
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  } as any]}
                >
                  {el[1].v}
                </Text>

              </View>
              <Text style={{
                textAlign: 'center', fontSize: 10, marginTop: 10, paddingLeft: '10px',
              }}
              >
                {Object.keys(balanceExistential)[i]}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 6, paddingLeft: '10px' }}>{el[1].d}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text>-</Text>
    </View>
  );
}

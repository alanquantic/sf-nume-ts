import { StyleSheet, View } from '@react-pdf/renderer';

import Person, { SplittedDate } from '@/resources/Person';
import AnnualReturn from './AnnualReturn';

export default function AnnualReturns({ consultant, opts }: { consultant: Person, opts: SplittedDate }) {
  const nextYear = opts.year ? opts.year + 1 : 0;
  const lastYear = opts.year ? opts.year - 1 : 0;
  const annualReturnCurrent = consultant.annualReturn(opts);
  const annualReturnLastYear = consultant.annualReturn({ ...opts, year: lastYear });
  const annualReturnNextYear = consultant.annualReturn({ ...opts, year: nextYear });
  const annualReturn = StyleSheet.create({
    container: {
      // backgroundColor: '#ff0000',
      position: 'absolute',
      top: '75px',
      width: '119px',
      left: '425px',
      fontSize: '10px',

    },
    wrap: {
      position: 'relative',
    },
    return_1: {
      position: 'absolute',
      top: '0px',
      height: '150px',
      width: '119px',
      // backgroundColor: '#ff000012',
    },
    return_2: {
      position: 'absolute',
      top: '150px',
      height: '148px',
      width: '119px',
      // backgroundColor: '#00ff0012',
    },
    return_3: {
      position: 'absolute',
      top: '298px',
      height: '148px',
      width: '119px',
      // backgroundColor: '#0000ff12',
    },
  });

  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        <View style={annualReturn.return_1}>
          <AnnualReturn annualReturn={annualReturnLastYear} />
        </View>
        <View style={annualReturn.return_2}>
          <AnnualReturn annualReturn={annualReturnCurrent} />
        </View>
        <View style={annualReturn.return_3}>
          <AnnualReturn annualReturn={annualReturnNextYear} />
        </View>
      </View>
    </View>
  );
}

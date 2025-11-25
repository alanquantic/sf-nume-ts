import Person, { SplittedDate } from '@/resources/Person';

import createName2 from '../assets/create-name-2.jpg';
import createName from '../assets/create-name.jpg';
import AnnualReturns from '../createName/AnnualReturns';
import CreateBreakdown from '../createName/CreateBreakdown';
import CreateName from '../createName/CreateName';
import CreateNumeric from '../createName/CreateNumeric';
import CreatePinnacle from '../createName/CreatePinnacle';
import CreateTable from '../createName/CreateTable';
import NameCycle from '../name/NameCycle';

export default function CreateNamePDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  return [{
    bg: createName,
    children:
  <>
    <CreateName consultant={consultant} />
    <CreateNumeric consultant={consultant} />
    <CreateTable consultant={consultant} />
    <CreatePinnacle consultant={consultant} />
    <CreateBreakdown consultant={consultant} />
    <AnnualReturns consultant={consultant} date={date} />
  </>,
  },
  {
    bg: createName2,
    children: <NameCycle consultant={consultant} date={date} />,
  }];
}

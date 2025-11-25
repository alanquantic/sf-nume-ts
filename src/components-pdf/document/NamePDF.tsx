import Person, { SplittedDate } from '@/resources/Person';
import nameImage from '../assets/name.jpg';
import nameImage2 from '../assets/name2.jpg';
import NameActive from '../name/NameActive';
import NameBalance from '../name/NameBalance';
import NameCycle from '../name/NameCycle';
import NameFrequencyPotential from '../name/NameFrequencyPotential';
import NameInhabitants from '../name/NameInhabitants';
import NamePotential from '../name/NamePotential';
import NameTable from '../name/NameTable';
import NameValues from '../name/NameValues';

export default function NamePDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  return [
    {
      bg: nameImage,
      children:
  <>
    <NameValues consultant={consultant} />
    <NamePotential consultant={consultant} date={date} />
    <NameTable consultant={consultant} />
    <NameActive consultant={consultant} />
    <NameInhabitants consultant={consultant} />
  </>,
    },
    {
      bg: nameImage2,
      children:
  <>
    <NameCycle consultant={consultant} date={date} />
    <NameBalance consultant={consultant} />
    <NameFrequencyPotential consultant={consultant} />
  </>,
    },
  ];
}

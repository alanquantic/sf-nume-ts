import Person, { SplittedDate } from '@/resources/Person';
import AnnualReturns from '../annualReturns/AnnualReturns';
import TimeCycle from '../annualReturns/TimeCicle';

import annualImage from '../assets/annual-returns.jpg';

export default function AnnualReturnsPDF({ consultant, date }: { consultant: Person, date: SplittedDate }) {
  return {
    bg: annualImage,
    children:
  <>
    <AnnualReturns consultant={consultant} date={date} />
    <TimeCycle consultant={consultant} date={date} />
  </>,
  };
}

import Group, { SplittedDate } from '@/resources/Group';
import sPinnacle from '../assets/g-annual-returns.jpg';
import GroupAnnualReturns from '../groupAnnualReturns/GroupAnnualReturns';
import GroupData from '../groupPinnacle/GroupData';

export default function GroupAnnualReturnsPDF({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  return {
    bg: sPinnacle,
    children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupAnnualReturns groupConsult={groupConsult} date={date} />

  </>,
  };
}

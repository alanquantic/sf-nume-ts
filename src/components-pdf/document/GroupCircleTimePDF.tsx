import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import gCircleTime2 from '../assets/g-circle-time-2.jpg';
import gCircleTime from '../assets/g-circle-time.jpg';
import GroupCircleTime from '../groupCircleTime/GroupCircleTime';
import GroupMonthCircle from '../groupCircleTime/GroupMonthCircle';
import GroupData from '../groupPinnacle/GroupData';

export default function GroupCircleTimePDF({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  const universalCalcs = new Universal();
  return [
    {
      bg: gCircleTime,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupCircleTime groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
  </>,
    },
    {
      bg: gCircleTime2,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupMonthCircle groupConsult={groupConsult} date={date} universalCalcs={universalCalcs} />
  </>,
    },
  ];
}

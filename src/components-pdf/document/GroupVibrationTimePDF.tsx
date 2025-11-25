import Group, { SplittedDate } from '../../resources/Group';
import gVibration from '../assets/g-time-vibration.jpg';
import gVibration2 from '../assets/g-time-vibration2.jpg';
import GroupData from '../groupPinnacle/GroupData';
import GroupCycle from '../groupVibrationTime/GroupCycle';
import GroupEnergy from '../groupVibrationTime/GroupEnergy';
import GroupLine from '../groupVibrationTime/GroupLine';
import GroupQuaterM from '../groupVibrationTime/GroupQuaterM';
import GroupQuaterY from '../groupVibrationTime/GroupQuaterY';
import GroupTimeCurve from '../groupVibrationTime/GroupTimeCurve';

export default function GroupVibrationTimePDF({ groupConsult, date }: { groupConsult: Group, date: SplittedDate }) {
  return [
    {
      bg: gVibration,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupEnergy groupConsult={groupConsult} date={date} />
    <GroupCycle groupConsult={groupConsult} date={date} />
    <GroupQuaterM groupConsult={groupConsult} date={date} />
    <GroupLine groupConsult={groupConsult} date={date} />
  </>,
    },
    {
      bg: gVibration2,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupQuaterY groupConsult={groupConsult} date={date} />
    <GroupTimeCurve groupConsult={groupConsult} />
  </>,
    },
  ];
}

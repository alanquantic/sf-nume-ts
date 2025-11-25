import { PDFPageConfig } from '@/types/pdf.types';

import Group, { SplittedDate } from '@/resources/Group';
import Person from '@/resources/Person';
import gPinnacle from '../assets/g-pinnacle.jpg';
import gPinnacle2 from '../assets/g-pinnacle2.jpg';
import GroupData from '../groupPinnacle/GroupData';
import GroupName1 from '../groupPinnacle/GroupName1';
import GroupName2 from '../groupPinnacle/GroupName2';
import GroupName3 from '../groupPinnacle/GroupName3';
import GroupPinnacle1 from '../groupPinnacle/GroupPinacle1';
import GroupPinnacle2 from '../groupPinnacle/GroupPinacle2';
import GroupPinnacle3 from '../groupPinnacle/GroupPinacle3';
import GroupReturns1 from '../groupPinnacle/GroupRetornos1';
import GroupReturns2 from '../groupPinnacle/GroupRetornos2';
import GroupReturns3 from '../groupPinnacle/GroupRetornos3';

export default function GroupPinnaclePDF({ groupConsult, date }: { groupConsult: Group, date: SplittedDate
}): PDFPageConfig[] {
  const cap = groupConsult.group;
  const [p1, p2, p3, p4, p5, p6, p7, p8]: (Person | undefined)[] = cap;

  let config: PDFPageConfig[] = [{
    bg: gPinnacle,
    children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupName1 groupConsult={groupConsult} members={[p1, p2]} />
    <GroupPinnacle1 groupConsult={groupConsult} members={[p1, p2]} />
    <GroupReturns1 groupConsult={groupConsult} date={date} members={[p1, p2]} />
  </>,
  }];
  if (cap.length > 2) {
    config = [...config, {
      bg: gPinnacle2,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupName2 members={[p3, p4, p5]} />
    <GroupPinnacle2 members={[p3, p4, p5]} />
    <GroupReturns2 date={date} members={[p3, p4, p5]} />
  </>,
    }];
  }
  if (cap.length > 5) {
    config = [...config, {
      bg: gPinnacle2,
      children:
  <>
    <GroupData groupConsult={groupConsult} />
    <GroupName3 members={[p6, p7, p8]} />
    <GroupPinnacle3 members={[p6, p7, p8]} />
    <GroupReturns3 date={date} members={[p6, p7, p8]} />
  </>,
    }];
  }
  return config;
}

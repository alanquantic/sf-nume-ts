import { Fragment } from 'react';

import useConsult from '@/hooks/useConsult';

function TimeCirclePastMonths() {
  const { consultationDate } = useConsult();
  const currentMonth = consultationDate.getMonth() + 1;

  const circleImages: JSX.Element[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 12; i++) {
    if (currentMonth !== i && currentMonth > i) {
      circleImages.push(
        <Fragment key={`${currentMonth}-${i}`}>
          <img className={`circle-time-pos-${i}`} src="/assets/time-circle-past-indicator.png" alt="" />
        </Fragment>,
      );
    }
  }

  return (
    <>
      {circleImages}
      <img className={`circle-time-current-pos-${currentMonth}`} src="/assets/time-circle-current-indicator.png" alt="" />
      <img className={`circle-time-current-pos-${currentMonth}`} src="/assets/time-circle-current-border.png" alt="" />
    </>
  );
}

export default TimeCirclePastMonths;

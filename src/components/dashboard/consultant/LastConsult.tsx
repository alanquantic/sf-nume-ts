/* eslint-disable import/order */
import useConsult from '@/hooks/useConsult';
import {
  getDate, getMonth, getYear,
} from 'date-fns';
import { useTranslation } from 'react-i18next';

function LastConsult() {
  const { activeConsultant } = useConsult();
  const { t } = useTranslation();
  let lastTime = '-';
  if (activeConsultant?.notes && Object.keys(activeConsultant?.notes).length > 0) {
    const date = Object.keys(activeConsultant?.notes)[Object.keys(activeConsultant?.notes).length - 1];
    const dateObj = new Date(date);
    lastTime = `${getDate(dateObj)}/${getMonth(dateObj) + 1}/${getYear(dateObj)}`;
  }
  return (
    <strong>
      {t('consultant.page.lastConsult')}
      :
      {lastTime}
    </strong>
  );
}
export default LastConsult;

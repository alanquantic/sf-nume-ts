import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';
import { formatDate } from '../utils/constants';
import ConsultantPicker from './ConsultantPicker';

function StatusBarConsultantDetails() {
  const { consultant } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return null;

  return (
    <>
      <div>
        {t('birthDate')}
        :
        <strong className="ml-2">
          {formatDate({ date: consultant.getBirthDate(), format: 'long', locale: t('locale') as string })}
        </strong>
      </div>
      <div>
        {t('age')}
        :
        <strong className="ml-2">{consultant.getYearsOld()}</strong>
      </div>
    </>
  );
}

function StatusBar() {
  const { consultationDate } = useConsult();
  const { t } = useTranslation();

  return (
    <div className="app-statusbar">
      <ConsultantPicker />
      <StatusBarConsultantDetails />
      <div>
        {t('consultDate')}
        :
        <strong className="ml-2">
          {formatDate({ date: consultationDate, format: 'long', locale: t('locale') as string })}
        </strong>
      </div>
    </div>
  );
}

export default StatusBar;

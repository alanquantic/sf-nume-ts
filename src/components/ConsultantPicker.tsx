import { useTranslation } from 'react-i18next';
import Select, { SingleValue } from 'react-select';

import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';

function ConsultantPicker() {
  const { user } = useAuth();
  const { consultant, selectConsultant } = useConsult();
  const { t } = useTranslation();
  if (user?.consultants.length === 0) return null;

  const options = user?.consultants.map(({
    id, names, lastName, scdLastName,
  }) => ({
    value: id,
    label: `${names} ${lastName} ${scdLastName}`,
  })).sort((a, b) => a.label.localeCompare(b.label));

  const handleChange = (selectedOption: SingleValue<{ value: string | undefined, label: string }>) => {
    if (selectedOption?.value === undefined) return;
    const newConsultant = user?.consultants.find((c) => c.id === selectedOption?.value);
    if (!newConsultant) return;
    selectConsultant(newConsultant);
  };

  const formatConsultantActive = () => {
    if (!consultant) return null;
    return {
      value: consultant.id,
      label: `${consultant.name} ${consultant.lastName} ${consultant.scdLastName}`,
    };
  };

  return (
    <div className="selectConsultant flex items-center">
      <img src="/assets/ic-search.svg" className="mx-2 drop-shadow-sm" alt="consultant search" />
      {t('consultant_n')}
      :
      <Select
        options={options as never}
        onChange={handleChange}
        value={formatConsultantActive()}
        className="px-2 w-96"
        placeholder={t('select')}
        classNamePrefix="bg-transparent border-0 outline-none font-bold"
        noOptionsMessage={() => t('noOptions')}
      />
    </div>
  );
}

export default ConsultantPicker;

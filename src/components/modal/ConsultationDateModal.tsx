import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import useConsult from '@/hooks/useConsult';

function ConsultationDateModal() {
  const { consultationDate, selectConsultationDate } = useConsult();
  const { t } = useTranslation();

  const openModal = () => {
    Swal.fire({
      title: t('modal.date.title') as string,
      icon: 'info',
      html:
        `<input  type="date" id="newDate" class="border border-gray-500 p-1 rounded-md" value="${format(consultationDate, 'yyyy-MM-dd')}" />`,
      showCloseButton: true,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: t('modal.date.select') as string,
      focusConfirm: false,
      confirmButtonText: t('modal.date.today') as string,
      cancelButtonText: t('modal.date.cancel') as string,
      confirmButtonColor: '#693061',
      denyButtonColor: '#9F5D9B',
      cancelButtonColor: '#ff0000',
    }).then((result) => {
      if (result.isConfirmed) {
        selectConsultationDate(new Date());
      }
      if (result.isDenied) {
        const dateValue = (document?.getElementById('newDate') as any)?.value;
        if (dateValue) {
          // Crear fecha sin problemas de zona horaria
          const [year, month, day] = dateValue.split('-').map(Number);
          const selectedDate = new Date(year, month - 1, day);
          selectConsultationDate(selectedDate);
        }
      }
    });
  };

  return (
    <button
      type="button"
      className="button-nav-bar"
      onClick={openModal}
    >
      <img
        src="/assets/navbar/change_date.svg"
        className="mb-1"
        alt="change_date"
      />
      {t('navbar.changeDate')}
    </button>
  );
}

export default ConsultationDateModal;

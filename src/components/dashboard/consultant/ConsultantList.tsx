import { useTranslation } from 'react-i18next';

import { useDeleteConsultant } from '@/api/consultants';
import useConsult from '@/hooks/useConsult';
import { formatDate } from '@/utils/constants';
// eslint-disable-next-line import/order
import Swal from 'sweetalert2';

import useConsultants from '@/hooks/useConsultants';

type Props = {
  searchUser: string;
};

function ConsultantList({ searchUser }: Props) {
  const { consultants } = useConsultants();
  const deleteConsultantAsync = useDeleteConsultant();
  const { t } = useTranslation();

  const { handleIsEditingConsultant, selectConsultant } = useConsult();

  const handleEditUser = (user: Api.Consultant) => {
    selectConsultant(user);
    handleIsEditingConsultant(true);
  };
  const handleDeleteUser = (user:Api.Consultant) => {
    Swal.fire({
      title: t('consultant.list.deleteConfirm') as string,
      icon: 'warning',
      confirmButtonColor: '#E28A05',
      showCancelButton: true,
      confirmButtonText: t('forms.confirm') as string,
      cancelButtonText: t('forms.cancel') as string,
      cancelButtonColor: '#ff0000',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConsultantAsync.mutateAsync(user.id).then(() => {
          Swal.fire(
            t('consultant.list.deleted') as string,
            t('consultant.list.deletedSuccessfully') as string,
            'success',
          );
        }).catch(() => {
          Swal.fire(
            t('consultant.list.error') as string,
            t('consultant.list.deleteError') as string,
            'error',
          );
        });
      }
    });
  };

  const normalizedSearch = searchUser.trim().toLowerCase();
  const search = Array.isArray(consultants)
    ? consultants.filter((user) => {
      if (!normalizedSearch) {
        return true;
      }

      const fullName = `${user?.names || ''} ${user?.lastName || ''} ${user?.scdLastName || ''}`.toLowerCase();
      return fullName.includes(normalizedSearch);
    })
    : [];

  // Si no hay consultantes, mostrar mensaje
  if (!Array.isArray(consultants) || consultants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <img
          src="/assets/welcome.png"
          className="w-12 mb-3 opacity-50"
          alt="welcome"
        />
        <p className="text-gray-600 text-sm">
          {t('consultant.list.noConsultants')}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          {t('consultant.list.useForm')}
        </p>
      </div>
    );
  }

  // Si hay consultantes pero no coinciden con la búsqueda
  if (search && search.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-gray-600 text-sm">
          {t('consultant.list.noConsultantsFound')}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          {t('consultant.list.tryAnotherSearch')}
        </p>
      </div>
    );
  }

  return (
    <ul>
      {
        search?.map((user) => (
          <li key={`${user?.id}-${user?.date}`} className="w-full grid grid-cols-12 h-10">
            <div className="col-span-6">
              {user?.names}
              {' '}
              {user?.lastName}
              {' '}
              {user?.scdLastName}
            </div>
            <div className="col-span-4">{formatDate({ date: user.date || new Date(), format: 'long', locale: t('locale') as string })}</div>
            <div className="col-span-2">
              <button type="button" onClick={() => { handleEditUser(user); }}>
                <img src="/assets/c_edit.svg" alt="edit" />
              </button>
              <button className="ml-6" type="button" onClick={() => { handleDeleteUser(user); }}>
                <img src="/assets/c_delete.svg" alt="delete" />
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default ConsultantList;

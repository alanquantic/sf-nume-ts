import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeGuestEnergy from '@/api/useGuestEnergy';
import MyModal from '@/components/MyModal';
import useEnergy from '@/hooks/useEnergy';
import Swal from 'sweetalert2';

type GroupSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  guestGroupProps: Api.GuestEnergyGroup | null;
};
interface GroupMemberProps {
  id: number;
  name: string;
  date: string;
}

function GroupSelectionModal({
  isOpen,
  setIsOpen,
  guestGroupProps,
}: GroupSelectionModalProps) {
  const { t } = useTranslation();
  const updateGuestEnergy = makeGuestEnergy();
  const {
    selectActiveGuestGroup,
  } = useEnergy();

  const [name, setName] = useState('');
  const [guestYear, setGuestYear] = useState(0);

  // Estado optimizado: un solo array en lugar de 8 estados separados
  const [groupMembers, setGroupMembers] = useState<GroupMemberProps[]>(
    () => Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      name: '',
      date: '',
    })),
  );

  // Función genérica para actualizar cualquier miembro del grupo
  const updateGroupMember = (
    index: number,
    field: 'name' | 'date',
    value: string,
  ) => {
    setGroupMembers((prev) => prev.map((member, i) => (i === index ? { ...member, [field]: value } : member)));
  };

  useEffect(() => {
    if (guestGroupProps) {
      setName(guestGroupProps.name || '');
      setGuestYear(guestGroupProps.guestYearGroup || 0);

      // Verificar que guestGroup existe y es un array antes de mapear
      if (guestGroupProps.guestGroup && Array.isArray(guestGroupProps.guestGroup)) {
        const mappedMembers = guestGroupProps.guestGroup.map((member: Api.GroupMember, index: number) => ({
          id: index + 1,
          name: member.name || '',
          date: member.date || '',
        }));

        // Completar con miembros vacíos hasta tener 8
        const fullMembers = [...mappedMembers];
        while (fullMembers.length < 8) {
          fullMembers.push({
            id: fullMembers.length + 1,
            name: '',
            date: '',
          });
        }

        setGroupMembers(fullMembers.slice(0, 8));
      }
    }
  }, [guestGroupProps]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validGroupMembers: Api.GroupMember[] = groupMembers
      .filter((member) => member.name !== '' && member.date !== '')
      .map((member) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: member.name,
        lastName: '',
        scdLastName: '',
        date: member.date,
        dateInit: guestYear,
      }));

    if (validGroupMembers.length === 0) {
      setIsOpen(false);
      return;
    }

    const guestEnergyGroup: Api.GuestEnergyGroup = {
      guestGroup: validGroupMembers,
      name,
      guestYearGroup: guestYear,
    };

    try {
      await updateGuestEnergy.mutateAsync(guestEnergyGroup).then(() => {
        selectActiveGuestGroup({ guestGroup: validGroupMembers, guestYearGroup: guestYear, name });
        setIsOpen(false);
        Swal.fire({
          title: t('modal.group.successSave') as string,
          text: t('modal.group.successSaveMessage') as string,
          icon: 'success',
          confirmButtonText: t('modal.group.accept') as string,
        });
      });
    } catch (err) {
      Swal.fire({
        title: t('modal.group.errorSave') as string,
        text: err instanceof Error ? err.message : t('modal.group.unknownError') as string,
        icon: 'error',
        confirmButtonText: t('modal.group.accept') as string,
      });
    }
  };

  return (
    <MyModal
      size="large"
      title={t('modal.group.guestGroup') as string}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <div className="flex w-full gap-1">
          <div className="form-group gap-1 w-1/2">
            <p>
              {t('modal.group.nameGroup') as string}
            </p>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md"
                placeholder={t('forms.name') as string}
              />
            </div>
          </div>
          <div className="form-group gap-1 w-1/2">
            <p>
              {t('modal.group.lastYearIntegration') as string}
            </p>
            <input
              type="number"
              name="guestYear"
              value={guestYear}
              onChange={(e) => setGuestYear(Number(e.target.value))}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-1 w-full justify-center">
          {/* Columna izquierda: integrantes impares (1, 3, 5, 7) */}
          <div className="flex flex-col gap-3 w-1/2">
            {[0, 2, 4, 6].map((index) => (
              <div key={groupMembers[index].id} className="form-group gap-1">
                <p>
                  {t('modal.group.integrant') as string}
                  {' '}
                  {index + 1}
                </p>
                <input
                  type="text"
                  name="name"
                  value={groupMembers[index].name}
                  onChange={(e) => updateGroupMember(index, 'name', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                  placeholder={t('forms.name') as string}
                />
                <input
                  type="date"
                  name="date"
                  value={groupMembers[index].date}
                  onChange={(e) => updateGroupMember(index, 'date', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                />
              </div>
            ))}
          </div>
          {/* Columna derecha: integrantes pares (2, 4, 6, 8) */}
          <div className="flex flex-col gap-3 w-1/2">
            {[1, 3, 5, 7].map((index) => (
              <div key={groupMembers[index].id} className="form-group gap-1">
                <p>
                  {t('modal.group.integrant') as string}
                  {' '}
                  {index + 1}
                </p>
                <input
                  type="text"
                  name="name"
                  value={groupMembers[index].name}
                  onChange={(e) => updateGroupMember(index, 'name', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                  placeholder={t('forms.name') as string}
                />
                <input
                  type="date"
                  name="date"
                  value={groupMembers[index].date}
                  onChange={(e) => updateGroupMember(index, 'date', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-cancel"
          >
            {t('modal.group.cancel')}
          </button>
          <button
            type="submit"
            className="btn"
          >
            {t('modal.group.save')}
          </button>
        </div>
      </form>
    </MyModal>
  );
}

export default GroupSelectionModal;

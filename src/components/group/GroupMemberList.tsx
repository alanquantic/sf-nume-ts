import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

import makeConsultant from '@/api/useConsultant';
import { ConsultContext } from '@/context/ConsultContext';
import useConsultants from '@/hooks/useConsultants';
import Person from '@/resources/Person';
import add_user_group from '../../assets/icons/add_user_group.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import GroupMemberForm from './GroupMemberForm';

type GroupMemberListProps = {
  activeGroup: Api.GroupData;
};

export default function GroupMemberList({ activeGroup }: GroupMemberListProps) {
  const { activeConsultant, updateConsultantGroups, groupsAvailable } = useContext(ConsultContext);
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();
  const { t } = useTranslation();

  // Obtener la versión más actualizada del grupo desde el contexto
  const currentActiveGroup = groupsAvailable.find((g) => g.id === activeGroup.id) || activeGroup;
  const [isAddMemberActive, setIsAddMemberActive] = useState(false);
  const [editingMember, setEditingMember] = useState<Api.GroupMember | null>(null);
  const [showMemberInfo, setShowMemberInfo] = useState(false);

  if (!activeConsultant || !activeGroup || !currentActiveGroup) return null;

  const handleEditMember = (member: Api.GroupMember) => {
    setEditingMember(member);
    setIsAddMemberActive(true);
  };

  const handleRemoveMember = async (memberId: string) => {
    // Buscar el miembro para mostrar su nombre en la confirmación
    const memberToRemove = currentActiveGroup.members?.find((m) => m.id === memberId);
    const memberName = memberToRemove ? `${memberToRemove.name} ${memberToRemove.lastName}` : t('common.thisMember');

    // Mostrar confirmación con SweetAlert2
    const result = await Swal.fire({
      title: t('group.alerts.areYouSure') as string,
      text: t('group.alerts.confirmDeleteMember', { memberName }) as string,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ff0000',
      confirmButtonText: t('group.alerts.yesDelete') as string,
      cancelButtonText: t('group.cancel') as string,
    });

    if (result.isConfirmed) {
      try {
        // Mostrar loading
        Swal.fire({
          title: t('group.alerts.deleting') as string,
          text: t('group.alerts.deletingMember') as string,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const updatedGroup: Api.GroupData = {
          ...currentActiveGroup,
          members: currentActiveGroup.members?.filter((m) => m.id !== memberId) || [],
        };

        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          groupData: activeConsultant.groupData?.map((g: Api.GroupData) => (g.id === currentActiveGroup.id ? updatedGroup : g)) || [],
        };

        // Persistir cambios en la base de datos
        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar el contexto con el consultor actualizado
        updateConsultantGroups(updatedConsultant);

        // Cerrar loading y mostrar mensaje de éxito
        Swal.fire(
          t('group.alerts.deleted') as string,
          `${memberName} ${t('group.alerts.memberDeletedSuccess')}`,
          'success',
        );
      } catch (error) {
        console.error('Error al eliminar miembro:', error);

        // Mostrar mensaje de error
        Swal.fire(
          t('group.alerts.error') as string,
          t('group.errors.deleteMember') as string,
          'error',
        );
      }
    }
  };

  const closeMemberForm = () => {
    setIsAddMemberActive(false);
    setEditingMember(null);
  };

  const convertMemberToPerson = (member: Api.GroupMember): Person => new Person({
    id: member.id,
    name: member.name,
    lastName: member.lastName,
    scdLastName: member.scdLastName,
    birthDate: member.date,
  });

  if (isAddMemberActive) {
    return (
      <GroupMemberForm
        activeConsultant={activeConsultant}
        activeGroup={currentActiveGroup}
        setIsAddMemberActive={closeMemberForm}
        isEditing={!!editingMember}
        memberToEdit={editingMember || undefined}
      />
    );
  }

  return (
    <div className="p-3">
      {/* Add Member Button */}
      <div className="flex justify-between mb-4">
        {currentActiveGroup.members && currentActiveGroup.members.length < 8 && (
        <button
          type="button"
          onClick={() => setIsAddMemberActive(true)}
          className="bg-main text-white px-4 py-2 rounded-3xl text-sm font-bold"
        >
          {t('group.addMember')}
        </button>
        )}
        <p className="text-lg text-main">
          {t('group.members')}
          :
          {' '}
          {currentActiveGroup.members?.length || 0}
        </p>
        <button
          type="button"
          onClick={() => setShowMemberInfo(!showMemberInfo)}
          className="text-sm text-main"
        >
          {showMemberInfo ? t('group.hideMembers') : t('group.showMembers')}
        </button>
      </div>

      {/* Members List */}
      {currentActiveGroup.members && currentActiveGroup.members.length > 0 && showMemberInfo ? (
        <div className="space-y-3">
          {currentActiveGroup.members.map((member) => {
            const memberPerson = convertMemberToPerson(member);
            return (
              <div key={member.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-100 mr-3">
                    <img src={add_user_group} className="w-4 h-4" alt="member" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {memberPerson.name}
                      {' '}
                      {memberPerson.lastName}
                      {' '}
                      {memberPerson.scdLastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {memberPerson.getFormBirthDate()}
                      {' '}
                      •
                      {memberPerson.getYearsOld()}
                      {' '}
                      {t('group.years')}
                      {' '}
                      •
                      {t('group.start')}
                      {member.dateInit}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditMember(member)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <img src={c_delete} alt="delete" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500" />
      )}
    </div>
  );
}

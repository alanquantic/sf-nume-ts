import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit } from 'react-icons/md';

import { ConsultContext } from '@/context/ConsultContext';
import add_user_group from '../../assets/icons/add_user_group.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import GroupForm from './GroupForm';
import GroupMemberList from './GroupMemberList';

type GroupFormInLineProps = {
  setIsAddFormActive: (isAddFormActive: boolean) => void;
  handleEditGroup: () => void;
  isAddFormActive: boolean;
  hasGroup: boolean;
};

export default function GroupFormInLine({
  setIsAddFormActive,
  handleEditGroup,
  isAddFormActive,
  hasGroup,
}: GroupFormInLineProps) {
  const {
    groupsAvailable,
    activeGroup,
    selectActiveGroup,
    isEditingConsultant,
    activeConsultant,
  } = useContext(ConsultContext);
  const { t } = useTranslation();
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Obtener la versión más actualizada del grupo activo
  const currentActiveGroup = activeGroup ? (groupsAvailable.find((g) => g.id === activeGroup.id) || activeGroup) : null;

  const hasNoGroups = hasGroup;

  useEffect(() => {
    // Este efecto se mantiene para futuras funcionalidades relacionadas con el índice del grupo
    // Por ahora solo verifica que el grupo activo esté sincronizado
    if (currentActiveGroup && !groupsAvailable.find((g) => g.id === currentActiveGroup.id)) {
      // El grupo activo ya no existe en la lista disponible
      console.warn('Active group no longer available in groups list');
    }
  }, [currentActiveGroup, groupsAvailable]);

  const editGroup = () => {
    setIsAddFormActive(true);
    handleEditGroup();
  };

  const removeGroup = () => {
    const emptyGroup: Api.GroupData = {
      id: '',
      name: '',
      description: '',
      date: new Date('1900-01-01').toISOString(),
      members: [],
      lastInit: 0,
    };
    selectActiveGroup(emptyGroup, 0);
  };

  const selectedGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const selectedGroupData = groupsAvailable.find((group) => group.id === id);
    if (selectedGroupData) {
      selectActiveGroup(selectedGroupData, selectedGroupData.lastInit || 0);
    }
  };

  if (!activeConsultant) return null;

  if (hasNoGroups || isAddFormActive) {
    return (
      <GroupForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={setIsAddFormActive}
        isEditing={isEditingConsultant}
        groupToEdit={activeGroup || undefined}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Main Group Data Form */}
      <div className="space-y-4">
        {/* Group Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button type="button" onClick={editGroup}>
              <img src={add_user_group} className="w-6 h-6 mr-3 text-gray-400" alt="add_user_group" />
              <MdEdit className="text-gray-400 mr-2" />
            </button>
            <p className="font-bold text-sm mr-3">{t('group.groupOf')}</p>
            <select
              onChange={selectedGroup}
              className="border rounded px-3 py-2 flex-1"
              value={currentActiveGroup?.id || ''}
            >
              {!currentActiveGroup && (
                <option value="">
                  {t('group.selectAGroup')}
                </option>
              )}
              {groupsAvailable.map((group: Api.GroupData) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                  {' '}
                  (
                  {group.members?.length || 0}
                  {' '}
                  {t('group.membersCount')}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={removeGroup} className="ml-4">
            <img src={c_delete} alt="delete" className="w-5 h-5" />
          </button>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsAddFormActive(true)}
              className="btn-save w-50 text-sm"
            >
              {t('group.createGroup')}
            </button>
          </div>
        </div>

        {/* Create Group Button */}
        {(currentActiveGroup && !showMoreInfo) && (
          <div className="flex justify-left text-main text-sm">
            <button
              type="button"
              onClick={() => setShowMoreInfo(true)}
              className=""
            >
              {t('group.moreInfo')}
            </button>
          </div>
        )}

        {/* Group Information */}
        {currentActiveGroup && showMoreInfo && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-left text-main text-sm">
              <button
                type="button"
                onClick={() => setShowMoreInfo(false)}
                className=""
              >
                {t('group.lessInfo')}
              </button>
            </div>

            <div className="flex flex-row gap-4 w-full">
              <div className="flex items-center w-1/2">
                <button type="button" onClick={editGroup}>
                  <MdEdit className="text-gray-400 mr-2" />
                </button>
                <p className="font-bold text-sm mr-3">
                  {t('group.description')}
                  :
                </p>
                <input
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  value={currentActiveGroup?.description || ''}
                  readOnly
                />
              </div>

              <div className="flex items-center w-1/2">
                <button type="button" onClick={editGroup}>
                  <MdEdit className="text-gray-400 mr-2" />
                </button>
                <p className="font-bold text-sm mr-3">{t('group.creationDate')}</p>
                <input
                  value={currentActiveGroup?.date ? new Date(currentActiveGroup.date).toLocaleDateString() : ''}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex items-center w-1/2">
                <button type="button" onClick={editGroup}>
                  <MdEdit className="text-gray-400 mr-2" />
                </button>
                <p className="font-bold text-sm mr-3">
                  {t('group.members')}
                  :
                </p>
                <input
                  value={currentActiveGroup?.members?.length || 0}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>

              <div className="flex items-center">
                <button type="button" onClick={editGroup}>
                  <MdEdit className="text-gray-400 mr-2" />
                </button>
                <p className="font-bold text-sm mr-3">{t('group.lastYearIntegration')}</p>
                <input
                  value={currentActiveGroup?.lastInit || ''}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>

            </div>

          </div>
        )}
      </div>

      {/* Members Section */}
      {currentActiveGroup && currentActiveGroup.id && (
        <>
          <hr className="my-1" />

          {/* Members Header */}
          <div className="bg-black text-white rounded-t-lg px-4 py-3 flex items-center justify-between">
            <h3 className="font-bold">
              {t('group.membersOfGroup')}
              {' '}
              {currentActiveGroup.name}
            </h3>
          </div>

          {/* Members List */}
          <div className="bg-white border border-gray-200 rounded-b-lg">
            <GroupMemberList activeGroup={currentActiveGroup} />
          </div>
        </>
      )}
    </div>
  );
}

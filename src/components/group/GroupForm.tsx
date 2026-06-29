import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateGroupData, useUpdateGroupData } from '@/api/group-data';
import useConsult from '@/hooks/useConsult';
import useForm from '@/hooks/useForm';
import { isValidDate, toDateInputValue } from '@/utils/constants';
import add_user_group from '../../assets/icons/add_user_group.svg';

type FormStatus = {
  displayValidations: boolean;
  isValid: boolean;
  validationMsgs: Record<string, string>
};

const FORM_STATUS_INITIAL_STATE: FormStatus = {
  displayValidations: false,
  isValid: false,
  validationMsgs: {},
};

type GroupFormProps = {
  activeConsultant: Api.Consultant;
  setIsAddFormActive: (isActive: boolean) => void;
  isEditing?: boolean;
  groupToEdit?: Api.GroupData;
};

export default function GroupForm({
  activeConsultant,
  setIsAddFormActive,
  isEditing,
  groupToEdit,
}: GroupFormProps): JSX.Element {
  const { handleIsEditingConsultant, updateConsultantGroups } = useConsult();
  const createGroupDataMutation = useCreateGroupData();
  const updateGroupDataMutation = useUpdateGroupData();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);

  const initialForm = {
    name: isEditing && groupToEdit ? groupToEdit.name : '',
    description: isEditing && groupToEdit ? groupToEdit.description : '',
    date: isEditing && groupToEdit ? toDateInputValue(groupToEdit.date) : toDateInputValue(new Date()),
  };

  const {
    name,
    description,
    date,
    handleInputChange,
    setFormError,
    reset,
  } = useForm(initialForm);

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs: Record<string, string> = {};

    const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s0-9]+$/;

    if (!name) {
      validationMsgs = { ...validationMsgs, name: t('group.validation.required') };
      isValid = false;
    } else if (!name.match(letters)) {
      validationMsgs = { ...validationMsgs, name: t('group.validation.notValid') };
      isValid = false;
    }

    if (!date) {
      validationMsgs = { ...validationMsgs, date: t('group.validation.required') };
      isValid = false;
    } else if (!isValidDate(date)) {
      validationMsgs = { ...validationMsgs, date: t('group.validation.notValid') };
      isValid = false;
    }

    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [name, description, date]);

  const closeForm = () => {
    setIsAddFormActive(false);
    handleIsEditingConsultant(false);
    reset();
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }

    setFormError('');
    setIsLoading(true);

    try {
      const payload = {
        name: (name || '').trim(),
        description: (description || '').trim(),
        date: date?.toString() || '',
        lastInit: new Date().getFullYear(),
      };
      const savedGroup = isEditing && groupToEdit
        ? await updateGroupDataMutation.mutateAsync({
          groupDataId: groupToEdit.id,
          groupData: payload,
        })
        : await createGroupDataMutation.mutateAsync({
          consultantId: activeConsultant.id,
          groupData: payload,
        });

      // Actualizar inmediatamente el contexto con el consultor actualizado
      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        groupData: isEditing && groupToEdit
          ? activeConsultant.groupData?.map((g: Api.GroupData) => (g.id === groupToEdit.id ? { ...groupToEdit, ...savedGroup, members: groupToEdit.members || [] } : g)) || []
          : [...(activeConsultant.groupData || []), { ...savedGroup, members: [] }],
      };
      updateConsultantGroups(updatedConsultant);

      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('group.errors.saveGroup') || '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="block w-full mt-3" onSubmit={handleOnSubmit}>
      <h2 className="flex justify-center items-center text-xl font-bold">
        <img src={add_user_group} className="mr-3" alt="add_user_group" />
        {isEditing ? t('group.editGroup') : t('group.createGroup')}
      </h2>

      <div className="flex w-full mt-6">
        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            {t('group.name')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="group-name"
            type="text"
            name="name"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={name || ''}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.name) && (
            <span className="form-error">{formStatus.validationMsgs.name}</span>
          )}
        </div>

        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            {t('group.date')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="group-date"
            type="date"
            name="date"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={date || ''}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && (
            <span className="form-error">{formStatus.validationMsgs.date}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-3">
        <div className="form-group w-full">
          <p className="font-bold mb-1">
            {t('group.descriptionOfGroup')}
          </p>
          <textarea
            id="group-description"
            name="description"
            className="rounded border-[#C4C4C4] border w-full"
            onChange={(e) => handleInputChange(e.target)}
            value={description || ''}
            rows={3}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.description) && (
            <span className="form-error">{formStatus.validationMsgs.description}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-3 justify-center">
        <button
          type="submit"
          className="btn-save w-32"
          disabled={isLoading}
        >
          {isLoading ? t('group.saving') : t('group.save')}
        </button>

        <button
          className="w-32 btn-cancel rounded-full"
          type="button"
          onClick={closeForm}
          disabled={isLoading}
        >
          {t('group.cancel')}
        </button>
      </div>

    </form>
  );
}

GroupForm.defaultProps = {
  isEditing: false,
  groupToEdit: undefined,
};

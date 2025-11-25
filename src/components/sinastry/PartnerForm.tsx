import makeConsultant from '@/api/useConsultant';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import useForm from '@/hooks/useForm';
import { isValidDate } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import add_user_main from '../../assets/icons/add_user_main.svg';

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

type PartnerFormProps = {
  activeConsultant: Api.Consultant;
  setIsAddFormActive: (isActive: boolean) => void;
  isEditing?: boolean;
  partnerToEdit?: Api.Partner;
};

export default function PartnerForm({
  activeConsultant,
  setIsAddFormActive,
  isEditing,
  partnerToEdit,
}: PartnerFormProps): JSX.Element {
  const { handleIsEditingConsultant, updateConsultantPartners, activePartnerData } = useConsult();
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);

  const { t } = useTranslation();

  const initialForm = {
    names: isEditing && partnerToEdit ? partnerToEdit.names : '',
    lastName: isEditing && partnerToEdit ? partnerToEdit.lastName : '',
    scdLastName: isEditing && partnerToEdit ? partnerToEdit.scdLastName : '',
    date: isEditing && partnerToEdit ? partnerToEdit.date : '',
  };

  const {
    names,
    lastName,
    scdLastName,
    date,
    handleInputChange,
    setFormError,
    reset,
  } = useForm(initialForm);

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs: Record<string, string> = {};

    const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;

    if (!names) {
      validationMsgs = { ...validationMsgs, names: t('validation.required') };
      isValid = false;
    } else if (!names.match(letters)) {
      validationMsgs = { ...validationMsgs, names: t('validation.invalid') };
      isValid = false;
    }

    if (!lastName) {
      validationMsgs = { ...validationMsgs, lastName: t('validation.required') };
      isValid = false;
    } else if (!lastName.match(letters)) {
      validationMsgs = { ...validationMsgs, lastName: t('validation.invalid') };
      isValid = false;
    }

    if (scdLastName && !scdLastName.match(letters)) {
      validationMsgs = { ...validationMsgs, scdLastName: t('validation.invalid') };
      isValid = false;
    }

    if (!date) {
      validationMsgs = { ...validationMsgs, date: t('validation.required') };
      isValid = false;
    } else if (!isValidDate(date)) {
      validationMsgs = { ...validationMsgs, date: t('validation.invalid') };
      isValid = false;
    }

    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [names, lastName, scdLastName, date]);

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
      const newPartner: Api.Partner = {
        id: isEditing && partnerToEdit ? partnerToEdit.id : Math.random().toString(36).substring(2, 9),
        names: names.trim(),
        lastName: lastName.trim(),
        scdLastName: scdLastName.trim(),
        date: date.toString(),
      };

      // Si hay un PartnerData activo, agregar el partner al grupo
      if (activePartnerData) {
        const updatedPartnerData: Api.PartnerData = {
          ...activePartnerData,
          partner: isEditing && partnerToEdit
            ? activePartnerData.partner?.map((p: Api.Partner) => (p.id === partnerToEdit.id ? newPartner : p)) || []
            : [...(activePartnerData.partner || []), newPartner],
        };

        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          partnerData: activeConsultant.partnerData?.map((p: Api.PartnerData) => (p.id === activePartnerData.id ? updatedPartnerData : p)) || [],
        };

        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar inmediatamente el contexto con el consultor actualizado
        updateConsultantPartners(updatedConsultant);
      } else {
        // Fallback: agregar al array partner del consultor (compatibilidad)
        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          partner: isEditing && partnerToEdit
            ? activeConsultant.partner?.map((p:Api.Partner) => (p.id === partnerToEdit.id ? newPartner : p)) || []
            : [...(activeConsultant.partner || []), newPartner],
        };

        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar inmediatamente el contexto con el consultor actualizado
        updateConsultantPartners(updatedConsultant);
      }

      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('errors.savePartner') as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="block w-full mt-3" onSubmit={handleOnSubmit}>
      <h2 className="flex justify-center items-center text-xl font-bold">
        <img src={add_user_main} className="mr-3" alt="add_user_main" />
        {isEditing ? t('modal.partner.editPartner') : t('modal.partner.assignPartner')}
      </h2>

      <div className="flex w-full mt-6">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.names')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-names"
            type="text"
            name="names"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={names}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.names) && (
            <span className="form-error">{formStatus.validationMsgs.names}</span>
          )}
        </div>

        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.paternalSurname')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-lastName"
            type="text"
            name="lastName"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={lastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.lastName) && (
            <span className="form-error">{formStatus.validationMsgs.lastName}</span>
          )}
        </div>

        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.maternalSurname')}
          </p>
          <input
            id="partner-scdLastName"
            type="text"
            name="scdLastName"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={scdLastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.scdLastName) && (
            <span className="form-error">{formStatus.validationMsgs.scdLastName}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-3">
        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            {t('forms.birthDate')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-date"
            type="date"
            name="date"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={date}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && (
            <span className="form-error">{formStatus.validationMsgs.date}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-3 justify-center">
        <button
          type="submit"
          className="btn-save w-32"
          disabled={isLoading}
        >
          {isLoading ? t('modal.partner.saving') : t('modal.partner.save')}
        </button>

        {isEditing && (
          <button
            className="w-32 btn-cancel rounded-full"
            type="button"
            onClick={closeForm}
            disabled={isLoading}
          >
            {t('modal.partner.cancel')}
          </button>
        )}
      </div>
    </form>
  );
}

PartnerForm.defaultProps = {
  isEditing: false,
  partnerToEdit: undefined,
};

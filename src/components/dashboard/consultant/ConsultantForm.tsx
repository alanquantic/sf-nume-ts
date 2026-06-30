/* eslint-disable import/order */
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import useForm from '@/hooks/useForm';
import useSubmitGuard from '@/hooks/useSubmitGuard';
import countries from '@/resources/countries.json';
import { useEffect, useState } from 'react';

import { useCreateConsultant, useUpdateConsultant } from '@/api/consultants';
import { useAuth } from '@/context/AuthProvider';
import { toDateInputValue } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

type FormStatus = { displayValidations: boolean, isValid: boolean, validationMsgs: Record<string, string> };
const FORM_STATUS_INITIAL_STATE: FormStatus = { displayValidations: false, isValid: false, validationMsgs: {} };

function ConsultantForm({ initialForm }: { initialForm: any }) {
  const { t } = useTranslation();
  const createConsultantMutation = useCreateConsultant();
  const updateConsultantMutation = useUpdateConsultant();
  const [isLoading, setIsLoading] = useState(false);
  const runOnce = useSubmitGuard();
  const { consultant } = useConsult();
  const { user: userAuth } = useAuth();

  const {
    handleIsEditingConsultant, isEditingConsultant, selectActiveConsultant, selectConsultant,
  } = useConsult();
  const {
    names, lastName, scdLastName, date, nationality, gender, company, email, phone,
    handleInputChange, formError, setFormError, reset,
  } = useForm(initialForm);

  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);
  const isFormValid = () => {
    let isValid = true;
    let validationMsgs = {};
    if (names === '') {
      validationMsgs = { ...validationMsgs, names: t('forms.required') };
      isValid = false;
    }
    if (lastName === '') {
      validationMsgs = { ...validationMsgs, lastName: t('forms.required') };
      isValid = false;
    }
    if (date === '') {
      validationMsgs = { ...validationMsgs, date: t('forms.required') };
      isValid = false;
    }
    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [names, lastName, scdLastName, date]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }
    runOnce(async () => {
      setFormError('');
      setIsLoading(true);
      try {
        if (isEditingConsultant) {
          const editedConsultant: Partial<Api.Consultant> = {
            company,
            date,
            email,
            gender,
            lastName,
            names,
            nationality,
            phone,
            scdLastName,
          };
          const savedConsultant = await updateConsultantMutation.mutateAsync({
            consultantId: consultant?.id || '',
            consultant: editedConsultant,
          });
          Swal.fire({
            title: t('forms.success') as string,
            icon: 'success',
            confirmButtonText: t('forms.confirm') as string,
          });
          handleIsEditingConsultant(false);
          selectActiveConsultant(savedConsultant);
          setFormStatus(FORM_STATUS_INITIAL_STATE);
          reset();
        } else {
          const newConsultant: Omit<Api.Consultant, 'id'> = {
            company,
            date,
            email,
            gender,
            lastName,
            names,
            nationality,
            phone,
            scdLastName,
            userId: userAuth?.user.id,
          };
          const savedConsultant = await createConsultantMutation.mutateAsync(newConsultant);
          Swal.fire({
            title: t('forms.success') as string,
            icon: 'success',
            confirmButtonText: t('forms.confirm') as string,
          });
          handleIsEditingConsultant(false);
          selectConsultant(savedConsultant);
          setFormStatus(FORM_STATUS_INITIAL_STATE);
          reset();
        }
      } catch (err) {
        setFormError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    });
  };

  const createMarkup = (text: string) => ({ __html: text });

  return (
    <form className="form-container block" onSubmit={handleOnSubmit}>
      <div className="flex w-full">
        <div className="form-group w-1/3 relative">
          <p className="font-bold mb-1">
            {t('forms.names')}
            <span className="text-red-800">*</span>
          </p>
          <input
            type="text"
            name="names"
            id="names"
            className="rounded border-[#C4C4C4]  border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={names}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.names) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.names}</p>}
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.paternalSurname')}
            <span className="text-red-800">*</span>
          </p>
          <input
            type="text"
            name="lastName"
            className="rounded  border-[#C4C4C4]  border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={lastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.lastName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.lastName}</p>}
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.maternalSurname')}
          </p>
          <input
            type="text"
            name="scdLastName"
            className="rounded border-[#C4C4C4]  border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={scdLastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.scdLastName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.scdLastName}</p>}
        </div>
      </div>
      <div className="flex w-full mt-3">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.birthDate')}
            <span className="text-red-800">*</span>
          </p>
          <input
            type="date"
            name="date"
            className="rounded w-11/12 border-[#C4C4C4]  border "
            onChange={(e) => handleInputChange(e.target)}
            value={typeof date === 'string' ? date : ''}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.date}</p>}
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">{t('forms.nationality')}</p>
          <select
            name="nationality"
            className="rounded border h-[30px] border-[#C4C4C4]  w-11/12 "
            onChange={(e) => handleInputChange(e.target)}
            value={nationality}
          >
            <option value="">-</option>
            {
              countries.countries.sort((a, b) => a.name_es.localeCompare(b.name_es)).map((country) => (
                <option key={country.code_2} value={country.code_2}>
                  {country.name_es}
                </option>
              ))
            }
          </select>
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">{t('forms.gender')}</p>
          <select
            name="gender"
            className="rounded border h-[30px] border-[#C4C4C4] px-2 w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={gender}
          >
            <option value="">-</option>
            <option value="F">{t('forms.female')}</option>
            <option value="M">{t('forms.male')}</option>
          </select>
        </div>
      </div>
      <div className="flex w-full mt-3">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.company')}
          </p>
          <input
            type="text"
            name="company"
            className="rounded border-[#C4C4C4]  border"
            onChange={(e) => handleInputChange(e.target)}
            value={company}
          />
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.phone')}
          </p>
          <input
            type="tel"
            name="phone"
            className="rounded border h-[30px] border-[#C4C4C4]  px-2"
            onChange={(e) => handleInputChange(e.target)}
            value={phone}
          />
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('forms.email')}
          </p>
          <input
            type="text"
            name="email"
            className="rounded border-[#C4C4C4]  border"
            onChange={(e) => handleInputChange(e.target)}
            value={email}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 mt-3 items-center">
        <div className="w-1/3">
          {(!isEditingConsultant)
            ? (
              <div className="text-center flex justify-center items-center flex-col">
                <img src="/assets/navbar/add_user.svg" className="mb-3" alt="addUserMain" />
                <button type="submit" className="btn w-full" disabled={isLoading}>
                  {isLoading ? (
                    <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    t('forms.save')
                  )}
                </button>
              </div>
            )
            : (
              <div className="w-full flex flex-wrap">
                <button className="w-full btn mb-3 bg-[#0000ff]" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    t('forms.confirm')
                  )}
                </button>
                <button className="w-full btn bg-[#ff0000]" type="button" disabled={isLoading} onClick={() => { handleIsEditingConsultant(false); }}>{t('forms.cancel')}</button>
              </div>
            )}
          {formError && (
            <div
              className="text-red-500 text-center text-sm mt-3"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={createMarkup(formError)}
            />
          )}
        </div>
      </div>
    </form>
  );
}

function ConsultantFormWrapper() {
  const { isEditingConsultant, consultant } = useConsult();
  const { consultants: users } = useConsultants();
  const consultantData = Array.isArray(users) ? users.find((element) => element.id === consultant?.id) : null;

  const initialForm = {
    names: (isEditingConsultant && consultant) ? consultantData?.names : '',
    lastName: (isEditingConsultant && consultant) ? consultantData?.lastName : '',
    scdLastName: (isEditingConsultant && consultant) ? consultantData?.scdLastName : '',
    date: (isEditingConsultant && consultant) ? toDateInputValue(consultantData?.date) : '',
    nationality: (isEditingConsultant && consultant) ? consultantData?.nationality : '',
    gender: (isEditingConsultant && consultant) ? consultantData?.gender : '',
    company: (isEditingConsultant && consultant) ? consultantData?.company : '',
    phone: (isEditingConsultant && consultant) ? consultantData?.phone : '',
    email: (isEditingConsultant && consultant) ? consultantData?.email : '',
    groupData: (isEditingConsultant && consultant) ? consultantData?.groupData : [],
    partnerData: (isEditingConsultant && consultant) ? consultantData?.partnerData : [],
    createNames: (isEditingConsultant && consultant) ? consultantData?.createNames : [],
  };

  return <ConsultantForm initialForm={initialForm} key={`${consultant?.id}_${isEditingConsultant}`} />;
}
export default ConsultantFormWrapper;

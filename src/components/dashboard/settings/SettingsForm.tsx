/* eslint-disable import/order */
import { useEffect, useState } from 'react';

import makeProfile from '@/api/useProfileUpdate';
import { useAuth } from '@/context/AuthProvider';
import useForm from '@/hooks/useForm';
import { isValidDate } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

type FormStatus = { displayValidations: boolean, isValid: boolean, validationMsgs: Record<string, string> };
const FORM_STATUS_INITIAL_STATE: FormStatus = { displayValidations: false, isValid: false, validationMsgs: {} };

function SettingsForm() {
  const { user: userAuth } = useAuth();
  const profile = userAuth?.user;
  const company = userAuth?.company;
  const updateProfileSync = makeProfile();

  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initialForm = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    scdLastName: profile?.scdLastName,
    email: profile?.email,
    phone: profile?.phone,
    birthDate: profile?.birthDate,
    direction: company?.direction,
    logo: company?.logo,
    name: company?.name,
    phoneCompany: company?.phone,
    website: company?.website,
  };
  const {
    firstName, lastName, scdLastName, birthDate, direction, logo, name, phone, phoneCompany, website, email, handleInputChange, setFormError, reset,
  } = useForm(initialForm);

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs = {};
    if (firstName === '') {
      validationMsgs = { ...validationMsgs, firstName: t('forms.required') as string };
      isValid = false;
    }
    if (lastName === '') {
      validationMsgs = { ...validationMsgs, lastName: t('forms.required') as string };
      isValid = false;
    }
    if (scdLastName === '') {
      validationMsgs = { ...validationMsgs, scdLastName: t('forms.required') as string };
      isValid = false;
    }
    if (birthDate === null || birthDate === undefined) {
      validationMsgs = { ...validationMsgs, birthDate: t('forms.required') as string };
      isValid = false;
    } else {
      isValidDate(birthDate.toString());
    }
    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [firstName, lastName, scdLastName, birthDate]);

  useEffect(() => {}, [isLoading]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }
    setFormError('');

    const newProfile: Api.ProfileUser = {
      names: firstName,
      lastName,
      scdLastName,
      date: birthDate?.toString(),
      tel: phone,
      address: direction,
      logoURL: logo,
      company: name,
      phone: phoneCompany,
      webSite: website,
    };

    setIsLoading(true);
    await updateProfileSync.mutateAsync(newProfile).then(() => {
      Swal.fire({
        title: t('forms.success') as string,
        icon: 'success',
        confirmButtonText: t('forms.confirm') as string,
      });
      setFormStatus(FORM_STATUS_INITIAL_STATE);
      setIsLoading(false);
      reset();
    }).catch((err) => {
      setFormError(err.message);
    }).finally(() => {
      setIsLoading(false);
    });
  };
  return (
    <form action="" onSubmit={handleOnSubmit}>
      <div className="flex w-full">
        <div className="p-5 w-3/5 border-r-2 border-black">
          <h2 className="text-sm font-extrabold text-gray-400 mb-5">{t('forms.personalData')}</h2>
          <div className="flex w-full">
            <div className="form-group w-1/3 mb-5">
              <p className="font-bold mb-1 text-13">
                {t('forms.names')}
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                name="firstName"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={firstName}
              />
              {(formStatus?.displayValidations && formStatus?.validationMsgs?.firstName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.firstName}</p>}
            </div>
            <div className="form-group w-1/3 mb-5">
              <p className="font-bold mb-1 text-13">
                {t('forms.paternalSurname')}
                {' '}
                <span className="text-red-400">*</span>
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
              <p className="font-bold mb-1 text-13">
                {t('forms.maternalSurname')}
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                name="scdLastName"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={scdLastName}
              />
              {(formStatus?.displayValidations && formStatus?.validationMsgs?.scdLastName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.scdLastName}</p>}
            </div>

          </div>
          <div className="flex w-full">
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                {t('forms.birthDate')}
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="date"
                name="birthDate"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={birthDate?.toString()}
              />
              {(formStatus?.displayValidations && formStatus?.validationMsgs?.birthDate) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.birthDate}</p>}
            </div>
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                {t('forms.phone')}
                {' '}
              </p>
              <input
                type="tel"
                name="phone"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={phone}
              />
            </div>
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                {t('forms.email')}
                {' '}
              </p>
              <input
                type="email"
                name="email"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={email}
                disabled
              />
            </div>
          </div>
          <div className=" w-full">
            <p className="text-13 font-bold mt-5">{t('forms.password')}</p>
            <p className="text-blue underline"><a href="https://app.numerologia-cotidiana.com/mi-cuenta/lost-password/" target="_blank" rel="noreferrer">{t('forms.changePassword')}</a></p>
          </div>
        </div>
        <div className="p-5 w-2/5">
          <h2 className="text-sm font-extrabold text-gray-400 mb-5">{t('forms.professionalData')}</h2>
          <div className="w-full">
            <div className="form-group w-full mb-5">
              <p className="font-bold mb-1 text-13">
                {t('forms.company')}
                {' '}
              </p>
              <input
                type="text"
                name="name"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={name}
              />
            </div>
            <div className="flex w-full mb-5">
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  {t('forms.address')}
                  {' '}
                </p>
                <input
                  type="text"
                  name="direction"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={direction}
                />
              </div>
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  {t('forms.phone')}
                  {' '}
                </p>
                <input
                  type="tel"
                  name="phoneCompany"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={phoneCompany}
                />
              </div>
            </div>
            <div className="flex w-full mb-5">
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  {t('forms.website')}
                  {' '}
                </p>
                <input
                  type="text"
                  name="website"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={website}
                />
              </div>
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  {t('forms.attachLogo')}
                  {' '}
                </p>
                <input
                  type="file"
                  name="logo"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  accept="image/*"
                />
                {logo && typeof logo === 'string' && (
                  <div className="mt-2">
                    <img src={logo} alt="Logo" className="max-w-full h-20 object-contain" />
                  </div>
                )}
                <p className="text-13 mt-2">{t('forms.logoSize')}</p>
                <p className="text-13">{t('forms.logoType')}</p>
                <p className="text-13">{t('forms.logoDimensions')}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="m-5 mb-2 flex justify-center">
        <button type="submit" className="btn px-5" disabled={isLoading}>{t('forms.save')}</button>
      </div>
    </form>
  );
}
export default SettingsForm;

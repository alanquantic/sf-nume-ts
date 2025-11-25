/* eslint-disable import/order */
import ConsultantForm from '@/components/dashboard/consultant/ConsultantForm';
import ConsultantList from '@/components/dashboard/consultant/ConsultantList';
import ConsultantNotesModal from '@/components/dashboard/consultant/ConsultantNotesModal';
import ConsultantProfile from '@/components/dashboard/consultant/ConsultantProfile';
import SectionTitle from '@/components/SectionTitle';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ConsultantPage() {
  const [searchString, setSearchString] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const { consultant } = useConsult();
  const { user: userAuth } = useAuth();
  const { t } = useTranslation();

  // Obtener las notas del consultor actual
  const users = userAuth?.consultants;
  const consultantInfo = (consultant && Array.isArray(users)) ? users.find((element) => element.id === consultant?.id) : null;
  const consultantNotes = consultantInfo?.notes;

  return (
    <div className="page-content bg-cover">
      <div className="mt-8 flex justify-start items-center pt-10">
        <img src="/assets/welcome.png" className="w-16" alt="welcome" />
        <div>
          <h2 className="font-black mt-0 mb-1 text-main text-2xl">{t('consultant.page.title')}</h2>
          <p className="text-gray-600 text-sm">{t('consultant.page.subtitle')}</p>
        </div>
      </div>
      <div className="grid grid-cols-10 mt-8 gap-4">
        <div className="col-span-6">
          <div className="mb-5">
            <SectionTitle
              title={t('consultant.page.addConsultant')}
            />
            <div className="section-wrap px-2 py-7">
              <ConsultantForm />
            </div>
          </div>
          <div className="mb-5">
            <SectionTitle
              title={t('consultant.page.history')}
            />
            <div className="section-wrap px-2 py-7 users-wrap">
              <div className="users-search rounded-3xl relative mb-6">
                <img
                  src="/assets/ic-search.svg"
                  alt="edit"
                  className="absolute left-2 top-2"
                />
                <input
                  type="search"
                  className="w-full h-8 bg-transparent outline-none pl-10 pr-4"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  placeholder={t('consultant.page.search') as string}
                />
              </div>
              <ul className="users-table h-36 overflow-y-scroll">
                <li className="w-full grid grid-cols-12 font-bold h-10">
                  <div className="col-span-6">{t('consultant.page.name')}</div>
                  <div className="col-span-4">{t('consultant.page.birthDate')}</div>
                  <div className="col-span-2">{t('consultant.page.actions')}</div>
                </li>
                <ConsultantList searchUser={searchString} />

              </ul>
            </div>

          </div>

        </div>
        <div className="col-span-4">
          <SectionTitle
            title={t('consultant.page.profile')}
          />
          <div className="section-wrap px-2 py-7">
            {/* Botón para ver notas */}
            {consultantNotes && Object.keys(consultantNotes).length > 0 && (
              <div className="mb-4">
                <button
                  type="button"
                  className="bg-main rounded-full text-white px-4 py-2 flex items-center gap-2 font-bold hover:opacity-90 transition-opacity"
                  onClick={() => setShowNotesModal(true)}
                >
                  <img
                    src="/assets/navbar/notes.svg"
                    alt="notas"
                    className="w-4 h-4"
                  />
                  {t('consultant.page.showNotes')}
                </button>
              </div>
            )}
            <ConsultantProfile />
          </div>
        </div>
      </div>

      {/* Modal de notas del consultor */}
      <ConsultantNotesModal
        isOpen={showNotesModal}
        setIsOpen={setShowNotesModal}
        notes={consultantNotes || {}}
      />

    </div>
  );
}

export default ConsultantPage;

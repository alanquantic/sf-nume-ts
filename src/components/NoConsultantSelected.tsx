import { useTranslation } from 'react-i18next';

function NoConsultantSelected() {
  const { t } = useTranslation();

  return (
    <div className="mt-8 ml-14 flex justify-start items-center pt-8">
      <img src="/assets/welcome.png" className="w-16" alt="welcome" />
      <h2 className="font-black my-0 mb-2 text-main-700 text-2xl">
        {t('selectConsultantToContinue')}
      </h2>
    </div>
  );
}

export default NoConsultantSelected;

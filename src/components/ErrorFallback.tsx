import { useTranslation } from 'react-i18next';

function ErrorFallback() {
  const { t } = useTranslation();

  return (
    <div
      className="text-white w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <img src="/assets/logo.png" className="app-logo" alt="app-logo" />
      <h2 className="text-lg font-semibold my-3">{t('somethingWentWrong')}</h2>
      <button type="button" className="btn btn-white mt-4" onClick={() => window.location.assign(window.location.origin)}>
        {t('tryAgain')}
      </button>
    </div>
  );
}

export default ErrorFallback;

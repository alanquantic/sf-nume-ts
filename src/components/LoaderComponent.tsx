import { useTranslation } from 'react-i18next';
import Spinner from './Spinner';

export function LoaderComponent() {
  const { t } = useTranslation();

  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="text-center">
        <img src="/assets/logo.png" className="app-logo" alt="app-logo" />
        <p className="text-white flex items-center mt-4 justify-center">
          <Spinner className="mr-1" size="sm" />
          {t('loading')}
        </p>
      </div>
    </div>
  );
}

export default LoaderComponent;

import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <>
      <nav className="bg-white border-gray-200 max-h-[85px] h-[85px]">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            <img src="/assets/logo_login.png" alt="app-logo" className="w-28" />
          </Link>
          <div
            className="main-menu hidden w-full md:block md:w-auto mr-3"
          />
        </div>
      </nav>
      <div className="bg-app bg-cover">
        <div className="page bg-cover bg-scroll grid grid-cols-14 h-full">
          <div className="col-span-9 grid grid-cols-9 bg-no-repeat bg-cover bg-login-numbers">
            <div className="col-start-2 col-span-3 bg-contain bg-repeat-y bg-login-shape" />
            <div className="col-span-4 flex flex-col justify-center items-start">
              <h2 className="text-4xl font-bold text-main-900 mb-7">
                {t('loginPage.title')}
              </h2>
              <h2 className="text-4xl text-main-900">
                {t('loginPage.subtitle')}
              </h2>
            </div>
          </div>
          <div className="col-span-5 h-full flex flex-col items-center justify-center bg-white bg-opacity-50">
            <div className="w-full flex flex-col items-center justify-center">
              <img src="/assets/welcome.png" className="w-32" alt="welcome" />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;

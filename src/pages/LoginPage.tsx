import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CgSpinnerTwo } from 'react-icons/cg';

import { useAuth } from '@/context/AuthProvider';
import useForm from '@/hooks/useForm';

function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const { t } = useTranslation();

  const initialForm = {
    email: '',
    password: '',
  };

  const {
    email, password, handleInputChange,
  } = useForm(initialForm);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ username: email, password });
    } catch (err) {
      // Los errores se manejan en AuthProvider con toast notifications
    }
  };

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
              <h2>{t('loginPage.login')}</h2>
              <form onSubmit={handleOnSubmit} className="w-full m-5 flex flex-col items-center">
                <input
                  type="email"
                  placeholder={t('loginPage.email') as string}
                  value={email}
                  name="email"
                  id="email"
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-4/6 h-8 border border-gray-400 rounded-md text-[13px] text-center mb-5 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder={t('loginPage.password') as string}
                  value={password}
                  name="password"
                  id="password"
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-4/6 h-8 border border-gray-400 rounded-md text-[13px] text-center mb-5 outline-none"
                  required
                />
                <button
                  type="submit"
                  className={cx('btn w-5/12', { 'btn-icon': isLoggingIn })}
                  value={t('loginPage.enter') as string}
                  disabled={isLoggingIn}
                >
                  {t('loginPage.enter')}
                  {isLoggingIn && <CgSpinnerTwo className="animate-spin ml-2" />}
                </button>
              </form>
              <a href="https://app.numerologia-cotidiana.com/mi-cuenta/lost-password/" target="_blank" rel="noreferrer">
                {t('loginPage.forgotPassword')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

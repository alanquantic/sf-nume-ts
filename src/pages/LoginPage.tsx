import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CgSpinnerTwo } from 'react-icons/cg';

import AuthLayout from '@/components/AuthLayout';
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
    <AuthLayout>
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
      <Link to="/forgot-password">
        {t('loginPage.forgotPassword')}
      </Link>
    </AuthLayout>
  );
}

export default LoginPage;

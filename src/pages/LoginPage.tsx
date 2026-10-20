import { useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CgSpinnerTwo } from 'react-icons/cg';
import {
  MdLockOutline, MdMailOutline, MdVisibility, MdVisibilityOff,
} from 'react-icons/md';

import AuthLayout from '@/components/AuthLayout';
import { useAuth } from '@/context/AuthProvider';
import useForm from '@/hooks/useForm';

const inputClass = cx(
  'w-full h-12 pl-11 pr-4 bg-white border-2 border-gray-300 rounded-xl shadow-sm outline-none transition-all',
  'text-base text-gray-800 placeholder-gray-400',
  'hover:border-main-700/60 focus:border-main-700 focus:ring-4 focus:ring-main-700/20',
);
const iconClass = cx(
  'absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none',
  'transition-colors group-focus-within:text-main-700',
);
const toggleClass = cx(
  'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-xl text-gray-500 outline-none',
  'hover:text-main-700 hover:bg-main-700/10 focus-visible:ring-2 focus-visible:ring-main-700/40',
);

function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

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
      <h2 className="text-2xl font-bold text-main-900">{t('loginPage.login')}</h2>
      <form onSubmit={handleOnSubmit} className="w-4/6 my-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            {t('loginPage.email')}
          </label>
          <div className="relative group">
            <MdMailOutline className={iconClass} />
            <input
              type="email"
              placeholder={t('loginPage.emailPlaceholder') as string}
              value={email}
              name="email"
              id="email"
              autoComplete="username"
              onChange={(e) => handleInputChange(e.target)}
              className={inputClass}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            {t('loginPage.password')}
          </label>
          <div className="relative group">
            <MdLockOutline className={iconClass} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleInputChange(e.target)}
              className={cx(inputClass, 'pr-12')}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={toggleClass}
              aria-label={t(showPassword ? 'loginPage.hidePassword' : 'loginPage.showPassword') as string}
              title={t(showPassword ? 'loginPage.hidePassword' : 'loginPage.showPassword') as string}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={cx('btn w-full h-12 mt-2 text-lg', { 'btn-icon': isLoggingIn })}
          value={t('loginPage.enter') as string}
          disabled={isLoggingIn}
        >
          {t('loginPage.enter')}
          {isLoggingIn && <CgSpinnerTwo className="animate-spin ml-2" />}
        </button>
      </form>
      <Link to="/forgot-password" className="text-main-700 font-semibold hover:underline">
        {t('loginPage.forgotPassword')}
      </Link>
    </AuthLayout>
  );
}

export default LoginPage;

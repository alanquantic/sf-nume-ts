import cx from 'classnames';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { CgSpinnerTwo } from 'react-icons/cg';

import { getApiErrorMessage, resetPassword } from '@/api/password';
import AuthLayout from '@/components/AuthLayout';

// Debe coincidir con MIN_PASSWORD_LENGTH del backend (authService)
const MIN_PASSWORD_LENGTH = 8;

function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error(t('passwordReset.tooShort', { min: MIN_PASSWORD_LENGTH }));
      return;
    }
    if (password !== confirmPassword) {
      toast.error(t('passwordReset.mismatch'));
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      toast.success(t('passwordReset.success'));
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(getApiErrorMessage(err, t('passwordReset.genericError')));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h2>{t('passwordReset.resetTitle')}</h2>
      {token ? (
        <form onSubmit={handleOnSubmit} className="w-full m-5 flex flex-col items-center">
          <input
            type="password"
            placeholder={t('passwordReset.newPassword') as string}
            value={password}
            name="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-4/6 h-8 border border-gray-400 rounded-md text-[13px] text-center mb-5 outline-none"
            required
          />
          <input
            type="password"
            placeholder={t('passwordReset.confirmPassword') as string}
            value={confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-4/6 h-8 border border-gray-400 rounded-md text-[13px] text-center mb-5 outline-none"
            required
          />
          <button
            type="submit"
            className={cx('btn w-5/12', { 'btn-icon': isSubmitting })}
            disabled={isSubmitting}
          >
            {t('passwordReset.save')}
            {isSubmitting && <CgSpinnerTwo className="animate-spin ml-2" />}
          </button>
        </form>
      ) : (
        <div className="w-4/6 m-5 flex flex-col items-center text-center text-[13px]">
          <p className="mb-3">{t('passwordReset.missingToken')}</p>
          <Link to="/forgot-password" className="underline">
            {t('passwordReset.requestNewLink')}
          </Link>
        </div>
      )}
      <Link to="/login">
        {t('passwordReset.backToLogin')}
      </Link>
    </AuthLayout>
  );
}

export default ResetPasswordPage;

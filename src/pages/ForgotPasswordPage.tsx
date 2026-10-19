import cx from 'classnames';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CgSpinnerTwo } from 'react-icons/cg';

import { getApiErrorMessage, requestPasswordReset } from '@/api/password';
import AuthLayout from '@/components/AuthLayout';

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await requestPasswordReset(email.trim());
      setSentMessage(response.message || t('passwordReset.emailSent'));
    } catch (err) {
      toast.error(getApiErrorMessage(err, t('passwordReset.genericError')));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h2>{t('passwordReset.forgotTitle')}</h2>
      {sentMessage ? (
        <p className="w-4/6 text-center text-[13px] m-5">{sentMessage}</p>
      ) : (
        <form onSubmit={handleOnSubmit} className="w-full m-5 flex flex-col items-center">
          <p className="w-4/6 text-center text-[13px] mb-5">{t('passwordReset.forgotDescription')}</p>
          <input
            type="email"
            placeholder={t('loginPage.email') as string}
            value={email}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-4/6 h-8 border border-gray-400 rounded-md text-[13px] text-center mb-5 outline-none"
            required
          />
          <button
            type="submit"
            className={cx('btn w-5/12', { 'btn-icon': isSubmitting })}
            disabled={isSubmitting}
          >
            {t('passwordReset.sendLink')}
            {isSubmitting && <CgSpinnerTwo className="animate-spin ml-2" />}
          </button>
        </form>
      )}
      <Link to="/login">
        {t('passwordReset.backToLogin')}
      </Link>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;

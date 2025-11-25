import miniLaura from '@/assets/mini-laura.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FloatingLaura from './FloatingLaura';

export default function FloatingLauraButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="floating-laura-button"
        title={t('modal.glossary.title') as string}
      >
        <img
          src={miniLaura}
          alt="Laura - Glosario"
          className="w-full h-full object-cover rounded-full"
        />
      </button>

      <FloatingLaura
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

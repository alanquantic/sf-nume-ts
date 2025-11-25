import Modal from 'react-modal';

import { MdClose } from 'react-icons/md';

import { modalStylesLarge, modalStylesSmall } from '@/utils/styles';

type Props = {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoading: boolean;
  size: 'small' | 'large';
  onClose?: () => void;
};

function MyModal({
  icon,
  title,
  children,
  isOpen,
  setIsOpen,
  isLoading,
  size = 'small',
  onClose,
}: Props) {
  const modalStyles = size === 'large' ? modalStylesLarge as Modal.Styles : modalStylesSmall as Modal.Styles;

  const handleResetBody = () => {
    document.body.style.overflow = 'unset';
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => !isLoading && setIsOpen(false)}
      contentLabel={title}
      style={modalStyles}
      onAfterClose={() => {
        onClose?.();
        handleResetBody();
      }}
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          {icon && icon}
          <h2 className="text-gray-900 text-lg m-0 flex-grow">
            {title}
          </h2>
          <button type="button" onClick={() => !isLoading && setIsOpen(false)}>
            <MdClose />
          </button>
        </div>
        <hr className="border-gray-200" />
        {children}
      </div>
    </Modal>
  );
}

MyModal.defaultProps = {
  icon: null,
  onClose: () => { },
};

export default MyModal;

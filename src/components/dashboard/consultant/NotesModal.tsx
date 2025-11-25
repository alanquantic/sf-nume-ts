/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-bracket-location */
import cx from 'classnames';

type NotesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size: 'medium' | 'large';
};

function NotesModal({
  isOpen, onClose, title, children, size = 'medium',
}: NotesModalProps) {
  if (!isOpen) return null;

  const maxWidth = size === 'large' ? 'max-w-4xl' : 'max-w-2xl';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
      <div className={cx(
        'bg-white rounded-2xl shadow-2xl relative w-full max-h-[95vh] overflow-hidden',
        'border border-gray-100',
        maxWidth,
      )}>
        {/* Header con color sólido - igual al modal de PDF */}
        <div className="bg-main-700 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              className="w-8 h-8 bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 group"
              type="button"
              onClick={onClose}
            >
              <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {children}
        </div>

        {/* Footer decorativo */}
        <div className="h-1 bg-main-700 rounded-b-2xl" />
      </div>
    </div>
  );
}

export default NotesModal;

import { useTranslation } from 'react-i18next';

import {
  formatDate, getTheRoute, pageNameBySlug, parseLocalDate,
} from '@/utils/constants';
import { NavLink } from 'react-router-dom';
import NotesModal from './NotesModal';

type ConsultantNotesModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  notes: Record<string, Record<string, string>>;
};

function ConsultantNotesModal({ isOpen, setIsOpen, notes }: ConsultantNotesModalProps) {
  const { t } = useTranslation();

  if (!notes) {
    return (
      <NotesModal
        size="large"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t('consultant.notes.notesConsultant')}
      >
        <div className="p-4 text-center text-gray-500">
          {t('consultant.notes.noNotes')}
        </div>
      </NotesModal>
    );
  }

  // Convertir las notas a un array y ordenar por fecha (más recientes primero)
  const notesArray = Object.entries(notes).map(([date, noteContent]) => ({
    date,
    content: noteContent,
  }));

  // Ordenar por fecha descendente (más recientes primero)
  notesArray.sort((a, b) => {
    const dateA = parseLocalDate(a.date);
    const dateB = parseLocalDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <NotesModal
      size="large"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={t('consultant.notes.notesConsultant')}
    >
      <div className="max-h-96 overflow-y-auto">
        {notesArray.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t('consultant.notes.noNotes')}
          </div>
        ) : (
          notesArray.map((note) => (
            <div key={note.date} className="mb-4">
              <div className="bg-gradient-to-r from-main-50 to-secondary-50 rounded-xl p-4 border border-main-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-main-800 font-semibold text-sm">
                    {formatDate({ date: note.date, format: 'long', locale: t('locale') as string })}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate({ date: note.date, format: 'short', locale: t('locale') as string })}
                  </span>
                </div>
                <div className="grid gap-3">
                  {Object.entries(note.content).map(([path, content]) => (
                    <div key={path} className="p-3 bg-white rounded-lg border-2 border-gray-200">
                      <NavLink to={`/${getTheRoute(path)}`}>
                        <div className="font-semibold text-sm text-gray-700 mb-1">
                          {t('consultant.notes.page')}
                          :
                          {' '}
                          {pageNameBySlug({ name: path })}
                        </div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap">
                          {content}
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </NotesModal>
  );
}

export default ConsultantNotesModal;

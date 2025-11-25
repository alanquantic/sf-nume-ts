import makeConsultant from '@/api/useConsultant';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import { pageNameBySlug } from '@/utils/constants';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotesModal from './NotesModal';

type ConsultantAddNoteModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ConsultantAddNoteModal({ isOpen, setIsOpen }: ConsultantAddNoteModalProps) {
  const location = useLocation();
  const { activeConsultant, updateConsultantPartners } = useConsult();
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  const [content, setContent] = useState('');
  const pathSlug = (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    // Prefer third segment if present (e.g., /personal/pinnacle -> 'pinnacle')
    if (segments[2]) return segments[2];
    if (segments[1]) return segments[1];
    return location.pathname || 'home';
  })();

  const todayKey = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1; // 1-12 without leading zero to match legacy
    const d = now.getDate();
    return `${y}-${m}-${d}`; // e.g., 2025-9-15
  })();

  const handleSave = async () => {
    if (!activeConsultant) return;
    if (!content.trim()) return;

    const existingNotes = activeConsultant.notes || {};
    const dateNotes = existingNotes[todayKey] || {};
    const updatedDateNotes = { ...dateNotes, [pathSlug]: content.trim() };
    const updatedNotes = { ...existingNotes, [todayKey]: updatedDateNotes } as Api.Consultant['notes'];

    const updatedConsultant: Api.Consultant = {
      ...activeConsultant,
      notes: updatedNotes,
    };

    const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
    await addConsultantAsync.mutateAsync(consultantsList);

    // Update context immediately
    updateConsultantPartners(updatedConsultant);

    setContent('');
    setIsOpen(false);
  };

  return (
    <NotesModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Agregar Nota"
      size="large"
    >
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-main-50 to-secondary-50 rounded-xl p-4 border border-main-200 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Fecha:</span>
            {' '}
            {todayKey}
          </div>
          <div>
            <span className="font-semibold">Página:</span>
            {' '}
            {pageNameBySlug({ name: pathSlug })}
          </div>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">Contenido</div>
          <textarea
            id="note-content"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-500 min-h-[120px]"
            placeholder="Escribe la nota aquí..."
            aria-label="Contenido de la nota"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-white"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn"
            disabled={!content.trim() || !activeConsultant}
            onClick={handleSave}
          >
            Guardar Nota
          </button>
        </div>
      </div>
    </NotesModal>
  );
}

export default ConsultantAddNoteModal;

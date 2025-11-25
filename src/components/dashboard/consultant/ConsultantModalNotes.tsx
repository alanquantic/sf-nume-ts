import { useTranslation } from 'react-i18next';

import { formatDate } from '@/utils/constants';
import ConsultantContentNotes from './ConsultantContentNotes';

type ConsultantModalNotesProps = {
  item?: Record<string, Record<string, string>>;
};

function ConsultantModalNotes(modalNote: ConsultantModalNotesProps) {
  const { item: itemNote } = modalNote;
  const { t } = useTranslation();

  if (!itemNote) return <div>{t('consultant.notes.noNotes')}</div>;
  const pages = Object.entries(itemNote).map((items) => items);

  return (
    <li className="flex flex-col overflow-x-hidden overflow-y-auto h-96">
      { pages.map((items) => (
        <div key={items[0]} className="flex flex-col">
          <p className="text-gray-600 text-right text-xs">{formatDate({ date: items[0], format: 'short', locale: t('locale') as string })}</p>
          <ConsultantContentNotes data={items[1]} />
        </div>
      )) }
    </li>
  );
}

export default ConsultantModalNotes;

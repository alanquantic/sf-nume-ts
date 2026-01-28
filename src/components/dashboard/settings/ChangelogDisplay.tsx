import { useTranslation } from 'react-i18next';

import SectionTitle from '@/components/SectionTitle';
import { formatDate } from '@/utils/constants';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    added?: string[];
    changed?: string[];
    fixed?: string[];
  };
}

function ChangelogDisplay() {
  const { t } = useTranslation();

  // Datos del changelog - en el futuro se puede leer del archivo CHANGELOG.md
  const changelogData: ChangelogEntry[] = [
    {
      version: '3.0.1',
      date: '2024-12-XX',
      changes: {
        fixed: [
          'Corrección del número maestro en el reporte personal de creación de nombre',
          'Corrección en los cálculos de los meses personales',
        ],
      },
    },
  ];

  const formatChangelogDate = (dateString: string) => {
    if (dateString.includes('XX')) {
      return dateString.replace('XX', 'Diciembre');
    }
    try {
      const date = new Date(dateString);
      return formatDate({ date, format: 'long', locale: t('locale') as string });
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <SectionTitle
        title={t('sidebar.changelog') || 'Registro de Cambios'}
      />
      <div className="section-wrap px-2 py-5 max-h-96 overflow-y-auto">
        {changelogData.map((entry) => (
          <div key={entry.version} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-13 font-bold text-main-600">
                Versión
                {' '}
                {entry.version}
              </span>
              <span className="text-11 text-gray-500">
                {formatChangelogDate(entry.date)}
              </span>
            </div>
            <div className="space-y-2">
              {entry.changes.fixed && entry.changes.fixed.length > 0 && (
                <div>
                  <p className="text-12 font-semibold text-green-600 mb-1">
                    Corregido:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {entry.changes.fixed.map((change) => (
                      <li key={`fixed-${change}`} className="text-12 text-gray-700">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {entry.changes.added && entry.changes.added.length > 0 && (
                <div>
                  <p className="text-12 font-semibold text-blue-600 mb-1">
                    Añadido:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {entry.changes.added.map((change) => (
                      <li key={`added-${change}`} className="text-12 text-gray-700">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {entry.changes.changed && entry.changes.changed.length > 0 && (
                <div>
                  <p className="text-12 font-semibold text-yellow-600 mb-1">
                    Cambiado:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {entry.changes.changed.map((change) => (
                      <li key={`changed-${change}`} className="text-12 text-gray-700">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChangelogDisplay;

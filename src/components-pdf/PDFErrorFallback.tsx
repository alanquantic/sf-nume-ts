import { PDFError } from '@/types/pdf.types';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

interface PDFErrorFallbackProps {
  error: PDFError;
  consultant: any;
  fallbackMessage: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fef2f2',
    border: '2px solid #dc2626',
    borderRadius: 8,
    margin: 10,
  },
  errorHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 12,
    color: '#991b1b',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDetails: {
    fontSize: 10,
    color: '#7f1d1d',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  suggestions: {
    fontSize: 10,
    color: '#7f1d1d',
    marginTop: 10,
  },
  suggestionItem: {
    fontSize: 10,
    color: '#7f1d1d',
    marginLeft: 10,
    marginBottom: 2,
  },
  consultantInfo: {
    fontSize: 10,
    color: '#374151',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default function PDFErrorFallback({
  error,
  consultant,
  fallbackMessage = 'No se pudo generar este componente del reporte',
}: PDFErrorFallbackProps) {
  const { t } = useTranslation();
  const formatTimestamp = (timestamp: Date) => timestamp.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getSeverityText = (severity: PDFError['severity']) => {
    switch (severity) {
      case 'critical':
        return 'CRÍTICO';
      case 'high':
        return 'ALTO';
      case 'medium':
        return 'MEDIO';
      case 'low':
        return 'BAJO';
      default:
        return 'DESCONOCIDO';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorHeader}>
        ⚠️ ERROR EN REPORTE PDF
      </Text>

      <Text style={styles.errorMessage}>
        {fallbackMessage}
      </Text>

      {error.details && (
        <Text style={styles.errorDetails}>
          Detalles:
          {' '}
          {error.details}
        </Text>
      )}

      <Text style={styles.errorDetails}>
        Tipo:
        {' '}
        {error.type.toUpperCase()}
        {' '}
        | Severidad:
        {' '}
        {getSeverityText(error.severity)}
      </Text>

      {error.component && (
        <Text style={styles.errorDetails}>
          Componente:
          {' '}
          {error.component}
        </Text>
      )}

      {error.suggestions && error.suggestions.length > 0 && (
        <View style={styles.suggestions}>
          <Text style={styles.errorDetails}>Sugerencias para resolver:</Text>
          {error.suggestions.map((suggestion) => (
            <Text style={styles.suggestionItem}>
              •
              {' '}
              {suggestion}
            </Text>
          ))}
        </View>
      )}

      {consultant && (
        <View style={styles.consultantInfo}>
          <Text style={styles.errorDetails}>
            Consultor:
            {' '}
            {consultant.fullName || 'N/A'}
          </Text>
          {consultant.birthDate && (
            <Text style={styles.errorDetails}>
              {t('forms.birthDate')}
              {' '}
              {consultant.getFormattedBirthDate?.() || consultant.birthDate}
            </Text>
          )}
        </View>
      )}

      <Text style={styles.timestamp}>
        Error ocurrido el:
        {' '}
        {formatTimestamp(error.timestamp)}
      </Text>
    </View>
  );
}

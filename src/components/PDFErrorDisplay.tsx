/* eslint-disable max-len */
import { PDFError } from '@/types/pdf.types';

interface PDFErrorDisplayProps {
  errors: PDFError[];
  warnings: PDFError[];
  onDismissError: (errorId: string) => void;
  onDismissWarning: (warningId: string) => void;
  onRetry: () => void;
  className: string;
}

export default function PDFErrorDisplay({
  errors,
  warnings,
  onDismissError,
  onDismissWarning,
  onRetry,
  className = '',
}: PDFErrorDisplayProps) {
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: PDFError['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'high':
        return 'bg-orange-100 border-orange-400 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-400 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: Date) => timestamp.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Critical Errors Section */}
      {errors.filter((error) => error.severity === 'critical').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Errores Críticos
          </h3>
          <div className="space-y-2">
            {errors
              .filter((error) => error.severity === 'critical')
              .map((error) => (
                <div key={error.id} className="bg-white border border-red-200 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-red-800">{error.message}</p>
                      {error.details && (
                        <p className="text-sm text-red-600 mt-1">{error.details}</p>
                      )}
                      {error.suggestions && error.suggestions.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-700">Sugerencias:</p>
                          <ul className="text-sm text-red-600 mt-1 list-disc list-inside">
                            {error.suggestions.map((suggestion) => (
                              <li>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                      <span className="text-xs text-red-500">
                        {formatTimestamp(error.timestamp)}
                      </span>
                      {onDismissError && (
                        <button
                          type="button"
                          onClick={() => onDismissError(error.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Other Errors Section */}
      {errors.filter((error) => error.severity !== 'critical').length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Otros Errores
          </h3>
          <div className="space-y-2">
            {errors
              .filter((error) => error.severity !== 'critical')
              .map((error) => (
                <div key={error.id} className={`bg-white border rounded p-3 ${getSeverityColor(error.severity)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{error.message}</p>
                      {error.details && (
                        <p className="text-sm mt-1 opacity-80">{error.details}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                      <span className="text-xs opacity-70">
                        {formatTimestamp(error.timestamp)}
                      </span>
                      {onDismissError && (
                        <button
                          type="button"
                          onClick={() => onDismissError(error.id)}
                          className="opacity-60 hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Warnings Section */}
      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Advertencias
          </h3>
          <div className="space-y-2">
            {warnings.map((warning) => (
              <div key={warning.id} className="bg-white border border-yellow-200 rounded p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">{warning.message}</p>
                    {warning.details && (
                      <p className="text-sm text-yellow-600 mt-1">{warning.details}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    <span className="text-xs text-yellow-500">
                      {formatTimestamp(warning.timestamp)}
                    </span>
                    {onDismissWarning && (
                      <button
                        type="button"
                        onClick={() => onDismissWarning(warning.id)}
                        className="text-yellow-400 hover:text-yellow-600"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(errors.length > 0 || warnings.length > 0) && (
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {errors.length > 0 && (
              <span className="mr-4">
                {errors.length}
                {' '}
                error
                {errors.length !== 1 ? 'es' : ''}
              </span>
            )}
            {warnings.length > 0 && (
              <span>
                {warnings.length}
                {' '}
                advertencia
                {warnings.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {onRetry && errors.filter((e) => e.recoverable).length > 0 && (
              <button
                type="button"
                onClick={onRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Reintentar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
import {
  ErrorHandlerConfig,
  PDFError, PDFErrorContext, PDFValidationResult,
} from '@/types/pdf.types';
import { useCallback, useState } from 'react';

const DEFAULT_ERROR_CONFIG: ErrorHandlerConfig = {
  showUserFriendlyMessages: true,
  logToConsole: true,
  logToServer: false,
  retryAttempts: 3,
  fallbackComponents: {},
};

export default function usePDFErrorHandler(config: Partial<ErrorHandlerConfig> = {}) {
  const [errors, setErrors] = useState<PDFError[]>([]);
  const [warnings, setWarnings] = useState<PDFError[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mergedConfig = { ...DEFAULT_ERROR_CONFIG, ...config };

  // Generate unique error ID
  const generateErrorId = useCallback(() => `pdf_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, []);

  // Create error object
  const createError = useCallback((
    type: PDFError['type'],
    severity: PDFError['severity'],
    message: string,
    context?: PDFErrorContext,
    details?: string,
    suggestions?: string[],
  ): PDFError => ({
    id: generateErrorId(),
    type,
    severity,
    message,
    details,
    component: context?.component,
    timestamp: new Date(),
    recoverable: severity !== 'critical',
    suggestions,
  }), [generateErrorId]);

  // Add error to state
  const addError = useCallback((error: PDFError) => {
    setErrors((prev) => [...prev, error]);

    if (mergedConfig.logToConsole) {
      console.error(`[PDF Error] ${error.type.toUpperCase()}:`, {
        message: error.message,
        details: error.details,
        component: error.component,
        severity: error.severity,
        timestamp: error.timestamp,
      });
    }

    // Log to server if configured
    if (mergedConfig.logToServer) {
      // TODO: Implement server logging
    }
  }, [mergedConfig]);

  // Add warning to state
  const addWarning = useCallback((warning: PDFError) => {
    setWarnings((prev) => [...prev, warning]);

    if (mergedConfig.logToConsole) {
      console.warn(`[PDF Warning] ${warning.type.toUpperCase()}:`, {
        message: warning.message,
        details: warning.details,
        component: warning.component,
        severity: warning.severity,
        timestamp: warning.timestamp,
      });
    }
  }, [mergedConfig]);

  // Clear all errors and warnings
  const clearErrors = useCallback(() => {
    setErrors([]);
    setWarnings([]);
  }, []);

  // Remove specific error
  const removeError = useCallback((errorId: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== errorId));
  }, []);

  // Remove specific warning
  const removeWarning = useCallback((warningId: string) => {
    setWarnings((prev) => prev.filter((warning) => warning.id !== warningId));
  }, []);

  // Get errors by severity
  const getErrorsBySeverity = useCallback((severity: PDFError['severity']) => errors.filter((error) => error.severity === severity), [errors]);

  // Get errors by type
  const getErrorsByType = useCallback((type: PDFError['type']) => errors.filter((error) => error.type === type), [errors]);

  // Check if there are critical errors
  const hasCriticalErrors = useCallback(() => errors.some((error) => error.severity === 'critical'), [errors]);

  // Check if there are recoverable errors
  const hasRecoverableErrors = useCallback(() => errors.some((error) => error.recoverable), [errors]);

  // Get user-friendly error message
  const getUserFriendlyMessage = useCallback((error: PDFError): string => {
    if (!mergedConfig.showUserFriendlyMessages) {
      return error.message;
    }

    const userMessages: Record<string, string> = {
      validation: 'Error de validación en los datos del reporte',
      generation: 'Error al generar el reporte PDF',
      component: 'Error en un componente del reporte',
      resource: 'Error al cargar recursos del reporte',
      system: 'Error del sistema al generar el reporte',
    };

    return userMessages[error.type] || 'Error desconocido al generar el reporte';
  }, [mergedConfig]);

  // Validate PDF data
  const validatePDFData = useCallback((data: any, context?: PDFErrorContext): PDFValidationResult => {
    const validationErrors: PDFError[] = [];
    const validationWarnings: PDFError[] = [];

    // Validate consultant
    if (!data.consultant) {
      validationErrors.push(createError(
        'validation',
        'critical',
        'Consultor no encontrado',
        context,
        'El objeto consultant es requerido para generar el reporte',
      ));
    }

    // Validate profile
    if (!data.profile) {
      validationErrors.push(createError(
        'validation',
        'critical',
        'Perfil no encontrado',
        context,
        'El objeto profile es requerido para generar el reporte',
      ));
    }

    // Validate config
    if (!data.config || !Array.isArray(data.config) || data.config.length === 0) {
      validationErrors.push(createError(
        'validation',
        'critical',
        'Configuración de reporte inválida',
        context,
        'La configuración del reporte debe ser un array no vacío',
      ));
    }

    // Validate sidebar
    if (!data.sidebar) {
      validationWarnings.push(createError(
        'validation',
        'low',
        'Información de sidebar incompleta',
        context,
        'La información de contacto puede estar incompleta',
      ));
    }

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
      warnings: validationWarnings,
    };
  }, [createError]);

  // Handle component error with fallback
  const handleComponentError = useCallback((error: Error, componentName: string, context?: PDFErrorContext) => {
    const pdfError = createError(
      'component',
      'high',
      `Error en componente ${componentName}`,
      context,
      error.message,
      ['Verificar datos del componente', 'Revisar configuración del reporte'],
    );

    addError(pdfError);

    // Return fallback component if available
    if (mergedConfig.fallbackComponents[componentName]) {
      return mergedConfig.fallbackComponents[componentName];
    }

    return null;
  }, [createError, addError, mergedConfig]);

  // Retry function with exponential backoff
  const retryOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    maxAttempts: number = mergedConfig.retryAttempts,
  ): Promise<T> => {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxAttempts) {
          throw lastError;
        }

        // Exponential backoff
        const delay = 2 ** attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }, [mergedConfig]);

  return {
    // State
    errors,
    warnings,
    isProcessing,
    setIsProcessing,

    // Error management
    addError,
    addWarning,
    clearErrors,
    removeError,
    removeWarning,

    // Error queries
    getErrorsBySeverity,
    getErrorsByType,
    hasCriticalErrors,
    hasRecoverableErrors,

    // Utilities
    createError,
    getUserFriendlyMessage,
    validatePDFData,
    handleComponentError,
    retryOperation,

    // Configuration
    config: mergedConfig,
  };
}

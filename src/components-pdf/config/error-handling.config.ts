import { ErrorHandlerConfig } from '@/types/pdf.types';

// Configuración por defecto para el manejo de errores en PDFs
export const DEFAULT_PDF_ERROR_CONFIG: ErrorHandlerConfig = {
  showUserFriendlyMessages: true,
  logToConsole: true,
  logToServer: false,
  retryAttempts: 3,
  fallbackComponents: {
    // Componentes de fallback para diferentes tipos de errores
    pinnacle: {
      name: 'Componente de Error - Pináculo',
      component: 'ErrorFallback',
    },
    annualReturns: {
      name: 'Componente de Error - Retornos Anuales',
      component: 'ErrorFallback',
    },
    lifePath: {
      name: 'Componente de Error - Camino de Vida',
      component: 'ErrorFallback',
    },
  },
};

// Configuración específica para diferentes entornos
export const PDF_ERROR_CONFIGS = {
  development: {
    ...DEFAULT_PDF_ERROR_CONFIG,
    logToConsole: true,
    logToServer: false,
    showUserFriendlyMessages: false, // Mostrar mensajes técnicos en desarrollo
  },
  production: {
    ...DEFAULT_PDF_ERROR_CONFIG,
    logToConsole: false,
    logToServer: true,
    showUserFriendlyMessages: true,
    retryAttempts: 2, // Menos reintentos en producción
  },
  testing: {
    ...DEFAULT_PDF_ERROR_CONFIG,
    logToConsole: true,
    logToServer: false,
    showUserFriendlyMessages: false,
    retryAttempts: 1,
  },
};

// Mensajes de error personalizados por idioma
export const ERROR_MESSAGES = {
  es: {
    validation: {
      missing_consultant: 'Consultor no encontrado',
      missing_profile: 'Perfil no encontrado',
      invalid_config: 'Configuración de reporte inválida',
      incomplete_data: 'Datos incompletos para generar el reporte',
    },
    generation: {
      component_error: 'Error en componente del reporte',
      config_error: 'Error al procesar configuración del reporte',
      render_error: 'Error al renderizar el reporte',
      no_components: 'No se pudieron generar componentes del reporte',
    },
    system: {
      modal_open_error: 'Error al abrir el modal de reportes',
      report_selection_error: 'Error al seleccionar reporte',
      preview_error: 'Error al activar vista previa',
      pdf_generation_error: 'Error al generar el reporte PDF',
    },
    suggestions: {
      verify_data: 'Verificar que todos los datos estén completos',
      try_again: 'Intentar generar el reporte nuevamente',
      contact_admin: 'Contactar al administrador si el problema persiste',
      reload_page: 'Recargar la página',
      check_config: 'Verificar la configuración del reporte',
    },
  },
  en: {
    validation: {
      missing_consultant: 'Consultant not found',
      missing_profile: 'Profile not found',
      invalid_config: 'Invalid report configuration',
      incomplete_data: 'Incomplete data to generate report',
    },
    generation: {
      component_error: 'Error in report component',
      config_error: 'Error processing report configuration',
      render_error: 'Error rendering report',
      no_components: 'Could not generate report components',
    },
    system: {
      modal_open_error: 'Error opening reports modal',
      report_selection_error: 'Error selecting report',
      preview_error: 'Error activating preview',
      pdf_generation_error: 'Error generating PDF report',
    },
    suggestions: {
      verify_data: 'Verify that all data is complete',
      try_again: 'Try generating the report again',
      contact_admin: 'Contact administrator if problem persists',
      reload_page: 'Reload the page',
      check_config: 'Check report configuration',
    },
  },
};

// Configuración de reintentos con backoff exponencial
export const RETRY_CONFIG = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 segundo
  maxDelay: 10000, // 10 segundos
  backoffMultiplier: 2,
};

// Configuración de logging
export const LOGGING_CONFIG = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  format: {
    timestamp: true,
    level: true,
    component: true,
    message: true,
    details: true,
    stack: false, // Solo en desarrollo
  },
};

// Configuración de componentes de fallback
export const FALLBACK_COMPONENTS = {
  // Componentes que se mostrarán cuando fallen los principales
  pinnacle: {
    name: 'Error en Pináculo',
    message: 'No se pudo generar el componente de Pináculo',
    severity: 'high',
  },
  annualReturns: {
    name: 'Error en Retornos Anuales',
    message: 'No se pudo generar el componente de Retornos Anuales',
    severity: 'medium',
  },
  lifePath: {
    name: 'Error en Camino de Vida',
    message: 'No se pudo generar el componente de Camino de Vida',
    severity: 'medium',
  },
  name: {
    name: 'Error en Análisis de Nombres',
    message: 'No se pudo generar el componente de Análisis de Nombres',
    severity: 'medium',
  },
  vibrationTime: {
    name: 'Error en Tiempo de Vibración',
    message: 'No se pudo generar el componente de Tiempo de Vibración',
    severity: 'medium',
  },
};

// Función para obtener la configuración según el entorno
export const getErrorConfig = (environment: 'development' | 'production' | 'testing' = 'development'): ErrorHandlerConfig => PDF_ERROR_CONFIGS[environment] || DEFAULT_PDF_ERROR_CONFIG;

// Función para obtener mensajes según el idioma
export const getErrorMessages = (language: 'es' | 'en' = 'es') => ERROR_MESSAGES[language] || ERROR_MESSAGES.es;

// Función para calcular el delay de reintento
export const calculateRetryDelay = (attempt: number): number => {
  const delay = RETRY_CONFIG.baseDelay * RETRY_CONFIG.backoffMultiplier ** (attempt - 1);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
};

export default {
  DEFAULT_PDF_ERROR_CONFIG,
  PDF_ERROR_CONFIGS,
  ERROR_MESSAGES,
  RETRY_CONFIG,
  LOGGING_CONFIG,
  FALLBACK_COMPONENTS,
  getErrorConfig,
  getErrorMessages,
  calculateRetryDelay,
};

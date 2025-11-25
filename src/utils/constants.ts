import { getYear } from 'date-fns';
import { includes } from 'lodash';

// eslint-disable-next-line prefer-destructuring
const env = import.meta.env;

export default env;

/**
 * Parse a date string or Date object as a local date to avoid timezone offset issues.
 * When parsing date strings in format "YYYY-MM-DD", JavaScript interprets them as UTC,
 * which can cause dates to shift by one day when converted to local time in certain timezones.
 * This function ensures dates are parsed as local dates regardless of timezone.
 *
 * @param dateValue - A date string (e.g., "1997-12-12") or Date object
 * @returns A Date object representing the date in local timezone
 */
export function parseLocalDate(dateValue: string | Date): Date {
  if (dateValue instanceof Date) {
    return dateValue;
  }

  // If it's a string, parse it as local date to avoid timezone offset issues
  // Expected format: "YYYY-MM-DD"
  const dateParts = dateValue.split('-');
  if (dateParts.length !== 3) {
    // Fallback to standard Date parsing if format is unexpected
    return new Date(dateValue);
  }

  return new Date(
    parseInt(dateParts[0], 10), // year
    parseInt(dateParts[1], 10) - 1, // month (0-indexed)
    parseInt(dateParts[2], 10), // day
  );
}

export function formatDate(opts: { date: Date | string, format: 'short' | 'long', locale?: string }) {
  const locale = opts.locale || 'es-MX';
  const date = parseLocalDate(opts.date);
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: opts.format === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).replace(/ de /g, ' ').replace('.', '');
}
export const sanitize = (text: string) => text
  .toString()
  .normalize('NFD') // split an accented letter in the base letter and the acent
  .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/-+/g, '-');

export const isValidDate = (date: string) => {
  if (!date) return false;
  if (getYear(new Date(date)) > 2100) return false;
  if (getYear(new Date(date)) < 1800) return false;
  return true;
};

export function pageNameBySlug(opts:{ name:string }) {
  switch (opts.name) {
    // Legacy personal keys
    case 'pinaculo': return 'Pináculo';
    case 'camino': return 'Camino de Vida';
    case 'nombre': return 'Nombre';
    case 'crear_nombre': return 'Crear Nombre';
    case 'destino': return 'Tabla del Destino';
    case 'tiempo': return 'Vibración de Tiempo';
    case 'retornos': return 'Retornos Anuales';
    case 'circulo_tiempo': return 'Círculo del Tiempo';
    case 'calendario': return 'Calendario Anual';
    case 'calendarioMensual': return 'Calendario Mensual';

    // Current personal route slugs
    case 'pinnacle': return 'Pináculo';
    case 'life_path': return 'Camino de Vida';
    case 'name': return 'Nombre';
    case 'create-name': return 'Crear Nombre';
    case 'destiny_table': return 'Tabla del Destino';
    case 'time_vibration': return 'Vibración del Tiempo';
    case 'annual_returns': return 'Retornos Anuales';
    case 'time_circle': return 'Círculo del Tiempo';
    case 'annual_calendar': return 'Calendario Anual';
    case 'monthly_calendar': return 'Calendario Mensual';

    // Legacy partner keys
    case 'sinastria': return 'Sinastría Análisis';
    case 'sinastria_vibracion': return 'Sinastría Vibración del Tiempo';
    case 'sinastria_retornos': return 'Sinastría Retornos Anuales';
    case 'sinastria_destino': return 'Sinastría Tabla del Destino Pareja';
    case 'sinastria_compatibilidad': return 'Sinastría Tabla de Compatibilidad';

    // Current partner route slugs
    case 'synastry_pinnacle': return 'Pináculo de Sinastría';
    case 'synastry_annual_returns': return 'Retornos Anuales de Sinastría';
    case 'synastry_destiny_table': return 'Tabla del Destino de Sinastría';
    case 'synastry_compatibility_table': return 'Tabla de Compatibilidad de Sinastría';
    case 'synastry_time_circle': return 'Círculo del Tiempo de Sinastría';
    case 'synastry_monthly_calendar': return 'Calendario Mensual de Sinastría';
    case 'synastry_annual_calendar': return 'Calendario Anual de Sinastría';
    case 'synastry_time_vibration': return 'Vibración del Tiempo de Sinastría';

    // Group keys (legacy and current)
    case 'group_pinnacle': return 'Grupo Pináculo';
    case 'group_vibracion': return 'Grupo Vibración del Tiempo'; // legacy
    case 'group_retornos': return 'Grupo Retornos Anuales'; // legacy
    case 'group_time_circle': return 'Grupo Círculo del Tiempo';
    case 'group_monthly_calendar': return 'Grupo Calendario Mensual';
    case 'group_annual_calendar': return 'Grupo Calendario Anual';
    case 'group_annual_returns': return 'Grupo Retornos Anuales';
    case 'group_vibration_time': return 'Grupo Vibración del Tiempo';
    default: return 'Numerología';
  }
}
export const getUrlLegacy = (path: string): string => {
  switch (path) {
    case 'pinaculo': return 'personal/pinnacle';
    case 'camino': return 'personal/life_path';
    case 'nombre': return 'personal/name';
    case 'crear_nombre': return 'personal/create-name';
    case 'destino': return 'personal/destiny_table';
    case 'tiempo': return 'personal/time_vibration';
    case 'retornos': return 'personal/annual_returns';
    case 'circulo_tiempo': return 'personal/time_circle';
    case 'calendario': return 'personal/annual_calendar';
    case 'calendarioMensual': return 'personal/monthly_calendar';
    case 'sinastria': return 'partner/synastry_pinnacle';
    case 'sinastria_vibracion': return 'partner/synastry_time_vibration';
    case 'sinastria_retornos': return 'partner/synastry_annual_returns';
    case 'sinastria_destino': return 'partner/synastry_destiny_table';
    case 'sinastria_compatibilidad': return 'partner/synastry_compatibility_table';
    case 'group_vibration': return 'group/group_vibration_time';
    case 'group_retornos': return 'group/group_annual_returns';
    default: return `personal/${path}`;
  }
};
export const getTheRoute = (path: string): string => {
  // First check if there's a legacy route match
  const legacyRoute = getUrlLegacy(path);
  if (legacyRoute !== `personal/${path}`) {
    return legacyRoute;
  }

  // If no legacy match, proceed with regular route checks
  if (includes(path, 'synastry')) {
    return `partner/${path}`;
  }
  if (includes(path, 'group')) {
    return `group/${path}`;
  }
  return `personal/${path}`;
};
export const licenseTypes = (licenseId: string) => {
  switch (licenseId) {
    case '425': return '3 año';
    case '424': return '1 años';
    default: return 'N/A';
  }
};

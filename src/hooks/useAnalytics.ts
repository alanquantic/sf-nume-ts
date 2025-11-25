import { useCallback } from 'react';

import { trackCustomEvent, trackEvent } from '@/utils/analytics';

/**
 * Custom hook for Google Analytics tracking
 *
 * @example
 * const analytics = useAnalytics();
 * analytics.trackEvent('button_click', { category: 'navigation', label: 'header_menu' });
 */
export function useAnalytics() {
  const track = useCallback((
    eventName: string,
    eventParams?: {
      action?: string;
      category?: string;
      label?: string;
      value?: number;
      [key: string]: unknown;
    },
  ) => {
    trackEvent(eventName, eventParams);
  }, []);

  const trackCustom = useCallback((
    eventName: string,
    parameters?: Record<string, unknown>,
  ) => {
    trackCustomEvent(eventName, parameters);
  }, []);

  return {
    trackEvent: track,
    trackCustomEvent: trackCustom,
  };
}

export default useAnalytics;

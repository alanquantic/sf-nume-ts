// Google Analytics utility functions
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-FD0QQZV0E1';

/**
 * Initialize Google Analytics
 * This should be called once when the app loads
 */
export const initGA = () => {
  // Check if gtag is already initialized
  if (typeof window.gtag === 'function') {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  // Set initial timestamp
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
};

/**
 * Track a page view
 * @param pagePath - The path of the page (e.g., '/dashboard')
 * @param pageTitle - Optional page title
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track an event
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    action?: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
  },
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track a custom event with more flexibility
 * @param eventName - Name of the event
 * @param parameters - Any additional parameters
 */
export const trackCustomEvent = (
  eventName: string,
  parameters?: Record<string, unknown>,
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }
};

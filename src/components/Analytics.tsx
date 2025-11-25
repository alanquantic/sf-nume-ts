import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { initGA, trackPageView } from '@/utils/analytics';

/**
 * Analytics component that initializes Google Analytics
 * and tracks page views on route changes
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default Analytics;

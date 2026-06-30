import { useCallback, useRef } from 'react';

/**
 * Guards an async submit handler against duplicate runs caused by rapid
 * double-clicks or double "Enter".
 *
 * A `disabled={isLoading}` attribute only takes effect after the next React
 * render, which leaves a race window where a second synchronous click can fire
 * the mutation again. This synchronous `useRef` flag closes that window by
 * ignoring re-entrant calls while a submission is still in flight.
 *
 * Keep using the mutation's `isLoading` (or local loading state) for the
 * `disabled` attribute and spinner; use `runOnce` to wrap the actual work.
 *
 * @example
 * const runOnce = useSubmitGuard();
 * const handleSubmit = (e) => {
 *   e.preventDefault();
 *   runOnce(async () => {
 *     await mutation.mutateAsync(payload);
 *   });
 * };
 */
export default function useSubmitGuard() {
  const inFlight = useRef(false);

  return useCallback(async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    if (inFlight.current) return undefined;
    inFlight.current = true;
    try {
      return await fn();
    } finally {
      inFlight.current = false;
    }
  }, []);
}

/* eslint-disable max-len, react/require-default-props */
import { useEffect, useState } from 'react';

interface ToastMessageProps {
  delay?: number; // Tiempo en ms antes de mostrar el toast
  duration?: number; // Duración en ms que se mantiene visible
  message?: string;
}

export default function ToastMessage({
  delay = 3000,
  duration = 10000,
  message = 'Mira los nuevos reportes disponibles',
}: ToastMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Mostrar el toast después del delay
    const showTimer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50); // Pequeño delay para la animación
    }, delay);

    // Ocultar el toast después de la duración
    const hideTimer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Tiempo de animación de salida
    }, delay + duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [delay, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible && !isAnimating) {
    return null;
  }

  return (
    <div className="fixed bottom-100 right-6 z-50">
      <div
        id="toast-default"
        className={`flex items-center w-full max-w-md p-4 text-gray-500 bg-main rounded-lg transition-all duration-300 ease-in-out transform ${
          isAnimating && isVisible
            ? 'translate-x-0 opacity-100 scale-100'
            : 'translate-x-full opacity-0 scale-95'
        }`}
        role="alert"
      >

        <div className="mx-3 text-sm font-normal text-white">
          <a href="https://tienda.numerologia-cotidiana.com/" target="_blank" rel="noreferrer">{message}</a>
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-main text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500  transition-colors duration-200"
          onClick={handleClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import miniLaura from '@/assets/mini-laura.png';
import { trackEvent } from '@/utils/analytics';

// Recomendaciones de productos que se administran en el panel de NUME.
// Ver API NUME-promo/docs/LAURA_RECOMMENDATIONS_ENDPOINT.md
// En desarrollo se usa el proxy de vite.config.ts (localhost no está en la lista blanca).
const PROMO_API_URL = import.meta.env.VITE_PROMO_API_URL
  || (import.meta.env.DEV ? '/promo-api' : 'https://api-nume-production.up.railway.app/api/v1');
// Tipos separados por coma (p. ej. "software,certificacion"); vacío = todos.
const PROMO_TYPES = import.meta.env.VITE_PROMO_TYPES || '';

// Tiempos en ms. El primer aviso sale poco después de entrar; los siguientes,
// a intervalos aleatorios para que no se sienta mecánico.
const FIRST_DELAY: [number, number] = [12000, 25000];
const NEXT_DELAY: [number, number] = [45000, 90000];
const VISIBLE_FOR = 9000;
// Si la persona cierra varios avisos en la misma sesión, dejamos de mostrarlos.
const MAX_DISMISSALS = 3;
const DISMISS_KEY = 'arithmax_promo_dismissals';

type Recommendation = {
  id: string;
  name: string;
  type: string;
  type_label: string | null;
  image_url: string | null;
  price_label: string | null;
  regular_price_label: string | null;
  url: string;
};

type RecommendationsResponse = {
  laura?: { name: string; title: string; avatar_url: string };
  data?: Recommendation[];
};

function randomBetween([min, max]: [number, number]) {
  return min + Math.random() * (max - min);
}

// Solo enlaces http(s): evita `javascript:` u otros esquemas en datos editables.
function isSafeUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}

function readDismissals(): number {
  try {
    return Number(sessionStorage.getItem(DISMISS_KEY) ?? '0') || 0;
  } catch {
    return 0;
  }
}

function writeDismissals(value: number) {
  try {
    sessionStorage.setItem(DISMISS_KEY, String(value));
  } catch {
    // sessionStorage no disponible (modo privado); solo afecta esta pestaña.
  }
}

export default function LauraRecommendation() {
  const [products, setProducts] = useState<Recommendation[]>([]);
  const [title, setTitle] = useState('Laura te recomienda');
  const [current, setCurrent] = useState<Recommendation | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lastIdRef = useRef<string | null>(null);
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Una sola llamada al montar: la respuesta trae varios productos en orden
  // aleatorio y se rotan en el cliente.
  useEffect(() => {
    if (readDismissals() >= MAX_DISMISSALS) return undefined;
    const controller = new AbortController();
    const params = new URLSearchParams({ limit: '20' });
    if (PROMO_TYPES) params.set('type', PROMO_TYPES);

    fetch(`${PROMO_API_URL}/promo-products/recommendations?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: RecommendationsResponse | null) => {
        if (!json) return;
        if (json.laura?.title) setTitle(json.laura.title);
        setProducts((json.data ?? []).filter((product) => isSafeUrl(product.url)));
      })
      .catch(() => {
        // Sin recomendaciones: no se muestra nada.
      });

    return () => controller.abort();
  }, []);

  const schedule = useCallback((range: [number, number]) => {
    if (scheduleRef.current) clearTimeout(scheduleRef.current);
    if (products.length === 0 || readDismissals() >= MAX_DISMISSALS) return;
    scheduleRef.current = setTimeout(() => {
      const pool = products.length > 1
        ? products.filter((product) => product.id !== lastIdRef.current)
        : products;
      const next = pool[Math.floor(Math.random() * pool.length)];
      lastIdRef.current = next.id;
      setCurrent(next);
      setVisible(true);
    }, randomBetween(range));
  }, [products]);

  const close = useCallback((byUser: boolean) => {
    if (hideRef.current) clearTimeout(hideRef.current);
    setVisible(false);
    setHovered(false);
    if (byUser) writeDismissals(readDismissals() + 1);
    schedule(NEXT_DELAY);
  }, [schedule]);

  useEffect(() => {
    schedule(FIRST_DELAY);
    return () => {
      if (scheduleRef.current) clearTimeout(scheduleRef.current);
    };
  }, [schedule]);

  // Se oculta sola tras unos segundos; mientras el cursor esté encima, espera.
  useEffect(() => {
    if (!visible || hovered) return undefined;
    hideRef.current = setTimeout(() => close(false), VISIBLE_FOR);
    return () => {
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, [visible, hovered, close]);

  if (!current) return null;

  const handleClick = () => {
    trackEvent('select_promotion', {
      category: 'laura_recommendation',
      label: current.name,
      item_id: current.id,
      item_type: current.type,
    });
    close(false);
  };

  return (
    <div
      role="complementary"
      aria-label={current.type_label ? `Producto recomendado: ${current.type_label}` : 'Producto recomendado'}
      aria-hidden={!visible}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Por encima del botón flotante del glosario (esquina inferior derecha).
      className={`fixed bottom-24 right-4 z-[999] w-[calc(100vw-2rem)] max-w-[360px] transition-all duration-500 ease-out motion-reduce:transition-none sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <div className="relative">
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          onClick={handleClick}
          className="flex items-center gap-3 rounded-3xl border border-gray-200 bg-white p-3 text-gray-800 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <img
            src={miniLaura}
            alt="Laura"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7f4577]">
              {title}
            </p>
            {current.type_label ? (
              <span className="mt-1 inline-flex rounded-full bg-[#F0E4F5] px-2 py-0.5 text-[11px] font-semibold leading-4 text-[#7f4577]">
                {current.type_label}
              </span>
            ) : null}
            {/* Tailwind 3.2 no trae line-clamp: se recorta a 2 líneas con estilos en línea. */}
            <p
              className="mt-0.5 overflow-hidden text-sm font-semibold leading-snug"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
            >
              {current.name}
            </p>
            {current.price_label ? (
              <p className="mt-1 text-sm font-bold text-[#7f4577]">
                {current.price_label}
                {current.regular_price_label ? (
                  <s className="ml-2 text-xs font-medium text-gray-400">
                    {current.regular_price_label}
                  </s>
                ) : null}
              </p>
            ) : null}
          </div>
          {current.image_url ? (
            <img
              src={current.image_url}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-2xl object-cover"
            />
          ) : null}
        </a>
        <button
          type="button"
          onClick={() => close(true)}
          tabIndex={visible ? 0 : -1}
          aria-label="Cerrar recomendación"
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200
            bg-white text-gray-500 shadow transition hover:bg-[#F0E4F5] hover:text-[#7f4577]"
        >
          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

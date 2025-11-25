declare type Msg = { title: string; description?: string | JSX.Element };

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.ttf';

interface ImportMetaEnv {
  // defined in .env
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_URL: string
  readonly VITE_API_URL: string
  readonly VITE_GA?: string;
  readonly DEV: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
/// <reference types="vite/client" />

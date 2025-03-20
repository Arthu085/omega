/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_API: string;

  readonly VITE_INSTAGRAM: string;
  readonly VITE_FACEBOOK: string;
  readonly VITE_WHATSAPP: string;
  readonly VITE_LINKEDIN: string;
  readonly VITE_YOUTUBE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

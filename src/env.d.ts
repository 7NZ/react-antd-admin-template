/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MODE: string;
  readonly VITE_APP_APIURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

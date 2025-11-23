/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THIRDWEB_CLIENT_ID?: string;
  readonly VITE_ZEGOCLOUD_APP_ID?: string;
  readonly VITE_ZEGOCLOUD_SERVER_SECRET?: string;
  readonly VITE_TIPJAR_CONTRACT_ADDRESS?: string;
  readonly VITE_CREATOR_TIP_CONTRACT_ADDRESS?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


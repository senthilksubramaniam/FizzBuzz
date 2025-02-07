interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_ENV: string;
    readonly MODE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
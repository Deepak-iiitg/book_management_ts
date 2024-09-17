declare namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      DB_URL: string;
      PORT?: string;
  }
}
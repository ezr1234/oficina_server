declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VERSION: string;
      NODE_ENV: string;
      MONGO_URI: string;
      PORT: string;
      MQTT_URI: string;
    }
  }
}

export {};

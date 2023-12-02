import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.techknyks.myWeather',
  appName: 'myWeather',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

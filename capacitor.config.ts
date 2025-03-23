import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cm.kapexpert.fastgaz',
  appName: 'FastGaz',
  webDir: 'www',
  server: {
    url: 'https://kapexpert.cloud:30004/', // Remplace par l'URL de ton frontend hébergé
    cleartext: true // Autorise HTTP (utile en dev, sinon mettre `false` en prod)
  },
};

export default config;

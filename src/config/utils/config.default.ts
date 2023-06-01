import { configData } from 'src/common/interfaces/config.interfaces';

export const DEFAULT_CONFIG: configData = {
  env: 'development',
  url: '',
  secretKey: 'Hello there how are you doing ',
  loglevel: 'info',
  db: {
    url: '',
  },
  appPort: parseInt(process.env.appPort) || 3000,
};

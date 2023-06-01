import { Injectable } from '@nestjs/common';
import { configData, configDb } from 'src/common/interfaces/config.interfaces';
import { DEFAULT_CONFIG } from './utils/config.default';

@Injectable()
export class ConfigService {
  private config: configData;
  constructor(data: configData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }
  private parseConfigFromEnv(env: NodeJS.ProcessEnv) {
    console.log(env);
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      appPort: parseInt(env.NODE_ENV) || DEFAULT_CONFIG.appPort,
      secretKey: env.NODE_ENV || DEFAULT_CONFIG.secretKey,
      loglevel: env.NODE_ENV || DEFAULT_CONFIG.loglevel,
      url: env.NODE_ENV || DEFAULT_CONFIG.url,
      db: this.parseDb(env, DEFAULT_CONFIG.db),
    };
  }

  private parseDb(env: NodeJS.ProcessEnv, defaultConfig: Readonly<configDb>) {
    return {
      url: env.DATABASE_URL || defaultConfig.url,
    };
  }
  public get(): Readonly<configData> {
    return this.config;
  }
}

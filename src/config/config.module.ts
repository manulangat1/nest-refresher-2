import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

const configFactory = {
  provide: ConfigService,

  useFactory: () => {
    const config = new ConfigService();
    config.loadFromEnv();
    return config;
  },
};
@Global()
@Module({
  providers: [configFactory],
  controllers: [ConfigController],
  exports: [configFactory],
})
export class ConfigModule {}

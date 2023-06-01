import { Module } from '@nestjs/common';

import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from '../datasource';
import { ProductModule } from './product/product.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    HealthcheckModule,
    AuthModule,
    ProductModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

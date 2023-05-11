import { Injectable, Logger } from '@nestjs/common';
// import {} from '@nestjs/con';
@Injectable()
export class HealthcheckService {
  private logger = new Logger('Healthcheck');

  // constructor(private config: ConfigService) {}
  async healthcheck() {
    this.logger.log('All retrieved successfully');
    return 'Hello world I am the ecommerce API';
  }
}

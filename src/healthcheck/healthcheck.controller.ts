import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ConfigService } from 'src/config/config.service';

@Controller('')
export class HealthcheckController {
  // private
  constructor(
    private healthCheckService: HealthcheckService,
    private config: ConfigService,
  ) {}

  @Get()
  @Public()
  async healthCheckController() {
    console.log(this.config.get());
    return this.healthCheckService.healthcheck();
  }
}

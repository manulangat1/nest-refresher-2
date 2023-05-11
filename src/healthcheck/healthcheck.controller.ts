import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('')
export class HealthcheckController {
  // private
  constructor(private healthCheckService: HealthcheckService) {}

  @Get()
  @Public()
  async healthCheckController() {
    return this.healthCheckService.healthcheck();
  }
}

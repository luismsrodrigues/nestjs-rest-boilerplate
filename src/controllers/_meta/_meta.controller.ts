import { Get } from '@nestjs/common';
import { AllowAnonymous } from '@/core/decorators/allow-anonymous-guard.decorator';
import { ApiController } from '@/core/decorators/api-controller.decorator';

@ApiController('meta')
@AllowAnonymous()
export class MetaController {
  constructor() {}

  @Get()
  status() {
    return {
      status: 'active',
      pipeline: 'up',
      ts: new Date(),
    };
  }
}

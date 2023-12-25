import { Controller, Get } from '@nestjs/common';

@Controller('_meta')
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

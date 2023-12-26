import { Module } from '@nestjs/common';

import ControllerModules from './controllers';

@Module({
  imports: [...ControllerModules],
  controllers: [],
  providers: [],
})
export class AppModule {}

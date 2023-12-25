import { Module } from '@nestjs/common';

import { MetaModule } from './controllers/_meta/_meta.module';

@Module({
  imports: [
    MetaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

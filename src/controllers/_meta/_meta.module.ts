import { Module } from '@nestjs/common';
import { MetaController } from './_meta.controller';

@Module({
  controllers: [MetaController],
  providers: [],
})
export class MetaModule {}

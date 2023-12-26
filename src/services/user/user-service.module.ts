import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseClient } from '@/database/database-client';

@Module({
  providers: [UserService, DatabaseClient],
  exports: [UserService],
})
export class UserModule {}

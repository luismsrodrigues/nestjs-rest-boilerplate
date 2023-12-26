import { Module } from '@nestjs/common';

import Controllers from './controllers';
import { DatabaseClient } from './database/database-client';
import { AuthenticationModule } from './services/authentication/authentication-service.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_PORT: Joi.number().default(3000),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('365d'),
      }),
    }),
    AuthenticationModule,
  ],
  controllers: [...Controllers],
  providers: [DatabaseClient],
})
export class AppModule {}

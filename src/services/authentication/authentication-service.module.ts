import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user-service.module';
import { DatabaseClient } from '@/database/database-client';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthenticationService, ConfigService, DatabaseClient],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}

import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthenticationController],
  imports: [
    JwtModule.register({
      global: true,
      secret: '123',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthenticationModule {}

import { DatabaseClient } from '@/database/database-client';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BearerTokenDto } from '@/dtos/bearer-token.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private database: DatabaseClient,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async sigInBasicAsync() {
    const payload = { userId: 1, userName: 'admin' };
    return await this.jwtService.signAsync(payload);
  }

  public async decodeJwtTokenAsync(token: string): Promise<BearerTokenDto> {
    return await this.jwtService.verifyAsync<BearerTokenDto>(token, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
    });
  }
}

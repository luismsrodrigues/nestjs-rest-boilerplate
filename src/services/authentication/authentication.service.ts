import { DatabaseClient } from '@/database/database-client';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private database: DatabaseClient,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async sigInBasicAsync() {
    const payload = { sub: 1, username: 'admin' };
    return await this.jwtService.signAsync(payload);
  }
}

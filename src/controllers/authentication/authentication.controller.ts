import { Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AllowAnonymous } from '@/core/decorators/allow-anonymous-guard.decorator';
import { ApiController } from '@/core/decorators/api-controller.decorator';
import { CurrentUser } from '@/core/decorators/current-user.decorator';

@ApiController('auth')
export class AuthenticationController {
  constructor(private readonly jwtService: JwtService) {}

  @AllowAnonymous()
  @Post('sign-in/basic')
  async signinBasicAsync() {
    const payload = { sub: 1, username: 'admin' };
    return await this.jwtService.signAsync(payload);
  }

  @Post('logout')
  async logoutAsync(@CurrentUser() user) {
    return user;
  }
}

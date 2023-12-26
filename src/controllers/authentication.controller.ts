import { Post } from '@nestjs/common';
import { AllowAnonymous } from '@/core/decorators/allow-anonymous-guard.decorator';
import { ApiController } from '@/core/decorators/api-controller.decorator';
import { CurrentUser } from '@/core/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { AuthenticationService } from '@/services/authentication/authentication.service';

@ApiController('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @AllowAnonymous()
  @Post('sign-in/basic')
  async signinBasicAsync() {
    return await this.authenticationService.sigInBasicAsync();
  }

  @Post('logout')
  async logoutAsync(@CurrentUser() user: User) {
    return user;
  }
}

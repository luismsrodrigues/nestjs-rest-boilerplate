import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthenticationService } from '@/services/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.isAllowedAnonymous(context) || this.isBearerTokenValid(context);
  }

  private isAllowedAnonymous(context: ExecutionContext): boolean {
    return !!this.reflector.getAllAndOverride<boolean>('allowAnonymous', [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async isBearerTokenValid(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let jwtDecoded;

    try {
      jwtDecoded = await this.jwtService.verifyAsync(token, {
        secret: '123',
      });
    } catch {
      throw new UnauthorizedException();
    }

    request['user'] = jwtDecoded;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

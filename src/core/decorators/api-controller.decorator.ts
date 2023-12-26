import { Controller, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function ApiController(controllerName: string) {
  return applyDecorators(
    Controller(controllerName),
    ApiBearerAuth(),
    ApiTags(controllerName),
  );
}

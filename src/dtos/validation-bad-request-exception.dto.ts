import { BadRequestException } from '@nestjs/common';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';

export class ValidationBadRequestExceptionDto extends BadRequestException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(objectOrError, descriptionOrOptions);
  }
}

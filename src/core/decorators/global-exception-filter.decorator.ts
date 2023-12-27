import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { ValidationBadRequestExceptionDto } from '@/dtos/validation-bad-request-exception.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger('GlobalExceptionFilter');

  public catch(
    exception:
      | Error
      | ValidationBadRequestExceptionDto
      | Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof ValidationBadRequestExceptionDto) {
      const status = exception.getStatus();
      const result = exception.getResponse() as { message: ValidationError[] };

      let messages;

      try {
        messages = Object.assign(
          {},
          ...result?.message?.map((r) => {
            const message = {};
            message[r['property']] = Object.values(r.constraints)[0];

            return message;
          }),
        );
      } catch (e) {
        this.logger.warn(e);
        messages = {
          general: 'An unexpected error has occured',
        };
      }

      this.logger.warn({
        type: exception.name,
        status,
        messages: JSON.stringify(messages),
        path: request.url,
      });

      return response.status(status).json({
        formValidationMessages: messages,
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      this.logger.error({
        type: exception.name,
        status,
        message,
        stack: exception.stack,
        path: request.url,
      });

      return response.status(status).json(message);
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.warn({
        type: exception.name,
        prisma_version: exception.clientVersion,
        error: exception.code,
        stack: exception.stack,
        path: request.url,
      });

      let statusCode;
      let message;

      switch (exception.code) {
        case 'P2000':
        case 'P2001':
        case 'P2003':
          statusCode = 400;
          message = 'The request could not be processed.';
          break;
        case 'P2024':
          statusCode = 408;
          message = 'The operation could not be performed due to timeout.';
          break;
        case 'P2025':
          statusCode = 404;
          message = 'No associated value was found.';
          break;

        default:
          statusCode = 500;
          message = 'An unexpected error has occurred, please try again.';
      }

      return response.status(statusCode).json({ message });
    } else {
      this.logger.warn({
        type: exception.name,
        message: JSON.stringify(exception.message),
        path: request.url,
      });
      return response.status(500).json({
        message: 'An unexpected error has occurred, please try again.',
      });
    }
  }
}

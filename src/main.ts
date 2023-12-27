import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationGuard } from './core/decorators/authentication-guard.decorator';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ConfigService } from '@nestjs/config';
import { ValidationBadRequestExceptionDto } from './dtos/validation-bad-request-exception.dto';
import { GlobalExceptionFilter } from './core/decorators/global-exception-filter.decorator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  configureSwagger(app);

  ConfigureGlobalExceptionFilter(app);

  configureAuthentication(app);

  await app.listen(config.getOrThrow('API_PORT'));
}

function configureAuthentication(app: INestApplication) {
  const reflector = app.get(Reflector);
  const authenticationService = app.get(AuthenticationService);
  app.useGlobalGuards(
    new AuthenticationGuard(reflector, authenticationService),
  );
}

function configureSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Unflow Template APi Rest')
    .setDescription('This is a template for a rest API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_docs', app, document);
}

function ConfigureGlobalExceptionFilter(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationBadRequestExceptionDto(validationErrors);
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
}

bootstrap();

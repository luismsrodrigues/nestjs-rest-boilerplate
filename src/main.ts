import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AuthenticationGuard } from './core/decorators/authentication-guard.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  configureSwagger(app);

  configureAuthentication(app);

  await app.listen(config.getOrThrow('API_PORT'));
}

// function configureDatabase(app: INestApplication) {
//   const prismaService: PrismaService = app.get(PrismaService);
//   await prismaService.enableShutdownHooks(app);
// }

function configureAuthentication(app: INestApplication) {
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const authenticationService = app.get(AuthenticationService);
  app.useGlobalGuards(
    new AuthenticationGuard(reflector, jwtService, authenticationService),
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

bootstrap();

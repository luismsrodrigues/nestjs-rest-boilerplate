import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AuthorizationGuard } from './core/decorators/authorization-guard.decorator';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);

  configureAuthentication(app);

  await app.listen(3000);
}

// function configureDatabase(app: INestApplication) {
//   const prismaService: PrismaService = app.get(PrismaService);
//   await prismaService.enableShutdownHooks(app);
// }

function configureAuthentication(app: INestApplication) {
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new AuthorizationGuard(reflector, jwtService));
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

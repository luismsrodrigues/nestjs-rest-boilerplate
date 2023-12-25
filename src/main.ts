import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);

  await app.listen(3000);
}

// function configureDatabase(app: INestApplication) {
//   const prismaService: PrismaService = app.get(PrismaService);
//   await prismaService.enableShutdownHooks(app);
// }

function configureSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Unflow Template APi Rest')
    .setDescription('This is a template for a rest API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_docs', app, document);
}

bootstrap();
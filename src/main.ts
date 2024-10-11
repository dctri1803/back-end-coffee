import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Shop demo')
    .setDescription('The e commerce API description')
    .setVersion('1.0')
    .addTag('shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // Your React app origin
    credentials: true, // Allow cookies to be sent
  });
  
  await app.listen(3001);
}
bootstrap();

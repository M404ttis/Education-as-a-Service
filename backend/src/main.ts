import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with proper configuration
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from Angular frontend
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(3000);
}
bootstrap();

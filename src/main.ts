// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ProvincesSeedService } from './provinces/provinces.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Ejecutar el seeder
  const seedService = app.get(ProvincesSeedService);
  await seedService.seedProvinces();
  console.log('Provinces have been seeded!');

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000/api');
}
bootstrap();

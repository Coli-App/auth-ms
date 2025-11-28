import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import type { INestApplication } from '@nestjs/common';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    
    app.enableCors();
    
    await app.init();
    
    console.log('NestJS app initialized successfully');
  }
  return app;
}

// Handler de Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  const nestApp = await bootstrap();
  const httpAdapter = nestApp.getHttpAdapter();
  const instance = httpAdapter.getInstance();
  
  // Manejar la request usando el listener de Express
  instance(req, res);
};

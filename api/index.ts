import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import { INestApplication } from '@nestjs/common';

let cachedApp: INestApplication;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    const app = await NestFactory.create(
      AppModule,
      adapter,
      {
        logger: ['error', 'warn', 'log'],
      }
    );
    
    // Habilitar CORS
    app.enableCors();
    
    await app.init();
    cachedApp = app;
    
    console.log('NestJS app initialized successfully');
  }
  return cachedApp;
}

// Handler de Vercel
export default async (req, res) => {
  const app = await bootstrap();
  const expressInstance = app.getHttpAdapter().getInstance();
  return expressInstance(req, res);
};

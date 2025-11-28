import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

const expressApp = express();
let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger: ['error', 'warn', 'log'],
      }
    );
    
    // Habilitar CORS
    nestApp.enableCors();
    
    // NO usar prefijo global para que las rutas funcionen directamente
    // nestApp.setGlobalPrefix('api');
    
    await nestApp.init();
    cachedApp = nestApp;
    
    console.log('NestJS app initialized');
  }
  return expressApp;
}

// Handler de Vercel
export default async (req, res) => {
  await bootstrap();
  return expressApp(req, res);
};

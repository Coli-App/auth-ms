import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

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
export default async (req, res) => {
  const nestApp = await bootstrap();
  const server = nestApp.getHttpServer();
  
  // Delegar la request al servidor de NestJS
  return server.emit('request', req, res);
};

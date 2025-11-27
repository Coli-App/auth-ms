import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Request, Response } from 'express';

const server = express();
let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      {
        logger: ['error', 'warn'], 
      }
    );
    
    app.enableCors();
    
    await app.init();
  }
  return server;
}

export default async (req: Request, res: Response) => {
  const server = await bootstrap();
  return server(req, res);
};

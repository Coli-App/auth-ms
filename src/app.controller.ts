import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ 
    summary: 'Root endpoint',
    description: 'Endpoint raíz para verificar que la API está funcionando'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API funcionando correctamente'
  })
  getRoot() {
    return {
      message: 'Auth Microservice API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: 'GET /auth/health',
        login: 'POST /auth/login',
        logout: 'POST /auth/logout',
        profile: 'GET /auth/profile'
      }
    };
  }
}

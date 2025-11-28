import { createServer } from 'http';
import handler from './api/index';

const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Simular el formato de Vercel Request/Response
  await handler(req as any, res as any);
});

server.listen(PORT, () => {
  console.log(`🚀 Dev server running at http://localhost:${PORT}`);
  console.log(`📝 Test endpoint: POST http://localhost:${PORT}/auth/login`);
  console.log(`\nSimulating Vercel serverless environment...`);
});

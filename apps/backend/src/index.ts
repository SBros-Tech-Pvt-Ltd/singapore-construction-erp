import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';



const app = new Hono();

// 🌍 Global middleware
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:3300'],
  credentials: true,
}));


// Health check
app.get('/', (c) => c.json({ message: 'ERP API Running 🚀' }));



const port = 3201;
console.log(`🚀 Backend running at http://localhost:${port}`);

serve({ fetch: app.fetch, port });

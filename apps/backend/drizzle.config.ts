import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql', // Changed from 'driver: pg' to 'dialect: postgresql'
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Changed from 'connectionString' to 'url'
  },
});
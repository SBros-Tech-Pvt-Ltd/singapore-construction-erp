import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Import all schemas
import * as masterSchema from './schema/00-master';
import * as organizationSchema from './schema/01-organization';
import * as usersSchema from './schema/02-users';
import * as recruitmentSchema from './schema/03-recruitment';
import * as employeesSchema from './schema/04-employees';
import * as attendanceSchema from './schema/05-attendance';

const connection = postgres(process.env.DATABASE_URL!, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(connection, {
  schema: {
    ...masterSchema,
    ...organizationSchema,
    ...usersSchema,
    ...recruitmentSchema,
    ...employeesSchema,
    ...attendanceSchema,
  },
});

export { connection };
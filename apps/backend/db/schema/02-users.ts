// File: src/db/schema/02-users.ts
// User authentication and access management

import { pgTable, uuid, varchar, timestamp, boolean, text } from 'drizzle-orm/pg-core';
import { tenants } from './00-master';

export const users = pgTable('users', {
  userId: uuid('user_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  // Authentication fields
  clerkUserId: varchar('clerk_user_id', { length: 255 }).unique().notNull(), // From Clerk auth
  email: varchar('email', { length: 255 }).notNull(),
  username: varchar('username', { length: 50 }).unique(),
  
  // Personal details
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  
  // Role and permissions
  role: varchar('role', { length: 50 }).notNull().default('employee'),
  // Roles: admin, hr_manager, finance_manager, supervisor, employee
  
  // Account status
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userPermissions = pgTable('user_permissions', {
  permissionId: uuid('permission_id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.userId).notNull(),
  
  module: varchar('module', { length: 50 }).notNull(), // hr, finance, payroll, etc.
  permission: varchar('permission', { length: 50 }).notNull(), // read, write, delete, approve
  
  createdAt: timestamp('created_at').defaultNow(),
});
// File: src/db/schema/01-organization.ts
// Organization structure within each company

import { pgTable, uuid, varchar, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { tenants } from './00-master';

// Define departments table first without the self-reference
export const departments = pgTable('departments', {
  departmentId: uuid('department_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  departmentName: varchar('department_name', { length: 100 }).notNull(),
  departmentCode: varchar('department_code', { length: 10 }).notNull(),
  description: text('description'),
  
  // Department hierarchy (self-reference) - using string reference
  parentDepartmentId: uuid('parent_department_id'),
  
  // Department head - will be linked later when employees table is available
  departmentHeadId: uuid('department_head_id'),
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const designations = pgTable('designations', {
  designationId: uuid('designation_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  designationTitle: varchar('designation_title', { length: 100 }).notNull(),
  level: varchar('level', { length: 20 }), // junior, senior, lead, manager
  description: text('description'),
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const locations = pgTable('locations', {
  locationId: uuid('location_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  locationName: varchar('location_name', { length: 100 }).notNull(),
  address: text('address').notNull(),
  city: varchar('city', { length: 50 }),
  postalCode: varchar('postal_code', { length: 10 }),
  country: varchar('country', { length: 50 }).default('Singapore'),
  
  // For construction sites
  siteType: varchar('site_type', { length: 50 }), // office, construction_site, warehouse
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
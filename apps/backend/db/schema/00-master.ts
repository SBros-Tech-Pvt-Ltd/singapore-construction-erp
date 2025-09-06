// Multi-tenant management - Each company gets isolated data

import { pgTable, uuid, varchar, timestamp, text, boolean } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  // Primary identifier for each company/tenant
  tenantId: uuid('tenant_id').defaultRandom().primaryKey(),
  
  // Company basic information
  companyName: varchar('company_name', { length: 255 }).notNull(),
  companyRegistrationNumber: varchar('company_registration_number', { length: 50 }).unique(),
  
  // Singapore specific details
  uen: varchar('uen', { length: 20 }).unique(), // Unique Entity Number for Singapore
  gstNumber: varchar('gst_number', { length: 20 }),
  
  // Subscription details
  subscriptionPlan: varchar('subscription_plan', { length: 50 }).default('basic'),
  subscriptionStatus: varchar('subscription_status', { length: 20 }).default('active'),
  subscriptionStartDate: timestamp('subscription_start_date').defaultNow(),
  subscriptionEndDate: timestamp('subscription_end_date'),
  
  // Contact information
  contactEmail: varchar('contact_email', { length: 255 }),
  contactPhone: varchar('contact_phone', { length: 20 }),
  address: text('address'),
  
  // System fields
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

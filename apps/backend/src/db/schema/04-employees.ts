// File: src/db/schema/04-employees.ts
// Employee master data and management

import { pgTable, uuid, varchar, timestamp, text, boolean, date, decimal } from 'drizzle-orm/pg-core';
import { tenants } from './00-master';
import { departments, designations, locations } from './01-organization';
import { users } from './02-users';

export const employees = pgTable('employees', {
  employeeId: uuid('employee_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  userId: uuid('user_id').references(() => users.userId), // One-to-One relationship
  
  // Employee identification
  employeeNumber: varchar('employee_number', { length: 20 }).notNull().unique(),
  
  // Personal information
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  nric: varchar('nric', { length: 20 }).unique(), // Singapore NRIC
  gender: varchar('gender', { length: 10 }),
  dateOfBirth: date('date_of_birth'),
  nationality: varchar('nationality', { length: 50 }),
  
  // Contact details
  personalEmail: varchar('personal_email', { length: 255 }),
  workEmail: varchar('work_email', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  emergencyContactName: varchar('emergency_contact_name', { length: 100 }),
  emergencyContactNumber: varchar('emergency_contact_number', { length: 20 }),
  
  // Address
  homeAddress: text('home_address'),
  postalCode: varchar('postal_code', { length: 10 }),
  
  // Work details
  departmentId: uuid('department_id').references(() => departments.departmentId),
  designationId: uuid('designation_id').references(() => designations.designationId),
  locationId: uuid('location_id').references(() => locations.locationId),
  
  // Self-reference for supervisor - remove the explicit reference to avoid circular dependency
  supervisorId: uuid('supervisor_id'), // Will be handled in relations file
  
  // Employment details
  dateOfJoining: date('date_of_joining').notNull(),
  employmentType: varchar('employment_type', { length: 50 }).default('full_time'),
  workPermitNumber: varchar('work_permit_number', { length: 50 }), // For foreign workers
  workPermitExpiry: date('work_permit_expiry'),
  
  // Salary information
  basicSalary: decimal('basic_salary', { precision: 10, scale: 2 }),
  
  // Status
  employmentStatus: varchar('employment_status', { length: 20 }).default('active'),
  // active, on_leave, terminated, resigned
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const employeeDocuments = pgTable('employee_documents', {
  documentId: uuid('document_id').defaultRandom().primaryKey(),
  employeeId: uuid('employee_id').references(() => employees.employeeId).notNull(),
  
  documentType: varchar('document_type', { length: 50 }).notNull(),
  // nric, passport, work_permit, contract, certificate, etc.
  documentName: varchar('document_name', { length: 255 }).notNull(),
  documentUrl: varchar('document_url', { length: 500 }),
  
  expiryDate: date('expiry_date'),
  isVerified: boolean('is_verified').default(false),
  
  uploadedAt: timestamp('uploaded_at').defaultNow(),
  uploadedBy: uuid('uploaded_by').references(() => users.userId),
});
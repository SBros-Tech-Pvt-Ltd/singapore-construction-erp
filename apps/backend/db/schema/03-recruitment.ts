// File: src/db/schema/03-recruitment.ts
// Recruitment and hiring process

import { pgTable, uuid, varchar, timestamp, text, boolean, decimal } from 'drizzle-orm/pg-core';
import { tenants } from './00-master';
import { departments, designations, locations } from './01-organization';
import { users } from './02-users';

export const jobPostings = pgTable('job_postings', {
  jobId: uuid('job_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  jobTitle: varchar('job_title', { length: 200 }).notNull(),
  departmentId: uuid('department_id').references(() => departments.departmentId),
  designationId: uuid('designation_id').references(() => designations.designationId),
  locationId: uuid('location_id').references(() => locations.locationId),
  
  // Job details
  jobDescription: text('job_description').notNull(),
  requirements: text('requirements'),
  experienceRequired: varchar('experience_required', { length: 50 }),
  salaryRangeMin: decimal('salary_range_min', { precision: 10, scale: 2 }),
  salaryRangeMax: decimal('salary_range_max', { precision: 10, scale: 2 }),
  
  // Employment type
  employmentType: varchar('employment_type', { length: 50 }).default('full_time'), 
  // full_time, part_time, contract, temporary
  
  // Posting details
  postedBy: uuid('posted_by').references(() => users.userId),
  postedDate: timestamp('posted_date').defaultNow(),
  applicationDeadline: timestamp('application_deadline'),
  
  // Status
  status: varchar('status', { length: 20 }).default('open'), // open, closed, on_hold
  isActive: boolean('is_active').default(true),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const candidates = pgTable('candidates', {
  candidateId: uuid('candidate_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  jobId: uuid('job_id').references(() => jobPostings.jobId).notNull(),
  
  // Personal information
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  
  // Application details
  resumeUrl: varchar('resume_url', { length: 500 }),
  coverLetter: text('cover_letter'),
  expectedSalary: decimal('expected_salary', { precision: 10, scale: 2 }),
  availableFrom: timestamp('available_from'),
  
  // Status tracking
  applicationStatus: varchar('application_status', { length: 50 }).default('applied'),
  // applied, screening, interview_scheduled, interviewed, selected, rejected
  
  // Interview process
  interviewDate: timestamp('interview_date'),
  interviewNotes: text('interview_notes'),
  interviewScore: varchar('interview_score', { length: 10 }),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
// File: src/db/schema/05-attendance.ts
// Attendance and leave management

import { pgTable, uuid, varchar, timestamp, date, text, boolean, decimal, integer } from 'drizzle-orm/pg-core';
import { tenants } from './00-master';
import { employees } from './04-employees';
import { users } from './02-users';

export const attendanceRecords = pgTable('attendance_records', {
  attendanceId: uuid('attendance_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  employeeId: uuid('employee_id').references(() => employees.employeeId).notNull(),
  
  // Attendance date and times
  attendanceDate: date('attendance_date').notNull(),
  clockInTime: timestamp('clock_in_time'),
  clockOutTime: timestamp('clock_out_time'),
  
  // Work hours calculation
  totalHours: decimal('total_hours', { precision: 4, scale: 2 }),
  regularHours: decimal('regular_hours', { precision: 4, scale: 2 }),
  overtimeHours: decimal('overtime_hours', { precision: 4, scale: 2 }),
  
  // Attendance status
  status: varchar('status', { length: 20 }).default('present'),
  // present, absent, late, half_day, on_leave
  
  // Location tracking (for construction sites)
  clockInLocation: text('clock_in_location'),
  clockOutLocation: text('clock_out_location'),
  
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const leaveTypes = pgTable('leave_types', {
  leaveTypeId: uuid('leave_type_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  leaveTypeName: varchar('leave_type_name', { length: 100 }).notNull(),
  leaveTypeCode: varchar('leave_type_code', { length: 10 }).notNull(),
  
  // Leave allocation per year
  annualAllocation: integer('annual_allocation').default(0),
  maxConsecutiveDays: integer('max_consecutive_days'),
  
  // Singapore specific leaves
  // Annual Leave: 7-14 days, Sick Leave: 14 days, Maternity: 16 weeks, etc.
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leaveApplications = pgTable('leave_applications', {
  applicationId: uuid('application_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  employeeId: uuid('employee_id').references(() => employees.employeeId).notNull(),
  leaveTypeId: uuid('leave_type_id').references(() => leaveTypes.leaveTypeId).notNull(),
  
  // Leave dates
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  totalDays: integer('total_days').notNull(),
  
  // Application details
  reason: text('reason'),
  appliedDate: timestamp('applied_date').defaultNow(),
  
  // Approval workflow
  status: varchar('status', { length: 20 }).default('pending'),
  // pending, approved, rejected, cancelled
  
  approvedBy: uuid('approved_by').references(() => users.userId),
  approvedDate: timestamp('approved_date'),
  rejectionReason: text('rejection_reason'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const holidays = pgTable('holidays', {
  holidayId: uuid('holiday_id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.tenantId).notNull(),
  
  holidayName: varchar('holiday_name', { length: 100 }).notNull(),
  holidayDate: date('holiday_date').notNull(),
  holidayType: varchar('holiday_type', { length: 20 }).default('public'),
  // public, company, optional
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});
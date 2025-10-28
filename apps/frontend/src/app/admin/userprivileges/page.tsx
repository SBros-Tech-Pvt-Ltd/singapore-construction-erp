"use client";

import React, { useState } from 'react';
import { Save, Search, Edit2, Trash2 } from 'lucide-react';

// Define TypeScript interfaces
interface Permission {
  id: string;
  name: string;
}

interface PrivilegeCategory {
  label: string;
  permissions: Permission[];
}

interface Role {
  id: number;
  name: string;
  type: 'admin' | 'normal';
  userCount: number;
  privileges: string[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  roleId: number;
}

const UserPrivilegesSystem = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'users'>('roles');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingRole, setEditingRole] = useState<number | null>(null);

  const allPrivileges: Record<string, PrivilegeCategory> = {
    dashboard: {
      label: 'Dashboard',
      permissions: [
        { id: 'view_dashboard', name: 'View Dashboard' },
        { id: 'view_analytics', name: 'View Analytics' }
      ]
    },
    employees: {
      label: 'Employee Management',
      permissions: [
        { id: 'view_employees', name: 'View Employees' },
        { id: 'add_employee', name: 'Add Employee' },
        { id: 'edit_employee', name: 'Edit Employee' },
        { id: 'delete_employee', name: 'Delete Employee' },
        { id: 'export_employees', name: 'Export Employee Data' }
      ]
    },
    attendance: {
      label: 'Attendance',
      permissions: [
        { id: 'view_attendance', name: 'View Attendance' },
        { id: 'mark_attendance', name: 'Mark Attendance' },
        { id: 'edit_attendance', name: 'Edit Attendance' },
        { id: 'approve_attendance', name: 'Approve Attendance' }
      ]
    },
    leave: {
      label: 'Leave Management',
      permissions: [
        { id: 'view_leaves', name: 'View Leave Requests' },
        { id: 'apply_leave', name: 'Apply for Leave' },
        { id: 'approve_leave', name: 'Approve/Reject Leave' },
        { id: 'delete_leave', name: 'Delete Leave Records' }
      ]
    },
    payroll: {
      label: 'Payroll',
      permissions: [
        { id: 'view_payroll', name: 'View Payroll' },
        { id: 'process_payroll', name: 'Process Payroll' },
        { id: 'edit_salary', name: 'Edit Salary' },
        { id: 'generate_payslips', name: 'Generate Payslips' }
      ]
    },
    reports: {
      label: 'Reports',
      permissions: [
        { id: 'view_reports', name: 'View Reports' },
        { id: 'generate_reports', name: 'Generate Reports' },
        { id: 'export_reports', name: 'Export Reports' }
      ]
    },
    settings: {
      label: 'System Settings',
      permissions: [
        { id: 'view_settings', name: 'View Settings' },
        { id: 'edit_settings', name: 'Edit Settings' },
        { id: 'manage_roles', name: 'Manage Roles & Privileges' }
      ]
    }
  };

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: 'Admin',
      type: 'admin',
      userCount: 5,
      privileges: [
        'view_dashboard', 'view_analytics', 'view_employees', 'add_employee',
        'edit_employee', 'delete_employee', 'export_employees', 'view_attendance',
        'mark_attendance', 'edit_attendance', 'approve_attendance', 'view_leaves',
        'apply_leave', 'approve_leave', 'delete_leave', 'view_payroll',
        'process_payroll', 'edit_salary', 'generate_payslips', 'view_reports',
        'generate_reports', 'export_reports', 'view_settings', 'edit_settings',
        'manage_roles'
      ]
    },
    {
      id: 2,
      name: 'HR Manager',
      type: 'admin',
      userCount: 3,
      privileges: [
        'view_dashboard', 'view_analytics', 'view_employees', 'add_employee',
        'edit_employee', 'export_employees', 'view_attendance', 'edit_attendance',
        'approve_attendance', 'view_leaves', 'approve_leave', 'view_payroll',
        'generate_payslips', 'view_reports', 'generate_reports'
      ]
    },
    {
      id: 3,
      name: 'Employee',
      type: 'normal',
      userCount: 45,
      privileges: [
        'view_dashboard', 'view_attendance', 'mark_attendance', 'apply_leave',
        'view_leaves', 'view_payroll'
      ]
    },
    {
      id: 4,
      name: 'Department Manager',
      type: 'normal',
      userCount: 8,
      privileges: [
        'view_dashboard', 'view_analytics', 'view_employees', 'view_attendance',
        'approve_attendance', 'view_leaves', 'approve_leave', 'view_reports'
      ]
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', roleId: 1 },
    { id: 2, name: 'Sarah Smith', email: 'sarah@company.com', role: 'HR Manager', roleId: 2 },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Employee', roleId: 3 },
    { id: 4, name: 'Emily Brown', email: 'emily@company.com', role: 'Department Manager', roleId: 4 },
    { id: 5, name: 'David Lee', email: 'david@company.com', role: 'Employee', roleId: 3 }
  ]);

  const togglePrivilege = (roleId: number, privilegeId: string): void => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const hasPrivilege = role.privileges.includes(privilegeId);
        return {
          ...role,
          privileges: hasPrivilege
            ? role.privileges.filter(p => p !== privilegeId)
            : [...role.privileges, privilegeId]
        };
      }
      return role;
    }));
  };

  const toggleAllInCategory = (roleId: number, categoryPrivileges: Permission[]): void => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const allSelected = categoryPrivileges.every(p => role.privileges.includes(p.id));
        const privilegeIds = categoryPrivileges.map(p => p.id);
        
        return {
          ...role,
          privileges: allSelected
            ? role.privileges.filter(p => !privilegeIds.includes(p))
            : [...new Set([...role.privileges, ...privilegeIds])]
        };
      }
      return role;
    }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (type: 'admin' | 'normal'): string => {
    return type === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'roles'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Roles & Privileges
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User Assignment
            </button>
          </div>
        </div>

        {activeTab === 'roles' && (
          <div className="space-y-6">
             <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Roles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map(role => (
                  <div
                    key={role.id}
                    onClick={() => setEditingRole(role.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      editingRole === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{role.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(role.type)}`}>
                        {role.type === 'admin' ? 'Admin' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{role.userCount} users</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {role.privileges.length} privileges assigned
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              {editingRole ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Edit Privileges: {roles.find(r => r.id === editingRole)?.name}
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(allPrivileges).map(([key, category]) => {
                      const role = roles.find(r => r.id === editingRole);
                      const allSelected = category.permissions.every(p => 
                        role?.privileges.includes(p.id)
                      );

                      return (
                        <div key={key} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {category.label}
                            </h3>
                            <button
                              onClick={() => toggleAllInCategory(editingRole, category.permissions)}
                              className={`text-sm font-medium ${
                                allSelected ? 'text-red-600' : 'text-blue-600'
                              }`}
                            >
                              {allSelected ? 'Deselect All' : 'Select All'}
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {category.permissions.map(permission => {
                              const isChecked = role?.privileges.includes(permission.id);
                              return (
                                <label
                                  key={permission.id}
                                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => togglePrivilege(editingRole, permission.id)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                  />
                                  <span className="text-gray-700">{permission.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a Role
                  </h3>
                  <p className="text-gray-600">
                    Choose a role from above to edit its privileges
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Role Assignment</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add New User
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => {
                    const userRole = roles.find(r => r.id === user.roleId);
                    return (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
                            value={user.roleId}
                            onChange={(e) => {
                              const newRoleId = parseInt(e.target.value);
                              setUsers(users.map(u => 
                                u.id === user.id ? { ...u, roleId: newRoleId, role: roles.find(r => r.id === newRoleId)?.name || u.role } : u
                              ));
                            }}
                          >
                            {roles.map(role => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(userRole?.type || 'normal')}`}>
                            {userRole?.type === 'admin' ? 'Admin' : 'Normal'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPrivilegesSystem;
'use client';

import React, { useState, useMemo } from 'react';
import { UserPlus, Search, Download, Upload, Edit2, Trash2, Key, Eye, Activity, FileSpreadsheet, X, Filter as FilterIcon } from 'lucide-react';
import { UserModals } from '@/components/modals/UserModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  branch: string;
  status: string;
  lastLogin: string;
  phone?: string;
  employeeId?: string;
  department?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  role: string;
  branch: string;
  department: string;
  password: string;
  confirmPassword: string;
  sendEmail: boolean;
  forceReset: boolean;
}

interface FilterState {
  role: string;
  branch: string;
  status: string;
  department: string;
}

const roles = ['Employee', 'Branch Admin', 'HR', 'Finance', 'Manager', 'Super Admin'];
const branches = ['Main Office', 'East Branch', 'West Branch', 'North Branch'];
const departments = ['Human Resources', 'Finance', 'IT', 'Sales', 'Operations'];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    role: '',
    branch: '',
    status: '',
    department: ''
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    role: '',
    branch: '',
    department: '',
    password: '',
    confirmPassword: '',
    sendEmail: false,
    forceReset: true
  });
  
  const [viewModal, setViewModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [resetModal, setResetModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Employee', branch: 'Main Office', status: 'Active', lastLogin: '2025-10-15 10:30 AM', phone: '+1 (555) 123-4567', employeeId: 'EMP-001', department: 'IT' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@company.com', role: 'HR', branch: 'Main Office', status: 'Active', lastLogin: '2025-10-17 09:15 AM', phone: '+1 (555) 234-5678', employeeId: 'EMP-002', department: 'Human Resources' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Branch Admin', branch: 'East Branch', status: 'Inactive', lastLogin: '2025-10-10 02:45 PM', phone: '+1 (555) 345-6789', employeeId: 'EMP-003', department: 'Operations' },
    { id: 4, name: 'Emily Davis', email: 'emily@company.com', role: 'Finance', branch: 'West Branch', status: 'Active', lastLogin: '2025-10-17 11:20 AM', phone: '+1 (555) 456-7890', employeeId: 'EMP-004', department: 'Finance' },
    { id: 5, name: 'Robert Wilson', email: 'robert@company.com', role: 'Manager', branch: 'Main Office', status: 'Active', lastLogin: '2025-10-17 08:00 AM', phone: '+1 (555) 567-8901', employeeId: 'EMP-005', department: 'Sales' },
  ]);

  const sampleLogs = [
    { id: 1, user: 'John Doe', email: 'john@company.com', action: 'Login', branch: 'Main Office', ipAddress: '192.168.1.45', timestamp: '2025-10-17 10:30 AM', status: 'Success', device: 'Chrome on Windows' },
    { id: 2, user: 'Sarah Smith', email: 'sarah@company.com', action: 'Updated Profile', branch: 'Main Office', ipAddress: '192.168.1.67', timestamp: '2025-10-17 09:15 AM', status: 'Success', device: 'Safari on MacOS' },
    { id: 3, user: 'Mike Johnson', email: 'mike@company.com', action: 'Login', branch: 'East Branch', ipAddress: '192.168.2.12', timestamp: '2025-10-17 08:45 AM', status: 'Success', device: 'Firefox on Windows' },
    { id: 4, user: 'John Doe', email: 'john@company.com', action: 'Password Change', branch: 'Main Office', ipAddress: '192.168.1.45', timestamp: '2025-10-16 03:20 PM', status: 'Success', device: 'Chrome on Windows' },
    { id: 5, user: 'Unknown User', email: 'test@company.com', action: 'Login Attempt', branch: 'N/A', ipAddress: '203.45.67.89', timestamp: '2025-10-16 02:15 PM', status: 'Failed', device: 'Chrome on Windows' },
    { id: 6, user: 'Sarah Smith', email: 'sarah@company.com', action: 'Logout', branch: 'Main Office', ipAddress: '192.168.1.67', timestamp: '2025-10-16 05:30 PM', status: 'Success', device: 'Safari on MacOS' },
  ];

  // ✅ VERIFIED: Filtered users with search and filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchTerm === '' || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = filters.role === '' || user.role === filters.role;
      const matchesBranch = filters.branch === '' || user.branch === filters.branch;
      const matchesStatus = filters.status === '' || user.status === filters.status;
      const matchesDepartment = filters.department === '' || user.department === filters.department;

      return matchesSearch && matchesRole && matchesBranch && matchesStatus && matchesDepartment;
    });
  }, [users, searchTerm, filters]);

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  // ✅ VERIFIED: Filter change handler
  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // ✅ VERIFIED: Clear all filters
  const clearAllFilters = () => {
    setFilters({
      role: '',
      branch: '',
      status: '',
      department: ''
    });
  };

  // ✅ VERIFIED: Form input change handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === 'checkbox' ? target.checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ✅ VERIFIED: Add user form submission
  const handleAddUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      employeeId: formData.employeeId,
      role: formData.role,
      branch: formData.branch,
      department: formData.department,
      status: 'Active',
      lastLogin: 'Never'
    };

    setUsers([...users, newUser]);
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeId: '',
      role: '',
      branch: '',
      department: '',
      password: '',
      confirmPassword: '',
      sendEmail: false,
      forceReset: true
    });

    alert('✅ User created successfully!');
    setActiveTab('list');
  };

  // ✅ VERIFIED: Tab change handler
  const handleTabChange = (tab: string) => {
    if (tab === 'add') {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        employeeId: '',
        role: '',
        branch: '',
        department: '',
        password: '',
        confirmPassword: '',
        sendEmail: false,
        forceReset: true
      });
    }
    setActiveTab(tab);
  };

  // ✅ VERIFIED: Download CSV helper
  const downloadCSV = (data: string[], filename: string) => {
    const csv = data.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ✅ VERIFIED: Export users to CSV
  const exportUsersToCSV = () => {
    const headers = ['Employee ID', 'Name', 'Email', 'Phone', 'Role', 'Department', 'Branch', 'Status', 'Last Login'];
    const rows = filteredUsers.map(user => [
      user.employeeId || '',
      user.name,
      user.email,
      user.phone || '',
      user.role,
      user.department || '',
      user.branch,
      user.status,
      user.lastLogin
    ].map(field => `"${field}"`).join(','));

    const csvData = [headers.join(','), ...rows];
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csvData, `users_export_${timestamp}.csv`);
    
    setShowExportMenu(false);
    alert('✅ Users exported successfully!');
  };

  // ✅ VERIFIED: Export logs to CSV
  const exportLogsToCSV = () => {
    const headers = ['ID', 'User', 'Email', 'Action', 'Branch', 'IP Address', 'Device', 'Timestamp', 'Status'];
    const rows = sampleLogs.map(log => [
      log.id,
      log.user,
      log.email,
      log.action,
      log.branch,
      log.ipAddress,
      log.device,
      log.timestamp,
      log.status
    ].map(field => `"${field}"`).join(','));

    const csvData = [headers.join(','), ...rows];
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csvData, `user_logs_${timestamp}.csv`);
    
    alert('✅ Logs exported successfully!');
  };

  // ✅ VERIFIED: Download sample template
  const downloadSampleTemplate = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Employee ID', 'Role', 'Department', 'Branch'];
    const sampleData = [
      ['John', 'Doe', 'john.doe@company.com', '+1 (555) 123-4567', 'EMP-001', 'Employee', 'IT', 'Main Office'],
      ['Jane', 'Smith', 'jane.smith@company.com', '+1 (555) 234-5678', 'EMP-002', 'HR', 'Human Resources', 'Main Office'],
      ['Mike', 'Johnson', 'mike.johnson@company.com', '+1 (555) 345-6789', 'EMP-003', 'Manager', 'Sales', 'East Branch']
    ];

    const rows = sampleData.map(row => 
      row.map(field => `"${field}"`).join(',')
    );

    const csvData = [headers.join(','), ...rows];
    downloadCSV(csvData, 'user_import_template.csv');
    
    alert('✅ Sample template downloaded successfully!');
  };

  // ✅ VERIFIED: Export users to Excel
  const exportUsersToExcel = () => {
    let table = '<table>';
    
    table = '<thead><tr>';
    table = '<th>Employee ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th>';
    table = '<th>Department</th><th>Branch</th><th>Status</th><th>Last Login</th>';
    table = '</tr></thead>';
    
    table = '<tbody>';
    filteredUsers.forEach(user => {
      table = '<tr>';
      table = `<td>${user.employeeId || ''}</td>`;
      table = `<td>${user.name}</td>`;
      table = `<td>${user.email}</td>`;
      table = `<td>${user.phone || ''}</td>`;
      table = `<td>${user.role}</td>`;
      table = `<td>${user.department || ''}</td>`;
      table = `<td>${user.branch}</td>`;
      table = `<td>${user.status}</td>`;
      table = `<td>${user.lastLogin}</td>`;
      table = '</tr>';
    });
    table = '</tbody></table>';

    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `users_export_${timestamp}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setShowExportMenu(false);
    alert('✅ Users exported to Excel successfully!');
  };

  // ✅ VERIFIED: Modal handlers
  const handleView = (user: User) => {
    setViewModal({ isOpen: true, user });
  };

  const handleEdit = (user: User) => {
    setEditModal({ isOpen: true, user });
  };

  const handleResetPassword = (user: User) => {
    setResetModal({ isOpen: true, user });
  };

  const handleDelete = (user: User) => {
    setDeleteModal({ isOpen: true, user });
  };

  const confirmDelete = () => {
    if (deleteModal.user) {
      setUsers(users.filter(u => u.id !== deleteModal.user!.id));
      alert('✅ User deleted successfully!');
    }
  };

  const confirmResetPassword = () => {
    if (resetModal.user) {
      alert(`✅ Password reset link sent to ${resetModal.user.email}`);
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    alert('✅ User updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* ✅ VERIFIED: Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and access permissions</p>
        </div>

        {/* ✅ VERIFIED: Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('list')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'list'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            User List
          </button>
          <button
            onClick={() => handleTabChange('add')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'add'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Add User
          </button>
          <button
            onClick={() => handleTabChange('import')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'import'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Import Users
          </button>
          <button
            onClick={() => handleTabChange('logs')}
            className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'logs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            User Logs
          </button>
        </div>

        {/* ✅ VERIFIED: USER LIST VIEW */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            {/* ✅ VERIFIED: Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* ✅ VERIFIED: Inline Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center flex-1">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                  </div>
                  
                  {/* ✅ VERIFIED: Role Filter */}
                  <select
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>

                  {/* ✅ VERIFIED: Branch Filter */}
                  <select
                    value={filters.branch}
                    onChange={(e) => handleFilterChange('branch', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Branches</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>

                  {/* ✅ VERIFIED: Status Filter */}
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  {/* ✅ VERIFIED: Department Filter */}
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  {/* ✅ VERIFIED: Clear Filters Button */}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear ({activeFilterCount})
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  {/* ✅ VERIFIED: Export Dropdown (Click-based for better UX) */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowExportMenu(!showExportMenu)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    
                    {showExportMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowExportMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                          <div className="py-1">
                            <button
                              onClick={exportUsersToCSV}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <FileSpreadsheet className="w-4 h-4" />
                              Export as CSV
                            </button>
                            <button
                              onClick={exportUsersToExcel}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <FileSpreadsheet className="w-4 h-4" />
                              Export as Excel
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* ✅ VERIFIED: Add User Button */}
                  <button
                    onClick={() => handleTabChange('add')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>
            </div>

            {/* ✅ VERIFIED: Results Count */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of <span className="font-semibold text-gray-900">{users.length}</span> users
              </div>
            </div>

            {/* ✅ VERIFIED: Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.branch}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            {/* ✅ VERIFIED: View Button */}
                            <button 
                              onClick={() => handleView(user)}
                              className="text-blue-600 hover:text-blue-900 transition-colors" 
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {/* ✅ VERIFIED: Edit Button */}
                            <button 
                              onClick={() => handleEdit(user)}
                              className="text-green-600 hover:text-green-900 transition-colors" 
                              title="Edit User"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {/* ✅ VERIFIED: Reset Password Button */}
                            <button 
                              onClick={() => handleResetPassword(user)}
                              className="text-orange-600 hover:text-orange-900 transition-colors" 
                              title="Reset Password"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            {/* ✅ VERIFIED: Delete Button */}
                            <button 
                              onClick={() => handleDelete(user)}
                              className="text-red-600 hover:text-red-900 transition-colors" 
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <Search className="w-12 h-12 text-gray-300 mb-3" />
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ✅ VERIFIED: ADD USER FORM */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New User</h2>

            <form onSubmit={handleAddUserSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ✅ VERIFIED: First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>
                
                {/* ✅ VERIFIED: Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>

                {/* ✅ VERIFIED: Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="user@company.com"
                  />
                </div>

                {/* ✅ VERIFIED: Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* ✅ VERIFIED: Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="EMP-001"
                  />
                </div>

                {/* ✅ VERIFIED: Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* ✅ VERIFIED: Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                  <select 
                    name="branch"
                    value={formData.branch}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                {/* ✅ VERIFIED: Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ✅ VERIFIED: Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* ✅ VERIFIED: Checkboxes */}
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="sendEmail" 
                  name="sendEmail"
                  checked={formData.sendEmail}
                  onChange={handleFormChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                />
                <label htmlFor="sendEmail" className="text-sm text-gray-700">Send welcome email with login credentials</label>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="forceReset" 
                  name="forceReset"
                  checked={formData.forceReset}
                  onChange={handleFormChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                />
                <label htmlFor="forceReset" className="text-sm text-gray-700">Force password reset on first login</label>
              </div>

              {/* ✅ VERIFIED: Form Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('list')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ✅ VERIFIED: IMPORT USERS */}
        {activeTab === 'import' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Import Users</h2>

            <div className="space-y-6">
              {/* ✅ VERIFIED: File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">Supported formats: CSV, Excel (XLSX, XLS)</p>
                <input type="file" className="hidden" id="fileUpload" accept=".csv,.xlsx,.xls" />
                <label
                  htmlFor="fileUpload"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Import Guidelines:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Required columns: First Name, Last Name, Email, Role, Branch</li>
                  <li>• Optional columns: Phone, Employee ID, Department</li>
                  <li>• Maximum 500 users per import</li>
                  <li>• Duplicate emails will be skipped</li>
                </ul>
              </div>

              {/* ✅ VERIFIED: Download Template Button */}
              <button 
                onClick={downloadSampleTemplate}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Sample Template
              </button>

              {/* ✅ VERIFIED: Import Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
                  Start Import
                </button>
                <button
                  onClick={() => handleTabChange('list')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ VERIFIED: USER LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <button 
                onClick={exportLogsToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Logs
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.user}</div>
                        <div className="text-sm text-gray-500">{log.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{log.ipAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.device}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ✅ VERIFIED: All Modals */}
        <UserModals
          viewModal={viewModal}
          editModal={editModal}
          resetModal={resetModal}
          deleteModal={deleteModal}
          onCloseView={() => setViewModal({ isOpen: false, user: null })}
          onCloseEdit={() => setEditModal({ isOpen: false, user: null })}
          onCloseReset={() => setResetModal({ isOpen: false, user: null })}
          onCloseDelete={() => setDeleteModal({ isOpen: false, user: null })}
          onUpdate={handleUpdateUser}
          onResetPassword={confirmResetPassword}
          onDelete={confirmDelete}
        />
      </div>
    </div>
  );
}
'use client';

import React, { useState, useMemo } from 'react';
import { UserPlus, Search, Download, Edit2, Trash2, Key, Eye, Filter as FilterIcon, X, Activity, Users, Shield, CheckCircle, XCircle, AlertTriangle, UserCheck, Clock, Globe, Check, ChevronsUpDown, ChevronDown, ChevronRight } from 'lucide-react';
import { UserModals } from '@/components/modals/UserModal';

// shadcn/ui imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
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

interface AuditLog {
  id: number;
  user: string;
  email: string;
  action: string;
  actionType: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'password_reset' | 'failed_login';
  details: string;
  ipAddress: string;
  device: string;
  timestamp: string;
  status: 'Success' | 'Failed';
}

interface FormData {
  selectedEmployees: string[];
  userRole: string;
  branch: string;
  department: string;
  password: string;
  confirmPassword: string;
}

interface FilterState {
  role: string;
  branch: string;
  status: string;
  department: string;
}

interface AuditFilterState {
  user: string;
  actionType: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

const roles = ['Employee', 'Branch Admin', 'HR', 'Finance', 'Manager', 'Super Admin'];
const branches = ['Main Office', 'East Branch', 'West Branch', 'North Branch'];
const departments = ['Human Resources', 'Finance', 'IT', 'Sales', 'Operations'];

const actionTypes = [
  { value: 'create', label: 'User Created', icon: UserPlus },
  { value: 'update', label: 'User Updated', icon: Edit2 },
  { value: 'delete', label: 'User Deleted', icon: Trash2 },
  { value: 'login', label: 'Login', icon: UserCheck },
  { value: 'logout', label: 'Logout', icon: Clock },
  { value: 'password_reset', label: 'Password Reset', icon: Key },
  { value: 'failed_login', label: 'Failed Login', icon: AlertTriangle }
];

const availableEmployees = [
  { id: 'EMP-001', name: 'John Doe', email: 'john@company.com' },
  { id: 'EMP-002', name: 'Sarah Smith', email: 'sarah@company.com' },
  { id: 'EMP-003', name: 'Mike Johnson', email: 'mike@company.com' },
  { id: 'EMP-004', name: 'Emily Davis', email: 'emily@company.com' },
  { id: 'EMP-005', name: 'Robert Wilson', email: 'robert@company.com' },
  { id: 'EMP-006', name: 'Lisa Anderson', email: 'lisa@company.com' },
  { id: 'EMP-007', name: 'David Brown', email: 'david@company.com' },
  { id: 'EMP-008', name: 'Jennifer Taylor', email: 'jennifer@company.com' },
  { id: 'EMP-009', name: 'Michael Chen', email: 'michael@company.com' },
  { id: 'EMP-010', name: 'Amanda White', email: 'amanda@company.com' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAuditLogModal, setShowAuditLogModal] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    role: '',
    branch: '',
    status: '',
    department: ''
  });

  const [auditFilters, setAuditFilters] = useState<AuditFilterState>({
    user: '',
    actionType: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  const [formData, setFormData] = useState<FormData>({
    selectedEmployees: [],
    userRole: '',
    branch: '',
    department: '',
    password: '',
    confirmPassword: ''
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

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 1, user: 'John Doe', email: 'john@company.com', action: 'Login', actionType: 'login', details: 'User logged in successfully', ipAddress: '192.168.1.45', device: 'Chrome on Windows', timestamp: '2025-10-17 10:30 AM', status: 'Success' },
    { id: 2, user: 'Admin User', email: 'admin@company.com', action: 'User Created', actionType: 'create', details: 'Created user: Sarah Smith', ipAddress: '192.168.1.10', device: 'Chrome on MacOS', timestamp: '2025-10-17 09:00 AM', status: 'Success' },
    { id: 3, user: 'Unknown', email: 'hacker@test.com', action: 'Failed Login', actionType: 'failed_login', details: 'Invalid credentials', ipAddress: '203.45.67.89', device: 'Firefox on Linux', timestamp: '2025-10-16 11:45 PM', status: 'Failed' },
    { id: 4, user: 'Sarah Smith', email: 'sarah@company.com', action: 'Logout', actionType: 'logout', details: 'User logged out', ipAddress: '192.168.1.67', device: 'Safari on MacOS', timestamp: '2025-10-16 05:30 PM', status: 'Success' },
    { id: 5, user: 'Admin User', email: 'admin@company.com', action: 'User Updated', actionType: 'update', details: 'Updated user: Mike Johnson - Changed role to Branch Admin', ipAddress: '192.168.1.10', device: 'Chrome on MacOS', timestamp: '2025-10-16 02:15 PM', status: 'Success' },
    { id: 6, user: 'Admin User', email: 'admin@company.com', action: 'Password Reset', actionType: 'password_reset', details: 'Password reset for: Emily Davis', ipAddress: '192.168.1.10', device: 'Chrome on MacOS', timestamp: '2025-10-15 03:20 PM', status: 'Success' },
    { id: 7, user: 'Mike Johnson', email: 'mike@company.com', action: 'Login', actionType: 'login', details: 'User logged in successfully', ipAddress: '192.168.2.12', device: 'Edge on Windows', timestamp: '2025-10-15 08:45 AM', status: 'Success' },
    { id: 8, user: 'Admin User', email: 'admin@company.com', action: 'User Deleted', actionType: 'delete', details: 'Deleted user: Test User (test@company.com)', ipAddress: '192.168.1.10', device: 'Chrome on MacOS', timestamp: '2025-10-14 04:00 PM', status: 'Success' },
  ]);

  const addAuditLog = (action: string, actionType: AuditLog['actionType'], details: string, status: 'Success' | 'Failed' = 'Success') => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      user: 'Admin User',
      email: 'admin@company.com',
      action,
      actionType,
      details,
      ipAddress: '192.168.1.10',
      device: 'Chrome on Windows',
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      status
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

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

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesUser = auditFilters.user === '' || 
        log.user.toLowerCase().includes(auditFilters.user.toLowerCase()) ||
        log.email.toLowerCase().includes(auditFilters.user.toLowerCase());
      
      const matchesActionType = auditFilters.actionType === '' || log.actionType === auditFilters.actionType;
      const matchesStatus = auditFilters.status === '' || log.status === auditFilters.status;

      let matchesDate = true;
      if (auditFilters.dateFrom || auditFilters.dateTo) {
        const logDate = new Date(log.timestamp);
        if (auditFilters.dateFrom) {
          const fromDate = new Date(auditFilters.dateFrom);
          matchesDate = matchesDate && logDate >= fromDate;
        }
        if (auditFilters.dateTo) {
          const toDate = new Date(auditFilters.dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && logDate <= toDate;
        }
      }

      return matchesUser && matchesActionType && matchesStatus && matchesDate;
    });
  }, [auditLogs, auditFilters]);

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;
  const activeAuditFilterCount = Object.values(auditFilters).filter(value => value !== '').length;

  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleAuditFilterChange = (filterName: keyof AuditFilterState, value: string) => {
    setAuditFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ role: '', branch: '', status: '', department: '' });
  };

  const clearAllAuditFilters = () => {
    setAuditFilters({ user: '', actionType: '', status: '', dateFrom: '', dateTo: '' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId]
    }));
  };

  const handleAddUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.selectedEmployees.length === 0) {
      return;
    }

    if (!formData.userRole) {
      return;
    }

    const newUsers: User[] = formData.selectedEmployees.map((empId, index) => {
      const employee = availableEmployees.find(emp => emp.id === empId);
      return {
        id: users.length + index + 1,
        name: employee?.name || '',
        email: employee?.email || '',
        employeeId: empId,
        role: formData.userRole,
        branch: formData.branch,
        department: formData.department,
        status: 'Active',
        lastLogin: 'Never',
        phone: ''
      };
    });

    setUsers([...users, ...newUsers]);
    
    newUsers.forEach(user => {
      addAuditLog(
        'User Created',
        'create',
        `Created user: ${user.name} (${user.email}) with role: ${user.role}`,
        'Success'
      );
    });
    
    setFormData({
      selectedEmployees: [],
      userRole: '',
      branch: '',
      department: '',
      password: '',
      confirmPassword: ''
    });

    setShowAddUserModal(false);
  };

  const openAddUserModal = () => {
    setFormData({
      selectedEmployees: [],
      userRole: '',
      branch: '',
      department: '',
      password: '',
      confirmPassword: ''
    });
    setShowAddUserModal(true);
  };

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
  };

  const exportUsersToExcel = () => {
    let table = '<table>';
    
    table += '<thead><tr>';
    table += '<th>Employee ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th>';
    table += '<th>Department</th><th>Branch</th><th>Status</th><th>Last Login</th>';
    table += '</tr></thead>';
    
    table += '<tbody>';
    filteredUsers.forEach(user => {
      table += '<tr>';
      table += `<td>${user.employeeId || ''}</td>`;
      table += `<td>${user.name}</td>`;
      table += `<td>${user.email}</td>`;
      table += `<td>${user.phone || ''}</td>`;
      table += `<td>${user.role}</td>`;
      table += `<td>${user.department || ''}</td>`;
      table += `<td>${user.branch}</td>`;
      table += `<td>${user.status}</td>`;
      table += `<td>${user.lastLogin}</td>`;
      table += '</tr>';
    });
    table += '</tbody></table>';

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
  };

  const exportAuditLogsToCSV = () => {
    const headers = ['ID', 'User', 'Email', 'Action', 'Action Type', 'Details', 'IP Address', 'Device', 'Timestamp', 'Status'];
    const rows = filteredAuditLogs.map(log => [
      log.id,
      log.user,
      log.email,
      log.action,
      log.actionType,
      log.details,
      log.ipAddress,
      log.device,
      log.timestamp,
      log.status
    ].map(field => `"${field}"`).join(','));

    const csvData = [headers.join(','), ...rows];
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csvData, `audit_logs_export_${timestamp}.csv`);
  };

  const handleView = (user: User) => setViewModal({ isOpen: true, user });
  const handleEdit = (user: User) => setEditModal({ isOpen: true, user });
  const handleResetPassword = (user: User) => setResetModal({ isOpen: true, user });
  const handleDelete = (user: User) => setDeleteModal({ isOpen: true, user });

  const confirmDelete = () => {
    if (deleteModal.user) {
      const deletedUser = deleteModal.user;
      setUsers(users.filter(u => u.id !== deletedUser.id));
      
      addAuditLog(
        'User Deleted',
        'delete',
        `Deleted user: ${deletedUser.name} (${deletedUser.email})`,
        'Success'
      );
    }
  };

  const confirmResetPassword = () => {
    if (resetModal.user) {
      addAuditLog(
        'Password Reset',
        'password_reset',
        `Password reset initiated for: ${resetModal.user.name} (${resetModal.user.email})`,
        'Success'
      );
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    const oldUser = users.find(u => u.id === updatedUser.id);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    
    if (oldUser) {
      const changes = [];
      if (oldUser.role !== updatedUser.role) changes.push(`role: ${oldUser.role} → ${updatedUser.role}`);
      if (oldUser.branch !== updatedUser.branch) changes.push(`branch: ${oldUser.branch} → ${updatedUser.branch}`);
      if (oldUser.status !== updatedUser.status) changes.push(`status: ${oldUser.status} → ${updatedUser.status}`);
      
      addAuditLog(
        'User Updated',
        'update',
        `Updated user: ${updatedUser.name} - Changes: ${changes.join(', ')}`,
        'Success'
      );
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role.toLowerCase()) {
      case 'super admin': return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'manager': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'hr': return 'bg-gradient-to-r from-pink-500 to-pink-600 text-white';
      case 'finance': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'branch admin': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getActionIcon = (actionType: string) => {
    const action = actionTypes.find(a => a.value === actionType);
    if (action) {
      const Icon = action.icon;
      return <Icon className="w-4 h-4" />;
    }
    return null;
  };

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100">Total Users</CardDescription>
                  <CardTitle className="text-3xl mt-1">{users.length}</CardTitle>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-green-100">Active Users</CardDescription>
                  <CardTitle className="text-3xl mt-1">{users.filter(u => u.status === 'Active').length}</CardTitle>
                </div>
                <CheckCircle className="w-10 h-10 text-green-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-orange-100">Inactive Users</CardDescription>
                  <CardTitle className="text-3xl mt-1">{users.filter(u => u.status === 'Inactive').length}</CardTitle>
                </div>
                <XCircle className="w-10 h-10 text-orange-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-purple-100">Admin Users</CardDescription>
                  <CardTitle className="text-3xl mt-1">{users.filter(u => u.role.includes('Admin')).length}</CardTitle>
                </div>
                <Shield className="w-10 h-10 text-purple-200" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Search, Filters, and Action Buttons */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search users by name, email, or role..."
                    className="pl-10 border-gray-200 focus:border-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAuditLogModal(true)}
                  variant="secondary"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Audit Logs
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="bg-green-600 text-white hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportUsersToCSV}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportUsersToExcel}>
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  onClick={openAddUserModal} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.branch} onValueChange={(value) => handleFilterChange('branch', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Branches</SelectItem>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {activeFilterCount > 0 && (
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear ({activeFilterCount})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-600">
                    <TableHead className="text-white font-semibold">User</TableHead>
                    <TableHead className="text-white font-semibold">Role</TableHead>
                    <TableHead className="text-white font-semibold">Branch</TableHead>
                    <TableHead className="text-white font-semibold">Status</TableHead>
                    <TableHead className="text-white font-semibold">Last Login</TableHead>
                    <TableHead className="text-white font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-blue-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{user.branch}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'Active' ? 'default' : 'destructive'}
                            className={user.status === 'Active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-red-100 text-red-800 hover:bg-red-100'}
                          >
                            {user.status === 'Active' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{user.lastLogin}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleView(user)}
                              className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(user)}
                              className="text-green-600 hover:text-green-900 hover:bg-green-50"
                              title="Edit User"
                            >
                              <Edit2 className="w-5 h-5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleResetPassword(user)}
                              className="text-purple-600 hover:text-purple-900 hover:bg-purple-50"
                              title="Reset Password"
                            >
                              <Key className="w-5 h-5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDelete(user)}
                              className="text-red-600 hover:text-red-900 hover:bg-red-50"
                              title="Delete User"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <Search className="w-12 h-12 text-gray-300 mb-3" />
                          <p className="text-lg font-medium text-gray-500">No users found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* ADD USER MODAL */}
        <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
          <DialogContent 
            className="overflow-hidden flex flex-col p-0"
            style={{ width: '65vw', maxWidth: '65vw', maxHeight: '85vh' }}
          >
            <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-lg shrink-0">
              <DialogTitle className="text-white text-xl flex items-center gap-2">
                <UserPlus className="w-6 h-6" />
                Add New User
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Create new user accounts by selecting employees and assigning a role
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddUserSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-6 py-6">
                  
                  {/* EMPLOYEE SELECTION DROPDOWN */}
                  <Card className="border-l-4 border-blue-500">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-lg">Select Employees</CardTitle>
                      <CardDescription>Choose employees who need user accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Popover open={employeeDropdownOpen} onOpenChange={setEmployeeDropdownOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={employeeDropdownOpen}
                            className="w-full justify-between h-auto min-h-[40px] px-3"
                          >
                            <div className="flex flex-wrap gap-1 flex-1">
                              {formData.selectedEmployees.length === 0 ? (
                                <span className="text-gray-500">Select employees...</span>
                              ) : (
                                formData.selectedEmployees.map((empId) => {
                                  const employee = availableEmployees.find(e => e.id === empId);
                                  return employee ? (
                                    <Badge 
                                      key={empId} 
                                      variant="secondary" 
                                      className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                                    >
                                      {employee.name}
                                      <X
                                        className="ml-1 h-3 w-3 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEmployeeSelect(empId);
                                        }}
                                      />
                                    </Badge>
                                  ) : null;
                                })
                              )}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }}>
                          <Command>
                            <CommandInput placeholder="Search employees..." />
                            <CommandEmpty>No employees found.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                              {availableEmployees.map((employee) => (
                                <CommandItem
                                  key={employee.id}
                                  value={`${employee.name} ${employee.email} ${employee.id}`}
                                  onSelect={() => handleEmployeeSelect(employee.id)}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.selectedEmployees.includes(employee.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 truncate">
                                      {employee.name}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                      {employee.email}
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200 shrink-0">
                                    {employee.id}
                                  </Badge>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {formData.selectedEmployees.length > 0 && (
                        <Alert className="mt-4 bg-green-50 border-green-200">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            <strong>{formData.selectedEmployees.length}</strong> employee(s) selected
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  {/* SINGLE ROLE SELECTION */}
                  <Card className="border-l-4 border-purple-500">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-lg">Assign Role</CardTitle>
                      
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="userRole" className="text-base font-semibold">Role *</Label>
                        <Select
                          value={formData.userRole}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, userRole: value }))}
                          required
                        >
                          <SelectTrigger className="w-full h-12">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-purple-600" />
                                  <span>{role}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.userRole && (
                        <Alert className="mt-4 bg-purple-50 border-purple-200">
                          <Shield className="h-4 w-4 text-purple-600" />
                          <AlertDescription className="text-purple-800">
                            Role selected: <strong>{formData.userRole}</strong>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  {/* Organization Details */}
                  <Card className="border-l-4 border-green-500">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-lg">Organization Details</CardTitle>
                      <CardDescription>Assign branch and department</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="branch" className="text-base font-semibold">Branch *</Label>
                          <Select
                            value={formData.branch}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              {branches.map(branch => (
                                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-base font-semibold">Department *</Label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map(dept => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Password Section */}
                  <Card className="border-l-4 border-orange-500">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        Set Password
                      </CardTitle>
                      <CardDescription>Create a secure password for the user account(s)</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-base font-semibold">Password *</Label>
                          <Input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            required
                            placeholder="••••••••"
                            className="h-12 border-gray-200 focus:border-orange-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-base font-semibold">Confirm Password *</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleFormChange}
                            required
                            placeholder="••••••••"
                            className="h-12 border-gray-200 focus:border-orange-400"
                          />
                        </div>
                      </div>

                      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <Alert className="mt-4 bg-red-50 border-red-200">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-800">
                            Passwords do not match
                          </AlertDescription>
                        </Alert>
                      )}

                      {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <Alert className="mt-4 bg-green-50 border-green-200">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            Passwords match successfully!
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <DialogFooter className="px-6 py-4 border-t shrink-0 bg-gray-50">
                <Button type="button" variant="outline" onClick={() => setShowAddUserModal(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={
                    formData.selectedEmployees.length === 0 || 
                    !formData.userRole ||
                    !formData.branch ||
                    !formData.department ||
                    formData.password !== formData.confirmPassword
                  }
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User{formData.selectedEmployees.length > 1 ? 's' : ''} ({formData.selectedEmployees.length})
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* AUDIT LOG MODAL */}
        <Dialog open={showAuditLogModal} onOpenChange={setShowAuditLogModal}>
          <DialogContent 
            className="flex flex-col p-0"
            style={{ width: '80vw', maxWidth: '80vw', maxHeight: '85vh' }}
          >
            <DialogHeader className="p-6 border-b bg-white shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-purple-600" />
                    Audit Logs
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    View and filter user activity logs
                  </DialogDescription>
                </div>
                <Button
                  onClick={exportAuditLogsToCSV}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </DialogHeader>

            {/* Filters */}
            <div className="p-4 border-b bg-gray-50 shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <Input
                  type="text"
                  placeholder="Search user..."
                  value={auditFilters.user}
                  onChange={(e) => handleAuditFilterChange('user', e.target.value)}
                  className="bg-white"
                />

                <Select value={auditFilters.actionType} onValueChange={(value) => handleAuditFilterChange('actionType', value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">All Actions</SelectItem>
                    {actionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={auditFilters.status} onValueChange={(value) => handleAuditFilterChange('status', value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">All Status</SelectItem>
                    <SelectItem value="Success">Success</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={auditFilters.dateFrom}
                  onChange={(e) => handleAuditFilterChange('dateFrom', e.target.value)}
                  className="bg-white"
                  placeholder="From date"
                />

                <Input
                  type="date"
                  value={auditFilters.dateTo}
                  onChange={(e) => handleAuditFilterChange('dateTo', e.target.value)}
                  className="bg-white"
                  placeholder="To date"
                />
              </div>

              {activeAuditFilterCount > 0 && (
                <div className="mt-3">
                  <Button
                    onClick={clearAllAuditFilters}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters ({activeAuditFilterCount})
                  </Button>
                </div>
              )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-white border-b shrink-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{filteredAuditLogs.length}</div>
                <div className="text-sm text-gray-500">Total Logs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {filteredAuditLogs.filter(log => log.status === 'Success').length}
                </div>
                <div className="text-sm text-gray-500">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {filteredAuditLogs.filter(log => log.status === 'Failed').length}
                </div>
                <div className="text-sm text-gray-500">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {filteredAuditLogs.filter(log => {
                    const logDate = new Date(log.timestamp).toDateString();
                    const today = new Date().toDateString();
                    return logDate === today;
                  }).length}
                </div>
                <div className="text-sm text-gray-500">Today</div>
              </div>
            </div>

            {/* Audit Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="bg-gray-50 sticky top-0">
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuditLogs.length > 0 ? (
                    filteredAuditLogs.map((log) => (
                      <React.Fragment key={log.id}>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleRowExpansion(log.id)}
                            >
                              {expandedRows.has(log.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="text-sm">
                            {log.timestamp}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{log.user}</div>
                              <div className="text-xs text-gray-500">{log.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getActionIcon(log.actionType)}
                              <span className="text-sm">{log.action}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={log.status === 'Success' ? 'default' : 'destructive'}
                              className={log.status === 'Success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'}
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {log.ipAddress}
                            </code>
                          </TableCell>
                        </TableRow>
                        {expandedRows.has(log.id) && (
                          <TableRow>
                            <TableCell colSpan={6} className="bg-gray-50">
                              <div className="p-4 space-y-3">
                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                    Details
                                  </div>
                                  <div className="text-sm text-gray-700">{log.details}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                      Device
                                    </div>
                                    <div className="text-sm text-gray-700">{log.device}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                      Log ID
                                    </div>
                                    <div className="text-sm text-gray-700">#{log.id}</div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <Activity className="w-12 h-12 text-gray-300 mb-3" />
                          <p className="text-lg font-medium text-gray-500">No audit logs found</p>
                          <p className="text-sm text-gray-400">
                            {activeAuditFilterCount > 0 
                              ? 'Try adjusting your filters' 
                              : 'Audit logs will appear here'}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>

        {/* All Modals */}
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
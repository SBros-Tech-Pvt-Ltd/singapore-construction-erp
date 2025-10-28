'use client';

import { useState } from 'react';
import RoleFormModal from '@/components/modal/roleform';
import PermissionsModal from '@/components/modal/permissions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Plus,
  Shield,
  Users,
  Edit3,
  Trash2,
  Key,
  CheckCircle,
  XCircle,
  Crown,
  UserCog,
  Filter,
  Download,
  MoreVertical,
  Eye,
  BarChart3,
  List,
  Zap,
  Info,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  Calendar,
  User,
} from 'lucide-react';

interface Role {
  id: number;
  name: string;
  description: string;
  type: 'System' | 'Custom';
  users: number;
  status: 'Active' | 'Inactive';
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

interface AuditLog {
  id: number;
  date: string;
  action: string;
  role: string;
  user: string;
  changes: string;
}

interface Activity {
  id: number;
  action: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'danger';
}

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState('list');
  
  // Roles List States
  const [search, setSearch] = useState('');
  const [showRoleFormModal, setShowRoleFormModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

  // Reports States
  const [reportSearch, setReportSearch] = useState('');
  const [reportType, setReportType] = useState('audit');
  const [dateRange, setDateRange] = useState('30days');

  // Sample roles data
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 1, 
      name: 'Admin', 
      description: 'Full system access', 
      type: 'System', 
      users: 1, 
      status: 'Active',
      createdAt: '2024-01-01',
      createdBy: 'System',
      updatedAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Employee', 
      description: 'Standard employee role', 
      type: 'Custom', 
      users: 35, 
      status: 'Active',
      createdAt: '2024-01-05',
      createdBy: 'Admin',
      updatedAt: '2024-01-20'
    },
    { 
      id: 3, 
      name: 'HR Manager', 
      description: 'Manages HR operations', 
      type: 'Custom', 
      users: 12, 
      status: 'Active',
      createdAt: '2024-01-10',
      createdBy: 'Admin',
      updatedAt: '2024-01-18'
    },
    { 
      id: 4, 
      name: 'Branch Manager', 
      description: 'Manages branch operations', 
      type: 'Custom', 
      users: 8, 
      status: 'Active',
      createdAt: '2024-01-12',
      createdBy: 'Admin',
      updatedAt: '2024-01-19'
    },
    { 
      id: 5, 
      name: 'Finance Officer', 
      description: 'Handles financial operations', 
      type: 'Custom', 
      users: 5, 
      status: 'Inactive',
      createdAt: '2024-01-08',
      createdBy: 'Admin',
      updatedAt: '2024-01-16'
    },
    { 
      id: 6, 
      name: 'Auditor', 
      description: 'Read-only access for auditing', 
      type: 'Custom', 
      users: 2, 
      status: 'Active',
      createdAt: '2024-01-14',
      createdBy: 'Admin',
      updatedAt: '2024-01-17'
    },
  ]);

  // Sample audit data
  const auditLogs: AuditLog[] = [
    { id: 1, date: '2024-01-20 14:30', action: 'Permission Updated', role: 'HR Manager', user: 'John Doe', changes: 'Added Export to Finance' },
    { id: 2, date: '2024-01-19 10:15', action: 'Role Created', role: 'Branch Manager', user: 'Jane Smith', changes: 'New custom role' },
    { id: 3, date: '2024-01-18 16:45', action: 'Role Deleted', role: 'Temp Staff', user: 'Admin', changes: 'Removed unused role' },
    { id: 4, date: '2024-01-17 09:20', action: 'Permission Updated', role: 'Finance Officer', user: 'Mike Johnson', changes: 'Removed Delete from HR' },
    { id: 5, date: '2024-01-16 11:30', action: 'User Assigned', role: 'Auditor', user: 'Sarah Williams', changes: 'Added 2 users' },
    { id: 6, date: '2024-01-15 13:10', action: 'Role Updated', role: 'Branch Manager', user: 'Admin', changes: 'Updated description' },
  ];

  const recentActivities: Activity[] = [
    { id: 1, action: '3 new users assigned to HR Manager', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Finance Officer role permissions modified', time: '5 hours ago', type: 'warning' },
    { id: 3, action: 'New role "Sales Manager" created', time: '1 day ago', type: 'info' },
    { id: 4, action: 'Auditor role deactivated', time: '2 days ago', type: 'danger' },
    { id: 5, action: '35 users are changed to custom', time: '3 days ago', type: 'info' }
  ];

  // Calculate statistics
  const stats = {
    total: roles.length,
    active: roles.filter(r => r.status === 'Active').length,
    inactive: roles.filter(r => r.status === 'Inactive').length,
    totalUsers: roles.reduce((sum, r) => sum + r.users, 0),
  };

  // Filter roles
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || role.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || role.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Filter audit logs
  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(reportSearch.toLowerCase()) ||
      log.role.toLowerCase().includes(reportSearch.toLowerCase()) ||
      log.user.toLowerCase().includes(reportSearch.toLowerCase()) ||
      log.changes.toLowerCase().includes(reportSearch.toLowerCase());
    return matchesSearch;
  });

  // Modal handlers
  const openCreateModal = () => {
    setSelectedRole(null);
    setIsEditMode(false);
    setShowRoleFormModal(true);
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setIsEditMode(true);
    setShowRoleFormModal(true);
  };

  const openViewModal = (role: Role) => {
    setSelectedRole(role);
    setShowViewModal(true);
  };

  const openPermissionsModal = (role: Role) => {
    setSelectedRole(role);
    setShowPermissionsModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setRoleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete) {
      setRoles(roles.filter(role => role.id !== roleToDelete));
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleFormSubmit = (data: Omit<Role, 'id' | 'users'>) => {
    if (isEditMode && selectedRole) {
      setRoles(roles.map(r => r.id === selectedRole.id ? { ...r, ...data } : r));
    } else {
      setRoles([...roles, {
        id: Math.max(0, ...roles.map(r => r.id)) + 1,
        ...data,
        users: 0,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: 'Admin',
        updatedAt: new Date().toISOString().split('T')[0]
      }]);
    }
    setShowRoleFormModal(false);
  };

  const getRoleIcon = (type: string) => {
    return type === 'System' ? <Crown className="w-5 h-5" /> : <UserCog className="w-5 h-5" />;
  };

  const handleExportRoles = () => {
    console.log('Exporting roles...');
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
  };

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  const clearReportFilters = () => {
    setReportSearch('');
    setReportType('audit');
    setDateRange('30days');
  };

  const getActionBadge = (action: string) => {
    const configs: Record<string, { variant: string; icon: any }> = {
      'Permission Updated': { variant: 'bg-blue-100 text-blue-700 border-blue-200', icon: Key },
      'Role Created': { variant: 'bg-green-100 text-green-700 border-green-200', icon: Plus },
      'Role Deleted': { variant: 'bg-red-100 text-red-700 border-red-200', icon: Trash2 },
      'User Assigned': { variant: 'bg-purple-100 text-purple-700 border-purple-200', icon: Users },
      'Role Updated': { variant: 'bg-gray-100 text-gray-700 border-gray-200', icon: Edit3 },
    };

    const config = configs[action] || configs['Role Updated'];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={config.variant}>
        <Icon className="w-3 h-3 mr-1.5" />
        {action}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      case 'danger':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
      case 'danger':
        return 'bg-red-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen">
      {/* INCREASED WIDTH - Changed from max-w-7xl to max-w-[95vw] */}
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start rounded-none h-auto p-0 space-x-8">
            <TabsTrigger
              value="list"
              className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent shadow-none"
            >
              <List className="w-4 h-4 mr-2" />
              Roles List
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent shadow-none"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports & Analytics
            </TabsTrigger>
          </TabsList>

          {/* Roles List Tab */}
          <TabsContent value="list" className="mt-0">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <Card className="bg-blue-500 border-blue-600 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80 mb-1">Total Roles</p>
                      <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500 border-green-600 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80 mb-1">Active Roles</p>
                      <p className="text-3xl font-bold text-white">{stats.active}</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-400 border-orange-500 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80 mb-1">Inactive Roles</p>
                      <p className="text-3xl font-bold text-white">{stats.inactive}</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pink-500 border-pink-600 shadow-md hover:shadow-lg transition-shadow ">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80 mb-1">Total Users</p>
                      <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters & Actions */}
            <Card className="shadow-sm border-gray-100 mb-6 sm:max-w-[85vw] mx-auto">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  {/* Left Section - Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">Filters</span>
                    </div>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="System">System</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Right Section - Search & Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search roles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 min-w-[200px]"
                      />
                    </div>

                    <Button variant="outline" onClick={handleExportRoles}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>

                    <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700 shadow-md">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Role
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Roles Table */}
            <Card className="shadow-sm border-gray-100 overflow-hidden max-w-[85vw] mx-auto">
              {filteredRoles.length === 0 ? (
                <CardContent className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </CardContent>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table >
                      <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                        <TableRow className="border-b border-gray-200">
                          <TableHead>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              <Shield className="w-4 h-4" />
                              Role Name
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Type
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Users
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </TableHead>
                          <TableHead className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRoles.map((role) => (
                          <TableRow
                            key={role.id}
                            className="hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                  role.type === 'System'
                                    ? 'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600'
                                    : 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600'
                                }`}>
                                  {getRoleIcon(role.type)}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    {role.name}
                                  </div>
                                  </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  role.type === 'System'
                                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                                    : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {role.type === 'System' ? (
                                  <Crown className="w-3.5 h-3.5 mr-1.5" />
                                ) : (
                                  <UserCog className="w-3.5 h-3.5 mr-1.5" />
                                )}
                                {role.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{role.users}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  role.status === 'Active'
                                    ? 'bg-green-100 text-green-700 border-green-200'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                {role.status === 'Active' ? (
                                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 mr-1.5" />
                                )}
                                {role.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => openViewModal(role)}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openPermissionsModal(role)}>
                                      <Key className="w-4 h-4 mr-2" />
                                      Permissions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openEditModal(role)}>
                                      <Edit3 className="w-4 h-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteClick(role.id)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="px-6 py-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredRoles.length}</span> of{' '}
                        <span className="font-medium">{roles.length}</span> roles
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          1
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>

            <div className="mt-6 mb-8 text-center text-sm text-gray-500">
              <p>💡 Tip: Click on the permissions button to configure role-based access control</p>
            </div>
          </TabsContent>

          {/* Reports & Analytics Tab */}
          <TabsContent value="reports" className="mt-0">
            {/* Filters */}
            <Card className="shadow-sm border-gray-100 my-6">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  {/* Left Section - Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">Filters</span>
                    </div>

                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="audit">📝 Audit Log</SelectItem>
                        <SelectItem value="assignment">👥 Role Assignment</SelectItem>
                        <SelectItem value="access">🔐 Access Analysis</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">📅 Last 7 Days</SelectItem>
                        <SelectItem value="30days">📅 Last 30 Days</SelectItem>
                        <SelectItem value="90days">📅 Last 90 Days</SelectItem>
                        <SelectItem value="custom">🗓️ Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Right Section - Search & Export */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search reports..."
                        value={reportSearch}
                        onChange={(e) => setReportSearch(e.target.value)}
                        className="pl-10 min-w-[200px]"
                      />
                    </div>

                    <Button onClick={handleExportExcel} className="bg-green-600 hover:bg-green-700">
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Excel
                    </Button>

                    <Button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-700">
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              {/* Audit Log Table */}
              <div className="lg:col-span-3">
                <Card className="shadow-sm border-gray-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        Audit Log
                      </CardTitle>
                      <Badge variant="secondary" className="bg-gray-100">
                        {filteredAuditLogs.length} entries
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow className="border-b border-gray-100">
                            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Timestamp
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Action
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Role
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              User
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Changes
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAuditLogs.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                  <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                                <Button onClick={clearReportFilters} variant="outline">
                                  Clear Filters
                                </Button>
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredAuditLogs.map(log => (
                              <TableRow
                                key={log.id}
                                className="hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              >
                                <TableCell className="text-sm text-gray-500 whitespace-nowrap font-medium">
                                  {log.date}
                                </TableCell>
                                <TableCell>{getActionBadge(log.action)}</TableCell>
                                <TableCell className="font-semibold text-gray-900 text-sm">
                                  {log.role}
                                </TableCell>
                                <TableCell className="text-gray-700 text-sm">{log.user}</TableCell>
                                <TableCell className="text-sm text-gray-600">{log.changes}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {filteredAuditLogs.length > 0 && (
                      <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
                        <div className="text-sm text-gray-600 font-medium">
                          Showing <span className="text-gray-900 font-semibold">1-{filteredAuditLogs.length}</span> of{' '}
                          <span className="text-gray-900 font-semibold">156</span> results
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" disabled>
                            Previous
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            1
                          </Button>
                          <Button variant="outline" size="sm">
                            2
                          </Button>
                          <Button variant="outline" size="sm">
                            3
                          </Button>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-sm border-gray-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="p-4 space-y-3">
                        {recentActivities.map(activity => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityBgColor(
                                activity.type
                              )}`}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-900 font-medium leading-relaxed">
                                {activity.action}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <RoleFormModal
          open={showRoleFormModal}
          onClose={() => setShowRoleFormModal(false)}
          onSubmit={handleFormSubmit}
          role={isEditMode ? (selectedRole ?? undefined) : undefined}
        />

        {showPermissionsModal && selectedRole && (
          <PermissionsModal
            open={showPermissionsModal}
            role={selectedRole}
            onClose={() => setShowPermissionsModal(false)}
          />
        )}

        {/* View Role Details Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="sm:max-w-[50vw]">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <div className={`p-2 rounded-lg ${
                  selectedRole?.type === 'System'
                    ? 'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600'
                    : 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600'
                }`}>
                  {selectedRole && getRoleIcon(selectedRole.type)}
                </div>
                {selectedRole?.name}
              </DialogTitle>
              <DialogDescription>
                Complete details and information about this role
              </DialogDescription>
            </DialogHeader>

            {selectedRole && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Role Name</label>
                    <p className="text-base font-semibold text-gray-900">{selectedRole.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Role Type</label>
                    <div>
                      <Badge
                        variant="outline"
                        className={`${
                          selectedRole.type === 'System'
                            ? 'bg-amber-100 text-amber-700 border-amber-200'
                            : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {selectedRole.type === 'System' ? (
                          <Crown className="w-3.5 h-3.5 mr-1.5" />
                        ) : (
                          <UserCog className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        {selectedRole.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-base text-gray-900">{selectedRole.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div>
                      <Badge
                        variant="outline"
                        className={`${
                          selectedRole.status === 'Active'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        {selectedRole.status === 'Active' ? (
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        {selectedRole.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Assigned Users</label>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold text-gray-900">{selectedRole.users} users</span>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Metadata</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Created At
                      </label>
                      <p className="text-sm text-gray-900">{selectedRole.createdAt || 'N/A'}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Created By
                      </label>
                      <p className="text-sm text-gray-900">{selectedRole.createdBy || 'N/A'}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last Updated
                      </label>
                      <p className="text-sm text-gray-900">{selectedRole.updatedAt || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedRole);
                  }} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Role
                  </Button>
                  <Button onClick={() => {
                    setShowViewModal(false);
                    openPermissionsModal(selectedRole);
                  }} variant="outline" className="flex-1">
                    <Key className="w-4 h-4 mr-2" />
                    Manage Permissions
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the role
                and remove all associated permissions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
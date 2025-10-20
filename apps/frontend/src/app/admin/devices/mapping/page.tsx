// app/admin/devices/mapping/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  Fingerprint,
  Users,
  Save,
  RefreshCw,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';

// Mock data
const branches = [
  { id: 1, name: 'Head Office', code: 'HQ', location: 'New York' },
  { id: 2, name: 'Site A', code: 'SA', location: 'Los Angeles' },
  { id: 3, name: 'Site B', code: 'SB', location: 'Chicago' },
  { id: 4, name: 'Site C', code: 'SC', location: 'Houston' },
  { id: 5, name: 'Site D', code: 'SD', location: 'Phoenix' },
];

const shifts = [
  { id: 1, name: 'Day Shift', startTime: '09:00 AM', endTime: '06:00 PM', code: 'DAY' },
  { id: 2, name: 'Night Shift', startTime: '10:00 PM', endTime: '07:00 AM', code: 'NIGHT' },
  { id: 3, name: 'Morning Shift', startTime: '06:00 AM', endTime: '03:00 PM', code: 'MORNING' },
  { id: 4, name: 'Evening Shift', startTime: '03:00 PM', endTime: '12:00 AM', code: 'EVENING' },
  { id: 5, name: 'Rotational Shift', startTime: 'Variable', endTime: 'Variable', code: 'ROTATIONAL' },
];

const userGroups = [
  { id: 1, name: 'All Employees', count: 45 },
  { id: 2, name: 'Management', count: 8 },
  { id: 3, name: 'Engineering', count: 15 },
  { id: 4, name: 'Sales', count: 12 },
  { id: 5, name: 'HR', count: 5 },
  { id: 6, name: 'Finance', count: 5 },
];

const deviceMappings = [
  {
    id: 1,
    deviceId: 'BD001',
    deviceName: 'Bio-Device-HQ-01',
    branch: { id: 1, name: 'Head Office' },
    shift: { id: 1, name: 'Day Shift' },
    userGroups: [{ id: 1, name: 'All Employees' }],
    location: 'Main Entrance',
    isActive: true,
    enrolledUsers: 45,
    lastSync: '2024-01-20T14:30:00Z',
    priority: 1
  },
  {
    id: 2,
    deviceId: 'BD002',
    deviceName: 'Bio-Device-HQ-02',
    branch: { id: 1, name: 'Head Office' },
    shift: { id: 2, name: 'Night Shift' },
    userGroups: [{ id: 3, name: 'Engineering' }],
    location: 'Back Gate',
    isActive: true,
    enrolledUsers: 15,
    lastSync: '2024-01-20T14:28:00Z',
    priority: 2
  },
  {
    id: 3,
    deviceId: 'BD003',
    deviceName: 'Bio-Device-SA-01',
    branch: { id: 2, name: 'Site A' },
    shift: { id: 1, name: 'Day Shift' },
    userGroups: [{ id: 1, name: 'All Employees' }],
    location: 'Site Entrance',
    isActive: true,
    enrolledUsers: 32,
    lastSync: '2024-01-20T14:25:00Z',
    priority: 1
  },
  {
    id: 4,
    deviceId: 'BD004',
    deviceName: 'Bio-Device-SB-01',
    branch: { id: 3, name: 'Site B' },
    shift: { id: 1, name: 'Day Shift' },
    userGroups: [{ id: 1, name: 'All Employees' }],
    location: 'Office Block',
    isActive: false,
    enrolledUsers: 28,
    lastSync: '2024-01-20T10:15:00Z',
    priority: 1
  },
  {
    id: 5,
    deviceId: 'BD005',
    deviceName: 'Bio-Device-SC-01',
    branch: { id: 4, name: 'Site C' },
    shift: { id: 3, name: 'Morning Shift' },
    userGroups: [{ id: 4, name: 'Sales' }, { id: 5, name: 'HR' }],
    location: 'Security Gate',
    isActive: true,
    enrolledUsers: 17,
    lastSync: '2024-01-20T13:45:00Z',
    priority: 1
  },
  {
    id: 6,
    deviceId: 'BD006',
    deviceName: 'Bio-Device-SD-01',
    branch: { id: 5, name: 'Site D' },
    shift: { id: 5, name: 'Rotational Shift' },
    userGroups: [{ id: 1, name: 'All Employees' }],
    location: 'Main Gate',
    isActive: false,
    enrolledUsers: 15,
    lastSync: '2024-01-19T18:30:00Z',
    priority: 2
  },
];

export default function DeviceMappingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<any>(null);
  const [isBulkMapDialogOpen, setIsBulkMapDialogOpen] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    branchId: '',
    shiftId: '',
    userGroupIds: [] as number[],
    location: '',
    isActive: true,
    priority: 1
  });

  const formatDistanceToNow = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // Filter mappings
  const filteredMappings = deviceMappings.filter((mapping) => {
    const matchesSearch = 
      mapping.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || mapping.branch.name === branchFilter;
    const matchesShift = shiftFilter === 'all' || mapping.shift.name === shiftFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && mapping.isActive) ||
      (statusFilter === 'inactive' && !mapping.isActive);
    
    return matchesSearch && matchesBranch && matchesShift && matchesStatus;
  });

  // Calculate stats
  const stats = {
    totalMappings: deviceMappings.length,
    activeMappings: deviceMappings.filter(m => m.isActive).length,
    inactiveMappings: deviceMappings.filter(m => !m.isActive).length,
    totalUsers: deviceMappings.reduce((sum, m) => sum + m.enrolledUsers, 0),
    mappedBranches: [...new Set(deviceMappings.map(m => m.branch.id))].length,
    mappedShifts: [...new Set(deviceMappings.map(m => m.shift.id))].length
  };

  const handleEditMapping = (mapping: any) => {
    setSelectedMapping(mapping);
    setEditForm({
      branchId: mapping.branch.id.toString(),
      shiftId: mapping.shift.id.toString(),
      userGroupIds: mapping.userGroups.map((g: any) => g.id),
      location: mapping.location,
      isActive: mapping.isActive,
      priority: mapping.priority
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveMapping = () => {
    alert('✅ Mapping updated successfully!');
    setIsEditDialogOpen(false);
  };

  const handleDeleteMapping = (mappingId: number) => {
    if (confirm('Are you sure you want to delete this mapping?')) {
      alert('Mapping deleted successfully');
    }
  };

  const handleBulkMap = () => {
    alert('✅ Bulk mapping applied successfully!');
    setIsBulkMapDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Device Mapping
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Configure device-to-branch-shift associations and user groups
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isBulkMapDialogOpen} onOpenChange={setIsBulkMapDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Bulk Map
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Bulk Device Mapping</DialogTitle>
                  <DialogDescription>
                    Apply mapping configuration to multiple devices at once
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Select devices and configure their branch, shift, and user group assignments in one go.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label>Select Devices</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose devices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Devices</SelectItem>
                        <SelectItem value="bd001">Bio-Device-HQ-01</SelectItem>
                        <SelectItem value="bd002">Bio-Device-HQ-02</SelectItem>
                        <SelectItem value="bd003">Bio-Device-SA-01</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Branch</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map(branch => (
                            <SelectItem key={branch.id} value={branch.id.toString()}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Shift</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                        <SelectContent>
                          {shifts.map(shift => (
                            <SelectItem key={shift.id} value={shift.id.toString()}>
                              {shift.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>User Groups</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user groups" />
                      </SelectTrigger>
                      <SelectContent>
                        {userGroups.map(group => (
                          <SelectItem key={group.id} value={group.id.toString()}>
                            {group.name} ({group.count} users)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBulkMapDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBulkMap}>
                    <Save className="h-4 w-4 mr-2" />
                    Apply Mapping
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Total Mappings */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Total</p>
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.totalMappings}</p>
              <p className="text-[10px] text-white/80 mt-1">Mappings</p>
            </CardContent>
          </Card>

          {/* Active */}
          <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Active</p>
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.activeMappings}</p>
              <p className="text-[10px] text-white/80 mt-1">Enabled</p>
            </CardContent>
          </Card>

          {/* Inactive */}
          <Card className="border-0 bg-gradient-to-br from-red-600 to-red-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Inactive</p>
                <XCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.inactiveMappings}</p>
              <p className="text-[10px] text-white/80 mt-1">Disabled</p>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Users</p>
                <Users className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.totalUsers}</p>
              <p className="text-[10px] text-white/80 mt-1">Enrolled</p>
            </CardContent>
          </Card>

          {/* Branches */}
          <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Branches</p>
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.mappedBranches}</p>
              <p className="text-[10px] text-white/80 mt-1">Covered</p>
            </CardContent>
          </Card>

          {/* Shifts */}
          <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Shifts</p>
                <Clock className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.mappedShifts}</p>
              <p className="text-[10px] text-white/80 mt-1">Assigned</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Reference */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Branches Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Available Branches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {branches.map(branch => (
                  <div key={branch.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{branch.name}</p>
                      <p className="text-xs text-muted-foreground">{branch.location}</p>
                    </div>
                    <Badge variant="outline">{branch.code}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shifts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Available Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {shifts.map(shift => (
                  <div key={shift.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{shift.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {shift.startTime} - {shift.endTime}
                      </p>
                    </div>
                    <Badge variant="secondary">{shift.code}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Groups Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userGroups.map(group => (
                  <div key={group.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <p className="text-sm font-medium text-foreground">{group.name}</p>
                    <Badge variant="outline">{group.count} users</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 md:gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search device, branch, location..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  {shifts.map(shift => (
                    <SelectItem key={shift.id} value={shift.name}>
                      {shift.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Mappings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Device Mappings ({filteredMappings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Device</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead className="hidden lg:table-cell">User Groups</TableHead>
                    <TableHead className="hidden xl:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Sync</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No mappings found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMappings.map((mapping) => (
                      <TableRow key={mapping.id} className="hover:bg-accent/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Fingerprint className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{mapping.deviceName}</div>
                              <div className="text-sm text-muted-foreground">{mapping.deviceId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline">{mapping.branch.name}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="secondary">{mapping.shift.name}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {mapping.userGroups.map((group: any) => (
                              <Badge key={group.id} variant="outline" className="text-xs">
                                {group.name}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{mapping.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{mapping.enrolledUsers}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={mapping.isActive} />
                            <Badge className={mapping.isActive ? 
                              'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                              'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                            }>
                              {mapping.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(mapping.lastSync)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditMapping(mapping)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteMapping(mapping.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Mapping Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
<DialogHeader>
<DialogTitle>Edit Device Mapping</DialogTitle>
<DialogDescription>
Update branch, shift, and user group assignments for {selectedMapping?.deviceName}
</DialogDescription>
</DialogHeader>
<div className="space-y-6 py-4">
{/* Device Info */}
<div className="p-4 bg-accent/50 rounded-lg">
<div className="flex items-center gap-3">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
<Fingerprint className="h-6 w-6 text-primary" />
</div>
<div>
<p className="font-semibold text-foreground">{selectedMapping?.deviceName}</p>
<p className="text-sm text-muted-foreground">{selectedMapping?.deviceId}</p>
</div>
</div>
</div>

{/* Branch Selection */}
          <div className="space-y-2">
            <Label htmlFor="branch">Branch *</Label>
            <Select value={editForm.branchId} onValueChange={(value) => setEditForm({...editForm, branchId: value})}>
              <SelectTrigger id="branch">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map(branch => (
                  <SelectItem key={branch.id} value={branch.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{branch.name}</span>
                      <span className="text-xs text-muted-foreground">({branch.location})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Shift Selection */}
          <div className="space-y-2">
            <Label htmlFor="shift">Shift *</Label>
            <Select value={editForm.shiftId} onValueChange={(value) => setEditForm({...editForm, shiftId: value})}>
              <SelectTrigger id="shift">
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                {shifts.map(shift => (
                  <SelectItem key={shift.id} value={shift.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{shift.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({shift.startTime} - {shift.endTime})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* User Groups Selection */}
          <div className="space-y-2">
            <Label>User Groups *</Label>
            <div className="border rounded-lg p-4 space-y-2">
              {userGroups.map(group => (
                <div key={group.id} className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`group-${group.id}`}
                      checked={editForm.userGroupIds.includes(group.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditForm({
                            ...editForm,
                            userGroupIds: [...editForm.userGroupIds, group.id]
                          });
                        } else {
                          setEditForm({
                            ...editForm,
                            userGroupIds: editForm.userGroupIds.filter(id => id !== group.id)
                          });
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={`group-${group.id}`} className="text-sm font-medium cursor-pointer">
                      {group.name}
                    </label>
                  </div>
                  <Badge variant="outline">{group.count} users</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Physical Location</Label>
            <Input 
              id="location"
              placeholder="e.g., Main Entrance, Security Gate" 
              value={editForm.location}
              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select 
              value={editForm.priority.toString()} 
              onValueChange={(value) => setEditForm({...editForm, priority: parseInt(value)})}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Priority 1 (Highest)</SelectItem>
                <SelectItem value="2">Priority 2 (High)</SelectItem>
                <SelectItem value="3">Priority 3 (Medium)</SelectItem>
                <SelectItem value="4">Priority 4 (Low)</SelectItem>
                <SelectItem value="5">Priority 5 (Lowest)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Higher priority devices are synced first during bulk operations
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="active-status">Active Status</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable this device mapping
              </p>
            </div>
            <Switch
              id="active-status"
              checked={editForm.isActive}
              onCheckedChange={(checked) => setEditForm({...editForm, isActive: checked})}
            />
          </div>

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> Changes will take effect immediately. Users in the selected groups will be automatically enrolled on this device during the next sync.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveMapping}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Mapping Summary */}
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Mapping Summary</CardTitle>
        <CardDescription>Overview of current device-branch-shift configurations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* By Branch */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Devices by Branch
            </h4>
            <div className="space-y-2">
              {branches.map(branch => {
                const branchDevices = deviceMappings.filter(m => m.branch.id === branch.id);
                return (
                  <div key={branch.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <span className="text-sm text-foreground">{branch.name}</span>
                    <Badge variant="secondary">{branchDevices.length} devices</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Shift */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Devices by Shift
            </h4>
            <div className="space-y-2">
              {shifts.map(shift => {
                const shiftDevices = deviceMappings.filter(m => m.shift.id === shift.id);
                return (
                  <div key={shift.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <span className="text-sm text-foreground">{shift.name}</span>
                    <Badge variant="secondary">{shiftDevices.length} devices</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded-lg">
                <span className="text-sm text-foreground">Fully Configured</span>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {deviceMappings.filter(m => m.branch && m.shift && m.userGroups.length > 0).length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded-lg">
                <span className="text-sm text-foreground">Partially Configured</span>
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                  0
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded-lg">
                <span className="text-sm text-foreground">Not Configured</span>
                <Badge variant="secondary">0</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded-lg">
                <span className="text-sm text-foreground">Active Mappings</span>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {deviceMappings.filter(m => m.isActive).length}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
  );
}
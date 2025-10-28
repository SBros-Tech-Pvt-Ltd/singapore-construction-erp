// app/admin/attendance/device-mapping/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Link2,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Upload,
  FileDown,
  Wifi,
  WifiOff,
  Fingerprint,
  ChevronDown,
  ChevronRight,
  User,
  Monitor,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Types
type DeviceStatus = 'online' | 'offline';

interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceUserId: string;
  deviceStatus: DeviceStatus;
  effectiveFrom: string;
  isActive: boolean;
}

interface EmployeeMapping {
  id: number;
  employeeCode: string;
  employeeName: string;
  photo: string;
  branch: string;
  department: string;
  devices: DeviceInfo[];
}

// Add/Edit Multiple Devices Modal
interface MappingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  employee?: EmployeeMapping | null;
}

function MappingModal({ open, onOpenChange, onSave, employee }: MappingModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState(employee?.employeeCode || '');
  const [devices, setDevices] = useState<DeviceInfo[]>(
    employee?.devices || [
      {
        deviceId: '',
        deviceName: '',
        deviceUserId: '',
        deviceStatus: 'online',
        effectiveFrom: new Date().toISOString().split('T')[0],
        isActive: true,
      },
    ]
  );

  const availableDevices = [
    { id: 'BD001', name: 'Bio-Device-HQ-01', status: 'online' as DeviceStatus },
    { id: 'BD002', name: 'Bio-Device-HQ-02', status: 'online' as DeviceStatus },
    { id: 'BD003', name: 'Bio-Device-SA-01', status: 'online' as DeviceStatus },
    { id: 'BD004', name: 'Bio-Device-SB-01', status: 'offline' as DeviceStatus },
  ];

  const addDevice = () => {
    setDevices([
      ...devices,
      {
        deviceId: '',
        deviceName: '',
        deviceUserId: '',
        deviceStatus: 'online',
        effectiveFrom: new Date().toISOString().split('T')[0],
        isActive: true,
      },
    ]);
  };

  const removeDevice = (index: number) => {
    setDevices(devices.filter((_, i) => i !== index));
  };

  const updateDevice = (index: number, field: keyof DeviceInfo, value: any) => {
    const updated = [...devices];
    updated[index] = { ...updated[index], [field]: value };
    
    // Auto-fill device name and status when device ID is selected
    if (field === 'deviceId') {
      const device = availableDevices.find(d => d.id === value);
      if (device) {
        updated[index].deviceName = device.name;
        updated[index].deviceStatus = device.status;
      }
    }
    
    setDevices(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? `Manage Device Mapping - ${employee.employeeName}` : 'Add Device Mapping'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Employee <span className="text-destructive">*</span>
            </label>
            <Select
              value={selectedEmployee}
              onValueChange={setSelectedEmployee}
              disabled={!!employee}
            >
              <SelectTrigger>
                <SelectValue placeholder="Search by name or code..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMP001">EMP001 - John Smith (Head Office)</SelectItem>
                <SelectItem value="EMP002">EMP002 - Sarah Jones (Site A)</SelectItem>
                <SelectItem value="EMP003">EMP003 - Mike Wilson (Site B)</SelectItem>
                <SelectItem value="EMP004">EMP004 - Emma Davis (Head Office)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedEmployee && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Branch (auto-filled)</p>
              <p className="font-medium">Head Office</p>
            </div>
          )}

          {/* Devices Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Device Mappings</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDevice}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Device
              </Button>
            </div>

            {devices.map((device, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-sm font-medium">Device {index + 1}</h4>
                    {devices.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDevice(index)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Biometric Device <span className="text-destructive">*</span>
                      </label>
                      <Select
                        value={device.deviceId}
                        onValueChange={(value) => updateDevice(index, 'deviceId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDevices.map((d) => (
                            <SelectItem key={d.id} value={d.id}>
                              <div className="flex items-center gap-2">
                                {d.status === 'online' ? (
                                  <Wifi className="h-3 w-3 text-green-600" />
                                ) : (
                                  <WifiOff className="h-3 w-3 text-red-600" />
                                )}
                                {d.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Device User ID <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={device.deviceUserId}
                        onChange={(e) => updateDevice(index, 'deviceUserId', e.target.value)}
                        placeholder="e.g., 1001"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Effective From</label>
                      <Input
                        type="date"
                        value={device.effectiveFrom}
                        onChange={(e) => updateDevice(index, 'effectiveFrom', e.target.value)}
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <Checkbox
                        id={`active-${index}`}
                        checked={device.isActive}
                        onCheckedChange={(checked) =>
                          updateDevice(index, 'isActive', checked as boolean)
                        }
                      />
                      <label htmlFor={`active-${index}`} className="ml-2 text-sm font-medium">
                        Enable this device mapping
                      </label>
                    </div>
                  </div>

                  {device.deviceId && (
                    <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                      <strong>Selected:</strong> {device.deviceName} • Status:{' '}
                      {device.deviceStatus === 'online' ? (
                        <span className="text-green-600">Online</span>
                      ) : (
                        <span className="text-red-600">Offline</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {employee ? 'Update Mappings' : 'Save Mappings'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Bulk Import Modal
interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BulkImportModal({ open, onOpenChange }: BulkImportModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      alert('✅ Importing device mappings...');
      onOpenChange(false);
      setFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Import Device Mapping</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload CSV</label>
            <Input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-2">CSV Format:</p>
            <code className="text-xs block bg-background p-2 rounded font-mono">
              Employee_Code, Device_ID, Device_User_ID, Effective_From
            </code>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">Example (Multiple devices per employee):</p>
              <code className="text-xs block bg-background p-2 rounded font-mono">
                EMP001, BD001, 1001, 2024-01-01<br />
                EMP001, BD002, 1001, 2024-01-01<br />
                EMP002, BD003, 1002, 2024-01-01
              </code>
            </div>
            <Button variant="link" size="sm" className="mt-2 h-auto p-0">
              <FileDown className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file}>
              Import & Validate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Sample JSON Data with Multiple Devices per Employee
const employeeMappings: EmployeeMapping[] = [
  {
    id: 1,
    employeeCode: 'EMP001',
    employeeName: 'John Smith',
    photo: '',
    branch: 'Head Office',
    department: 'IT',
    devices: [
      {
        deviceId: 'BD001',
        deviceName: 'Bio-Device-HQ-01',
        deviceUserId: '1001',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
      {
        deviceId: 'BD002',
        deviceName: 'Bio-Device-HQ-02',
        deviceUserId: '1001',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
    ],
  },
  {
    id: 2,
    employeeCode: 'EMP002',
    employeeName: 'Sarah Jones',
    photo: '',
    branch: 'Site A',
    department: 'HR',
    devices: [
      {
        deviceId: 'BD003',
        deviceName: 'Bio-Device-SA-01',
        deviceUserId: '2001',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
    ],
  },
  {
    id: 3,
    employeeCode: 'EMP003',
    employeeName: 'Mike Wilson',
    photo: '',
    branch: 'Site B',
    department: 'Sales',
    devices: [],
  },
  {
    id: 4,
    employeeCode: 'EMP004',
    employeeName: 'Emma Davis',
    photo: '',
    branch: 'Head Office',
    department: 'IT',
    devices: [
      {
        deviceId: 'BD001',
        deviceName: 'Bio-Device-HQ-01',
        deviceUserId: '1004',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
      {
        deviceId: 'BD002',
        deviceName: 'Bio-Device-HQ-02',
        deviceUserId: '1004',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
      {
        deviceId: 'BD003',
        deviceName: 'Bio-Device-SA-01',
        deviceUserId: '1004',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-10',
        isActive: true,
      },
    ],
  },
  {
    id: 5,
    employeeCode: 'EMP005',
    employeeName: 'Tom Brown',
    photo: '',
    branch: 'Site A',
    department: 'Tech',
    devices: [
      {
        deviceId: 'BD003',
        deviceName: 'Bio-Device-SA-01',
        deviceUserId: '2002',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-05',
        isActive: true,
      },
    ],
  },
  {
    id: 6,
    employeeCode: 'EMP006',
    employeeName: 'Lisa Anderson',
    photo: '',
    branch: 'Head Office',
    department: 'Finance',
    devices: [
      {
        deviceId: 'BD001',
        deviceName: 'Bio-Device-HQ-01',
        deviceUserId: '1003',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
    ],
  },
  {
    id: 7,
    employeeCode: 'EMP007',
    employeeName: 'David Miller',
    photo: '',
    branch: 'Site B',
    department: 'Operations',
    devices: [],
  },
  {
    id: 8,
    employeeCode: 'EMP008',
    employeeName: 'Rachel Green',
    photo: '',
    branch: 'Head Office',
    department: 'Marketing',
    devices: [
      {
        deviceId: 'BD002',
        deviceName: 'Bio-Device-HQ-02',
        deviceUserId: '1005',
        deviceStatus: 'online',
        effectiveFrom: '2024-01-01',
        isActive: true,
      },
    ],
  },
];

export default function DeviceMappingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeMapping | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // Calculate stats
  const totalEmployees = employeeMappings.length;
  const mappedCount = employeeMappings.filter((e) => e.devices.length > 0).length;
  const unmappedCount = totalEmployees - mappedCount;
  const totalDeviceMappings = employeeMappings.reduce((sum, e) => sum + e.devices.length, 0);

  // Filter data
  const filteredData = employeeMappings.filter((employee) => {
    const matchesSearch =
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = branchFilter === 'all' || employee.branch === branchFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'mapped' && employee.devices.length > 0) ||
      (statusFilter === 'unmapped' && employee.devices.length === 0);

    return matchesSearch && matchesBranch && matchesStatus;
  });

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleEdit = (employee: EmployeeMapping) => {
    setSelectedEmployee(employee);
    setIsMappingModalOpen(true);
  };

  const handleDelete = (employeeId: number, deviceId?: string) => {
    if (deviceId) {
      if (confirm(`Are you sure you want to remove device ${deviceId} mapping?`)) {
        alert(`✅ Removing device ${deviceId} mapping...`);
      }
    } else {
      if (confirm('Are you sure you want to delete all device mappings for this employee?')) {
        alert(`✅ Deleting all mappings for employee ${employeeId}...`);
      }
    }
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setIsMappingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Stats Cards - Gradient Colors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total - Blue */}
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalEmployees}</p>
                <p className="text-xs text-blue-100">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mapped - Green */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{mappedCount}</p>
                <p className="text-xs text-green-100">Mapped</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unmapped - Red */}
        <Card className="bg-gradient-to-br from-red-500 to-red-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <XCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{unmappedCount}</p>
                <p className="text-xs text-red-100">Unmapped</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Mappings - Purple */}
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <Monitor className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalDeviceMappings}</p>
                <p className="text-xs text-purple-100">Total Mappings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg md:text-xl">
              Employee Device Mapping ({filteredData.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setIsBulkImportOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button size="sm" onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Mapping
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or employee code..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="Head Office">Head Office</SelectItem>
                  <SelectItem value="Site A">Site A</SelectItem>
                  <SelectItem value="Site B">Site B</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="mapped">Mapped</SelectItem>
                  <SelectItem value="unmapped">Unmapped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="min-w-[200px]">Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead>Devices Mapped</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Link2 className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No employees found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((employee) => (
                    <React.Fragment key={employee.id}>
                      {/* Main Employee Row */}
                      <TableRow className="hover:bg-accent/50">
                        <TableCell>
                          {employee.devices.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleRow(employee.id)}
                            >
                              {expandedRows.has(employee.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.photo} />
                              <AvatarFallback>
                                {employee.employeeName.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.employeeName}</div>
                              <div className="text-sm text-muted-foreground">
                                {employee.employeeCode}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm">{employee.branch}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm">{employee.department}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-semibold">
                              {employee.devices.length}
                            </Badge>
                            {employee.devices.length > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {employee.devices.length === 1 ? 'device' : 'devices'}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {employee.devices.length > 0 ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Mapped
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Unmapped
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEdit(employee)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Manage Devices
                              </DropdownMenuItem>
                              {employee.devices.length > 0 && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDelete(employee.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove All Mappings
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Device Details */}
                      {expandedRows.has(employee.id) && employee.devices.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-muted/50 p-0">
                            <div className="p-4">
                              <div className="space-y-2">
                                {employee.devices.map((device, idx) => (
                                  <div
                                    key={`${employee.id}-${device.deviceId}-${idx}`}
                                    className="flex items-center justify-between p-3 bg-background rounded-lg border"
                                  >
                                    <div className="flex items-center gap-4 flex-1">
                                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                                        {idx + 1}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {device.deviceStatus === 'online' ? (
                                          <Wifi className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <WifiOff className="h-4 w-4 text-red-600" />
                                        )}
                                        <div>
                                          <div className="font-medium text-sm">
                                            {device.deviceName}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            ID: {device.deviceId} • User ID: {device.deviceUserId}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="text-right hidden sm:block">
                                        <div className="text-xs text-muted-foreground">
                                          Since {device.effectiveFrom}
                                        </div>
                                        {device.isActive ? (
                                          <Badge
                                            variant="outline"
                                            className="text-xs mt-1 bg-green-50 text-green-700 border-green-200"
                                          >
                                            Active
                                          </Badge>
                                        ) : (
                                          <Badge
                                            variant="outline"
                                            className="text-xs mt-1 bg-gray-50 text-gray-700 border-gray-200"
                                          >
                                            Inactive
                                          </Badge>
                                        )}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete(employee.id, device.deviceId)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <MappingModal
        open={isMappingModalOpen}
        onOpenChange={setIsMappingModalOpen}
        onSave={() => alert('✅ Device mappings saved successfully!')}
        employee={selectedEmployee}
      />

      <BulkImportModal open={isBulkImportOpen} onOpenChange={setIsBulkImportOpen} />
    </div>
  );
}
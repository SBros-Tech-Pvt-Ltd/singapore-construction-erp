// app/admin/attendance/device-mapping/page.tsx
'use client';

import { useState } from 'react';
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

interface DeviceMapping {
  id: number;
  employeeCode: string;
  employeeName: string;
  photo: string;
  branch: string;
  department: string;
  deviceId: string;
  deviceName: string;
  deviceUserId: string;
  deviceStatus: DeviceStatus;
  isActive: boolean;
  effectiveFrom: string;
}

// Add/Edit Mapping Modal
interface MappingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  editData?: DeviceMapping | null;
}

function MappingModal({ open, onOpenChange, onSave, editData }: MappingModalProps) {
  const [formData, setFormData] = useState({
    employeeCode: editData?.employeeCode || '',
    deviceId: editData?.deviceId || '',
    deviceUserId: editData?.deviceUserId || '',
    effectiveFrom: editData?.effectiveFrom || new Date().toISOString().split('T')[0],
    isActive: editData?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Device Mapping' : 'Add Device Mapping'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Employee <span className="text-destructive">*</span>
            </label>
            <Select 
              value={formData.employeeCode} 
              onValueChange={(value) => setFormData({ ...formData, employeeCode: value })}
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

          {formData.employeeCode && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Branch (auto-filled)</p>
              <p className="font-medium">Head Office</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Biometric Device <span className="text-destructive">*</span>
            </label>
            <Select 
              value={formData.deviceId} 
              onValueChange={(value) => setFormData({ ...formData, deviceId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BD001">Bio-Device-HQ-01 (Online)</SelectItem>
                <SelectItem value="BD002">Bio-Device-HQ-02 (Online)</SelectItem>
                <SelectItem value="BD003">Bio-Device-SA-01 (Online)</SelectItem>
                <SelectItem value="BD004">Bio-Device-SB-01 (Offline)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Device User ID <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.deviceUserId}
              onChange={(e) => setFormData({ ...formData, deviceUserId: e.target.value })}
              placeholder="e.g., 1001"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              The unique ID assigned to this employee in the biometric device
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Effective From</label>
            <Input
              type="date"
              value={formData.effectiveFrom}
              onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
            />
            <label htmlFor="active" className="text-sm font-medium">
              Enable mapping
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editData ? 'Update Mapping' : 'Save Mapping'}
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
              <p className="text-xs text-muted-foreground mb-1">Example:</p>
              <code className="text-xs block bg-background p-2 rounded font-mono">
                EMP001, BD001, 1001, 2024-01-01<br />
                EMP002, BD002, 1002, 2024-01-01
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

// Sample JSON Data
const deviceMappings: DeviceMapping[] = [
  {
    id: 1,
    employeeCode: 'EMP001',
    employeeName: 'John Smith',
    photo: '',
    branch: 'Head Office',
    department: 'IT',
    deviceId: 'BD001',
    deviceName: 'Bio-Device-HQ-01',
    deviceUserId: '1001',
    deviceStatus: 'online',
    isActive: true,
    effectiveFrom: '2024-01-01',
  },
  {
    id: 2,
    employeeCode: 'EMP002',
    employeeName: 'Sarah Jones',
    photo: '',
    branch: 'Site A',
    department: 'HR',
    deviceId: 'BD003',
    deviceName: 'Bio-Device-SA-01',
    deviceUserId: '2001',
    deviceStatus: 'online',
    isActive: true,
    effectiveFrom: '2024-01-01',
  },
  {
    id: 3,
    employeeCode: 'EMP003',
    employeeName: 'Mike Wilson',
    photo: '',
    branch: 'Site B',
    department: 'Sales',
    deviceId: '',
    deviceName: '--',
    deviceUserId: '',
    deviceStatus: 'offline',
    isActive: false,
    effectiveFrom: '',
  },
  {
    id: 4,
    employeeCode: 'EMP004',
    employeeName: 'Emma Davis',
    photo: '',
    branch: 'Head Office',
    department: 'IT',
    deviceId: 'BD002',
    deviceName: 'Bio-Device-HQ-02',
    deviceUserId: '1002',
    deviceStatus: 'online',
    isActive: true,
    effectiveFrom: '2024-01-01',
  },
  {
    id: 5,
    employeeCode: 'EMP005',
    employeeName: 'Tom Brown',
    photo: '',
    branch: 'Site A',
    department: 'Tech',
    deviceId: 'BD003',
    deviceName: 'Bio-Device-SA-01',
    deviceUserId: '2002',
    deviceStatus: 'online',
    isActive: true,
    effectiveFrom: '2024-01-05',
  },
  {
    id: 6,
    employeeCode: 'EMP006',
    employeeName: 'Lisa Anderson',
    photo: '',
    branch: 'Head Office',
    department: 'Finance',
    deviceId: 'BD001',
    deviceName: 'Bio-Device-HQ-01',
    deviceUserId: '1003',
    deviceStatus: 'online',
    isActive: true,
    effectiveFrom: '2024-01-01',
  },
  {
    id: 7,
    employeeCode: 'EMP007',
    employeeName: 'David Miller',
    photo: '',
    branch: 'Site B',
    department: 'Operations',
    deviceId: '',
    deviceName: '--',
    deviceUserId: '',
    deviceStatus: 'offline',
    isActive: false,
    effectiveFrom: '',
  },
  {
    id: 8,
    employeeCode: 'EMP008',
    employeeName: 'Rachel Green',
    photo: '',
    branch: 'Head Office',
    department: 'Marketing',
    deviceId: 'BD002',
    deviceName: 'Bio-Device-HQ-02',
    deviceUserId: '1004',
    deviceStatus: 'online',
    isActive: true,
    effectiveFrom: '2024-01-01',
  },
];

export default function DeviceMappingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editData, setEditData] = useState<DeviceMapping | null>(null);

  // Calculate stats
  const totalEmployees = deviceMappings.length;
  const mappedCount = deviceMappings.filter(m => m.isActive && m.deviceId).length;
  const unmappedCount = totalEmployees - mappedCount;
  const devicesCount = new Set(deviceMappings.filter(m => m.deviceId).map(m => m.deviceId)).size;

  // Filter data
  const filteredData = deviceMappings.filter((mapping) => {
    const matchesSearch = 
      mapping.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || mapping.branch === branchFilter;
    const matchesDevice = deviceFilter === 'all' || mapping.deviceName.includes(deviceFilter);
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'mapped' && mapping.isActive && mapping.deviceId) ||
      (statusFilter === 'unmapped' && (!mapping.isActive || !mapping.deviceId));
    
    return matchesSearch && matchesBranch && matchesDevice && matchesStatus;
  });

  const handleEdit = (mapping: DeviceMapping) => {
    setEditData(mapping);
    setIsMappingModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this mapping?')) {
      alert(`✅ Deleting mapping ${id}...`);
    }
  };

  const handleAddNew = () => {
    setEditData(null);
    setIsMappingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Stats Cards - Solid Colors (Option 2) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total - Blue */}
        <Card className="bg-blue-500 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                <Link2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalEmployees}</p>
                <p className="text-xs text-blue-100">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mapped - Green */}
        <Card className="bg-green-500 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-600">
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
        <Card className="bg-red-500 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600">
                <XCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{unmappedCount}</p>
                <p className="text-xs text-red-100">Unmapped</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Devices - Purple */}
        <Card className="bg-purple-500 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-600">
                <Fingerprint className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{devicesCount}</p>
                <p className="text-xs text-purple-100">Devices</p>
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
              Device Mapping ({filteredData.length})
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

              <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="HQ-01">Bio-Device-HQ-01</SelectItem>
                  <SelectItem value="HQ-02">Bio-Device-HQ-02</SelectItem>
                  <SelectItem value="SA-01">Bio-Device-SA-01</SelectItem>
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
                  <TableHead className="min-w-[200px]">Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Device Name</TableHead>
                  <TableHead className="hidden lg:table-cell">Device User ID</TableHead>
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
                        <p className="text-muted-foreground">No mappings found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((mapping) => (
                    <TableRow key={mapping.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={mapping.photo} />
                            <AvatarFallback>
                              {mapping.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{mapping.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{mapping.employeeCode}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm">{mapping.branch}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {mapping.deviceId || '--'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {mapping.deviceStatus === 'online' ? (
                            <Wifi className="h-4 w-4 text-green-600" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-sm">{mapping.deviceName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm font-mono">{mapping.deviceUserId || '--'}</span>
                      </TableCell>
                      <TableCell>
                        {mapping.isActive && mapping.deviceId ? (
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
                            <DropdownMenuItem onClick={() => handleEdit(mapping)}>
                              <Edit className="h-4 w-4 mr-2" />
                              {mapping.deviceId ? 'Edit Mapping' : 'Add Mapping'}
                            </DropdownMenuItem>
                            {mapping.deviceId && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleDelete(mapping.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Mapping
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
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
        onSave={() => alert('✅ Mapping saved successfully!')}
        editData={editData}
      />

      <BulkImportModal 
        open={isBulkImportOpen}
        onOpenChange={setIsBulkImportOpen}
      />
    </div>
  );
}
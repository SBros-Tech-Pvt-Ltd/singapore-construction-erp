// app/admin/devices/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Fingerprint,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Wifi,
  WifiOff,
  Building2,
  Clock,
  Settings,
  AlertCircle,
  Activity,
  FileText,
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
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


import { SyncLogsModal } from '@/components/modal/sync-logs-modal';
// Device Add Modal Component
interface DeviceAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeviceAdded: () => void;
}

function DeviceAddModal({ open, onOpenChange, onDeviceAdded }: DeviceAddModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    deviceId: '',
    brand: 'ZKTeco',
    model: '',
    branch: '',
    ipAddress: '',
    port: '4370',
    location: '',
    serialNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeviceAdded();
    onOpenChange(false);
    // Reset form
    setFormData({
      name: '',
      deviceId: '',
      brand: 'ZKTeco',
      model: '',
      branch: '',
      ipAddress: '',
      port: '4370',
      location: '',
      serialNumber: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Device Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Bio-Device-HQ-01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Device ID</label>
              <Input
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                placeholder="BD001"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <Input
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="ZKTeco"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <Input
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="K40"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">IP Address</label>
              <Input
                value={formData.ipAddress}
                onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                placeholder="192.168.1.101"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Port</label>
              <Input
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                placeholder="4370"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Branch</label>
              <Input
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                placeholder="Head Office"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Main Entrance"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Serial Number</label>
              <Input
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                placeholder="ZK-K40-2024-001"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Device
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Mock Data - Biometric Devices
const biometricDevices = [
  {
    id: 1,
    name: 'Bio-Device-HQ-01',
    deviceId: 'BD001',
    brand: 'ZKTeco',
    model: 'K40',
    branch: 'Head Office',
    branchId: 1,
    ipAddress: '192.168.1.101',
    port: 4370,
    status: 'online',
    lastSync: '2024-01-20T14:30:00Z',
    syncFrequency: '15 mins',
    totalUsers: 45,
    todayAttendance: 42,
    shift: 'Day Shift',
    location: 'Main Entrance',
    serialNumber: 'ZK-K40-2024-001',
    firmwareVersion: 'v2.3.1',
    installedDate: '2024-01-01',
    batteryBackup: true,
    memoryUsage: 67
  },
  {
    id: 2,
    name: 'Bio-Device-HQ-02',
    deviceId: 'BD002',
    brand: 'ZKTeco',
    model: 'K40',
    branch: 'Head Office',
    branchId: 1,
    ipAddress: '192.168.1.102',
    port: 4370,
    status: 'online',
    lastSync: '2024-01-20T14:25:00Z',
    syncFrequency: '15 mins',
    totalUsers: 45,
    todayAttendance: 38,
    shift: 'Night Shift',
    location: 'Back Gate',
    serialNumber: 'ZK-K40-2024-002',
    firmwareVersion: 'v2.3.1',
    installedDate: '2024-01-01',
    batteryBackup: true,
    memoryUsage: 54
  },
  {
    id: 3,
    name: 'Bio-Device-SA-01',
    deviceId: 'BD003',
    brand: 'Suprema',
    model: 'BioStation 2',
    branch: 'Site A',
    branchId: 2,
    ipAddress: '192.168.2.101',
    port: 4370,
    status: 'online',
    lastSync: '2024-01-20T14:28:00Z',
    syncFrequency: '15 mins',
    totalUsers: 32,
    todayAttendance: 30,
    shift: 'Day Shift',
    location: 'Site Entrance',
    serialNumber: 'SUP-BS2-2024-001',
    firmwareVersion: 'v3.1.2',
    installedDate: '2024-01-05',
    batteryBackup: true,
    memoryUsage: 43
  },
  {
    id: 4,
    name: 'Bio-Device-SB-01',
    deviceId: 'BD004',
    brand: 'ZKTeco',
    model: 'K50',
    branch: 'Site B',
    branchId: 3,
    ipAddress: '192.168.3.101',
    port: 4370,
    status: 'offline',
    lastSync: '2024-01-20T10:15:00Z',
    syncFrequency: '15 mins',
    totalUsers: 28,
    todayAttendance: 0,
    shift: 'Day Shift',
    location: 'Office Block',
    serialNumber: 'ZK-K50-2024-001',
    firmwareVersion: 'v2.4.0',
    installedDate: '2024-01-08',
    batteryBackup: false,
    memoryUsage: 71
  },
  {
    id: 5,
    name: 'Bio-Device-SC-01',
    deviceId: 'BD005',
    brand: 'Anviz',
    model: 'M7',
    branch: 'Site C',
    branchId: 4,
    ipAddress: '192.168.4.101',
    port: 4370,
    status: 'warning',
    lastSync: '2024-01-20T13:45:00Z',
    syncFrequency: '15 mins',
    totalUsers: 22,
    todayAttendance: 18,
    shift: 'Day Shift',
    location: 'Security Gate',
    serialNumber: 'ANV-M7-2024-001',
    firmwareVersion: 'v1.9.5',
    installedDate: '2024-01-10',
    batteryBackup: true,
    memoryUsage: 89
  },
  {
    id: 6,
    name: 'Bio-Device-SD-01',
    deviceId: 'BD006',
    brand: 'ZKTeco',
    model: 'K40',
    branch: 'Site D',
    branchId: 5,
    ipAddress: '192.168.5.101',
    port: 4370,
    status: 'offline',
    lastSync: '2024-01-19T18:30:00Z',
    syncFrequency: '15 mins',
    totalUsers: 15,
    todayAttendance: 0,
    shift: 'Day Shift',
    location: 'Main Gate',
    serialNumber: 'ZK-K40-2024-006',
    firmwareVersion: 'v2.3.1',
    installedDate: '2024-01-12',
    batteryBackup: false,
    memoryUsage: 62
  }
];

export default function BiometricDevicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  const formatDistanceToNow = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Filter devices
  const filteredDevices = biometricDevices.filter((device) => {
    const matchesSearch = 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.includes(searchTerm) ||
      device.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || device.branch === branchFilter;
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchesBrand = brandFilter === 'all' || device.brand === brandFilter;
    
    return matchesSearch && matchesBranch && matchesStatus && matchesBrand;
  });

  const handleSyncDevice = (deviceId: number) => {
    alert(`Triggering sync for device ${deviceId}...`);
    // API call to trigger sync
  };

  const handleDeleteDevice = (deviceId: number) => {
    if (confirm('Are you sure you want to delete this device? This action cannot be undone.')) {
      alert(`Device ${deviceId} deleted`);
      // API call to delete device
    }
  };

  const handleDeviceAdded = () => {
    // Refresh the devices list or update state
    alert('Device added successfully! Refreshing list...');
    // You can refetch devices data here
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Devices Table Card - Everything integrated here */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg md:text-xl">
              Registered Devices ({filteredDevices.length})
            </CardTitle>
            <div className="flex gap-2">
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLogsModalOpen(true)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Sync Logs
              </Button>
              
              <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
          </div>

          {/* Filters and Search integrated in CardHeader */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search devices, IP, branch..." 
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
                  <SelectItem value="Site C">Site C</SelectItem>
                  <SelectItem value="Site D">Site D</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="ZKTeco">ZKTeco</SelectItem>
                  <SelectItem value="Suprema">Suprema</SelectItem>
                  <SelectItem value="Anviz">Anviz</SelectItem>
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
                  <TableHead className="min-w-[200px]">Device</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Users</TableHead>
                  <TableHead className="hidden xl:table-cell">Memory</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Sync</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Fingerprint className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No devices found</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsAddModalOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Device
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDevices.map((device) => (
                    <TableRow key={device.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            device.status === 'online' ? 'bg-green-100 dark:bg-green-900' :
                            device.status === 'warning' ? 'bg-orange-100 dark:bg-orange-900' :
                            'bg-red-100 dark:bg-red-900'
                          }`}>
                            <Fingerprint className={`h-5 w-5 ${
                              device.status === 'online' ? 'text-green-600 dark:text-green-400' :
                              device.status === 'warning' ? 'text-orange-600 dark:text-orange-400' :
                              'text-red-600 dark:text-red-400'
                            }`} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-foreground truncate">{device.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{device.deviceId}</Badge>
                              <span className="text-xs text-muted-foreground">{device.brand} {device.model}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{device.branch}</div>
                            <div className="text-xs text-muted-foreground">{device.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-mono text-foreground">{device.ipAddress}</div>
                          <div className="text-xs text-muted-foreground">Port: {device.port}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {device.status === 'online' ? (
                            <>
                              <Wifi className="h-4 w-4 text-green-600 dark:text-green-500" />
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                                Online
                              </Badge>
                            </>
                          ) : device.status === 'warning' ? (
                            <>
                              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-500" />
                              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                                Warning
                              </Badge>
                            </>
                          ) : (
                            <>
                              <WifiOff className="h-4 w-4 text-red-600 dark:text-red-500" />
                              <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800">
                                Offline
                              </Badge>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm">
                          <div className="font-medium text-foreground">{device.todayAttendance}/{device.totalUsers}</div>
                          <div className="text-xs text-muted-foreground">Present today</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Memory</span>
                            <span className="font-medium text-foreground">{device.memoryUsage}%</span>
                          </div>
                          <Progress value={device.memoryUsage} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">{formatDistanceToNow(device.lastSync)}</span>
                        </div>
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
                            <Link href={`/admin/devices/${device.id}`}>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSyncDevice(device.id)}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Sync Now
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteDevice(device.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Device
                            </DropdownMenuItem>
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
      <DeviceAddModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onDeviceAdded={handleDeviceAdded}
      />
      
      
      
      <SyncLogsModal 
        open={isLogsModalOpen}
        onOpenChange={setIsLogsModalOpen}
      />
    </div>
  );
}
// app/admin/devices/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Fingerprint,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Wifi,
  WifiOff,
  Building2,
  MapPin,
  Clock,
  Activity,
  Download,
  Settings,
  AlertCircle,
  CheckCircle,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

  // Calculate stats
  const stats = {
    totalDevices: biometricDevices.length,
    onlineDevices: biometricDevices.filter(d => d.status === 'online').length,
    offlineDevices: biometricDevices.filter(d => d.status === 'offline').length,
    warningDevices: biometricDevices.filter(d => d.status === 'warning').length,
    totalUsers: biometricDevices.reduce((sum, d) => sum + d.totalUsers, 0),
    todayAttendance: biometricDevices.reduce((sum, d) => sum + d.todayAttendance, 0)
  };

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

  const handleSyncAll = () => {
    alert('Syncing all devices...');
    // API call to sync all devices
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        

        {/* Stats Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Total Devices */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Total</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Fingerprint className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.totalDevices}</div>
              <p className="text-[10px] text-white/80 mt-1">Devices</p>
            </CardContent>
          </Card>

          {/* Online Devices */}
          <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Online</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Wifi className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.onlineDevices}</div>
              <p className="text-[10px] text-white/80 mt-1">Active</p>
            </CardContent>
          </Card>

          {/* Offline Devices */}
          <Card className="border-0 bg-gradient-to-br from-red-600 to-red-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Offline</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <WifiOff className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.offlineDevices}</div>
              <p className="text-[10px] text-white/80 mt-1">Down</p>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Warning</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.warningDevices}</div>
              <p className="text-[10px] text-white/80 mt-1">Issues</p>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Users</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.totalUsers}</div>
              <p className="text-[10px] text-white/80 mt-1">Enrolled</p>
            </CardContent>
          </Card>

          {/* Today's Attendance */}
          <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Today</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.todayAttendance}</div>
              <p className="text-[10px] text-white/80 mt-1">Present</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
          <Link href="/admin/devices/logs">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Sync Logs</p>
                    <p className="text-xs text-muted-foreground">View history</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/devices/status">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Device Status</p>
                    <p className="text-xs text-muted-foreground">Health check</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/devices/mapping">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Mapping</p>
                    <p className="text-xs text-muted-foreground">Branch & Shift</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary" onClick={handleSyncAll}>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Re-Sync All</p>
                  <p className="text-xs text-muted-foreground">Trigger now</p>
                </div>
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
                    placeholder="Search devices, IP, branch..." 
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
                  <SelectItem value="Head Office">Head Office</SelectItem>
                  <SelectItem value="Site A">Site A</SelectItem>
                  <SelectItem value="Site B">Site B</SelectItem>
                  <SelectItem value="Site C">Site C</SelectItem>
                  <SelectItem value="Site D">Site D</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
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
                <SelectTrigger className="w-full sm:w-[160px]">
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
          </CardContent>
        </Card>

        {/* Devices Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base md:text-lg">
                Registered Devices ({filteredDevices.length})
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Columns
              </Button>
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
                              <DropdownMenuItem>
                                <Settings className="h-4 w-4 mr-2" />
                                Configure
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
      </div>
    </div>
  );
}
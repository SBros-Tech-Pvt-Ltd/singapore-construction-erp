// app/admin/devices/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Fingerprint,
  Edit,
  Trash2,
  RefreshCw,
  Wifi,
  WifiOff,
  Building2,
  Users,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  Server,
  HardDrive,
  Cpu,
  Battery,
  BatteryCharging,
  Calendar,
  MapPin,
  Shield,
  Download,
  Settings,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock device data
const deviceData = {
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
  memoryUsage: 67,
  uptime: '15 days 6 hours',
  temperature: 42,
  lastRestart: '2024-01-05T10:00:00Z',
  autoSync: true,
  username: 'admin',
  macAddress: '00:17:61:12:34:56'
};

// Recent sync logs
const recentSyncLogs = [
  { id: 1, timestamp: '2024-01-20T14:30:00Z', status: 'success', records: 12, duration: '2.3s' },
  { id: 2, timestamp: '2024-01-20T14:15:00Z', status: 'success', records: 8, duration: '1.8s' },
  { id: 3, timestamp: '2024-01-20T14:00:00Z', status: 'success', records: 15, duration: '3.1s' },
  { id: 4, timestamp: '2024-01-20T13:45:00Z', status: 'success', records: 10, duration: '2.0s' },
  { id: 5, timestamp: '2024-01-20T13:30:00Z', status: 'failed', records: 0, duration: '0.5s', error: 'Connection timeout' },
];

// Enrolled users
const enrolledUsers = [
  { id: 1, name: 'John Doe', employeeId: 'EMP001', department: 'Engineering', enrolledDate: '2024-01-02', lastPunch: '2024-01-20T14:25:00Z', status: 'active' },
  { id: 2, name: 'Jane Smith', employeeId: 'EMP002', department: 'HR', enrolledDate: '2024-01-02', lastPunch: '2024-01-20T14:10:00Z', status: 'active' },
  { id: 3, name: 'Mike Johnson', employeeId: 'EMP003', department: 'Sales', enrolledDate: '2024-01-03', lastPunch: '2024-01-20T13:55:00Z', status: 'active' },
  { id: 4, name: 'Sarah Williams', employeeId: 'EMP004', department: 'Marketing', enrolledDate: '2024-01-03', lastPunch: '2024-01-20T13:40:00Z', status: 'active' },
  { id: 5, name: 'Robert Brown', employeeId: 'EMP005', department: 'Finance', enrolledDate: '2024-01-04', lastPunch: '2024-01-19T17:30:00Z', status: 'active' },
];

// Daily attendance data (last 7 days)
const dailyAttendanceData = [
  { date: 'Mon', present: 42, absent: 3 },
  { date: 'Tue', present: 43, absent: 2 },
  { date: 'Wed', present: 41, absent: 4 },
  { date: 'Thu', present: 44, absent: 1 },
  { date: 'Fri', present: 42, absent: 3 },
  { date: 'Sat', present: 40, absent: 5 },
  { date: 'Sun', present: 38, absent: 7 },
];

// Hourly sync data (last 24 hours)
const hourlySyncData = [
  { hour: '00:00', records: 0 },
  { hour: '04:00', records: 0 },
  { hour: '08:00', records: 35 },
  { hour: '09:00', records: 8 },
  { hour: '10:00', records: 5 },
  { hour: '12:00', records: 42 },
  { hour: '13:00', records: 12 },
  { hour: '14:00', records: 10 },
  { hour: '17:00', records: 38 },
  { hour: '18:00', records: 7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-semibold mb-2 text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {entry.name}: <strong className="text-foreground">{entry.value}</strong>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DeviceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [isSyncing, setIsSyncing] = useState(false);

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

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('✅ Sync completed successfully!');
    } catch (error) {
      alert('❌ Sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this device? This action cannot be undone.')) {
      alert('Device deleted');
      router.push('/admin/devices');
    }
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
              {deviceData.name}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {deviceData.brand} {deviceData.model} • {deviceData.deviceId}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Status Alert */}
        {deviceData.status === 'online' ? (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Device Online:</strong> Connected and operational. Last sync {formatDistanceToNow(deviceData.lastSync)}.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Device Offline:</strong> Unable to connect. Check network configuration and device power.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Status */}
          <Card className={`border-0 ${
            deviceData.status === 'online' 
              ? 'bg-gradient-to-br from-emerald-600 to-emerald-800' 
              : 'bg-gradient-to-br from-red-600 to-red-800'
          } shadow-lg`}>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Status</p>
                {deviceData.status === 'online' ? (
                  <Wifi className="h-4 w-4 text-white" />
                ) : (
                  <WifiOff className="h-4 w-4 text-white" />
                )}
              </div>
              <p className="text-xl md:text-2xl font-bold text-white capitalize">{deviceData.status}</p>
            </CardContent>
          </Card>

          {/* Enrolled Users */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Users</p>
                <Users className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{deviceData.totalUsers}</p>
            </CardContent>
          </Card>

          {/* Today's Attendance */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Today</p>
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{deviceData.todayAttendance}</p>
            </CardContent>
          </Card>

          {/* Memory Usage */}
          <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Memory</p>
                <HardDrive className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{deviceData.memoryUsage}%</p>
            </CardContent>
          </Card>

          {/* Uptime */}
          <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Uptime</p>
                <Activity className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm md:text-base font-bold text-white">{deviceData.uptime}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Enrolled Users</TabsTrigger>
            <TabsTrigger value="sync">Sync Logs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Device Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Device Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Device Name</span>
                    <span className="text-sm font-medium text-foreground">{deviceData.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Device ID</span>
                    <Badge variant="outline">{deviceData.deviceId}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Brand & Model</span>
                    <span className="text-sm font-medium text-foreground">{deviceData.brand} {deviceData.model}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Serial Number</span>
                    <span className="text-sm font-mono text-foreground">{deviceData.serialNumber}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Firmware Version</span>
                    <span className="text-sm font-medium text-foreground">{deviceData.firmwareVersion}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">MAC Address</span>
                    <span className="text-sm font-mono text-foreground">{deviceData.macAddress}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Installed Date</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date(deviceData.installedDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Location & Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Branch</span>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{deviceData.branch}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Physical Location</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{deviceData.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Default Shift</span>
                    <Badge variant="secondary">{deviceData.shift}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Battery Backup</span>
                    {deviceData.batteryBackup ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                        <BatteryCharging className="h-4 w-4" />
                        <span className="text-sm font-medium">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
                        <Battery className="h-4 w-4" />
                        <span className="text-sm font-medium">Not Available</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Temperature</span>
                    <span className="text-sm font-medium text-foreground">{deviceData.temperature}°C</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Network Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Network Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">IP Address</span>
                    <span className="text-sm font-mono font-medium text-foreground">{deviceData.ipAddress}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Port</span>
                    <span className="text-sm font-mono font-medium text-foreground">{deviceData.port}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Username</span>
                    <span className="text-sm font-medium text-foreground">{deviceData.username}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Connection Status</span>
                    <Badge className={
                      deviceData.status === 'online' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }>
                      {deviceData.status === 'online' ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Sync Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Sync Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Sync Frequency</span>
                    <span className="text-sm font-medium text-foreground">{deviceData.syncFrequency}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Auto Sync</span>
                    <Badge variant={deviceData.autoSync ? "default" : "secondary"}>
                      {deviceData.autoSync ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Last Sync</span>
                    <span className="text-sm font-medium text-foreground">
                      {formatDistanceToNow(deviceData.lastSync)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Last Restart</span>
                    <span className="text-sm font-medium text-foreground">
                      {formatDistanceToNow(deviceData.lastRestart)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Memory Usage</span>
                      <span className="text-sm font-medium text-foreground">{deviceData.memoryUsage}%</span>
                    </div>
                    <Progress value={deviceData.memoryUsage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {deviceData.memoryUsage < 80 ? 'Normal' : 'High Usage'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">CPU Usage</span>
                      <span className="text-sm font-medium text-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-muted-foreground">Normal</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Network Signal</span>
                      <span className="text-sm font-medium text-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground">Excellent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrolled Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base md:text-lg">Enrolled Users ({enrolledUsers.length})</CardTitle>
                    <CardDescription>Users registered on this device</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Enrolled Date</TableHead>
                        <TableHead>Last Punch</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrolledUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.employeeId}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.department}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {new Date(user.enrolledDate).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {formatDistanceToNow(user.lastPunch)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync Logs Tab */}
          <TabsContent value="sync" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base md:text-lg">Recent Sync Logs</CardTitle>
                    <CardDescription>Last 5 synchronization attempts</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All Logs
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Records</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSyncLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">
                                {new Date(log.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {log.status === 'success' ? (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Success
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium text-foreground">{log.records}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{log.duration}</span>
                          </TableCell>
                          <TableCell>
                            {log.error ? (
                              <span className="text-sm text-destructive">{log.error}</span>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Daily Attendance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Daily Attendance (Last 7 Days)</CardTitle>
                  <CardDescription>Present vs Absent employees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
                        <Bar dataKey="present" fill="#10b981" name="Present" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Hourly Sync Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Hourly Sync Activity</CardTitle>
                  <CardDescription>Records synced per hour (Last 24 hours)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlySyncData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                        <XAxis 
                          dataKey="hour" 
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="records" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          name="Records"
                          dot={{ fill: '#3b82f6', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Sync Success Rate</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">98.5%</p>
                    <Progress value={98.5} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Response Time</span>
                      <Activity className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">2.3s</p>
                    <p className="text-xs text-muted-foreground">Excellent</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Uptime</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">99.9%</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Records/Day</span>
                      <BarChart className="h-4 w-4 text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Device Settings</CardTitle>
                <CardDescription>Configure device parameters and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Note:</strong> Changes to device settings will take effect after the next sync cycle.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Network Settings
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Adjust Sync Frequency
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Update Location & Branch
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Authentication
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restart Device
                  </Button>

                  <Button variant="outline" className="w-full justify-start text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Factory Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
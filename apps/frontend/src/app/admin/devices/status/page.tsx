// app/admin/devices/status/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Wifi,
  WifiOff,
  AlertCircle,
  Activity,
  RefreshCw,
  Download,
  Server,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock real-time device status data
const deviceStatusData = [
  {
    id: 1,
    deviceId: 'BD001',
    name: 'Bio-Device-HQ-01',
    branch: 'Head Office',
    status: 'online',
    uptime: '99.9%',
    responseTime: '1.8s',
    lastHeartbeat: '2024-01-20T14:30:00Z',
    memoryUsage: 67,
    cpuUsage: 45,
    networkSignal: 92,
    temperature: 42,
    errors: 0,
    warnings: 1
  },
  {
    id: 2,
    deviceId: 'BD002',
    name: 'Bio-Device-HQ-02',
    branch: 'Head Office',
    status: 'online',
    uptime: '99.8%',
    responseTime: '2.1s',
    lastHeartbeat: '2024-01-20T14:29:00Z',
    memoryUsage: 54,
    cpuUsage: 38,
    networkSignal: 88,
    temperature: 40,
    errors: 0,
    warnings: 0
  },
  {
    id: 3,
    deviceId: 'BD003',
    name: 'Bio-Device-SA-01',
    branch: 'Site A',
    status: 'online',
    uptime: '98.5%',
    responseTime: '2.5s',
    lastHeartbeat: '2024-01-20T14:28:00Z',
    memoryUsage: 43,
    cpuUsage: 52,
    networkSignal: 85,
    temperature: 38,
    errors: 0,
    warnings: 2
  },
  {
    id: 4,
    deviceId: 'BD004',
    name: 'Bio-Device-SB-01',
    branch: 'Site B',
    status: 'offline',
    uptime: '0%',
    responseTime: '-',
    lastHeartbeat: '2024-01-20T10:15:00Z',
    memoryUsage: 0,
    cpuUsage: 0,
    networkSignal: 0,
    temperature: 0,
    errors: 5,
    warnings: 0
  },
  {
    id: 5,
    deviceId: 'BD005',
    name: 'Bio-Device-SC-01',
    branch: 'Site C',
    status: 'warning',
    uptime: '95.2%',
    responseTime: '4.8s',
    lastHeartbeat: '2024-01-20T14:25:00Z',
    memoryUsage: 89,
    cpuUsage: 78,
    networkSignal: 65,
    temperature: 52,
    errors: 1,
    warnings: 4
  },
  {
    id: 6,
    deviceId: 'BD006',
    name: 'Bio-Device-SD-01',
    branch: 'Site D',
    status: 'offline',
    uptime: '0%',
    responseTime: '-',
    lastHeartbeat: '2024-01-19T18:30:00Z',
    memoryUsage: 0,
    cpuUsage: 0,
    networkSignal: 0,
    temperature: 0,
    errors: 3,
    warnings: 0
  }
];

export default function DeviceStatusPage() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Calculate stats
  const stats = {
    total: deviceStatusData.length,
    online: deviceStatusData.filter(d => d.status === 'online').length,
    offline: deviceStatusData.filter(d => d.status === 'offline').length,
    warning: deviceStatusData.filter(d => d.status === 'warning').length,
    avgUptime: (deviceStatusData.reduce((sum, d) => sum + parseFloat(d.uptime), 0) / deviceStatusData.length).toFixed(1),
    totalErrors: deviceStatusData.reduce((sum, d) => sum + d.errors, 0),
    totalWarnings: deviceStatusData.reduce((sum, d) => sum + d.warnings, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        

        {/* Overall Stats */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {/* Total Devices */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Total</p>
                <Server className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.total}</p>
            </CardContent>
          </Card>

          {/* Online */}
          <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Online</p>
                <Wifi className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.online}</p>
            </CardContent>
          </Card>

          {/* Offline */}
          <Card className="border-0 bg-gradient-to-br from-red-600 to-red-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Offline</p>
                <WifiOff className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.offline}</p>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Warning</p>
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.warning}</p>
            </CardContent>
          </Card>

          {/* Avg Uptime */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Avg Uptime</p>
                <Activity className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.avgUptime}%</p>
            </CardContent>
          </Card>

          {/* Errors */}
          <Card className="border-0 bg-gradient-to-br from-rose-600 to-rose-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Errors</p>
                <XCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.totalErrors}</p>
            </CardContent>
          </Card>

          {/* Warnings */}
          <Card className="border-0 bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white">Warnings</p>
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-white">{stats.totalWarnings}</p>
            </CardContent>
          </Card>
        </div>

        {/* System Health Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">System Health Overview</CardTitle>
            <CardDescription>Real-time performance metrics for all devices</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Uptime</TableHead>
                    <TableHead className="hidden lg:table-cell">Response</TableHead>
                    <TableHead className="hidden xl:table-cell">Memory</TableHead>
                    <TableHead className="hidden xl:table-cell">CPU</TableHead>
                    <TableHead className="hidden 2xl:table-cell">Signal</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Heartbeat</TableHead>
                    <TableHead>Health</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deviceStatusData.map((device) => (
                    <TableRow key={device.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{device.name}</div>
                          <div className="text-sm text-muted-foreground">{device.branch}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {device.status === 'online' ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              Online
                            </Badge>
                          </div>
                        ) : device.status === 'warning' ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                              Warning
                            </Badge>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <Badge variant="destructive">
                              Offline
                            </Badge>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm font-medium text-foreground">{device.uptime}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">{device.responseTime}</span>
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
                      <TableCell className="hidden xl:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">CPU</span>
                            <span className="font-medium text-foreground">{device.cpuUsage}%</span>
                          </div>
                          <Progress value={device.cpuUsage} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden 2xl:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Signal</span>
                            <span className="font-medium text-foreground">{device.networkSignal}%</span>
                          </div>
                          <Progress value={device.networkSignal} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(device.lastHeartbeat)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {device.errors > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {device.errors} errors
                            </Badge>
                          )}
                          {device.warnings > 0 && (
                            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs">
                              {device.warnings} warnings
                            </Badge>
                          )}
                          {device.errors === 0 && device.warnings === 0 && device.status === 'online' && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Healthy
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Health Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deviceStatusData.map((device) => (
            <Card key={device.id} className={`border-2 ${
              device.status === 'online' ? 'border-green-200 dark:border-green-800' :
              device.status === 'warning' ? 'border-orange-200 dark:border-orange-800' :
              'border-red-200 dark:border-red-800'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{device.name}</CardTitle>
                    <CardDescription className="text-xs">{device.branch}</CardDescription>
                  </div>
                  {device.status === 'online' ? (
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  ) : device.status === 'warning' ? (
                    <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                    <p className="text-sm font-semibold text-foreground">{device.uptime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Response</p>
                    <p className="text-sm font-semibold text-foreground">{device.responseTime}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Memory</span>
                      <span className="font-medium text-foreground">{device.memoryUsage}%</span>
                    </div>
                    <Progress value={device.memoryUsage} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">CPU</span>
                      <span className="font-medium text-foreground">{device.cpuUsage}%</span>
                    </div>
                    <Progress value={device.cpuUsage} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Network Signal</span>
                      <span className="font-medium text-foreground">{device.networkSignal}%</span>
                    </div>
                    <Progress value={device.networkSignal} className="h-1.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(device.lastHeartbeat)}</span>
                  </div>
                  <div className="flex gap-1">
                    {device.errors > 0 && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                        {device.errors} errors
                      </Badge>
                    )}
                    {device.warnings > 0 && (
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-[10px] px-1.5 py-0.5">
                        {device.warnings} warnings
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Simplified device status data
const deviceStatusData = [
  {
    id: 1,
    deviceId: 'BD001',
    name: 'Bio-Device-HQ-01',
    branch: 'Head Office',
    status: 'online',
    lastHeartbeat: '2024-01-20T14:30:00Z',
  },
  {
    id: 2,
    deviceId: 'BD002',
    name: 'Bio-Device-HQ-02',
    branch: 'Head Office',
    status: 'online',
    lastHeartbeat: '2024-01-20T14:29:00Z',
  },
  {
    id: 3,
    deviceId: 'BD003',
    name: 'Bio-Device-SA-01',
    branch: 'Site A',
    status: 'online',
    lastHeartbeat: '2024-01-20T14:28:00Z',
  },
  {
    id: 4,
    deviceId: 'BD004',
    name: 'Bio-Device-SB-01',
    branch: 'Site B',
    status: 'offline',
    lastHeartbeat: '2024-01-20T10:15:00Z',
  },
  {
    id: 5,
    deviceId: 'BD005',
    name: 'Bio-Device-SC-01',
    branch: 'Site C',
    status: 'offline',
    lastHeartbeat: '2024-01-20T14:25:00Z',
  },
  {
    id: 6,
    deviceId: 'BD006',
    name: 'Bio-Device-SD-01',
    branch: 'Site D',
    status: 'offline',
    lastHeartbeat: '2024-01-19T18:30:00Z',
  }
];

interface DeviceStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceStatusModal({ open, onOpenChange }: DeviceStatusModalProps) {
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

  // Calculate simple stats
  const stats = {
    total: deviceStatusData.length,
    online: deviceStatusData.filter(d => d.status === 'online').length,
    offline: deviceStatusData.filter(d => d.status === 'offline').length,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Device Status Overview</span>
            <Button onClick={handleRefresh} disabled={isRefreshing} size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Simple Stats */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Devices</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Online</p>
                    <p className="text-2xl font-bold text-green-600">{stats.online}</p>
                  </div>
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Offline</p>
                    <p className="text-2xl font-bold text-red-600">{stats.offline}</p>
                  </div>
                  <div className="h-10 w-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <WifiOff className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Status Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device Name</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Heartbeat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceStatusData.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.name}</TableCell>
                        <TableCell>{device.branch}</TableCell>
                        <TableCell>
                          {device.status === 'online' ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2" />
                              Online
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                              Offline
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDistanceToNow(device.lastHeartbeat)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
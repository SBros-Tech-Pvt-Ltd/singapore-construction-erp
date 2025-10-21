// components/sync-logs-modal.tsx
'use client';

import { useState } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Activity,
  FileText,
  TrendingUp
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock sync logs data
const syncLogs = [
  {
    id: 1,
    deviceId: 'BD001',
    deviceName: 'Bio-Device-HQ-01',
    branch: 'Head Office',
    timestamp: '2024-01-20T14:30:00Z',
    status: 'success',
    records: 12,
    duration: '2.3s',
    syncType: 'auto',
    error: null
  },
  {
    id: 2,
    deviceId: 'BD002',
    deviceName: 'Bio-Device-HQ-02',
    branch: 'Head Office',
    timestamp: '2024-01-20T14:28:00Z',
    status: 'success',
    records: 8,
    duration: '1.8s',
    syncType: 'auto',
    error: null
  },
  {
    id: 3,
    deviceId: 'BD003',
    deviceName: 'Bio-Device-SA-01',
    branch: 'Site A',
    timestamp: '2024-01-20T14:25:00Z',
    status: 'success',
    records: 15,
    duration: '3.1s',
    syncType: 'manual',
    error: null
  },
  {
    id: 4,
    deviceId: 'BD004',
    deviceName: 'Bio-Device-SB-01',
    branch: 'Site B',
    timestamp: '2024-01-20T14:20:00Z',
    status: 'failed',
    records: 0,
    duration: '0.5s',
    syncType: 'auto',
    error: 'Connection timeout - Device unreachable'
  },
  {
    id: 5,
    deviceId: 'BD001',
    deviceName: 'Bio-Device-HQ-01',
    branch: 'Head Office',
    timestamp: '2024-01-20T14:15:00Z',
    status: 'success',
    records: 10,
    duration: '2.0s',
    syncType: 'auto',
    error: null
  },
  {
    id: 6,
    deviceId: 'BD005',
    deviceName: 'Bio-Device-SC-01',
    branch: 'Site C',
    timestamp: '2024-01-20T14:10:00Z',
    status: 'warning',
    records: 7,
    duration: '5.2s',
    syncType: 'auto',
    error: 'Slow response time detected'
  }
];

// Sync trend data (last 24 hours)
const syncTrendData = [
  { hour: '00:00', success: 24, failed: 0 },
  { hour: '02:00', success: 24, failed: 0 },
  { hour: '04:00', success: 24, failed: 0 },
  { hour: '06:00', success: 24, failed: 0 },
  { hour: '08:00', success: 23, failed: 1 },
  { hour: '10:00', success: 24, failed: 0 },
  { hour: '12:00', success: 24, failed: 0 },
  { hour: '14:00', success: 22, failed: 2 },
  { hour: '16:00', success: 24, failed: 0 },
  { hour: '18:00', success: 24, failed: 0 },
  { hour: '20:00', success: 24, failed: 0 },
  { hour: '22:00', success: 24, failed: 0 }
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

interface SyncLogsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SyncLogsModal({ open, onOpenChange }: SyncLogsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [syncTypeFilter, setSyncTypeFilter] = useState('all');

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

  // Filter logs
  const filteredLogs = syncLogs.filter((log) => {
    const matchesSearch = 
      log.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesBranch = branchFilter === 'all' || log.branch === branchFilter;
    const matchesSyncType = syncTypeFilter === 'all' || log.syncType === syncTypeFilter;
    
    return matchesSearch && matchesStatus && matchesBranch && matchesSyncType;
  });

  // Calculate stats
  const stats = {
    totalSyncs: syncLogs.length,
    successfulSyncs: syncLogs.filter(l => l.status === 'success').length,
    failedSyncs: syncLogs.filter(l => l.status === 'failed').length,
    warningSyncs: syncLogs.filter(l => l.status === 'warning').length,
    totalRecords: syncLogs.reduce((sum, l) => sum + l.records, 0),
    successRate: ((syncLogs.filter(l => l.status === 'success').length / syncLogs.length) * 100).toFixed(1)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sync Logs & Analytics</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {/* Total Syncs */}
            <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-white">Total Syncs</p>
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">{stats.totalSyncs}</p>
              </CardContent>
            </Card>

            {/* Successful */}
            <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-white">Successful</p>
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">{stats.successfulSyncs}</p>
              </CardContent>
            </Card>

            {/* Failed */}
            <Card className="border-0 bg-gradient-to-br from-red-600 to-red-800 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-white">Failed</p>
                  <XCircle className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">{stats.failedSyncs}</p>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-white">Warnings</p>
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">{stats.warningSyncs}</p>
              </CardContent>
            </Card>

            {/* Records Synced */}
            <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-white">Records</p>
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">{stats.totalRecords}</p>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-white">Success Rate</p>
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">{stats.successRate}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Sync Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Sync Activity Trend (Last 24 Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={syncTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                    <XAxis 
                      dataKey="hour" 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="success" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Success"
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="failed" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Failed"
                      dot={{ fill: '#ef4444', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

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
                      placeholder="Search device, branch..." 
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select value={syncTypeFilter} onValueChange={setSyncTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="auto">Auto Sync</SelectItem>
                    <SelectItem value="manual">Manual Sync</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sync Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Sync History ({filteredLogs.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Device</TableHead>
                      <TableHead className="hidden md:table-cell">Branch</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Records</TableHead>
                      <TableHead className="hidden lg:table-cell">Duration</TableHead>
                      <TableHead className="hidden xl:table-cell">Type</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center py-8">
                            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No sync logs found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id} className="hover:bg-accent/50">
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{log.deviceName}</div>
                              <div className="text-sm text-muted-foreground">{log.deviceId}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{log.branch}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="text-foreground">{new Date(log.timestamp).toLocaleTimeString()}</div>
                              <div className="text-muted-foreground">{formatDistanceToNow(log.timestamp)}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {log.status === 'success' ? (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Success
                              </Badge>
                            ) : log.status === 'warning' ? (
                              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Warning
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm font-medium text-foreground">{log.records}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm text-muted-foreground">{log.duration}</span>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">
                            <Badge variant={log.syncType === 'manual' ? 'default' : 'secondary'}>
                              {log.syncType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {log.error ? (
                              <span className="text-xs text-destructive">{log.error}</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
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
      </DialogContent>
    </Dialog>
  );
}
// app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import {
  Building2,
  Users,
  Fingerprint,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Calendar,
  BarChart3,
  UserCheck,
  UserX,
  Shield,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock Data
const dashboardStats = {
  totalBranches: 5,
  activeUsers: 48,
  activeDevices: 12,
  pendingApprovals: 3,
  lastSync: '2024-01-20T14:30:00Z',
  deviceStatus: {
    online: 10,
    offline: 2
  },
  userGrowth: 12.5
};

// Branch-wise login activity
const branchLoginData = [
  { branch: 'Head Office', logins: 145, users: 15 },
  { branch: 'Site A', logins: 98, users: 12 },
  { branch: 'Site B', logins: 76, users: 10 },
  { branch: 'Site C', logins: 54, users: 8 },
  { branch: 'Site D', logins: 32, users: 3 },
];

// Device connectivity chart
const deviceConnectivityData = [
  { date: 'Mon', online: 12, offline: 0 },
  { date: 'Tue', online: 11, offline: 1 },
  { date: 'Wed', online: 12, offline: 0 },
  { date: 'Thu', online: 10, offline: 2 },
  { date: 'Fri', online: 12, offline: 0 },
  { date: 'Sat', online: 12, offline: 0 },
  { date: 'Sun', online: 10, offline: 2 },
];



// Recent activities
const recentActivities = [
  { id: 1, user: 'Sarah Connor', action: 'Added new user', branch: 'Site A', time: '2 hours ago', type: 'user' },
  { id: 2, user: 'System', action: 'Device sync completed', branch: 'Head Office', time: '3 hours ago', type: 'sync' },
  { id: 3, user: 'John Smith', action: 'Updated branch settings', branch: 'Site B', time: '5 hours ago', type: 'settings' },
  { id: 4, user: 'System', action: 'Device offline alert', branch: 'Site C', time: '1 day ago', type: 'alert' },
  { id: 5, user: 'Mike Johnson', action: 'Created new role', branch: 'Head Office', time: '1 day ago', type: 'role' },
];

// Device status details
const deviceStatusData = [
  { name: 'Online', value: 10, color: '#10b981' },
  { name: 'Offline', value: 2, color: '#ef4444' },
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

export default function AdminDashboard() {
  const formatDistanceToNow = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        

        {/* Stats Cards - Dark Gradient Design */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Card 1: Total Branches - Blue */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Total Branches</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.totalBranches}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Locations
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Active Users - Green */}
          <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Active Users</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.activeUsers}</div>
              <div className="flex items-center text-[10px] text-white/90 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.userGrowth}%
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Active Devices - Purple */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Active Devices</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Fingerprint className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.activeDevices}</div>
              <p className="text-[10px] text-white/80 mt-1">
                {dashboardStats.deviceStatus.online} online
              </p>
            </CardContent>
          </Card>

          {/* Card 4: Pending Approvals - Orange */}
          <Card className="border-0 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg hover:shadow-xl transition-all">

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Pending</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.pendingApprovals}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Approvals
              </p>
            </CardContent>
          </Card>

          {/* Card 5: Last Sync - Cyan */}
          <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Last Sync</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs md:text-sm font-bold text-white">
                {formatDistanceToNow(dashboardStats.lastSync)}
              </div>
              <p className="text-[10px] text-white/80 mt-1">
                Biometric data
              </p>
            </CardContent>
          </Card>
        </div>

        

        {/* Branch Activity & Recent Activities */}
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          {/* Branch-wise Login Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-foreground">
                Branch-wise Login Activity
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                Login statistics per branch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {branchLoginData.map((branch, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {branch.branch}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {branch.users} users
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {branch.logins} logins
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={(branch.logins / 150) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-foreground">
                Recent Activities
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                Latest actions across all branches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      activity.type === 'user' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500' :
                      activity.type === 'sync' ? 'bg-green-500/10 text-green-600 dark:text-green-500' :
                      activity.type === 'settings' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-500' :
                      activity.type === 'alert' ? 'bg-red-500/10 text-red-600 dark:text-red-500' :
                      'bg-amber-500/10 text-amber-600 dark:text-amber-500'
                    }`}>
                      {activity.type === 'user' && <UserCheck className="h-4 w-4" />}
                      {activity.type === 'sync' && <Activity className="h-4 w-4" />}
                      {activity.type === 'settings' && <Settings className="h-4 w-4" />}
                      {activity.type === 'alert' && <AlertCircle className="h-4 w-4" />}
                      {activity.type === 'role' && <Shield className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          {activity.user}
                        </p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                          {activity.branch}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Status & Quick Actions */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {/* Device Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-foreground">
                Device Status
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                Current biometric device health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => `${entry.value}`}
                    >
                      {deviceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Online ({deviceStatusData[0].value})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-muted-foreground">Offline ({deviceStatusData[1].value})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-foreground">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col items-start p-4">
                  <Users className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">Add User</span>
                  <span className="text-xs text-muted-foreground mt-1">Create new employee</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start p-4">
                  <Building2 className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">Add Branch</span>
                  <span className="text-xs text-muted-foreground mt-1">New location</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start p-4">
                  <Fingerprint className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">Add Device</span>
                  <span className="text-xs text-muted-foreground mt-1">Register biometric</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start p-4">
                  <BarChart3 className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">View Reports</span>
                  <span className="text-xs text-muted-foreground mt-1">Analytics & logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row - 2 Charts Side by Side */}
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
         

          {/* Device Connectivity Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base md:text-lg text-foreground">
                    Device Connectivity
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground">
                    Weekly device status overview
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1 text-green-500" />
                    {dashboardStats.deviceStatus.online}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <WifiOff className="h-3 w-3 mr-1 text-red-500" />
                    {dashboardStats.deviceStatus.offline}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={deviceConnectivityData}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      className="stroke-border"
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: '10px',
                        fontSize: '11px',
                      }}
                    />
                    <Bar 
                      dataKey="online" 
                      fill="#10b981" 
                      name="Online"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="offline" 
                      fill="#ef4444" 
                      name="Offline"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Pending Approvals */}
        {dashboardStats.pendingApprovals > 0 && (
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                  <CardTitle className="text-base md:text-lg text-orange-900 dark:text-orange-100">
                    Pending Approvals ({dashboardStats.pendingApprovals})
                  </CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">New User Request</p>
                      <p className="text-xs text-muted-foreground">Michael Chen - Site B</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Approve
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Role Change Request</p>
                      <p className="text-xs text-muted-foreground">Emma Wilson - HR Manager</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>

        
      </div>
    </div>
  );
}
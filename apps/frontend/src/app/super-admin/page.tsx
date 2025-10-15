'use client';

import { useState } from 'react';
import {
  Building,
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  UserPlus,
  UserMinus,
  ArrowUpRight,
  ArrowDownRight,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

// Mock Data
const dashboardStats = {
  totalTenants: 156,
  totalSubCompanies: 428,
  activeSubscriptions: 142,
  totalActiveUsers: 3847,
  pendingPayments: 12,
  monthlyRevenue: 187650,
  revenueGrowth: 12.5,
  newTenantsThisMonth: 18,
  cancelledThisMonth: 3
};

// Monthly trend data for multi-line chart
const monthlyTrendData = [
  { month: 'Jan', new: 12, cancelled: 2, net: 10 },
  { month: 'Feb', new: 15, cancelled: 3, net: 12 },
  { month: 'Mar', new: 10, cancelled: 1, net: 9 },
  { month: 'Apr', new: 18, cancelled: 4, net: 14 },
  { month: 'May', new: 22, cancelled: 2, net: 20 },
  { month: 'Jun', new: 18, cancelled: 3, net: 15 },
];

// Top 5 tenants for pie chart
const topTenantsChartData = [
  { name: 'Enterprise Corp', value: 15588, color: '#3b82f6', percentage: 15.6 },
  { name: 'Global Solutions', value: 14327, color: '#8b5cf6', percentage: 14.3 },
  { name: 'Tech Giants', value: 12996, color: '#ec4899', percentage: 13.0 },
  { name: 'Manufacturing Hub', value: 11205, color: '#f59e0b', percentage: 11.2 },
  { name: 'Others', value: 45884, color: '#6b7280', percentage: 45.9 }
];

const recentActivities = [
  { id: 1, company: 'Tech Solutions Pte Ltd', action: 'Upgraded to Enterprise', time: '2 hours ago', type: 'upgrade' },
  { id: 2, company: 'Digital Marketing Co', action: 'Payment received', time: '5 hours ago', type: 'payment' },
  { id: 3, company: 'Retail Hub Singapore', action: 'New registration', time: '1 day ago', type: 'new' },
  { id: 4, company: 'Finance Pro Services', action: 'Subscription renewed', time: '1 day ago', type: 'renewal' },
  { id: 5, company: 'Healthcare Plus', action: 'Payment failed', time: '2 days ago', type: 'failed' }
];

const lowEmployeeTenants = [
  { id: 1, name: 'StartUp Tech', employees: 3, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 2, name: 'Boutique Consulting', employees: 5, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 3, name: 'Design Studio', employees: 7, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 4, name: 'Legal Associates', employees: 4, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 5, name: 'Marketing Agency', employees: 8, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 6, name: 'Property Solutions', employees: 6, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 7, name: 'Event Planners', employees: 5, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 8, name: 'Tech Advisors', employees: 9, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 9, name: 'Creative Works', employees: 4, maxEmployees: 50, plan: 'Starter', status: 'active' },
  { id: 10, name: 'Business Partners', employees: 7, maxEmployees: 50, plan: 'Starter', status: 'active' }
];

const topPayingTenants = [
  { id: 1, name: 'Enterprise Corp Pte Ltd', revenue: 15588, plan: 'Enterprise', employees: 450, trend: 'up' },
  { id: 2, name: 'Global Solutions Group', revenue: 14327, plan: 'Enterprise', employees: 380, trend: 'up' },
  { id: 3, name: 'Tech Giants Singapore', revenue: 12996, plan: 'Enterprise', employees: 520, trend: 'stable' },
  { id: 4, name: 'Manufacturing Hub', revenue: 11205, plan: 'Professional', employees: 290, trend: 'up' },
  { id: 5, name: 'Retail Chain Co', revenue: 10872, plan: 'Professional', employees: 340, trend: 'down' },
  { id: 6, name: 'Financial Services Ltd', revenue: 9876, plan: 'Professional', employees: 185, trend: 'up' },
  { id: 7, name: 'Healthcare Network', revenue: 8954, plan: 'Professional', employees: 220, trend: 'stable' },
  { id: 8, name: 'Logistics Express', revenue: 8234, plan: 'Professional', employees: 198, trend: 'up' },
  { id: 9, name: 'Education Institute', revenue: 7821, plan: 'Professional', employees: 167, trend: 'stable' },
  { id: 10, name: 'Hospitality Group', revenue: 7456, plan: 'Professional', employees: 245, trend: 'down' }
];

const regionData = [
  { region: 'Singapore', subscriptions: 89, growth: 15 },
  { region: 'Malaysia', subscriptions: 34, growth: 8 },
  { region: 'Indonesia', subscriptions: 21, growth: 12 },
  { region: 'Thailand', subscriptions: 12, growth: -3 }
];

const paymentFailures = [
  { method: 'Credit Card - Visa', failures: 8, percentage: 42 },
  { method: 'Credit Card - Mastercard', failures: 5, percentage: 26 },
  { method: 'PayPal', failures: 4, percentage: 21 },
  { method: 'Bank Transfer', failures: 2, percentage: 11 }
];

// Custom Tooltip for Line Chart
const CustomLineTooltip = ({ active, payload, label }: any) => {
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

// Custom Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 min-w-[180px]">
        <p className="font-semibold text-foreground mb-1">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          Revenue: <strong className="text-foreground">SGD ${payload[0].value.toLocaleString()}</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {payload[0].payload.percentage}% of total
        </p>
      </div>
    );
  }
  return null;
};

// Custom Active Shape for Pie Chart (on hover)
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

// Import Sector for active shape
import { Sector } from 'recharts';

export default function SuperAdminDashboard() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
       

        {/* Main Stats Grid - All Cards in One Row with Dark Gradients */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Card 1: Total Tenants - Blue Dark Gradient */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Total Tenants</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.totalTenants}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Companies
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Sub-Companies - Purple Dark Gradient */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Sub-Companies</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.totalSubCompanies}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Resellers
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Active Subscriptions - Green Dark Gradient */}
          <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Active Subs</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.activeSubscriptions}</div>
              <p className="text-[10px] text-white/80 mt-1">
                of {dashboardStats.totalTenants}
              </p>
            </CardContent>
          </Card>

          {/* Card 4: Total Active Users - Cyan Dark Gradient */}
          <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Active Users</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{(dashboardStats.totalActiveUsers / 1000).toFixed(1)}k</div>
              <p className="text-[10px] text-white/80 mt-1">
                Total
              </p>
            </CardContent>
          </Card>

          {/* Card 5: Monthly Revenue - Orange Dark Gradient */}
          <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Revenue</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">${(dashboardStats.monthlyRevenue / 1000).toFixed(0)}k</div>
              <div className="flex items-center text-[10px] text-white/90 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.revenueGrowth}%
              </div>
            </CardContent>
          </Card>

          {/* Card 6: Pending Payments - Red Dark Gradient */}
          <Card className="border-0 bg-gradient-to-br from-red-600 to-red-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Pending</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{dashboardStats.pendingPayments}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Invoices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row - Line Chart + Pie Chart - Responsive */}
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          {/* Monthly Trend Chart - Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-foreground">
                Monthly Tenant Trend
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                Last 6 months performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={monthlyTrendData}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      className="stroke-border"
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: '10px',
                        fontSize: '11px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="new" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="New"
                      dot={{ fill: '#10b981', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cancelled" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Cancelled"
                      dot={{ fill: '#ef4444', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="net" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Net"
                      dot={{ fill: '#3b82f6', r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Tenants - Pie Chart - FIXED RESPONSIVE */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-foreground">
                Top Revenue Contributors
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                Top 5 paying tenants distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Desktop View - Side Legend */}
              <div className="hidden lg:block h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topTenantsChartData}
                      cx="40%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                    >
                      {topTenantsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend 
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: '11px',
                        paddingLeft: '10px'
                      }}
                      formatter={(value, entry: any) => (
                        <span className="text-xs">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Mobile/Tablet View - Bottom Legend */}
              <div className="lg:hidden">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topTenantsChartData}
                        cx="50%"
                        cy="45%"
                        labelLine={false}
                        outerRadius={70}
                        innerRadius={45}
                        fill="#8884d8"
                        dataKey="value"
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                      >
                        {topTenantsChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Custom Legend Below Chart */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {topTenantsChartData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {entry.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          ${(entry.value / 1000).toFixed(1)}k ({entry.percentage}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start">
            <TabsTrigger value="activities" className="text-xs md:text-sm">Recent Activities</TabsTrigger>
            <TabsTrigger value="low-usage" className="text-xs md:text-sm">Low Usage</TabsTrigger>
            <TabsTrigger value="top-tenants" className="text-xs md:text-sm">Top Tenants</TabsTrigger>
            <TabsTrigger value="regions" className="text-xs md:text-sm">Regions</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs md:text-sm">Payments</TabsTrigger>
          </TabsList>

          {/* Recent Activities */}
          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-foreground">
                  Recent Tenant Activities
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-muted-foreground">
                  Last 5 activities across all tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full ${
                          activity.type === 'upgrade' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-500' :
                          activity.type === 'payment' ? 'bg-green-500/10 text-green-600 dark:text-green-500' :
                          activity.type === 'new' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500' :
                          activity.type === 'renewal' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' :
                          'bg-red-500/10 text-red-600 dark:text-red-500'
                        }`}>
                          {activity.type === 'upgrade' && <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />}
                          {activity.type === 'payment' && <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />}
                          {activity.type === 'new' && <UserPlus className="h-4 w-4 md:h-5 md:w-5" />}
                          {activity.type === 'renewal' && <CreditCard className="h-4 w-4 md:h-5 md:w-5" />}
                          {activity.type === 'failed' && <XCircle className="h-4 w-4 md:h-5 md:w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm md:text-base text-foreground">
                            {activity.company}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {activity.action}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground sm:text-right pl-11 sm:pl-0">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Low Usage Tenants */}
          <TabsContent value="low-usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-foreground">
                  Low Employee Count Tenants
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-muted-foreground">
                  Top 10 tenants with lowest employee usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowEmployeeTenants.map((tenant) => (
                    <div 
                      key={tenant.id} 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <Avatar className="h-8 w-8 md:h-10 md:w-10">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {tenant.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-sm md:text-base text-foreground truncate">
                              {tenant.name}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {tenant.plan}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 md:gap-4 mt-1 flex-wrap">
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {tenant.employees}/{tenant.maxEmployees} employees
                            </p>
                            <Progress value={(tenant.employees / tenant.maxEmployees) * 100} className="w-20 md:w-32" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round((tenant.employees / tenant.maxEmployees) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Paying Tenants Details */}
          <TabsContent value="top-tenants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-foreground">
                  Top 10 Revenue Generating Tenants
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-muted-foreground">
                  Detailed list of highest paying customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPayingTenants.map((tenant, index) => (
                    <div 
                      key={tenant.id} 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs md:text-sm">
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8 md:h-10 md:w-10">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {tenant.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-sm md:text-base text-foreground truncate">
                              {tenant.name}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {tenant.plan}
                            </Badge>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {tenant.employees} employees
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4 pl-14 sm:pl-0">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-sm md:text-base text-foreground">
                            SGD ${tenant.revenue.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            per month
                          </p>
                        </div>
                        {tenant.trend === 'up' && <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-500" />}
                        {tenant.trend === 'down' && <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-red-500" />}
                        {tenant.trend === 'stable' && <div className="h-4 w-4 md:h-5 md:w-5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regional Distribution */}
          <TabsContent value="regions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-foreground">
                  Subscription Distribution by Region
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-muted-foreground">
                  Where your tenants are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region) => (
                    <div key={region.region} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm md:text-base text-foreground">
                            {region.region}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 pl-6 sm:pl-0">
                          <span className="font-bold text-sm md:text-base text-foreground">
                            {region.subscriptions} tenants
                          </span>
                          <div className={`flex items-center text-xs md:text-sm ${region.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {region.growth >= 0 ? (
                              <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            )}
                            {region.growth >= 0 ? '+' : ''}{region.growth}%
                          </div>
                        </div>
                      </div>
                      <Progress value={(region.subscriptions / dashboardStats.totalTenants) * 100} />
                      <p className="text-xs text-muted-foreground">
                        {Math.round((region.subscriptions / dashboardStats.totalTenants) * 100)}% of total subscriptions
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Failures */}
          <TabsContent value="payments" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg text-foreground">
                    Payment Method Failures
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground">
                    Which payment methods fail most often
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentFailures.map((method) => (
                      <div key={method.method} className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="text-xs md:text-sm font-medium text-foreground">
                            {method.method}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm font-bold text-destructive">
                              {method.failures} failures
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({method.percentage}%)
                            </span>
                          </div>
                        </div>
                        <Progress value={method.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg text-foreground">
                    Failed Payment Attempts
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground">
                    Total payment failures this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-3 md:mb-4">
                          <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-destructive">
                              19
                            </div>
                            <div className="text-xs text-destructive">
                              Total
                            </div>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Payment attempts failed
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-border">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-destructive mb-1">
                          <XCircle className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xl md:text-2xl font-bold">12</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Card Declined
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                          <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xl md:text-2xl font-bold">7</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Insufficient Funds
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
// components/modals/ViewAnalytics.tsx
'use client';

import { useState } from 'react';
import { X, Download, Printer, Share2 } from 'lucide-react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle,
  Laptop,
  Armchair,
  Car,
  Wrench,
  Clock,
  MapPin,
  Users,
  Activity,
  PieChart,
  LineChart,
  Target,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function ViewAnalyticsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!open) return null;

  const analyticsData = {
    overview: {
      totalAssets: 247,
      totalValue: 324500,
      avgAssetValue: 1314,
      utilizationRate: 87.3,
      maintenanceCost: 12450,
      depreciation: 8.5
    },
    categoryDistribution: [
      { name: 'Electronics', count: 89, percentage: 36, value: 145230, icon: Laptop },
      { name: 'Furniture', count: 124, percentage: 50, value: 98450, icon: Armchair },
      { name: 'Vehicles', count: 18, percentage: 7, value: 456800, icon: Car },
      { name: 'Equipment', count: 16, percentage: 7, value: 23120, icon: Wrench },
    ],
    statusBreakdown: [
      { status: 'Active', count: 215, percentage: 87, change: '+5.3%', trend: 'up' },
      { status: 'Maintenance', count: 12, percentage: 5, change: '-3.1%', trend: 'down' },
      { status: 'In Storage', count: 15, percentage: 6, change: '+2.1%', trend: 'up' },
      { status: 'Retired', count: 5, percentage: 2, change: '-1.2%', trend: 'down' },
    ],
    monthlyTrends: [
      { month: 'Jan', assets: 220, value: 295000 },
      { month: 'Feb', assets: 228, value: 305000 },
      { month: 'Mar', assets: 235, value: 315000 },
      { month: 'Apr', assets: 240, value: 318000 },
      { month: 'May', assets: 245, value: 322000 },
      { month: 'Jun', assets: 247, value: 324500 },
    ],
    topLocations: [
      { name: 'Office A - Floor 2', count: 45, percentage: 18 },
      { name: 'Office B - Floor 1', count: 38, percentage: 15 },
      { name: 'Warehouse A', count: 32, percentage: 13 },
      { name: 'Office A - Floor 3', count: 28, percentage: 11 },
      { name: 'Storage Room', count: 25, percentage: 10 },
    ],
    topAssignees: [
      { name: 'John Doe', count: 12, department: 'IT' },
      { name: 'Jane Smith', count: 10, department: 'Sales' },
      { name: 'IT Department', count: 25, department: 'IT' },
      { name: 'Sales Team', count: 18, department: 'Sales' },
      { name: 'HR Department', count: 15, department: 'HR' },
    ],
    conditionAnalysis: [
      { condition: 'Excellent', count: 98, percentage: 40 },
      { condition: 'Good', count: 102, percentage: 41 },
      { condition: 'Fair', count: 35, percentage: 14 },
      { condition: 'Poor', count: 12, percentage: 5 },
    ],
    insights: [
      {
        title: 'High Utilization',
        description: 'Asset utilization is at 87.3%, exceeding the target of 85%',
        icon: TrendingUp,
        type: 'positive'
      },
      {
        title: 'Maintenance Alert',
        description: '12 assets currently in maintenance, up 3.1% from last month',
        icon: AlertCircle,
        type: 'warning'
      },
      {
        title: 'Value Growth',
        description: 'Total asset value increased by $9,500 this quarter',
        icon: DollarSign,
        type: 'positive'
      },
      {
        title: 'Aging Assets',
        description: '5 assets are over 5 years old and may need replacement',
        icon: Clock,
        type: 'info'
      },
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <BarChart3 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Comprehensive insights and analytics for asset management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="hover:bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="space-y-6">
            
            {/* Filters */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Data
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Total Assets</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalAssets}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Total Value</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${(analyticsData.overview.totalValue / 1000).toFixed(0)}K</p>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Target className="h-5 w-5 text-slate-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Avg Value</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${analyticsData.overview.avgAssetValue}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Utilization</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.utilizationRate}%</p>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Maintenance</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${(analyticsData.overview.maintenanceCost / 1000).toFixed(1)}K</p>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Depreciation</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.depreciation}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Insights */}
            <Card className="bg-white border shadow-sm">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-base font-semibold text-gray-900">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {analyticsData.insights.map((insight, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg hover:border-gray-300 hover:shadow-sm transition-all bg-gray-50">
                      <div className="p-3 bg-white border rounded-lg h-fit">
                        <insight.icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="distribution" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white border p-1 rounded-lg mb-6 shadow-sm">
                <TabsTrigger value="distribution" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                  <PieChart className="h-4 w-4" />
                  Distribution
                </TabsTrigger>
                <TabsTrigger value="trends" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                  <LineChart className="h-4 w-4" />
                  Trends
                </TabsTrigger>
                <TabsTrigger value="locations" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                  <MapPin className="h-4 w-4" />
                  Locations
                </TabsTrigger>
                <TabsTrigger value="assignees" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                  <Users className="h-4 w-4" />
                  Assignees
                </TabsTrigger>
                <TabsTrigger value="condition" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                  <Activity className="h-4 w-4" />
                  Condition
                </TabsTrigger>
              </TabsList>

              {/* Distribution Tab */}
              <TabsContent value="distribution">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white border shadow-sm">
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle className="text-base font-semibold text-gray-900">Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-5">
                      {analyticsData.categoryDistribution.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <category.icon className="h-5 w-5 text-gray-700" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{category.name}</p>
                                <p className="text-sm text-gray-500">${category.value.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{category.count}</p>
                              <p className="text-sm text-gray-500">{category.percentage}%</p>
                            </div>
                          </div>
                          <Progress value={category.percentage} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-white border shadow-sm">
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle className="text-base font-semibold text-gray-900">Status Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-5">
                      {analyticsData.statusBreakdown.map((status, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                              <p className="font-medium text-gray-900">{status.status}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={`text-xs ${status.trend === 'up' ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}>
                                {status.change}
                              </Badge>
                              <p className="font-bold text-gray-900 w-12 text-right">{status.count}</p>
                            </div>
                          </div>
                          <Progress value={status.percentage} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends">
                <Card className="bg-white border shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Monthly Growth Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-5">
                      {analyticsData.monthlyTrends.map((month, index) => {
                        const maxAssets = Math.max(...analyticsData.monthlyTrends.map(m => m.assets));
                        const maxValue = Math.max(...analyticsData.monthlyTrends.map(m => m.value));
                        const assetPercentage = (month.assets / maxAssets) * 100;
                        const valuePercentage = (month.value / maxValue) * 100;
                        
                        return (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="w-16 justify-center font-semibold">
                                {month.month}
                              </Badge>
                              <div className="flex gap-8 text-sm">
                                <div>
                                  <span className="text-gray-600">Assets: </span>
                                  <span className="font-semibold text-gray-900">{month.assets}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Value: </span>
                                  <span className="font-semibold text-gray-900">${(month.value / 1000).toFixed(0)}K</span>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <div 
                                  className="absolute top-0 left-0 h-full bg-slate-700 transition-all duration-500 flex items-center justify-end pr-3"
                                  style={{ width: `${assetPercentage}%` }}
                                >
                                  {assetPercentage > 30 && (
                                    <span className="text-xs font-semibold text-white">{month.assets}</span>
                                  )}
                                </div>
                              </div>
                              <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <div 
                                  className="absolute top-0 left-0 h-full bg-slate-500 transition-all duration-500 flex items-center justify-end pr-3"
                                  style={{ width: `${valuePercentage}%` }}
                                >
                                  {valuePercentage > 30 && (
                                    <span className="text-xs font-semibold text-white">${(month.value / 1000).toFixed(0)}K</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Locations Tab */}
              <TabsContent value="locations">
                <Card className="bg-white border shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Top Asset Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {analyticsData.topLocations.map((location, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border hover:shadow-sm transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold text-sm">
                                {index + 1}
                              </div>
                              <span className="font-medium text-gray-900">{location.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{location.count} assets</p>
                              <p className="text-sm text-gray-500">{location.percentage}%</p>
                            </div>
                          </div>
                          <Progress value={location.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assignees Tab */}
              <TabsContent value="assignees">
                <Card className="bg-white border shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Top Asset Assignees
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {analyticsData.topAssignees.map((assignee, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                              {assignee.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{assignee.name}</p>
                              <p className="text-sm text-gray-500">{assignee.department}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-white">
                            {assignee.count} assets
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Condition Tab */}
              <TabsContent value="condition">
                <Card className="bg-white border shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Asset Condition Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-5">
                      {analyticsData.conditionAnalysis.map((condition, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold text-base shadow-sm">
                                {condition.percentage}%
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{condition.condition}</p>
                                <p className="text-sm text-gray-500">{condition.count} assets</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-sm px-3 py-1">
                              {condition.percentage}%
                            </Badge>
                          </div>
                          <Progress value={condition.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
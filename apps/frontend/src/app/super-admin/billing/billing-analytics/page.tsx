'use client';

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Filter,
  CreditCard,
  Target,
  Percent,
  Activity,
  PieChart,
  BarChart3,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Static JSON Data
const analyticsData = {
  overview: {
    currentMRR: 45680,
    previousMRR: 42350,
    mrrGrowth: 7.86,
    arr: 548160,
    churnRate: 2.3,
    previousChurnRate: 3.1,
    customerLifetimeValue: 12450,
    averageRevenuePerAccount: 592,
    totalActiveSubscriptions: 152,
    newSubscriptions: 12,
    cancelledSubscriptions: 4,
    upgrades: 8,
    downgrades: 2
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 38500, subscriptions: 128, mrr: 38500 },
    { month: 'Feb', revenue: 39200, subscriptions: 132, mrr: 39200 },
    { month: 'Mar', revenue: 40100, subscriptions: 136, mrr: 40100 },
    { month: 'Apr', revenue: 41300, subscriptions: 140, mrr: 41300 },
    { month: 'May', revenue: 42350, subscriptions: 145, mrr: 42350 },
    { month: 'Jun', revenue: 43800, subscriptions: 148, mrr: 43800 },
    { month: 'Jul', revenue: 44200, subscriptions: 150, mrr: 44200 },
    { month: 'Aug', revenue: 45680, subscriptions: 152, mrr: 45680 }
  ],
  planDistribution: [
    { plan: 'Trial', count: 23, percentage: 15.1, revenue: 0, color: 'slate' },
    { plan: 'Starter', count: 56, percentage: 36.8, revenue: 16744, color: 'blue' },
    { plan: 'Professional', count: 48, percentage: 31.6, revenue: 28752, color: 'purple' },
    { plan: 'Enterprise', count: 25, percentage: 16.4, revenue: 32475, color: 'amber' }
  ],
  churnData: [
    { month: 'Jan', churnRate: 3.5, churned: 5, total: 128 },
    { month: 'Feb', churnRate: 3.2, churned: 4, total: 132 },
    { month: 'Mar', churnRate: 2.9, churned: 4, total: 136 },
    { month: 'Apr', churnRate: 2.8, churned: 4, total: 140 },
    { month: 'May', churnRate: 3.1, churned: 5, total: 145 },
    { month: 'Jun', churnRate: 2.7, churned: 4, total: 148 },
    { month: 'Jul', churnRate: 2.6, churned: 4, total: 150 },
    { month: 'Aug', churnRate: 2.3, churned: 4, total: 152 }
  ],
  revenueByPlan: [
    { month: 'Jan', starter: 14200, professional: 21300, enterprise: 23000 },
    { month: 'Feb', starter: 14600, professional: 21800, enterprise: 22800 },
    { month: 'Mar', starter: 15100, professional: 22400, enterprise: 22600 },
    { month: 'Apr', starter: 15600, professional: 23200, enterprise: 22500 },
    { month: 'May', starter: 16000, professional: 24100, enterprise: 22250 },
    { month: 'Jun', starter: 16400, professional: 24800, enterprise: 22600 },
    { month: 'Jul', starter: 16600, professional: 25300, enterprise: 22300 },
    { month: 'Aug', starter: 16744, professional: 28752, enterprise: 32475 }
  ],
  topPerformers: [
    { name: 'Globex Industries', plan: 'Enterprise', mrr: 1299, growth: 15.2 },
    { name: 'TechStart Solutions', plan: 'Professional', mrr: 599, growth: 12.8 },
    { name: 'Acme Corporation', plan: 'Professional', mrr: 599, growth: 8.5 },
    { name: 'FinanceHub Ltd', plan: 'Enterprise', mrr: 1299, growth: 7.3 },
    { name: 'RetailMax Co', plan: 'Starter', mrr: 299, growth: 5.1 }
  ],
  conversionMetrics: {
    trialToStarterRate: 32.5,
    starterToProfessionalRate: 18.7,
    professionalToEnterpriseRate: 12.3,
    overallConversionRate: 65.8
  }
};

export default function BillingAnalyticsPage() {
  const { overview, monthlyRevenue, planDistribution, churnData, topPerformers, conversionMetrics } = analyticsData;

  const getPlanColor = (color: string) => {
    const colors: Record<string, string> = {
      slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      blue: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
      purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800',
      amber: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200 dark:from-amber-900/50 dark:to-orange-900/50 dark:text-amber-300 dark:border-amber-800'
    };
    return colors[color] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">Monthly Recurring Revenue</p>
                  <DollarSign className="h-5 w-5 text-white/80" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">${overview.currentMRR.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    {overview.mrrGrowth > 0 ? (
                      <>
                        <ArrowUpRight className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">
                          +{overview.mrrGrowth}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">
                          {overview.mrrGrowth}%
                        </span>
                      </>
                    )}
                    <span className="text-xs text-white/70">vs last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">Annual Recurring Revenue</p>
                  <TrendingUp className="h-5 w-5 text-white/80" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">
                    ${overview.arr.toLocaleString('en-US')}
                  </p>
                  <p className="text-xs text-white/70">
                    MRR × 12
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">Churn Rate</p>
                  <Percent className="h-5 w-5 text-white/80" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">{overview.churnRate}%</p>
                  <div className="flex items-center gap-2">
                    {overview.churnRate < overview.previousChurnRate ? (
                      <>
                        <ArrowDownRight className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">
                          -{(overview.previousChurnRate - overview.churnRate).toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">
                          +{(overview.churnRate - overview.previousChurnRate).toFixed(1)}%
                        </span>
                      </>
                    )}
                    <span className="text-xs text-white/70">vs last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">Customer LTV</p>
                  <Target className="h-5 w-5 text-white/80" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">${overview.customerLifetimeValue.toLocaleString()}</p>
                  <p className="text-xs text-white/70">
                    Average lifetime value
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/90">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-white">{overview.totalActiveSubscriptions}</p>
                </div>
                <CreditCard className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/90">New This Month</p>
                  <p className="text-2xl font-bold text-white">+{overview.newSubscriptions}</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/90">Cancelled</p>
                  <p className="text-2xl font-bold text-white">-{overview.cancelledSubscriptions}</p>
                </div>
                <ArrowDownRight className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/90">Avg Revenue/Account</p>
                  <p className="text-2xl font-bold text-white">${overview.averageRevenuePerAccount}</p>
                </div>
                <Activity className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-2">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-2">
              <TabsList className="grid w-full lg:w-auto grid-cols-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <TabsTrigger 
                  value="revenue"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white 
                             data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-300
                             data-[state=active]:shadow-lg
                             transition-all duration-200"
                >
                  <LineChart className="h-4 w-4 mr-2" />
                  Revenue Trends
                </TabsTrigger>
                <TabsTrigger 
                  value="plans"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white 
                             data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-300
                             data-[state=active]:shadow-lg
                             transition-all duration-200"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Plan Distribution
                </TabsTrigger>
                <TabsTrigger 
                  value="churn"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white 
                             data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-300
                             data-[state=active]:shadow-lg
                             transition-all duration-200"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Churn Analysis
                </TabsTrigger>
                <TabsTrigger 
                  value="performance"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white 
                             data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-300
                             data-[state=active]:shadow-lg
                             transition-all duration-200"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Top Performers
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <Select defaultValue="last_6_months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                    <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                    <SelectItem value="last_year">Last Year</SelectItem>
                    <SelectItem value="all_time">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-0 bg-black dark:bg-gray-900 
                             text-white dark:text-white
                             hover:bg-gray-800 dark:hover:bg-gray-800
                             shadow-md hover:shadow-lg
                             transition-all duration-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-0 bg-emerald-500 dark:bg-emerald-600 
                             text-white dark:text-white
                             hover:bg-emerald-600 dark:hover:bg-emerald-700
                             shadow-md hover:shadow-lg
                             transition-all duration-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Revenue Trends */}
          <TabsContent value="revenue" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100">Monthly Recurring Revenue Trend</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Track MRR growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Simple bar chart visualization */}
                  <div className="space-y-3">
                    {monthlyRevenue.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{item.month}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-600 dark:text-slate-400">{item.subscriptions} subs</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">${item.mrr.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${(item.mrr / 50000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Growth Rate</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{overview.mrrGrowth}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Highest MRR</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${Math.max(...monthlyRevenue.map(m => m.mrr)).toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Avg MRR</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${Math.round(monthlyRevenue.reduce((a, b) => a + b.mrr, 0) / monthlyRevenue.length).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Subscription Movement</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Net change in subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-900 dark:text-emerald-100">New Subscriptions</p>
                          <p className="text-sm text-emerald-700 dark:text-emerald-300">This month</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+{overview.newSubscriptions}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900 dark:text-blue-100">Upgrades</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">Plan upgrades</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">+{overview.upgrades}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                          <TrendingDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-amber-900 dark:text-amber-100">Downgrades</p>
                          <p className="text-sm text-amber-700 dark:text-amber-300">Plan downgrades</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">-{overview.downgrades}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                          <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-red-900 dark:text-red-100">Cancellations</p>
                          <p className="text-sm text-red-700 dark:text-red-300">Cancelled</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">-{overview.cancelledSubscriptions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Conversion Funnel</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Trial to paid conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Trial → Starter</span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{conversionMetrics.trialToStarterRate}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${conversionMetrics.trialToStarterRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Starter → Professional</span>
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{conversionMetrics.starterToProfessionalRate}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-purple-500 h-3 rounded-full"
                          style={{ width: `${conversionMetrics.starterToProfessionalRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Professional → Enterprise</span>
                        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{conversionMetrics.professionalToEnterpriseRate}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-amber-500 h-3 rounded-full"
                          style={{ width: `${conversionMetrics.professionalToEnterpriseRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                        <div>
                          <p className="text-sm text-emerald-700 dark:text-emerald-300">Overall Conversion Rate</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">Trial to any paid plan</p>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{conversionMetrics.overallConversionRate}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plan Distribution */}
          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Subscription by Plan</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Distribution across pricing tiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {planDistribution.map((plan, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge className={getPlanColor(plan.color)}>
                              {plan.plan}
                            </Badge>
                            <span className="text-sm text-slate-600 dark:text-slate-400">{plan.count} subscriptions</span>
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{plan.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              plan.color === 'slate' ? 'bg-slate-500' :
                              plan.color === 'blue' ? 'bg-blue-500' :
                              plan.color === 'purple' ? 'bg-purple-500' :
                              'bg-gradient-to-r from-amber-500 to-orange-500'
                            }`}
                            style={{ width: `${plan.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Revenue by Plan</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Monthly recurring revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {planDistribution.filter(p => p.revenue > 0).map((plan, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getPlanColor(plan.color)}`}>
                            <DollarSign className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{plan.plan}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{plan.count} subscriptions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">${plan.revenue.toLocaleString()}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{plan.percentage}% of MRR</p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Total MRR</span>
                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          ${planDistribution.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Churn Analysis */}
          <TabsContent value="churn" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100">Churn Rate Trend</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Monthly churn rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {churnData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-600 dark:text-slate-400">{item.churned} churned / {item.total} total</span>
                          <span className={`font-semibold ${
                            item.churnRate < 3 ? 'text-emerald-600 dark:text-emerald-400' : 
                            item.churnRate < 4 ? 'text-amber-600 dark:text-amber-400' : 
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {item.churnRate}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.churnRate < 3 ? 'bg-emerald-500' : 
                            item.churnRate < 4 ? 'bg-amber-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${(item.churnRate / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">Current Rate</p>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{overview.churnRate}%</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
                      <p className="text-sm text-blue-700 dark:text-blue-300">Average Rate</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {(churnData.reduce((sum, d) => sum + d.churnRate, 0) / churnData.length).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50">
                      <p className="text-sm text-purple-700 dark:text-purple-300">Lowest Rate</p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {Math.min(...churnData.map(d => d.churnRate))}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Churn Reasons</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Why customers cancelled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { reason: 'Price too high', percentage: 32, count: 8 },
                      { reason: 'Switched to competitor', percentage: 28, count: 7 },
                      { reason: 'Business closed', percentage: 20, count: 5 },
                      { reason: 'Missing features', percentage: 12, count: 3 },
                      { reason: 'Other', percentage: 8, count: 2 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 dark:text-slate-300">{item.reason}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400">{item.count}</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{item.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Retention Metrics</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Customer retention analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Retention Rate</span>
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">97.7%</span>
                      </div>
                      <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '97.7%' }} />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Average Customer Lifetime</p>
                      <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">21 months</p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50">
                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">90-Day Retention</p>
                      <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">94.5%</p>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/50">
                      <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">Annual Retention</p>
                      <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">89.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Performers */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Top Revenue Generators</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Highest MRR contributors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.map((performer, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{performer.name}</p>
                            <Badge className={getPlanColor(
                              performer.plan === 'Enterprise' ? 'amber' : 
                              performer.plan === 'Professional' ? 'purple' : 
                              'blue'
                            )}>
                              {performer.plan}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">${performer.mrr.toLocaleString()}</p>
                          <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="h-3 w-3" />
                            <span>+{performer.growth}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Growth Leaders</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Fastest growing accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers
                      .sort((a, b) => b.growth - a.growth)
                      .map((performer, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 text-white font-bold text-sm">
                              #{index + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-slate-100">{performer.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">${performer.mrr.toLocaleString()} MRR</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                              <ArrowUpRight className="h-5 w-5" />
                              <span>{performer.growth}%</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">growth</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100">Revenue Growth by Plan</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Monthly comparison across tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 pb-2 border-b border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <div>Month</div>
                    <div>Starter</div>
                    <div>Professional</div>
                    <div>Enterprise</div>
                  </div>
                  {analyticsData.revenueByPlan.slice(-5).map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 text-sm">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{item.month}</div>
                      <div className="text-slate-700 dark:text-slate-300">${item.starter.toLocaleString()}</div>
                      <div className="text-slate-700 dark:text-slate-300">${item.professional.toLocaleString()}</div>
                      <div className="text-slate-700 dark:text-slate-300">${item.enterprise.toLocaleString()}</div>
                    </div>
                  ))}
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm font-bold">
                    <div className="text-slate-900 dark:text-slate-100">Current</div>
                    <div className="text-blue-600 dark:text-blue-400">
                      ${analyticsData.revenueByPlan[analyticsData.revenueByPlan.length - 1].starter.toLocaleString()}
                    </div>
                    <div className="text-purple-600 dark:text-purple-400">
                      ${analyticsData.revenueByPlan[analyticsData.revenueByPlan.length - 1].professional.toLocaleString()}
                    </div>
                    <div className="text-amber-600 dark:text-amber-400">
                      ${analyticsData.revenueByPlan[analyticsData.revenueByPlan.length - 1].enterprise.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Strong Performance</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    MRR up {overview.mrrGrowth}%, Churn down {(overview.previousChurnRate - overview.churnRate).toFixed(1)}% • 
                    {overview.newSubscriptions} new subscriptions this month
                  </p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Export Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

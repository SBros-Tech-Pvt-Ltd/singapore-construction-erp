"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Area } from "recharts";
import { BarChart3, Download, FileText, DollarSign, TrendingUp, Users, CreditCard, Search, Filter, ArrowUpRight, ArrowDownRight, Moon, Sun } from "lucide-react";

const revenueTrendData = [
  { month: "Jan", revenue: 30000, target: 28000, growth: 7.1 },
  { month: "Feb", revenue: 34000, target: 32000, growth: 13.3 },
  { month: "Mar", revenue: 42000, target: 36000, growth: 23.5 },
  { month: "Apr", revenue: 48000, target: 42000, growth: 14.3 },
  { month: "May", revenue: 50000, target: 48000, growth: 4.2 },
  { month: "Jun", revenue: 52000, target: 52000, growth: 4.0 },
  { month: "Jul", revenue: 56000, target: 56000, growth: 7.7 },
  { month: "Aug", revenue: 58000, target: 58000, growth: 3.6 },
  { month: "Sep", revenue: 60000, target: 60000, growth: 3.4 },
  { month: "Oct", revenue: 71000, target: 65000, growth: 18.3 },
];

const planBreakdownData = [
  { name: "Premium", value: 40000, color: "hsl(142 76% 36%)", tenants: 15 },
  { name: "Standard", value: 25000, color: "hsl(262 83% 58%)", tenants: 20 },
  { name: "Basic", value: 10000, color: "hsl(221 83% 53%)", tenants: 25 },
];

const paymentStatusData = [
  { status: "Paid", amount: 68000, count: 48 },
  { status: "Pending", amount: 5000, count: 8 },
  { status: "Failed", amount: 2000, count: 4 },
];

const revenueTableData = [
  { plan: "Premium", revenue: 40000, percentage: 53, tenants: 15, avgRevenue: 2667, status: "paid", trend: "up" },
  { plan: "Standard", revenue: 25000, percentage: 33, tenants: 20, avgRevenue: 1250, status: "paid", trend: "up" },
  { plan: "Basic", revenue: 10000, percentage: 14, tenants: 25, avgRevenue: 400, status: "paid", trend: "down" },
];

export default function RevenueReport() {
  const [period, setPeriod] = useState("month");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("revenue");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredData = revenueTableData
    .filter((item) => {
      const matchesSearch = item.plan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan = selectedPlan === "all" || item.plan.toLowerCase() === selectedPlan;
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
      return matchesSearch && matchesPlan && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const totalRevenue = 75000;
  const monthlyGrowth = 18.3;
  const avgRevenuePerTenant = 1250;
  const totalTenants = 60;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
     <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Total Revenue</p>
                  <h3 className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</h3>
                  <p className="text-emerald-100 text-xs mt-2 flex items-center gap-1">
                    <TrendingUp size={12} /> +{monthlyGrowth}% this month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Avg Revenue/Tenant</p>
                  <h3 className="text-3xl font-bold">₹{avgRevenuePerTenant}</h3>
                  <p className="text-blue-100 text-xs mt-2">From {totalTenants} tenants</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium mb-1">Payment Success Rate</p>
                  <h3 className="text-3xl font-bold">93.3%</h3>
                  <p className="text-violet-100 text-xs mt-2">48 of 60 payments</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Growth Rate</p>
                  <h3 className="text-3xl font-bold">+{monthlyGrowth}%</h3>
                  <p className="text-orange-100 text-xs mt-2">Month over month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-sm border hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} />
              Comprehensive Revenue Analytics
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Revenue trends, plan distribution, and payment status overview
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" />
                  Revenue Trend vs Target
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={revenueTrendData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                    <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                      formatter={(v: number) => `₹${v.toLocaleString()}`}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      fill="url(#colorRevenue)" 
                      stroke="hsl(142 76% 36%)" 
                      strokeWidth={3}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(24 100% 50%)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3, fill: "hsl(24 100% 50%)" }}
                      name="Target"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary" />
                  Revenue by Plan
                </h3>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={planBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value }) => `${name}: ₹${(value / 1000).toFixed(0)}k`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {planBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ fontSize: '12px' }}
                        formatter={(v: number) => `₹${v.toLocaleString()}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <CreditCard size={16} className="text-primary" />
                  Payment Status Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="status" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
               <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    style={{ fontSize: '12px' }} 
                    tickFormatter={(v) => `₹${v / 1000}k`} 
                    />
                <Tooltip 
                    contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '8px', 
                    fontSize: '12px' 
                  }}
                    formatter={(v: number) => `₹${v.toLocaleString()}`} 
                   />
                <Bar dataKey="amount" fill="hsl(142.1 76.2% 36.3%)" radius={[8, 8, 0, 0]} />
               </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="text-primary" size={20} />
                Revenue Summary by Plan ({filteredData.length} results)
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" /> Excel
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" /> CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-2 mb-4">
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      placeholder="Search by plan..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="This Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Plan Type</label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Payment Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Plan Type
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-muted"
                      onClick={() => handleSort("revenue")}
                    >
                      Revenue {sortField === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Percentage
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-muted"
                      onClick={() => handleSort("tenants")}
                    >
                      Tenants {sortField === "tenants" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-muted"
                      onClick={() => handleSort("avgRevenue")}
                    >
                      Avg Revenue {sortField === "avgRevenue" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredData.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                            item.plan === "Premium" ? "bg-emerald-100 dark:bg-emerald-900/30" :
                            item.plan === "Standard" ? "bg-violet-100 dark:bg-violet-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                          }`}>
                            <span className={`font-semibold ${
                              item.plan === "Premium" ? "text-emerald-700 dark:text-emerald-400" :
                              item.plan === "Standard" ? "text-violet-700 dark:text-violet-400" : "text-blue-700 dark:text-blue-400"
                            }`}>
                              {item.plan.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{item.plan}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">
                        ₹{item.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.percentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {item.tenants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ₹{item.avgRevenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.trend === "up" ? (
                          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight size={16} />
                            <span className="text-xs font-semibold">Up</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <ArrowDownRight size={16} />
                            <span className="text-xs font-semibold">Down</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "paid" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-6 pt-3 pb-4 bg-muted/20 border-t rounded-b-lg mt-2">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">1</span> to{" "}
                <span className="font-semibold">{filteredData.length}</span> of{" "}
                <span className="font-semibold">{filteredData.length}</span> results
              </p>

              <div className="flex items-center gap-3">
                {/* Optional: Go to page input */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Go to page:</span>
                  <input
                    type="number"
                    min="1"
                    className="w-14 px-2 py-1 border rounded-md bg-background text-sm text-foreground"
                    placeholder="1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
  );
}


"use client";

import { SetStateAction, useState } from "react";
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/components/ui/select";
import { Download, BarChart3, FileText, TrendingUp, Users, Building2, DollarSign, Search, Filter, Moon, Sun } from "lucide-react";
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,BarChart,Bar,PieChart,Pie,Cell} from "recharts";

const growthData = [
  { month: "Jan", tenants: 10, revenue: 5000 },
  { month: "Feb", tenants: 15, revenue: 7500 },
  { month: "Mar", tenants: 20, revenue: 10000 },
  { month: "Apr", tenants: 25, revenue: 12500 },
  { month: "May", tenants: 30, revenue: 15000 },
  { month: "Jun", tenants: 35, revenue: 17500 },
  { month: "Jul", tenants: 40, revenue: 20000 },
  { month: "Aug", tenants: 42, revenue: 21000 },
  { month: "Sep", tenants: 50, revenue: 25000 },
  { month: "Oct", tenants: 60, revenue: 30000 },
];

const planDistribution = [
  { name: "Basic", value: 25, color: "hsl(221.2 83.2% 53.3%)" },
  { name: "Standard", value: 20, color: "hsl(262.1 83.3% 57.8%)" },
  { name: "Premium", value: 15, color: "hsl(142.1 76.2% 36.3%)" },
];

const countryData = [
  { country: "India", tenants: 28 },
  { country: "Singapore", tenants: 18 },
  { country: "UAE", tenants: 14 },
];

const tenantTableData = [
  {
    tenantName: "ABC Pvt Ltd",
    signupDate: "02 Oct 2025",
    plan: "Premium",
    country: "India",
    status: "Active",
    activeUsers: 45,
    lastLogin: "08 Oct 2025",
    revenue: 2500,
  },
  {
    tenantName: "Starline Solutions",
    signupDate: "01 Oct 2025",
    plan: "Basic",
    country: "Singapore",
    status: "Inactive",
    activeUsers: 10,
    lastLogin: "03 Oct 2025",
    revenue: 500,
  },
  {
    tenantName: "RapidHR",
    signupDate: "29 Sep 2025",
    plan: "Standard",
    country: "UAE",
    status: "Active",
    activeUsers: 32,
    lastLogin: "08 Oct 2025",
    revenue: 1500,
  },
  {
    tenantName: "TechCorp India",
    signupDate: "25 Sep 2025",
    plan: "Premium",
    country: "India",
    status: "Active",
    activeUsers: 52,
    lastLogin: "09 Oct 2025",
    revenue: 2500,
  },
  {
    tenantName: "Global Services",
    signupDate: "20 Sep 2025",
    plan: "Standard",
    country: "Singapore",
    status: "Active",
    activeUsers: 28,
    lastLogin: "07 Oct 2025",
    revenue: 1500,
  },
];

export default function TenantGrowthReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortField, setSortField] = useState("signupDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredData = tenantTableData
    .filter((tenant) => {
      const matchesSearch = tenant.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === "all" || tenant.country.toLowerCase() === selectedCountry;
      const matchesPlan = selectedPlan === "all" || tenant.plan.toLowerCase() === selectedPlan;
      const matchesStatus = selectedStatus === "all" || tenant.status.toLowerCase() === selectedStatus;
      return matchesSearch && matchesCountry && matchesPlan && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "activeUsers" || sortField === "revenue") {
        return sortOrder === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
      }
      return 0;
    });

  const totalTenants = 60;
  const activeTenants = 48;
  const totalRevenue = 30000;
  const growthRate = 20;

  const handleSort = (field: SetStateAction<string>) => {
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
          <Card className="border-primary/20 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Total Tenants</p>
                  <h3 className="text-3xl font-bold">{totalTenants}</h3>
                  <p className="text-blue-100 text-xs mt-2 flex items-center gap-1">
                    <TrendingUp size={12} /> +{growthRate}% this month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Building2 size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Active Tenants</p>
                  <h3 className="text-3xl font-bold">{activeTenants}</h3>
                  <p className="text-emerald-100 text-xs mt-2">{((activeTenants / totalTenants) * 100).toFixed(0)}% active rate</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium mb-1">Monthly Revenue</p>
                  <h3 className="text-3xl font-bold">${totalRevenue.toLocaleString()}</h3>
                  <p className="text-violet-100 text-xs mt-2">Average: ${(totalRevenue / totalTenants).toFixed(0)}/tenant</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Growth Rate</p>
                  <h3 className="text-3xl font-bold">+{growthRate}%</h3>
                  <p className="text-orange-100 text-xs mt-2">Compared to last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} />
              Comprehensive Analytics Dashboard
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Growth trends, plan distribution, and geographical insights in one view
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" />
                  Tenant & Revenue Growth Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="left" stroke="hsl(221.2 83.2% 53.3%)" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(262.1 83.3% 57.8%)" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="tenants"
                      stroke="hsl(221.2 83.2% 53.3%)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "hsl(221.2 83.2% 53.3%)" }}
                      name="Tenants"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(262.1 83.3% 57.8%)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "hsl(262.1 83.3% 57.8%)" }}
                      name="Revenue ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary" />
                  Plan Distribution
                </h3>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 size={16} className="text-primary" />
                Tenants by Country
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="tenants" fill="hsl(142.1 76.2% 36.3%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="text-primary" size={20} />
                Tenant Details ({filteredData.length} results)
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
                  <label className="text-sm font-medium text-foreground mb-2 block">Search Tenant</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      placeholder="Search by name..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Plan Type</label>
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
                  <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Tenant Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Signup Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted"
                      onClick={() => handleSort("activeUsers")}
                    >
                      Active Users {sortField === "activeUsers" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted"
                      onClick={() => handleSort("revenue")}
                    >
                      Revenue {sortField === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Last Login
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredData.map((tenant, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => alert(`View profile of ${tenant.tenantName}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {tenant.tenantName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-foreground">{tenant.tenantName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {tenant.signupDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tenant.plan === "Premium" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          tenant.plan === "Standard" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                          {tenant.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {tenant.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tenant.status === "Active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {tenant.activeUsers}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        ${tenant.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {tenant.lastLogin}
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


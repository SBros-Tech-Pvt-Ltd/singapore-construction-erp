"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Server, LogIn, Users, TrendingUp, Search, Download, FileText, Filter, ArrowUpRight, ArrowDownRight, Clock, Moon, Sun } from "lucide-react";
import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ComposedChart } from "recharts";

const usageData = [
  { month: "Jan", apiCalls: 2000, logins: 800, activeUsers: 300, target: 1800 },
  { month: "Feb", apiCalls: 2500, logins: 1000, activeUsers: 350, target: 2200 },
  { month: "Mar", apiCalls: 3100, logins: 1200, activeUsers: 400, target: 2800 },
  { month: "Apr", apiCalls: 4000, logins: 1600, activeUsers: 420, target: 3500 },
  { month: "May", apiCalls: 4800, logins: 1900, activeUsers: 450, target: 4200 },
  { month: "Jun", apiCalls: 5200, logins: 2100, activeUsers: 480, target: 4800 },
];

const mockTableData = [
  { name: "ABC Pvt Ltd", plan: "Premium", apiCalls: 5200, logins: 1200, activeUsers: 42, lastActive: "08 Oct 2025", country: "India", trend: "up", status: "Active", avgResponseTime: "120ms" },
  { name: "Starline Solutions", plan: "Basic", apiCalls: 800, logins: 100, activeUsers: 10, lastActive: "05 Oct 2025", country: "Singapore", trend: "down", status: "Inactive", avgResponseTime: "85ms" },
  { name: "RapidHR", plan: "Standard", apiCalls: 3100, logins: 600, activeUsers: 28, lastActive: "08 Oct 2025", country: "UAE", trend: "up", status: "Active", avgResponseTime: "95ms" },
  { name: "TechCorp India", plan: "Premium", apiCalls: 6800, logins: 1500, activeUsers: 50, lastActive: "09 Oct 2025", country: "India", trend: "up", status: "Active", avgResponseTime: "110ms" },
  { name: "Global Services", plan: "Standard", apiCalls: 2900, logins: 580, activeUsers: 25, lastActive: "07 Oct 2025", country: "Singapore", trend: "up", status: "Active", avgResponseTime: "88ms" },
];

export default function UsageReportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [chartType, setChartType] = useState<"line" | "area">("area");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortField, setSortField] = useState<keyof typeof mockTableData[0]>("apiCalls");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const totalApiCalls = 25000;
  const totalLogins = 3080;
  const totalActiveUsers = 60;
  const apiGrowth = 25;
  const loginGrowth = 10;

  const filteredData = mockTableData
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan = selectedPlan === "all" || item.plan.toLowerCase() === selectedPlan;
      const matchesCountry = selectedCountry === "all" || item.country.toLowerCase() === selectedCountry;
      return matchesSearch && matchesPlan && matchesCountry;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const handleSort = (field: keyof typeof mockTableData[0]) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else setSortField(field);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Total API Calls</p>
                  <h3 className="text-3xl font-bold">{totalApiCalls.toLocaleString()}</h3>
                  <p className="text-blue-100 text-xs mt-2 flex items-center gap-1">
                    <TrendingUp size={12} /> +{apiGrowth}%
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Server size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Total Logins</p>
                  <h3 className="text-3xl font-bold">{totalLogins.toLocaleString()}</h3>
                  <p className="text-emerald-100 text-xs mt-2 flex items-center gap-1">
                    <TrendingUp size={12} /> +{loginGrowth}%
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <LogIn size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium mb-1">Active Users</p>
                  <h3 className="text-3xl font-bold">{totalActiveUsers}</h3>
                  <p className="text-violet-100 text-xs mt-2">Across tenants</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border hover:shadow-md transition-shadow bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Avg API/Tenant</p>
                  <h3 className="text-3xl font-bold">4,167</h3>
                  <p className="text-orange-100 text-xs mt-2">Per tenant average</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Activity size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      
        <Card className="border shadow-sm">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="text-primary" size={20} />
                Usage Trend Analysis
              </CardTitle>
              <Select value={chartType} onValueChange={(v: any) => setChartType(v)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Chart" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                {chartType === "area" ? (
                  <>
                    <Area 
                      type="monotone" 
                      dataKey="apiCalls" 
                      stroke="hsl(221 83% 53%)" 
                      fill="hsl(221 83% 53% / 0.2)" 
                      strokeWidth={2}
                      name="API Calls"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="logins" 
                      stroke="hsl(142 76% 36%)" 
                      fill="hsl(142 76% 36% / 0.2)" 
                      strokeWidth={2}
                      name="Logins"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="activeUsers" 
                      stroke="hsl(262 83% 58%)" 
                      fill="hsl(262 83% 58% / 0.2)" 
                      strokeWidth={2}
                      name="Active Users"
                    />
                  </>
                ) : (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="apiCalls" 
                      stroke="hsl(221 83% 53%)" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "hsl(221 83% 53%)" }}
                      name="API Calls"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="logins" 
                      stroke="hsl(142 76% 36%)" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "hsl(142 76% 36%)" }}
                      name="Logins"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activeUsers" 
                      stroke="hsl(262 83% 58%)" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "hsl(262 83% 58%)" }}
                      name="Active Users"
                    />
                  </>
                )}
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(0 72% 51%)" 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: "hsl(0 72% 51%)" }}
                  name="Target"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="text-primary" size={20} />
                Tenant-Wise Usage Details ({filteredData.length} results)
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
              <div className="flex items-center gap-2 mb-3">
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="text-sm font-medium mb-2 block">Country</label>
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
              </div>
            </div>
          
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    {["Tenant", "Plan", "API Calls", "Logins", "Active Users", "Country", "Avg Response", "Trend", "Last Active", "Status"].map((col) => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <td className="px-6 py-3 text-sm font-medium">{item.name}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.plan === "Premium" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          item.plan === "Standard" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                          {item.plan}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold text-primary">{item.apiCalls.toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm">{item.logins}</td>
                      <td className="px-6 py-3 text-sm">{item.activeUsers}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{item.country}</td>
                      <td className="px-6 py-3 text-sm font-mono text-xs">{item.avgResponseTime}</td>
                      <td className="px-6 py-3 text-sm">
                        {item.trend === "up" ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                            <ArrowUpRight size={14} /> Up
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                            <ArrowDownRight size={14} /> Down
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm flex items-center gap-1 text-muted-foreground">
                        <Clock size={14} /> {item.lastActive}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            item.status === "Active" 
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" 
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {item.status}
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


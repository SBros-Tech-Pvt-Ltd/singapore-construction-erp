"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Search, Download, Users, Clock, LogIn, LogOut, AlertTriangle, FileText, FileSpreadsheet, Activity, Unlock, Lock } from "lucide-react";

interface LoginRecord {
  id: number;
  userName: string;
  role: string;
  branch: string;
  loginTime: string;
  logoutTime: string;
  status: "active" | "logged-out" | "suspicious";
  duration: string;
  ipAddress: string;
}

export default function LoginUsageReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus] = useState("all");

  const [loginRecords] = useState<LoginRecord[]>([
    {
      id: 1,
      userName: "John Doe",
      role: "Manager",
      branch: "Nagercoil",
      loginTime: "09:12 AM",
      logoutTime: "06:00 PM",
      status: "logged-out",
      duration: "8h 48m",
      ipAddress: "192.168.1.100"
    },
    {
      id: 2,
      userName: "Mary Smith",
      role: "Administrator",
      branch: "Singapore",
      loginTime: "08:30 AM",
      logoutTime: "-",
      status: "active",
      duration: "10h 15m",
      ipAddress: "192.168.1.101"
    },
    {
      id: 3,
      userName: "David Chen",
      role: "User",
      branch: "Chennai",
      loginTime: "02:45 AM",
      logoutTime: "02:52 AM",
      status: "suspicious",
      duration: "7m",
      ipAddress: "45.123.67.89"
    },
    {
      id: 4,
      userName: "Sarah Williams",
      role: "Manager",
      branch: "Nagercoil",
      loginTime: "09:00 AM",
      logoutTime: "-",
      status: "active",
      duration: "9h 45m",
      ipAddress: "192.168.1.102"
    },
    {
      id: 5,
      userName: "Michael Brown",
      role: "User",
      branch: "Singapore",
      loginTime: "10:15 AM",
      logoutTime: "05:30 PM",
      status: "logged-out",
      duration: "7h 15m",
      ipAddress: "192.168.1.103"
    }
  ]);

  const branches = [
    { id: "all", name: "All Branches" },
    { id: "nagercoil", name: "Nagercoil" },
    { id: "singapore", name: "Singapore" },
    { id: "chennai", name: "Chennai" }
  ];

  const roles = [
    { id: "all", name: "All Roles" },
    { id: "admin", name: "Administrator" },
    { id: "manager", name: "Manager" },
    { id: "user", name: "User" }
  ];

  const filteredRecords = loginRecords.filter(record => {
    const matchesSearch = 
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBranch = selectedBranch === "all" || record.branch.toLowerCase() === selectedBranch;
    const matchesRole = selectedRole === "all" || record.role.toLowerCase() === selectedRole;
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;
    
    return matchesSearch && matchesBranch && matchesRole && matchesStatus;
  });

  const activeUsers = loginRecords.filter(r => r.status === "active").length;
  const totalLogins = loginRecords.length;
  const suspiciousActivities = loginRecords.filter(r => r.status === "suspicious").length;
  const avgDuration = "8h 24m";

  const handleExport = (format: string) => {
    alert(`Exporting ${filteredRecords.length} records as ${format.toUpperCase()}...`);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-700 border-green-300",
      "logged-out": "bg-gray-100 text-gray-700 border-gray-300",
      suspicious: "bg-red-100 text-red-700 border-red-300"
    };
    
    const icons = {
      active: <Unlock className="w-3 h-3" />,
      "logged-out": <Lock className="w-3 h-3" />,
      suspicious: <AlertTriangle className="w-3 h-3" />
    };
    
    const labels = {
      active: "Active",
      "logged-out": "Logged Out",
      suspicious: "Suspicious"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Users</p>
                <h3 className="text-3xl font-bold mt-2">{activeUsers}</h3>
                <p className="text-blue-100 text-xs mt-1">Currently logged in</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Logins</p>
                <h3 className="text-3xl font-bold mt-2">{totalLogins}</h3>
                <p className="text-green-100 text-xs mt-1">Today&apos;s sessions</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg Duration</p>
                <h3 className="text-3xl font-bold mt-2">{avgDuration}</h3>
                <p className="text-orange-100 text-xs mt-1">Per session</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Suspicious</p>
                <h3 className="text-3xl font-bold mt-2">{suspiciousActivities}</h3>
                <p className="text-pink-100 text-xs mt-1">Unusual activities</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Login Records ({filteredRecords.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
               <div className="mb-6 space-y-4">
            <div className="flex justify-end gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Activity size={16} className="mr-2" />
                Generate Report
              </Button>
              <Select onValueChange={(format) => handleExport(format)}>
                <SelectTrigger className="w-48 bg-green-600 text-white hover:bg-green-700 border-green-600">
                  <Download size={16} className="mr-2" />
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      Export as PDF
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet size={16} />
                      Export as CSV
                    </div>
                  </SelectItem>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet size={16} />
                      Export as Excel
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-1">
                <label className="text-sm font-medium text-gray-800 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search user, branch, IP..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Branch</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-gray-800">User</TableHead>
                  <TableHead className="font-semibold text-gray-800">Role</TableHead>
                  <TableHead className="font-semibold text-gray-800">Branch</TableHead>
                  <TableHead className="font-semibold text-gray-800">Login Time</TableHead>
                  <TableHead className="font-semibold text-gray-800">Logout Time</TableHead>
                  <TableHead className="font-semibold text-gray-800">Duration</TableHead>
                  <TableHead className="font-semibold text-gray-800">IP Address</TableHead>
                  <TableHead className="font-semibold text-gray-800">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-gray-600">
                      No login records found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow 
                      key={record.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-gray-800">
                        <div className="font-medium">{record.userName}</div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                          {record.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-800">{record.branch}</TableCell>
                      <TableCell className="text-gray-800">
                        <div className="flex items-center gap-2">
                          <LogIn className="w-4 h-4 text-green-600" />
                          {record.loginTime}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">
                        <div className="flex items-center gap-2">
                          {record.logoutTime !== "-" && <LogOut className="w-4 h-4 text-gray-600" />}
                          {record.logoutTime}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm font-medium">
                          {record.duration}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 font-mono">
                        {record.ipAddress}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
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
  );
}
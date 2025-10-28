"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Search, Download, Building2, Users, UserCheck, Smartphone, Activity, FileText, FileSpreadsheet, Unlock, Lock} from "lucide-react";

interface BranchSummary {
  id: number;
  branchName: string;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalDevices: number;
  status: "active" | "inactive";
  location: string;
  branchCode: string;
}

export default function BranchSummaryReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [branchSummaries] = useState<BranchSummary[]>([
    {
      id: 1,
      branchName: "Nagercoil",
      totalUsers: 15,
      activeUsers: 13,
      inactiveUsers: 2,
      totalDevices: 10,
      status: "active",
      location: "Tamil Nadu, India",
      branchCode: "BR001"
    },
    {
      id: 2,
      branchName: "Singapore",
      totalUsers: 10,
      activeUsers: 8,
      inactiveUsers: 2,
      totalDevices: 7,
      status: "active",
      location: "Singapore",
      branchCode: "BR002"
    },
    {
      id: 3,
      branchName: "Chennai",
      totalUsers: 12,
      activeUsers: 10,
      inactiveUsers: 2,
      totalDevices: 8,
      status: "active",
      location: "Tamil Nadu, India",
      branchCode: "BR003"
    },
    {
      id: 4,
      branchName: "Mumbai",
      totalUsers: 8,
      activeUsers: 0,
      inactiveUsers: 8,
      totalDevices: 5,
      status: "inactive",
      location: "Maharashtra, India",
      branchCode: "BR004"
    },
    {
      id: 5,
      branchName: "Bangalore",
      totalUsers: 18,
      activeUsers: 15,
      inactiveUsers: 3,
      totalDevices: 12,
      status: "active",
      location: "Karnataka, India",
      branchCode: "BR005"
    }
  ]);

  const statuses = [
    { id: "all", name: "All Status" },
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" }
  ];

  const filteredBranches = branchSummaries.filter(branch => {
    const matchesSearch = 
      branch.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.branchCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || branch.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalBranches = branchSummaries.length;
  const activeBranches = branchSummaries.filter(b => b.status === "active").length;
  const totalUsers = branchSummaries.reduce((sum, b) => sum + b.totalUsers, 0);
  const totalDevices = branchSummaries.reduce((sum, b) => sum + b.totalDevices, 0);
  const totalActiveUsers = branchSummaries.reduce((sum, b) => sum + b.activeUsers, 0);

  const handleExport = (format: string) => {
    alert(`Exporting ${filteredBranches.length} branch summaries as ${format.toUpperCase()}...`);
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300 flex items-center gap-1 w-fit">
          <Unlock className="w-3 h-3" />
          Active
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-300 flex items-center gap-1 w-fit">
        <Lock className="w-3 h-3" />
        Inactive
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Branches</p>
                <h3 className="text-3xl font-bold mt-2">{totalBranches}</h3>
                <p className="text-blue-100 text-xs mt-1">{activeBranches} Active</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Branches</p>
                <h3 className="text-3xl font-bold mt-2">{activeBranches}</h3>
                <p className="text-green-100 text-xs mt-1">Currently Operating</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Unlock className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Users</p>
                <h3 className="text-3xl font-bold mt-2">{totalUsers}</h3>
                <p className="text-purple-100 text-xs mt-1">All Branches</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Active Users</p>
                <h3 className="text-3xl font-bold mt-2">{totalActiveUsers}</h3>
                <p className="text-orange-100 text-xs mt-1">Currently Online</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Total Devices</p>
                <h3 className="text-3xl font-bold mt-2">{totalDevices}</h3>
                <p className="text-pink-100 text-xs mt-1">Connected</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Branch Summaries ({filteredBranches.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
              <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-800 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search branch name, location, code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="w-48">
                <label className="text-sm font-medium text-gray-800 mb-2 block">Branch Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-gray-800">Branch</TableHead>
                  <TableHead className="font-semibold text-gray-800">Location</TableHead>
                  <TableHead className="font-semibold text-gray-800">Total Users</TableHead>
                  <TableHead className="font-semibold text-gray-800">Active Users</TableHead>
                  <TableHead className="font-semibold text-gray-800">Inactive Users</TableHead>
                  <TableHead className="font-semibold text-gray-800">Devices</TableHead>
                  <TableHead className="font-semibold text-gray-800">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-600">
                      No branch summaries found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBranches.map((branch) => (
                    <TableRow 
                      key={branch.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-gray-800">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 font-semibold">
                            {branch.branchName}
                          </div>
                          <span className="text-xs text-gray-500 font-mono mt-1">{branch.branchCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">
                        <div className="flex items-center gap-2">
                          {branch.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{branch.totalUsers}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm font-semibold">
                            {branch.activeUsers}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm font-semibold">
                            {branch.inactiveUsers}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pink-50 text-pink-700 rounded text-sm font-semibold">
                            {branch.totalDevices}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(branch.status)}
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
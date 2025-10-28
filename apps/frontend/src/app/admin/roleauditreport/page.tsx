"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Search, Download, Shield, Calendar, ArrowRight, TrendingUp, Activity,FileText, FileSpreadsheet, AlertCircle, Users} from "lucide-react";

interface AuditRecord {
  id: number;
  userName: string;
  oldRole: string;
  newRole: string;
  updatedBy: string;
  date: string;
  branch: string;
  reason: string;
  changeType: "promotion" | "demotion" | "transfer";
}

export default function RoleAuditReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const [auditRecords] = useState<AuditRecord[]>([
    {
      id: 1,
      userName: "Sarah Williams",
      oldRole: "Staff",
      newRole: "Manager",
      updatedBy: "Admin",
      date: "2025-10-10",
      branch: "Nagercoil",
      reason: "Performance promotion",
      changeType: "promotion"
    },
    {
      id: 2,
      userName: "John Doe",
      oldRole: "Manager",
      newRole: "Administrator",
      updatedBy: "Super Admin",
      date: "2025-10-08",
      branch: "Singapore",
      reason: "Leadership transition",
      changeType: "promotion"
    },
    {
      id: 3,
      userName: "Michael Chen",
      oldRole: "Administrator",
      newRole: "Manager",
      updatedBy: "Super Admin",
      date: "2025-10-05",
      branch: "Chennai",
      reason: "Organizational restructure",
      changeType: "demotion"
    },
    {
      id: 4,
      userName: "Emily Davis",
      oldRole: "User",
      newRole: "Staff",
      updatedBy: "Manager",
      date: "2025-10-03",
      branch: "Nagercoil",
      reason: "Training completion",
      changeType: "promotion"
    },
    {
      id: 5,
      userName: "David Kumar",
      oldRole: "Manager",
      newRole: "Manager",
      updatedBy: "Admin",
      date: "2025-10-01",
      branch: "Singapore",
      reason: "Branch transfer",
      changeType: "transfer"
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
    { id: "administrator", name: "Administrator" },
    { id: "manager", name: "Manager" },
    { id: "staff", name: "Staff" },
    { id: "user", name: "User" }
  ];

  const filteredRecords = auditRecords.filter(record => {
    const matchesSearch = 
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.oldRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.newRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.updatedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBranch = selectedBranch === "all" || record.branch.toLowerCase() === selectedBranch;
    const matchesRole = selectedRole === "all" || 
      record.oldRole.toLowerCase() === selectedRole || 
      record.newRole.toLowerCase() === selectedRole;
    
    return matchesSearch && matchesBranch && matchesRole;
  });

  const totalChanges = auditRecords.length;
  const promotions = auditRecords.filter(r => r.changeType === "promotion").length;
  const demotions = auditRecords.filter(r => r.changeType === "demotion").length;
  const transfers = auditRecords.filter(r => r.changeType === "transfer").length;

  const handleExport = (format: string) => {
    alert(`Exporting ${filteredRecords.length} records as ${format.toUpperCase()}...`);
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      "Administrator": "bg-purple-100 text-purple-700 border-purple-300",
      "Manager": "bg-blue-100 text-blue-700 border-blue-300",
      "Staff": "bg-green-100 text-green-700 border-green-300",
      "User": "bg-gray-100 text-gray-700 border-gray-300"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role] || "bg-gray-100 text-gray-700"}`}>
        {role}
      </span>
    );
  };

  const getChangeTypeIcon = (type: string) => {
    const icons = {
      promotion: <TrendingUp className="w-4 h-4 text-green-600" />,
      demotion: <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />,
      transfer: <ArrowRight className="w-4 h-4 text-blue-600" />
    };
    
    return icons[type as keyof typeof icons];
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Total Changes</p>
                <h3 className="text-3xl font-bold mt-2">{totalChanges}</h3>
                <p className="text-indigo-100 text-xs mt-1">All time</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Promotions</p>
                <h3 className="text-3xl font-bold mt-2">{promotions}</h3>
                <p className="text-green-100 text-xs mt-1">Role upgrades</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Demotions</p>
                <h3 className="text-3xl font-bold mt-2">{demotions}</h3>
                <p className="text-orange-100 text-xs mt-1">Role downgrades</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <TrendingUp className="w-8 h-8 text-white rotate-180" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Transfers</p>
                <h3 className="text-3xl font-bold mt-2">{transfers}</h3>
                <p className="text-blue-100 text-xs mt-1">Branch moves</p>
              </div>
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Role Change History ({filteredRecords.length})
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-1">
                <label className="text-sm font-medium text-gray-800 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search user, role..."
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

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-gray-800">User</TableHead>
                  <TableHead className="font-semibold text-gray-800">Branch</TableHead>
                  <TableHead className="font-semibold text-gray-800">Old Role</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-center">Change</TableHead>
                  <TableHead className="font-semibold text-gray-800">New Role</TableHead>
                  <TableHead className="font-semibold text-gray-800">Updated By</TableHead>
                  <TableHead className="font-semibold text-gray-800">Date</TableHead>
                  <TableHead className="font-semibold text-gray-800">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-gray-600">
                      No audit records found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow 
                      key={record.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-gray-800">
                        <div className="flex items-center gap-2 font-medium">
                          {record.userName}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">{record.branch}</TableCell>
                      <TableCell>
                        {getRoleBadge(record.oldRole)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {getChangeTypeIcon(record.changeType)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(record.newRole)}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-600" />
                          {record.updatedBy}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          {record.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{record.reason}</span>
                        </div>
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
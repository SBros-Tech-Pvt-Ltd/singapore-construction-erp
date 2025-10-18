"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Eye, Unlock, Lock, Search, Filter, Download, UserCog } from "lucide-react";
import AddBranchForm from "@/components/forms/addbranchform"; 

interface Branch {
  id: number;
  name: string;
  code: string;
  location: string;
  status: "active" | "suspended";
  admin: string;
  adminId: number | null;
  userCount: number;
 }

export default function BranchManagementPage() {
  const [branches, setBranches] = useState<Branch[]>([
    { 
      id: 1, 
      name: "Head Office", 
      code: "BR001", 
      location: "Nagercoil", 
      status: "active", 
      admin: "John Doe",
      adminId: 101,
      userCount: 45
    },
    { 
      id: 2, 
      name: "Singapore Branch", 
      code: "BR002", 
      location: "Singapore", 
      status: "active", 
      admin: "Mary Smith",
      adminId: 102,
      userCount: 28
    },
    { 
      id: 3, 
      name: "Chennai Office", 
      code: "BR003", 
      location: "Chennai", 
      status: "suspended", 
      admin: "Not Assigned",
      adminId: null,
      userCount: 0
    },
  ]);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const admins = [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Mary Smith" },
    { id: 103, name: "David Chen" },
    { id: 104, name: "Sarah Williams" },
    { id: 105, name: "Michael Brown" }
  ];

  const handleAddBranch = (branch: Branch) => {
    setBranches([...branches, branch]);
    setIsAddOpen(false);
  };

  const handleToggleStatus = (id: number) => {
    setBranches(
      branches.map((b) =>
        b.id === id ? { ...b, status: b.status === "active" ? "suspended" : "active" } : b
      )
    );
  };

  const handleAssignAdmin = () => {
    if (!selectedBranch || !selectedAdmin) return;
    
    const adminObj = admins.find(a => a.name === selectedAdmin);
    
    setBranches(
      branches.map((b) =>
        b.id === selectedBranch.id 
          ? { ...b, admin: selectedAdmin, adminId: adminObj?.id || null } 
          : b
      )
    );
    setIsAdminOpen(false);
    setSelectedAdmin("");
  };

  const handleDeleteBranch = (id: number) => {
    if (confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter((b) => b.id !== id));
    }
  };

  const filteredBranches = branches.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.admin.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen w-full max-w-[95vw] mx-auto">
      <Card className="shadow-lg w-full">
        <CardContent className="p-6 w-full">
             <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full">
            <div className="flex-1 relative min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, code, location, or admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus size={16} className="mr-2" /> Add Branch
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Add New Branch</DialogTitle>
                  </DialogHeader>
                  <AddBranchForm 
                    admins={admins}
                    onAddBranch={handleAddBranch}
                    onCancel={() => setIsAddOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
             <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[60px]">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[180px]">Branch Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[120px]">Code</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[150px]">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[180px]">Admin</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[100px]">Users</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[120px]">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 min-w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      No branches found matching your search criteria
                    </td>
                  </tr>
                ) : (
                  filteredBranches.map((b, i) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">
                        {b.code}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                         {b.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${b.adminId ? "text-gray-900" : "text-gray-400 italic"}`}>
                          {b.admin}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-pink-50 text-pink-700 rounded text-xs font-semibold">
                        {b.userCount}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          b.status === "active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status === "active" ? "● Active" : "● Suspended"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedBranch(b);
                            setIsDetailsOpen(true);
                          }}
                          className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedBranch(b);
                            setSelectedAdmin(b.admin !== "Not Assigned" ? b.admin : "");
                            setIsAdminOpen(true);
                          }}
                          className="hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
                          title="Assign Admin"
                        >
                          <UserCog size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(b.id)}
                          className={b.status === "active" 
                            ? "hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                            : "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                          }
                          title={b.status === "active" ? "Suspend Branch" : "Activate Branch"}
                        >
                          {b.status === "active" ? <Lock size={14} /> : <Unlock size={14} />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteBranch(b.id)}
                          className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                          title="Delete Branch"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Branch Details</DialogTitle>
          </DialogHeader>
          {selectedBranch && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium">Branch Name</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">{selectedBranch.name}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs text-green-600 font-medium">Branch Code</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">{selectedBranch.code}</p>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-xs text-orange-600 font-medium">Location</p>
                <p className="text-lg font-bold text-gray-800 mt-1 flex items-center gap-2">
                  {selectedBranch.location}
                </p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-xs text-pink-600 font-medium">Branch Administrator</p>
                <p className="text-lg font-bold text-gray-800 mt-1 flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  {selectedBranch.admin}
                  {selectedBranch.adminId && (
                    <span className="text-xs text-gray-500">(ID: {selectedBranch.adminId})</span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-xs text-purple-600 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{selectedBranch.userCount}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                selectedBranch.status === "active" ? "bg-green-50" : "bg-red-50"
              }`}>
                <p className={`text-xs font-medium ${
                  selectedBranch.status === "active" ? "text-green-600" : "text-red-600"
                }`}>
                  Current Status
                </p>
                <p className={`text-lg font-bold mt-1 ${
                  selectedBranch.status === "active" ? "text-green-700" : "text-red-700"
                }`}>
                  {selectedBranch.status.toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Assign Branch Administrator</DialogTitle>
          </DialogHeader>
          {selectedBranch && (
            <div className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Branch</p>
                <p className="text-lg font-bold text-gray-800">{selectedBranch.name}</p>
                <p className="text-sm text-gray-500">{selectedBranch.code} • {selectedBranch.location}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Administrator</label>
                <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an administrator" />
                  </SelectTrigger>
                  <SelectContent>
                    {admins.map(admin => (
                      <SelectItem key={admin.id} value={admin.name}>
                        {admin.name} (ID: {admin.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAssignAdmin} 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={!selectedAdmin}
              >
                Assign Administrator
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
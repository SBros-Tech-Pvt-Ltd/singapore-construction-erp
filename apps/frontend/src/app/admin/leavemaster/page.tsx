"use client";

import React, { useState } from 'react';
import { Search, Plus, Upload, Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LeaveTypeForm, LeaveTypeFormData } from '@/components/forms/leave-type-form';
import { ImportTemplate } from '@/components/forms/import-template';

interface LeaveType {
  id: number;
  leaveType: string;
  leaveCode: string;
  annualQuota: number;
  carryForward: boolean;
  encashable: boolean;
  requiresApproval: boolean;
  maxConsecutive: number;
  status: boolean;
  branches: string[];
  usedBy: number;
}

const LeaveTypeMaster = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    {
      id: 1,
      leaveType: 'Casual Leave',
      leaveCode: 'CL',
      annualQuota: 12,
      carryForward: true,
      encashable: false,
      requiresApproval: true,
      maxConsecutive: 3,
      status: true,
      branches: ['Head Office', 'Site A', 'Site B'],
      usedBy: 145
    },
    {
      id: 2,
      leaveType: 'Sick Leave',
      leaveCode: 'SL',
      annualQuota: 10,
      carryForward: false,
      encashable: false,
      requiresApproval: false,
      maxConsecutive: 5,
      status: true,
      branches: ['Head Office', 'Site A', 'Site B', 'Site C'],
      usedBy: 145
    },
    {
      id: 3,
      leaveType: 'Earned Leave',
      leaveCode: 'EL',
      annualQuota: 21,
      carryForward: true,
      encashable: true,
      requiresApproval: true,
      maxConsecutive: 15,
      status: true,
      branches: ['Head Office', 'Site A'],
      usedBy: 132
    },
    {
      id: 4,
      leaveType: 'Maternity Leave',
      leaveCode: 'ML',
      annualQuota: 180,
      carryForward: false,
      encashable: false,
      requiresApproval: true,
      maxConsecutive: 180,
      status: true,
      branches: ['Head Office', 'Site A', 'Site B'],
      usedBy: 8
    },
    {
      id: 5,
      leaveType: 'Paternity Leave',
      leaveCode: 'PL',
      annualQuota: 15,
      carryForward: false,
      encashable: false,
      requiresApproval: true,
      maxConsecutive: 15,
      status: true,
      branches: ['Head Office'],
      usedBy: 12
    },
    {
      id: 6,
      leaveType: 'Compensatory Off',
      leaveCode: 'CO',
      annualQuota: 24,
      carryForward: false,
      encashable: true,
      requiresApproval: false,
      maxConsecutive: 2,
      status: false,
      branches: ['Site A', 'Site B'],
      usedBy: 0
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState<LeaveType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isImportOpen, setIsImportOpen] = useState(false);

  const branchOptions = ['Head Office', 'Site A', 'Site B', 'Site C'];
  const statusOptions = ['Active', 'Inactive'];

  const filteredLeaveTypes = leaveTypes.filter(leave => {
    const matchesSearch = leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.leaveCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === 'All' || leave.branches.includes(filterBranch);
    const matchesStatus = filterStatus === 'All' || 
                         (filterStatus === 'Active' && leave.status) || 
                         (filterStatus === 'Inactive' && !leave.status);
    return matchesSearch && matchesBranch && matchesStatus;
  });


  const handleImportData = (importedData: any[]) => {
   const newLeaveTypes: LeaveType[] = importedData.map((item, index) => ({
    id: Math.max(...leaveTypes.map(lt => lt.id)) + index + 1,
    leaveType: item.leaveType,
    leaveCode: item.leaveCode,
    annualQuota: parseInt(item.annualQuota) || 0,
    carryForward: item.carryForward?.toString().toLowerCase() === 'true' || item.carryForward === 'Yes',
    encashable: item.encashable?.toString().toLowerCase() === 'true' || item.encashable === 'Yes',
    requiresApproval: item.requiresApproval?.toString().toLowerCase() === 'true' || item.requiresApproval === 'Yes',
    maxConsecutive: parseInt(item.maxConsecutive) || 0,
    status: item.status?.toString().toLowerCase() === 'true' || item.status === 'Active',
    branches: item.branches?.split(',').map((b: string) => b.trim()) || [],
    usedBy: 0
  }));

  setLeaveTypes([...leaveTypes, ...newLeaveTypes]);
  setIsImportOpen(false);
};


  const handleEdit = (leave: LeaveType) => {
    setEditingLeaveType(leave);
    setIsFormOpen(true);
  };


  const handleFormSubmit = (formData: LeaveTypeFormData) => {
    if (editingLeaveType) {
      setLeaveTypes(leaveTypes.map(l => 
        l.id === editingLeaveType.id ? { ...l, ...formData } : l
      ));
    } else {
      setLeaveTypes([...leaveTypes, { 
        id: leaveTypes.length + 1, 
        ...formData,
        usedBy: 0
      }]);
    }
    setIsFormOpen(false);
    setEditingLeaveType(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingLeaveType(null);
  };

  const handleAddNew = () => {
    setEditingLeaveType(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
 
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search leave types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10"/>
                </div>

                <Select value={filterBranch} onValueChange={setFilterBranch}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Branches</SelectItem>
                    {branchOptions.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-3 w-full lg:w-auto">
                <Button 
                  variant="outline" 
                  className="gap-2 flex-1 sm:flex-initial"
                  onClick={() => setIsImportOpen(true)}>
                 <Upload className="w-4 h-4" />
                 <span className="hidden sm:inline">Import</span>
                </Button>
                
                <Button
                  onClick={handleAddNew}
                  className="gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 flex-1 sm:flex-initial">
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-700 dark:to-gray-700">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Leave Type
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Code
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Annual Quota
                  </TableHead>
                 
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Branches
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Used By
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Status
                  </TableHead>
                  <TableHead className="text-center text-gray-700 dark:text-gray-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaveTypes.map((leave) => (
                  <TableRow key={leave.id} className="hover:bg-rose-50/50 dark:hover:bg-gray-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                       
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{leave.leaveType}</div>
                         
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-mono font-semibold">
                        {leave.leaveCode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        
                        <span className="text-gray-900 dark:text-white font-semibold">{leave.annualQuota}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">days/year</span>
                      </div>
                    </TableCell>
                   
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {leave.branches.slice(0, 2).map((branch, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {branch}
                          </Badge>
                        ))}
                        {leave.branches.length > 2 && (
                          <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                            +{leave.branches.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{leave.usedBy}</span>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={leave.status}
                        onCheckedChange={() => {
                          setLeaveTypes(leaveTypes.map(l =>
                            l.id === leave.id ? { ...l, status: !l.status } : l
                          ));
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                          title="View Document">
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(leave)}
                          className="text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30">
                          <Edit2 className="w-5 h-5" />
                        </Button>
                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <LeaveTypeForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          editingLeaveType={editingLeaveType}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}/>

        <ImportTemplate
          open={isImportOpen}
          onOpenChange={setIsImportOpen}
          templateType="leave"
          onImport={handleImportData}/>
      </div>
    </div>
  );
};

export default LeaveTypeMaster;
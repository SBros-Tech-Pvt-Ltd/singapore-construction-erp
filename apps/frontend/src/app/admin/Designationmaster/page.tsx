"use client";

import React, { useState } from 'react';
import { Search, Plus, Upload, Download, Edit2, Building2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DesignationForm, DesignationFormData } from '@/components/forms/designationform';
import { ImportTemplate } from '@/components/forms/import-template';

interface Designation {
  id: number;
  title: string;
  department: string;
  level: 'Junior' | 'Mid' | 'Senior';
  reportingTo: string;
  status: boolean;
  employeeCount: number;
}

const DesignationMaster = () => {
  const [designations, setDesignations] = useState<Designation[]>([
    {
      id: 1,
      title: 'HR Manager',
      department: 'Human Resources',
      level: 'Senior',
      reportingTo: 'Director',
      status: true,
      employeeCount: 3
    },
    {
      id: 2,
      title: 'Senior Accountant',
      department: 'Accounts',
      level: 'Senior',
      reportingTo: 'Finance Manager',
      status: true,
      employeeCount: 5
    },
    {
      id: 3,
      title: 'Software Engineer',
      department: 'Operations',
      level: 'Mid',
      reportingTo: 'Technical Lead',
      status: true,
      employeeCount: 12
    },
    {
      id: 4,
      title: 'Junior Accountant',
      department: 'Accounts',
      level: 'Junior',
      reportingTo: 'Senior Accountant',
      status: true,
      employeeCount: 3
    },
    {
      id: 5,
      title: 'Operations Officer',
      department: 'Operations',
      level: 'Junior',
      reportingTo: 'Operations Manager',
      status: false,
      employeeCount: 0
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterDepartment, setFilterDepartment] = useState<string>('All');

  const departments = ['Human Resources', 'Accounts', 'Operations', 'Finance', 'IT'];
  const levels = ['Junior', 'Mid', 'Senior'];

  const filteredDesignations = designations.filter(designation => {
    const matchesSearch = designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designation.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'All' || designation.level === filterLevel;
    const matchesDepartment = filterDepartment === 'All' || designation.department === filterDepartment;
    return matchesSearch && matchesLevel && matchesDepartment;
  });

  const [isImportOpen, setIsImportOpen] = useState(false);

  const handleImportData = (importedData: any[]) => {
  const newDesignations: Designation[] = importedData.map((item, index) => ({
    id: Math.max(0, ...designations.map(d => d.id)) + index + 1,
    title: item.title || '',
    department: item.department || '',
    level: (item.level as 'Junior' | 'Mid' | 'Senior') || 'Junior',
    reportingTo: item.reportingTo || '',
    status: item.status?.toString().toLowerCase() === 'true' || item.status === 'Active' || item.status === 'Yes',
    employeeCount: 0
  }));

  setDesignations([...designations, ...newDesignations]);
  setIsImportOpen(false);
};

  const handleEdit = (designation: Designation) => {
    setEditingDesignation(designation);
    setIsFormOpen(true);
  };

 
  const handleFormSubmit = (formData: DesignationFormData) => {
    if (editingDesignation) {
      setDesignations(designations.map(d => 
        d.id === editingDesignation.id ? { ...d, ...formData } : d
      ));
    } else {
      setDesignations([...designations, { 
        id: designations.length + 1, 
        ...formData,
        employeeCount: 0
      }]);
    }
    setIsFormOpen(false);
    setEditingDesignation(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingDesignation(null);
  };

  const handleAddNew = () => {
    setEditingDesignation(null);
    setIsFormOpen(true);
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Senior': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Mid': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Junior': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
      
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search designations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10"/>
                </div>

                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
                
                <Button variant="outline" className="gap-2 flex-1 sm:flex-initial">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                
                <Button
                  onClick={handleAddNew}
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1 sm:flex-initial">
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
              <TableHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Designation
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Department
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Level
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Reporting To
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Employees
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
                {filteredDesignations.map((designation) => (
                  <TableRow key={designation.id} className="hover:bg-purple-50/50 dark:hover:bg-gray-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        
                        <span className="font-medium text-gray-900 dark:text-white">{designation.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{designation.department}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getLevelColor(designation.level)}>
                        {designation.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700 dark:text-gray-300">{designation.reportingTo}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700 dark:text-gray-300">{designation.employeeCount}</span>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={designation.status}
                        onCheckedChange={() => {
                          setDesignations(designations.map(d =>
                            d.id === designation.id ? { ...d, status: !d.status } : d
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
                          onClick={() => handleEdit(designation)}
                          className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30">
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

        <DesignationForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          editingDesignation={editingDesignation}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}/>

        <ImportTemplate
          open={isImportOpen}
          onOpenChange={setIsImportOpen}
          templateType="designation"
          onImport={handleImportData}/>
      </div>
    </div>
  );
};

export default DesignationMaster;
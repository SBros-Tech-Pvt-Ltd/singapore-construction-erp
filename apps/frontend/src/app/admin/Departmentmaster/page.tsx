"use client";

import React, { useState } from 'react';
import { Search, Plus, Upload, Download, Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { DepartmentForm, DepartmentFormData } from '@/components/forms/departmentform';
import { ImportTemplate } from '@/components/forms/import-template';

interface Department {
  id: number;
  name: string;
  code: string;
  hod: string;
  status: boolean;
  branches: string[];
  employees: number;
}

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'Human Resources',
      code: 'HR01',
      hod: 'John Smith',
      status: true,
      branches: ['Head Office', 'Site A'],
      employees: 12
    },
    {
      id: 2,
      name: 'Accounts',
      code: 'ACC01',
      hod: 'Sarah Johnson',
      status: true,
      branches: ['Head Office', 'Site A', 'Site B'],
      employees: 8
    },
    {
      id: 3,
      name: 'Operations',
      code: 'OPS01',
      hod: 'Mike Davis',
      status: true,
      branches: ['Site A', 'Site B'],
      employees: 25
    },
    {
      id: 4,
      name: 'Finance',
      code: 'FIN01',
      hod: 'Emily Brown',
      status: false,
      branches: ['Head Office'],
      employees: 5
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: DepartmentFormData) => {
    if (editingDepartment) {
      setDepartments(departments.map(d => 
        d.id === editingDepartment.id ? { ...d, ...formData } : d
      ));
    } else {
      setDepartments([...departments, { 
        id: departments.length + 1, 
        ...formData,
        employees: 0
      }]);
    }
    setIsFormOpen(false);
    setEditingDepartment(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingDepartment(null);
  };

  const handleAddNew = () => {
    setEditingDepartment(null);
    setIsFormOpen(true);
  };

  const [isImportOpen, setIsImportOpen] = useState(false);

  const handleImportData = (importedData: any[]) => {
  const newDepartments: Department[] = importedData.map((item, index) => ({
    id: Math.max(0, ...departments.map(d => d.id)) + index + 1,
    name: item.name || '',
    code: item.code || '',
    hod: item.hod || '',
    status: item.status?.toString().toLowerCase() === 'true' || item.status === 'Active' || item.status === 'Yes',
    branches: item.branches?.split(',').map((b: string) => b.trim()) || [],
    employees: 0
  }));

  setDepartments([...departments, ...newDepartments]);
  setIsImportOpen(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
      
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"/>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button 
                    variant="outline" 
                    className="gap-2 flex-1 sm:flex-initial"
                    onClick={() => setIsImportOpen(true)}>
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Import</span>
                </Button>
                
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                
                <Button
                  onClick={handleAddNew}
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
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
              <TableHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Department
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Code
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    HOD
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Branches
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
                {filteredDepartments.map((dept) => (
                  <TableRow key={dept.id} className="hover:bg-indigo-50/50 dark:hover:bg-gray-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        
                        <span className="font-medium text-gray-900 dark:text-white">{dept.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                     
                        {dept.code}
                     
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700 dark:text-gray-300">{dept.hod}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {dept.branches.map((branch, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                            {branch}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 dark:text-gray-300">{dept.employees}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={dept.status}
                        onCheckedChange={() => {
                          setDepartments(departments.map(d =>
                            d.id === dept.id ? { ...d, status: !d.status } : d
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
                          onClick={() => handleEdit(dept)}
                          className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
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

        <DepartmentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          editingDepartment={editingDepartment}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}/>

        <ImportTemplate
           open={isImportOpen}
           onOpenChange={setIsImportOpen}
           templateType="department"
           onImport={handleImportData}/>
      </div>
    </div>
  );
};

export default DepartmentMaster;
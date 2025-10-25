"use client";

import React, { useState } from 'react';
import { Search, Plus, Upload, Download, Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShiftForm, ShiftFormData } from '@/components/forms/shiftform';
import { ImportTemplate } from '@/components/forms/import-template';

interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  type: 'Fixed' | 'Rotational';
  gracePeriod: number;
  breakDuration: number;
  branches: string[];
  status: boolean;
  employeeCount: number;
}

const ShiftMaster = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 1,
      name: 'Day Shift',
      startTime: '09:00',
      endTime: '18:00',
      type: 'Fixed',
      gracePeriod: 15,
      breakDuration: 60,
      branches: ['Head Office', 'Site A'],
      status: true,
      employeeCount: 45
    },
    {
      id: 2,
      name: 'Night Shift',
      startTime: '22:00',
      endTime: '06:00',
      type: 'Fixed',
      gracePeriod: 10,
      breakDuration: 45,
      branches: ['Site B', 'Site C'],
      status: true,
      employeeCount: 28
    },
    {
      id: 3,
      name: 'General Shift',
      startTime: '08:00',
      endTime: '17:00',
      type: 'Fixed',
      gracePeriod: 15,
      breakDuration: 60,
      branches: ['Head Office', 'Site A', 'Site B'],
      status: true,
      employeeCount: 62
    },
    {
      id: 4,
      name: 'Rotational Shift A',
      startTime: '06:00',
      endTime: '14:00',
      type: 'Rotational',
      gracePeriod: 10,
      breakDuration: 30,
      branches: ['Site A', 'Site C'],
      status: true,
      employeeCount: 18
    },
    {
      id: 5,
      name: 'Evening Shift',
      startTime: '14:00',
      endTime: '22:00',
      type: 'Fixed',
      gracePeriod: 15,
      breakDuration: 45,
      branches: ['Site B'],
      status: false,
      employeeCount: 0
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const shiftTypes = ['Fixed', 'Rotational'];

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || shift.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: ShiftFormData) => {
    if (editingShift) {
      setShifts(shifts.map(s => 
        s.id === editingShift.id ? { ...s, ...formData } : s
      ));
    } else {
      setShifts([...shifts, { 
        id: shifts.length + 1, 
        ...formData,
        employeeCount: 0
      }]);
    }
    setIsFormOpen(false);
    setEditingShift(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingShift(null);
  };

  const handleAddNew = () => {
    setEditingShift(null);
    setIsFormOpen(true);
  };

  const getTypeColor = (type: string) => {
    return type === 'Fixed' 
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
  };

const [isImportOpen, setIsImportOpen] = useState(false);

const handleImportData = (importedData: any[]) => {
  const newShifts: Shift[] = importedData.map((item, index) => ({
    id: Math.max(0, ...shifts.map(s => s.id)) + index + 1,
    name: item.name || '',
    startTime: item.startTime || '',
    endTime: item.endTime || '',
    type: (item.type as 'Fixed' | 'Rotational') || 'Fixed',
    gracePeriod: parseInt(item.gracePeriod) || 15,
    breakDuration: parseInt(item.breakDuration) || 60,
    branches: item.branches?.split(',').map((b: string) => b.trim()) || [],
    status: item.status?.toString().toLowerCase() === 'true' || item.status === 'Active' || item.status === 'Yes',
    employeeCount: 0
  }));

  setShifts([...shifts, ...newShifts]);
  setIsImportOpen(false);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
  
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search shifts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10"/>
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    {shiftTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
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
                  className="gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 flex-1 sm:flex-initial">
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
              <TableHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-700">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Shift Name
                  </TableHead>
                 <TableHead className="text-gray-700 dark:text-gray-300">
                    Timing
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Type
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Grace Period
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Break Duration
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Branches
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
                {filteredShifts.map((shift) => (
                  <TableRow key={shift.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                         <div>
                          <div className="font-medium text-gray-900 dark:text-white">{shift.name}</div>
                         </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-gray-900 dark:text-white font-medium">
                        {shift.startTime} - {shift.endTime}
                       </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className={getTypeColor(shift.type)}>
                        {shift.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{shift.gracePeriod}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">mins</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{shift.breakDuration}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">mins</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {shift.branches.slice(0, 2).map((branch, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">
                            {branch}
                          </Badge>
                        ))}
                        {shift.branches.length > 2 && (
                          <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                            +{shift.branches.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={shift.status}
                        onCheckedChange={() => {
                          setShifts(shifts.map(s =>
                            s.id === shift.id ? { ...s, status: !s.status } : s
                          ));
                        }}/>
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
                          onClick={() => handleEdit(shift)}
                          className="text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30">
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

        <ShiftForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          editingShift={editingShift}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}/>
          
        <ImportTemplate
          open={isImportOpen}
          onOpenChange={setIsImportOpen}
          templateType="shift"
          onImport={handleImportData}/>
      </div>
    </div>
  );
};

export default ShiftMaster;
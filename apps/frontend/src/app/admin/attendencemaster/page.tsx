"use client";

import React, { useState } from 'react';
import { Search, Plus, Upload, Download, Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { AttendanceRuleForm, AttendanceRuleFormData } from '@/components/forms/attendenceruleform';
import { ImportTemplate } from '@/components/forms/import-template';

interface AttendanceRule {
  id: number;
  ruleName: string;
  gracePeriod: number;
  halfDayHours: number;
  lateMarkCount: number;
  holidayRule: boolean;
  overtimeRule: string;
  status: boolean;
  appliedTo: number;
}

const AttendanceRuleMaster = () => {
  const [rules, setRules] = useState<AttendanceRule[]>([
    {
      id: 1,
      ruleName: 'Standard Rule',
      gracePeriod: 15,
      halfDayHours: 4,
      lateMarkCount: 3,
      holidayRule: true,
      overtimeRule: 'Standard 1.5x rate after 8 hours',
      status: true,
      appliedTo: 85
    },
    {
      id: 2,
      ruleName: 'Flexible Rule',
      gracePeriod: 30,
      halfDayHours: 5,
      lateMarkCount: 5,
      holidayRule: true,
      overtimeRule: 'Flexible comp-off or 2x rate on weekends',
      status: true,
      appliedTo: 42
    },
    {
      id: 3,
      ruleName: 'Shift Workers Rule',
      gracePeriod: 10,
      halfDayHours: 4,
      lateMarkCount: 2,
      holidayRule: false,
      overtimeRule: '2x rate for all overtime hours',
      status: true,
      appliedTo: 28
    },
    {
      id: 4,
      ruleName: 'Contract Workers Rule',
      gracePeriod: 5,
      halfDayHours: 3,
      lateMarkCount: 1,
      holidayRule: false,
      overtimeRule: 'No overtime applicable',
      status: false,
      appliedTo: 0
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AttendanceRule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRules = rules.filter(rule =>
    rule.ruleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (rule: AttendanceRule) => {
    setEditingRule(rule);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: AttendanceRuleFormData) => {
    if (editingRule) {
      setRules(rules.map(r => 
        r.id === editingRule.id ? { ...r, ...formData } : r
      ));
    } else {
      setRules([...rules, { 
        id: rules.length + 1, 
        ...formData,
        appliedTo: 0
      }]);
    }
    setIsFormOpen(false);
    setEditingRule(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingRule(null);
  };

  const handleAddNew = () => {
    setEditingRule(null);
    setIsFormOpen(true);
  };

  const [isImportOpen, setIsImportOpen] = useState(false);

  const handleImportData = (importedData: any[]) => {
  const newRules = importedData.map((item, index) => ({
    id: Math.max(0, ...rules.map(r => r.id)) + index + 1,
    ruleName: item.ruleName || '',
    gracePeriod: parseInt(item.gracePeriod) || 15,
    halfDayHours: parseInt(item.halfDayHours) || 4,
    lateMarkCount: parseInt(item.lateMarkCount) || 3,
    holidayRule:
      item.holidayRule?.toString().toLowerCase() === 'true' ||
      item.holidayRule === 'Yes',
    overtimeRule: item.overtimeRule || '',
    status:
      item.status?.toString().toLowerCase() === 'true' ||
      item.status === 'Active' ||
      item.status === 'Yes',
    appliedTo: 0,
  }));

  setRules([...rules, ...newRules]);
  setIsImportOpen(false);
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search attendance rules..."
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
                  className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
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
              <TableHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-700">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Rule Name
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Grace Period
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Half Day Rule
                  </TableHead>
                  
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Applied To
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
                {filteredRules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-emerald-50/50 dark:hover:bg-gray-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{rule.ruleName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-white font-medium">{rule.gracePeriod}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">mins</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-700 dark:text-gray-300">
                        After <span className="font-semibold text-emerald-600 dark:text-emerald-400">{rule.halfDayHours}</span> hours
                      </div>
                    </TableCell>
                   
                    <TableCell>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{rule.appliedTo}</span>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={rule.status}
                        onCheckedChange={() => {
                          setRules(rules.map(r =>
                            r.id === rule.id ? { ...r, status: !r.status } : r
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
                          onClick={() => handleEdit(rule)}
                          className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30">
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

        <AttendanceRuleForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          editingRule={editingRule}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}/>

          <ImportTemplate
            open={isImportOpen}
            onOpenChange={setIsImportOpen}
            templateType="attendance"
            onImport={handleImportData}/>
      </div>
    </div>
  );
};

export default AttendanceRuleMaster;
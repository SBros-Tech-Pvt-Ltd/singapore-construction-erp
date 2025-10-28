"use client";

import React, { useState } from 'react';
import { Search, Plus, Upload, Download, Edit2, Eye} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyPolicyForm, CompanyPolicyFormData } from '@/components/forms/companypolicyform';
import { ImportTemplate } from '@/components/forms/import-template';

interface CompanyPolicy {
  id: number;
  policyName: string;
  category: string;
  document: string;
  version: string;
  effectiveDate: string;
  mandatoryRead: boolean;
  status: 'Published' | 'Draft';
  acknowledgments: number;
  totalEmployees: number;
}

const CompanyPolicyMaster = () => {
  const [policies, setPolicies] = useState<CompanyPolicy[]>([
    {
      id: 1,
      policyName: 'Code of Conduct',
      category: 'HR',
      document: 'code_of_conduct_v2.pdf',
      version: 'v2.0',
      effectiveDate: '2024-01-01',
      mandatoryRead: true,
      status: 'Published',
      acknowledgments: 142,
      totalEmployees: 145
    },
    {
      id: 2,
      policyName: 'Leave Policy',
      category: 'HR',
      document: 'leave_policy_v1.pdf',
      version: 'v1.5',
      effectiveDate: '2024-03-15',
      mandatoryRead: true,
      status: 'Published',
      acknowledgments: 138,
      totalEmployees: 145
    },
    {
      id: 3,
      policyName: 'Expense Reimbursement',
      category: 'Finance',
      document: 'expense_policy_v3.pdf',
      version: 'v3.0',
      effectiveDate: '2024-06-01',
      mandatoryRead: true,
      status: 'Published',
      acknowledgments: 125,
      totalEmployees: 145
    },
    {
      id: 4,
      policyName: 'Remote Work Policy',
      category: 'Operations',
      document: 'remote_work_v1.pdf',
      version: 'v1.0',
      effectiveDate: '2024-02-01',
      mandatoryRead: false,
      status: 'Published',
      acknowledgments: 98,
      totalEmployees: 145
    },
    {
      id: 5,
      policyName: 'Data Privacy Policy',
      category: 'Operations',
      document: 'data_privacy_draft.pdf',
      version: 'v2.0',
      effectiveDate: '2024-12-01',
      mandatoryRead: true,
      status: 'Draft',
      acknowledgments: 0,
      totalEmployees: 145
    },
    {
      id: 6,
      policyName: 'Travel Policy',
      category: 'Finance',
      document: 'travel_policy_v1.pdf',
      version: 'v1.2',
      effectiveDate: '2024-04-10',
      mandatoryRead: false,
      status: 'Published',
      acknowledgments: 87,
      totalEmployees: 145
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<CompanyPolicy | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const categories = ['HR', 'Finance', 'Operations', 'IT', 'Legal'];
  const statuses = ['Published', 'Draft'];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.policyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || policy.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || policy.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (policy: CompanyPolicy) => {
    setEditingPolicy(policy);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: CompanyPolicyFormData) => {
    if (editingPolicy) {
      setPolicies(policies.map(p => 
        p.id === editingPolicy.id ? { ...p, ...formData } : p
      ));
    } else {
      setPolicies([...policies, { 
        id: policies.length + 1, 
        ...formData,
        acknowledgments: 0,
        totalEmployees: 145
      }]);
    }
    setIsFormOpen(false);
    setEditingPolicy(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingPolicy(null);
  };

  const handleAddNew = () => {
    setEditingPolicy(null);
    setIsFormOpen(true);
  };

const [isImportOpen, setIsImportOpen] = useState(false);

const handleImportData = (importedData: any[]) => {
  const newPolicies: CompanyPolicy[] = importedData.map((item, index) => ({
    id: Math.max(0, ...policies.map(p => p.id)) + index + 1,
    policyName: item.policyName || '',
    category: item.category || '',
    document: item.document || '',
    version: item.version || 'v1.0',
    effectiveDate: item.effectiveDate || '',
    mandatoryRead: item.mandatoryRead?.toString().toLowerCase() === 'true' || item.mandatoryRead === 'Yes',
    status: (item.status as 'Published' | 'Draft') || 'Draft',
    acknowledgments: 0,
    totalEmployees: 145
  }));

  setPolicies([...policies, ...newPolicies]);
  setIsImportOpen(false);
};


  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'HR': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Finance': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Operations': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'IT': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300';
      case 'Legal': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Published' 
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10"/>
                </div>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    {statuses.map((status) => (
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
                
                <Button variant="outline" className="gap-2 flex-1 sm:flex-initial">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                
                <Button
                  onClick={handleAddNew}
                  className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 flex-1 sm:flex-initial">
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
              <TableHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
                <TableRow>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Policy Name
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Category
                  </TableHead>
                  
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Version
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">
                    Effective Date
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
                {filteredPolicies.map((policy) => (
                  <TableRow key={policy.id} className="hover:bg-violet-50/50 dark:hover:bg-gray-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{policy.policyName}</div>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getCategoryColor(policy.category)}>
                        {policy.category}
                      </Badge>
                    </TableCell>
                   
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {policy.version}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {new Date(policy.effectiveDate).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(policy.status)}>
                        {policy.status}
                      </Badge>
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
                          onClick={() => handleEdit(policy)}
                          className="text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30">
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

        <CompanyPolicyForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          editingPolicy={editingPolicy}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}/>

          <ImportTemplate
          open={isImportOpen}
          onOpenChange={setIsImportOpen}
          templateType="policy"
          onImport={handleImportData}/>
      </div>
    </div>
  );
};

export default CompanyPolicyMaster;
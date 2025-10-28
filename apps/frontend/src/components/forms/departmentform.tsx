"use client";

import React from 'react';
import { Building2, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

export interface DepartmentFormData {
  name: string;
  code: string;
  hod: string;
  status: boolean;
  branches: string[];
}

interface DepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingDepartment?: any;
  onSubmit: (data: DepartmentFormData) => void;
  onCancel: () => void;
}

const branchOptions = ['Head Office', 'Site A', 'Site B', 'Site C'];
const hodOptions = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Brown', 'Robert Wilson'];

export const DepartmentForm: React.FC<DepartmentFormProps> = ({
  open,
  onOpenChange,
  editingDepartment,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<DepartmentFormData>({
    name: '',
    code: '',
    hod: '',
    status: true,
    branches: []
  });

  
  React.useEffect(() => {
    if (open) {
      if (editingDepartment) {
        setFormData({
          name: editingDepartment.name,
          code: editingDepartment.code,
          hod: editingDepartment.hod,
          status: editingDepartment.status,
          branches: editingDepartment.branches
        });
      } else {
        setFormData({
          name: '',
          code: '',
          hod: '',
          status: true,
          branches: []
        });
      }
    }
  }, [open, editingDepartment]);

  const toggleBranch = (branch: string) => {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter(b => b !== branch)
        : [...prev.branches, branch]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
            {editingDepartment ? 'Edit Department' : 'Add New Department'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingDepartment ? 'Edit existing department' : 'Create new department'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Department Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  placeholder="e.g., Human Resources"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Department Code *</Label>
              <Input
                id="code"
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="font-mono"
                placeholder="e.g., HR01"
                required/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hod">Head of Department *</Label>
            <Select 
              value={formData.hod} 
              onValueChange={(value) => setFormData({ ...formData, hod: value })}
              required>
              <SelectTrigger>
                <SelectValue placeholder="Select HOD" />
              </SelectTrigger>
              <SelectContent>
                {hodOptions.map((hod, idx) => (
                  <SelectItem key={idx} value={hod}>{hod}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Branch Assignment *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {branchOptions.map((branch, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer transition-all ${
                    formData.branches.includes(branch)
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => toggleBranch(branch)}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={formData.branches.includes(branch)}
                        onCheckedChange={() => toggleBranch(branch)}/>
                      <Label className="text-sm font-normal cursor-pointer flex-1">
                        {branch}
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {formData.branches.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {formData.branches.length} branch{formData.branches.length > 1 ? 'es' : ''} selected
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}/>
            <Label htmlFor="status" className="cursor-pointer">
              Active Status
            </Label>
          </div>

          <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              {editingDepartment ? 'Update Department' : 'Add Department'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
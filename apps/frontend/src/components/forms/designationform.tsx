"use client";

import React from 'react';
import { Award, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs,  TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface DesignationFormData {
  title: string;
  department: string;
  level: 'Junior' | 'Mid' | 'Senior';
  reportingTo: string;
  status: boolean;
}

interface DesignationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingDesignation?: any;
  onSubmit: (data: DesignationFormData) => void;
  onCancel: () => void;
}

const departments = ['Human Resources', 'Accounts', 'Operations', 'Finance', 'IT'];
const levels = ['Junior', 'Mid', 'Senior'];
const reportingToOptions = ['Director', 'Manager', 'Technical Lead', 'Finance Manager', 'Senior Accountant', 'Operations Manager', 'HR Manager'];

export const DesignationForm: React.FC<DesignationFormProps> = ({
  open,
  onOpenChange,
  editingDesignation,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<DesignationFormData>({
    title: '',
    department: '',
    level: 'Junior',
    reportingTo: '',
    status: true
  });

 
  React.useEffect(() => {
    if (open) {
      if (editingDesignation) {
        setFormData({
          title: editingDesignation.title,
          department: editingDesignation.department,
          level: editingDesignation.level,
          reportingTo: editingDesignation.reportingTo,
          status: editingDesignation.status
        });
      } else {
        setFormData({
          title: '',
          department: '',
          level: 'Junior',
          reportingTo: '',
          status: true
        });
      }
    }
  }, [open, editingDesignation]);

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
          <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
            {editingDesignation ? 'Edit Designation' : 'Add New Designation'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingDesignation ? 'Edit existing designation' : 'Create new designation'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
       
          <div className="space-y-2">
            <Label htmlFor="title">Designation Title *</Label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="pl-10"
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                  required
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Level *</Label>
              <Tabs 
                value={formData.level} 
                onValueChange={(value) => setFormData({ ...formData, level: value as 'Junior' | 'Mid' | 'Senior' })}
                className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {levels.map((level) => (
                    <TabsTrigger key={level} value={level}>
                      {level}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportingTo">Reporting To *</Label>
            <Select 
              value={formData.reportingTo} 
              onValueChange={(value) => setFormData({ ...formData, reportingTo: value })}
              required>
              <SelectTrigger>
                <SelectValue placeholder="Select Reporting Manager" />
              </SelectTrigger>
              <SelectContent>
                {reportingToOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

       
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked })} />
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              {editingDesignation ? 'Update Designation' : 'Add Designation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
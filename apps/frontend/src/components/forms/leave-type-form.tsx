"use client";

import React from 'react';
import { Calendar, Info, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

export interface LeaveTypeFormData {
  leaveType: string;
  leaveCode: string;
  annualQuota: number;
  carryForward: boolean;
  encashable: boolean;
  requiresApproval: boolean;
  maxConsecutive: number;
  status: boolean;
  branches: string[];
}

interface LeaveTypeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingLeaveType?: any;
  onSubmit: (data: LeaveTypeFormData) => void;
  onCancel: () => void;
}

const branchOptions = ['Head Office', 'Site A', 'Site B', 'Site C'];

export const LeaveTypeForm: React.FC<LeaveTypeFormProps> = ({
  open,
  onOpenChange,
  editingLeaveType,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<LeaveTypeFormData>({
    leaveType: '',
    leaveCode: '',
    annualQuota: 12,
    carryForward: false,
    encashable: false,
    requiresApproval: true,
    maxConsecutive: 3,
    status: true,
    branches: []
  });

  
  React.useEffect(() => {
    if (open) {
      if (editingLeaveType) {
        setFormData({
          leaveType: editingLeaveType.leaveType,
          leaveCode: editingLeaveType.leaveCode,
          annualQuota: editingLeaveType.annualQuota,
          carryForward: editingLeaveType.carryForward,
          encashable: editingLeaveType.encashable,
          requiresApproval: editingLeaveType.requiresApproval,
          maxConsecutive: editingLeaveType.maxConsecutive,
          status: editingLeaveType.status,
          branches: editingLeaveType.branches
        });
      } else {
        setFormData({
          leaveType: '',
          leaveCode: '',
          annualQuota: 12,
          carryForward: false,
          encashable: false,
          requiresApproval: true,
          maxConsecutive: 3,
          status: true,
          branches: []
        });
      }
    }
  }, [open, editingLeaveType]);

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
            {editingLeaveType ? 'Edit Leave Type' : 'Add New Leave Type'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingLeaveType ? 'Edit existing leave type' : 'Create new leave type'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type *</Label>
              <Input
                id="leaveType"
                type="text"
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                placeholder="e.g., Casual Leave"
                required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="leaveCode">Leave Code *</Label>
              <Input
                id="leaveCode"
                type="text"
                value={formData.leaveCode}
                onChange={(e) => setFormData({ ...formData, leaveCode: e.target.value.toUpperCase() })}
                className="font-mono font-semibold"
                placeholder="e.g., CL"
                maxLength={3}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                2-3 character code
              </p>
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="annualQuota">Annual Quota (days) *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="annualQuota"
                  type="number"
                  value={formData.annualQuota}
                  onChange={(e) => setFormData({ ...formData, annualQuota: parseInt(e.target.value) || 0 })}
                  className="pl-10"
                  min="0"
                  placeholder="e.g., 12"
                  required/>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Total days allowed per year
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxConsecutive">Max Consecutive Days *</Label>
              <Input
                id="maxConsecutive"
                type="number"
                value={formData.maxConsecutive}
                onChange={(e) => setFormData({ ...formData, maxConsecutive: parseInt(e.target.value) || 0 })}
                min="1"
                placeholder="e.g., 3"
                required/>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Maximum days in one application
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Applicable Branches *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {branchOptions.map((branch, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer transition-all ${
                    formData.branches.includes(branch)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => toggleBranch(branch)}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={formData.branches.includes(branch)}
                        onCheckedChange={() => toggleBranch(branch)}
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <Label className="text-sm font-normal cursor-pointer">
                          {branch}
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {formData.branches.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {formData.branches.length} branch{formData.branches.length > 1 ? 'es' : ''} selected
              </div>
            )}
          </div>

         
          <div className="space-y-3">
            <Label>Leave Properties</Label>
            
           
            <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="carryForward"
                    checked={formData.carryForward}
                    onCheckedChange={(checked) => setFormData({ ...formData, carryForward: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="carryForward" className="text-sm font-medium cursor-pointer">
                      Carry Forward
                    </Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Allow unused leaves to be carried forward to next year
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          
            <Card className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="encashable"
                    checked={formData.encashable}
                    onCheckedChange={(checked) => setFormData({ ...formData, encashable: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="encashable" className="text-sm font-medium cursor-pointer">
                      Encashable
                    </Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Allow unused leaves to be converted to cash payment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

         
            <Card className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="requiresApproval"
                    checked={formData.requiresApproval}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresApproval: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="requiresApproval" className="text-sm font-medium cursor-pointer">
                      Requires Approval
                    </Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Leave applications need manager/HR approval before confirmation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
            >
              {editingLeaveType ? 'Update Leave Type' : 'Add Leave Type'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
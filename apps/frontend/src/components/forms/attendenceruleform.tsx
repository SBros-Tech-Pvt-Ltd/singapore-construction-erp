"use client";

import React from 'react';
import { Clock, Info,} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

export interface AttendanceRuleFormData {
  ruleName: string;
  gracePeriod: number;
  halfDayHours: number;
  lateMarkCount: number;
  holidayRule: boolean;
  overtimeRule: string;
  status: boolean;
}

interface AttendanceRuleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingRule?: any;
  onSubmit: (data: AttendanceRuleFormData) => void;
  onCancel: () => void;
}

const overtimePresets = [
  'Standard 1.5x rate after 8 hours',
  'Flexible comp-off or 2x rate on weekends',
  '2x rate for all overtime hours',
  'No overtime applicable',
  'Custom rule'
];

export const AttendanceRuleForm: React.FC<AttendanceRuleFormProps> = ({
  open,
  onOpenChange,
  editingRule,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<AttendanceRuleFormData>({
    ruleName: '',
    gracePeriod: 15,
    halfDayHours: 4,
    lateMarkCount: 3,
    holidayRule: true,
    overtimeRule: '',
    status: true
  });

   React.useEffect(() => {
    if (open) {
      if (editingRule) {
        setFormData({
          ruleName: editingRule.ruleName,
          gracePeriod: editingRule.gracePeriod,
          halfDayHours: editingRule.halfDayHours,
          lateMarkCount: editingRule.lateMarkCount,
          holidayRule: editingRule.holidayRule,
          overtimeRule: editingRule.overtimeRule,
          status: editingRule.status
        });
      } else {
        setFormData({
          ruleName: '',
          gracePeriod: 15,
          halfDayHours: 4,
          lateMarkCount: 3,
          holidayRule: true,
          overtimeRule: '',
          status: true
        });
      }
    }
  }, [open, editingRule]);

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
          <DialogTitle className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
            {editingRule ? 'Edit Attendance Rule' : 'Add New Attendance Rule'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingRule ? 'Edit existing attendance rule' : 'Create new attendance rule'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
       
          <div className="space-y-2">
            <Label htmlFor="ruleName">Rule Name *</Label>
            <Input
              id="ruleName"
              type="text"
              value={formData.ruleName}
              onChange={(e) => setFormData({ ...formData, ruleName: e.target.value })}
              placeholder="e.g., Standard Rule, Flexible Rule"
              required/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gracePeriod">Grace Period (minutes) *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="gracePeriod"
                  type="number"
                  value={formData.gracePeriod}
                  onChange={(e) => setFormData({ ...formData, gracePeriod: parseInt(e.target.value) || 0 })}
                  className="pl-10"
                  min="0"
                  placeholder="e.g., 15"
                  required/>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Minutes allowed before marking late
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="halfDayHours">Half Day Hours *</Label>
              <Input
                id="halfDayHours"
                type="number"
                value={formData.halfDayHours}
                onChange={(e) => setFormData({ ...formData, halfDayHours: parseInt(e.target.value) || 0 })}
                min="0"
                max="12"
                step="0.5"
                placeholder="e.g., 4"
                required/>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                After X hours, mark as half day
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lateMarkCount">Late Mark Count *</Label>
            <Input
              id="lateMarkCount"
              type="number"
              value={formData.lateMarkCount}
              onChange={(e) => setFormData({ ...formData, lateMarkCount: parseInt(e.target.value) || 0 })}
              min="1"
              placeholder="e.g., 3"
              required/>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Info className="w-3 h-3" />
              After X late marks = 1 absence
            </p>
          </div>

          <Card className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="holidayRule"
                  checked={formData.holidayRule}
                  onCheckedChange={(checked) => setFormData({ ...formData, holidayRule: checked as boolean })}/>
                <div className="space-y-1">
                  <Label htmlFor="holidayRule" className="text-sm font-medium cursor-pointer">
                    Auto-apply on Government Holidays
                  </Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Automatically mark attendance as present on official government holidays
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="overtimeRule">Overtime Calculation Method *</Label>
            <Select
              value={formData.overtimeRule}
              onValueChange={(value) => setFormData({ ...formData, overtimeRule: value })}
              required>
              <SelectTrigger>
                <SelectValue placeholder="Select overtime rule" />
              </SelectTrigger>
              <SelectContent>
                {overtimePresets.map((preset, idx) => (
                  <SelectItem key={idx} value={preset}>{preset}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {formData.overtimeRule === 'Custom rule' && (
              <Textarea
                value={formData.overtimeRule}
                onChange={(e) => setFormData({ ...formData, overtimeRule: e.target.value })}
                placeholder="Enter custom overtime calculation method..."
                rows={3}
                required/>
            )}
            
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Define how overtime hours are calculated and compensated
            </p>
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
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              {editingRule ? 'Update Rule' : 'Add Rule'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
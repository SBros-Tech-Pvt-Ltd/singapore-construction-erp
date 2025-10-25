"use client";

import React from 'react';
import { Clock, Coffee, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ShiftFormData {
  name: string;
  startTime: string;
  endTime: string;
  type: 'Fixed' | 'Rotational';
  gracePeriod: number;
  breakDuration: number;
  branches: string[];
  status: boolean;
}

interface ShiftFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingShift?: any;
  onSubmit: (data: ShiftFormData) => void;
  onCancel: () => void;
}

const branchOptions = ['Head Office', 'Site A', 'Site B', 'Site C', 'Site D'];
const shiftTypes = ['Fixed', 'Rotational'];

export const ShiftForm: React.FC<ShiftFormProps> = ({
  open,
  onOpenChange,
  editingShift,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<ShiftFormData>({
    name: '',
    startTime: '',
    endTime: '',
    type: 'Fixed',
    gracePeriod: 15,
    breakDuration: 60,
    branches: [],
    status: true
  });
  React.useEffect(() => {
    if (open) {
      if (editingShift) {
        setFormData({
          name: editingShift.name,
          startTime: editingShift.startTime,
          endTime: editingShift.endTime,
          type: editingShift.type,
          gracePeriod: editingShift.gracePeriod,
          breakDuration: editingShift.breakDuration,
          branches: editingShift.branches,
          status: editingShift.status
        });
      } else {
        setFormData({
          name: '',
          startTime: '',
          endTime: '',
          type: 'Fixed',
          gracePeriod: 15,
          breakDuration: 60,
          branches: [],
          status: true
        });
      }
    }
  }, [open, editingShift]);

  const toggleBranch = (branch: string) => {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter(b => b !== branch)
        : [...prev.branches, branch]
    }));
  };

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return '-';
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    let duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    if (duration < 0) duration += 24 * 60; 
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
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
          <DialogTitle className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
            {editingShift ? 'Edit Shift' : 'Add New Shift'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingShift ? 'Edit existing shift' : 'Create new shift'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="shiftName">Shift Name *</Label>
            <Input
              id="shiftName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Day Shift, Night Shift"
              required/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="pl-10"
                  required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="pl-10"
                  required/>
              </div>
            </div>
          </div>

          {formData.startTime && formData.endTime && (
            <Card className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Total Duration: {calculateDuration(formData.startTime, formData.endTime)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Label>Shift Type *</Label>
            <Tabs 
              value={formData.type} 
              onValueChange={(value) => setFormData({ ...formData, type: value as 'Fixed' | 'Rotational' })}
              className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                {shiftTypes.map((type) => (
                  <TabsTrigger key={type} value={type}>
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gracePeriod">Grace Period (minutes) *</Label>
              <Input
                id="gracePeriod"
                type="number"
                value={formData.gracePeriod}
                onChange={(e) => setFormData({ ...formData, gracePeriod: parseInt(e.target.value) || 0 })}
                min="0"
                placeholder="e.g., 15"
                required/>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Minutes allowed before marking late
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakDuration">Break Duration (minutes) *</Label>
              <div className="relative">
                <Coffee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="breakDuration"
                  type="number"
                  value={formData.breakDuration}
                  onChange={(e) => setFormData({ ...formData, breakDuration: parseInt(e.target.value) || 0 })}
                  className="pl-10"
                  min="0"
                  placeholder="e.g., 60"
                  required/>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Total break time in minutes
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
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
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
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
              {editingShift ? 'Update Shift' : 'Add Shift'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
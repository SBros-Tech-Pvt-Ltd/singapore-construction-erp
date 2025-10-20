"use client";

import React from 'react';
import { Calendar, Upload, Paperclip, Info, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface CompanyPolicyFormData {
  policyName: string;
  category: string;
  document: string;
  version: string;
  effectiveDate: string;
  mandatoryRead: boolean;
  status: 'Published' | 'Draft';
}

interface CompanyPolicyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPolicy?: any;
  onSubmit: (data: CompanyPolicyFormData) => void;
  onCancel: () => void;
}

const categories = ['HR', 'Finance', 'Operations', 'IT', 'Legal'];
const statuses = ['Published', 'Draft'];

export const CompanyPolicyForm: React.FC<CompanyPolicyFormProps> = ({
  open,
  onOpenChange,
  editingPolicy,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<CompanyPolicyFormData>({
    policyName: '',
    category: '',
    document: '',
    version: 'v1.0',
    effectiveDate: '',
    mandatoryRead: true,
    status: 'Draft'
  });

  React.useEffect(() => {
    if (open) {
      if (editingPolicy) {
        setFormData({
          policyName: editingPolicy.policyName,
          category: editingPolicy.category,
          document: editingPolicy.document,
          version: editingPolicy.version,
          effectiveDate: editingPolicy.effectiveDate,
          mandatoryRead: editingPolicy.mandatoryRead,
          status: editingPolicy.status
        });
      } else {
        setFormData({
          policyName: '',
          category: '',
          document: '',
          version: 'v1.0',
          effectiveDate: '',
          mandatoryRead: true,
          status: 'Draft'
        });
      }
    }
  }, [open, editingPolicy]);

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
          <DialogTitle className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
            {editingPolicy ? 'Edit Company Policy' : 'Add New Company Policy'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingPolicy ? 'Edit existing company policy' : 'Create new company policy'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="policyName">Policy Name *</Label>
            <Input
              id="policyName"
              type="text"
              value={formData.policyName}
              onChange={(e) => setFormData({ ...formData, policyName: e.target.value })}
              placeholder="e.g., Code of Conduct"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version *</Label>
              <Input
                id="version"
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="font-mono"
                placeholder="e.g., v1.0"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Format: v1.0, v2.0, etc.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Document Upload *</Label>
            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-violet-500 dark:hover:border-violet-400 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-violet-600 dark:text-violet-400 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PDF, DOC, DOCX (max. 10MB)
                    </p>
                  </div>
                  {formData.document && (
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                      <Paperclip className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      <span className="text-sm text-violet-700 dark:text-violet-300">{formData.document}</span>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="document-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, document: file.name });
                    }
                  }}
                />
                <Label 
                  htmlFor="document-upload" 
                  className="absolute inset-0 cursor-pointer"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <Label htmlFor="effectiveDate">Effective Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className="pl-10"
                required/>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Date when this policy becomes active
            </p>
          </div>

          <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="mandatoryRead"
                  checked={formData.mandatoryRead}
                  onCheckedChange={(checked) => setFormData({ ...formData, mandatoryRead: checked as boolean })}
                />
                <div className="space-y-1">
                  <Label htmlFor="mandatoryRead" className="text-sm font-medium cursor-pointer">
                    Mandatory Read
                  </Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Require all employees to acknowledge reading this policy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Label>Publication Status *</Label>
            <Tabs 
              value={formData.status} 
              onValueChange={(value) => setFormData({ ...formData, status: value as 'Published' | 'Draft' })}
              className="w-full" >
              <TabsList className="grid w-full grid-cols-2">
                {statuses.map((status) => (
                  <TabsTrigger key={status} value={status} className="flex items-center gap-2">
                    {status === 'Published' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {status}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Info className="w-3 h-3" />
              {formData.status === 'Published' ? 'Policy is visible to all employees' : 'Policy is saved as draft and not visible to employees'}
            </p>
          </div>

          <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              {editingPolicy ? 'Update Policy' : 'Add Policy'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
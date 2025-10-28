'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Crown,
  UserCog,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  Activity,
} from 'lucide-react';

interface RoleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  role?: any; // If role exists, it's edit mode, otherwise create mode
}

export default function RoleFormModal({ 
  open, 
  onClose, 
  onSubmit, 
  role 
}: RoleFormModalProps) {
  const isEditMode = !!role;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Custom',
    status: 'Active'
  });

  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });

  // Pre-fill form data if editing
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        type: role.type,
        status: role.status
      });
    } else {
      // Reset form when creating new
      setFormData({
        name: '',
        description: '',
        type: 'Custom',
        status: 'Active'
      });
      setErrors({ name: '', description: '' });
    }
  }, [role, open]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Role name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.description;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form after successful submit
      if (!isEditMode) {
        setFormData({
          name: '',
          description: '',
          type: 'Custom',
          status: 'Active'
        });
      }
    }
  };

  const getRoleTypeIcon = (type: string) => {
    switch (type) {
      case 'System':
        return <Crown className="w-4 h-4" />;
      case 'Custom':
        return <UserCog className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${
              isEditMode 
                ? 'bg-gradient-to-br from-green-100 to-green-50' 
                : 'bg-gradient-to-br from-blue-100 to-blue-50'
            }`}>
              {isEditMode ? (
                <UserCog className="w-6 h-6 text-green-600" />
              ) : (
                <Shield className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl flex items-center gap-2">
                {isEditMode ? 'Edit Role' : 'Create New Role'}
                {isEditMode && (
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Editing
                  </Badge>
                )}
              </DialogTitle>
              {isEditMode && (
                <DialogDescription className="mt-1">
                  Editing: <span className="font-semibold text-gray-900">{role.name}</span>
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              Role Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                setErrors({...errors, name: ''});
              }}
              placeholder="e.g., HR Manager, Branch Manager"
              className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Enter a clear and descriptive name for this role
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => {
                setFormData({...formData, description: e.target.value});
                setErrors({...errors, description: ''});
              }}
              placeholder="Describe the purpose and scope of this role"
              rows={4}
              className={errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Role Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="flex items-center gap-2">
                {getRoleTypeIcon(formData.type)}
                Role Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Custom">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-4 h-4 text-emerald-600" />
                      <span>Custom</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="System">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span>System</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Admin">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Manager">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>Manager</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Staff">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span>Staff</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Select the category of this role
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-500" />
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Active</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Inactive">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-gray-600" />
                      <span>Inactive</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Set the role availability status
              </p>
            </div>
          </div>

          {/* Info Alert for System Roles */}
          {formData.type === 'System' && (
            <Alert className="bg-amber-50 border-amber-200">
              <Crown className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">System Role</AlertTitle>
              <AlertDescription className="text-amber-700">
                System roles have special privileges and may affect core functionality. 
                Make sure you understand the implications before proceeding.
              </AlertDescription>
            </Alert>
          )}

          {/* Preview Card */}
          <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                Role Preview
              </CardTitle>
              <CardDescription className="text-xs">
                How this role will appear in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <div className={`p-2 rounded-lg ${
                  formData.type === 'System'
                    ? 'bg-gradient-to-br from-amber-100 to-amber-50'
                    : 'bg-gradient-to-br from-blue-100 to-blue-50'
                }`}>
                  {getRoleTypeIcon(formData.type)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">
                    {formData.name || 'Role Name'}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {formData.description || 'Role description will appear here'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={
                      formData.type === 'System'
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    }
                  >
                    {formData.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      formData.status === 'Active'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }
                  >
                    {formData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit"
              className={isEditMode 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {isEditMode ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Update Role
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Create Role
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
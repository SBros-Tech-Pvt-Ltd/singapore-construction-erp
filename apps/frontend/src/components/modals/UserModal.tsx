'use client';

import React, { useState } from 'react';
import { Key, Trash2, Search, AlertTriangle } from 'lucide-react';

// shadcn/ui imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  branch: string;
  status: string;
  lastLogin: string;
  phone?: string;
  employeeId?: string;
  department?: string;
}

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

interface EditUserModalProps extends UserModalProps {
  onUpdate?: (user: User) => void;
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
  type: 'reset' | 'delete';
}

const roles = ['Employee', 'Branch Admin', 'HR', 'Finance', 'Manager', 'Super Admin'];
const modules = ['Dashboard', 'Employee Management', 'Attendance', 'Leave', 'Payroll', 'Reports', 'Settings'];
const branches = ['Main Office', 'East Branch', 'West Branch', 'North Branch'];
const departments = ['Human Resources', 'Finance', 'IT', 'Sales', 'Operations'];

// Sample employees list
const availableEmployees = [
  { id: 'EMP-001', name: 'John Doe', email: 'john@company.com' },
  { id: 'EMP-002', name: 'Sarah Smith', email: 'sarah@company.com' },
  { id: 'EMP-003', name: 'Mike Johnson', email: 'mike@company.com' },
  { id: 'EMP-004', name: 'Emily Davis', email: 'emily@company.com' },
  { id: 'EMP-005', name: 'Robert Wilson', email: 'robert@company.com' },
  { id: 'EMP-006', name: 'Lisa Anderson', email: 'lisa@company.com' },
  { id: 'EMP-007', name: 'David Brown', email: 'david@company.com' },
  { id: 'EMP-008', name: 'Jennifer Taylor', email: 'jennifer@company.com' },
  { id: 'EMP-009', name: 'Michael Chen', email: 'michael@company.com' },
  { id: 'EMP-010', name: 'Amanda White', email: 'amanda@company.com' },
];

// ✅ View User Modal
export const ViewUserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View detailed information about this user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Avatar and Name */}
          <div className="flex items-center space-x-4 pb-6 border-b">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge className="mt-2" variant={user.status === 'Active' ? 'default' : 'destructive'}>
                {user.status}
              </Badge>
            </div>
          </div>

          {/* User Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Employee ID</Label>
              <p className="font-medium">{user.employeeId || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Phone Number</Label>
              <p className="font-medium">{user.phone || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Role</Label>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Department</Label>
              <p className="font-medium">{user.department || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Branch</Label>
              <p className="font-medium">{user.branch}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Last Login</Label>
              <p className="font-medium">{user.lastLogin}</p>
            </div>
          </div>

          {/* Permissions Preview */}
          <div className="pt-4 border-t space-y-3">
            <h4 className="font-semibold">Access Permissions</h4>
            <div className="flex flex-wrap gap-2">
              {modules.slice(0, 5).map(module => (
                <Badge key={module} variant="outline">
                  {module}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Edit User Modal - WITH EMPLOYEE & ROLE SELECTION
export const EditUserModal: React.FC<EditUserModalProps> = ({ user, isOpen, onClose, onUpdate }) => {
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(user?.employeeId || '');
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user?.role ? user.role.split(', ') : []);

  if (!user) return null;

  const [firstName, lastName] = user.name.split(' ');

  const filteredEmployees = availableEmployees.filter(emp =>
    emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedUser: User = {
      ...user,
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      employeeId: selectedEmployee,
      role: selectedRoles.join(', '),
      branch: formData.get('branch') as string,
      department: formData.get('department') as string,
      status: formData.get('status') as string
    };

    if (onUpdate) {
      onUpdate(updatedUser);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information and permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Select Employee */}
            <div className="space-y-3">
              <Label>Select Employee *</Label>
              
              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search employees by name, email or ID..."
                  className="pl-10"
                  value={employeeSearchTerm}
                  onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                />
              </div>

              {/* Employee List */}
              <ScrollArea className="h-48 border rounded-lg p-4">
                <RadioGroup value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <div key={employee.id} className="flex items-center space-x-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                        <RadioGroupItem value={employee.id} id={employee.id} />
                        <label htmlFor={employee.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.email}</div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {employee.id}
                            </Badge>
                          </div>
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No employees found</p>
                    </div>
                  )}
                </RadioGroup>
              </ScrollArea>
              
              {/* Selected Employee Display */}
              {selectedEmployee && (
                <Alert>
                  <AlertDescription className="text-sm font-semibold">
                    ✓ Selected: {availableEmployees.find(e => e.id === selectedEmployee)?.name}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Separator />

            {/* Select Roles */}
            <div className="space-y-3">
              <Label>Select Role(s) *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <label
                    key={role}
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedRoles.includes(role)}
                      onCheckedChange={() => handleRoleToggle(role)}
                    />
                    <span className="text-sm">{role}</span>
                  </label>
                ))}
              </div>
              
              {/* Selected Roles Display */}
              {selectedRoles.length > 0 && (
                <Alert>
                  <AlertDescription className="text-sm font-semibold">
                    ✓ {selectedRoles.length} role(s) selected: {selectedRoles.join(', ')}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  defaultValue={firstName}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  defaultValue={lastName}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  defaultValue={user.phone}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch *</Label>
                <Select name="branch" defaultValue={user.branch} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select name="department" defaultValue={user.department}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue={user.status} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Reset Password Modal
export const ResetPasswordModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, user }) => {
  const [notifyUser, setNotifyUser] = useState(true);
  const [forceChange, setForceChange] = useState(true);

  if (!user) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Send password reset link to user
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to reset the password for:
            </p>
            <div className="bg-muted rounded-lg p-4">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              A password reset link will be sent to the user&apos;s email address. The link will expire in 24 hours.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notifyUser"
                checked={notifyUser}
                onCheckedChange={(checked) => setNotifyUser(checked as boolean)}
              />
              <Label htmlFor="notifyUser" className="text-sm font-normal cursor-pointer">
                Send password reset email to user
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="forceChange"
                checked={forceChange}
                onCheckedChange={(checked) => setForceChange(checked as boolean)}
              />
              <Label htmlFor="forceChange" className="text-sm font-normal cursor-pointer">
                Force password change on next login
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-orange-600 hover:bg-orange-700">
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Delete User Modal
export const DeleteUserModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, user }) => {
  if (!user) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Role: {user.role}</p>
            </div>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: All data associated with this user will be permanently deleted.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Combined Modal Manager Component
export const UserModals: React.FC<{
  viewModal: { isOpen: boolean; user: User | null };
  editModal: { isOpen: boolean; user: User | null };
  resetModal: { isOpen: boolean; user: User | null };
  deleteModal: { isOpen: boolean; user: User | null };
  onCloseView: () => void;
  onCloseEdit: () => void;
  onCloseReset: () => void;
  onCloseDelete: () => void;
  onUpdate: (user: User) => void;
  onResetPassword: () => void;
  onDelete: () => void;
}> = ({
  viewModal,
  editModal,
  resetModal,
  deleteModal,
  onCloseView,
  onCloseEdit,
  onCloseReset,
  onCloseDelete,
  onUpdate,
  onResetPassword,
  onDelete
}) => {
  return (
    <>
      <ViewUserModal
        isOpen={viewModal.isOpen}
        user={viewModal.user}
        onClose={onCloseView}
      />
      <EditUserModal
        isOpen={editModal.isOpen}
        user={editModal.user}
        onClose={onCloseEdit}
        onUpdate={onUpdate}
      />
      <ResetPasswordModal
        isOpen={resetModal.isOpen}
        user={resetModal.user}
        onClose={onCloseReset}
        onConfirm={onResetPassword}
        type="reset"
      />
      <DeleteUserModal
        isOpen={deleteModal.isOpen}
        user={deleteModal.user}
        onClose={onCloseDelete}
        onConfirm={onDelete}
        type="delete"
      />
    </>
  );
};
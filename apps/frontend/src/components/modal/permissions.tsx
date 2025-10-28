'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Shield,
  Crown,
  UserCog,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Wallet,
  Briefcase,
  Package,
  FileText,
  Settings,
} from 'lucide-react';

interface Role {
  id: number;
  name: string;
  description: string;
  type: 'System' | 'Custom';
  users: number;
  status: 'Active' | 'Inactive';
}

interface PermissionsModalProps {
  open: boolean;
  role: Role;
  onClose: () => void;
}

type PermissionsType = {
  [module: string]: {
    [action: string]: boolean;
  };
};

const moduleIcons: { [key: string]: any } = {
  'Dashboard': LayoutDashboard,
  'User Management': Users,
  'Role Management': ShieldCheck,
  'Finance': Wallet,
  'HR': Briefcase,
  'Inventory': Package,
  'Reports': FileText,
  'Settings': Settings,
};

export default function PermissionsModal({ open, role, onClose }: PermissionsModalProps) {
  const [permissions, setPermissions] = useState<PermissionsType>({});

  const modules = [
    'Dashboard',
    'User Management',
    'Role Management',
    'Finance',
    'HR',
    'Inventory',
    'Reports',
    'Settings'
  ];

  const actions = ['View', 'Create', 'Edit', 'Delete', 'Export', 'Approve'];

  const togglePermission = (module: string, action: string) => {
    setPermissions((prev: PermissionsType) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module]?.[action]
      }
    }));
  };

  const toggleAllInModule = (module: string) => {
    const allChecked = actions.every(action => permissions[module]?.[action]);
    const newPermissions = { ...permissions };
    newPermissions[module] = {};
    actions.forEach(action => {
      newPermissions[module][action] = !allChecked;
    });
    setPermissions(newPermissions);
  };

  const toggleAllInAction = (action: string) => {
    const allChecked = modules.every(module => permissions[module]?.[action]);
    const newPermissions = { ...permissions };
    modules.forEach(module => {
      if (!newPermissions[module]) newPermissions[module] = {};
      newPermissions[module][action] = !allChecked;
    });
    setPermissions(newPermissions);
  };

  const isModuleFullyChecked = (module: string) => {
    return actions.every(action => permissions[module]?.[action]);
  };

  const isActionFullyChecked = (action: string) => {
    return modules.every(module => permissions[module]?.[action]);
  };

  const getPermissionCount = () => {
    let count = 0;
    Object.values(permissions).forEach(module => {
      Object.values(module).forEach(value => {
        if (value) count++;
      });
    });
    return count;
  };

  const handleSave = () => {
    console.log('Saving permissions:', permissions);
    alert('Permissions saved successfully!');
    onClose();
  };

  const handleReset = () => {
    setPermissions({});
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50vw] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${
                role.type === 'System'
                  ? 'bg-gradient-to-br from-amber-100 to-amber-50'
                  : 'bg-gradient-to-br from-blue-100 to-blue-50'
              }`}>
                {role.type === 'System' ? (
                  <Crown className="w-5 h-5 text-amber-600" />
                ) : (
                  <UserCog className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div>
                <DialogTitle className="text-xl flex items-center gap-2">
                  Assign Permissions
                  <Badge variant="outline" className="ml-2">
                    {getPermissionCount()} selected
                  </Badge>
                </DialogTitle>
                <DialogDescription className="mt-1">
                  Role: <span className="font-semibold text-gray-900">{role.name}</span>
                  {role.type === 'System' && (
                    <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-700 border-amber-200">
                      <Crown className="w-3 h-3 mr-1" />
                      System Role
                    </Badge>
                  )}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)]">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Select permissions for each module and action</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={getPermissionCount() === 0}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                  <TableRow className="border-b-2 border-gray-200">
                    <TableHead className="w-[250px] font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Module
                      </div>
                    </TableHead>
                    {actions.map(action => (
                      <TableHead key={action} className="text-center font-semibold text-gray-700">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs uppercase tracking-wide">{action}</span>
                          <Checkbox
                            checked={isActionFullyChecked(action)}
                            onCheckedChange={() => toggleAllInAction(action)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center font-semibold text-gray-700">
                      <span className="text-xs uppercase tracking-wide">All</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((module, index) => {
                    const Icon = moduleIcons[module];
                    const fullyChecked = isModuleFullyChecked(module);
                    
                    return (
                      <TableRow
                        key={module}
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                              <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-900">{module}</span>
                          </div>
                        </TableCell>
                        {actions.map(action => (
                          <TableCell key={action} className="text-center">
                            <div className="flex items-center justify-center">
                              <Checkbox
                                checked={permissions[module]?.[action] || false}
                                onCheckedChange={() => togglePermission(module, action)}
                                className="data-[state=checked]:bg-blue-600"
                              />
                            </div>
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <Checkbox
                              checked={fullyChecked}
                              onCheckedChange={() => toggleAllInModule(module)}
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Permission Summary */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Permission Summary</h4>
                  <p className="text-sm text-gray-600">
                    Total permissions selected: <span className="font-semibold text-blue-600">{getPermissionCount()}</span> out of{' '}
                    <span className="font-semibold">{modules.length * actions.length}</span> available permissions
                  </p>
                  {role.type === 'System' && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Note: This is a system role. Changes may affect core functionality.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Save Permissions
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
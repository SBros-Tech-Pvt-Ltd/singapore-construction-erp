
// app/superadmin/pricing-plans/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {Dialog,DialogContent,DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Select,SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {Plus,Search,MoreVertical,Edit,Trash2,Download,RefreshCw,Filter,Star,Check,CalendarDays,RotateCcw,Save,X,Info, DollarSign,Calendar,Zap,
} from 'lucide-react';

// Mock Data
const MOCK_PLANS = [
  {
    id: '2',
    planName: 'Basic',
    planCode: 'BASIC',
    description: 'Ideal for startups and small teams looking to scale. Includes advanced collaboration features.',
    price: 29,
    currency: 'SGD',
    billingCycle: 'monthly',
    maxUsers: 10,
    maxStorageGB: 10,
    maxProjects: 10,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    planName: 'Pro',
    planCode: 'PRO_MONTHLY',
    description: 'Enhanced features for growing businesses. Includes API access and custom branding options.',
    price: 99,
    currency: 'USD',
    billingCycle: 'monthly',
    maxUsers: 25,
    maxStorageGB: 100,
    maxProjects: 50,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    planName: 'Pro Annual',
    planCode: 'PRO_YEARLY',
    description: 'All Pro features with annual billing for maximum savings. Save 16% compared to monthly.',
    price: 990,
    currency: 'USD',
    billingCycle: 'yearly',
    maxUsers: 25,
    maxStorageGB: 100,
    maxProjects: 50,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-02-01',
  },
  {
    id: '5',
    planName: 'Enterprise',
    planCode: 'ENTERPRISE',
    description: 'Custom solutions for large organizations. Unlimited resources with priority support.',
    price: 299,
    currency: 'USD',
    billingCycle: 'monthly',
    maxUsers: 0,
    maxStorageGB: 0,
    maxProjects: 0,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-02-10',
  },
];

const initialFormData = {
  planName: '',
  planCode: '',
  description: '',
  price: 0,
  currency: 'USD',
  billingCycle: 'monthly',
  maxUsers: 5,
  maxStorageGB: 10,
  maxProjects: 10,
  isActive: true,
  isFeatured: false,
};

export default function PricingPlansPage() {
  // State
  const [plans, setPlans] = useState(MOCK_PLANS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<typeof MOCK_PLANS[0] | null>(null);

  // Form state
  const [formData, setFormData] = useState(initialFormData);

  // Filter plans
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.planCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && plan.isActive) ||
      (statusFilter === 'inactive' && !plan.isActive);

    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: plans.length,
    active: plans.filter((p) => p.isActive).length,
    inactive: plans.filter((p) => !p.isActive).length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handlers
  const handleAddNew = () => {
    setEditingPlan(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const handleEdit = (plan: typeof MOCK_PLANS[0]) => {
    setEditingPlan(plan);
    setFormData({
      planName: plan.planName,
      planCode: plan.planCode,
      description: plan.description,
      price: plan.price,
      currency: plan.currency,
      billingCycle: plan.billingCycle,
      maxUsers: plan.maxUsers,
      maxStorageGB: plan.maxStorageGB,
      maxProjects: plan.maxProjects,
      isActive: plan.isActive,
      isFeatured: plan.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isActive: false } : plan
      )
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPlan) {
      // Update existing plan
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === editingPlan.id ? { ...plan, ...formData } : plan
        )
      );
    } else {
      // Add new plan
      const newPlan = {
        id: String(Date.now()),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setPlans((prevPlans) => [...prevPlans, newPlan]);
    }
    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Plans */}
        <Card className="bg-blue-500 border-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <p className="text-xs text-blue-50">Total Plans</p>
              </div>
              <div className="h-12 w-12 bg-blue-400 rounded-full flex items-center justify-center">
                <RotateCcw className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Plans */}
        <Card className="bg-green-500 border-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.active}</div>
                <p className="text-xs text-green-50">Active Plans</p>
              </div>
              <div className="h-12 w-12 bg-green-400 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inactive Plans */}
        <Card className="bg-orange-500 border-orange-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.inactive}</div>
                <p className="text-xs text-orange-50">Inactive Plans</p>
              </div>
              <div className="h-12 w-12 bg-orange-400 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-end">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search plans by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Plan
          </Button>
        </div>
      </CardContent>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredPlans.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">No plans found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first pricing plan to get started'}
                </p>
                <Button className="mt-4" onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className="group flex flex-col justify-between hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
            >
              <CardHeader className="border-b pb-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {plan.planName}
                      </h3>
                      <code className="text-xs px-2 py-1 bg-muted rounded border">
                        {plan.planCode}
                      </code>
                    </div>
                    {plan.isFeatured && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                <div>
                  <div className="text-3xl font-bold">
                    {plan.currency} {plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize flex items-center gap-1.5 mt-1">
                    <RotateCcw className="w-4 h-4" />
                    Billed {plan.billingCycle}
                  </div>
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>
                      {plan.maxUsers === 0 ? 'Unlimited' : plan.maxUsers} users
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>
                      {plan.maxStorageGB === 0 ? 'Unlimited' : `${plan.maxStorageGB}GB`} storage
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>
                      {plan.maxProjects === 0 ? 'Unlimited' : plan.maxProjects} projects
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    Created
                  </span>
                  <span className="font-medium">{formatDate(plan.createdAt)}</span>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex items-center justify-between w-full">
                  <Badge
                    variant={plan.isActive ? 'default' : 'secondary'}
                    className={plan.isActive ? 'bg-green-500' : 'bg-gray-400'}
                  >
                    {plan.isActive ? '● Active' : '○ Inactive'}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(plan)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Modal Form */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? 'Edit Pricing Plan' : 'Create New Plan'}
            </DialogTitle>
            <DialogDescription>
              {editingPlan
                ? 'Update the details of this pricing plan.'
                : 'Define a new subscription plan with features and pricing.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <h3 className="text-sm font-medium">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planName">Plan Name</Label>
                  <Input
                    id="planName"
                    value={formData.planName}
                    onChange={(e) => handleInputChange('planName', e.target.value)}
                    placeholder="e.g., Professional, Enterprise"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="planCode">Plan Code</Label>
                  <Input
                    id="planCode"
                    value={formData.planCode}
                    onChange={(e) => handleInputChange('planCode', e.target.value)}
                    placeholder="PLAN001"
                    className="font-mono text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what this plan offers..."
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      className="pl-8"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                      <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                      <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingCycle">Billing Cycle</Label>
                  <Select
                    value={formData.billingCycle}
                    onValueChange={(value) => handleInputChange('billingCycle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Monthly Billing</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="yearly">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Yearly Billing (Save 20%)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="lifetime">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          <span>One-time Payment</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUsers">Max Users</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={formData.maxUsers}
                    onChange={(e) => handleInputChange('maxUsers', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStorageGB">Storage (GB)</Label>
                  <Input
                    id="maxStorageGB"
                    type="number"
                    value={formData.maxStorageGB}
                    onChange={(e) => handleInputChange('maxStorageGB', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxProjects">Max Projects</Label>
                  <Input
                    id="maxProjects"
                    type="number"
                    value={formData.maxProjects}
                    onChange={(e) => handleInputChange('maxProjects', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Feature Limits */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Feature Limits</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Set to 0 for unlimited
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxUsers">Max Users</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={formData.maxUsers}
                    onChange={(e) => handleInputChange('maxUsers', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStorageGB">Storage (GB)</Label>
                  <Input
                    id="maxStorageGB"
                    type="number"
                    value={formData.maxStorageGB}
                    onChange={(e) => handleInputChange('maxStorageGB', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxProjects">Max Projects</Label>
                  <Input
                    id="maxProjects"
                    type="number"
                    value={formData.maxProjects}
                    onChange={(e) => handleInputChange('maxProjects', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="border-t pt-4">
  <h3 className="text-sm font-semibold mb-3">Settings</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 transition-colors">
      <div>
        <Label htmlFor="isActive" className="cursor-pointer font-medium">
          Active
        </Label>
        <p className="text-xs text-muted-foreground">
          Available for subscriptions
        </p>
      </div>
      <Switch
        id="isActive"
        checked={formData.isActive}
        onCheckedChange={(checked) => handleInputChange('isActive', checked)}
      />
    </div>

    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 transition-colors">
      <div>
        <Label htmlFor="isFeatured" className="cursor-pointer font-medium">
          Featured
        </Label>
        <p className="text-xs text-muted-foreground">
          Highlight as recommended
        </p>
      </div>
      <Switch
        id="isFeatured"
        checked={formData.isFeatured}
        onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
      />
    </div>
  </div>
</div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCloseModal}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}



'use client';

import {
  Building,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  DollarSign,
  Users,
  HardDrive,
  CheckCircle,
  XCircle,
  TrendingUp,
  Package,
  Settings,
  Crown,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Static JSON Data
const pricingPlans = [
  {
    id: 1,
    name: 'Starter',
    displayName: 'Starter Plan',
    description: 'Perfect for small businesses and startups',
    priceMonthly: 299,
    priceQuarterly: 850,
    priceAnnually: 3228,
    currency: 'SGD',
    userLimit: 50,
    storageLimit: '10GB',
    features: [
      'Basic HR features',
      'Email support',
      'Standard templates',
      'Mobile app access',
      'Basic reporting'
    ],
    modulesIncluded: ['HR', 'Attendance'],
    active: true,
    popular: false,
    tenantCount: 45,
    monthlyRevenue: 13455,
    icon: 'Package',
    color: 'blue',
    createdAt: '2024-01-15',
    billingCycle: 'monthly'
  },
  {
    id: 2,
    name: 'Professional',
    displayName: 'Professional Plan',
    description: 'Ideal for growing companies with advanced needs',
    priceMonthly: 599,
    priceQuarterly: 1708,
    priceAnnually: 6469,
    currency: 'SGD',
    userLimit: 200,
    storageLimit: '50GB',
    features: [
      'Full HR & Payroll features',
      'Advanced reporting',
      'Priority email support',
      'Custom branding',
      'API access',
      'Advanced analytics'
    ],
    modulesIncluded: ['HR', 'Payroll', 'Attendance', 'Leave', 'Finance'],
    active: true,
    popular: true,
    tenantCount: 28,
    monthlyRevenue: 16772,
    icon: 'Zap',
    color: 'purple',
    createdAt: '2024-01-15',
    billingCycle: 'monthly'
  },
  {
    id: 3,
    name: 'Enterprise',
    displayName: 'Enterprise Plan',
    description: 'Complete solution for large organizations',
    priceMonthly: 1299,
    priceQuarterly: 3702,
    priceAnnually: 14027,
    currency: 'SGD',
    userLimit: 9999,
    storageLimit: 'Unlimited',
    features: [
      'All features included',
      'Custom integrations',
      '24/7 dedicated support',
      'SLA guarantee',
      'White-label solution',
      'Advanced security',
      'Custom workflows',
      'Dedicated account manager'
    ],
    modulesIncluded: ['All Modules', 'Custom Modules'],
    active: true,
    popular: false,
    tenantCount: 12,
    monthlyRevenue: 15588,
    icon: 'Crown',
    color: 'amber',
    createdAt: '2024-01-15',
    billingCycle: 'monthly'
  },
  {
    id: 4,
    name: 'Trial',
    displayName: 'Trial Plan',
    description: '30-day free trial for evaluation',
    priceMonthly: 0,
    priceQuarterly: 0,
    priceAnnually: 0,
    currency: 'SGD',
    userLimit: 10,
    storageLimit: '1GB',
    features: [
      'Limited HR features',
      'Email support',
      'Standard templates',
      '30 days access'
    ],
    modulesIncluded: ['HR Basic'],
    active: true,
    popular: false,
    tenantCount: 67,
    monthlyRevenue: 0,
    icon: 'Shield',
    color: 'slate',
    createdAt: '2024-01-15',
    billingCycle: 'monthly'
  }
];

export default function PricingPlanMasterPage() {
  const getPlanIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Package,
      Zap,
      Crown,
      Shield
    };
    const IconComponent = icons[iconName] || Package;
    return IconComponent;
  };

  // Calculate stats
  const stats = {
    totalPlans: pricingPlans.length,
    activePlans: pricingPlans.filter(p => p.active).length,
    totalTenants: pricingPlans.reduce((sum, p) => sum + p.tenantCount, 0),
    totalRevenue: pricingPlans.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pricing Plan Master</h1>
          <p className="text-muted-foreground">
            Manage subscription plans and pricing tiers
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Pricing Plan</DialogTitle>
                <DialogDescription>
                  Define a new subscription plan with features and limits
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plan Name *</Label>
                    <Input placeholder="e.g., Professional" />
                  </div>
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input placeholder="e.g., Professional Plan" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of the plan..." rows={3} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Price (SGD) *</Label>
                    <Input type="number" placeholder="599" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quarterly Price (SGD)</Label>
                    <Input type="number" placeholder="1708" />
                    <p className="text-xs text-muted-foreground">5% discount</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Price (SGD)</Label>
                    <Input type="number" placeholder="6469" />
                    <p className="text-xs text-muted-foreground">10% discount</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>User Limit *</Label>
                    <Input type="number" placeholder="200" />
                  </div>
                  <div className="space-y-2">
                    <Label>Storage Limit</Label>
                    <Input placeholder="50GB" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features (one per line)</Label>
                  <Textarea 
                    placeholder="Full HR & Payroll features&#10;Advanced reporting&#10;Priority support"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Package">Package</SelectItem>
                        <SelectItem value="Zap">Zap</SelectItem>
                        <SelectItem value="Crown">Crown</SelectItem>
                        <SelectItem value="Shield">Shield</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="amber">Amber</SelectItem>
                        <SelectItem value="slate">Slate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Plans</p>
                <p className="text-2xl font-bold">{stats.totalPlans}</p>
                <p className="text-xs text-muted-foreground">{stats.activePlans} active</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{stats.activePlans}</p>
                <p className="text-xs text-muted-foreground">Currently available</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tenants</p>
                <p className="text-2xl font-bold">{stats.totalTenants}</p>
                <p className="text-xs text-muted-foreground">Across all plans</p>
              </div>
              <Building className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">From subscriptions</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search plans..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="tenants">Tenants</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Plans Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pricing Plans ({pricingPlans.length})</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Manage Columns
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Details</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Limits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenants</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingPlans.map((plan) => {
                const IconComponent = getPlanIcon(plan.icon);
                return (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-muted">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{plan.displayName}</span>
                            {plan.popular && (
                              <Badge variant="secondary">Popular</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{plan.currency} ${plan.priceMonthly}</span>
                          <span className="text-xs text-muted-foreground">/month</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Quarterly: ${plan.priceQuarterly} • Annual: ${plan.priceAnnually}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.userLimit === 9999 ? 'Unlimited' : plan.userLimit} users</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.storageLimit} storage</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {plan.active ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <Badge variant={plan.active ? "default" : "secondary"}>
                          {plan.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{plan.tenantCount}</span>
                        <span className="text-sm text-muted-foreground">companies</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold">
                          ${plan.monthlyRevenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            View Tenants
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {plan.active ? (
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
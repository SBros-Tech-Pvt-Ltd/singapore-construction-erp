'use client';

import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Calendar,
  CreditCard,
  Building,
  Package,
  DollarSign,
  Clock,
  Save,
  X,
  Eye,
  Info,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

// Static JSON Data
const tenants = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'admin@acme.com',
    currentPlan: 'professional',
    currentPlanName: 'Professional',
    currentPrice: 599,
    billingCycle: 'monthly',
    subscriptionId: 'SUB-001',
    status: 'active',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-12-15T00:00:00Z',
    nextBillingDate: '2024-02-15T00:00:00Z',
    users: 87,
    maxUsers: 200
  },
  {
    id: '2',
    name: 'TechStart Solutions',
    email: 'hello@techstart.io',
    currentPlan: 'starter',
    currentPlanName: 'Starter',
    currentPrice: 299,
    billingCycle: 'monthly',
    subscriptionId: 'SUB-002',
    status: 'active',
    startDate: '2024-01-20T00:00:00Z',
    endDate: '2024-12-20T00:00:00Z',
    nextBillingDate: '2024-02-20T00:00:00Z',
    users: 32,
    maxUsers: 50
  },
  {
    id: '3',
    name: 'Globex Industries',
    email: 'contact@globex.com',
    currentPlan: 'enterprise',
    currentPlanName: 'Enterprise',
    currentPrice: 1299,
    billingCycle: 'annually',
    subscriptionId: 'SUB-003',
    status: 'expiring_soon',
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2025-01-10T00:00:00Z',
    nextBillingDate: '2025-01-10T00:00:00Z',
    users: 342,
    maxUsers: 9999
  },
  {
    id: '4',
    name: 'Healthcare Plus',
    email: 'info@healthplus.com',
    currentPlan: 'trial',
    currentPlanName: 'Trial',
    currentPrice: 0,
    billingCycle: 'monthly',
    subscriptionId: 'SUB-004',
    status: 'trial',
    startDate: '2024-01-25T00:00:00Z',
    endDate: '2024-02-24T00:00:00Z',
    nextBillingDate: '2024-02-24T00:00:00Z',
    users: 8,
    maxUsers: 10
  },
  {
    id: '5',
    name: 'EduTech Learning',
    email: 'admin@edutech.edu',
    currentPlan: 'professional',
    currentPlanName: 'Professional',
    currentPrice: 599,
    billingCycle: 'monthly',
    subscriptionId: 'SUB-005',
    status: 'payment_failed',
    startDate: '2024-01-05T00:00:00Z',
    endDate: '2025-01-05T00:00:00Z',
    nextBillingDate: '2024-02-05T00:00:00Z',
    users: 145,
    maxUsers: 200
  }
];

const plans = [
  {
    id: 'trial',
    name: 'Trial',
    price: 0,
    maxUsers: 10,
    storage: '1GB',
    features: ['Basic features', 'Email support', '30 days trial'],
    color: 'slate',
    popular: false
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    maxUsers: 50,
    storage: '10GB',
    features: ['All basic features', 'Priority support', 'Custom branding'],
    color: 'blue',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 599,
    maxUsers: 200,
    storage: '50GB',
    features: ['All features', 'Advanced reporting', 'API access', 'Priority support'],
    color: 'purple',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 1299,
    maxUsers: 9999,
    storage: 'Unlimited',
    features: ['Everything in Professional', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
    color: 'amber',
    popular: false
  }
];

export default function ManualRenewalUpgradePage() {
  const getPlanColor = (color: string) => {
    const colors: Record<string, string> = {
      slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      blue: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
      purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800',
      amber: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200 dark:from-amber-900/50 dark:to-orange-900/50 dark:text-amber-300 dark:border-amber-800'
    };
    return colors[color] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800',
      trial: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800',
      expiring_soon: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800',
      payment_failed: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800'
    };
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-SG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculatePricing = (currentPrice: number, newPrice: number, billingCycle: string) => {
    const difference = newPrice - currentPrice;
    const isUpgrade = difference > 0;
    const isDowngrade = difference < 0;
    
    return { difference, isUpgrade, isDowngrade };
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-white">{tenants.filter(t => t.status === 'active').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-white/90" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Expiring Soon</p>
                  <p className="text-3xl font-bold text-white">
                    {tenants.filter(t => t.status === 'expiring_soon').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-white/90" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Trial Accounts</p>
                  <p className="text-3xl font-bold text-white">
                    {tenants.filter(t => t.status === 'trial').length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-white/90" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Payment Failed</p>
                  <p className="text-3xl font-bold text-white">
                    {tenants.filter(t => t.status === 'payment_failed').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-white/90" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                  <Input 
                    placeholder="Search by company name, email, or subscription ID..." 
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                  <SelectItem value="payment_failed">Payment Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                className="border-0 bg-emerald-500 dark:bg-emerald-600 
                           text-white dark:text-white
                           hover:bg-emerald-600 dark:hover:bg-emerald-700
                           shadow-md hover:shadow-lg
                           transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tenants List */}
        <div className="grid grid-cols-1 gap-6">
          {tenants.map((tenant) => (
            <Card key={tenant.id} className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 text-lg">
                          {tenant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tenant.name}</h3>
                          <Badge className={getStatusColor(tenant.status)}>
                            {tenant.status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{tenant.email}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            {tenant.subscriptionId}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Next billing: {formatDate(tenant.nextBillingDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getPlanColor(
                        tenant.currentPlan === 'trial' ? 'slate' :
                        tenant.currentPlan === 'starter' ? 'blue' :
                        tenant.currentPlan === 'professional' ? 'purple' : 'amber'
                      )}>
                        {tenant.currentPlanName}
                      </Badge>
                      <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                        ${tenant.currentPrice}<span className="text-sm text-slate-500 dark:text-slate-400 font-normal">/mo</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{tenant.billingCycle}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Users</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{tenant.users} / {tenant.maxUsers === 9999 ? '∞' : tenant.maxUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Start Date</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{formatDate(tenant.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">End Date</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{formatDate(tenant.endDate)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-emerald-500 dark:border-emerald-600
                                       text-emerald-700 dark:text-emerald-300
                                       hover:bg-emerald-50 dark:hover:bg-emerald-950/30
                                       font-semibold"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Renew
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                          <DialogHeader>
                            <DialogTitle className="text-slate-900 dark:text-slate-100">Renew Subscription</DialogTitle>
                            <DialogDescription className="text-slate-600 dark:text-slate-400">
                              Manually renew subscription for {tenant.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
                              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <AlertDescription className="text-blue-800 dark:text-blue-300">
                                <strong>Current Subscription:</strong> {tenant.currentPlanName} - ${tenant.currentPrice}/{tenant.billingCycle}
                              </AlertDescription>
                            </Alert>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Renewal Period</Label>
                                <Select defaultValue={tenant.billingCycle}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="monthly">1 Month - ${tenant.currentPrice}</SelectItem>
                                    <SelectItem value="quarterly">3 Months - ${tenant.currentPrice * 3 * 0.95} (5% off)</SelectItem>
                                    <SelectItem value="annually">12 Months - ${tenant.currentPrice * 12 * 0.9} (10% off)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Start Date</Label>
                                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Payment Method</Label>
                                <Select defaultValue="manual">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="manual">Manual Payment</SelectItem>
                                    <SelectItem value="card">Credit Card on File</SelectItem>
                                    <SelectItem value="bank">Bank Transfer</SelectItem>
                                    <SelectItem value="invoice">Invoice</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Notes (Optional)</Label>
                                <Textarea placeholder="Add any notes about this renewal..." rows={3} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" className="border-slate-200 dark:border-slate-700">Cancel</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Process Renewal
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Change Plan
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                          <DialogHeader>
                            <DialogTitle className="text-slate-900 dark:text-slate-100">Change Subscription Plan</DialogTitle>
                            <DialogDescription className="text-slate-600 dark:text-slate-400">
                              Upgrade or downgrade subscription for {tenant.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
                              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <AlertDescription className="text-blue-800 dark:text-blue-300">
                                <strong>Current Plan:</strong> {tenant.currentPlanName} - ${tenant.currentPrice}/{tenant.billingCycle}
                              </AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Select New Plan</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {plans.filter(p => p.id !== tenant.currentPlan).map((plan) => {
                                  const pricing = calculatePricing(tenant.currentPrice, plan.price, tenant.billingCycle);
                                  return (
                                    <div
                                      key={plan.id}
                                      className="relative p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-slate-800"
                                    >
                                      {plan.popular && (
                                        <Badge className="absolute -top-3 left-4 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                                          Popular
                                        </Badge>
                                      )}
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <Badge className={getPlanColor(plan.color)}>
                                            {plan.name}
                                          </Badge>
                                          {pricing.isUpgrade && (
                                            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm">
                                              <TrendingUp className="h-4 w-4" />
                                              <span>Upgrade</span>
                                            </div>
                                          )}
                                          {pricing.isDowngrade && (
                                            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-sm">
                                              <ArrowDownRight className="h-4 w-4" />
                                              <span>Downgrade</span>
                                            </div>
                                          )}
                                        </div>
                                        <div>
                                          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                            ${plan.price}
                                            <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">/month</span>
                                          </div>
                                          {pricing.difference !== 0 && (
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                              {pricing.isUpgrade ? '+' : ''}{pricing.difference > 0 ? pricing.difference : pricing.difference} /month difference
                                            </p>
                                          )}
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-sm text-slate-600 dark:text-slate-400">Up to {plan.maxUsers === 9999 ? 'Unlimited' : plan.maxUsers} users</p>
                                          <p className="text-sm text-slate-600 dark:text-slate-400">{plan.storage} storage</p>
                                        </div>
                                        <ul className="space-y-1">
                                          {plan.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                              <CheckCircle className="h-3 w-3 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" />
                                              {feature}
                                            </li>
                                          ))}
                                        </ul>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" size="sm">
                                          Select {plan.name}
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Effective Date</Label>
                                <Select defaultValue="immediate">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="immediate">Immediate (Today)</SelectItem>
                                    <SelectItem value="next_cycle">Next Billing Cycle</SelectItem>
                                    <SelectItem value="custom">Custom Date</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Billing Cycle</Label>
                                <Select defaultValue={tenant.billingCycle}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly (5% off)</SelectItem>
                                    <SelectItem value="annually">Annually (10% off)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Reason for Change</Label>
                                <Textarea placeholder="Document the reason for this plan change..." rows={3} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" className="border-slate-200 dark:border-slate-700">Cancel</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                              <Save className="h-4 w-4 mr-2" />
                              Apply Plan Change
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Guide */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Zap className="h-5 w-5" />
              Quick Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Manual Renewal</h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Use for expired subscriptions or payment failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Select renewal period and payment method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Add notes for documentation purposes</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Plan Changes</h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Upgrade for more features and higher limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Downgrade to reduce costs (loses some features)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Choose effective date: immediate or next cycle</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


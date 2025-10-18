'use client';

import {
  CreditCard,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  TrendingUp,
  RefreshCw,
  Download,
  Send,
  Ban,
  Settings,
  ArrowUpRight,
  Users} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

// Static JSON Data
const subscriptions = [
  {
    id: 'SUB-001',
    tenantId: '1',
    tenantName: 'Acme Corporation',
    tenantLogo: '',
    contactEmail: 'admin@acme.com',
    planId: 'professional',
    planName: 'Professional',
    planPrice: 599,
    currency: 'SGD',
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-12-15T00:00:00Z',
    nextBillingDate: '2024-02-15T00:00:00Z',
    autoRenew: true,
    users: 87,
    maxUsers: 200,
    mrr: 599,
    totalPaid: 5391,
    paymentMethod: 'Credit Card',
    lastPaymentDate: '2024-01-15T00:00:00Z',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'SUB-002',
    tenantId: '2',
    tenantName: 'TechStart Solutions',
    tenantLogo: '',
    contactEmail: 'hello@techstart.io',
    planId: 'starter',
    planName: 'Starter',
    planPrice: 299,
    currency: 'SGD',
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2024-01-20T00:00:00Z',
    endDate: '2024-12-20T00:00:00Z',
    nextBillingDate: '2024-02-20T00:00:00Z',
    autoRenew: true,
    users: 32,
    maxUsers: 50,
    mrr: 299,
    totalPaid: 2691,
    paymentMethod: 'Credit Card',
    lastPaymentDate: '2024-01-20T00:00:00Z',
    createdAt: '2024-01-20T14:00:00Z'
  },
  {
    id: 'SUB-003',
    tenantId: '3',
    tenantName: 'Globex Industries',
    tenantLogo: '',
    contactEmail: 'contact@globex.com',
    planId: 'enterprise',
    planName: 'Enterprise',
    planPrice: 1299,
    currency: 'SGD',
    billingCycle: 'annually',
    status: 'expiring_soon',
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2025-01-10T00:00:00Z',
    nextBillingDate: '2025-01-10T00:00:00Z',
    autoRenew: false,
    users: 342,
    maxUsers: 9999,
    mrr: 1299,
    totalPaid: 15588,
    paymentMethod: 'Bank Transfer',
    lastPaymentDate: '2024-01-10T00:00:00Z',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'SUB-004',
    tenantId: '4',
    tenantName: 'Healthcare Plus',
    tenantLogo: '',
    contactEmail: 'info@healthplus.com',
    planId: 'trial',
    planName: 'Trial',
    planPrice: 0,
    currency: 'SGD',
    billingCycle: 'monthly',
    status: 'trial',
    startDate: '2024-01-25T00:00:00Z',
    endDate: '2024-02-24T00:00:00Z',
    nextBillingDate: '2024-02-24T00:00:00Z',
    autoRenew: false,
    users: 8,
    maxUsers: 10,
    mrr: 0,
    totalPaid: 0,
    paymentMethod: 'None',
    lastPaymentDate: null,
    createdAt: '2024-01-25T11:00:00Z'
  },
  {
    id: 'SUB-005',
    tenantId: '5',
    tenantName: 'EduTech Learning',
    tenantLogo: '',
    contactEmail: 'admin@edutech.edu',
    planId: 'professional',
    planName: 'Professional',
    planPrice: 599,
    currency: 'SGD',
    billingCycle: 'monthly',
    status: 'payment_failed',
    startDate: '2024-01-05T00:00:00Z',
    endDate: '2025-01-05T00:00:00Z',
    nextBillingDate: '2024-02-05T00:00:00Z',
    autoRenew: true,
    users: 145,
    maxUsers: 200,
    mrr: 599,
    totalPaid: 5391,
    paymentMethod: 'Credit Card',
    lastPaymentDate: '2024-01-05T00:00:00Z',
    createdAt: '2024-01-05T16:00:00Z'
  },
  {
    id: 'SUB-006',
    tenantId: '6',
    tenantName: 'RetailMax Co',
    tenantLogo: '',
    contactEmail: 'billing@retailmax.com',
    planId: 'starter',
    planName: 'Starter',
    planPrice: 299,
    currency: 'SGD',
    billingCycle: 'quarterly',
    status: 'active',
    startDate: '2024-01-12T00:00:00Z',
    endDate: '2024-12-12T00:00:00Z',
    nextBillingDate: '2024-04-12T00:00:00Z',
    autoRenew: true,
    users: 28,
    maxUsers: 50,
    mrr: 285,
    totalPaid: 855,
    paymentMethod: 'Credit Card',
    lastPaymentDate: '2024-01-12T00:00:00Z',
    createdAt: '2024-01-12T13:00:00Z'
  },
  {
    id: 'SUB-007',
    tenantId: '7',
    tenantName: 'FinanceHub Ltd',
    tenantLogo: '',
    contactEmail: 'accounts@financehub.com',
    planId: 'enterprise',
    planName: 'Enterprise',
    planPrice: 1299,
    currency: 'SGD',
    billingCycle: 'monthly',
    status: 'suspended',
    startDate: '2024-01-08T00:00:00Z',
    endDate: '2025-01-08T00:00:00Z',
    nextBillingDate: null,
    autoRenew: false,
    users: 0,
    maxUsers: 9999,
    mrr: 0,
    totalPaid: 14690,
    paymentMethod: 'Bank Transfer',
    lastPaymentDate: '2024-01-08T00:00:00Z',
    createdAt: '2024-01-08T10:00:00Z'
  },
  {
    id: 'SUB-008',
    tenantId: '8',
    tenantName: 'StartupVentures',
    tenantLogo: '',
    contactEmail: 'team@startupventures.io',
    planId: 'professional',
    planName: 'Professional',
    planPrice: 599,
    currency: 'SGD',
    billingCycle: 'annually',
    status: 'cancelled',
    startDate: '2024-01-03T00:00:00Z',
    endDate: '2024-06-03T00:00:00Z',
    nextBillingDate: null,
    autoRenew: false,
    users: 0,
    maxUsers: 200,
    mrr: 0,
    totalPaid: 2995,
    paymentMethod: 'Credit Card',
    lastPaymentDate: '2024-01-03T00:00:00Z',
    createdAt: '2024-01-03T15:00:00Z'
  }
];

// Table components
const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <table className={`w-full ${className}`}>{children}</table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-slate-50 dark:bg-slate-800">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">{children}</tr>
);

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">{children}</th>
);

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-sm ${className}`}>{children}</td>
);

export default function AllSubscriptionsPage() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800',
      trial: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800',
      expiring_soon: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800',
      payment_failed: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800',
      suspended: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800',
      cancelled: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
    };
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      active: CheckCircle,
      trial: Clock,
      expiring_soon: AlertCircle,
      payment_failed: XCircle,
      suspended: Ban,
      cancelled: XCircle
    };
    const IconComponent = icons[status] || AlertCircle;
    return <IconComponent className="h-4 w-4" />;
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-SG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} $${amount.toLocaleString()}`;
  };

  const getPlanColor = (planId: string) => {
    const colors: Record<string, string> = {
      trial: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      starter: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
      professional: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800',
      enterprise: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200 dark:from-amber-900/50 dark:to-orange-900/50 dark:text-amber-300 dark:border-amber-800'
    };
    return colors[planId] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  // Calculate stats
  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    trial: subscriptions.filter(s => s.status === 'trial').length,
    totalMRR: subscriptions.filter(s => s.status === 'active' || s.status === 'trial').reduce((sum, s) => sum + s.mrr, 0),
    totalRevenue: subscriptions.reduce((sum, s) => sum + s.totalPaid, 0)
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 bg-gradient-to-br from-slate-500 to-slate-600 dark:from-slate-600 dark:to-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Total Subscriptions</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                  <p className="text-xs text-white/70">All tenants</p>
                </div>
                <CreditCard className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Active</p>
                  <p className="text-3xl font-bold text-white">{stats.active}</p>
                  <p className="text-xs text-white/70">{Math.round((stats.active / stats.total) * 100)}% of total</p>
                </div>
                <CheckCircle className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Trial</p>
                  <p className="text-3xl font-bold text-white">{stats.trial}</p>
                  <p className="text-xs text-white/70">Free trials</p>
                </div>
                <Clock className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white">
                    ${stats.totalMRR.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/70">MRR</p>
                </div>
                <TrendingUp className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">
                    ${stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/70">All time</p>
                </div>
                <DollarSign className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                  <Input placeholder="Search by company name, email, or subscription ID..." className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active ({subscriptions.filter(s => s.status === 'active').length})</SelectItem>
                  <SelectItem value="trial">Trial ({subscriptions.filter(s => s.status === 'trial').length})</SelectItem>
                  <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                  <SelectItem value="payment_failed">Payment Failed</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Billing Cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cycles</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-slate-900 dark:text-slate-100">Subscriptions ({subscriptions.length})</CardTitle>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-0 bg-black dark:bg-gray-900 
                             text-white dark:text-white
                             hover:bg-gray-800 dark:hover:bg-gray-800
                             shadow-md hover:shadow-lg
                             transition-all duration-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
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
                <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Columns
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Billing</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>MRR</TableHead>
                    <TableHead>Total Paid</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                              {subscription.tenantName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {subscription.tenantName}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{subscription.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(subscription.planId)}>
                          {subscription.planName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(subscription.status)}
                          <Badge className={getStatusColor(subscription.status)}>
                            {subscription.status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {formatCurrency(subscription.planPrice, subscription.currency)}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                            {subscription.billingCycle}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{subscription.users}</span>
                          <span className="text-slate-500 dark:text-slate-400">/ {subscription.maxUsers === 9999 ? '∞' : subscription.maxUsers}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                          <span className="text-sm">{formatDate(subscription.nextBillingDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          ${subscription.mrr.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          ${subscription.totalPaid.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              Upgrade Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Send Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {subscription.status === 'active' ? (
                              <DropdownMenuItem className="text-amber-600 dark:text-amber-400">
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            ) : subscription.status === 'suspended' ? (
                              <DropdownMenuItem className="text-green-600 dark:text-green-400">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Reactivate
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel Subscription
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


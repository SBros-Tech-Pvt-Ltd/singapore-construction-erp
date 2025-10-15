'use client';

import { useState } from 'react';
import {
  Mail,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  Code,
  FileText,
  Clock,
  Settings,
  Tag,
  Download,
  TrendingUp,
  Users,
  Activity,
  Zap,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

// Static JSON Data
const emailTemplates = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to {{company_name}} - Let\'s Get Started!',
    category: 'Onboarding',
    type: 'Transactional',
    description: 'Sent to new users when they join the platform',
    content: `
      <h1>Welcome to {{company_name}}!</h1>
      <p>Hi {{user_name}},</p>
      <p>Thank you for joining us. We're excited to have you on board.</p>
      <p>Your account is now active. You can login using:</p>
      <ul>
        <li>Email: {{user_email}}</li>
        <li>Subdomain: {{tenant_subdomain}}.yourapp.com</li>
      </ul>
      <a href="{{login_url}}">Get Started</a>
    `,
    variables: ['company_name', 'user_name', 'user_email', 'tenant_subdomain', 'login_url'],
    active: true,
    usageCount: 245,
    lastUsed: '2024-01-20T14:30:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 87.5,
    clickRate: 45.2
  },
  {
    id: 2,
    name: 'Invoice Payment',
    subject: 'Invoice {{invoice_number}} - Payment Received',
    category: 'Billing',
    type: 'Transactional',
    description: 'Confirmation email sent after successful payment',
    content: `
      <h1>Payment Received</h1>
      <p>Hi {{customer_name}},</p>
      <p>Thank you for your payment of {{currency}} {{amount}}.</p>
      <p><strong>Invoice Details:</strong></p>
      <ul>
        <li>Invoice: {{invoice_number}}</li>
        <li>Amount: {{currency}} {{amount}}</li>
        <li>Date: {{payment_date}}</li>
        <li>Plan: {{plan_name}}</li>
      </ul>
      <a href="{{invoice_url}}">Download Invoice</a>
    `,
    variables: ['customer_name', 'currency', 'amount', 'invoice_number', 'payment_date', 'plan_name', 'invoice_url'],
    active: true,
    usageCount: 892,
    lastUsed: '2024-01-20T16:45:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 92.3,
    clickRate: 78.4
  },
  {
    id: 3,
    name: 'Subscription Renewal',
    subject: 'Your {{plan_name}} Subscription Renews in {{days_left}} Days',
    category: 'Billing',
    type: 'Marketing',
    description: 'Reminder sent before subscription renewal',
    content: `
      <h1>Subscription Renewal Reminder</h1>
      <p>Hi {{customer_name}},</p>
      <p>Your {{plan_name}} subscription will renew on {{renewal_date}}.</p>
    `,
    variables: ['customer_name', 'plan_name', 'days_left', 'renewal_date', 'currency', 'amount', 'user_count', 'billing_url'],
    active: true,
    usageCount: 156,
    lastUsed: '2024-01-19T09:15:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 76.8,
    clickRate: 34.5
  },
  {
    id: 4,
    name: 'Password Reset',
    subject: 'Reset Your Password - {{company_name}}',
    category: 'Security',
    type: 'Transactional',
    description: 'Password reset link for users',
    content: `
      <h1>Password Reset Request</h1>
      <p>Hi {{user_name}},</p>
      <p>We received a request to reset your password for {{company_name}}.</p>
    `,
    variables: ['user_name', 'company_name', 'expiry_time', 'reset_url'],
    active: true,
    usageCount: 67,
    lastUsed: '2024-01-20T11:20:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 94.1,
    clickRate: 89.7
  },
  {
    id: 5,
    name: 'User Invitation',
    subject: 'You\'ve Been Invited to Join {{company_name}}',
    category: 'Onboarding',
    type: 'Transactional',
    description: 'Invitation email for new team members',
    content: `
      <h1>You're Invited!</h1>
      <p>Hi {{invitee_name}},</p>
      <p>{{inviter_name}} has invited you to join {{company_name}} as a {{role}}.</p>
    `,
    variables: ['invitee_name', 'inviter_name', 'company_name', 'role', 'accept_url', 'expiry_days'],
    active: true,
    usageCount: 423,
    lastUsed: '2024-01-20T13:50:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 83.6,
    clickRate: 67.3
  },
  {
    id: 6,
    name: 'Plan Upgrade',
    subject: 'Congratulations! Your Plan Has Been Upgraded',
    category: 'Billing',
    type: 'Marketing',
    description: 'Confirmation email after plan upgrade',
    content: `
      <h1>Plan Upgraded Successfully!</h1>
      <p>Hi {{customer_name}},</p>
      <p>Great news! Your subscription has been upgraded to {{new_plan}}.</p>
    `,
    variables: ['customer_name', 'new_plan', 'user_limit', 'storage_limit', 'next_billing_date', 'dashboard_url'],
    active: true,
    usageCount: 89,
    lastUsed: '2024-01-18T15:30:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 88.9,
    clickRate: 72.1
  },
  {
    id: 7,
    name: 'Subscription Expired',
    subject: 'Your {{plan_name}} Subscription Has Expired',
    category: 'Billing',
    type: 'Transactional',
    description: 'Notification when subscription expires',
    content: `
      <h1>Subscription Expired</h1>
      <p>Hi {{customer_name}},</p>
      <p>Your {{plan_name}} subscription expired on {{expiry_date}}.</p>
    `,
    variables: ['customer_name', 'plan_name', 'expiry_date', 'renewal_url'],
    active: false,
    usageCount: 34,
    lastUsed: '2024-01-17T10:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 45.2,
    clickRate: 12.8
  },
  {
    id: 8,
    name: 'Monthly Report',
    subject: 'Your Monthly Activity Report - {{month}} {{year}}',
    category: 'Reporting',
    type: 'Marketing',
    description: 'Monthly usage and activity summary',
    content: `
      <h1>Monthly Report - {{month}} {{year}}</h1>
      <p>Hi {{customer_name}},</p>
      <p>Here's your monthly activity summary</p>
    `,
    variables: ['customer_name', 'month', 'year', 'active_users', 'total_logins', 'storage_used', 'api_calls', 'report_url'],
    active: true,
    usageCount: 128,
    lastUsed: '2024-01-20T08:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    openRate: 71.4,
    clickRate: 38.9
  }
];

export default function EmailTemplateMasterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatDistanceToNow = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Filter templates
  const filteredTemplates = emailTemplates.filter((template) => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && template.active) ||
      (statusFilter === 'inactive' && !template.active);
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  // Calculate stats
  const stats = {
    totalTemplates: emailTemplates.length,
    activeTemplates: emailTemplates.filter(t => t.active).length,
    totalSent: emailTemplates.reduce((sum, t) => sum + t.usageCount, 0),
    categories: [...new Set(emailTemplates.map(t => t.category))].length,
    avgOpenRate: (emailTemplates.reduce((sum, t) => sum + t.openRate, 0) / emailTemplates.length).toFixed(1),
    avgClickRate: (emailTemplates.reduce((sum, t) => sum + t.clickRate, 0) / emailTemplates.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
      

        {/* Stats Cards - Dark Gradient Design */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Card 1: Total Templates - Blue */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Total</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.totalTemplates}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Templates
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Active - Green */}
          <Card className="border-0 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Active</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.activeTemplates}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Ready to use
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Total Sent - Purple */}
          <Card className="border-0 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Sent</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{(stats.totalSent / 1000).toFixed(1)}k</div>
              <p className="text-[10px] text-white/80 mt-1">
                Delivered
              </p>
            </CardContent>
          </Card>

          {/* Card 4: Categories - Cyan */}
          <Card className="border-0 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Categories</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.categories}</div>
              <p className="text-[10px] text-white/80 mt-1">
                Groups
              </p>
            </CardContent>
          </Card>

          {/* Card 5: Open Rate - Orange */}
          <Card className="border-0 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Open Rate</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.avgOpenRate}%</div>
              <p className="text-[10px] text-white/80 mt-1">
                Average
              </p>
            </CardContent>
          </Card>

          {/* Card 6: Click Rate - Amber */}
          <Card className="border-0 bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-white">Click Rate</CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.avgClickRate}%</div>
              <p className="text-[10px] text-white/80 mt-1">
                Average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 md:gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search templates..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Reporting">Reporting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Transactional">Transactional</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Email Template</DialogTitle>
                <DialogDescription>
                  Design a new email template with dynamic variables
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="variables">Variables</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name *</Label>
                      <Input id="template-name" placeholder="e.g., Welcome Email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onboarding">Onboarding</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="reporting">Reporting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type *</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transactional">Transactional</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status *</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line *</Label>
                    <Input id="subject" placeholder="e.g., Welcome to {{company_name}}" />
                    <p className="text-xs text-muted-foreground">
                      Use {'{'}variable_name{'}'} for dynamic content
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of when this template is used..." rows={3} />
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Email Content (HTML) *</Label>
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-2" />
                        View HTML
                      </Button>
                    </div>
                    <Textarea 
                      id="content"
                      placeholder="Enter HTML content with {{variables}}..."
                      rows={15}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported variables: {'{'}user_name{'}'}, {'{'}company_name{'}'}, {'{'}email{'}'}, etc.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        Email preview will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="variables" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Dynamic Variables</Label>
                    <p className="text-sm text-muted-foreground">
                      Add variables that can be dynamically replaced in the email content
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input placeholder="Variable name (e.g., user_name)" className="flex-1" />
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium">Common Variables:</p>
                      <div className="flex flex-wrap gap-2">
                        {['user_name', 'user_email', 'company_name', 'tenant_subdomain', 'login_url', 'support_email'].map(variable => (
                          <Badge key={variable} variant="secondary" className="cursor-pointer">
                            <Tag className="h-3 w-3 mr-1" />
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Usage:</strong> Variables are enclosed in double curly braces. 
                        Example: {'{{'}user_name{'}}'} will be replaced with the actual user's name.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button className="w-full sm:w-auto">
                  <Mail className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Templates Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base md:text-lg">
                Email Templates ({filteredTemplates.length})
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Columns
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Template</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden lg:table-cell">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Usage</TableHead>
                    <TableHead className="hidden xl:table-cell">Performance</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Used</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No templates found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate">{template.name}</div>
                              <p className="text-sm text-muted-foreground truncate">{template.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{template.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {template.active ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Inactive</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Send className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{template.usageCount.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{formatDistanceToNow(template.lastUsed)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Send Test
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Code className="h-4 w-4 mr-2" />
                                View HTML
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="h-4 w-4 mr-2" />
                                Variables ({template.variables.length})
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {template.active ? (
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Variables Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Available Variables Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">User Variables</h4>
                <div className="space-y-1">
                  {['user_name', 'user_email', 'user_id', 'user_role'].map(variable => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {'{{'}{variable}{'}}'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Company Variables</h4>
                <div className="space-y-1">
                  {['company_name', 'tenant_subdomain', 'company_email', 'company_phone'].map(variable => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {'{{'}{variable}{'}}'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Billing Variables</h4>
                <div className="space-y-1">
                  {['plan_name', 'amount', 'currency', 'invoice_number', 'renewal_date'].map(variable => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {'{{'}{variable}{'}}'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">URL Variables</h4>
                <div className="space-y-1">
                  {['login_url', 'dashboard_url', 'reset_url', 'billing_url'].map(variable => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {'{{'}{variable}{'}}'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">System Variables</h4>
                <div className="space-y-1">
                  {['current_date', 'current_year', 'support_email', 'app_name'].map(variable => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {'{{'}{variable}{'}}'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Custom Variables</h4>
                <div className="space-y-1">
                  {['days_left', 'expiry_time', 'inviter_name', 'storage_used'].map(variable => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {'{{'}{variable}{'}}'}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Alert className="mt-6">
              <AlertDescription>
                <strong>How to use:</strong> Variables are automatically replaced with actual values when emails are sent. 
                Simply wrap variable names in double curly braces: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'{{'}variable_name{'}}'}</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
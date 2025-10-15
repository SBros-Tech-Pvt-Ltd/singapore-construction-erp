'use client';

import { useState } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Globe,
  Mail,
  Lock,
  CreditCard,
  Palette,
  Database,
  Server,
  Bell,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  Upload,
  Eye,
  EyeOff,
  Zap,
  Cloud,
  Key,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';

// Static JSON Data for current settings
const systemSettings = {
  general: {
    appName: 'ERP System',
    appUrl: 'https://app.yourcompany.com',
    supportEmail: 'support@yourcompany.com',
    timezone: 'Asia/Singapore',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    defaultCurrency: 'SGD',
    defaultLanguage: 'en',
    maintenanceMode: false,
    registrationEnabled: true
  },
  email: {
    provider: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@yourcompany.com',
    smtpPassword: '••••••••••••',
    smtpEncryption: 'tls',
    fromName: 'ERP System',
    fromEmail: 'noreply@yourcompany.com',
    testEmailSent: true
  },
  payment: {
    stripeEnabled: true,
    stripePublicKey: 'pk_test_••••••••••••',
    stripeSecretKey: 'sk_test_••••••••••••',
    stripeWebhookSecret: 'whsec_••••••••••••',
    razorpayEnabled: true,
    razorpayKeyId: 'rzp_test_••••••••••••',
    razorpayKeySecret: '••••••••••••',
    paypalEnabled: false,
    paypalClientId: '',
    paypalClientSecret: '',
    currency: 'SGD',
    taxRate: '8',
    trialDays: '30'
  },
  branding: {
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#8b5cf6',
    companyName: 'Your Company',
    tagline: 'Enterprise Resource Planning Made Simple'
  },
  security: {
    twoFactorEnabled: true,
    sessionTimeout: '60',
    passwordMinLength: '8',
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecial: true,
    maxLoginAttempts: '5',
    ipWhitelisting: false,
    apiRateLimit: '1000'
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newTenantAlert: true,
    paymentAlert: true,
    systemErrorAlert: true,
    weeklyReport: true,
    monthlyReport: true
  },
  database: {
    provider: 'PostgreSQL',
    host: 'localhost',
    port: '5432',
    name: 'erp_system',
    backupEnabled: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    lastBackup: '2024-01-20T02:00:00Z'
  },
  storage: {
    provider: 'AWS S3',
    awsAccessKey: 'AKIA••••••••••••',
    awsSecretKey: '••••••••••••',
    awsBucket: 'erp-storage',
    awsRegion: 'ap-southeast-1',
    maxUploadSize: '10',
    allowedFileTypes: 'pdf,doc,docx,xls,xlsx,jpg,png,jpeg'
  }
};

export default function SystemSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SMTP Status</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Connected</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Gateway</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h ago</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto">
            <TabsTrigger value="general" className="flex flex-col gap-1 py-2">
              <Globe className="h-4 w-4" />
              <span className="text-xs">General</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex flex-col gap-1 py-2">
              <Mail className="h-4 w-4" />
              <span className="text-xs">Email</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex flex-col gap-1 py-2">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex flex-col gap-1 py-2">
              <Palette className="h-4 w-4" />
              <span className="text-xs">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col gap-1 py-2">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col gap-1 py-2">
              <Bell className="h-4 w-4" />
              <span className="text-xs">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex flex-col gap-1 py-2">
              <Database className="h-4 w-4" />
              <span className="text-xs">Database</span>
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex flex-col gap-1 py-2">
              <Cloud className="h-4 w-4" />
              <span className="text-xs">Storage</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure basic application settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name *</Label>
                    <Input id="app-name" defaultValue={systemSettings.general.appName} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app-url">Application URL *</Label>
                    <Input id="app-url" defaultValue={systemSettings.general.appUrl} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email *</Label>
                    <Input id="support-email" type="email" defaultValue={systemSettings.general.supportEmail} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone *</Label>
                    <Select defaultValue={systemSettings.general.timezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format *</Label>
                    <Select defaultValue={systemSettings.general.dateFormat}>
                      <SelectTrigger id="date-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format *</Label>
                    <Select defaultValue={systemSettings.general.timeFormat}>
                      <SelectTrigger id="time-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 Hour</SelectItem>
                        <SelectItem value="24h">24 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency *</Label>
                    <Select defaultValue={systemSettings.general.defaultCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable to prevent new tenant registrations
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.general.maintenanceMode} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow New Registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new companies to register
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.general.registrationEnabled} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>
                  Configure SMTP settings for sending emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Email Provider *</Label>
                  <Select defaultValue={systemSettings.email.provider}>
                    <SelectTrigger id="email-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host *</Label>
                    <Input id="smtp-host" defaultValue={systemSettings.email.smtpHost} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port *</Label>
                    <Input id="smtp-port" defaultValue={systemSettings.email.smtpPort} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">SMTP Username *</Label>
                    <Input id="smtp-user" defaultValue={systemSettings.email.smtpUser} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">SMTP Password *</Label>
                    <div className="relative">
                      <Input 
                        id="smtp-pass"
                        type={showPassword ? "text" : "password"}
                        defaultValue={systemSettings.email.smtpPassword} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption *</Label>
                  <Select defaultValue={systemSettings.email.smtpEncryption}>
                    <SelectTrigger id="encryption">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name *</Label>
                    <Input id="from-name" defaultValue={systemSettings.email.fromName} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email *</Label>
                    <Input id="from-email" type="email" defaultValue={systemSettings.email.fromEmail} />
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>SMTP connection is active and working</span>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Test Email
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Gateway Settings
                </CardTitle>
                <CardDescription>
                  Configure payment providers and billing settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Stripe */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-muted-foreground">Accept card payments globally</p>
                      </div>
                    </div>
                    <Switch defaultChecked={systemSettings.payment.stripeEnabled} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-13">
                    <div className="space-y-2">
                      <Label htmlFor="stripe-pub">Publishable Key</Label>
                      <Input id="stripe-pub" defaultValue={systemSettings.payment.stripePublicKey} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-sec">Secret Key</Label>
                      <Input id="stripe-sec" type="password" defaultValue={systemSettings.payment.stripeSecretKey} />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                      <Input id="stripe-webhook" type="password" defaultValue={systemSettings.payment.stripeWebhookSecret} />
                    </div>
                  </div>
                </div>

                <div className="border-t"></div>

                {/* Razorpay */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Razorpay</h4>
                        <p className="text-sm text-muted-foreground">Popular in India and Southeast Asia</p>
                      </div>
                    </div>
                    <Switch defaultChecked={systemSettings.payment.razorpayEnabled} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-13">
                    <div className="space-y-2">
                      <Label htmlFor="razor-key">Key ID</Label>
                      <Input id="razor-key" defaultValue={systemSettings.payment.razorpayKeyId} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="razor-secret">Key Secret</Label>
                      <Input id="razor-secret" type="password" defaultValue={systemSettings.payment.razorpayKeySecret} />
                    </div>
                  </div>
                </div>

                <div className="border-t"></div>

                {/* PayPal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                      </div>
                    </div>
                    <Switch defaultChecked={systemSettings.payment.paypalEnabled} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-13">
                    <div className="space-y-2">
                      <Label htmlFor="paypal-id">Client ID</Label>
                      <Input id="paypal-id" placeholder="Enter PayPal Client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret">Client Secret</Label>
                      <Input id="paypal-secret" type="password" placeholder="Enter PayPal Client Secret" />
                    </div>
                  </div>
                </div>

                <div className="border-t"></div>

                {/* Billing Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium">Billing Settings</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pay-currency">Default Currency</Label>
                      <Select defaultValue={systemSettings.payment.currency}>
                        <SelectTrigger id="pay-currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SGD">SGD</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                      <Input id="tax-rate" type="number" defaultValue={systemSettings.payment.taxRate} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trial-days">Trial Period (Days)</Label>
                      <Input id="trial-days" type="number" defaultValue={systemSettings.payment.trialDays} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Settings */}
          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Branding & Appearance
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue={systemSettings.branding.companyName} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" defaultValue={systemSettings.branding.tagline} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border-2 bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended: 200x200px, PNG or SVG</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border-2 bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended: 32x32px, ICO or PNG</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Color Scheme</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-3">
                        <Input id="primary-color" type="color" defaultValue={systemSettings.branding.primaryColor} className="w-16 h-12" />
                        <Input defaultValue={systemSettings.branding.primaryColor} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex gap-3">
                        <Input id="secondary-color" type="color" defaultValue={systemSettings.branding.secondaryColor} className="w-16 h-12" />
                        <Input defaultValue={systemSettings.branding.secondaryColor} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-3">
                        <Input id="accent-color" type="color" defaultValue={systemSettings.branding.accentColor} className="w-16 h-12" />
                        <Input defaultValue={systemSettings.branding.accentColor} />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-6 bg-muted/50">
                    <h5 className="font-medium mb-4">Color Preview</h5>
                    <div className="flex gap-4">
                      <div className="space-y-2">
                        <div 
                          className="w-24 h-24 rounded-lg border-2 shadow-sm"
                          style={{ backgroundColor: systemSettings.branding.primaryColor }}
                        />
                        <p className="text-xs text-center text-muted-foreground">Primary</p>
                      </div>
                      <div className="space-y-2">
                        <div 
                          className="w-24 h-24 rounded-lg border-2 shadow-sm"
                          style={{ backgroundColor: systemSettings.branding.secondaryColor }}
                        />
                        <p className="text-xs text-center text-muted-foreground">Secondary</p>
                      </div>
                      <div className="space-y-2">
                        <div 
                          className="w-24 h-24 rounded-lg border-2 shadow-sm"
                          style={{ backgroundColor: systemSettings.branding.accentColor }}
                        />
                        <p className="text-xs text-center text-muted-foreground">Accent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin users
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.security.twoFactorEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Whitelisting</Label>
                      <p className="text-sm text-muted-foreground">
                        Restrict access to specific IP addresses
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.security.ipWhitelisting} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue={systemSettings.security.sessionTimeout} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input id="max-attempts" type="number" defaultValue={systemSettings.security.maxLoginAttempts} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Password Requirements</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pass-length">Minimum Password Length</Label>
                    <Input id="pass-length" type="number" defaultValue={systemSettings.security.passwordMinLength} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Require Uppercase Letters</Label>
                      <Switch defaultChecked={systemSettings.security.passwordRequireUppercase} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Require Numbers</Label>
                      <Switch defaultChecked={systemSettings.security.passwordRequireNumbers} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Require Special Characters</Label>
                      <Switch defaultChecked={systemSettings.security.passwordRequireSpecial} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="rate-limit">API Rate Limit (requests/hour)</Label>
                  <Input id="rate-limit" type="number" defaultValue={systemSettings.security.apiRateLimit} />
                  <p className="text-sm text-muted-foreground">
                    Maximum API requests per hour per tenant
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Security settings affect all tenants. Changes take effect immediately.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Channels</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via email
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.emailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via SMS
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.smsNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send browser push notifications
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.pushNotifications} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Alert Types</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Tenant Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert when new tenant registers
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.newTenantAlert} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payment Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert on successful payments
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.paymentAlert} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Error Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert on critical system errors
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.systemErrorAlert} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Scheduled Reports</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Summary Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly activity summary
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.weeklyReport} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Monthly Analytics Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive monthly analytics report
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.monthlyReport} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Settings */}
          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Configuration
                </CardTitle>
                <CardDescription>
                  Manage database connections and backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Database connection is healthy. Last backup: 2 hours ago
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="db-provider">Database Provider</Label>
                    <Select defaultValue={systemSettings.database.provider}>
                      <SelectTrigger id="db-provider">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                        <SelectItem value="MySQL">MySQL</SelectItem>
                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input id="db-name" defaultValue={systemSettings.database.name} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host</Label>
                    <Input id="db-host" defaultValue={systemSettings.database.host} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="db-port">Port</Label>
                    <Input id="db-port" defaultValue={systemSettings.database.port} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable automated database backups
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.database.backupEnabled} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="backup-freq">Backup Frequency</Label>
                      <Select defaultValue={systemSettings.database.backupFrequency}>
                        <SelectTrigger id="backup-freq">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="backup-retention">Retention Period (days)</Label>
                      <Input id="backup-retention" type="number" defaultValue={systemSettings.database.backupRetention} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <Database className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Backup Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage Settings */}
          <TabsContent value="storage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Storage Configuration
                </CardTitle>
                <CardDescription>
                  Configure cloud storage for file uploads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storage-provider">Storage Provider</Label>
                  <Select defaultValue={systemSettings.storage.provider}>
                    <SelectTrigger id="storage-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AWS S3">AWS S3</SelectItem>
                      <SelectItem value="Google Cloud">Google Cloud Storage</SelectItem>
                      <SelectItem value="Azure">Azure Blob Storage</SelectItem>
                      <SelectItem value="Local">Local Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="aws-access">AWS Access Key</Label>
                    <Input id="aws-access" defaultValue={systemSettings.storage.awsAccessKey} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aws-secret">AWS Secret Key</Label>
                    <Input id="aws-secret" type="password" defaultValue={systemSettings.storage.awsSecretKey} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="s3-bucket">S3 Bucket Name</Label>
                    <Input id="s3-bucket" defaultValue={systemSettings.storage.awsBucket} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aws-region">AWS Region</Label>
                    <Select defaultValue={systemSettings.storage.awsRegion}>
                      <SelectTrigger id="aws-region">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ap-southeast-1">ap-southeast-1 (Singapore)</SelectItem>
                        <SelectItem value="us-east-1">us-east-1 (N. Virginia)</SelectItem>
                        <SelectItem value="eu-west-1">eu-west-1 (Ireland)</SelectItem>
                        <SelectItem value="ap-south-1">ap-south-1 (Mumbai)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Upload Settings</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-upload">Maximum Upload Size (MB)</Label>
                    <Input id="max-upload" type="number" defaultValue={systemSettings.storage.maxUploadSize} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-types">Allowed File Types</Label>
                    <Input id="file-types" defaultValue={systemSettings.storage.allowedFileTypes} />
                    <p className="text-sm text-muted-foreground">
                      Comma-separated list of file extensions
                    </p>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>Storage connection is active</span>
                      <Button variant="outline" size="sm">
                        <Cloud className="h-4 w-4 mr-2" />
                        Test Connection
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Ready to Save Changes?</h4>
                  <p className="text-sm text-muted-foreground">
                    All changes will be applied immediately across the system
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset All
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save All Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
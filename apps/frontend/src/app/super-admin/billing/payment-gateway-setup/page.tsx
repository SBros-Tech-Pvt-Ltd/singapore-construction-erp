'use client';

import {CreditCard,Save,RefreshCw,CheckCircle,XCircle,Eye,EyeOff,Key,Shield,AlertCircle,Info,ExternalLink,
  Copy,Zap,DollarSign,Settings,Bell,Clock, X} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

// Static JSON Data
const paymentGateways = {
  stripe: {
    id: 'stripe',
    name: 'Stripe',
    logo: '💳',
    enabled: true,
    testMode: false,
    status: 'connected',
    credentials: {
      publishableKey: 'pk_live_51J3K2LSGbKb4PQ5E8h2nNLwZ9XxYyZzAaBbCcDdEeFfGgHhIiJjKk',
      secretKey: 'sk_live_••••••••••••••••••••••••••••••••',
      webhookSecret: 'whsec_••••••••••••••••••••••••••••'
    },
    testCredentials: {
      publishableKey: 'pk_test_51J3K2LSGbKb4PQ5E8h2nNLwZ9XxYyZzAaBbCcDdEeFfGgHhIiJjKk',
      secretKey: 'sk_test_••••••••••••••••••••••••••••••••',
      webhookSecret: 'whsec_••••••••••••••••••••••••••••'
    },
    settings: {
      currency: 'SGD',
      captureMethod: 'automatic',
      statementDescriptor: 'ERP SYSTEM',
      webhookEvents: ['payment_intent.succeeded', 'customer.subscription.created', 'invoice.payment_failed']
    },
    stats: {
      totalTransactions: 1247,
      successRate: 98.5,
      totalVolume: 456780,
      lastTransaction: '2024-01-20T15:30:00Z'
    }
  },
  razorpay: {
    id: 'razorpay',
    name: 'Razorpay',
    logo: '💰',
    enabled: true,
    testMode: false,
    status: 'connected',
    credentials: {
      keyId: 'rzp_live_IizFIKoVusOCbO',
      keySecret: '••••••••••••••••••••••••'
    },
    testCredentials: {
      keyId: 'rzp_test_IizFIKoVusOCbO',
      keySecret: '••••••••••••••••••••••••'
    },
    settings: {
      currency: 'INR',
      paymentCapture: 'automatic',
      webhookSecret: '••••••••••••••••••••••••'
    },
    stats: {
      totalTransactions: 892,
      successRate: 97.2,
      totalVolume: 3456789,
      lastTransaction: '2024-01-20T14:20:00Z'
    }
  },
  paypal: {
    id: 'paypal',
    name: 'PayPal',
    logo: '🅿️',
    enabled: false,
    testMode: true,
    status: 'disconnected',
    credentials: {
      clientId: '',
      clientSecret: ''
    },
    testCredentials: {
      clientId: 'AeA1QIZXiflr1_NKbRaM3fKk5cKmkxF7',
      clientSecret: '••••••••••••••••••••••••'
    },
    settings: {
      currency: 'USD',
      mode: 'sandbox'
    },
    stats: {
      totalTransactions: 0,
      successRate: 0,
      totalVolume: 0,
      lastTransaction: null
    }
  },
  square: {
    id: 'square',
    name: 'Square',
    logo: '⬛',
    enabled: false,
    testMode: true,
    status: 'disconnected',
    credentials: {
      accessToken: '',
      locationId: ''
    },
    testCredentials: {
      accessToken: 'EAAAEK2U_••••••••••••••••',
      locationId: '••••••••••••••••'
    },
    settings: {
      currency: 'USD'
    },
    stats: {
      totalTransactions: 0,
      successRate: 0,
      totalVolume: 0,
      lastTransaction: null
    }
  }
};

const webhookEndpoints = [
  {
    id: '1',
    gateway: 'stripe',
    url: 'https://api.yourapp.com/webhooks/stripe',
    events: ['payment_intent.succeeded', 'customer.subscription.created', 'invoice.payment_failed'],
    status: 'active',
    lastDelivery: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    gateway: 'razorpay',
    url: 'https://api.yourapp.com/webhooks/razorpay',
    events: ['payment.captured', 'subscription.activated', 'payment.failed'],
    status: 'active',
    lastDelivery: '2024-01-20T14:20:00Z'
  }
];

export default function PaymentGatewaySetupPage() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      connected: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800',
      disconnected: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      error: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800'
    };
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  const getStatusIcon = (status: string) => {
    return status === 'connected' ? (
      <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
    ) : status === 'error' ? (
      <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
    ) : (
      <AlertCircle className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    );
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString('en-SG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format number without locale to avoid hydration mismatch
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const totalTransactions = Object.values(paymentGateways).reduce((sum, g) => sum + g.stats.totalTransactions, 0);
  const totalVolume = Object.values(paymentGateways).reduce((sum, g) => sum + g.stats.totalVolume, 0);
  const activeGateways = Object.values(paymentGateways).filter(g => g.enabled).length;
  const avgSuccessRate = Object.values(paymentGateways)
    .filter(g => g.stats.totalTransactions > 0)
    .reduce((sum, g) => sum + g.stats.successRate, 0) / 
    Object.values(paymentGateways).filter(g => g.stats.totalTransactions > 0).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Payment Gateway Setup</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Configure and manage payment provider integrations
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Status
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Active Gateways</p>
                  <p className="text-3xl font-bold text-white">{activeGateways}</p>
                  <p className="text-xs text-white/70">of 4 configured</p>
                </div>
                <CheckCircle className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Total Transactions</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(totalTransactions)}</p>
                  <p className="text-xs text-white/70">All time</p>
                </div>
                <CreditCard className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Success Rate</p>
                  <p className="text-3xl font-bold text-white">{avgSuccessRate.toFixed(1)}%</p>
                  <p className="text-xs text-white/70">Average</p>
                </div>
                <Zap className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">Total Volume</p>
                  <p className="text-3xl font-bold text-white">${formatNumber(totalVolume)}</p>
                  <p className="text-xs text-white/70">All time</p>
                </div>
                <DollarSign className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="providers" className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-2">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="providers" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Providers
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100">
                <Bell className="h-4 w-4 mr-2" />
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100">
                <Settings className="h-4 w-4 mr-2" />
                Global Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Payment Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            {Object.values(paymentGateways).map((gateway) => (
              <Card key={gateway.id} className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-3xl border-2 border-slate-200 dark:border-slate-700">
                        {gateway.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-xl text-slate-900 dark:text-slate-100">{gateway.name}</CardTitle>
                          {gateway.enabled ? (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Enabled
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                              Disabled
                            </Badge>
                          )}
                          {gateway.testMode && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                              Test Mode
                            </Badge>
                          )}
                          <div className="flex items-center gap-2">
                            {getStatusIcon(gateway.status)}
                            <Badge className={getStatusColor(gateway.status)}>
                              {gateway.status.charAt(0).toUpperCase() + gateway.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="mt-1 text-slate-600 dark:text-slate-400">
                          {formatNumber(gateway.stats.totalTransactions)} transactions • 
                          {gateway.stats.successRate > 0 ? ` ${gateway.stats.successRate}% success rate • ` : ' '}
                          ${formatNumber(gateway.stats.totalVolume)} volume
                        </CardDescription>
                      </div>
                    </div>
                    <Switch defaultChecked={gateway.enabled} />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <Tabs defaultValue="credentials" className="space-y-6">
                    <TabsList className="bg-slate-100 dark:bg-slate-800">
                      <TabsTrigger value="credentials" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                        <Key className="h-4 w-4 mr-2" />
                        Credentials
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </TabsTrigger>
                      <TabsTrigger value="stats" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                        <Zap className="h-4 w-4 mr-2" />
                        Statistics
                      </TabsTrigger>
                    </TabsList>

                    {/* Credentials */}
                    <TabsContent value="credentials" className="space-y-6">
                      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-blue-800 dark:text-blue-300">
                          <div className="flex items-center justify-between">
                            <span>Using <strong>{gateway.testMode ? 'Test' : 'Live'}</strong> credentials</span>
                            <Button variant="outline" size="sm" className="border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                              <ExternalLink className="h-3 w-3 mr-2" />
                              View {gateway.name} Dashboard
                            </Button>
                          </div>
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        {gateway.id === 'stripe' && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Publishable Key</Label>
                              <div className="flex gap-2">
                                <Input 
                                  defaultValue={gateway.testMode ? gateway.testCredentials.publishableKey : gateway.credentials.publishableKey}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Secret Key</Label>
                              <div className="flex gap-2">
                                <Input 
                                  type="password"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.secretKey : gateway.credentials.secretKey}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Webhook Secret</Label>
                              <div className="flex gap-2">
                                <Input 
                                  type="password"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.webhookSecret : gateway.credentials.webhookSecret}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </>
                        )}

                        {gateway.id === 'razorpay' && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Key ID</Label>
                              <div className="flex gap-2">
                                <Input 
                                  defaultValue={gateway.testMode ? gateway.testCredentials.keyId : gateway.credentials.keyId}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Key Secret</Label>
                              <div className="flex gap-2">
                                <Input 
                                  type="password"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.keySecret : gateway.credentials.keySecret}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Webhook Secret</Label>
                              <div className="flex gap-2">
                                <Input 
                                  type="password"
                                  defaultValue={gateway.settings.webhookSecret}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </>
                        )}

                        {gateway.id === 'paypal' && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Client ID</Label>
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="Enter PayPal Client ID"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.clientId : gateway.credentials.clientId}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Client Secret</Label>
                              <div className="flex gap-2">
                                <Input 
                                  type="password"
                                  placeholder="Enter PayPal Client Secret"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.clientSecret : gateway.credentials.clientSecret}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </>
                        )}

                        {gateway.id === 'square' && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Access Token</Label>
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="Enter Square Access Token"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.accessToken : gateway.credentials.accessToken}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Location ID</Label>
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="Enter Square Location ID"
                                  defaultValue={gateway.testMode ? gateway.testCredentials.locationId : gateway.credentials.locationId}
                                  className="font-mono text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                />
                                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked={gateway.testMode} />
                            <Label className="text-slate-700 dark:text-slate-300">Use Test Mode (Sandbox)</Label>
                          </div>
                          <Button variant="outline" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                            <Shield className="h-4 w-4 mr-2" />
                            Test Connection
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Settings */}
                    <TabsContent value="settings" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-slate-700 dark:text-slate-300">Default Currency</Label>
                          <Select defaultValue={gateway.settings.currency}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {gateway.id === 'stripe' && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Capture Method</Label>
                              <Select defaultValue={gateway.settings.captureMethod}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="automatic">Automatic</SelectItem>
                                  <SelectItem value="manual">Manual</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Automatic: Capture payment immediately. Manual: Authorize first, capture later.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Statement Descriptor</Label>
                              <Input 
                                defaultValue={gateway.settings.statementDescriptor}
                                maxLength={22}
                                placeholder="Appears on customer's statement"
                                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Maximum 22 characters. Appears on customer's bank statement.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-slate-700 dark:text-slate-300">Webhook Events</Label>
                              <div className="space-y-2">
                                {gateway.settings.webhookEvents?.map((event, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{event}</span>
                                    <Button variant="ghost" size="sm" className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <Button variant="outline" size="sm" className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                Add Event
                              </Button>
                            </div>
                          </>
                        )}

                        {gateway.id === 'razorpay' && (
                          <div className="space-y-2">
                            <Label className="text-slate-700 dark:text-slate-300">Payment Capture</Label>
                            <Select defaultValue={gateway.settings.paymentCapture}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="automatic">Automatic</SelectItem>
                                <SelectItem value="manual">Manual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Statistics */}
                    <TabsContent value="stats" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <CardContent className="p-6">
                            <div className="space-y-2">
                              <p className="text-sm text-slate-600 dark:text-slate-400">Total Transactions</p>
                              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(gateway.stats.totalTransactions)}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <CardContent className="p-6">
                            <div className="space-y-2">
                              <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
                              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                {gateway.stats.successRate > 0 ? `${gateway.stats.successRate}%` : 'N/A'}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <CardContent className="p-6">
                            <div className="space-y-2">
                              <p className="text-sm text-slate-600 dark:text-slate-400">Total Volume</p>
                              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">${formatNumber(gateway.stats.totalVolume)}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <CardContent className="p-6">
                            <div className="space-y-2">
                              <p className="text-sm text-slate-600 dark:text-slate-400">Last Transaction</p>
                              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatDate(gateway.stats.lastTransaction)}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {gateway.enabled && gateway.stats.totalTransactions > 0 && (
                        <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          <AlertDescription className="text-emerald-800 dark:text-emerald-300">
                            <strong>{gateway.name}</strong> is processing payments successfully with a {gateway.stats.successRate}% success rate.
                          </AlertDescription>
                        </Alert>
                      )}

                      {!gateway.enabled && (
                        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <AlertDescription className="text-amber-800 dark:text-amber-300">
                            <strong>{gateway.name}</strong> is currently disabled. Enable it to start accepting payments.
                          </AlertDescription>
                        </Alert>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 dark:text-slate-100">Webhook Endpoints</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">Configure webhook URLs for payment notifications</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    <Bell className="h-4 w-4 mr-2" />
                    Add Endpoint
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhookEndpoints.map((endpoint) => (
                    <div key={endpoint.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">{endpoint.gateway}</span>
                              <Badge className="bg-emerald-100 text-emerald-700 text-xs dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                                {endpoint.status}
                              </Badge>
                            </div>
                            <code className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                              {endpoint.url}
                            </code>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                            <Copy className="h-3 w-3 mr-2" />
                            Copy URL
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                            <RefreshCw className="h-3 w-3 mr-2" />
                            Test
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium">Events:</span>
                          <div className="flex flex-wrap gap-1">
                            {endpoint.events.map((event, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span>Last delivery: {formatDate(endpoint.lastDelivery)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Webhook Configuration Guide</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Webhooks notify your system of payment events in real-time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Configure webhook secrets in each payment gateway dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Test webhooks before going live to ensure proper integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Monitor webhook delivery logs for failed attempts</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Global Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100">Global Payment Settings</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure system-wide payment preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">Default Payment Gateway</Label>
                    <Select defaultValue="stripe">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Primary gateway used for processing payments
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">Fallback Gateway</Label>
                    <Select defaultValue="razorpay">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Used when primary gateway fails
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">Default Currency</Label>
                    <Select defaultValue="SGD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">Tax Rate (%)</Label>
                    <Input type="number" defaultValue="8" step="0.01" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Default tax rate applied to transactions
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Payment Behavior</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-slate-700 dark:text-slate-300">Enable Automatic Retry</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Automatically retry failed payments
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-slate-700 dark:text-slate-300">Email Payment Receipts</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Send email receipts for successful payments
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-slate-700 dark:text-slate-300">Enable Payment Notifications</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Notify admins of payment events
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-slate-700 dark:text-slate-300">Require Payment Confirmation</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Manual confirmation for high-value transactions
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Security Settings</h4>
                    
                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300">Minimum Transaction Amount</Label>
                      <Input type="number" defaultValue="1" step="0.01" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Minimum amount allowed per transaction
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300">Maximum Transaction Amount</Label>
                      <Input type="number" defaultValue="100000" step="0.01" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Maximum amount allowed per transaction
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-slate-700 dark:text-slate-300">Enable 3D Secure</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Require 3D Secure authentication for card payments
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-slate-700 dark:text-slate-300">Enable Fraud Detection</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Use built-in fraud detection tools
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Invoice Settings</h4>
                    
                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300">Invoice Prefix</Label>
                      <Input defaultValue="INV-" placeholder="e.g., INV-" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300">Invoice Footer Text</Label>
                      <Textarea 
                        defaultValue="Thank you for your business. Payment is due within 30 days."
                        rows={3}
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100">Security Best Practices</h4>
                    <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Always use HTTPS for payment pages and webhook endpoints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Regularly rotate API keys and webhook secrets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Never store credit card details on your servers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Enable PCI DSS compliance features from your payment gateway</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Monitor transaction logs for suspicious activity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Payment Gateways Configured</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {activeGateways} active gateways • All systems operational
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test All Gateways
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save All Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


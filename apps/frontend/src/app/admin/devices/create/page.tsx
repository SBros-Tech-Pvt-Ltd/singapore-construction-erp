// app/admin/devices/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Fingerprint,
  Building2,
  Server,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  Wifi
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function AddDevicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    deviceId: '',
    brand: '',
    model: '',
    serialNumber: '',
    branch: '',
    location: '',
    ipAddress: '',
    port: '4370',
    username: 'admin',
    password: '',
    apiKey: '',
    syncFrequency: '15',
    shift: '',
    batteryBackup: true,
    autoSync: true,
    notes: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTestConnection = async () => {
    if (!formData.ipAddress || !formData.port) {
      alert('Please enter IP address and port');
      return;
    }

    setTestingConnection(true);
    setConnectionStatus('idle');

    try {
      // Simulate API call to test connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure
      const success = Math.random() > 0.3;
      setConnectionStatus(success ? 'success' : 'error');
      
      if (success) {
        alert('✅ Connection successful! Device is reachable.');
      } else {
        alert('❌ Connection failed. Please check IP address, port, and network configuration.');
      }
    } catch (error) {
      setConnectionStatus('error');
      alert('Connection test failed');
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.deviceId || !formData.branch || !formData.ipAddress) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('✅ Device registered successfully!');
      console.log('Form data:', formData);
      
      // Redirect to devices list
      router.push('/admin/devices');
    } catch (error) {
      alert('Failed to register device');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Add New Biometric Device
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Register a new attendance device and configure settings
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registration Method Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Registration Method</CardTitle>
              <CardDescription>Choose how you want to register the device</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">
                    <Server className="h-4 w-4 mr-2" />
                    Manual Setup
                  </TabsTrigger>
                  <TabsTrigger value="api">
                    <Wifi className="h-4 w-4 mr-2" />
                    API Integration
                  </TabsTrigger>
                </TabsList>

                {/* Manual Setup Tab */}
                <TabsContent value="manual" className="space-y-6 mt-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Device Name *</Label>
                        <Input 
                          id="name"
                          placeholder="e.g., Bio-Device-HQ-01" 
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deviceId">Device ID *</Label>
                        <Input 
                          id="deviceId"
                          placeholder="e.g., BD001" 
                          value={formData.deviceId}
                          onChange={(e) => handleInputChange('deviceId', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand *</Label>
                        <Select value={formData.brand} onValueChange={(value) => handleInputChange('brand', value)}>
                          <SelectTrigger id="brand">
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zkteco">ZKTeco</SelectItem>
                            <SelectItem value="suprema">Suprema</SelectItem>
                            <SelectItem value="anviz">Anviz</SelectItem>
                            <SelectItem value="hikvision">Hikvision</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input 
                          id="model"
                          placeholder="e.g., K40" 
                          value={formData.model}
                          onChange={(e) => handleInputChange('model', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serialNumber">Serial Number</Label>
                        <Input 
                          id="serialNumber"
                          placeholder="e.g., ZK-K40-2024-001" 
                          value={formData.serialNumber}
                          onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location & Branch */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Location & Assignment</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch *</Label>
                        <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                          <SelectTrigger id="branch">
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="head-office">Head Office</SelectItem>
                            <SelectItem value="site-a">Site A</SelectItem>
                            <SelectItem value="site-b">Site B</SelectItem>
                            <SelectItem value="site-c">Site C</SelectItem>
                            <SelectItem value="site-d">Site D</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Physical Location</Label>
                        <Input 
                          id="location"
                          placeholder="e.g., Main Entrance" 
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shift">Default Shift</Label>
                      <Select value={formData.shift} onValueChange={(value) => handleInputChange('shift', value)}>
                        <SelectTrigger id="shift">
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day Shift (9:00 AM - 6:00 PM)</SelectItem>
                          <SelectItem value="night">Night Shift (10:00 PM - 7:00 AM)</SelectItem>
                          <SelectItem value="rotational">Rotational Shift</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Network Configuration */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Network Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ipAddress">IP Address *</Label>
                        <Input 
                          id="ipAddress"
                          placeholder="e.g., 192.168.1.101" 
                          value={formData.ipAddress}
                          onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="port">Port *</Label>
                        <Input 
                          id="port"
                          placeholder="4370" 
                          value={formData.port}
                          onChange={(e) => handleInputChange('port', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Device Username</Label>
                        <Input 
                          id="username"
                          placeholder="admin" 
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Device Password</Label>
                        <div className="relative">
                          <Input 
                            id="password"
                            type={showApiKey ? "text" : "password"}
                            placeholder="••••••••" 
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Test Connection */}
                    <div className="flex items-center gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleTestConnection}
                        disabled={testingConnection || !formData.ipAddress || !formData.port}
                      >
                        {testingConnection ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <Wifi className="h-4 w-4 mr-2" />
                            Test Connection
                          </>
                        )}
                      </Button>
                      
                      {connectionStatus === 'success' && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                      
                      {connectionStatus === 'error' && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Connection Failed
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Sync Settings */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Sync Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="syncFrequency">Sync Frequency (minutes)</Label>
                      <Select value={formData.syncFrequency} onValueChange={(value) => handleInputChange('syncFrequency', value)}>
                        <SelectTrigger id="syncFrequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">Every 5 minutes</SelectItem>
                          <SelectItem value="15">Every 15 minutes</SelectItem>
                          <SelectItem value="30">Every 30 minutes</SelectItem>
                          <SelectItem value="60">Every 1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoSync">Auto Sync</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically sync attendance data at specified intervals
                        </p>
                      </div>
                      <Switch
                        id="autoSync"
                        checked={formData.autoSync}
                        onCheckedChange={(checked) => handleInputChange('autoSync', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label htmlFor="batteryBackup">Battery Backup</Label>
                        <p className="text-sm text-muted-foreground">
                          Device has backup battery power
                        </p>
                      </div>
                      <Switch
                        id="batteryBackup"
                        checked={formData.batteryBackup}
                        onCheckedChange={(checked) => handleInputChange('batteryBackup', checked)}
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Additional Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea 
                        id="notes"
                        placeholder="Any additional notes about this device..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Note:</strong> Ensure the device is powered on and connected to the same network. 
                      Test the connection before saving to verify network configuration.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                {/* API Integration Tab */}
                <TabsContent value="api" className="space-y-6 mt-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>API Integration:</strong> Register device using API key provided by the device manufacturer. 
                      This method allows automatic configuration and discovery.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key *</Label>
                      <Input 
                        id="apiKey"
                        placeholder="Enter device API key" 
                        value={formData.apiKey}
                        onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        The API key can be found in your device's admin panel or documentation
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="api-branch">Assign to Branch *</Label>
                      <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                        <SelectTrigger id="api-branch">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="head-office">Head Office</SelectItem>
                          <SelectItem value="site-a">Site A</SelectItem>
                          <SelectItem value="site-b">Site B</SelectItem>
                          <SelectItem value="site-c">Site C</SelectItem>
                          <SelectItem value="site-d">Site D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="button" variant="outline" className="w-full">
                      <Wifi className="h-4 w-4 mr-2" />
                      Auto-Discover Device
                    </Button>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground mb-2">How API Integration Works:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Enter your device's API key</li>
                      <li>System will automatically detect device information</li>
                      <li>Network settings will be configured automatically</li>
                      <li>Device will be ready to sync immediately</li>
                    </ol>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>All fields marked with * are required</span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.back()}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-4 w-4 mr-2" />
                        Register Device
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
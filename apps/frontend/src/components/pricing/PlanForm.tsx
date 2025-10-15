'useclient';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, X, Info, DollarSign, Calendar, Users, HardDrive, Folder, Tag, Code, Headset, Zap, Check, X as XIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export function PlanForm({  isEditMode = false }: { isEditMode?: boolean,onSubmit: (data: any) => void,onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      planName: '',
      planCode: '',
      description: '',
      price: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      trialDays: 14,
      maxUsers: 5,
      maxStorageGB: 10,
      maxProjects: 10,
      customBranding: false,
      apiAccess: false,
      prioritySupport: false,
      isActive: true,
      isFeatured: false,
    },
  });

  return (
    <Card className="border-none shadow-sm w-3xl mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          {isEditMode ? 'Edit Pricing Plan' : 'Create New Plan'}
        </CardTitle>
        <CardDescription className="text-sm">
          {isEditMode 
            ? 'Update the details of this pricing plan.' 
            : 'Define a new subscription plan with features and pricing.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <form  className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <h3 className="text-sm font-medium">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="planName">Plan Name</Label>
                </div>
                <Input
                  id="planName"
                  className="w-full"
                  {...register('planName', {
                    required: 'Plan name is required',
                    minLength: { value: 3, message: 'Minimum 3 characters' },
                  })}
                  onChange={(e) => {
                    register('planName').onChange(e);
                   
                  }}
                  placeholder="e.g., Professional, Enterprise"
                />
                {errors.planName && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <XIcon className="h-3 w-3" /> {errors.planName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="planCode">Plan Code</Label>
                </div>
                <Input
                  id="planCode"
                  {...register('planCode', { required: 'Plan code is required' })}
                  placeholder="PLAN001"
                  className="font-mono text-sm"
                  readOnly={!isEditMode}
                />
                {errors.planCode && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <XIcon className="h-3 w-3" /> {errors.planCode.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Describe what this plan offers..."
                  rows={2}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  This will be displayed to users when they view pricing options.
                </p>
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
                    {...register('price', {
                      required: 'Price is required',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Must be 0 or greater' },
                    })}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <XIcon className="h-3 w-3" /> {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  {...register('currency')}
                  defaultValue="USD"
                >
                  <SelectTrigger className="w-full">
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
                  {...register('billingCycle')}
                  defaultValue="monthly"
                >
                  <SelectTrigger className="w-full">
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
                <Label htmlFor="trialDays">Trial Period (Days)</Label>
                <div className="relative">
                  <Input
                    id="trialDays"
                    type="number"
                    className="pr-16"
                    {...register('trialDays', {
                      valueAsNumber: true,
                      min: 0,
                      max: 365,
                    })}
                    placeholder="14"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Set to 0 to disable trial period
                </p>
              </div>
            </div>
          </div>

          {/* Feature Limits */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Feature Limits</h3>
            <p className="text-xs text-muted-foreground mb-3">Set to 0 for unlimited</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className='space-y-2'>
                <Label htmlFor="maxUsers">Max Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  {...register('maxUsers', { valueAsNumber: true, min: 0 })}
                  placeholder="0 = unlimited"
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor="maxStorageGB">Storage (GB)</Label>
                <Input
                  id="maxStorageGB"
                  type="number"
                  {...register('maxStorageGB', { valueAsNumber: true, min: 0 })}
                  placeholder="0 = unlimited"
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor="maxProjects">Max Projects</Label>
                <Input
                  id="maxProjects"
                  type="number"
                  {...register('maxProjects', { valueAsNumber: true, min: 0 })}
                  placeholder="0 = unlimited"
                />
              </div>
            </div>
          </div>

          {/* Features Toggle */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="customBranding" className="cursor-pointer">
                    Custom Branding
                  </Label>
                  <p className="text-xs text-muted-foreground">White-label</p>
                </div>
                <Switch
                  id="customBranding"
                  checked={watch('customBranding')}
                  onCheckedChange={(checked) => setValue('customBranding', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="apiAccess" className="cursor-pointer">
                    API Access
                  </Label>
                  <p className="text-xs text-muted-foreground">REST API</p>
                </div>
                <Switch
                  id="apiAccess"
                  checked={watch('apiAccess')}
                  onCheckedChange={(checked) => setValue('apiAccess', checked)}
                />
              </div>

            
            </div>
          </div>

          {/* Settings */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div>
                  <Label htmlFor="isActive" className="cursor-pointer font-medium">
                    Active
                  </Label>
                  <p className="text-xs text-muted-foreground">Available for subscriptions</p>
                </div>
                <Switch
                  id="isActive"
                  checked={watch('isActive')}
                  onCheckedChange={(checked) => setValue('isActive', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div>
                  <Label htmlFor="isFeatured" className="cursor-pointer font-medium">
                    Featured
                  </Label>
                  <p className="text-xs text-muted-foreground">Highlight as recommended</p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={watch('isFeatured')}
                  onCheckedChange={(checked) => setValue('isFeatured', checked)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
           
                <X className="h-4 w-4 mr-2" />
                Cancel
             
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {isEditMode ? 'Update Plan' : 'Add Plan'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}



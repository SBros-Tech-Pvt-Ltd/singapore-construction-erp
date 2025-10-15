import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, Moon, Sun } from 'lucide-react';

interface TenantRegistrationFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export default function TenantRegistrationForm({ onClose, onSubmit }: TenantRegistrationFormProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    uen: '',
    gstRegistered: 'No',
    fullName: '',
    designation: '',
    email: '',
    mobile: '',
    officeNumber: '',
    blockHouse: '',
    streetName: '',
    buildingName: '',
    unitNumber: '',
    postalCode: '',
    industry: '',
    companySize: '',
    yearEstablished: '',
    logo: '',
    subscriptionPlan: '',
    billingCycle: 'Monthly',
    startDate: '',
    paymentMethod: '',
    bankName: '',
    accountNumber: '',
    remarks: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onSubmit(formData);
    onClose();
  };

  
  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto transition-colors">
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b dark:border-slate-700 px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Company</h1>
            
          </div>
          <div className="flex items-center gap-2">
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              type="button">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="dark:text-gray-200">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Tech Solutions Pte Ltd"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uen" className="dark:text-gray-200">
                    UEN (Unique Entity Number) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="uen"
                    placeholder="e.g., 201234567A"
                    value={formData.uen}
                    onChange={(e) => handleChange('uen', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Singapore business registration number</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst" className="dark:text-gray-200">
                  GST Registered <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.gstRegistered} onValueChange={(value) => handleChange('gstRegistered', value)}>
                  <SelectTrigger id="gst" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Primary Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="dark:text-gray-200">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g., John Tan Wei Ming"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="dark:text-gray-200">
                    Designation <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="designation"
                    placeholder="e.g., Director / CEO / Manager"
                    value={formData.designation}
                    onChange={(e) => handleChange('designation', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com.sg"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="dark:text-gray-200">
                    Mobile Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mobile"
                    placeholder="+65 9123 4567"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="officeNumber" className="dark:text-gray-200">Office Number</Label>
                <Input
                  id="officeNumber"
                  placeholder="+65 6123 4567"
                  value={formData.officeNumber}
                  onChange={(e) => handleChange('officeNumber', e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Registered Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blockHouse" className="dark:text-gray-200">
                    Block/House Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="blockHouse"
                    placeholder="e.g., Blk 123"
                    value={formData.blockHouse}
                    onChange={(e) => handleChange('blockHouse', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="streetName" className="dark:text-gray-200">
                    Street Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="streetName"
                    placeholder="e.g., Orchard Road"
                    value={formData.streetName}
                    onChange={(e) => handleChange('streetName', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buildingName" className="dark:text-gray-200">Building Name</Label>
                  <Input
                    id="buildingName"
                    placeholder="e.g., ION Orchard"
                    value={formData.buildingName}
                    onChange={(e) => handleChange('buildingName', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitNumber" className="dark:text-gray-200">
                    Unit Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="unitNumber"
                    placeholder="e.g., #05-123"
                    value={formData.unitNumber}
                    onChange={(e) => handleChange('unitNumber', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="dark:text-gray-200">
                  Postal Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postalCode"
                  placeholder="e.g., 238888"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="dark:text-gray-200">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                    <SelectTrigger id="industry" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="dark:text-gray-200">
                    Company Size <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleChange('companySize', value)}>
                    <SelectTrigger id="companySize" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished" className="dark:text-gray-200">
                    Year Established <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="yearEstablished"
                    placeholder="e.g., 2020"
                    value={formData.yearEstablished}
                    onChange={(e) => handleChange('yearEstablished', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo" className="dark:text-gray-200">
                    Upload Logo
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleChange('logo', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="cursor-pointer dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
              {formData.logo && (
                <div className="flex items-center gap-4">
                  <img 
                    src={formData.logo} 
                    alt="Company Logo" 
                    className="h-16 w-16 object-contain border rounded p-1 dark:border-slate-600"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleChange('logo', '')}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  >
                    Remove Logo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Subscription Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all dark:bg-slate-700 ${formData.subscriptionPlan === 'professional' ? 'border-blue-500 border-2 ring-2 ring-blue-200 dark:ring-blue-800' : 'border-gray-200 dark:border-slate-600'}`}
                  onClick={() => handleChange('subscriptionPlan', 'professional')}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Professional</h3>
                    <p className="text-2xl font-bold text-red-500 dark:text-red-400 mb-2">SGD $599/month</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Up to 200 companies</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all dark:bg-slate-700 ${formData.subscriptionPlan === 'enterprise' ? 'border-blue-500 border-2 ring-2 ring-blue-200 dark:ring-blue-800' : 'border-gray-200 dark:border-slate-600'}`}
                  onClick={() => handleChange('subscriptionPlan', 'enterprise')}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Enterprise</h3>
                    <p className="text-2xl font-bold text-red-500 dark:text-red-400 mb-2">SGD $1,299/month</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unlimited companies</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingCycle" className="dark:text-gray-200">
                    Billing Cycle <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.billingCycle} onValueChange={(value) => handleChange('billingCycle', value)}>
                    <SelectTrigger id="billingCycle" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="dark:text-gray-200">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Banking Information (optional)</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">For automated billing and invoicing</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="dark:text-gray-200">
                  Payment Method
                </Label>
                <Select 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleChange('paymentMethod', value)}>
                  <SelectTrigger id="paymentMethod" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="debit-card">Debit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="dark:text-gray-200">Bank Name</Label>
                  <Select 
                    value={formData.bankName} 
                    onValueChange={(value) => handleChange('bankName', value)}>
                    <SelectTrigger id="bankName" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="dbs">DBS Bank</SelectItem>
                      <SelectItem value="ocbc">OCBC Bank</SelectItem>
                      <SelectItem value="uob">UOB Bank</SelectItem>
                      <SelectItem value="hsbc">HSBC</SelectItem>
                      <SelectItem value="citibank">Citibank</SelectItem>
                      <SelectItem value="standard-chartered">Standard Chartered</SelectItem>
                      <SelectItem value="maybank">Maybank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="dark:text-gray-200">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="e.g., 123-456789-001"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange('accountNumber', e.target.value)}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Additional Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                id="remarks"
                placeholder="Any special requirements or notes..."
                value={formData.remarks}
                onChange={(e) => handleChange('remarks', e.target.value)}
                rows={4}
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-slate-700">
            <Button onClick={onClose} variant="outline" className="px-6 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white px-8">
              Add Company
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

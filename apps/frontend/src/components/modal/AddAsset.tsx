// components/modals/AddAsset.tsx
'use client';

import { useState } from 'react';
import { X, Save, Package, Calendar, MapPin, FileText, Upload, DollarSign } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface AddAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAssetModal({ open, onOpenChange }: AddAssetModalProps) {
  const [date, setDate] = useState<Date>();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Header - Blue */}
        <div className="bg-blue-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Add New Asset</h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="hover:bg-white/20 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-blue-50 p-1 rounded-lg">
              <TabsTrigger 
                value="basic" 
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Package className="h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger 
                value="purchase" 
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <DollarSign className="h-4 w-4" />
                Purchase
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <MapPin className="h-4 w-4" />
                Location
              </TabsTrigger>
              <TabsTrigger 
                value="additional" 
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4" />
                Additional
              </TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Asset Name *</Label>
                      <Input
                        id="assetName"
                        placeholder="Enter asset name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Asset ID</Label>
                      <div className="relative">
                        <Input
                          id="assetId"
                          value="AST-AUTO-001"
                          disabled
                          className="h-11 bg-gray-50"
                        />
                        <Badge className="absolute right-2 top-2 bg-blue-600">
                          Auto-generated
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Category *</Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">📱 Electronics</SelectItem>
                          <SelectItem value="furniture">🪑 Furniture</SelectItem>
                          <SelectItem value="vehicles">🚗 Vehicles</SelectItem>
                          <SelectItem value="equipment">🔧 Equipment</SelectItem>
                          <SelectItem value="software">💿 Software</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Serial Number</Label>
                      <Input
                        id="serialNumber"
                        placeholder="Enter serial number"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Description</Label>
                    <Textarea
                      placeholder="Enter asset description and specifications..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Purchase Information Tab */}
            <TabsContent value="purchase" className="space-y-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Purchase Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Purchase Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-11 justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Purchase Value *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                          ₹
                        </span>
                        <Input
                          id="purchaseValue"
                          type="number"
                          placeholder="0.00"
                          className="pl-8 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Vendor Name</Label>
                      <Input
                        id="vendor"
                        placeholder="Enter vendor name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Invoice Number</Label>
                      <Input
                        id="invoice"
                        placeholder="Enter invoice number"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Warranty Period</Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select warranty period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="3years">3 Years</SelectItem>
                          <SelectItem value="5years">5 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Payment Method</Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assignment & Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Assignment & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Assigned To</Label>
                      <Input
                        id="assignedTo"
                        placeholder="Employee name or department"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Department</Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">IT Department</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Location *</Label>
                      <Input
                        id="location"
                        placeholder="Building, Floor, Room"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Site/Branch</Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select site" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hq">Head Office</SelectItem>
                          <SelectItem value="branch1">Branch Office 1</SelectItem>
                          <SelectItem value="branch2">Branch Office 2</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Status *</Label>
                      <Select defaultValue="active">
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">✅ Active</SelectItem>
                          <SelectItem value="maintenance">🔧 Maintenance</SelectItem>
                          <SelectItem value="storage">📦 In Storage</SelectItem>
                          <SelectItem value="retired">❌ Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Condition *</Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">⭐ Excellent</SelectItem>
                          <SelectItem value="good">👍 Good</SelectItem>
                          <SelectItem value="fair">👌 Fair</SelectItem>
                          <SelectItem value="poor">👎 Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional Details Tab */}
            <TabsContent value="additional" className="space-y-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes or comments about the asset..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Tags</Label>
                    <Input
                      placeholder="Enter tags separated by commas (e.g., laptop, dell, warranty)"
                      className="h-11"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Depreciation Rate (%)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Insurance Number</Label>
                      <Input
                        placeholder="Enter insurance number"
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-blue-400" />
                    <p className="mt-4 text-base font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      PDF, PNG, JPG, DOCX up to 10MB
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      You can upload invoice, warranty card, photos, etc.
                    </p>
                    <Input type="file" className="hidden" multiple />
                    <Button variant="outline" className="mt-4 border-blue-300 text-blue-600 hover:bg-blue-50">
                      Browse Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6 h-11">
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700 px-8 h-11 gap-2">
            <Save className="h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
    </div>
  );
}
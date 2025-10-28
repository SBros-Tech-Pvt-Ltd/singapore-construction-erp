// components/modals/EditAsset.tsx
'use client';

import { X, Save, Package, MapPin, FileText, Edit } from 'lucide-react';
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

export default function EditAssetModal({ open, onOpenChange, asset }: any) {
  if (!open || !asset) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Header - Blue */}
        <div className="bg-blue-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Edit className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Asset</h2>
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
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Basic Information */}
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
                  <Label className="text-base font-semibold">Asset Name</Label>
                  <Input defaultValue={asset.name} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Asset ID</Label>
                  <Input defaultValue={asset.id} disabled className="h-11 bg-gray-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Category</Label>
                  <Select defaultValue={asset.category.toLowerCase()}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">📱 Electronics</SelectItem>
                      <SelectItem value="furniture">🪑 Furniture</SelectItem>
                      <SelectItem value="vehicles">🚗 Vehicles</SelectItem>
                      <SelectItem value="equipment">🔧 Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Serial Number</Label>
                  <Input defaultValue={asset.serialNumber} className="h-11" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Location */}
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
                  <Input defaultValue={asset.assignedTo} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Location</Label>
                  <Input defaultValue={asset.location} className="h-11" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Status</Label>
                  <Select defaultValue={asset.status.toLowerCase()}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">✅ Active</SelectItem>
                      <SelectItem value="maintenance">🔧 Maintenance</SelectItem>
                      <SelectItem value="retired">❌ Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Condition</Label>
                  <Select defaultValue={asset.condition.toLowerCase()}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
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

          {/* Financial Information */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Current Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input defaultValue={asset.value.replace('$', '')} className="pl-8 h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Purchase Date</Label>
                  <Input type="date" defaultValue={asset.purchaseDate} className="h-11" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-900">Update Notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Add any notes about this update..."
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6 h-11">
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700 px-8 h-11 gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
// components/modals/ViewAsset.tsx
'use client';

import { X, Edit, Eye, Package, MapPin, DollarSign, Calendar, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ViewAssetModal({ open, onOpenChange, asset }: any) {
  if (!open || !asset) return null;

  const getStatusBadge = (status: string) => {
    const config: { [key: string]: string } = {
      Active: 'bg-green-600 text-white',
      Maintenance: 'bg-orange-600 text-white',
      Retired: 'bg-red-600 text-white',
    };
    return <Badge className={config[status]}>{status.toUpperCase()}</Badge>;
  };

  const getConditionBadge = (condition: string) => {
    const config: { [key: string]: string } = {
      Excellent: 'bg-green-600 text-white',
      Good: 'bg-blue-600 text-white',
      Fair: 'bg-orange-600 text-white',
      Poor: 'bg-red-600 text-white',
    };
    return <Badge className={config[condition]}>{condition.toUpperCase()}</Badge>;
  };

  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Header - Blue */}
        <div className="bg-blue-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{asset.name}</h2>
              <p className="text-blue-100 text-sm mt-1">Asset ID: {asset.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(asset.status)}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="hover:bg-white/20 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Quick Summary Cards - Blue Theme */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-0 shadow-md bg-blue-600 text-white">
              <CardContent className="pt-6">
                <Package className="h-5 w-5 mb-2 opacity-80" />
                <div className="text-sm opacity-90">Category</div>
                <div className="text-lg font-bold mt-1">{asset.category}</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-blue-500 text-white">
              <CardContent className="pt-6">
                <DollarSign className="h-5 w-5 mb-2 opacity-80" />
                <div className="text-sm opacity-90">Value</div>
                <div className="text-lg font-bold mt-1">{asset.value}</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-blue-700 text-white">
              <CardContent className="pt-6">
                <Calendar className="h-5 w-5 mb-2 opacity-80" />
                <div className="text-sm opacity-90">Purchase Date</div>
                <div className="text-lg font-bold mt-1">{asset.purchaseDate}</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-blue-800 text-white">
              <CardContent className="pt-6">
                <FileText className="h-5 w-5 mb-2 opacity-80" />
                <div className="text-sm opacity-90">Condition</div>
                <div className="text-lg font-bold mt-1">{asset.condition}</div>
              </CardContent>
            </Card>
          </div>

          {/* Asset Information */}
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Asset Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-x-8">
                <InfoRow label="Asset Name" value={asset.name} />
                <InfoRow label="Asset ID" value={asset.id} />
                <InfoRow label="Category" value={asset.category} />
                <InfoRow label="Serial Number" value={asset.serialNumber} />
                <InfoRow label="Status" value={getStatusBadge(asset.status)} />
                <InfoRow label="Condition" value={getConditionBadge(asset.condition)} />
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Location */}
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Assignment & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-x-8">
                <InfoRow label="Assigned To" value={asset.assignedTo} />
                <InfoRow label="Location" value={asset.location} />
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-x-8">
                <InfoRow label="Purchase Value" value={asset.value} />
                <InfoRow label="Purchase Date" value={asset.purchaseDate} />
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { date: '2024-01-15', action: 'Asset assigned to ' + asset.assignedTo, type: 'assignment' },
                  { date: '2024-01-10', action: 'Asset location updated', type: 'location' },
                  { date: '2024-01-05', action: 'Asset added to inventory', type: 'created' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="min-w-[100px]">
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">{item.date}</Badge>
                    </div>
                    <div className="flex-1 pb-4 border-l-2 border-blue-200 pl-4 relative">
                      <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <Badge className="mt-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg text-blue-900">Attached Documents</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Purchase Invoice.pdf', size: '245 KB' },
                  { name: 'Warranty Card.pdf', size: '1.2 MB' },
                  { name: 'Product Image.jpg', size: '456 KB' },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="border-2 border-blue-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <Download className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{doc.size}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6 h-11">
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 h-11 gap-2">
            <Edit className="h-4 w-4" />
            Edit Asset
          </Button>
        </div>
      </div>
    </div>
  );
}
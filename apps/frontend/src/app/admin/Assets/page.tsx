// app/assets/page.tsx
'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  TrendingUp,
  Package,
  AlertCircle,
  DollarSign,
  Laptop,
  Armchair,
  Car,
  Wrench,
  Star,
  Activity,
  BarChart3,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import AddAssetModal from '@/components/modal/AddAsset';
import EditAssetModal from '@/components/modal/EditAsset';
import ViewAssetModal from '@/components/modal/ViewAsset';
import ViewAnalyticsModal from '@/components/modal/ViewAnalytics';

// Define Asset type
interface Asset {
  id: string;
  name: string;
  category: string;
  status: string;
  assignedTo: string;
  location: string;
  purchaseDate: string;
  value: string;
  condition: string;
  serialNumber: string;
  color: string;
}

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Mock data
  const assets: Asset[] = [
    {
      id: 'AST-001',
      name: 'Dell Laptop XPS 15',
      category: 'Electronics',
      status: 'Active',
      assignedTo: 'Jane',
      location: 'Office A - Floor 2',
      purchaseDate: '2023-01-15',
      value: '$1,299.00',
      condition: 'Good',
      serialNumber: 'DL123456789',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'AST-002',
      name: 'Office Desk',
      category: 'Furniture',
      status: 'Active',
      assignedTo: 'Jane Smith',
      location: 'Office B - Floor 1',
      purchaseDate: '2023-02-20',
      value: '$450.00',
      condition: 'Excellent',
      serialNumber: 'FU987654321',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'AST-003',
      name: 'HP Printer Pro',
      category: 'Electronics',
      status: 'Maintenance',
      assignedTo: 'IT Department',
      location: 'Office A - Floor 1',
      purchaseDate: '2022-11-10',
      value: '$899.00',
      condition: 'Fair',
      serialNumber: 'HP445566778',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'AST-004',
      name: 'Conference Table',
      category: 'Furniture',
      status: 'Active',
      assignedTo: 'Meeting Room 1',
      location: 'Office A - Floor 3',
      purchaseDate: '2023-03-05',
      value: '$1,200.00',
      condition: 'Excellent',
      serialNumber: 'FU112233445',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'AST-005',
      name: 'iPhone 14 Pro',
      category: 'Electronics',
      status: 'Retired',
      assignedTo: 'N/A',
      location: 'Storage',
      purchaseDate: '2022-09-15',
      value: '$999.00',
      condition: 'Poor',
      serialNumber: 'IP998877665',
      color: 'from-gray-500 to-slate-500'
    },
    {
      id: 'AST-006',
      name: 'Tesla Model 3',
      category: 'Vehicles',
      status: 'Active',
      assignedTo: 'Sales Team',
      location: 'Parking Lot B',
      purchaseDate: '2023-06-01',
      value: '$45,000.00',
      condition: 'Excellent',
      serialNumber: 'TM334455667',
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const stats = [
    {
      title: 'Total Assets',
      value: '247',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      gradient: 'from-blue-500 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Value',
      value: '$324,500',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-400',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'In Maintenance',
      value: '12',
      change: '-3.1%',
      trend: 'down',
      icon: AlertCircle,
      gradient: 'from-orange-500 to-amber-400',
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Active Assets',
      value: '215',
      change: '+5.3%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-400',
      bgGradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ];

  const categoryStats = [
    {
      name: 'Electronics',
      count: 89,
      value: '$145,230',
      icon: Laptop,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      name: 'Furniture',
      count: 124,
      value: '$98,450',
      icon: Armchair,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      name: 'Vehicles',
      count: 18,
      value: '$456,800',
      icon: Car,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'Equipment',
      count: 16,
      value: '$23,120',
      icon: Wrench,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: {
      [key: string]: {
        className: string;
        label: string;
      };
    } = {
      Active: {
        className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0',
        label: 'Active'
      },
      Maintenance: {
        className: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0',
        label: 'Maintenance'
      },
      Retired: {
        className: 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-0',
        label: 'Retired'
      },
    };
    const config = statusConfig[status] || statusConfig.Active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getConditionBadge = (condition: string) => {
    const conditionConfig: {
      [key: string]: string;
    } = {
      Excellent: 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
      Good: 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white',
      Fair: 'bg-gradient-to-r from-orange-400 to-amber-400 text-white',
      Poor: 'bg-gradient-to-r from-red-400 to-rose-400 text-white',
    };
    return <Badge className={conditionConfig[condition] || ''}>{condition}</Badge>;
  };

  const handleView = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsViewModalOpen(true);
  };

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Colorful Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${stat.bgGradient} overflow-hidden relative`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {stat.title}
                </CardTitle>
                <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="flex items-center mt-2">
                  <Badge className={`bg-gradient-to-r ${stat.gradient} text-white border-0`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-gray-600 ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Overview */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Category
                </CardTitle>
              </div>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={() => setIsAnalyticsModalOpen(true)}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {categoryStats.map((category, index) => (
                <div key={index} className={`${category.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <Star className={`h-5 w-5 ${category.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{category.name}</h3>
                  <p className={`text-2xl font-bold ${category.textColor}`}>{category.count}</p>
                  <p className="text-sm text-gray-600 mt-2">Value: {category.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search - Colorful */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-purple-50">
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search assets by name, ID, or serial number..."
                  className="pl-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-[180px] border-purple-200 h-10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">📱 Electronics</SelectItem>
                  <SelectItem value="furniture">🪑 Furniture</SelectItem>
                  <SelectItem value="vehicles">🚗 Vehicles</SelectItem>
                  <SelectItem value="equipment">🔧 Equipment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px] border-purple-200 h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">✅ Active</SelectItem>
                  <SelectItem value="maintenance">🔧 Maintenance</SelectItem>
                  <SelectItem value="retired">❌ Retired</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="h-10 lg:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Advanced
              </Button>

              {/* Import/Export/Add Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" className="h-10">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="h-10">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 shadow-lg" 
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Asset
                </Button>
              </div>
            </div>

            {/* Clean Assets Table */}
            <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-purple-50 hover:from-gray-100 hover:to-purple-100 border-b-2 border-purple-100">
                    <TableHead className="font-bold text-gray-700">Asset ID</TableHead>
                    <TableHead className="font-bold text-gray-700">Name</TableHead>
                    <TableHead className="font-bold text-gray-700">Category</TableHead>
                    <TableHead className="font-bold text-gray-700">Status</TableHead>
                    <TableHead className="font-bold text-gray-700">Assigned To</TableHead>
                    <TableHead className="font-bold text-gray-700">Location</TableHead>
                    <TableHead className="font-bold text-gray-700">Value</TableHead>
                    <TableHead className="font-bold text-gray-700">Condition</TableHead>
                    <TableHead className="text-right font-bold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset, index) => (
                    <TableRow 
                      key={asset.id} 
                      className={`hover:bg-purple-50/50 transition-colors ${
                        index !== assets.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <TableCell className="font-mono font-semibold ">
                        {asset.id}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {asset.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                          {asset.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell className="text-gray-700">{asset.assignedTo}</TableCell>
                      <TableCell className="text-gray-600 text-sm">{asset.location}</TableCell>
                      <TableCell className="font-semibold text-green-600">{asset.value}</TableCell>
                      <TableCell>{getConditionBadge(asset.condition)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-purple-100 h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-gray-700">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleView(asset)} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4 text-blue-600" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(asset)} className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4 text-green-600" />
                              <span>Edit Asset</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete Asset</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Colorful Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600 bg-purple-50 px-4 py-2 rounded-full">
                Showing <span className="font-bold">1-6</span> of <span className="font-bold">247</span> assets
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-purple-200 text-gray-700 hover:bg-purple-50 h-9 w-9 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 h-9 w-9 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 h-9 w-9 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 h-9 w-9 p-0">
                  3
                </Button>
                <Button variant="outline" size="sm" className="border-purple-200 text-gray-700 hover:bg-purple-50 h-9 w-9 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddAssetModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <EditAssetModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        asset={selectedAsset}
      />
      <ViewAssetModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        asset={selectedAsset}
      />
      <ViewAnalyticsModal
        open={isAnalyticsModalOpen}
        onOpenChange={setIsAnalyticsModalOpen}
      />
    </div>
  );
}
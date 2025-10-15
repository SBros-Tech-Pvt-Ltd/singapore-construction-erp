'use client';

import { useState } from 'react';
import {
  Globe,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  MapPin,
  CheckCircle,
  XCircle,
  Flag,
  Map,
  Settings,
  Eye,
  ChevronDown,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Static JSON Data
const countries = [
  {
    id: 1,
    name: 'Singapore',
    code: 'SG',
    dialCode: '+65',
    currency: 'SGD',
    currencySymbol: '$',
    timezone: 'Asia/Singapore',
    active: true,
    stateCount: 0,
    tenantCount: 45,
    flag: '🇸🇬'
  },
  {
    id: 2,
    name: 'United States',
    code: 'US',
    dialCode: '+1',
    currency: 'USD',
    currencySymbol: '$',
    timezone: 'America/New_York',
    active: true,
    stateCount: 50,
    tenantCount: 128,
    flag: '🇺🇸'
  },
  {
    id: 3,
    name: 'United Kingdom',
    code: 'GB',
    dialCode: '+44',
    currency: 'GBP',
    currencySymbol: '£',
    timezone: 'Europe/London',
    active: true,
    stateCount: 4,
    tenantCount: 67,
    flag: '🇬🇧'
  },
  {
    id: 4,
    name: 'India',
    code: 'IN',
    dialCode: '+91',
    currency: 'INR',
    currencySymbol: '₹',
    timezone: 'Asia/Kolkata',
    active: true,
    stateCount: 36,
    tenantCount: 234,
    flag: '🇮🇳'
  },
  {
    id: 5,
    name: 'Australia',
    code: 'AU',
    dialCode: '+61',
    currency: 'AUD',
    currencySymbol: '$',
    timezone: 'Australia/Sydney',
    active: true,
    stateCount: 8,
    tenantCount: 56,
    flag: '🇦🇺'
  },
  {
    id: 6,
    name: 'Canada',
    code: 'CA',
    dialCode: '+1',
    currency: 'CAD',
    currencySymbol: '$',
    timezone: 'America/Toronto',
    active: true,
    stateCount: 13,
    tenantCount: 89,
    flag: '🇨🇦'
  },
  {
    id: 7,
    name: 'Germany',
    code: 'DE',
    dialCode: '+49',
    currency: 'EUR',
    currencySymbol: '€',
    timezone: 'Europe/Berlin',
    active: true,
    stateCount: 16,
    tenantCount: 43,
    flag: '🇩🇪'
  },
  {
    id: 8,
    name: 'Malaysia',
    code: 'MY',
    dialCode: '+60',
    currency: 'MYR',
    currencySymbol: 'RM',
    timezone: 'Asia/Kuala_Lumpur',
    active: false,
    stateCount: 13,
    tenantCount: 0,
    flag: '🇲🇾'
  }
];

const states = [
  { id: 1, countryId: 2, countryName: 'United States', name: 'California', code: 'CA', active: true },
  { id: 2, countryId: 2, countryName: 'United States', name: 'New York', code: 'NY', active: true },
  { id: 3, countryId: 2, countryName: 'United States', name: 'Texas', code: 'TX', active: true },
  { id: 4, countryId: 2, countryName: 'United States', name: 'Florida', code: 'FL', active: true },
  { id: 5, countryId: 2, countryName: 'United States', name: 'Illinois', code: 'IL', active: true },
  { id: 6, countryId: 4, countryName: 'India', name: 'Maharashtra', code: 'MH', active: true },
  { id: 7, countryId: 4, countryName: 'India', name: 'Karnataka', code: 'KA', active: true },
  { id: 8, countryId: 4, countryName: 'India', name: 'Tamil Nadu', code: 'TN', active: true },
  { id: 9, countryId: 4, countryName: 'India', name: 'Delhi', code: 'DL', active: true },
  { id: 10, countryId: 4, countryName: 'India', name: 'Gujarat', code: 'GJ', active: true },
  { id: 11, countryId: 3, countryName: 'United Kingdom', name: 'England', code: 'ENG', active: true },
  { id: 12, countryId: 3, countryName: 'United Kingdom', name: 'Scotland', code: 'SCT', active: true },
  { id: 13, countryId: 3, countryName: 'United Kingdom', name: 'Wales', code: 'WLS', active: true },
  { id: 14, countryId: 3, countryName: 'United Kingdom', name: 'Northern Ireland', code: 'NIR', active: true },
  { id: 15, countryId: 5, countryName: 'Australia', name: 'New South Wales', code: 'NSW', active: true },
  { id: 16, countryId: 5, countryName: 'Australia', name: 'Victoria', code: 'VIC', active: true },
  { id: 17, countryId: 5, countryName: 'Australia', name: 'Queensland', code: 'QLD', active: true },
  { id: 18, countryId: 6, countryName: 'Canada', name: 'Ontario', code: 'ON', active: true },
  { id: 19, countryId: 6, countryName: 'Canada', name: 'Quebec', code: 'QC', active: true },
  { id: 20, countryId: 6, countryName: 'Canada', name: 'British Columbia', code: 'BC', active: true },
  { id: 21, countryId: 7, countryName: 'Germany', name: 'Bavaria', code: 'BY', active: true },
  { id: 22, countryId: 7, countryName: 'Germany', name: 'Berlin', code: 'BE', active: true },
  { id: 23, countryId: 7, countryName: 'Germany', name: 'Hamburg', code: 'HH', active: true }
];

// Table components
const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full">{children}</table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="[&_tr]:border-b">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
);

const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 ${className || ''}`}>{children}</tr>
);

const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className || ''}`}>{children}</th>
);

const TableCell = ({ children, className, colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) => (
  <td className={`p-4 align-middle ${className || ''}`} colSpan={colSpan}>{children}</td>
);

export default function CountryStateMasterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [stateSearchTerm, setStateSearchTerm] = useState('');

  // Filter countries
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && country.active) ||
      (statusFilter === 'inactive' && !country.active);
    
    return matchesSearch && matchesStatus;
  });

  // Filter states
  const filteredStates = states.filter((state) => {
    const matchesSearch = 
      state.name.toLowerCase().includes(stateSearchTerm.toLowerCase()) ||
      state.code.toLowerCase().includes(stateSearchTerm.toLowerCase());
    
    const matchesCountry = 
      countryFilter === 'all' || 
      state.countryId.toString() === countryFilter;
    
    return matchesSearch && matchesCountry;
  });

  // Calculate stats
  const stats = {
    totalCountries: countries.length,
    activeCountries: countries.filter(c => c.active).length,
    totalStates: states.length,
    totalTenants: countries.reduce((sum, c) => sum + c.tenantCount, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Globe className="h-4 w-4 mr-2" />
                  Add Country
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPin className="h-4 w-4 mr-2" />
                  Add State
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCountries}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeCountries} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Countries</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCountries}</div>
              <p className="text-xs text-muted-foreground">
                Available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total States</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStates}</div>
              <p className="text-xs text-muted-foreground">
                Across all countries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTenants}</div>
              <p className="text-xs text-muted-foreground">
                Using regions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="countries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="countries">
              <Globe className="h-4 w-4 mr-2" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="states">
              <MapPin className="h-4 w-4 mr-2" />
              States/Provinces
            </TabsTrigger>
          </TabsList>

          {/* Countries Tab */}
          <TabsContent value="countries" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filters & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search countries..." 
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="code">Code</SelectItem>
                      <SelectItem value="tenants">Tenants</SelectItem>
                      <SelectItem value="states">States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Countries Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Countries ({filteredCountries.length})</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Country
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Country</DialogTitle>
                        <DialogDescription>
                          Add a new country to the system
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country-name">Country Name *</Label>
                            <Input id="country-name" placeholder="e.g., Singapore" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country-code">Country Code *</Label>
                            <Input id="country-code" placeholder="e.g., SG" maxLength={2} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dial-code">Dial Code *</Label>
                            <Input id="dial-code" placeholder="e.g., +65" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="flag">Flag Emoji</Label>
                            <Input id="flag" placeholder="🇸🇬" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currency-code">Currency Code *</Label>
                            <Input id="currency-code" placeholder="e.g., SGD" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="currency-symbol">Currency Symbol *</Label>
                            <Input id="currency-symbol" placeholder="e.g., $" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone *</Label>
                          <Select>
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                              <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                              <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                              <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Status *</Label>
                          <Select defaultValue="active">
                            <SelectTrigger id="status">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>
                          <Globe className="h-4 w-4 mr-2" />
                          Add Country
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Dial Code</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Timezone</TableHead>
                        <TableHead>States</TableHead>
                        <TableHead>Tenants</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCountries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="h-24 text-center">
                            No countries found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCountries.map((country) => (
                          <TableRow key={country.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{country.flag}</span>
                                <div>
                                  <div className="font-medium">{country.name}</div>
                                  <div className="text-sm text-muted-foreground">{country.code}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {country.code}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="font-mono">{country.dialCode}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{country.currencySymbol}</span>
                                <span>{country.currency}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{country.timezone}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{country.stateCount}</span>
                                {country.stateCount > 0 && (
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Flag className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{country.tenantCount}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {country.active ? (
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
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Country
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Manage States ({country.stateCount})
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {country.active ? (
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
          </TabsContent>

          {/* States Tab */}
          <TabsContent value="states" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filters & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search states..." 
                        className="pl-8"
                        value={stateSearchTerm}
                        onChange={(e) => setStateSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All Status" />
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

            {/* States Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>States/Provinces ({filteredStates.length})</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add State
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New State/Province</DialogTitle>
                        <DialogDescription>
                          Add a new state or province to a country
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="state-country">Country *</Label>
                          <Select>
                            <SelectTrigger id="state-country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.filter(c => c.active).map(country => (
                                <SelectItem key={country.id} value={country.id.toString()}>
                                  {country.flag} {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="state-name">State/Province Name *</Label>
                            <Input id="state-name" placeholder="e.g., California" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state-code">State Code *</Label>
                            <Input id="state-code" placeholder="e.g., CA" maxLength={3} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state-status">Status *</Label>
                          <Select defaultValue="active">
                            <SelectTrigger id="state-status">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>
                          <MapPin className="h-4 w-4 mr-2" />
                          Add State
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>State/Province</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStates.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No states found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStates.map((state) => {
                          const country = countries.find(c => c.id === state.countryId);
                          return (
                            <TableRow key={state.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <MapPin className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{state.name}</div>
                                    <div className="text-sm text-muted-foreground">{state.code}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-mono">
                                  {state.code}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {country && (
                                    <>
                                      <span className="text-xl">{country.flag}</span>
                                      <span>{state.countryName}</span>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {state.active ? (
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
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit State
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {state.active ? (
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
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Reference Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Quick Reference Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Popular Country Codes</h4>
                <div className="space-y-2">
                  {[
                    { flag: '🇸🇬', name: 'Singapore', code: 'SG' },
                    { flag: '🇺🇸', name: 'United States', code: 'US' },
                    { flag: '🇬🇧', name: 'United Kingdom', code: 'GB' },
                    { flag: '🇮🇳', name: 'India', code: 'IN' }
                  ].map(item => (
                    <div key={item.code} className="flex items-center justify-between p-2 rounded-lg border">
                      <span className="text-sm font-medium">{item.flag} {item.name}</span>
                      <Badge variant="outline" className="font-mono">{item.code}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Dial Code Examples</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Singapore', code: '+65' },
                    { name: 'United States', code: '+1' },
                    { name: 'United Kingdom', code: '+44' },
                    { name: 'India', code: '+91' }
                  ].map(item => (
                    <div key={item.code} className="flex items-center justify-between p-2 rounded-lg border">
                      <span className="text-sm font-medium">{item.name}</span>
                      <Badge variant="outline" className="font-mono">{item.code}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
  {[
    { name: 'Singapore Dollar', symbol: '$', code: 'SGD' },
    { name: 'US Dollar', symbol: '$', code: 'USD' },
    { name: 'British Pound', symbol: '£', code: 'GBP' },
    { name: 'Indian Rupee', symbol: '₹', code: 'INR' }
  ].map(item => (
    <div key={item.code} className="flex items-center justify-between p-2 rounded-lg border">
      <span className="text-sm font-medium">{item.name}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{item.symbol}</span>
        <Badge variant="outline" className="font-mono">{item.code}</Badge>
      </div>
    </div>
  ))}
</div>


              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Timezone Examples</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Asia/Singapore', offset: 'GMT+8:00' },
                    { name: 'America/New_York', offset: 'GMT-5:00' },
                    { name: 'Europe/London', offset: 'GMT+0:00' },
                    { name: 'Asia/Kolkata', offset: 'GMT+5:30' }
                  ].map(item => (
                    <div key={item.name} className="flex flex-col p-2 rounded-lg border">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.offset}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Alert className="mt-6">
              <AlertDescription>
                <strong>Note:</strong> Country and state data is used across the system for tenant registration, 
                address validation, currency formatting, and timezone calculations. Ensure all active countries 
                have complete information including dial codes, currency, and timezone settings.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
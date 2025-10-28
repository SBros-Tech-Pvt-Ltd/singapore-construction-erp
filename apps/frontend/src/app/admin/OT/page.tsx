"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Import all shadcn/ui components
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  TrendingUp,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Download,
  Plus,
  Eye,
  Activity,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Star,
  Zap
} from "lucide-react"

// Types
interface OvertimeRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeEmail: string
  employeeAvatar?: string
  department: string
  date: Date
  startTime: string
  endTime: string
  hours: number
  reason: string
  project?: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedDate?: Date
  rejectionReason?: string
  rate?: number
  totalCost?: number
}

interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  avatar?: string
}

interface EmployeeOvertimeSummary {
  name: string
  avatar?: string
  hours: number
  department: string
}

// Date formatting helper function (replacing date-fns to avoid issues)
const formatDate = (date: Date, format: string = 'default'): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric'
  }
  
  if (format === 'MMM dd, yyyy') {
    options.month = 'short'
  } else if (format === 'MMMM dd, yyyy') {
    options.month = 'long'
  } else if (format === 'yyyy-MM-dd') {
    return date.toISOString().split('T')[0]
  }
  
  return date.toLocaleDateString('en-US', options)
}

export default function AdminOvertimePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<OvertimeRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isApprovalOpen, setIsApprovalOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [approvalComments, setApprovalComments] = useState("")

  // Sample data
  const overtimeRequests: OvertimeRequest[] = [
    {
      id: "OT001",
      employeeId: "EMP001",
      employeeName: "John Doe",
      employeeEmail: "john.doe@company.com",
      employeeAvatar: "/avatars/01.png",
      department: "Engineering",
      date: new Date("2024-01-15"),
      startTime: "18:00",
      endTime: "22:00",
      hours: 4,
      reason: "Client deployment deadline - Critical system update required for production",
      project: "Project Alpha",
      status: "pending",
      rate: 50,
      totalCost: 200
    },
    {
      id: "OT002",
      employeeId: "EMP002",
      employeeName: "Jane Smith",
      employeeEmail: "jane.smith@company.com",
      employeeAvatar: "/avatars/02.png",
      department: "Marketing",
      date: new Date("2024-01-14"),
      startTime: "19:00",
      endTime: "21:00",
      hours: 2,
      reason: "Campaign launch preparation - Final review and adjustments needed",
      project: "Q1 Campaign",
      status: "approved",
      approvedBy: "Manager",
      approvedDate: new Date("2024-01-14"),
      rate: 45,
      totalCost: 90
    },
    {
      id: "OT003",
      employeeId: "EMP003",
      employeeName: "Mike Johnson",
      employeeEmail: "mike.j@company.com",
      department: "Engineering",
      date: new Date("2024-01-13"),
      startTime: "18:00",
      endTime: "23:00",
      hours: 5,
      reason: "Critical bug fixes in production environment",
      status: "rejected",
      rejectionReason: "Not pre-approved by department head",
      rate: 50,
      totalCost: 250
    },
    {
      id: "OT004",
      employeeId: "EMP004",
      employeeName: "Sarah Wilson",
      employeeEmail: "sarah.w@company.com",
      department: "Sales",
      date: new Date("2024-01-16"),
      startTime: "17:00",
      endTime: "20:00",
      hours: 3,
      reason: "Client meeting preparation - International client call",
      project: "Global Expansion",
      status: "pending",
      rate: 40,
      totalCost: 120
    },
    {
      id: "OT005",
      employeeId: "EMP005",
      employeeName: "Robert Chen",
      employeeEmail: "robert.c@company.com",
      department: "HR",
      date: new Date("2024-01-12"),
      startTime: "18:00",
      endTime: "21:00",
      hours: 3,
      reason: "Year-end performance review processing",
      status: "approved",
      approvedBy: "HR Director",
      approvedDate: new Date("2024-01-12"),
      rate: 35,
      totalCost: 105
    }
  ]

  const employees: Employee[] = [
    { id: "EMP001", name: "John Doe", email: "john.doe@company.com", department: "Engineering", position: "Senior Developer" },
    { id: "EMP002", name: "Jane Smith", email: "jane.smith@company.com", department: "Marketing", position: "Marketing Manager" },
    { id: "EMP003", name: "Mike Johnson", email: "mike.j@company.com", department: "Engineering", position: "DevOps Engineer" },
    { id: "EMP004", name: "Sarah Wilson", email: "sarah.w@company.com", department: "Sales", position: "Sales Executive" },
    { id: "EMP005", name: "Robert Chen", email: "robert.c@company.com", department: "HR", position: "HR Specialist" }
  ]

  // Statistics
  const stats = {
    totalRequests: overtimeRequests.length,
    pendingRequests: overtimeRequests.filter(r => r.status === 'pending').length,
    totalHours: overtimeRequests.filter(r => r.status === 'approved').reduce((acc, r) => acc + r.hours, 0),
    approvalRate: Math.round((overtimeRequests.filter(r => r.status === 'approved').length / overtimeRequests.length) * 100),
    totalCost: overtimeRequests.filter(r => r.status === 'approved').reduce((acc, r) => acc + (r.totalCost || 0), 0),
    averageHours: Math.round(overtimeRequests.reduce((acc, r) => acc + r.hours, 0) / overtimeRequests.length)
  }

  // Department statistics
  const departmentStats = [
    { name: "Engineering", hours: 45, requests: 12, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { name: "Marketing", hours: 32, requests: 8, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { name: "Sales", hours: 28, requests: 7, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "HR", hours: 15, requests: 4, color: "bg-gradient-to-r from-orange-500 to-red-500" }
  ]

  // Filter requests
  const filteredRequests = overtimeRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-md">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-md">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
           
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <div className="bg-white/20 p-2 rounded-lg">
                <Clock className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.totalRequests}</div>
              <p className="text-xs text-blue-100 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +20% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-500 to-orange-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-yellow-100 flex items-center gap-1 mt-1">
                <Zap className="w-3 h-3" />
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <div className="bg-white/20 p-2 rounded-lg">
                <Activity className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.totalHours}h</div>
              <p className="text-xs text-purple-100 flex items-center gap-1 mt-1">
                <CalendarIcon className="w-3 h-3" />
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.approvalRate}%</div>
              <Progress value={stats.approvalRate} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <div className="bg-white/20 p-2 rounded-lg">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">${stats.totalCost}</div>
              <p className="text-xs text-teal-100 flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3" />
                Approved OT cost
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Avg Hours</CardTitle>
              <div className="bg-white/20 p-2 rounded-lg">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.averageHours}h</div>
              <p className="text-xs text-indigo-100 flex items-center gap-1 mt-1">
                <Star className="w-3 h-3" />
                Per request
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-white shadow-md">
            <TabsTrigger value="requests" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              Requests
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {/* Filters */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                        Overtime Requests
                      </CardTitle>
                      <CardDescription className="mt-1">View and manage all overtime requests</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-2 border-purple-200 hover:bg-purple-50">
                        <Download className="mr-2 h-4 w-4 text-purple-600" />
                        Export
                      </Button>
                      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                            <Plus className="mr-2 h-4 w-4" />
                            New Request
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              Create Overtime Request
                            </DialogTitle>
                            <DialogDescription>
                              Submit a new overtime request for an employee
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="employee">Employee</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select employee" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {employees.map(emp => (
                                      <SelectItem key={emp.id} value={emp.id}>
                                        {emp.name} - {emp.department}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="date">Date</Label>
                                <Input type="date" id="date" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="start">Start Time</Label>
                                <Input type="time" id="start" />
                              </div>
                              <div>
                                <Label htmlFor="end">End Time</Label>
                                <Input type="time" id="end" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="project">Project (Optional)</Label>
                              <Input id="project" placeholder="Enter project name" />
                            </div>
                            <div>
                              <Label htmlFor="reason">Reason</Label>
                              <Textarea 
                                id="reason" 
                                placeholder="Provide detailed reason for overtime..."
                                rows={4}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="rate">Hourly Rate ($)</Label>
                                <Input type="number" id="rate" placeholder="50" />
                              </div>
                              <div>
                                <Label>Estimated Cost</Label>
                                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$0.00</div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              Submit Request
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  {/* Filters Row */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-600" />
                      <Input
                        placeholder="Search employees..."
                        className="pl-9 border-2 border-purple-200 focus:border-purple-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[150px] border-2 border-blue-200">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger className="w-[180px] border-2 border-green-200">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50">
                      <TableHead className="font-bold">Employee</TableHead>
                      <TableHead className="font-bold">Department</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="font-bold">Time</TableHead>
                      <TableHead className="font-bold">Hours</TableHead>
                      <TableHead className="font-bold">Cost</TableHead>
                      <TableHead className="font-bold">Reason</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request, index) => (
                      <TableRow key={request.id} className={cn(
                        "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors",
                        index % 2 === 0 && "bg-slate-50/50"
                      )}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-9 w-9 border-2 border-blue-200 shadow-sm">
                              <AvatarImage src={request.employeeAvatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold">
                                {request.employeeName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{request.employeeName}</div>
                              <div className="text-sm text-muted-foreground">{request.employeeId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-2 border-blue-200 text-blue-700 font-medium">
                            {request.department}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{formatDate(request.date, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">
                            {request.startTime} - {request.endTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {request.hours}h
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-green-600">${request.totalCost || 0}</span>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="truncate" title={request.reason}>
                            {request.reason}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel className="bg-gradient-to-r from-blue-50 to-indigo-50">Actions</DropdownMenuLabel>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedRequest(request)
                                  setIsDetailsOpen(true)
                                }}
                                className="cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4 text-blue-600" />
                                View Details
                              </DropdownMenuItem>
                              {request.status === 'pending' && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-green-600 font-medium cursor-pointer"
                                    onClick={() => {
                                      setSelectedRequest(request)
                                      setIsApprovalOpen(true)
                                    }}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600 font-medium cursor-pointer"
                                    onClick={() => {
                                      setSelectedRequest(request)
                                      setIsRejectOpen(true)
                                    }}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                  Calendar View
                </CardTitle>
                <CardDescription>View overtime requests in calendar format</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="border-2 border-purple-200 rounded-lg p-4 shadow-md">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        Overtime on {selectedDate && formatDate(selectedDate, 'MMMM dd, yyyy')}
                      </h3>
                    </div>
                    <ScrollArea className="h-[300px] w-full rounded-lg border-2 border-purple-200 p-4">
                      {overtimeRequests
                        .filter(r => selectedDate && formatDate(r.date, 'yyyy-MM-dd') === formatDate(selectedDate, 'yyyy-MM-dd'))
                        .map(request => (
                          <div key={request.id} className="mb-4 p-4 border-2 border-purple-200 rounded-lg bg-gradient-to-r from-white to-purple-50 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium flex items-center gap-2">
                                <Avatar className="h-7 w-7 border-2 border-purple-300">
                                  <AvatarImage src={request.employeeAvatar} />
                                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                                    {request.employeeName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                {request.employeeName}
                              </div>
                              {getStatusBadge(request.status)}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4 text-purple-600" />
                              {request.startTime} - {request.endTime} ({request.hours}h)
                            </div>
                            <div className="text-sm mt-2 bg-white p-2 rounded border border-purple-100">{request.reason}</div>
                          </div>
                        ))}
                      {selectedDate && overtimeRequests.filter(r => formatDate(r.date, 'yyyy-MM-dd') === formatDate(selectedDate, 'yyyy-MM-dd')).length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          <CalendarIcon className="w-12 h-12 mx-auto mb-2 text-purple-300" />
                          <p>No overtime requests for this date</p>
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full" />
                    Department Overview
                  </CardTitle>
                  <CardDescription>Overtime hours by department</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {departmentStats.map((dept) => (
                      <div key={dept.name} className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-3 h-3 rounded-full shadow-md", dept.color)} />
                            <span className="text-sm font-bold">{dept.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              {dept.hours} hours
                            </div>
                            <div className="text-xs text-muted-foreground">{dept.requests} requests</div>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={(dept.hours / 50) * 100} className="h-3" />
                          <div className={cn("absolute top-0 left-0 h-3 rounded-full transition-all", dept.color)} 
                               style={{ width: `${(dept.hours / 50) * 100}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-600 to-red-600 rounded-full" />
                    Top Overtime Employees
                  </CardTitle>
                  <CardDescription>Employees with most overtime hours</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {overtimeRequests
                      .reduce((acc: EmployeeOvertimeSummary[], request) => {
                        const existing = acc.find(e => e.name === request.employeeName)
                        if (existing) {
                          existing.hours += request.hours
                        } else {
                          acc.push({
                            name: request.employeeName,
                            avatar: request.employeeAvatar,
                            hours: request.hours,
                            department: request.department
                          })
                        }
                        return acc
                      }, [])
                      .sort((a, b) => b.hours - a.hours)
                      .slice(0, 5)
                      .map((employee, index) => (
                        <div key={employee.name} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-white to-orange-50 border-2 border-orange-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold shadow-md",
                              index === 0 && "bg-gradient-to-br from-yellow-400 to-orange-500",
                              index === 1 && "bg-gradient-to-br from-gray-300 to-gray-500",
                              index === 2 && "bg-gradient-to-br from-orange-400 to-orange-600",
                              index > 2 && "bg-gradient-to-br from-blue-400 to-blue-600"
                            )}>
                              {index === 0 && <Star className="w-4 h-4" />}
                              {index !== 0 && (index + 1)}
                            </div>
                            <Avatar className="h-9 w-9 border-2 border-orange-300 shadow-sm">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold">
                                {employee.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-bold">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.department}</div>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md">
                            {employee.hours}h
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                    Monthly Trend
                  </CardTitle>
                  <CardDescription>Overtime hours trend over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[250px] flex items-end justify-between gap-3 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border-2 border-blue-100">
                    {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((month, index) => {
                      const height = Math.random() * 100 + 50
                      const colors = [
                        'from-red-500 to-orange-500',
                        'from-orange-500 to-yellow-500',
                        'from-yellow-500 to-green-500',
                        'from-green-500 to-teal-500',
                        'from-teal-500 to-blue-500',
                        'from-blue-500 to-purple-500'
                      ]
                      return (
                        <div key={month} className="flex-1 flex flex-col items-center gap-2 group">
                          <Badge className="text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            {Math.round(height / 10) * 10}h
                          </Badge>
                          <div 
                            className={cn(
                              "w-full rounded-t-lg shadow-lg transform transition-all hover:scale-105 cursor-pointer bg-gradient-to-t",
                              colors[index]
                            )}
                            style={{ height: `${height}px` }}
                          />
                          <div className="text-xs font-bold text-muted-foreground">{month}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-orange-600 to-red-600 rounded-full" />
                  Overtime Settings
                </CardTitle>
                <CardDescription>Configure overtime management settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-900">
                      <CheckCircle className="w-5 h-5" />
                      Approval Rules
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <div>
                          <Label className="font-bold">Auto-approve under 2 hours</Label>
                          <p className="text-sm text-muted-foreground">Automatically approve requests under 2 hours</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-2 border-blue-300 hover:bg-blue-50">
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <div>
                          <Label className="font-bold">Require manager approval</Label>
                          <p className="text-sm text-muted-foreground">All requests need manager approval</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-2 border-blue-300 hover:bg-blue-50">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-900">
                      <DollarSign className="w-5 h-5" />
                      Rate Configuration
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <Label className="font-bold">Regular OT Rate</Label>
                        <Input type="number" placeholder="1.5x" className="mt-2 border-2 border-green-200" />
                      </div>
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <Label className="font-bold">Holiday OT Rate</Label>
                        <Input type="number" placeholder="2.0x" className="mt-2 border-2 border-green-200" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-900">
                      <AlertCircle className="w-5 h-5" />
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <Label className="font-bold">Email notifications for new requests</Label>
                        <Button variant="outline" size="sm" className="border-2 border-purple-300 hover:bg-purple-50">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <Label className="font-bold">Weekly summary reports</Label>
                        <Button variant="outline" size="sm" className="border-2 border-purple-300 hover:bg-purple-50">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl border-none shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 -m-6 p-6 mb-4 rounded-t-lg">
            <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Overtime Request Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the overtime request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                <Avatar className="h-14 w-14 border-4 border-white shadow-lg">
                  <AvatarImage src={selectedRequest.employeeAvatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-lg">
                    {selectedRequest.employeeName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{selectedRequest.employeeName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRequest.employeeEmail}</p>
                </div>
                {getStatusBadge(selectedRequest.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <Label className="text-purple-900 font-bold">Employee ID</Label>
                  <p className="text-sm mt-1 font-medium">{selectedRequest.employeeId}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <Label className="text-blue-900 font-bold">Department</Label>
                  <p className="text-sm mt-1 font-medium">{selectedRequest.department}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <Label className="text-green-900 font-bold">Date</Label>
                  <p className="text-sm mt-1 font-medium">{formatDate(selectedRequest.date, 'MMMM dd, yyyy')}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <Label className="text-orange-900 font-bold">Time</Label>
                  <p className="text-sm mt-1 font-medium">{`${selectedRequest.startTime} - ${selectedRequest.endTime}`}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <Label className="text-yellow-900 font-bold">Total Hours</Label>
                  <p className="text-sm mt-1 font-medium">{selectedRequest.hours} hours</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                  <Label className="text-teal-900 font-bold">Total Cost</Label>
                  <p className="text-lg mt-1 font-bold text-green-600">${selectedRequest.totalCost || 0}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border-2 border-blue-200">
                <Label className="font-bold text-blue-900">Reason</Label>
                <p className="text-sm mt-2">{selectedRequest.reason}</p>
              </div>
              
              {selectedRequest.project && (
                <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                  <Label className="text-indigo-900 font-bold">Project</Label>
                  <p className="text-sm mt-1 font-medium">{selectedRequest.project}</p>
                </div>
              )}
              
              {selectedRequest.status === 'approved' && (
                <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
                  <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Approved by {selectedRequest.approvedBy} on {selectedRequest.approvedDate && formatDate(selectedRequest.approvedDate, 'MMM dd, yyyy')}
                  </p>
                </div>
              )}
              
              {selectedRequest.status === 'rejected' && (
                <div className="p-4 bg-gradient-to-r from-red-100 to-rose-100 rounded-lg border-2 border-red-300">
                  <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Rejection Reason: {selectedRequest.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            {selectedRequest?.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="border-2 border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setIsDetailsOpen(false)
                    setIsRejectOpen(true)
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                  onClick={() => {
                    setIsDetailsOpen(false)
                    setIsApprovalOpen(true)
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)} className="border-2">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={isApprovalOpen} onOpenChange={setIsApprovalOpen}>
        <DialogContent className="border-none shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-green-50 to-emerald-50 -m-6 p-6 mb-4 rounded-t-lg">
            <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Approve Overtime Request
            </DialogTitle>
            <DialogDescription>
              Review and approve the overtime request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg space-y-2 border-2 border-blue-200">
                <p className="text-sm">
                  <strong className="text-blue-900">Employee:</strong> {selectedRequest.employeeName}
                </p>
                <p className="text-sm">
                  <strong className="text-blue-900">Date:</strong> {formatDate(selectedRequest.date, 'MMM dd, yyyy')}
                </p>
                <p className="text-sm">
                  <strong className="text-blue-900">Hours:</strong> {selectedRequest.hours}h ({selectedRequest.startTime} - {selectedRequest.endTime})
                </p>
                <p className="text-sm">
                  <strong className="text-blue-900">Cost:</strong> <span className="text-green-600 font-bold">${selectedRequest.totalCost || 0}</span>
                </p>
              </div>
              <div>
                <Label htmlFor="approval-comments" className="font-bold">Comments (Optional)</Label>
                <Textarea 
                  id="approval-comments" 
                  placeholder="Add any comments or notes for the approval..."
                  className="mt-2 border-2 border-green-200"
                  value={approvalComments}
                  onChange={(e) => setApprovalComments(e.target.value)}
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
                <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  This will approve {selectedRequest.hours} hours of overtime at a cost of ${selectedRequest.totalCost || 0}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsApprovalOpen(false)} className="border-2">
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
              onClick={() => {
                setIsApprovalOpen(false)
                setApprovalComments("")
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="border-none shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-red-50 to-rose-50 -m-6 p-6 mb-4 rounded-t-lg">
            <DialogTitle className="text-2xl bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" />
              Reject Overtime Request
            </DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this overtime request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg space-y-2 border-2 border-blue-200">
                <p className="text-sm">
                  <strong className="text-blue-900">Employee:</strong> {selectedRequest.employeeName}
                </p>
                <p className="text-sm">
                  <strong className="text-blue-900">Date:</strong> {formatDate(selectedRequest.date, 'MMM dd, yyyy')}
                </p>
                <p className="text-sm">
                  <strong className="text-blue-900">Hours:</strong> {selectedRequest.hours}h
                </p>
              </div>
              <div>
                <Label htmlFor="rejection-reason" className="font-bold">Rejection Reason *</Label>
                <Textarea 
                  id="rejection-reason" 
                  placeholder="Please provide a clear reason for rejection..."
                  className="mt-2 border-2 border-red-200"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-red-100 to-rose-100 rounded-lg border-2 border-red-300">
                <p className="text-sm text-red-800 font-medium flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  The employee will be notified of this rejection
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsRejectOpen(false)} className="border-2">
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg"
              onClick={() => {
                setIsRejectOpen(false)
                setRejectionReason("")
              }}
              disabled={!rejectionReason}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
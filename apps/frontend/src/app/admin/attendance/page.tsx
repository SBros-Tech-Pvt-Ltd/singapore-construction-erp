// app/admin/attendance/page.tsx
'use client';

import { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Users,
  Building2,
  FileDown,
  UserCheck,
  UserX,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Types
interface AttendanceRecord {
  id: number;
  employeeCode: string;
  employeeName: string;
  photo: string;
  branch: string;
  department: string;
  shift: string;
  punchIn: string | null;
  punchOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  totalHours?: string;
  otHours?: string;
  deviceName?: string;
  date: string;
  isManual: boolean;
  manualReason?: string;
}

// Manual Entry Modal Component
interface ManualEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEntryAdded: () => void;
  editData?: AttendanceRecord | null;
}

function ManualEntryModal({ open, onOpenChange, onEntryAdded, editData }: ManualEntryModalProps) {
  const [formData, setFormData] = useState({
    employeeCode: editData?.employeeCode || '',
    date: editData?.date || new Date().toISOString().split('T')[0],
    status: editData?.status || 'present',
    punchIn: editData?.punchIn || '09:00',
    punchOut: editData?.punchOut || '18:00',
    reason: editData?.manualReason || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEntryAdded();
    onOpenChange(false);
    setFormData({
      employeeCode: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      punchIn: '09:00',
      punchOut: '18:00',
      reason: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Attendance' : 'Add Manual Attendance Entry'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Employee <span className="text-destructive">*</span>
              </label>
              <Select 
                value={formData.employeeCode} 
                onValueChange={(value) => setFormData({ ...formData, employeeCode: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Search employee by name or code..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMP001">EMP001 - John Smith</SelectItem>
                  <SelectItem value="EMP002">EMP002 - Sarah Jones</SelectItem>
                  <SelectItem value="EMP003">EMP003 - Mike Wilson</SelectItem>
                  <SelectItem value="EMP004">EMP004 - Emma Davis</SelectItem>
                  <SelectItem value="EMP005">EMP005 - Tom Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Date <span className="text-destructive">*</span>
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Status <span className="text-destructive">*</span>
              </label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave') => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="half-day">Half Day</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.status === 'present' || formData.status === 'late' || formData.status === 'half-day') && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Punch In Time</label>
                  <Input
                    type="time"
                    value={formData.punchIn}
                    onChange={(e) => setFormData({ ...formData, punchIn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Punch Out Time</label>
                  <Input
                    type="time"
                    value={formData.punchOut}
                    onChange={(e) => setFormData({ ...formData, punchOut: e.target.value })}
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Reason for Manual Entry <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="e.g., Device was offline, entry added manually"
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 10 characters</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editData ? 'Update Entry' : 'Add Entry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Bulk Import Modal
interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BulkImportModal({ open, onOpenChange }: BulkImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBranch, setSelectedBranch] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      alert('Importing attendance from file...');
      onOpenChange(false);
      setFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Import Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Branch</label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="hq">Head Office</SelectItem>
                <SelectItem value="site-a">Site A</SelectItem>
                <SelectItem value="site-b">Site B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload CSV/Excel</label>
            <Input
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              Accepted formats: .csv, .xlsx
            </p>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-2">CSV Format:</p>
            <code className="text-xs block bg-background p-2 rounded">
              Employee_Code, In_Time, Out_Time, Status, Reason
            </code>
            <Button variant="link" size="sm" className="mt-2 h-auto p-0">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file}>
              Import & Validate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// View Details Modal
interface AttendanceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attendance: AttendanceRecord | null;
}

function AttendanceDetailsModal({ open, onOpenChange, attendance }: AttendanceDetailsModalProps) {
  if (!attendance) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Attendance Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            <Avatar className="h-12 w-12">
              <AvatarImage src={attendance.photo} />
              <AvatarFallback>{attendance.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{attendance.employeeName}</div>
              <div className="text-sm text-muted-foreground">{attendance.employeeCode}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm font-medium">{attendance.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Branch</span>
              <span className="text-sm font-medium">{attendance.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Department</span>
              <span className="text-sm font-medium">{attendance.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Shift</span>
              <span className="text-sm font-medium">{attendance.shift}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Punch In</span>
              <span className="text-sm font-medium">{attendance.punchIn || '--'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Punch Out</span>
              <span className="text-sm font-medium">{attendance.punchOut || '--'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Hours</span>
              <span className="text-sm font-medium">{attendance.totalHours || '--'}</span>
            </div>
            {attendance.otHours && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">OT Hours</span>
                <span className="text-sm font-medium text-orange-600">{attendance.otHours}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              {getStatusBadge(attendance.status)}
            </div>
            {attendance.deviceName && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Device</span>
                <span className="text-sm font-medium">{attendance.deviceName}</span>
              </div>
            )}
            {attendance.isManual && attendance.manualReason && (
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-1">Manual Entry Reason</div>
                <div className="text-sm bg-muted p-2 rounded">{attendance.manualReason}</div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Mock Data - Sample JSON Array
const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    employeeCode: 'EMP001',
    employeeName: 'John Smith',
    photo: '',
    branch: 'Head Office',
    department: 'IT',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: '09:00 AM',
    punchOut: '06:15 PM',
    status: 'present',
    totalHours: '9h 15m',
    otHours: '15m',
    deviceName: 'HQ Gate 1',
    date: '2024-01-20',
    isManual: false,
  },
  {
    id: 2,
    employeeCode: 'EMP002',
    employeeName: 'Sarah Jones',
    photo: '',
    branch: 'Site A',
    department: 'HR',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: '09:15 AM',
    punchOut: '06:00 PM',
    status: 'late',
    totalHours: '8h 45m',
    deviceName: 'Site A Main',
    date: '2024-01-20',
    isManual: false,
  },
  {
    id: 3,
    employeeCode: 'EMP003',
    employeeName: 'Mike Wilson',
    photo: '',
    branch: 'Site B',
    department: 'Sales',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: null,
    punchOut: null,
    status: 'absent',
    date: '2024-01-20',
    isManual: false,
  },
  {
    id: 4,
    employeeCode: 'EMP004',
    employeeName: 'Emma Davis',
    photo: '',
    branch: 'Head Office',
    department: 'IT',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: '09:00 AM',
    punchOut: '03:00 PM',
    status: 'half-day',
    totalHours: '6h 00m',
    deviceName: 'HQ Gate 2',
    date: '2024-01-20',
    isManual: false,
  },
  {
    id: 5,
    employeeCode: 'EMP005',
    employeeName: 'Tom Brown',
    photo: '',
    branch: 'Site A',
    department: 'Tech',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: '09:00 AM',
    punchOut: '06:00 PM',
    status: 'present',
    totalHours: '9h 00m',
    date: '2024-01-20',
    isManual: true,
    manualReason: 'Device was offline, entry added manually',
  },
  {
    id: 6,
    employeeCode: 'EMP006',
    employeeName: 'Lisa Anderson',
    photo: '',
    branch: 'Head Office',
    department: 'Finance',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: null,
    punchOut: null,
    status: 'on-leave',
    date: '2024-01-20',
    isManual: false,
  },
  {
    id: 7,
    employeeCode: 'EMP007',
    employeeName: 'Robert Miller',
    photo: '',
    branch: 'Site A',
    department: 'Operations',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: '08:55 AM',
    punchOut: '06:30 PM',
    status: 'present',
    totalHours: '9h 35m',
    otHours: '30m',
    deviceName: 'Site A Main',
    date: '2024-01-20',
    isManual: false,
  },
  {
    id: 8,
    employeeCode: 'EMP008',
    employeeName: 'Jennifer Taylor',
    photo: '',
    branch: 'Site B',
    department: 'Marketing',
    shift: 'Day Shift (9:00 AM - 6:00 PM)',
    punchIn: '09:20 AM',
    punchOut: '06:05 PM',
    status: 'late',
    totalHours: '8h 45m',
    deviceName: 'Site B Gate',
    date: '2024-01-20',
    isManual: false,
  },
];

// Helper function for status badges
function getStatusBadge(status: AttendanceRecord['status']) {
  const configs = {
    present: { 
      label: 'Present', 
      icon: CheckCircle2, 
      className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800' 
    },
    absent: { 
      label: 'Absent', 
      icon: XCircle, 
      className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800' 
    },
    late: { 
      label: 'Late', 
      icon: Clock, 
      className: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800' 
    },
    'half-day': { 
      label: 'Half Day', 
      icon: AlertCircle, 
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800' 
    },
    'on-leave': { 
      label: 'On Leave', 
      icon: Calendar, 
      className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800' 
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}

export default function AttendanceManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceRecord | null>(null);
  const [editData, setEditData] = useState<AttendanceRecord | null>(null);

  // Calculate stats
  const totalEmployees = attendanceData.length;
  const presentCount = attendanceData.filter(a => a.status === 'present' || a.status === 'late').length;
  const absentCount = attendanceData.filter(a => a.status === 'absent').length;
  const halfDayCount = attendanceData.filter(a => a.status === 'half-day').length;
  const lateCount = attendanceData.filter(a => a.status === 'late').length;

  // Filter data
  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || record.branch === branchFilter;
    const matchesDept = departmentFilter === 'all' || record.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesShift = shiftFilter === 'all' || record.shift.includes(shiftFilter);
    
    return matchesSearch && matchesBranch && matchesDept && matchesStatus && matchesShift;
  });

  const handleSync = () => {
    alert('✅ Syncing attendance from all devices...\n\nFetched 42 new records from 6 devices.');
  };

  const handleEdit = (record: AttendanceRecord) => {
    setEditData(record);
    setIsManualEntryOpen(true);
  };

  const handleView = (record: AttendanceRecord) => {
    setSelectedAttendance(record);
    setIsDetailsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      alert(`✅ Attendance record #${id} has been deleted successfully.`);
    }
  };

  const handleExport = () => {
    alert('📥 Exporting attendance data to Excel...\n\nFile: attendance_2024-01-20.xlsx');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Stats Cards - Solid Colors */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
  {/* Total - Blue */}
  <Card className="bg-blue-500 border-0">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
          <Users className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{totalEmployees}</p>
          <p className="text-xs text-blue-100">Total</p>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Present - Green */}
  <Card className="bg-green-500 border-0">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-600">
          <UserCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{presentCount}</p>
          <p className="text-xs text-green-100">Present</p>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Absent - Red */}
  <Card className="bg-red-500 border-0">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600">
          <UserX className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{absentCount}</p>
          <p className="text-xs text-red-100">Absent</p>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Late - Orange */}
  <Card className="bg-orange-500 border-0">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-600">
          <Timer className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{lateCount}</p>
          <p className="text-xs text-orange-100">Late</p>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Half Day - Purple */}
  <Card className="bg-purple-500 border-0">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-600">
          <AlertCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{halfDayCount}</p>
          <p className="text-xs text-purple-100">Half Day</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg md:text-xl">
              Daily Attendance ({filteredData.length})
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={handleSync}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsBulkImportOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button size="sm" variant="outline" onClick={handleExport}>
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => { setEditData(null); setIsManualEntryOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Manual Entry
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4">
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input 
                type="date" 
                className="w-[160px]"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or employee code..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Head Office">Head Office</SelectItem>
                <SelectItem value="Site A">Site A</SelectItem>
                <SelectItem value="Site B">Site B</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>

            <Select value={shiftFilter} onValueChange={setShiftFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shifts</SelectItem>
                <SelectItem value="Day">Day Shift</SelectItem>
                <SelectItem value="Night">Night Shift</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead className="hidden xl:table-cell">Shift</TableHead>
                  <TableHead>In Time</TableHead>
                  <TableHead>Out Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No attendance records found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={record.photo} />
                            <AvatarFallback>
                              {record.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{record.employeeName}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              {record.employeeCode}
                              {record.isManual && (
                                <Badge variant="outline" className="text-xs">Manual</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{record.branch}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm">{record.department}</span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm text-muted-foreground">{record.shift}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">{record.punchIn || '--'}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">{record.punchOut || '--'}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleView(record)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(record)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive" 
                              onClick={() => handleDelete(record.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
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

      {/* Modals */}
      <ManualEntryModal 
        open={isManualEntryOpen}
        onOpenChange={setIsManualEntryOpen}
        onEntryAdded={() => alert('✅ Attendance entry has been saved successfully!')}
        editData={editData}
      />

      <BulkImportModal 
        open={isBulkImportOpen}
        onOpenChange={setIsBulkImportOpen}
      />

      <AttendanceDetailsModal 
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        attendance={selectedAttendance}
      />
    </div>
  );
}
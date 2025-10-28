"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowUpDown, 
  Users, 
  TrendingUp, 
  FileText, 
  IndianRupee, 
  Eye, 
  Download, 
  Upload,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PayScaleModal from "@/components/modal/AddPayscale";
import DeleteConfirmModal from "@/components/modal/DeletePayscale";
import ViewPayscaleModal from "@/components/modal/ViewPayscale";

// ============= TYPES =============
interface BasicAllowances {
  hra: number;
  da: number;
  medical: number;
  conveyance: number;
  transport: number;
  education: number;
  food: number;
  mobile: number;
  lta: number;
  special: number;
  other: number;
}

interface BasicDeductions {
  pfEmployee: number;
  pfEmployer: number;
  esiEmployee: number;
  esiEmployer: number;
  professionalTax: number;
  incomeTax: number;
  loanRecovery: number;
  advanceRecovery: number;
  other: number;
}

interface SalaryRange {
  min: number;
  max: number;
}

interface IncrementRules {
  annualIncrementPercentage: number;
  incrementMonth: string;
  incrementType: "percentage" | "fixed";
}

interface OvertimeRules {
  enabled: boolean;
  ratePerHour: number;
  multiplier: number;
}

export interface PayScale {
  id: number;
  code: string;
  name: string;
  description: string;
  departmentId: string;
  departmentName: string;
  designationId: string;
  designationName: string;
  grade: string;
  salaryRange: SalaryRange;
  basicPay: number;
  payFrequency: "monthly" | "weekly" | "daily" | "hourly";
  allowances: BasicAllowances;
  deductions: BasicDeductions;
  incrementRules: IncrementRules;
  overtimeRules: OvertimeRules;
  hasProbationPeriod: boolean;
  probationMonths: number;
  probationSalaryPercentage: number;
  status: "active" | "inactive" | "draft";
  effectiveFrom: string;
  effectiveTo: string;
  remarks: string;
  version: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  employeeCount?: number;
}

interface Totals {
  totalAllowances: number;
  totalDeductions: number;
  grossSalary: number;
  employerContribution: number;
  ctc: number;
  netSalary: number;
}

// ============= UTILITY FUNCTIONS =============
const calculateTotals = (scale: PayScale): Totals => {
  const totalAllowances = Object.values(scale.allowances).reduce((sum, val) => sum + Number(val), 0);
  
  const employeeDeductions =
    Number(scale.deductions.pfEmployee) +
    Number(scale.deductions.esiEmployee) +
    Number(scale.deductions.professionalTax) +
    Number(scale.deductions.incomeTax) +
    Number(scale.deductions.loanRecovery) +
    Number(scale.deductions.advanceRecovery) +
    Number(scale.deductions.other);

  const employerContribution = Number(scale.deductions.pfEmployer) + Number(scale.deductions.esiEmployer);
  const grossSalary = Number(scale.basicPay) + totalAllowances;
  const ctc = grossSalary + employerContribution;
  const netSalary = grossSalary - employeeDeductions;

  return { totalAllowances, totalDeductions: employeeDeductions, grossSalary, employerContribution, ctc, netSalary };
};

// ============= MAIN COMPONENT =============
export default function PayScalePage() {
  // State Management
  const [payScales, setPayScales] = useState<PayScale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPayScale, setSelectedPayScale] = useState<PayScale | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof PayScale | null; direction: "asc" | "desc" }>({ 
    key: null, 
    direction: "asc" 
  });

  // Load Mock Data
  useEffect(() => {
    const mockData: PayScale[] = [
      {
        id: 1,
        code: "PS-IT-001",
        name: "Software Engineer - Junior",
        description: "Entry level software engineers with 0-2 years experience",
        departmentId: "dept-001",
        departmentName: "Information Technology",
        designationId: "desig-001",
        designationName: "Software Engineer",
        grade: "L1",
        salaryRange: { min: 25000, max: 40000 },
        basicPay: 30000,
        payFrequency: "monthly",
        allowances: { hra: 12000, da: 3000, medical: 2000, conveyance: 1600, transport: 1000, education: 500, food: 2000, mobile: 500, lta: 1000, special: 2000, other: 500 },
        deductions: { pfEmployee: 3600, pfEmployer: 3600, esiEmployee: 900, esiEmployer: 1200, professionalTax: 200, incomeTax: 2000, loanRecovery: 0, advanceRecovery: 0, other: 0 },
        incrementRules: { annualIncrementPercentage: 10, incrementMonth: "04", incrementType: "percentage" },
        overtimeRules: { enabled: true, ratePerHour: 300, multiplier: 1.5 },
        hasProbationPeriod: true,
        probationMonths: 6,
        probationSalaryPercentage: 90,
        status: "active",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2024-12-31",
        remarks: "Entry level developers",
        version: 1,
        createdBy: "Admin",
        createdAt: "2024-01-01T10:00:00",
        modifiedBy: "Admin",
        modifiedAt: "2024-01-01T10:00:00",
        employeeCount: 12,
      },
      {
        id: 2,
        code: "PS-IT-002",
        name: "Senior Software Engineer",
        description: "Senior engineers with 5+ years experience",
        departmentId: "dept-001",
        departmentName: "Information Technology",
        designationId: "desig-002",
        designationName: "Senior Software Engineer",
        grade: "L3",
        salaryRange: { min: 60000, max: 90000 },
        basicPay: 70000,
        payFrequency: "monthly",
        allowances: { hra: 28000, da: 7000, medical: 3000, conveyance: 2400, transport: 2000, education: 1000, food: 3000, mobile: 1000, lta: 2000, special: 5000, other: 1000 },
        deductions: { pfEmployee: 8400, pfEmployer: 8400, esiEmployee: 0, esiEmployer: 0, professionalTax: 200, incomeTax: 8000, loanRecovery: 0, advanceRecovery: 0, other: 0 },
        incrementRules: { annualIncrementPercentage: 12, incrementMonth: "04", incrementType: "percentage" },
        overtimeRules: { enabled: true, ratePerHour: 700, multiplier: 2 },
        hasProbationPeriod: false,
        probationMonths: 0,
        probationSalaryPercentage: 100,
        status: "active",
        effectiveFrom: "2024-01-01",
        effectiveTo: "2025-12-31",
        remarks: "Senior level developers",
        version: 2,
        createdBy: "Admin",
        createdAt: "2024-01-01T10:00:00",
        modifiedBy: "HR Manager",
        modifiedAt: "2024-02-15T14:30:00",
        employeeCount: 8,
      },
      {
        id: 3,
        code: "PS-HR-001",
        name: "HR Executive",
        description: "Entry to mid-level HR executives",
        departmentId: "dept-002",
        departmentName: "Human Resources",
        designationId: "desig-004",
        designationName: "HR Executive",
        grade: "L2",
        salaryRange: { min: 20000, max: 35000 },
        basicPay: 25000,
        payFrequency: "monthly",
        allowances: { hra: 10000, da: 2500, medical: 1500, conveyance: 1600, transport: 800, education: 0, food: 1500, mobile: 500, lta: 1000, special: 1500, other: 0 },
        deductions: { pfEmployee: 3000, pfEmployer: 3000, esiEmployee: 750, esiEmployer: 1000, professionalTax: 200, incomeTax: 1500, loanRecovery: 0, advanceRecovery: 0, other: 0 },
        incrementRules: { annualIncrementPercentage: 8, incrementMonth: "04", incrementType: "percentage" },
        overtimeRules: { enabled: false, ratePerHour: 0, multiplier: 1 },
        hasProbationPeriod: true,
        probationMonths: 3,
        probationSalaryPercentage: 85,
        status: "draft",
        effectiveFrom: "2024-04-01",
        effectiveTo: "2025-03-31",
        remarks: "Under review",
        version: 1,
        createdBy: "HR Manager",
        createdAt: "2024-03-15T09:00:00",
        modifiedBy: "HR Manager",
        modifiedAt: "2024-03-15T09:00:00",
        employeeCount: 0,
      },
    ];
    setPayScales(mockData);
  }, []);

  // Calculate Statistics
  const stats = {
    totalScales: payScales.length,
    activeScales: payScales.filter((ps) => ps.status === "active").length,
    draftScales: payScales.filter((ps) => ps.status === "draft").length,
    totalEmployees: payScales.reduce((sum, ps) => sum + (ps.employeeCount || 0), 0),
    averageCTC: Math.round(
      payScales.reduce((sum, ps) => sum + calculateTotals(ps).ctc, 0) / (payScales.length || 1)
    ),
    highestCTC: Math.max(...payScales.map((ps) => calculateTotals(ps).ctc), 0),
  };

  // Event Handlers
  const handleAddNew = () => {
    setSelectedPayScale(null);
    setIsModalOpen(true);
  };

  const handleEdit = (payScale: PayScale) => {
    setSelectedPayScale(payScale);
    setIsModalOpen(true);
  };

  const handleView = (payScale: PayScale) => {
    setSelectedPayScale(payScale);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setPayScales(payScales.filter((ps) => ps.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSort = (key: keyof PayScale) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort Data
  const filteredAndSortedPayScales = payScales
    .filter((ps) => {
      const matchesSearch =
        ps.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ps.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ps.designationName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || ps.status === filterStatus;
      const matchesDepartment = filterDepartment === "all" || ps.departmentId === filterDepartment;
      return matchesSearch && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const uniqueDepartments = [...new Map(payScales.map((ps) => [ps.departmentId, ps.departmentName])).entries()].map(
    ([id, name]) => ({ id, name })
  );

  const getStatusBadge = (status: string) => {
    const config: { [key: string]: { variant: "default" | "secondary" | "destructive"; className: string } } = {
      active: { variant: "default", className: "bg-green-600 hover:bg-green-700" },
      inactive: { variant: "destructive", className: "bg-red-600 hover:bg-red-700" },
      draft: { variant: "secondary", className: "bg-yellow-600 hover:bg-yellow-700 text-white" },
    };
    const { variant, className } = config[status] || config.draft;
    return (
      <Badge variant={variant} className={className}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Statistics Cards - SOLID COLORS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 - Blue */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Pay Scales</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.totalScales}</div>
              <p className="text-xs text-white/80 mt-1">
                Active: {stats.activeScales} | Draft: {stats.draftScales}
              </p>
            </CardContent>
          </Card>

          {/* Card 2 - Green */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-green-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Employees</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.totalEmployees}</div>
              <p className="text-xs text-white/80 mt-1">Across all pay scales</p>
            </CardContent>
          </Card>

          {/* Card 3 - Purple */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-purple-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Average CTC</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">₹{stats.averageCTC.toLocaleString()}</div>
              <p className="text-xs text-white/80 mt-1">Per month</p>
            </CardContent>
          </Card>

          {/* Card 4 - Orange */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-orange-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Highest CTC</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <IndianRupee className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">₹{stats.highestCTC.toLocaleString()}</div>
              <p className="text-xs text-white/80 mt-1">Maximum package</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section with Action Buttons - ALL IN ONE LINE */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by code, name, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full lg:w-[220px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button onClick={handleAddNew} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add Pay Scale
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Pay Scale Records ({filteredAndSortedPayScales.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => handleSort("code")}>
                      <div className="flex items-center gap-2 font-semibold">
                        Code / Name
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Designation</TableHead>
                    <TableHead className="font-semibold">Grade</TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => handleSort("basicPay")}>
                      <div className="flex items-center gap-2 font-semibold">
                        Basic Pay
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">CTC</TableHead>
                    <TableHead className="font-semibold">Net Salary</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Employees</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedPayScales.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="h-12 w-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">No pay scales found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedPayScales.map((scale) => {
                      const totals = calculateTotals(scale);
                      return (
                        <TableRow key={scale.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <div className="font-semibold text-gray-900">{scale.code}</div>
                              <div className="text-sm text-gray-600">{scale.name}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">{scale.departmentName}</TableCell>
                          <TableCell className="text-gray-700">{scale.designationName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-medium">
                              {scale.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-blue-600">
                            ₹{scale.basicPay.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ₹{totals.ctc.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            ₹{totals.netSalary.toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(scale.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{scale.employeeCount || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleView(scale)}
                                className="hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(scale)}
                                className="hover:bg-amber-50 hover:text-amber-600"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(scale.id)}
                                className="hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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

        {/* Modals */}
        {isModalOpen && (
          <PayScaleModal
            onSave={() => {
              // TODO: Implement save functionality
              console.log('Save functionality needs to be implemented');
              setIsModalOpen(false);
            }}
            payScale={selectedPayScale}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {isDeleteModalOpen && (     
          <DeleteConfirmModal
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}

        {isDetailsModalOpen && selectedPayScale && (
          <ViewPayscaleModal
            payScale={selectedPayScale}
            onClose={() => setIsDetailsModalOpen(false)}
            onEdit={() => {
              setIsDetailsModalOpen(false);
              handleEdit(selectedPayScale);
            }}
          />
        )}
      </div>
    </div>
  );
}
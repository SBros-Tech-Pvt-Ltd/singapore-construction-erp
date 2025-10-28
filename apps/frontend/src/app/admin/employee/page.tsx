'use client';

import React, { useState, useMemo } from 'react';
import { UserPlus, Search, Download, Upload, Edit2, Trash2, Eye, Filter as FilterIcon, X, Users, Calendar, DollarSign, MapPin, AlertCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  designation: string;
  department: string;
  payroll: number;
  joiningDate: string;
  status: string;
  blockNumber?: string;
  streetName?: string;
  unitNumber?: string;
  buildingName?: string;
  postalCode?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  // Bank Details
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  branchCode?: string;
  accountType?: string;
}

interface FormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  branch: string;
  designation: string;
  department: string;
  payroll: string;
  joiningDate: string;
  blockNumber: string;
  streetName: string;
  unitNumber: string;
  buildingName: string;
  postalCode: string;
  emergencyContact: string;
  bloodGroup: string;
  status: string;
  // Bank Details
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
}

interface FilterState {
  branch: string;
  designation: string;
  department: string;
  status: string;
}

const branches = ['Main Office', 'East Branch', 'West Branch', 'North Branch'];
const designations = ['Manager', 'Senior Developer', 'Developer', 'HR Manager', 'Accountant', 'Sales Executive', 'Team Lead', 'Assistant'];
const departments = ['Human Resources', 'Finance', 'IT', 'Sales', 'Operations', 'Marketing'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const bankNames = ['DBS Bank', 'OCBC Bank', 'UOB Bank', 'Standard Chartered', 'Citibank', 'HSBC', 'Maybank'];
const accountTypes = ['Savings Account', 'Current Account'];

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    branch: '',
    designation: '',
    department: '',
    status: ''
  });

  const [formData, setFormData] = useState<FormData>({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    branch: '',
    designation: '',
    department: '',
    payroll: '',
    joiningDate: '',
    blockNumber: '',
    streetName: '',
    unitNumber: '',
    buildingName: '',
    postalCode: '',
    emergencyContact: '',
    bloodGroup: '',
    status: 'Active',
    // Bank Details
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    branchCode: '',
    accountType: ''
  });

  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: 1, 
      employeeId: 'EMP-001', 
      name: 'John Doe', 
      email: 'john@company.com', 
      phone: '+65 9123 4567', 
      branch: 'Main Office', 
      designation: 'Senior Developer', 
      department: 'IT', 
      payroll: 75000, 
      joiningDate: '2023-01-15', 
      status: 'Active', 
      blockNumber: '123', 
      streetName: 'Orchard Road', 
      unitNumber: '#12-34', 
      buildingName: 'Plaza Singapura', 
      postalCode: '238896', 
      emergencyContact: '+65 9999 0001', 
      bloodGroup: 'A+',
      bankName: 'DBS Bank',
      accountHolderName: 'John Doe',
      accountNumber: '001-234567-8',
      branchCode: '7171',
      accountType: 'Savings Account'
    },
    { 
      id: 2, 
      employeeId: 'EMP-002', 
      name: 'Sarah Smith', 
      email: 'sarah@company.com', 
      phone: '+65 9234 5678', 
      branch: 'Main Office', 
      designation: 'HR Manager', 
      department: 'Human Resources', 
      payroll: 65000, 
      joiningDate: '2023-02-20', 
      status: 'Active', 
      blockNumber: '456', 
      streetName: 'Raffles Place', 
      unitNumber: '#05-67', 
      buildingName: 'One Raffles Quay', 
      postalCode: '048583', 
      emergencyContact: '+65 9999 0002', 
      bloodGroup: 'B+',
      bankName: 'OCBC Bank',
      accountHolderName: 'Sarah Smith',
      accountNumber: '501-234567-001',
      branchCode: '5010',
      accountType: 'Current Account'
    },
    { 
      id: 3, 
      employeeId: 'EMP-003', 
      name: 'Mike Johnson', 
      email: 'mike@company.com', 
      phone: '+65 9345 6789', 
      branch: 'East Branch', 
      designation: 'Manager', 
      department: 'Operations', 
      payroll: 80000, 
      joiningDate: '2022-11-10', 
      status: 'Active', 
      blockNumber: '789', 
      streetName: 'Marina Boulevard', 
      unitNumber: '#18-01', 
      buildingName: 'Marina Bay Financial Centre', 
      postalCode: '018980', 
      emergencyContact: '+65 9999 0003', 
      bloodGroup: 'O+',
      bankName: 'UOB Bank',
      accountHolderName: 'Mike Johnson',
      accountNumber: '301-234567-9',
      branchCode: '3010',
      accountType: 'Savings Account'
    },
  ]);

  const formatSingaporeAddress = (employee: Employee) => {
    const parts = [];
    const line1 = [];
    if (employee.blockNumber) line1.push(`Blk ${employee.blockNumber}`);
    if (employee.streetName) line1.push(employee.streetName);
    if (line1.length > 0) parts.push(line1.join(' '));
    if (employee.unitNumber) parts.push(employee.unitNumber);
    if (employee.buildingName) parts.push(employee.buildingName);
    if (employee.postalCode) parts.push(`Singapore ${employee.postalCode}`);
    return parts.length > 0 ? parts.join('\n') : 'N/A';
  };

  const formatSingleLineAddress = (employee: Employee) => {
    const parts = [];
    if (employee.blockNumber) parts.push(`Blk ${employee.blockNumber}`);
    if (employee.streetName) parts.push(employee.streetName);
    if (employee.unitNumber) parts.push(employee.unitNumber);
    if (employee.buildingName) parts.push(employee.buildingName);
    if (employee.postalCode) parts.push(`Singapore ${employee.postalCode}`);
    return parts.join(', ') || 'N/A';
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch = filters.branch === '' || employee.branch === filters.branch;
      const matchesDesignation = filters.designation === '' || employee.designation === filters.designation;
      const matchesDepartment = filters.department === '' || employee.department === filters.department;
      const matchesStatus = filters.status === '' || employee.status === filters.status;

      return matchesSearch && matchesBranch && matchesDesignation && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, filters]);

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ branch: '', designation: '', department: '', status: '' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'postalCode') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    if (name === 'unitNumber') {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      employeeId: '', firstName: '', lastName: '', email: '', phone: '', branch: '',
      designation: '', department: '', payroll: '', joiningDate: '', blockNumber: '',
      streetName: '', unitNumber: '', buildingName: '', postalCode: '',
      emergencyContact: '', bloodGroup: '', status: 'Active',
      bankName: '', accountHolderName: '', accountNumber: '', branchCode: '', accountType: ''
    });
  };

  const handleAddEmployeeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.postalCode && formData.postalCode.length !== 6) return;

    const newEmployee: Employee = {
      id: employees.length + 1,
      employeeId: formData.employeeId,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      branch: formData.branch,
      designation: formData.designation,
      department: formData.department,
      payroll: parseFloat(formData.payroll),
      joiningDate: formData.joiningDate,
      status: formData.status,
      blockNumber: formData.blockNumber,
      streetName: formData.streetName,
      unitNumber: formData.unitNumber,
      buildingName: formData.buildingName,
      postalCode: formData.postalCode,
      emergencyContact: formData.emergencyContact,
      bloodGroup: formData.bloodGroup,
      bankName: formData.bankName,
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      branchCode: formData.branchCode,
      accountType: formData.accountType
    };

    setEmployees([...employees, newEmployee]);
    resetForm();
    setShowAddEmployeeModal(false);
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    const nameParts = employee.name.split(' ');
    setFormData({
      employeeId: employee.employeeId,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: employee.email,
      phone: employee.phone,
      branch: employee.branch,
      designation: employee.designation,
      department: employee.department,
      payroll: employee.payroll.toString(),
      joiningDate: employee.joiningDate,
      blockNumber: employee.blockNumber || '',
      streetName: employee.streetName || '',
      unitNumber: employee.unitNumber || '',
      buildingName: employee.buildingName || '',
      postalCode: employee.postalCode || '',
      emergencyContact: employee.emergencyContact || '',
      bloodGroup: employee.bloodGroup || '',
      status: employee.status,
      bankName: employee.bankName || '',
      accountHolderName: employee.accountHolderName || '',
      accountNumber: employee.accountNumber || '',
      branchCode: employee.branchCode || '',
      accountType: employee.accountType || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    if (formData.postalCode && formData.postalCode.length !== 6) return;

    const updatedEmployee: Employee = {
      ...selectedEmployee,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      branch: formData.branch,
      designation: formData.designation,
      department: formData.department,
      payroll: parseFloat(formData.payroll),
      joiningDate: formData.joiningDate,
      status: formData.status,
      blockNumber: formData.blockNumber,
      streetName: formData.streetName,
      unitNumber: formData.unitNumber,
      buildingName: formData.buildingName,
      postalCode: formData.postalCode,
      emergencyContact: formData.emergencyContact,
      bloodGroup: formData.bloodGroup,
      bankName: formData.bankName,
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      branchCode: formData.branchCode,
      accountType: formData.accountType
    };

    setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp));
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    }
  };

  const downloadCSV = (data: string[], filename: string) => {
    const csv = data.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportEmployeesToCSV = () => {
    const headers = ['Employee ID', 'Name', 'Email', 'Phone', 'Branch', 'Designation', 'Department', 'Payroll', 'Joining Date', 'Address', 'Bank Name', 'Account Number', 'Status'];
    const rows = filteredEmployees.map(emp => [
      emp.employeeId, emp.name, emp.email, emp.phone, emp.branch, emp.designation,
      emp.department, emp.payroll, emp.joiningDate, formatSingleLineAddress(emp), 
      emp.bankName || 'N/A', emp.accountNumber || 'N/A', emp.status
    ].map(field => `"${field}"`).join(','));
    downloadCSV([headers.join(','), ...rows], `employees_export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportEmployeesToExcel = () => {
    let table = '<table><thead><tr><th>Employee ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Branch</th><th>Designation</th><th>Department</th><th>Payroll</th><th>Joining Date</th><th>Address</th><th>Bank Name</th><th>Account Number</th><th>Status</th></tr></thead><tbody>';
    filteredEmployees.forEach(emp => {
      table += `<tr><td>${emp.employeeId}</td><td>${emp.name}</td><td>${emp.email}</td><td>${emp.phone}</td><td>${emp.branch}</td><td>${emp.designation}</td><td>${emp.department}</td><td>${emp.payroll}</td><td>${emp.joiningDate}</td><td>${formatSingleLineAddress(emp)}</td><td>${emp.bankName || 'N/A'}</td><td>${emp.accountNumber || 'N/A'}</td><td>${emp.status}</td></tr>`;
    });
    table += '</tbody></table>';
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `employees_export_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadImportTemplate = () => {
    const headers = ['Employee ID', 'First Name', 'Last Name', 'Email', 'Mobile Number', 'Branch', 'Designation', 'Department', 'Payroll', 'Joining Date', 'Block Number', 'Street Name', 'Unit Number', 'Building Name', 'Postal Code', 'Emergency Contact', 'Blood Group', 'Bank Name', 'Account Holder Name', 'Account Number', 'Branch Code', 'Account Type', 'Status'];
    const sampleData = [
      ['EMP-007', 'John', 'Tan', 'john.tan@company.com', '+65 9234 5678', 'Main Office', 'Developer', 'IT', '60000', '2024-01-15', '123', 'Orchard Road', '#12-34', 'Plaza Singapura', '238896', '+65 9999 0007', 'A+', 'DBS Bank', 'John Tan', '001-234567-8', '7171', 'Savings Account', 'Active']
    ];
    const rows = sampleData.map(row => row.map(field => `"${field}"`).join(','));
    downloadCSV([headers.join(','), ...rows], 'employee_import_template.csv');
  };

  const parseCSV = (text: string): string[][] => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      return values;
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      }
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    setIsImporting(true);

    try {
      const text = await selectedFile.text();
      const rows = parseCSV(text);
      if (rows.length < 2) return;

      const headers = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
      const dataRows = rows.slice(1);

      const newEmployees: Employee[] = [];
      const existingIds = employees.map(e => e.employeeId.toLowerCase());
      const existingEmails = employees.map(e => e.email.toLowerCase());

      dataRows.forEach((row) => {
        if (row.length < headers.length) return;
        
        const employeeId = row[0]?.trim();
        const firstName = row[1]?.trim();
        const lastName = row[2]?.trim();
        const email = row[3]?.trim();
        
        if (!employeeId || !firstName || !lastName || !email) return;
        if (existingIds.includes(employeeId.toLowerCase()) || existingEmails.includes(email.toLowerCase())) return;

        const postalCode = row[14]?.trim().replace(/\D/g, '').slice(0, 6) || '';
        if (postalCode && postalCode.length !== 6) return;

        newEmployees.push({
          id: employees.length + newEmployees.length + 1,
          employeeId: employeeId,
          name: `${firstName} ${lastName}`,
          email: email,
          phone: row[4]?.trim() || '',
          branch: row[5]?.trim() || 'Main Office',
          designation: row[6]?.trim() || 'Employee',
          department: row[7]?.trim() || 'General',
          payroll: parseFloat(row[8]?.trim() || '0'),
          joiningDate: row[9]?.trim() || new Date().toISOString().split('T')[0],
          status: row[22]?.trim() || 'Active',
          blockNumber: row[10]?.trim() || '',
          streetName: row[11]?.trim() || '',
          unitNumber: row[12]?.trim().toUpperCase() || '',
          buildingName: row[13]?.trim() || '',
          postalCode: postalCode,
          emergencyContact: row[15]?.trim() || '',
          bloodGroup: row[16]?.trim() || '',
          bankName: row[17]?.trim() || '',
          accountHolderName: row[18]?.trim() || '',
          accountNumber: row[19]?.trim() || '',
          branchCode: row[20]?.trim() || '',
          accountType: row[21]?.trim() || ''
        });
      });

      if (newEmployees.length > 0) {
        setEmployees([...employees, ...newEmployees]);
        setSelectedFile(null);
        setShowImportModal(false);
      }
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const EmployeeFormFields = ({ isEdit = false }) => (
    <>
      <Card>
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Employee ID *</Label>
              <Input name="employeeId" value={formData.employeeId} onChange={handleFormChange} disabled={isEdit} required placeholder="EMP-001" className={isEdit ? 'bg-gray-100' : ''} />
            </div>
            <div className="space-y-2">
              <Label>First Name *</Label>
              <Input name="firstName" value={formData.firstName} onChange={handleFormChange} required placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label>Last Name *</Label>
              <Input name="lastName" value={formData.lastName} onChange={handleFormChange} required placeholder="Doe" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-green-50">
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input name="email" type="email" value={formData.email} onChange={handleFormChange} required placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <Label>Mobile Number *</Label>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleFormChange} required placeholder="+65 9123 4567" />
            </div>
            <div className="space-y-2">
              <Label>Emergency Contact</Label>
              <Input name="emergencyContact" type="tel" value={formData.emergencyContact} onChange={handleFormChange} placeholder="+65 9999 0000" />
            </div>
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => handleSelectChange('bloodGroup', value)}>
                <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                <SelectContent>{bloodGroups.map(group => <SelectItem key={group} value={group}>{group}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5" />Singapore Address</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Block Number</Label>
              <Input name="blockNumber" value={formData.blockNumber} onChange={handleFormChange} placeholder="123" />
            </div>
            <div className="space-y-2">
              <Label>Street Name</Label>
              <Input name="streetName" value={formData.streetName} onChange={handleFormChange} placeholder="Orchard Road" />
            </div>
            <div className="space-y-2">
              <Label>Unit Number</Label>
              <Input name="unitNumber" value={formData.unitNumber} onChange={handleFormChange} placeholder="#12-34" />
            </div>
            <div className="space-y-2">
              <Label>Building Name</Label>
              <Input name="buildingName" value={formData.buildingName} onChange={handleFormChange} placeholder="Plaza Singapura" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Postal Code (6 digits)</Label>
              <Input name="postalCode" value={formData.postalCode} onChange={handleFormChange} maxLength={6} placeholder="238896" />
              {formData.postalCode && formData.postalCode.length !== 6 && <p className="text-xs text-red-600">⚠ Postal code must be exactly 6 digits</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BANK DETAILS SECTION - NEW */}
      <Card>
        <CardHeader className="bg-cyan-50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-600" />
            Bank Account Details
          </CardTitle>
          <CardDescription>For payroll and salary processing</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Select value={formData.bankName} onValueChange={(value) => handleSelectChange('bankName', value)}>
                <SelectTrigger><SelectValue placeholder="Select bank" /></SelectTrigger>
                <SelectContent>
                  {bankNames.map(bank => <SelectItem key={bank} value={bank}>{bank}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <Select value={formData.accountType} onValueChange={(value) => handleSelectChange('accountType', value)}>
                <SelectTrigger><SelectValue placeholder="Select account type" /></SelectTrigger>
                <SelectContent>
                  {accountTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Holder Name</Label>
              <Input 
                name="accountHolderName" 
                value={formData.accountHolderName} 
                onChange={handleFormChange} 
                placeholder="As per bank records" 
              />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input 
                name="accountNumber" 
                value={formData.accountNumber} 
                onChange={handleFormChange} 
                placeholder="001-234567-8" 
              />
            </div>
            <div className="space-y-2">
              <Label>Branch Code / SWIFT Code</Label>
              <Input 
                name="branchCode" 
                value={formData.branchCode} 
                onChange={handleFormChange} 
                placeholder="7171" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-purple-50">
          <CardTitle className="text-lg">Work Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Branch *</Label>
              <Select value={formData.branch} onValueChange={(value) => handleSelectChange('branch', value)} required>
                <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                <SelectContent>{branches.map(branch => <SelectItem key={branch} value={branch}>{branch}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Designation *</Label>
              <Select value={formData.designation} onValueChange={(value) => handleSelectChange('designation', value)} required>
                <SelectTrigger><SelectValue placeholder="Select designation" /></SelectTrigger>
                <SelectContent>{designations.map(designation => <SelectItem key={designation} value={designation}>{designation}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Department *</Label>
              <Select value={formData.department} onValueChange={(value) => handleSelectChange('department', value)} required>
                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>{departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payroll (Annual) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input name="payroll" type="number" value={formData.payroll} onChange={handleFormChange} required className="pl-10" placeholder="50000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Joining Date *</Label>
              <Input name="joiningDate" type="date" value={formData.joiningDate} onChange={handleFormChange} required />
            </div>
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)} required>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* STATS CARDS - MOVED TO TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100">Total Employees</CardDescription>
                  <CardTitle className="text-3xl mt-1">{employees.length}</CardTitle>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-green-100">Active</CardDescription>
                  <CardTitle className="text-3xl mt-1">{employees.filter(e => e.status === 'Active').length}</CardTitle>
                </div>
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-xl">✓</div>
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-orange-100">Inactive</CardDescription>
                  <CardTitle className="text-3xl mt-1">{employees.filter(e => e.status === 'Inactive').length}</CardTitle>
                </div>
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-xl">✕</div>
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-purple-100">Total Payroll</CardDescription>
                  <CardTitle className="text-3xl mt-1">${employees.reduce((sum, e) => sum + e.payroll, 0).toLocaleString()}</CardTitle>
                </div>
                <DollarSign className="w-10 h-10 text-purple-200" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* SEARCH AND FILTERS */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type="text" placeholder="Search employees..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowImportModal(true)} variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">
                  <Upload className="w-4 h-4 mr-2" />Import
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="bg-green-600 text-white hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportEmployeesToCSV}>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem onClick={exportEmployeesToExcel}>Export as Excel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => { resetForm(); setShowAddEmployeeModal(true); }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <UserPlus className="w-4 h-4 mr-2" />Add Employee
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <Select value={filters.branch} onValueChange={(value) => handleFilterChange('branch', value)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Branches" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Branches</SelectItem>
                  {branches.map(branch => <SelectItem key={branch} value={branch}>{branch}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.designation} onValueChange={(value) => handleFilterChange('designation', value)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Designations" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Designations</SelectItem>
                  {designations.map(designation => <SelectItem key={designation} value={designation}>{designation}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Departments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Departments</SelectItem>
                  {departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {activeFilterCount > 0 && (
                <Button onClick={clearAllFilters} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="w-4 h-4 mr-1" />Clear ({activeFilterCount})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* EMPLOYEE TABLE */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-600">
                    <TableHead className="text-white font-semibold">Employee ID</TableHead>
                    <TableHead className="text-white font-semibold">Name</TableHead>
                    <TableHead className="text-white font-semibold">Designation</TableHead>
                    <TableHead className="text-white font-semibold">Branch</TableHead>
                    <TableHead className="text-white font-semibold">Department</TableHead>
                    <TableHead className="text-white font-semibold">Payroll</TableHead>
                    <TableHead className="text-white font-semibold">Status</TableHead>
                    <TableHead className="text-white font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-blue-50">
                        <TableCell><span className="text-sm font-bold text-blue-600">{employee.employeeId}</span></TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary" className="bg-purple-100 text-purple-800">{employee.designation}</Badge></TableCell>
                        <TableCell className="text-sm text-gray-700">{employee.branch}</TableCell>
                        <TableCell className="text-sm text-gray-700">{employee.department}</TableCell>
                        <TableCell><span className="text-sm font-bold text-green-600">${employee.payroll.toLocaleString()}</span></TableCell>
                        <TableCell>
                          <Badge variant={employee.status === 'Active' ? 'default' : 'destructive'} className={employee.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleView(employee)} className="text-blue-600 hover:text-blue-900 hover:bg-blue-50" title="View Details">
                              <Eye className="w-5 h-5" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(employee)} className="text-green-600 hover:text-green-900 hover:bg-green-50" title="Edit Employee">
                              <Edit2 className="w-5 h-5" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(employee)} className="text-red-600 hover:text-red-900 hover:bg-red-50" title="Delete Employee">
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <Search className="w-12 h-12 text-gray-300 mb-3" />
                          <p className="text-lg font-medium text-gray-500">No employees found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* IMPORT MODAL */}
        <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Upload className="w-6 h-6" />Import Employees</DialogTitle>
              <DialogDescription>Upload a CSV or Excel file to import employee data</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 p-1">
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-purple-50 hover:border-purple-400 transition-colors">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-base text-gray-700 mb-2 font-medium">
                    {selectedFile ? <span className="text-purple-600">✓ {selectedFile.name}</span> : 'Click to select CSV file'}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">Supported: CSV, Excel</p>
                  <input type="file" className="hidden" id="fileUpload" accept=".csv,.xlsx,.xls" onChange={handleFileSelect} />
                  <Label htmlFor="fileUpload">
                    <Button type="button" variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700" asChild>
                      <span>{selectedFile ? 'Change File' : 'Choose File'}</span>
                    </Button>
                  </Label>
                  {selectedFile && (
                    <Button type="button" variant="ghost" onClick={() => { setSelectedFile(null); const fileInput = document.getElementById('fileUpload') as HTMLInputElement; if (fileInput) fileInput.value = ''; }} className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                      Remove
                    </Button>
                  )}
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Import Guidelines:</strong>
                    <ul className="text-xs mt-2 space-y-1 ml-4 list-disc">
                      <li><strong>Required:</strong> Employee ID, First Name, Last Name, Email, Branch, Designation, Department, Payroll</li>
                      <li><strong>Postal Code:</strong> Must be 6 digits</li>
                      <li><strong>Bank Details:</strong> Optional but recommended for payroll</li>
                      <li>Duplicates will be skipped</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                <Button onClick={downloadImportTemplate} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />Download Sample Template
                </Button>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setSelectedFile(null); setShowImportModal(false); }} disabled={isImporting}>Cancel</Button>
              <Button onClick={handleImport} disabled={!selectedFile || isImporting} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                {isImporting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Importing...</> : <><Upload className="w-4 h-4 mr-2" />Start Import</>}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ADD EMPLOYEE MODAL */}
        <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b">
              <DialogTitle className="text-xl">Add New Employee</DialogTitle>
              <DialogDescription>Fill in the employee details below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployeeSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-6 py-6">
                  <EmployeeFormFields />
                </div>
              </div>
              <DialogFooter className="px-6 py-4 border-t shrink-0 bg-gray-50">
                <Button type="button" variant="outline" onClick={() => setShowAddEmployeeModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Create Employee</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* EDIT EMPLOYEE MODAL */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b">
              <DialogTitle className="text-xl">Edit Employee</DialogTitle>
              <DialogDescription>Update employee information</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateEmployee} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-6 py-6">
                  <EmployeeFormFields isEdit={true} />
                </div>
              </div>
              <DialogFooter className="px-6 py-4 border-t shrink-0 bg-gray-50">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                  <Edit2 className="w-4 h-4 mr-2" />Update Employee
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* VIEW EMPLOYEE MODAL */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-white text-xl flex items-center gap-2"><Eye className="w-6 h-6" />Employee Details</DialogTitle>
                  <DialogDescription className="text-blue-100">Complete information about the employee</DialogDescription>
                </div>
                {selectedEmployee && <Badge className={selectedEmployee.status === 'Active' ? 'bg-green-500 hover:bg-green-500 text-white' : 'bg-red-500 hover:bg-red-500 text-white'}>{selectedEmployee.status}</Badge>}
              </div>
            </DialogHeader>
            <ScrollArea className="flex-1 overflow-y-auto px-6">
              {selectedEmployee && (
                <div className="space-y-6 py-6">
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h3>
                      <p className="text-blue-600 font-medium text-lg">{selectedEmployee.designation}</p>
                      <p className="text-gray-600 text-sm">{selectedEmployee.employeeId}</p>
                    </div>
                  </div>

                  <Card>
                    <CardHeader className="bg-blue-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" />Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-gray-500 text-sm">Employee ID</Label>
                          <p className="text-gray-900 font-semibold text-lg">{selectedEmployee.employeeId}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Full Name</Label>
                          <p className="text-gray-900 font-semibold text-lg">{selectedEmployee.name}</p>
                        </div>
                        {selectedEmployee.bloodGroup && (
                          <div>
                            <Label className="text-gray-500 text-sm">Blood Group</Label>
                            <p className="text-gray-900 font-semibold text-lg">
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{selectedEmployee.bloodGroup}</Badge>
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-green-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-gray-500 text-sm">Email Address</Label>
                          <p className="text-gray-900 font-medium text-base">
                            <a href={`mailto:${selectedEmployee.email}`} className="text-blue-600 hover:underline">{selectedEmployee.email}</a>
                          </p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Mobile Number</Label>
                          <p className="text-gray-900 font-medium text-base">
                            <a href={`tel:${selectedEmployee.phone}`} className="text-blue-600 hover:underline">{selectedEmployee.phone}</a>
                          </p>
                        </div>
                        {selectedEmployee.emergencyContact && (
                          <div className="md:col-span-2">
                            <Label className="text-gray-500 text-sm">Emergency Contact</Label>
                            <p className="text-gray-900 font-medium text-base flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <a href={`tel:${selectedEmployee.emergencyContact}`} className="text-blue-600 hover:underline">{selectedEmployee.emergencyContact}</a>
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-orange-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-orange-600" />Singapore Address</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <pre className="font-medium text-gray-900 whitespace-pre-wrap text-base leading-relaxed">{formatSingaporeAddress(selectedEmployee)}</pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BANK DETAILS IN VIEW MODAL - NEW */}
                  {(selectedEmployee.bankName || selectedEmployee.accountNumber) && (
                    <Card>
                      <CardHeader className="bg-cyan-50 border-b">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-cyan-600" />
                          Bank Account Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedEmployee.bankName && (
                            <div>
                              <Label className="text-gray-500 text-sm">Bank Name</Label>
                              <p className="text-gray-900 font-semibold text-base flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-cyan-600" />
                                {selectedEmployee.bankName}
                              </p>
                            </div>
                          )}
                          {selectedEmployee.accountType && (
                            <div>
                              <Label className="text-gray-500 text-sm">Account Type</Label>
                              <p className="text-gray-900 font-semibold text-base">
                                <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                                  {selectedEmployee.accountType}
                                </Badge>
                              </p>
                            </div>
                          )}
                          {selectedEmployee.accountHolderName && (
                            <div>
                              <Label className="text-gray-500 text-sm">Account Holder Name</Label>
                              <p className="text-gray-900 font-semibold text-base">{selectedEmployee.accountHolderName}</p>
                            </div>
                          )}
                          {selectedEmployee.accountNumber && (
                            <div>
                              <Label className="text-gray-500 text-sm">Account Number</Label>
                              <p className="text-gray-900 font-mono font-bold text-base">{selectedEmployee.accountNumber}</p>
                            </div>
                          )}
                          {selectedEmployee.branchCode && (
                            <div>
                              <Label className="text-gray-500 text-sm">Branch Code</Label>
                              <p className="text-gray-900 font-mono font-semibold text-base">{selectedEmployee.branchCode}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader className="bg-purple-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Work Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-gray-500 text-sm">Branch</Label>
                          <p className="text-gray-900 font-semibold text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" />{selectedEmployee.branch}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Designation</Label>
                          <p className="text-gray-900 font-semibold text-base"><Badge variant="secondary" className="bg-purple-100 text-purple-800 text-sm">{selectedEmployee.designation}</Badge></p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Department</Label>
                          <p className="text-gray-900 font-semibold text-base">{selectedEmployee.department}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Annual Payroll</Label>
                          <p className="text-gray-900 font-bold text-xl text-green-600 flex items-center gap-1"><DollarSign className="w-5 h-5" />{selectedEmployee.payroll.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Joining Date</Label>
                          <p className="text-gray-900 font-semibold text-base flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" />{new Date(selectedEmployee.joiningDate).toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </ScrollArea>
            <DialogFooter className="px-6 py-4 border-t shrink-0 bg-gray-50">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
              {selectedEmployee && (
                <>
                  <Button variant="default" onClick={() => { setShowViewModal(false); handleEdit(selectedEmployee); }} className="bg-green-600 hover:bg-green-700">
                    <Edit2 className="w-4 h-4 mr-2" />Edit Employee
                  </Button>
                  <Button variant="destructive" onClick={() => { setShowViewModal(false); handleDelete(selectedEmployee); }} className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />Delete Employee
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* DELETE CONFIRMATION MODAL */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600"><AlertCircle className="w-6 h-6" />Confirm Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete this employee? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            {selectedEmployee && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-semibold">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedEmployee.name}</p>
                    <p className="text-sm text-gray-600">{selectedEmployee.employeeId}</p>
                    <p className="text-sm text-gray-600">{selectedEmployee.email}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowDeleteModal(false); setSelectedEmployee(null); }}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" />Delete Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
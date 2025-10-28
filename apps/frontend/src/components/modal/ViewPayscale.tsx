// components/modals/ViewPayscale.tsx
"use client";

import { X, Edit, FileText, Building2, IndianRupee, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PayScale {
  id: number;
  code: string;
  name: string;
  description: string;
  departmentName: string;
  designationName: string;
  grade: string;
  salaryRange: { min: number; max: number };
  basicPay: number;
  payFrequency: string;
  allowances: any;
  deductions: any;
  incrementRules: any;
  overtimeRules: any;
  hasProbationPeriod: boolean;
  probationMonths: number;
  probationSalaryPercentage: number;
  status: string;
  effectiveFrom: string;
  effectiveTo: string;
  remarks: string;
  employeeCount?: number;
}

interface Props {
  payScale: PayScale;
  onClose: () => void;
  onEdit: () => void;
}

export default function ViewPayscaleModal({ payScale, onClose, onEdit }: Props) {
  const totalAllowances = Object.values(payScale.allowances).reduce((sum: number, val: any) => sum + Number(val), 0);
  const totalDeductions = Object.values(payScale.deductions).reduce((sum: number, val: any) => sum + Number(val), 0);
  const grossSalary = payScale.basicPay + totalAllowances;
  const netSalary = grossSalary - totalDeductions;

  const getStatusBadge = (status: string) => {
    const config: { [key: string]: string } = {
      active: "bg-green-600 text-white",
      inactive: "bg-red-600 text-white",
      draft: "bg-yellow-600 text-white",
    };
    return (
      <Badge className={config[status] || config.draft}>
        {status.toUpperCase()}
      </Badge>
    );
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
        
        {/* Header - Solid Purple */}
        <div className="bg-purple-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{payScale.name}</h2>
              <p className="text-purple-100 text-sm mt-1">Pay Scale Code: {payScale.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(payScale.status)}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-white/20 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-0 shadow-md bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <IndianRupee className="h-5 w-5 opacity-80" />
                </div>
                <div className="text-2xl font-bold">₹{payScale.basicPay.toLocaleString()}</div>
                <p className="text-xs text-white/80 mt-1">Basic Pay</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-green-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 opacity-80" />
                </div>
                <div className="text-2xl font-bold">₹{grossSalary.toLocaleString()}</div>
                <p className="text-xs text-white/80 mt-1">Gross Salary</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-orange-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-5 w-5 opacity-80" />
                </div>
                <div className="text-2xl font-bold">₹{totalDeductions.toLocaleString()}</div>
                <p className="text-xs text-white/80 mt-1">Total Deductions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <IndianRupee className="h-5 w-5 opacity-80" />
                </div>
                <div className="text-2xl font-bold">₹{netSalary.toLocaleString()}</div>
                <p className="text-xs text-white/80 mt-1">Net Salary</p>
              </CardContent>
            </Card>
          </div>

          {/* Basic Information */}
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-x-8">
                <InfoRow label="Department" value={payScale.departmentName} />
                <InfoRow label="Designation" value={payScale.designationName} />
                <InfoRow label="Grade" value={payScale.grade} />
                <InfoRow label="Pay Frequency" value={payScale.payFrequency.toUpperCase()} />
                <InfoRow label="Salary Range" value={`₹${payScale.salaryRange.min.toLocaleString()} - ₹${payScale.salaryRange.max.toLocaleString()}`} />
                <InfoRow label="Employees" value={payScale.employeeCount || 0} />
              </div>
              {payScale.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600"><strong>Description:</strong> {payScale.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-2 border-green-100 shadow-sm">
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="text-lg text-green-900">Allowances</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {Object.entries(payScale.allowances).map(([key, value]: [string, any]) => (
                  value > 0 && (
                    <InfoRow 
                      key={key} 
                      label={key.replace(/([A-Z])/g, " $1").trim().toUpperCase()} 
                      value={`₹${Number(value).toLocaleString()}`} 
                    />
                  )
                ))}
                <div className="mt-4 pt-4 border-t-2 border-green-200">
                  <InfoRow label="Total Allowances" value={`₹${totalAllowances.toLocaleString()}`} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-100 shadow-sm">
              <CardHeader className="bg-red-50 border-b">
                <CardTitle className="text-lg text-red-900">Deductions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {Object.entries(payScale.deductions).map(([key, value]: [string, any]) => (
                  value > 0 && (
                    <InfoRow 
                      key={key} 
                      label={key.replace(/([A-Z])/g, " $1").trim().toUpperCase()} 
                      value={`₹${Number(value).toLocaleString()}`} 
                    />
                  )
                ))}
                <div className="mt-4 pt-4 border-t-2 border-red-200">
                  <InfoRow label="Total Deductions" value={`₹${totalDeductions.toLocaleString()}`} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-2 border-indigo-100 shadow-sm">
              <CardHeader className="bg-indigo-50 border-b">
                <CardTitle className="text-lg text-indigo-900">Increment Rules</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <InfoRow label="Annual Increment" value={`${payScale.incrementRules.annualIncrementPercentage}%`} />
                <InfoRow label="Increment Month" value={new Date(2024, Number(payScale.incrementRules.incrementMonth) - 1).toLocaleString('default', { month: 'long' })} />
                <InfoRow label="Increment Type" value={payScale.incrementRules.incrementType.toUpperCase()} />
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 shadow-sm">
              <CardHeader className="bg-purple-50 border-b">
                <CardTitle className="text-lg text-purple-900">Probation Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <InfoRow label="Has Probation" value={payScale.hasProbationPeriod ? "Yes" : "No"} />
                {payScale.hasProbationPeriod && (
                  <>
                    <InfoRow label="Probation Period" value={`${payScale.probationMonths} months`} />
                    <InfoRow label="Probation Salary" value={`${payScale.probationSalaryPercentage}% of full salary`} />
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Effective Period */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Calendar className="h-5 w-5" />
                Effective Period
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-x-8">
                <InfoRow label="Effective From" value={new Date(payScale.effectiveFrom).toLocaleDateString()} />
                <InfoRow label="Effective To" value={new Date(payScale.effectiveTo).toLocaleDateString()} />
              </div>
              {payScale.remarks && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600"><strong>Remarks:</strong> {payScale.remarks}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="px-6 h-11">
            Close
          </Button>
          <Button onClick={onEdit} className="bg-purple-600 hover:bg-purple-700 px-8 h-11 gap-2">
            <Edit className="h-4 w-4" />
            Edit Pay Scale
          </Button>
        </div>
      </div>
    </div>
  );
}
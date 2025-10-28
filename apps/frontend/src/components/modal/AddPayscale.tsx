// components/modals/AddPayscale.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Save, Building2, IndianRupee, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface PayScale {
  id?: number;
  code: string;
  name: string;
  description: string;
  departmentId: string;
  departmentName: string;
  designationId: string;
  designationName: string;
  grade: string;
  salaryRange: { min: number; max: number };
  basicPay: number;
  payFrequency: "monthly" | "weekly" | "daily" | "hourly";
  allowances: {
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
  };
  deductions: {
    pfEmployee: number;
    pfEmployer: number;
    esiEmployee: number;
    esiEmployer: number;
    professionalTax: number;
    incomeTax: number;
    loanRecovery: number;
    advanceRecovery: number;
    other: number;
  };
  incrementRules: {
    annualIncrementPercentage: number;
    incrementMonth: string;
    incrementType: "percentage" | "fixed";
  };
  overtimeRules: {
    enabled: boolean;
    ratePerHour: number;
    multiplier: number;
  };
  hasProbationPeriod: boolean;
  probationMonths: number;
  probationSalaryPercentage: number;
  status: "active" | "inactive" | "draft";
  effectiveFrom: string;
  effectiveTo: string;
  remarks: string;
}

interface Props {
  payScale: PayScale | null;
  onSave: (data: PayScale) => void;
  onClose: () => void;
}

export default function PayScaleModal({ payScale, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<PayScale>({
    code: "",
    name: "",
    description: "",
    departmentId: "",
    departmentName: "",
    designationId: "",
    designationName: "",
    grade: "",
    salaryRange: { min: 0, max: 0 },
    basicPay: 0,
    payFrequency: "monthly",
    allowances: {
      hra: 0, da: 0, medical: 0, conveyance: 0, transport: 0,
      education: 0, food: 0, mobile: 0, lta: 0, special: 0, other: 0,
    },
    deductions: {
      pfEmployee: 0, pfEmployer: 0, esiEmployee: 0, esiEmployer: 0,
      professionalTax: 0, incomeTax: 0, loanRecovery: 0, advanceRecovery: 0, other: 0,
    },
    incrementRules: {
      annualIncrementPercentage: 0,
      incrementMonth: "01",
      incrementType: "percentage",
    },
    overtimeRules: {
      enabled: false,
      ratePerHour: 0,
      multiplier: 1,
    },
    hasProbationPeriod: false,
    probationMonths: 0,
    probationSalaryPercentage: 100,
    status: "draft",
    effectiveFrom: "",
    effectiveTo: "",
    remarks: "",
  });

  useEffect(() => {
    if (payScale) {
      setFormData(payScale);
    }
  }, [payScale]);

  const handleSubmit = () => {
    onSave(formData);
  };

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev[parent as keyof PayScale] as Record<string, unknown>), [field]: value },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Header - Solid Blue */}
        <div className="bg-blue-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {payScale ? "Edit Pay Scale" : "Add New Pay Scale"}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Configure salary structure and allowances
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/20 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="basic" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Building2 className="h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="salary" className="gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                <IndianRupee className="h-4 w-4" />
                Salary
              </TabsTrigger>
              <TabsTrigger value="allowances" className="gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <FileText className="h-4 w-4" />
                Allowances
              </TabsTrigger>
              <TabsTrigger value="deductions" className="gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                <FileText className="h-4 w-4" />
                Deductions
              </TabsTrigger>
              <TabsTrigger value="rules" className="gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Settings className="h-4 w-4" />
                Rules
              </TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Pay Scale Code *</Label>
                      <Input
                        value={formData.code}
                        onChange={(e) => updateField("code", e.target.value)}
                        placeholder="e.g., PS-IT-001"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Pay Scale Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="e.g., Software Engineer - Junior"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      placeholder="Describe the pay scale..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Department *</Label>
                      <Select
                        value={formData.departmentId}
                        onValueChange={(value) => {
                          updateField("departmentId", value);
                          updateField("departmentName", value === "dept-001" ? "IT" : "HR");
                        }}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dept-001">Information Technology</SelectItem>
                          <SelectItem value="dept-002">Human Resources</SelectItem>
                          <SelectItem value="dept-003">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Designation *</Label>
                      <Select
                        value={formData.designationId}
                        onValueChange={(value) => {
                          updateField("designationId", value);
                          updateField("designationName", value === "desig-001" ? "Software Engineer" : "HR Executive");
                        }}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select Designation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desig-001">Software Engineer</SelectItem>
                          <SelectItem value="desig-002">Senior Software Engineer</SelectItem>
                          <SelectItem value="desig-003">HR Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Grade</Label>
                      <Input
                        value={formData.grade}
                        onChange={(e) => updateField("grade", e.target.value)}
                        placeholder="e.g., L1"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => updateField("status", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Pay Frequency</Label>
                      <Select value={formData.payFrequency} onValueChange={(value) => updateField("payFrequency", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Salary Tab */}
            <TabsContent value="salary" className="space-y-6">
              <Card className="border-2 border-green-100">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-lg text-green-900">Salary Structure</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Basic Pay *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={formData.basicPay}
                          onChange={(e) => updateField("basicPay", Number(e.target.value))}
                          placeholder="0"
                          className="pl-8 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Min Salary Range</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={formData.salaryRange.min}
                          onChange={(e) => updateNestedField("salaryRange", "min", Number(e.target.value))}
                          placeholder="0"
                          className="pl-8 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Max Salary Range</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          type="number"
                          value={formData.salaryRange.max}
                          onChange={(e) => updateNestedField("salaryRange", "max", Number(e.target.value))}
                          placeholder="0"
                          className="pl-8 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Effective From</Label>
                      <Input
                        type="date"
                        value={formData.effectiveFrom}
                        onChange={(e) => updateField("effectiveFrom", e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Effective To</Label>
                      <Input
                        type="date"
                        value={formData.effectiveTo}
                        onChange={(e) => updateField("effectiveTo", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Allowances Tab */}
            <TabsContent value="allowances" className="space-y-6">
              <Card className="border-2 border-purple-100">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-lg text-purple-900">Allowances</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.keys(formData.allowances).map((key) => (
                      <div key={key} className="space-y-2">
                        <Label className="text-base font-semibold capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            type="number"
                            value={formData.allowances[key as keyof typeof formData.allowances]}
                            onChange={(e) =>
                              updateNestedField("allowances", key, Number(e.target.value))
                            }
                            placeholder="0"
                            className="pl-8 h-11"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deductions Tab */}
            <TabsContent value="deductions" className="space-y-6">
              <Card className="border-2 border-orange-100">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg text-orange-900">Deductions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.keys(formData.deductions).map((key) => (
                      <div key={key} className="space-y-2">
                        <Label className="text-base font-semibold capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            type="number"
                            value={formData.deductions[key as keyof typeof formData.deductions]}
                            onChange={(e) =>
                              updateNestedField("deductions", key, Number(e.target.value))
                            }
                            placeholder="0"
                            className="pl-8 h-11"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules" className="space-y-6">
              <Card className="border-2 border-indigo-100">
                <CardHeader className="bg-indigo-50">
                  <CardTitle className="text-lg text-indigo-900">Increment Rules</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Annual Increment %</Label>
                      <Input
                        type="number"
                        value={formData.incrementRules.annualIncrementPercentage}
                        onChange={(e) =>
                          updateNestedField("incrementRules", "annualIncrementPercentage", Number(e.target.value))
                        }
                        placeholder="0"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Increment Month</Label>
                      <Select
                        value={formData.incrementRules.incrementMonth}
                        onValueChange={(value) => updateNestedField("incrementRules", "incrementMonth", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                              {new Date(2024, i).toLocaleString("default", { month: "long" })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Increment Type</Label>
                      <Select
                        value={formData.incrementRules.incrementType}
                        onValueChange={(value) => updateNestedField("incrementRules", "incrementType", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100">
                <CardHeader className="bg-indigo-50">
                  <CardTitle className="text-lg text-indigo-900">Overtime Rules</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="text-base font-semibold">Enable Overtime</Label>
                      <p className="text-sm text-gray-600 mt-1">Allow overtime calculation for this pay scale</p>
                    </div>
                    <Switch
                      checked={formData.overtimeRules.enabled}
                      onCheckedChange={(checked) => updateNestedField("overtimeRules", "enabled", checked)}
                    />
                  </div>

                  {formData.overtimeRules.enabled && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Rate Per Hour</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            type="number"
                            value={formData.overtimeRules.ratePerHour}
                            onChange={(e) =>
                              updateNestedField("overtimeRules", "ratePerHour", Number(e.target.value))
                            }
                            placeholder="0"
                            className="pl-8 h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Multiplier</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={formData.overtimeRules.multiplier}
                          onChange={(e) =>
                            updateNestedField("overtimeRules", "multiplier", Number(e.target.value))
                          }
                          placeholder="1"
                          className="h-11"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100">
                <CardHeader className="bg-indigo-50">
                  <CardTitle className="text-lg text-indigo-900">Probation Period</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="text-base font-semibold">Has Probation Period</Label>
                      <p className="text-sm text-gray-600 mt-1">Apply probation rules to this pay scale</p>
                    </div>
                    <Switch
                      checked={formData.hasProbationPeriod}
                      onCheckedChange={(checked) => updateField("hasProbationPeriod", checked)}
                    />
                  </div>

                  {formData.hasProbationPeriod && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Probation Months</Label>
                        <Input
                          type="number"
                          value={formData.probationMonths}
                          onChange={(e) => updateField("probationMonths", Number(e.target.value))}
                          placeholder="0"
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Probation Salary %</Label>
                        <Input
                          type="number"
                          value={formData.probationSalaryPercentage}
                          onChange={(e) => updateField("probationSalaryPercentage", Number(e.target.value))}
                          placeholder="100"
                          className="h-11"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Remarks</Label>
                <Textarea
                  value={formData.remarks}
                  onChange={(e) => updateField("remarks", e.target.value)}
                  placeholder="Additional notes..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="px-6 h-11">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-8 h-11 gap-2">
            <Save className="h-4 w-4" />
            {payScale ? "Update Pay Scale" : "Create Pay Scale"}
          </Button>
        </div>
      </div>
    </div>
  );
}
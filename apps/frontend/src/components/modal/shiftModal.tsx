'use client'

import { useState } from 'react'
import { Plus, User, Users, 
  Calendar,
  AlertTriangle,
  BookmarkPlus,
  Search,
  Clock
} from 'lucide-react'

// shadcn/ui imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface AssignShiftModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AssignShiftModal({ isOpen, onClose }: AssignShiftModalProps) {
  const [assignType, setAssignType] = useState<'employee' | 'department'>('employee')
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [shiftPattern, setShiftPattern] = useState<'single' | 'range' | 'recurring'>('single')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [employeeSearch, setEmployeeSearch] = useState('')
  const [departmentSearch, setDepartmentSearch] = useState('')
  const [selectedShiftType, setSelectedShiftType] = useState('')

  const employees = [
    { id: '1', name: 'John Doe', department: 'Sales', avatar: 'JD' },
    { id: '2', name: 'Jane Smith', department: 'Marketing', avatar: 'JS' },
    { id: '3', name: 'Bob Johnson', department: 'IT', avatar: 'BJ' },
    { id: '4', name: 'Alice Williams', department: 'HR', avatar: 'AW' },
    { id: '5', name: 'Charlie Brown', department: 'Sales', avatar: 'CB' },
  ]

  const departments = [
    { id: 'd1', name: 'Sales', employeeCount: 12 },
    { id: 'd2', name: 'Marketing', employeeCount: 8 },
    { id: 'd3', name: 'IT', employeeCount: 15 },
    { id: 'd4', name: 'HR', employeeCount: 6 },
    { id: 'd5', name: 'Finance', employeeCount: 7 },
  ]

  const weekDays = [
    { value: 'mon', label: 'Mon' },
    { value: 'tue', label: 'Tue' },
    { value: 'wed', label: 'Wed' },
    { value: 'thu', label: 'Thu' },
    { value: 'fri', label: 'Fri' },
    { value: 'sat', label: 'Sat' },
    { value: 'sun', label: 'Sun' },
  ]

  // Filter employees based on search
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    employee.department.toLowerCase().includes(employeeSearch.toLowerCase())
  )

  // Filter departments based on search
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(departmentSearch.toLowerCase())
  )

  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[98vh] p-0 gap-0 w-full">
        {/* Header */}
        <div className="px-6 py-5 rounded-t-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  Assign Shift
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <ScrollArea className="max-h-[calc(95vh-200px)]">
          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Assignment Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Assign To</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAssignType('employee')}
                    className={cn(
                      "p-4 border-2 rounded-xl transition-all text-left",
                      assignType === 'employee'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-border hover:border-muted-foreground/30'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        assignType === 'employee' ? 'bg-blue-500' : 'bg-muted'
                      )}>
                        <User className={cn(
                          "w-6 h-6",
                          assignType === 'employee' ? 'text-white' : 'text-muted-foreground'
                        )} />
                      </div>
                      <div>
                        <div className="font-semibold">Individual Employee</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAssignType('department')}
                    className={cn(
                      "p-4 border-2 rounded-xl transition-all text-left",
                      assignType === 'department'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-border hover:border-muted-foreground/30'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        assignType === 'department' ? 'bg-blue-500' : 'bg-muted'
                      )}>
                        <Users className={cn(
                          "w-6 h-6",
                          assignType === 'department' ? 'text-white' : 'text-muted-foreground'
                        )} />
                      </div>
                      <div>
                        <div className="font-semibold">Department</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Employee Selection */}
              {assignType === 'employee' && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Select Employee(s)</Label>
                  
                  {/* Search Bar for Employees */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search employees..."
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="border rounded-lg max-h-64 overflow-y-auto">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee, index) => (
                        <label
                          key={employee.id}
                          className={cn(
                            "flex items-center p-4 hover:bg-accent cursor-pointer transition-all",
                            index !== filteredEmployees.length - 1 && "border-b"
                          )}
                        >
                          <Checkbox
                            checked={selectedEmployees.includes(employee.id)}
                            onCheckedChange={() => toggleEmployee(employee.id)}
                          />
                          <div className="ml-3 flex items-center flex-1 gap-3">
                            <div>
                              <div className="text-sm font-semibold">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.department}</div>
                            </div>
                          </div>
                        </label>
                      ))
                    ) : (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        No employees found
                      </div>
                    )}
                  </div>
                  {selectedEmployees.length > 0 && (
                    <p className="text-sm text-blue-600 font-medium">
                      {selectedEmployees.length} employee(s) selected
                    </p>
                  )}
                </div>
              )}

              {/* Department Selection */}
              {assignType === 'department' && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Select Department</Label>
                  
                  {/* Search Bar for Departments */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search departments..."
                      value={departmentSearch}
                      onChange={(e) => setDepartmentSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <RadioGroup defaultValue={departments[0].id}>
                    <div className="space-y-3">
                      {filteredDepartments.length > 0 ? (
                        filteredDepartments.map((dept) => (
                          <label
                            key={dept.id}
                            className="flex items-center p-4 border-2 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all"
                          >
                            <RadioGroupItem value={dept.id} id={dept.id} />
                            <div className="ml-3 flex items-center justify-between flex-1">
                              <div>
                                <div className="text-sm font-semibold">{dept.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {dept.employeeCount} employees
                                </div>
                              </div>
                              <Badge variant="secondary" className="w-8 h-8 rounded-lg flex items-center justify-center">
                                {dept.employeeCount}
                              </Badge>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="p-8 text-center text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                          No departments found
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Shift Type */}
              <div className="space-y-3">
                <Label htmlFor="shift-type" className="text-sm font-semibold">
                  Shift Type
                </Label>
                <Select value={selectedShiftType} onValueChange={setSelectedShiftType}>
                  <SelectTrigger id="shift-type">
                    <SelectValue placeholder="Select shift type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning Shift (08:00 - 16:00)</SelectItem>
                    <SelectItem value="afternoon">Afternoon Shift (16:00 - 00:00)</SelectItem>
                    <SelectItem value="night">Night Shift (00:00 - 08:00)</SelectItem>
                    <SelectItem value="custom">Custom Shift Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Shift Hours */}
              {selectedShiftType === 'custom' && (
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Custom Shift Hours</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Start Time</Label>
                      <Input
                        type="time"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">End Time</Label>
                      <Input
                        type="time"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Shift Name (Optional)</Label>
                    <Input
                      type="text"
                      placeholder="e.g., Evening Shift"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* Shift Pattern */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Shift Pattern</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShiftPattern('single')}
                    className={cn(
                      "h-auto py-3",
                      shiftPattern === 'single' && "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white"
                    )}
                  >
                    Single Day
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShiftPattern('range')}
                    className={cn(
                      "h-auto py-3",
                      shiftPattern === 'range' && "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white"
                    )}
                  >
                    Date Range
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShiftPattern('recurring')}
                    className={cn(
                      "h-auto py-3",
                      shiftPattern === 'recurring' && "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white"
                    )}
                  >
                    Recurring
                  </Button>
                </div>
              </div>

              {/* Date Selection - Single */}
              {shiftPattern === 'single' && (
                <div className="space-y-3">
                  <Label htmlFor="single-date" className="text-sm font-semibold">
                    Select Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="single-date"
                      type="date"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {/* Date Selection - Range */}
              {shiftPattern === 'range' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="start-date" className="text-sm font-semibold">
                      Start Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="start-date"
                        type="date"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="end-date" className="text-sm font-semibold">
                      End Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="end-date"
                        type="date"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Date Selection - Recurring */}
              {shiftPattern === 'recurring' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="repeat-frequency" className="text-sm font-semibold">
                      Repeat Every
                    </Label>
                    <Select>
                      <SelectTrigger id="repeat-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">
                      Repeat On (for weekly)
                    </Label>
                    <div className="flex gap-2">
                      {weekDays.map((day) => (
                        <Button
                          key={day.value}
                          type="button"
                          variant={selectedDays.includes(day.value) ? 'default' : 'outline'}
                          size="sm"
                          className={cn(
                            "flex-1",
                            selectedDays.includes(day.value)
                              ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                              : ""
                          )}
                          onClick={() => toggleDay(day.value)}
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-sm font-semibold">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Add special instructions or notes..."
                  className="resize-none"
                />
              </div>

              {/* Alert for conflicts */}
              <Alert variant="default" className="border-l-4 border-l-amber-400 bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <AlertDescription className="ml-2">
                  <p className="text-sm text-amber-800 font-semibold">Potential Conflict</p>
                  <p className="text-xs text-amber-700 mt-1">
                    2 employees already have shifts assigned on this date. Review before confirming.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <Separator />
        <div className="px-6 py-4 bg-muted/50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" className="gap-2">
              <BookmarkPlus className="w-4 h-4" />
              Save as Template
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Assign Shift
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { useState } from 'react'
import { Zap, X, Calendar, Building2, Clock, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
interface AutoScheduleModalProps {
  isOpen: boolean
  onClose: () => void
}
export default function AutoScheduleModal({ isOpen, onClose }: AutoScheduleModalProps) {
  const [selectedPattern, setSelectedPattern] = useState('weekly')
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedShifts, setSelectedShifts] = useState<string[]>([])

  if (!isOpen) return null

  const patterns = [
    {
      id: 'weekly',
      name: 'Weekly Rotation',
      description: 'Rotate shifts every week',
      icon: <Calendar className="w-6 h-6" />,
      recommended: true
    },
    {
      id: 'biweekly',
      name: 'Bi-Weekly Rotation',
      description: 'Rotate shifts every 2 weeks',
      icon: <Clock className="w-6 h-6" />,
      recommended: false
    },
    {
      id: 'monthly',
      name: 'Monthly Rotation',
      description: 'Rotate shifts every month',
      icon: <Clock className="w-6 h-6" />,
      recommended: false
    },
    {
      id: 'custom',
      name: 'Custom Pattern',
      description: 'Create your own pattern',
      icon: <Settings className="w-6 h-6" />,
      recommended: false
    }
  ]

  const departments = [
    { id: 'd1', name: 'Sales', employeeCount: 12 },
    { id: 'd2', name: 'Marketing', employeeCount: 8 },
    { id: 'd3', name: 'IT', employeeCount: 15 },
    { id: 'd4', name: 'HR', employeeCount: 6 },
    { id: 'd5', name: 'Finance', employeeCount: 7 },
  ]

  const shiftTypes = [
    {
      id: 's1',
      name: 'Morning Shift',
      time: '08:00 - 16:00',
    },
    {
      id: 's2',
      name: 'Afternoon Shift',
      time: '16:00 - 00:00',
    },
    {
      id: 's3',
      name: 'Night Shift',
      time: '00:00 - 08:00',
    }
  ]

  const toggleDepartment = (id: string) => {
    if (selectedDepartments.includes(id)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== id))
    } else {
      setSelectedDepartments([...selectedDepartments, id])
    }
  }

  const toggleShift = (id: string) => {
    if (selectedShifts.includes(id)) {
      setSelectedShifts(selectedShifts.filter(s => s !== id))
    } else {
      setSelectedShifts([...selectedShifts, id])
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 "
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-end px-6 py-4 border-b">

            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-8">
              {/* Section 1: Pattern */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Scheduling Pattern</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {patterns.map((pattern) => (
                    <Button
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern.id)}
                      variant="outline"
                      className={`relative h-auto p-4 justify-start text-left ${selectedPattern === pattern.id
                        ? 'border-blue-500 bg-blue-50 hover:bg-blue-50'
                        : 'hover:border-gray-300'
                        }`}
                    >
                      {pattern.recommended && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                      <div className="flex items-start gap-3 w-full">
                        <div className={`p-2 rounded-lg ${selectedPattern === pattern.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                          {pattern.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{pattern.name}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">{pattern.description}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Custom Pattern Configuration */}
                {selectedPattern === 'custom' && (
                  <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg space-y-4">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Custom Pattern Settings</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Rotation Period</Label>
                        <Input
                          type="number"
                          placeholder="Enter days"
                          className="mt-1.5"
                          min="1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Rest Days</Label>
                        <Input
                          type="number"
                          placeholder="Days off"
                          className="mt-1.5"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                        <Input type="date" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">End Date</Label>
                        <Input type="date" className="mt-1.5" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Working Days</Label>
                      <div className="flex flex-wrap gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <Label
                            key={day}
                            className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all"
                          >
                            <Checkbox />
                            <span className="text-sm font-medium">{day}</span>
                          </Label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Pattern Notes</Label>
                      <Input
                        placeholder="Add any specific instructions..."
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t" />

              {/* Section 2: Departments */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Departments</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  {departments.map((dept) => (
                    <Label
                      key={dept.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedDepartments.includes(dept.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <Checkbox
                        checked={selectedDepartments.includes(dept.id)}
                        onCheckedChange={() => toggleDepartment(dept.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{dept.name}</div>
                        <div className="text-sm text-gray-500">{dept.employeeCount} employees</div>
                      </div>
                    </Label>
                  ))}
                </div>

                {selectedDepartments.length > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">{selectedDepartments.length}</span> department(s) selected • {' '}
                      <span className="font-semibold">
                        {departments.filter(d => selectedDepartments.includes(d.id)).reduce((sum, d) => sum + d.employeeCount, 0)}
                      </span> total employees
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t" />

              {/* Section 3: Shifts */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Shift Types</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  {shiftTypes.map((shift) => (
                    <Label
                      key={shift.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedShifts.includes(shift.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <Checkbox
                        checked={selectedShifts.includes(shift.id)}
                        onCheckedChange={() => toggleShift(shift.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{shift.name}</div>
                        <div className="text-sm text-gray-500">{shift.time}</div>
                      </div>
                    </Label>
                  ))}
                </div>

                {selectedShifts.length > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                    <h4 className="font-medium text-gray-900">Shift Distribution</h4>
                    <div className="space-y-2">
                      {shiftTypes.filter(s => selectedShifts.includes(s.id)).map((shift) => (
                        <div key={shift.id} className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-700">{shift.name}</span>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              className="w-20 h-9"
                            />
                            <span className="text-sm text-gray-500">per day</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t" />

              {/* Section 4: Configuration */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Schedule Configuration</h3>
                  </div>
                </div>

                {selectedPattern !== 'custom' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">End Date</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Additional Options</Label>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <Checkbox />
                      <span className="text-sm text-gray-700">Avoid back-to-back night shifts</span>
                    </Label>
                    <Label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <Checkbox />
                      <span className="text-sm text-gray-700">Balance workload across employees</span>
                    </Label>
                    <Label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <Checkbox />
                      <span className="text-sm text-gray-700">Respect employee preferences</span>
                    </Label>
                    <Label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <Checkbox />
                      <span className="text-sm text-gray-700">Include weekends</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
            <div className="text-sm text-gray-600">
              {selectedDepartments.length} dept • {selectedShifts.length} shifts selected
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                <Zap className="w-4 h-4 mr-2" />
                Generate Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
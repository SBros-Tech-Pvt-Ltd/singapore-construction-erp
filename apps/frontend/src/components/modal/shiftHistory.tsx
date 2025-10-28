'use client'

import { useState, useEffect } from 'react'
import {  X, Search, Plus, Edit2, Trash2, ArrowLeftRight, User, FileText, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ShiftHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShiftHistoryModal({ isOpen, onClose }: ShiftHistoryModalProps) {
  const [filterAction, setFilterAction] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const historyData = [
    {
      id: 1,
      action: 'created',
      actionLabel: 'Shift Created',
      employee: 'John Doe',
      department: 'Sales',
      shiftType: 'Morning',
      date: 'Dec 20, 2024',
      time: '08:00 - 16:00',
      timestamp: 'Dec 15, 2024 at 10:30 AM',
      modifiedBy: 'Admin User',
      reason: null,
      color: 'blue'
    },
    {
      id: 2,
      action: 'modified',
      actionLabel: 'Shift Modified',
      employee: 'Jane Smith',
      department: 'Marketing',
      shiftType: 'Afternoon',
      date: 'Dec 21, 2024',
      time: '16:00 - 00:00',
      timestamp: 'Dec 15, 2024 at 11:45 AM',
      modifiedBy: 'John Manager',
      reason: 'Employee requested schedule change',
      color: 'orange'
    },
    {
      id: 3,
      action: 'deleted',
      actionLabel: 'Shift Cancelled',
      employee: 'Bob Johnson',
      department: 'IT',
      shiftType: 'Night',
      date: 'Dec 18, 2024',
      time: '00:00 - 08:00',
      timestamp: 'Dec 15, 2024 at 02:15 PM',
      modifiedBy: 'HR Manager',
      reason: 'Employee sick leave approved',
      color: 'red'
    },
    {
      id: 4,
      action: 'reassigned',
      actionLabel: 'Shift Reassigned',
      employee: 'Alice Williams',
      department: 'HR',
      shiftType: 'Morning',
      date: 'Dec 22, 2024',
      time: '08:00 - 16:00',
      timestamp: 'Dec 15, 2024 at 03:20 PM',
      modifiedBy: 'Admin User',
      reason: 'Department restructuring',
      color: 'purple'
    },
    {
      id: 5,
      action: 'created',
      actionLabel: 'Shift Created',
      employee: 'Charlie Brown',
      department: 'Sales',
      shiftType: 'Afternoon',
      date: 'Dec 23, 2024',
      time: '16:00 - 00:00',
      timestamp: 'Dec 15, 2024 at 04:50 PM',
      modifiedBy: 'Admin User',
      reason: null,
      color: 'blue'
    },
    {
      id: 6,
      action: 'modified',
      actionLabel: 'Shift Modified',
      employee: 'Diana Prince',
      department: 'Marketing',
      shiftType: 'Morning',
      date: 'Dec 24, 2024',
      time: '08:00 - 16:00',
      timestamp: 'Dec 15, 2024 at 05:10 PM',
      modifiedBy: 'Department Head',
      reason: 'Coverage adjustment',
      color: 'orange'
    },
  ]

  // Action Icons Map
  const actionIconsMap = {
    created: Plus,
    modified: Edit2,
    deleted: Trash2,
    reassigned: ArrowLeftRight
  }

  // Action Colors Map
  const actionColorsMap = {
    created: 'bg-blue-100 text-blue-600',
    modified: 'bg-orange-100 text-orange-600',
    deleted: 'bg-red-100 text-red-600',
    reassigned: 'bg-purple-100 text-purple-600'
  }

  const getActionIcon = (action: string) => {
    const IconComponent = actionIconsMap[action as keyof typeof actionIconsMap]
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null
  }

  const getActionColor = (action: string) => {
    return actionColorsMap[action as keyof typeof actionColorsMap] || 'bg-gray-100 text-gray-600'
  }

  const filteredHistory = historyData.filter(item => {
    if (filterAction !== 'all' && item.action !== filterAction) return false
    if (searchQuery && !item.employee.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 "
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] shadow-2xl transform transition-all flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shift History</h2>
               
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="block text-xs font-semibold text-gray-700 mb-2">
                  Search Employee
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-xs font-semibold text-gray-700 mb-2">
                  Action Type
                </Label>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="modified">Modified</SelectItem>
                    <SelectItem value="deleted">Deleted</SelectItem>
                    <SelectItem value="reassigned">Reassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-xs font-semibold text-gray-700 mb-2">
                  Start Date
                </Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <Label className="block text-xs font-semibold text-gray-700 mb-2">
                  End Date
                </Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 mt-4">
              <Button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all" variant="outline">
                Today
              </Button>
              <Button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all" variant="outline">
                Last 7 Days
              </Button>
              <Button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all" variant="outline">
                Last 30 Days
              </Button>
              <Button className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-all" variant="outline">
                Clear All
              </Button>
            </div>
          </div>

          {/* History Timeline */}
          <div className="px-6 py-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {filteredHistory.map((item) => (
                <div 
                  key={item.id}
                  className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-0 transform -translate-x-[9px] w-4 h-4 rounded-full ${getActionColor(item.action)} border-2 border-white shadow-md`} />
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActionColor(item.action)}`}>
                          {getActionIcon(item.action)}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-bold text-gray-900">{item.actionLabel}</h3>
                          <p className="text-xs text-gray-500">{item.timestamp}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getActionColor(item.action)}`}>
                        {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Employee</p>
                        <p className="text-sm text-gray-900 font-semibold mt-1">{item.employee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Department</p>
                        <p className="text-sm text-gray-900 font-semibold mt-1">{item.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Shift Type</p>
                        <p className="text-sm text-gray-900 font-semibold mt-1">{item.shiftType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Date</p>
                        <p className="text-sm text-gray-900 font-semibold mt-1">{item.date}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Modified by:</span>
                        <span className="text-gray-900 font-semibold ml-1">{item.modifiedBy}</span>
                      </div>
                      {item.reason && (
                        <Button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium bg-transparent border-0 shadow-none p-0 h-auto" variant="ghost">
                          View Details
                        </Button>
                      )}
                    </div>

                    {item.reason && (
                      <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p className="text-xs text-gray-600 font-medium">Reason:</p>
                        <p className="text-sm text-gray-800 mt-1">{item.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No history found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredHistory.length}</span> of <span className="font-semibold">125</span> records
              </div>
              <div className="flex gap-3">
                <Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all" variant="outline">
                  <Download className="w-4 h-4 inline-block mr-2" />
                  Export
                </Button>
                <Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all" variant="outline">
                  Load More
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
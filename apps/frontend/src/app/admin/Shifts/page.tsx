'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import AssignShiftModal from '@/components/modal/shiftModal'
import ShiftHistoryModal from '@/components/modal/shiftHistory'
import AutoScheduleModal from '@/components/modal/AutoSchedule'
import { Zap, Clock, Plus, List, Calendar as CalendarIcon, Search, Edit, Eye, ChevronLeft, ChevronRight, Check, User, CheckCircle, MessageSquare, Download, Upload, ChevronDown, Ban, Filter, X, Sunrise, Sun, Moon } from 'lucide-react'

export default function ShiftListView() {
  // Modal states
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [isAutoScheduleModalOpen, setIsAutoScheduleModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('list')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  // Filter states - Applied
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedDepartments, setAppliedDepartments] = useState<string[]>([])
  const [appliedShiftTypes, setAppliedShiftTypes] = useState<string[]>([])
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([])
  const [appliedStartDate, setAppliedStartDate] = useState('')
  const [appliedEndDate, setAppliedEndDate] = useState('')

  // Filter states - Temporary
  const [tempDepartments, setTempDepartments] = useState<string[]>([])
  const [tempShiftTypes, setTempShiftTypes] = useState<string[]>([])
  const [tempStatuses, setTempStatuses] = useState<string[]>([])
  const [tempStartDate, setTempStartDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')

  // Sample data
  const [shiftsData, setShiftsData] = useState([
    { id: 1, employeeName: 'Barisha', department: 'Sales', shiftType: 'Morning', shiftColor: 'blue', shiftPattern: 'Single Day', startDate: '2024-12-15', endDate: '2024-12-15', startDateDisplay: 'Dec 15, 2024', endDateDisplay: 'Dec 15, 2024', status: 'Assigned', statusColor: 'green', startTime: '08:00', endTime: '16:00' },
    { id: 2, employeeName: 'Jeny', department: 'Marketing', shiftType: 'Afternoon', shiftColor: 'orange', shiftPattern: 'Date Range', startDate: '2024-12-15', endDate: '2024-12-20', startDateDisplay: 'Dec 15, 2024', endDateDisplay: 'Dec 20, 2024', status: 'Confirmed', statusColor: 'green', startTime: '16:00', endTime: '00:00' },
    { id: 3, employeeName: 'Bob', department: 'IT', shiftType: 'Night', shiftColor: 'purple', shiftPattern: 'Recurring', startDate: '2024-12-16', endDate: '2025-01-16', startDateDisplay: 'Dec 16, 2024', endDateDisplay: 'Jan 16, 2025', recurringPattern: 'Weekly - Monday, Wednesday', status: 'Pending', statusColor: 'yellow', startTime: '00:00', endTime: '08:00' },
    { id: 4, employeeName: 'Alice', department: 'HR', shiftType: 'Custom Shift Hours', shiftColor: 'blue', shiftPattern: 'Single Day', startDate: '2024-12-16', endDate: '2024-12-16', startDateDisplay: 'Dec 16, 2024', endDateDisplay: 'Dec 16, 2024', status: 'Assigned', statusColor: 'green', startTime: '10:00', endTime: '18:00' },
    { id: 5, employeeName: 'Anchu', department: 'Sales', shiftType: 'Afternoon', shiftColor: 'orange', shiftPattern: 'Recurring', startDate: '2024-12-17', endDate: '2025-02-17', startDateDisplay: 'Dec 17, 2024', endDateDisplay: 'Feb 17, 2025', recurringPattern: 'Daily', status: 'Cancelled', statusColor: 'red', startTime: '16:00', endTime: '00:00' },
    { id: 6, employeeName: 'Diana', department: 'Marketing', shiftType: 'Morning', shiftColor: 'blue', shiftPattern: 'Date Range', startDate: '2024-12-17', endDate: '2024-12-25', startDateDisplay: 'Dec 17, 2024', endDateDisplay: 'Dec 25, 2024', status: 'Assigned', statusColor: 'green', startTime: '08:00', endTime: '16:00' },
    { id: 7, employeeName: 'Michael', department: 'Finance', shiftType: 'Morning', shiftColor: 'blue', shiftPattern: 'Single Day', startDate: '2024-12-18', endDate: '2024-12-18', startDateDisplay: 'Dec 18, 2024', endDateDisplay: 'Dec 18, 2024', status: 'Suspended', statusColor: 'gray', startTime: '08:00', endTime: '16:00' },
  ])

  const departments = ['Sales', 'Marketing', 'IT', 'HR', 'Finance']
  const shiftTypes = ['Morning', 'Afternoon', 'Night', 'Custom Shift Hours']
  const statuses = ['Assigned', 'Confirmed', 'Pending', 'Cancelled', 'Suspended']
  const years = ['2022', '2023', '2024', '2025', '2026']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const monthlyShiftsData: any = {
    0: { total: 45, morning: 18, afternoon: 15, night: 12 }, 1: { total: 52, morning: 20, afternoon: 18, night: 14 },
    2: { total: 48, morning: 19, afternoon: 16, night: 13 }, 3: { total: 55, morning: 22, afternoon: 19, night: 14 },
    4: { total: 50, morning: 20, afternoon: 17, night: 13 }, 5: { total: 58, morning: 23, afternoon: 20, night: 15 },
    6: { total: 62, morning: 25, afternoon: 22, night: 15 }, 7: { total: 60, morning: 24, afternoon: 21, night: 15 },
    8: { total: 54, morning: 21, afternoon: 19, night: 14 }, 9: { total: 57, morning: 23, afternoon: 20, night: 14 },
    10: { total: 51, morning: 20, afternoon: 18, night: 13 }, 11: { total: 65, morning: 26, afternoon: 23, night: 16 },
  }

  const getMonthData = (month: number) => monthlyShiftsData[month] || { total: 0, morning: 0, afternoon: 0, night: 0 }

  const getStatusColor = (color: string) => {
    const colors: any = {
      green: 'bg-green-100 text-green-800 hover:bg-green-100',
      yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      red: 'bg-red-100 text-red-800 hover:bg-red-100',
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      gray: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
    return colors[color] || colors.green
  }

  const getShiftColor = (color: string) => {
    const colors: any = {
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      orange: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-100'
    }
    return colors[color] || colors.blue
  }

  const handleOpenFilters = (open: boolean) => {
    if (open) {
      setTempDepartments(appliedDepartments)
      setTempShiftTypes(appliedShiftTypes)
      setTempStatuses(appliedStatuses)
      setTempStartDate(appliedStartDate)
      setTempEndDate(appliedEndDate)
    }
    setFiltersOpen(open)
  }

  const toggleFilter = (setter: any, value: string) => {
    setter((prev: string[]) => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
  }

  const getTempFilterCount = () => tempDepartments.length + tempShiftTypes.length + tempStatuses.length + (tempStartDate ? 1 : 0) + (tempEndDate ? 1 : 0)
  const getActiveFilterCount = () => appliedDepartments.length + appliedShiftTypes.length + appliedStatuses.length + (appliedStartDate ? 1 : 0) + (appliedEndDate ? 1 : 0)

  const applyFilters = () => {
    setAppliedDepartments(tempDepartments)
    setAppliedShiftTypes(tempShiftTypes)
    setAppliedStatuses(tempStatuses)
    setAppliedStartDate(tempStartDate)
    setAppliedEndDate(tempEndDate)
    setFiltersOpen(false)
  }

  const clearTempFilters = () => {
    setTempDepartments([])
    setTempShiftTypes([])
    setTempStatuses([])
    setTempStartDate('')
    setTempEndDate('')
  }

  const clearFilters = () => {
    setSearchQuery('')
    setAppliedDepartments([])
    setAppliedShiftTypes([])
    setAppliedStatuses([])
    setAppliedStartDate('')
    setAppliedEndDate('')
    clearTempFilters()
  }

  const filteredShifts = shiftsData.filter((shift) => {
    const matchesSearch = !searchQuery || shift.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = !appliedDepartments.length || appliedDepartments.includes(shift.department)
    const matchesShift = !appliedShiftTypes.length || appliedShiftTypes.includes(shift.shiftType)
    const matchesStatus = !appliedStatuses.length || appliedStatuses.includes(shift.status)

    let matchesDateRange = true
    if (appliedStartDate || appliedEndDate) {
      const shiftStartDate = new Date(shift.startDate)
      const shiftEndDate = new Date(shift.endDate)
      if (appliedStartDate) matchesDateRange = matchesDateRange && shiftEndDate >= new Date(appliedStartDate)
      if (appliedEndDate) matchesDateRange = matchesDateRange && shiftStartDate <= new Date(appliedEndDate)
    }

    return matchesSearch && matchesDepartment && matchesShift && matchesStatus && matchesDateRange
  })

  const handleDeactivateConfirm = () => {
    setShiftsData(shiftsData.map(shift => shift.id === selectedShift?.id ? { ...shift, status: 'Suspended', statusColor: 'gray' } : shift))
    setDeactivateDialogOpen(false)
    setSelectedShift(null)
  }

  const getTotalYearShifts = () => months.reduce((total, _, index) => total + getMonthData(index).total, 0)

  const FilterSection = ({ title, items, checked, onToggle }: any) => (
    <div>
      <Label className="text-sm font-semibold text-gray-700 mb-2 block">{title}</Label>
      <div className="space-y-2">
        {items.map((item: string) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox id={`${title}-${item}`} checked={checked.includes(item)} onCheckedChange={() => onToggle(item)} />
            <label htmlFor={`${title}-${item}`} className="text-sm text-gray-700 cursor-pointer flex-1 select-none">{item}</label>
          </div>
        ))}
      </div>
    </div>
  )

  const FilterBadge = ({ label, value, onRemove }: any) => (
    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
      {label}: {value}
      <button onClick={onRemove} className="ml-2 hover:text-blue-900"><X className="w-3 h-3" /></button>
    </Badge>
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs with Assign Shift Button */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex space-x-8 -mb-px">
              {[{ id: 'list', icon: List, label: 'Shift List' }, { id: 'calendar', icon: CalendarIcon, label: 'Annual Calendar' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 border-b-2 font-medium text-sm transition-all flex items-center gap-2 ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <tab.icon className="w-5 h-5" />{tab.label}
                </button>
              ))}
            </div>
            
            {/* Assign Shift Button */}
            <div className="pb-4">
              <Button onClick={() => setIsAssignModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Assign Shift
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'list' && (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
            {/* Search and Filter Bar */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between gap-3">
                {/* Left side - History, Auto Schedule */}
                <div className="flex items-center gap-3">
                  <Button onClick={() => setIsHistoryModalOpen(true)} variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    <Clock className="w-4 h-4 mr-2" />
                    History
                  </Button>
                  <Button onClick={() => setIsAutoScheduleModalOpen(true)} variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Zap className="w-4 h-4 mr-2" />
                    Auto Schedule
                  </Button>
                </div>

                {/* Right side - Search, Import, Export, Filters */}
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input type="text" placeholder="Search employee..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-white" />
                  </div>

                  <Button onClick={() => console.log('Importing')} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                  <Button onClick={() => console.log('Exporting')} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>

                  {/* Filter Popover */}
                  <Popover open={filtersOpen} onOpenChange={handleOpenFilters}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />Filters
                        {getActiveFilterCount() > 0 && <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100">{getActiveFilterCount()}</Badge>}
                        <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[280px] bg-white p-0" align="end">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white">
                        <h3 className="font-semibold text-gray-900">Filters</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={clearTempFilters} className="text-gray-600 hover:text-gray-900 h-7 px-2 text-xs">Clear all</Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFiltersOpen(false)}><X className="w-4 h-4" /></Button>
                        </div>
                      </div>

                      <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <FilterSection title="Department" items={departments} checked={tempDepartments} onToggle={(dept: string) => toggleFilter(setTempDepartments, dept)} />
                        <FilterSection title="Shift Type" items={shiftTypes} checked={tempShiftTypes} onToggle={(type: string) => toggleFilter(setTempShiftTypes, type)} />
                        <FilterSection title="Status" items={statuses} checked={tempStatuses} onToggle={(status: string) => toggleFilter(setTempStatuses, status)} />
                        
                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-2 block">Date Range</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs text-gray-600 mb-1.5 block">Start Date</Label>
                              <Input type="date" value={tempStartDate} onChange={(e) => setTempStartDate(e.target.value)} className="w-full" />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600 mb-1.5 block">End Date</Label>
                              <Input type="date" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} className="w-full" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border-t border-gray-200 flex items-center justify-between bg-white">
                        <div className="text-sm text-gray-600">
                          {getTempFilterCount() > 0 ? <span className="font-medium text-gray-900">{getTempFilterCount()} filter{getTempFilterCount() > 1 ? 's' : ''} selected</span> : <span>No filters selected</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => setFiltersOpen(false)} className="min-w-[70px]">Cancel</Button>
                          <Button size="sm" onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[70px]"><Check className="w-4 h-4 mr-1" />Apply</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {getActiveFilterCount() > 0 && <Button variant="ghost" size="sm" onClick={clearFilters}><X className="w-4 h-4 mr-2" />Clear</Button>}
                </div>
              </div>

              {/* Active Filters */}
              {(getActiveFilterCount() > 0 || searchQuery) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchQuery && <FilterBadge label="Search" value={searchQuery} onRemove={() => setSearchQuery('')} />}
                  {appliedDepartments.map(dept => <FilterBadge key={dept} label="Department" value={dept} onRemove={() => { setAppliedDepartments(appliedDepartments.filter(d => d !== dept)); setTempDepartments(tempDepartments.filter(d => d !== dept)) }} />)}
                  {appliedShiftTypes.map(type => <FilterBadge key={type} label="Shift" value={type} onRemove={() => { setAppliedShiftTypes(appliedShiftTypes.filter(t => t !== type)); setTempShiftTypes(tempShiftTypes.filter(t => t !== type)) }} />)}
                  {appliedStatuses.map(status => <FilterBadge key={status} label="Status" value={status} onRemove={() => { setAppliedStatuses(appliedStatuses.filter(s => s !== status)); setTempStatuses(tempStatuses.filter(s => s !== status)) }} />)}
                  {appliedStartDate && <FilterBadge label="From" value={appliedStartDate} onRemove={() => { setAppliedStartDate(''); setTempStartDate('') }} />}
                  {appliedEndDate && <FilterBadge label="To" value={appliedEndDate} onRemove={() => { setAppliedEndDate(''); setTempEndDate('') }} />}
                </div>
              )}
            </div>

            {/* Table */}
            <div className="relative overflow-hidden">
              <div className="overflow-auto max-h-[calc(100vh-350px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                <Table>
                  <TableHeader className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 z-20">
                    <TableRow className="border-b border-gray-200">
                      {['Employee', 'Department', 'Shift Type', 'Shift Pattern', 'Start Date', 'End Date', 'Status', 'Actions'].map(header => (
                        <TableHead key={header} className="font-semibold text-gray-700 text-xs uppercase tracking-wider">{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShifts.length > 0 ? filteredShifts.map((shift) => (
                      <TableRow key={shift.id} className="transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <TableCell className="font-medium">
                          <span className="text-sm font-medium text-gray-900">{shift.employeeName}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700 font-medium">{shift.department}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getShiftColor(shift.shiftColor)} font-medium`}>{shift.shiftType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm text-gray-900 font-medium">{shift.shiftPattern}</div>
                            {shift.recurringPattern && <div className="text-xs text-gray-500 mt-0.5">{shift.recurringPattern}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700">{shift.startDateDisplay}</div>
                          <div className="text-xs text-gray-500">{shift.startTime}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700">{shift.endDateDisplay}</div>
                          <div className="text-xs text-gray-500">{shift.endTime}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(shift.statusColor)} font-medium`}>{shift.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-blue-100 hover:text-blue-700" onClick={() => { setSelectedShift(shift); setIsEditModalOpen(true) }} title="Edit">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-green-100 hover:text-green-700" onClick={() => { setSelectedShift(shift); setIsViewModalOpen(true) }} title="View">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {shift.status !== 'Suspended' && (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50" onClick={() => { setSelectedShift(shift); setDeactivateDialogOpen(true) }} title="Deactivate">
                                <Ban className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12">
                          <Search className="w-16 h-16 mb-4 text-gray-300 mx-auto" />
                          <p className="text-base font-medium text-gray-500">No shifts found</p>
                          <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search query</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-white">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredShifts.length > 0 ? 1 : 0}</span> to <span className="font-semibold text-gray-900">{filteredShifts.length}</span> of <span className="font-semibold text-gray-900">{filteredShifts.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="hover:bg-gray-100">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[36px]">1</Button>
                <Button variant="outline" size="sm" disabled className="hover:bg-gray-100">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200">
            {/* Calendar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Annual Calendar {selectedYear}</h2>
                  <p className="text-sm text-gray-500 mt-1">Yearly shift overview</p>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      {['all', 'sales', 'marketing', 'it', 'hr', 'finance'].map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept === 'all' ? 'All Departments' : dept.charAt(0).toUpperCase() + dept.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {months.map((month, index) => {
                  const data = getMonthData(index)
                  const isBlue = index % 2 === 0
                  
                  const getIntensity = () => {
                    if (data.total >= 60) return 'high'
                    if (data.total >= 50) return 'medium'
                    return 'low'
                  }
                  
                  const intensity = getIntensity()
                  
                  return (
                    <div
                      key={month}
                      className={`relative bg-white border rounded-lg p-5 hover:shadow-md transition-all cursor-pointer ${
                        isBlue ? 'border-blue-200' : 'border-violet-200'
                      }`}
                    >
                      {/* Intensity Indicator - Red Dots */}
                      <div className="absolute top-3 right-3 flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${intensity === 'high' ? 'bg-red-500' : intensity === 'medium' ? 'bg-red-300' : 'bg-red-100'}`}></div>
                        <div className={`w-2 h-2 rounded-full ${intensity === 'medium' || intensity === 'high' ? 'bg-red-500' : 'bg-red-100'}`}></div>
                        <div className={`w-2 h-2 rounded-full ${intensity === 'high' ? 'bg-red-500' : 'bg-red-100'}`}></div>
                      </div>

                      {/* Month Name */}
                      <div className={`mb-4 pb-3 border-b ${isBlue ? 'border-blue-100' : 'border-violet-100'}`}>
                        <h3 className={`text-lg font-bold ${isBlue ? 'text-blue-600' : 'text-violet-600'}`}>
                          {month}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{selectedYear}</p>
                      </div>

                      {/* Total Shifts - Large */}
                      <div className="text-center mb-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
                        <p className={`text-4xl font-bold ${isBlue ? 'text-blue-600' : 'text-violet-600'}`}>
                          {data.total}
                        </p>
                      </div>

                      {/* Mini Stats with Icons */}
                      <div className="space-y-2 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                              <Sunrise className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-600">Morning</span>
                          </div>
                          <span className="font-semibold text-gray-900">{data.morning}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                              <Sun className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="text-gray-600">Afternoon</span>
                          </div>
                          <span className="font-semibold text-gray-900">{data.afternoon}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                              <Moon className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-gray-600">Night</span>
                          </div>
                          <span className="font-semibold text-gray-900">{data.night}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer with Legend */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Total Shifts</p>
                      <p className="text-lg font-bold text-gray-900">{getTotalYearShifts()}</p>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-gray-300"></div>

                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-violet-600" />
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedDepartment === 'all' ? 'All' : selectedDepartment.charAt(0).toUpperCase() + selectedDepartment.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6">
                  {/* Intensity Legend */}
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="font-medium">Intensity:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-100"></div>
                      <div className="w-2 h-2 rounded-full bg-red-100"></div>
                      <div className="w-2 h-2 rounded-full bg-red-100"></div>
                      <span className="ml-1">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-red-100"></div>
                      <span className="ml-1">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="ml-1">High</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AssignShiftModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />
      <ShiftHistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} />
      <AutoScheduleModal isOpen={isAutoScheduleModalOpen} onClose={() => setIsAutoScheduleModalOpen(false)} />
      {isEditModalOpen && selectedShift && <EditShiftModal shift={selectedShift} onClose={() => setIsEditModalOpen(false)} />}
      {isViewModalOpen && selectedShift && <ViewShiftModal shift={selectedShift} onClose={() => setIsViewModalOpen(false)} />}

      <AlertDialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Shift?</AlertDialogTitle>
            <AlertDialogDescription>This will suspend the shift assignment for {selectedShift?.employeeName}. The shift status will be changed to &quot;Suspended&quot;.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivateConfirm} className="bg-orange-600 hover:bg-orange-700">Deactivate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Edit Shift Modal
function EditShiftModal({ shift, onClose }: any) {
  const [formData, setFormData] = useState({
    employeeName: shift.employeeName || '', department: shift.department || '', shiftType: shift.shiftType || '',
    shiftPattern: shift.shiftPattern || '', startDate: shift.startDate || '', endDate: shift.endDate || '',
    startTime: shift.startTime || '', endTime: shift.endTime || '', status: shift.status || ''
  })

  const handleSubmit = (e: any) => { e.preventDefault(); console.log('Updated:', formData); onClose() }
  const updateField = (field: string, value: string) => setFormData({ ...formData, [field]: value })

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col">
        <DialogHeader><DialogTitle>Edit Shift</DialogTitle><DialogDescription>Update shift details for the employee</DialogDescription></DialogHeader>
        <div className="flex-1 overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <form onSubmit={handleSubmit} className="space-y-5 px-1">
            <div className="space-y-2"><Label htmlFor="employeeName">Employee Name</Label><Input id="employeeName" value={formData.employeeName} onChange={(e) => updateField('employeeName', e.target.value)} placeholder="Enter employee name" /></div>
            
            {[
              { id: 'department', label: 'Department', options: ['Sales', 'Marketing', 'IT', 'HR', 'Finance'] },
              { id: 'shiftType', label: 'Shift Type', options: ['Morning', 'Afternoon', 'Night', 'Custom Shift Hours'] },
              { id: 'shiftPattern', label: 'Shift Pattern', options: ['Single Day', 'Date Range', 'Recurring'] },
              { id: 'status', label: 'Status', options: ['Assigned', 'Confirmed', 'Pending', 'Cancelled', 'Suspended'] }
            ].map(field => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Select value={formData[field.id as keyof typeof formData]} onValueChange={(value) => updateField(field.id, value)}>
                  <SelectTrigger><SelectValue placeholder={`Select ${field.label}`} /></SelectTrigger>
                  <SelectContent>{field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {[{ id: 'startDate', label: 'Start Date', type: 'date' }, { id: 'endDate', label: 'End Date', type: 'date' }].map(field => (
                <div key={field.id} className="space-y-2"><Label htmlFor={field.id}>{field.label}</Label><Input id={field.id} type={field.type} value={formData[field.id as keyof typeof formData]} onChange={(e) => updateField(field.id, e.target.value)} /></div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[{ id: 'startTime', label: 'Start Time', type: 'time' }, { id: 'endTime', label: 'End Time', type: 'time' }].map(field => (
                <div key={field.id} className="space-y-2"><Label htmlFor={field.id}>{field.label}</Label><Input id={field.id} type={field.type} value={formData[field.id as keyof typeof formData]} onChange={(e) => updateField(field.id, e.target.value)} /></div>
              ))}
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}><Check className="w-4 h-4 mr-2" />Update Shift</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// View Shift Modal
function ViewShiftModal({ shift, onClose }: any) {
  const getStatusColor = (color: string) => {
    const colors: any = {
      green: 'bg-green-100 text-green-800 hover:bg-green-100', yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      red: 'bg-red-100 text-red-800 hover:bg-red-100', blue: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      gray: 'bg-gray-100 text-gray-800 hover:bg-gray-100', orange: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-100'
    }
    return colors[color] || colors.green
  }

  const InfoSection = ({ title, icon: Icon, bgColor, items }: any) => (
    <div className={`${bgColor} rounded-lg p-5`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2"><Icon className="w-5 h-5" />{title}</h3>
      <div className="space-y-3">{items.map((item: any, i: number) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{item.label}:</span>
          {item.badge ? <Badge className={item.color}>{item.value}</Badge> : <span className="text-sm font-medium text-gray-900">{item.value}</span>}
        </div>
      ))}</div>
    </div>
  )

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle>Shift Details</DialogTitle><DialogDescription>Complete information about the shift</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-6 space-y-6 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <InfoSection title="Employee Information" icon={User} bgColor="bg-gray-50" items={[
            { label: 'Name', value: shift.employeeName },
            { label: 'Department', value: shift.department }
          ]} />

          <InfoSection title="Shift Information" icon={Clock} bgColor="bg-blue-50" items={[
            { label: 'Shift Type', value: shift.shiftType, badge: true, color: getStatusColor(shift.shiftColor) },
            { label: 'Shift Pattern', value: shift.shiftPattern },
            ...(shift.recurringPattern ? [{ label: 'Recurring Pattern', value: shift.recurringPattern }] : []),
            { label: 'Start Date', value: shift.startDateDisplay },
            { label: 'End Date', value: shift.endDateDisplay },
            { label: 'Start Time', value: shift.startTime },
            { label: 'End Time', value: shift.endTime }
          ]} />

          <InfoSection title="Status Information" icon={CheckCircle} bgColor="bg-green-50" items={[
            { label: 'Current Status', value: shift.status, badge: true, color: getStatusColor(shift.statusColor) },
            { label: 'Created At', value: 'Dec 10, 2024' },
            { label: 'Last Updated', value: 'Dec 12, 2024' }
          ]} />

          <div className="bg-yellow-50 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"><MessageSquare className="w-5 h-5" />Notes</h3>
            <p className="text-sm text-gray-600">No additional notes for this shift.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button><Edit className="w-4 h-4 mr-2" />Edit Shift</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
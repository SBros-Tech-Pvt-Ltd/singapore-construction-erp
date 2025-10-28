"use client";

import React, { useState } from 'react';
import { Upload, Download, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ImportTemplateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateType: 'leave' | 'designation' | 'department' | 'shift' | 'policy' | 'attendance';
  onImport: (data: any[]) => void;
}

interface ColumnMapping {
  templateColumn: string;
  systemColumn: string;
  required: boolean;
}

export const ImportTemplate: React.FC<ImportTemplateProps> = ({
  open,
  onOpenChange,
  templateType,
  onImport
}) => {
  const [step, setStep] = useState<'download' | 'upload' | 'mapping' | 'review'>('download');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping[]>([]);
  const [importData, setImportData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const templateConfigs = {
  leave: {
    title: 'Leave Types',
    description: 'Import leave type configurations',
    downloadUrl: '/templates/leave-types-template.csv',
    requiredColumns: ['leaveType', 'leaveCode', 'annualQuota', 'carryForward', 'encashable', 'requiresApproval', 'maxConsecutive', 'status', 'branches'],
    columns: [
      { name: 'leaveType', label: 'Leave Type', required: true, description: 'e.g., Casual Leave, Sick Leave' },
      { name: 'leaveCode', label: 'Leave Code', required: true, description: '2-3 character code e.g., CL, SL' },
      { name: 'annualQuota', label: 'Annual Quota', required: true, description: 'Number of days per year' },
      { name: 'carryForward', label: 'Carry Forward', required: true, description: 'Yes/No or true/false' },
      { name: 'encashable', label: 'Encashable', required: true, description: 'Yes/No or true/false' },
      { name: 'requiresApproval', label: 'Requires Approval', required: true, description: 'Yes/No or true/false' },
      { name: 'maxConsecutive', label: 'Max Consecutive Days', required: true, description: 'Maximum days allowed in one application' },
      { name: 'status', label: 'Status', required: true, description: 'Active/Inactive or true/false' },
      { name: 'branches', label: 'Branches', required: true, description: 'Comma-separated branch names' }
    ]
  },
  designation: {
    title: 'Designations',
    description: 'Import designation master data',
    downloadUrl: '/templates/designations-template.csv',
    requiredColumns: ['title', 'department', 'level', 'reportingTo', 'status'],
    columns: [
      { name: 'title', label: 'Designation Title', required: true, description: 'e.g., Senior Software Engineer' },
      { name: 'department', label: 'Department', required: true, description: 'Department name' },
      { name: 'level', label: 'Level', required: true, description: 'Junior, Mid, or Senior' },
      { name: 'reportingTo', label: 'Reporting To', required: true, description: 'Reporting manager designation' },
      { name: 'status', label: 'Status', required: true, description: 'Active/Inactive or true/false' }
    ]
  },
  department: {
    title: 'Departments',
    description: 'Import department master data',
    downloadUrl: '/templates/departments-template.csv',
    requiredColumns: ['name', 'code', 'hod', 'status', 'branches'],
    columns: [
      { name: 'name', label: 'Department Name', required: true, description: 'e.g., Human Resources' },
      { name: 'code', label: 'Department Code', required: true, description: 'Unique department code' },
      { name: 'hod', label: 'Head of Department', required: true, description: 'HOD name' },
      { name: 'status', label: 'Status', required: true, description: 'Active/Inactive or true/false' },
      { name: 'branches', label: 'Branches', required: true, description: 'Comma-separated branch names' }
    ]
  },
  shift: {
    title: 'Shifts',
    description: 'Import shift configurations',
    downloadUrl: '/templates/shifts-template.csv',
    requiredColumns: ['name', 'startTime', 'endTime', 'type', 'gracePeriod', 'breakDuration', 'branches', 'status'],
    columns: [
      { name: 'name', label: 'Shift Name', required: true, description: 'e.g., Day Shift, Night Shift' },
      { name: 'startTime', label: 'Start Time', required: true, description: 'HH:MM format' },
      { name: 'endTime', label: 'End Time', required: true, description: 'HH:MM format' },
      { name: 'type', label: 'Shift Type', required: true, description: 'Fixed or Rotational' },
      { name: 'gracePeriod', label: 'Grace Period', required: true, description: 'Minutes' },
      { name: 'breakDuration', label: 'Break Duration', required: true, description: 'Minutes' },
      { name: 'branches', label: 'Branches', required: true, description: 'Comma-separated branch names' },
      { name: 'status', label: 'Status', required: true, description: 'Active/Inactive or true/false' }
    ]
  },
  policy: {
    title: 'Company Policies',
    description: 'Import company policy documents',
    downloadUrl: '/templates/policies-template.csv',
    requiredColumns: ['policyName', 'category', 'document', 'version', 'effectiveDate', 'mandatoryRead', 'status'],
    columns: [
      { name: 'policyName', label: 'Policy Name', required: true, description: 'e.g., Code of Conduct' },
      { name: 'category', label: 'Category', required: true, description: 'HR, Finance, Operations, etc.' },
      { name: 'document', label: 'Document Name', required: true, description: 'File name with extension' },
      { name: 'version', label: 'Version', required: true, description: 'e.g., v1.0, v2.0' },
      { name: 'effectiveDate', label: 'Effective Date', required: true, description: 'YYYY-MM-DD format' },
      { name: 'mandatoryRead', label: 'Mandatory Read', required: true, description: 'Yes/No or true/false' },
      { name: 'status', label: 'Status', required: true, description: 'Published/Draft' }
    ]
  },
  attendance: {
    title: 'Attendance Rules',
    description: 'Import attendance rule configurations',
    downloadUrl: '/templates/attendance-rules-template.csv',
    requiredColumns: ['ruleName', 'gracePeriod', 'halfDayHours', 'lateMarkCount', 'holidayRule', 'overtimeRule', 'status'],
    columns: [
      { name: 'ruleName', label: 'Rule Name', required: true, description: 'e.g., Standard Rule' },
      { name: 'gracePeriod', label: 'Grace Period', required: true, description: 'Minutes' },
      { name: 'halfDayHours', label: 'Half Day Hours', required: true, description: 'Hours after which marked as half day' },
      { name: 'lateMarkCount', label: 'Late Mark Count', required: true, description: 'Number of lates = 1 absence' },
      { name: 'holidayRule', label: 'Holiday Rule', required: true, description: 'Yes/No or true/false' },
      { name: 'overtimeRule', label: 'Overtime Rule', required: true, description: 'Overtime calculation method' },
      { name: 'status', label: 'Status', required: true, description: 'Active/Inactive or true/false' }
    ]
  }
};

  const config = templateConfigs[templateType];

  const handleDownloadTemplate = () => {
  console.log('Download button clicked for:', templateType);
  
  try {
   
    const headers = config.columns.map(col => col.label).join(',');
    const exampleRow = config.columns.map(col => {
     
      switch (col.name) {
        
        case 'leaveType': return 'Casual Leave';
        case 'leaveCode': return 'CL';
        case 'annualQuota': return '12';
        case 'carryForward': return 'Yes';
        case 'encashable': return 'No';
        case 'requiresApproval': return 'Yes';
        case 'maxConsecutive': return '3';
        
       
        case 'title': return 'Software Engineer';
        case 'department': return 'IT';
        case 'level': return 'Mid';
        case 'reportingTo': return 'Technical Lead';
        
       
        case 'name': return 'Human Resources';
        case 'code': return 'HR01';
        case 'hod': return 'John Smith';
        
        
        case 'startTime': return '09:00';
        case 'endTime': return '18:00';
        case 'type': return 'Fixed';
        case 'gracePeriod': return '15';
        case 'breakDuration': return '60';
        
        
        case 'policyName': return 'Code of Conduct';
        case 'category': return 'HR';
        case 'document': return 'code_of_conduct.pdf';
        case 'version': return 'v1.0';
        case 'effectiveDate': return '2024-01-01';
        case 'mandatoryRead': return 'Yes';
        
       
        case 'ruleName': return 'Standard Rule';
        case 'halfDayHours': return '4';
        case 'lateMarkCount': return '3';
        case 'holidayRule': return 'Yes';
        case 'overtimeRule': return 'Standard 1.5x rate after 8 hours';
        
       
        case 'status': return 'Active';
        case 'branches': return 'Head Office,Site A';
        default: return 'Example';
      }
    }).join(',');

      const csvContent = `${headers}\n${exampleRow}`;
    
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateType}-template.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('Download completed successfully');
      setStep('upload');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsProcessing(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            processFile(file);
            return 100;
          }
          return prev + 20;
        });
      }, 200);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const mockData = [
        { leaveType: 'Casual Leave', leaveCode: 'CL', annualQuota: '12', status: 'Active' },
        { leaveType: 'Sick Leave', leaveCode: 'SL', annualQuota: '10', status: 'Active' }
      ];
      setImportData(mockData);
      setStep('review');
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    onImport(importData);
    handleClose();
  };

  const handleClose = () => {
    setStep('download');
    setSelectedFile(null);
    setMapping([]);
    setImportData([]);
    setProgress(0);
    onOpenChange(false);
  };

  const renderStep = () => {
    console.log('Current step:', step); 
    
    switch (step) {
      case 'download':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Download Template</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Download the CSV template file and fill in your {config.title.toLowerCase()} data.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Required Columns:</h4>
                <div className="space-y-2">
                  {config.columns.map((column, index) => (
                    <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{column.label}</span>
                          {column.required && (
                            <Badge variant="outline" className="text-red-500 border-red-200 text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{column.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Button onClick={handleDownloadTemplate} className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Upload Filled Template</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Upload your filled CSV template file.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"/>
              <label
                htmlFor="file-upload"
                className="cursor-pointer block">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">CSV files only</p>
              </label>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing file...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            <Button 
              variant="outline" 
              onClick={() => setStep('download')}
              className="w-full">
              Back to Download
            </Button>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Review Import Data</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Review the data before importing ({importData.length} records found).
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800">
                      <tr>
                        {Object.keys(importData[0] || {}).map((key, index) => (
                          <th key={index} className="text-left p-2 border-b font-medium">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {importData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((value: any, colIndex) => (
                            <td key={colIndex} className="p-2 border-b">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('upload')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleImport} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import {config.title}
          </DialogTitle>
          <DialogDescription>
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
         
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              {['download', 'upload', 'review'].map((stepName, index) => (
                <React.Fragment key={stepName}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step === stepName 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : ['download', 'upload', 'review'].indexOf(step) > index 
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500'
                  }`}>
                    {['download', 'upload', 'review'].indexOf(step) > index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`w-16 h-1 mx-2 ${
                      ['download', 'upload', 'review'].indexOf(step) > index 
                        ? 'bg-green-500' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
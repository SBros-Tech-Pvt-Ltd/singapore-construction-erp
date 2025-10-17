'use client'

import { useState, useRef } from 'react'
import { X, Upload, AlertCircle, Send, Image as ImageIcon, File } from 'lucide-react'

interface TicketRaiseModalProps {
  show: boolean
  onClose: () => void
  preSelectedType?: string
}

export default function TicketRaiseModal({ show, onClose, preSelectedType = '' }: TicketRaiseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    type: preSelectedType,
    priority: 'medium',
    subject: '',
    description: '',
    attachments: [] as File[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ticketTypes = [
    { id: 'technical', label: 'Technical Issue', icon: '🔧' },
    { id: 'billing', label: 'Billing Support', icon: '💳' },
    { id: 'account', label: 'Account Assistance', icon: '👤' },
    { id: 'feature', label: 'Feature Request', icon: '💡' },
    { id: 'security', label: 'Security Concern', icon: '🔒' },
    { id: 'general', label: 'General Inquiry', icon: '💬' }
  ]

  const priorities = [
    { id: 'low', label: 'Low', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { id: 'medium', label: 'Medium', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { id: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
    { id: 'urgent', label: 'Urgent', color: 'bg-purple-100 text-purple-700 border-purple-300' }
  ]

  const branches = [
    'Head Office',
    'North Branch',
    'South Branch',
    'East Branch',
    'West Branch',
    'Central Branch',
    'Downtown Branch',
    'Suburban Branch',
    'Regional Office',
    'Other'
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const totalFiles = formData.attachments.length + newFiles.length

      if (totalFiles > 5) {
        alert('Maximum 5 files allowed')
        return
      }

      // Check file sizes
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        alert('Some files exceed 10MB limit')
        return
      }

      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Ticket submitted:', formData)

      // Reset form
      setFormData({
        name: '',
        branch: '',
        type: '',
        priority: 'medium',
        subject: '',
        description: '',
        attachments: []
      })

      setIsSubmitting(false)
      onClose()

      // Show success message (replace with toast notification)
      alert('✅ Ticket created successfully! We\'ll get back to you soon.')

    } catch (error) {
      console.error('Error submitting ticket:', error)
      alert('❌ Failed to create ticket. Please try again.')
      setIsSubmitting(false)
    }
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <ImageIcon size={16} className="text-blue-500" />
    }
    return <File size={16} className="text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[90vh]">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Support Ticket</h2>
            <p className="text-sm text-gray-600">We typically respond within 2 hours. Fill out the form below.</p>
          </div>

          {/* Name and Branch Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Branch Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.branch}
                onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ticket Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Issue Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ticketTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${formData.type === type.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority - Simple Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority Level <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="low">Low - Response within 24 hours</option>
              <option value="medium">Medium - Response within 8 hours</option>
              <option value="high">High - Response within 2 hours</option>
              <option value="urgent">Urgent - Response within 30 minutes</option>
            </select>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please provide detailed information about your issue..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Include any error messages, steps to reproduce, or relevant details
            </p>
          </div>

          {/* File Attachments */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attachments (Optional)
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Click to upload files
              </button>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, PDF, DOC up to 10MB (Max 5 files)
              </p>
            </div>

            {/* Attached Files */}
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Attached Files ({formData.attachments.length}/5)
                </p>
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-gray-500">{getFileIcon(file.name)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Response Time Expectations:</p>
                <ul className="text-xs space-y-1 text-blue-800">
                  <li>• <strong>Urgent:</strong> Within 30 minutes</li>
                  <li>• <strong>High:</strong> Within 2 hours</li>
                  <li>• <strong>Medium:</strong> Within 8 hours</li>
                  <li>• <strong>Low:</strong> Within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.branch || !formData.type || !formData.subject || !formData.description}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
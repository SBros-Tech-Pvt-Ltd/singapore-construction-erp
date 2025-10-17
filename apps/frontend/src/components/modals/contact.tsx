// components/modals/contact.tsx
'use client'

import { X, Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'

interface ContactModalProps {
  showContactModal: boolean
  setShowContactModal: (show: boolean) => void
}

export default function ContactModal({ showContactModal, setShowContactModal }: ContactModalProps) {
  // Gmail Portal Open Function
  const handleEmailClick = () => {
    const email = 'jenijini001@gmail.com' // Super Admin Email
    const subject = 'Support Request - Customer Inquiry'
    const body = `Hello Support Team,

I need assistance with:

[Please describe your issue here]

Customer Details:
- Name: [Your Name]
- Account ID: [Your Account ID]
- Date: ${new Date().toLocaleDateString()}

Thank you!`
    
    // Open Gmail Compose in new tab
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    window.open(gmailURL, '_blank')
  }

  if (!showContactModal) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Contact Us</h2>
          </div>
          <button
            onClick={() => setShowContactModal(false)}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Contact Methods */}
          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-5 hover:border-orange-300 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Phone className="text-orange-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                  <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                </div>
                <a
                  href="tel:+15551234567"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>

            <div className="border-2 border-green-300 bg-green-50 rounded-lg p-5 hover:border-green-400 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Mail className="text-green-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    Email Support 
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Gmail</span>
                  </h3>
                  <p className="text-gray-600 mb-1">superadmin@yourcompany.com</p>
                  <p className="text-sm text-gray-500">24/7 - Response within 2 hours</p>
                  <p className="text-xs text-green-700 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Opens Gmail Compose Window
                  </p>
                </div>
                <button
                  onClick={handleEmailClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  Email Us
                </button>
              </div>
            </div>

          </div>

          {/* Office Location */}
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <div className="flex items-start space-x-4">
              <MapPin className="text-gray-600 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Office Address</h3>
                <p className="text-gray-600">123 Business Street</p>
                <p className="text-gray-600">San Francisco, CA 94102</p>
                <p className="text-gray-600">United States</p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-start space-x-4">
              <Clock className="text-blue-600 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3">Business Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Monday - Friday:</div>
                  <div className="text-gray-900 font-medium">9:30 AM - 6:00 PM</div>
                  <div className="text-gray-600">Saturday:</div>
                  <div className="text-gray-900 font-medium">9:30 AM - 1:30 PM</div>
                  <div className="text-gray-600">Sunday:</div>
                  <div className="text-gray-900 font-medium">Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Follow us on social media</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
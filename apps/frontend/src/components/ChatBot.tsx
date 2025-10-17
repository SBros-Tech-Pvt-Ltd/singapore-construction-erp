//components/ChatBot.tsx
'use client'

import { useState, useCallback, useRef} from 'react'
import { 
  X, Send, MessageCircle, 
  CreditCard, Users, BarChart3, Ticket, Phone,
  ArrowLeft, ExternalLink, ChevronRight, List, RefreshCw
} from 'lucide-react'
import Link from 'next/link'
//import SupportModal from './modals/support'
import ContactModal from './modals/contact'
import TicketRaiseModal from './modals/ticket-raise-modal'

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  suggestions?: Question[];
  relatedQuestions?: Question[];
  showContactButton?: boolean;
  showTicketButton?: boolean;
  parentMessageId?: number;
  navigationLink?: string;
}

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: 'CreditCard' | 'Users' | 'BarChart3' | 'Ticket' | 'Phone';
  keywords: string[];
  score?: number;
  navigationLink?: string;
  openTicketModal?: boolean;
}

const iconMap = {
  CreditCard,
  Users,
  BarChart3,
  Ticket,
  Phone
} as const;

const allQuestions: Question[] = [
 
 
  
  // Account & Security Questions
  {
    id: 'account-1',
    question: 'How do I reset my password?',
    answer: 'Click on your profile icon → "Account Settings" → "Security" → "Change Password". You\'ll need to enter your current password and then your new password twice. For security, you\'ll be logged out of all devices.',
    category: 'account',
    icon: 'Users',
    keywords: ['reset', 'password', 'forgot', 'change', 'security', 'login'],
    navigationLink: '/settings#security'
  },
  {
    id: 'account-2',
    question: 'How do I enable two-factor authentication?',
    answer: 'Go to "Account Settings" → "Security" → "Two-Factor Authentication" → "Enable". Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.) and enter the verification code.',
    category: 'account',
    icon: 'Users',
    keywords: ['two-factor', '2fa', 'authentication', 'security', 'mfa', 'multi-factor'],
    navigationLink: '/settings#2fa'
  },
  {
    id: 'account-3',
    question: 'How do I update my profile information?',
    answer: 'Navigate to "Account Settings" → "Profile". Here you can update your name, email, phone number, company information, and profile picture. Click "Save Changes" when done.',
    category: 'account',
    icon: 'Users',
    keywords: ['update', 'profile', 'edit', 'personal', 'information', 'details'],
    navigationLink: '/settings#profile'
  },
  {
    id: 'account-4',
    question: 'Is my data secure?',
    answer: 'Yes! We use enterprise-grade security: 256-bit SSL encryption, SOC 2 Type II certified, GDPR compliant, regular security audits, and data backups every 6 hours across multiple geographic locations.',
    category: 'account',
    icon: 'Users',
    keywords: ['secure', 'security', 'data', 'privacy', 'encryption', 'safe'],
    navigationLink: '/security'
  },
  {
    id: 'account-5',
    question: 'How do I manage notification preferences?',
    answer: 'Go to "Account Settings" → "Notifications". You can customize email, SMS, and in-app notifications for different events like billing updates, security alerts, and system notifications.',
    category: 'account',
    icon: 'Users',
    keywords: ['notification', 'preferences', 'email', 'alerts', 'settings', 'manage'],
    navigationLink: '/settings#notifications'
  },
  {
    id: 'account-6',
    question: 'Can I delete my account?',
    answer: 'Yes, go to "Account Settings" → "Security" → "Delete Account". Note that this is permanent and all your data will be deleted after 30 days. You\'ll receive a confirmation email before deletion.',
    category: 'account',
    icon: 'Users',
    keywords: ['delete', 'account', 'remove', 'close', 'terminate', 'deactivate'],
    navigationLink: '/settings#security'
  },
  
  // Reports & Analytics Questions
  {
    id: 'analytics-1',
    question: 'How do I view my usage statistics?',
    answer: 'Visit "Reports & Analytics" → "Usage Dashboard". Here you can see your data usage, API calls, storage consumption, and active sessions. Select date ranges for detailed analysis.',
    category: 'analytics',
    icon: 'BarChart3',
    keywords: ['usage', 'statistics', 'view', 'dashboard', 'analytics', 'metrics'],
    navigationLink: '/reports-analytics#usage'
  },
  {
    id: 'analytics-2',
    question: 'How do I generate usage reports?',
    answer: 'Visit "Reports & Analytics" → "My Reports". Select the date range and metrics you want to include. Click "Generate Report" to create and download the report in your preferred format.',
    category: 'analytics',
    icon: 'BarChart3',
    keywords: ['generate', 'usage', 'report', 'create', 'analytics', 'download'],
    navigationLink: '/reports-analytics#reports'
  },
  {
    id: 'analytics-3',
    question: 'Can I export my data?',
    answer: 'Yes! Reports can be exported in multiple formats: PDF, Excel, CSV, or JSON. After generating a report, click the "Export" button and select your preferred format.',
    category: 'analytics',
    icon: 'BarChart3',
    keywords: ['export', 'download', 'data', 'pdf', 'excel', 'csv'],
    navigationLink: '/reports-analytics'
  },
  {
    id: 'analytics-4',
    question: 'How do I view my activity history?',
    answer: 'Go to "Reports & Analytics" → "Activity History". You can see all your account activities including logins, changes made, and feature usage. Filter by date range and activity type.',
    category: 'analytics',
    icon: 'BarChart3',
    keywords: ['activity', 'history', 'log', 'track', 'audit', 'timeline'],
    navigationLink: '/reports-analytics#activity'
  },
  {
    id: 'analytics-5',
    question: 'What metrics can I track?',
    answer: 'You can track: login frequency, data usage, API calls, storage consumption, feature usage, session duration, and performance metrics. All metrics are available in your analytics dashboard.',
    category: 'analytics',
    icon: 'BarChart3',
    keywords: ['metrics', 'track', 'measure', 'kpi', 'statistics', 'available'],
    navigationLink: '/reports-analytics#metrics'
  },
  {
    id: 'analytics-6',
    question: 'Can I set up usage alerts?',
    answer: 'Yes! Go to "Reports & Analytics" → "Alerts". Set thresholds for data usage, storage, or API calls. You\'ll receive notifications when you approach or exceed these limits.',
    category: 'analytics',
    icon: 'BarChart3',
    keywords: ['alert', 'notification', 'threshold', 'limit', 'warning', 'usage'],
    navigationLink: '/reports-analytics#alerts'
  },

  // Ticket Support Questions (NEW - Replaces Support & Help)
  {
    id: 'ticket-1',
    question: 'How do I create a support ticket?',
    answer: 'Click the "Create Ticket" button below to open our ticket creation form. Select the issue type (Technical, Billing, Account, Feature Request, Security, or General), set priority level, and describe your issue in detail. You can also attach screenshots or files.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['create', 'ticket', 'raise', 'submit', 'new', 'support request'],
    openTicketModal: true
  },
  {
    id: 'ticket-2',
    question: 'What types of tickets can I create?',
    answer: 'You can create tickets for: 🔧 Technical Issues (bugs, errors), 💳 Billing Support (payments, invoices), 👤 Account Assistance (settings, access), 💡 Feature Requests (suggestions), 🔒 Security Concerns, and 💬 General Inquiries. Click "Create Ticket" below to get started.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['types', 'categories', 'ticket', 'kinds', 'options', 'what'],
    openTicketModal: true
  },
  {
    id: 'ticket-3',
    question: 'How long does it take to get a response?',
    answer: 'Response times vary by priority: ⚡ Urgent (30 minutes), 🔴 High (2 hours), 🟠 Medium (8 hours), 🔵 Low (24 hours). Set the appropriate priority when creating your ticket for faster response.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['response', 'time', 'how long', 'wait', 'reply', 'answer'],
    openTicketModal: true
  },
  {
    id: 'ticket-4',
    question: 'Can I attach files to my ticket?',
    answer: 'Yes! When creating a ticket, you can attach up to 5 files (screenshots, documents, logs) with a maximum size of 10MB each. Supported formats: PNG, JPG, PDF, DOC, DOCX, TXT. This helps our team understand and resolve your issue faster.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['attach', 'files', 'upload', 'screenshot', 'document', 'image'],
    openTicketModal: true
  },
  {
    id: 'ticket-5',
    question: 'How do I check my ticket status?',
    answer: 'You can view all your tickets and their current status in the Support section. Ticket statuses include: 🟡 Open (awaiting response), 🔵 In Progress (being worked on), and ✅ Resolved (completed). You\'ll receive email notifications for status updates.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['status', 'check', 'view', 'track', 'my tickets', 'history'],
    openTicketModal: true
  },
  {
    id: 'ticket-6',
    question: 'What information should I include in my ticket?',
    answer: 'For faster resolution, include: 1) Clear subject line, 2) Detailed description of the issue, 3) Steps to reproduce (if applicable), 4) Error messages (if any), 5) Screenshots or files, 6) Browser/device information. Click "Create Ticket" to use our guided form.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['information', 'include', 'details', 'what to write', 'describe', 'best practices'],
    openTicketModal: true
  }
];

// Category cards for quick navigation
const categoryCards = [
  
  {
    id: 'account',
    title: 'Account & Security',
    description: 'Profile settings, password, and security options',
    icon: 'Users',
    color: 'from-purple-500 to-purple-400',
    questions: allQuestions.filter(q => q.category === 'account')
  },
  {
    id: 'analytics',
    title: 'Reports & Analytics',
    description: 'View your usage, statistics, and reports',
    icon: 'BarChart3',
    color: 'from-green-500 to-green-400',
    questions: allQuestions.filter(q => q.category === 'analytics')
  },
  {
    id: 'ticket',
    title: 'Ticket Support',
    description: 'Create and manage support tickets',
    icon: 'Ticket',
    color: 'from-pink-500 to-pink-400',
    questions: allQuestions.filter(q => q.category === 'ticket')
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Ticket
  }

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = categoryCards.find(c => c.id === categoryId)
    
    if (category) {
      const welcomeMessage: Message = {
        id: 1,
        text: 'Hello! 👋 I\'m your Support Assistant. How can I help you today?',
        sender: 'bot',
        suggestions: category.questions,
      }
      
      setMessages([welcomeMessage])
    }
  }, [])

  const handleQuestionSelect = useCallback((question: Question) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: question.question,
      sender: 'user',
    }

    const relatedQuestions = allQuestions
      .filter(q => q.category === question.category && q.id !== question.id)
      .slice(0, 3)

    const botResponse: Message = {
      id: messages.length + 2,
      text: question.answer,
      sender: 'bot',
      relatedQuestions: relatedQuestions,
      navigationLink: question.navigationLink,
      showTicketButton: question.openTicketModal || false,
    }

    setMessages(prev => [...prev, userMessage, botResponse])
  }, [messages.length])

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null)
    setMessages([])
  }, [])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
      }
      
      setMessages(prev => [...prev, userMessage])
      setInputMessage('')

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: 'Thank you for your message! Here are some topics that might help:',
          sender: 'bot',
          showContactButton: true,
        }
        setMessages(prev => [...prev, botResponse])
      }, 800)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <MessageCircle size={28} className="relative z-10" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Let&apos;s Chat! 💬
              <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window with Slide-in Animation */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl transition-all duration-500 z-50 h-[650px] w-[420px] animate-slideIn"
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            </div>

            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users size={20} className="text-white animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Support Assistant</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  Online - We&apos;re here to help!
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 relative z-10">
              {selectedCategory && (
                <button
                  onClick={handleBackToCategories}
                  className="hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  <span className="text-xs">Topics</span>
                </button>
              )}
              <button
                onClick={handleBackToCategories}
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:rotate-180"
                title="Refresh chat"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <>
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-160px)] bg-gradient-to-b from-gray-50 to-white">
              {/* Category Cards - Show on Initial Message */}
              {messages.length === 0 && !selectedCategory && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <List size={20} className="text-blue-600" />
                    <span className="font-semibold">Choose Category</span>
                  </div>
                  {categoryCards.map((category, index) => {
                    const Icon = getIconComponent(category.icon)
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full group hover:scale-105 transition-all duration-300 mt-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`bg-gradient-to-r ${category.color} p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform`}>
                          <div className="flex items-start space-x-3">
                            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                              <Icon size={24} className="text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-semibold text-white text-base mb-1">{category.title}</h4>
                              <p className="text-xs text-white/80">{category.description}</p>
                            </div>
                            <ChevronRight size={20} className="text-white/100 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    } animate-messageSlide`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full max-w-[85%]">
                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-md ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto'
                            : 'bg-white text-gray-800 border border-gray-100'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>

                      {/* Create Ticket Button */}
                      {message.showTicketButton && (
                        <button
                          onClick={() => setShowTicketModal(true)}
                          className="mt-3 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <Ticket size={16} />
                          Create Ticket
                        </button>
                      )}

                      {/* Navigation Link */}
                      {message.navigationLink && (
                        <Link
                          href={message.navigationLink}
                          className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm transition-all duration-300 hover:scale-105 group"
                        >
                          <ExternalLink size={14} className="group-hover:rotate-12 transition-transform duration-300" />
                          Go to Page
                        </Link>
                      )}

                      {/* Question Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((q, qIndex) => {
                            const Icon = getIconComponent(q.icon)
                            return (
                              <button
                                key={q.id}
                                onClick={() => handleQuestionSelect(q)}
                                className="w-full text-left p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-md animate-fadeIn"
                                style={{ animationDelay: `${qIndex * 50}ms` }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={16} className="text-blue-600" />
                                  </div>
                                  <span className="text-sm text-gray-700 flex-1">{q.question}</span>
                                  <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {/* Related Questions */}
                      {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-gray-500 font-medium mb-2">📚 Related Questions:</p>
                          {message.relatedQuestions.map((q) => (
                            <button
                              key={q.id}
                              onClick={() => handleQuestionSelect(q)}
                              className="w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs text-gray-700 transition-all duration-300 hover:scale-105 border border-blue-100 hover:border-blue-200"
                            >
                              {q.question}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Contact Button */}
                      {message.showContactButton && (
                        <button
                          onClick={() => setShowContactModal(true)}
                          className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          💬 Contact Support Team
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-300"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
               
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 hover:scale-105 duration-300"
                >
                  <Phone size={14} />
                  Contact Us
                </button>
              </div>
            </div>
          </>
        </div>
      )}

      {/* Modals */}
     
      <TicketRaiseModal 
        show={showTicketModal}
        onClose={() => setShowTicketModal(false)}
      />
      
      <ContactModal 
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
      />

      {/* Add Custom Animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-messageSlide {
          animation: messageSlide 0.3s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  )
}
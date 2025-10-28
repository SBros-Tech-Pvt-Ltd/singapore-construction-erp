//components/ChatBot.tsx
'use client'

import { useState, useCallback, useRef } from 'react'
import { 
  X, Send, MessageCircle, 
  CreditCard, Users, BarChart3, Ticket, Phone,
  ArrowLeft, ExternalLink, ChevronRight, List, RefreshCw, CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import ContactModal from './modal/contact'
import Style from 'styled-jsx/style'

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
  ticketForm?: boolean;
  isTicketResponse?: boolean;
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

interface TicketData {
  issueType: string;
  priority: string;
  subject: string;
  description: string;
  email: string;
}

const iconMap = {
  CreditCard,
  Users,
  BarChart3,
  Ticket,
  Phone
} as const;

const allQuestions: Question[] = [
  // Subscription & Billing Questions (NEW)
  {
    id: 'billing-1',
    question: 'What subscription plans do you offer?',
    answer: 'We offer three plans: \n\n💎 **Basic** ($29/month) - Perfect for individuals\n• 10 users\n• 100GB storage\n• Email support\n\n🚀 **Pro** ($79/month) - Best for growing teams\n• 50 users\n• 500GB storage\n• Priority support\n• Advanced analytics\n\n⭐ **Enterprise** (Custom pricing) - For large organizations\n• Unlimited users\n• Unlimited storage\n• 24/7 dedicated support\n• Custom integrations',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['plans', 'subscription', 'pricing', 'packages', 'cost', 'price'],
    navigationLink: '/billing#plans'
  },
  {
    id: 'billing-2',
    question: 'How do I upgrade my subscription?',
    answer: 'To upgrade your plan:\n1. Go to "Billing & Subscription" → "My Plan"\n2. Click "Upgrade Plan"\n3. Select your desired plan\n4. Review changes and confirm\n5. The upgrade is instant! You\'ll only pay the prorated difference for the current billing period.',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['upgrade', 'change plan', 'better plan', 'switch', 'improve'],
    navigationLink: '/billing#upgrade'
  },
  {
    id: 'billing-3',
    question: 'What payment methods do you accept?',
    answer: 'We accept multiple payment methods:\n💳 Credit/Debit Cards (Visa, Mastercard, Amex)\n🏦 Bank Transfer (ACH)\n💰 PayPal\n🌐 Wire Transfer (for Enterprise plans)\n\nAll payments are processed securely through our PCI-compliant payment gateway.',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['payment', 'methods', 'pay', 'card', 'paypal', 'bank'],
    navigationLink: '/billing#payment-methods'
  },
  {
    id: 'billing-4',
    question: 'How do I update my payment method?',
    answer: 'To update your payment information:\n1. Navigate to "Billing & Subscription" → "Payment Methods"\n2. Click "Add Payment Method" or edit existing one\n3. Enter your new card/payment details\n4. Click "Save"\n5. Set it as default if needed\n\nYour next invoice will use the updated payment method.',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['update', 'payment', 'card', 'change', 'method', 'billing info'],
    navigationLink: '/billing#payment-methods'
  },
  {
    id: 'billing-5',
    question: 'Where can I view my invoices?',
    answer: 'Access all your invoices at "Billing & Subscription" → "Invoices". You can:\n• View all past invoices\n• Download as PDF\n• Print invoices\n• See payment status\n• Access transaction history\n\nInvoices are also automatically emailed to your registered email address.',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['invoice', 'receipt', 'billing history', 'download', 'view', 'past payments'],
    navigationLink: '/billing#invoices'
  },
  {
    id: 'billing-6',
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel anytime:\n1. Go to "Billing & Subscription" → "My Plan"\n2. Click "Cancel Subscription"\n3. Select cancellation reason (optional)\n4. Confirm cancellation\n\nYour account remains active until the end of your current billing period. No refunds for partial months, but you keep all features until expiration.',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['cancel', 'subscription', 'stop', 'terminate', 'end', 'refund'],
    navigationLink: '/billing#cancel'
  },
  {
    id: 'billing-7',
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes! Save 20% with annual billing:\n\n💎 Basic: $29/month → $278/year (save $70)\n🚀 Pro: $79/month → $758/year (save $190)\n⭐ Enterprise: Contact us for custom annual pricing\n\nSwitch to annual billing in "Billing & Subscription" → "My Plan" → "Change Billing Cycle"',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['discount', 'annual', 'yearly', 'save', 'offer', 'promotion'],
    navigationLink: '/billing#plans'
  },
  {
    id: 'billing-8',
    question: 'What happens if my payment fails?',
    answer: 'If a payment fails:\n1. You\'ll receive an immediate email notification\n2. We\'ll retry the payment after 3 days\n3. If still unsuccessful, retry after 7 days\n4. After 10 days of failed payment, your account is suspended\n5. After 30 days, your account may be permanently deleted\n\nUpdate your payment method immediately to avoid service interruption.',
    category: 'billing',
    icon: 'CreditCard',
    keywords: ['payment failed', 'declined', 'error', 'unsuccessful', 'suspended'],
    navigationLink: '/billing#payment-methods'
  },

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

  // Ticket Support Questions
  {
    id: 'ticket-1',
    question: 'How do I create a support ticket?',
    answer: 'I can help you create a support ticket right here! Click the "Create Ticket" button below, and I\'ll guide you through a few quick questions to submit your request.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['create', 'ticket', 'raise', 'submit', 'new', 'support request'],
    openTicketModal: true
  },
  {
    id: 'ticket-2',
    question: 'What types of tickets can I create?',
    answer: 'You can create tickets for:\n🔧 Technical Issues (bugs, errors)\n💳 Billing Support (payments, invoices)\n👤 Account Assistance (settings, access)\n💡 Feature Requests (suggestions)\n🔒 Security Concerns\n💬 General Inquiries\n\nClick "Create Ticket" below to get started!',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['types', 'categories', 'ticket', 'kinds', 'options', 'what'],
    openTicketModal: true
  },
  {
    id: 'ticket-3',
    question: 'How long does it take to get a response?',
    answer: 'Response times vary by priority:\n⚡ Urgent (30 minutes)\n🔴 High (2 hours)\n🟠 Medium (8 hours)\n🔵 Low (24 hours)\n\nSet the appropriate priority when creating your ticket for faster response.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['response', 'time', 'how long', 'wait', 'reply', 'answer'],
    openTicketModal: true
  },
  {
    id: 'ticket-4',
    question: 'Can I attach files to my ticket?',
    answer: 'Yes! When creating a ticket through this chat, you can describe your issue in detail. For file attachments (screenshots, documents, logs), our support team will provide you with a secure upload link via email after ticket submission.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['attach', 'files', 'upload', 'screenshot', 'document', 'image'],
    openTicketModal: true
  },
  {
    id: 'ticket-5',
    question: 'How do I check my ticket status?',
    answer: 'You can view all your tickets and their current status in the Support section. Ticket statuses include:\n🟡 Open (awaiting response)\n🔵 In Progress (being worked on)\n✅ Resolved (completed)\n\nYou\'ll receive email notifications for all status updates.',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['status', 'check', 'view', 'track', 'my tickets', 'history'],
    navigationLink: '/support#tickets'
  },
  {
    id: 'ticket-6',
    question: 'What information should I include in my ticket?',
    answer: 'For faster resolution, include:\n1. Clear subject line\n2. Detailed description of the issue\n3. Steps to reproduce (if applicable)\n4. Error messages (if any)\n5. Browser/device information\n\nDon\'t worry - I\'ll guide you through all of this when you create a ticket!',
    category: 'ticket',
    icon: 'Ticket',
    keywords: ['information', 'include', 'details', 'what to write', 'describe', 'best practices'],
    openTicketModal: true
  }
];

// Category cards for quick navigation
const categoryCards = [
  {
    id: 'billing',
    title: 'Subscription & Billing',
    description: 'Plans, payments, invoices, and billing',
    icon: 'CreditCard',
    color: 'from-yellow-500 to-yellow-400',
    questions: allQuestions.filter(q => q.category === 'billing')
  },
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

const ticketQuestions = [
  {
    id: 'issueType',
    question: 'What type of issue are you experiencing?',
    options: [
      { value: 'technical', label: '🔧 Technical Issue', description: 'Bugs, errors, or technical problems' },
      { value: 'billing', label: '💳 Billing Support', description: 'Payments, invoices, or subscriptions' },
      { value: 'account', label: '👤 Account Assistance', description: 'Settings, access, or account issues' },
      { value: 'feature', label: '💡 Feature Request', description: 'Suggestions or new features' },
      { value: 'security', label: '🔒 Security Concern', description: 'Security or privacy related' },
      { value: 'general', label: '💬 General Inquiry', description: 'Other questions or feedback' }
    ]
  },
  {
    id: 'priority',
    question: 'How urgent is this issue?',
    options: [
      { value: 'urgent', label: '⚡ Urgent', description: 'Critical - System down (30 min response)' },
      { value: 'high', label: '🔴 High', description: 'Major impact on work (2 hour response)' },
      { value: 'medium', label: '🟠 Medium', description: 'Some impact (8 hour response)' },
      { value: 'low', label: '🔵 Low', description: 'Minor issue (24 hour response)' }
    ]
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isCreatingTicket, setIsCreatingTicket] = useState(false)
  const [ticketStep, setTicketStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [ticketData, setTicketData] = useState<TicketData>({
    issueType: '',
    priority: '',
    subject: '',
    description: '',
    email: ''
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Ticket
  }

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = categoryCards.find(c => c.id === categoryId)
    
    if (category) {
      setIsTyping(true)
      scrollToBottom()
      
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: 1,
          text: 'Hello! 👋 I\'m your Support Assistant. How can I help you today?',
          sender: 'bot',
          suggestions: category.questions,
        }
        
        setMessages([welcomeMessage])
        setIsTyping(false)
        scrollToBottom()
      }, 1000)
    }
  }, [])

  const handleQuestionSelect = useCallback((question: Question) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: question.question,
      sender: 'user',
    }

    setMessages(prev => [...prev, userMessage])
    scrollToBottom()

    const relatedQuestions = allQuestions
      .filter(q => q.category === question.category && q.id !== question.id)
      .slice(0, 3)

    setIsTyping(true)
    scrollToBottom()

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: question.answer,
        sender: 'bot',
        relatedQuestions: relatedQuestions,
        navigationLink: question.navigationLink,
        showTicketButton: question.openTicketModal || false,
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      scrollToBottom()
    }, 1200)
  }, [messages.length])

  const startTicketCreation = useCallback(() => {
    setIsCreatingTicket(true)
    setTicketStep(0)
    setTicketData({
      issueType: '',
      priority: '',
      subject: '',
      description: '',
      email: ''
    })

    const ticketStartMessage: Message = {
      id: messages.length + 1,
      text: 'Great! I\'ll help you create a support ticket. Let me ask you a few questions to better understand your issue.',
      sender: 'bot',
    }

    setMessages(prev => [...prev, ticketStartMessage])
    scrollToBottom()

    setIsTyping(true)
    scrollToBottom()

    setTimeout(() => {
      const firstQuestion: Message = {
        id: messages.length + 2,
        text: ticketQuestions[0].question,
        sender: 'bot',
        ticketForm: true
      }

      setMessages(prev => [...prev, firstQuestion])
      setIsTyping(false)
      scrollToBottom()
    }, 1000)
  }, [messages.length])

  const handleTicketResponse = useCallback((field: string, value: string, label?: string) => {
    setTicketData(prev => ({ ...prev, [field]: value }))

    const userMessage: Message = {
      id: messages.length + 1,
      text: label || value,
      sender: 'user',
      isTicketResponse: true
    }

    setMessages(prev => [...prev, userMessage])
    scrollToBottom()

    // Move to next step
    const nextStep = ticketStep + 1

    setIsTyping(true)
    scrollToBottom()

    if (nextStep < ticketQuestions.length) {
      setTimeout(() => {
        const nextQuestion: Message = {
          id: messages.length + 2,
          text: ticketQuestions[nextStep].question,
          sender: 'bot',
          ticketForm: true
        }
        setMessages(prev => [...prev, nextQuestion])
        setTicketStep(nextStep)
        setIsTyping(false)
        scrollToBottom()
      }, 1000)
    } else {
      // Ask for subject
      setTimeout(() => {
        const subjectQuestion: Message = {
          id: messages.length + 2,
          text: 'Please provide a brief subject/title for your ticket:',
          sender: 'bot',
        }
        setMessages(prev => [...prev, subjectQuestion])
        setTicketStep(nextStep)
        setIsTyping(false)
        scrollToBottom()
      }, 1000)
    }
  }, [messages.length, ticketStep])

  const handleTicketTextInput = useCallback((text: string, field: 'subject' | 'description' | 'email') => {
    if (!text.trim()) return

    setTicketData(prev => ({ ...prev, [field]: text }))

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      isTicketResponse: true
    }

    setMessages(prev => [...prev, userMessage])
    scrollToBottom()

    setIsTyping(true)
    scrollToBottom()

    if (field === 'subject') {
      setTimeout(() => {
        const descQuestion: Message = {
          id: messages.length + 2,
          text: 'Please describe your issue in detail. Include any error messages, steps to reproduce, or other relevant information:',
          sender: 'bot',
        }
        setMessages(prev => [...prev, descQuestion])
        setTicketStep(prev => prev + 1)
        setIsTyping(false)
        scrollToBottom()
      }, 1000)
    } else if (field === 'description') {
      setTimeout(() => {
        const emailQuestion: Message = {
          id: messages.length + 2,
          text: 'Finally, please confirm your email address for ticket updates:',
          sender: 'bot',
        }
        setMessages(prev => [...prev, emailQuestion])
        setTicketStep(prev => prev + 1)
        setIsTyping(false)
        scrollToBottom()
      }, 1000)
    } else if (field === 'email') {
      setTimeout(() => {
        const summaryMessage: Message = {
          id: messages.length + 2,
          text: 'Perfect! Here\'s a summary of your ticket. Please review and submit:',
          sender: 'bot',
        }
        setMessages(prev => [...prev, summaryMessage])
        setTicketStep(prev => prev + 1)
        setIsTyping(false)
        scrollToBottom()
      }, 1000)
    }
  }, [messages.length])

  const submitTicket = useCallback(() => {
    setIsTyping(true)
    scrollToBottom()

    setTimeout(() => {
      const successMessage: Message = {
        id: messages.length + 1,
        text: `✅ Your support ticket has been successfully submitted!\n\n📧 Ticket ID: #TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}\n\nOur support team will review your request and respond to ${ticketData.email} based on the priority level you selected.\n\nYou can track your ticket status in the Support section.`,
        sender: 'bot',
        navigationLink: '/support#tickets'
      }

      setMessages(prev => [...prev, successMessage])
      setIsCreatingTicket(false)
      setTicketStep(0)
      setTicketData({
        issueType: '',
        priority: '',
        subject: '',
        description: '',
        email: ''
      })
      setIsTyping(false)
      scrollToBottom()

      // Show related questions
      setTimeout(() => {
        setIsTyping(true)
        scrollToBottom()

        setTimeout(() => {
          const followUpMessage: Message = {
            id: messages.length + 2,
            text: 'Is there anything else I can help you with?',
            sender: 'bot',
            suggestions: allQuestions.filter(q => q.category === 'ticket').slice(0, 3)
          }
          setMessages(prev => [...prev, followUpMessage])
          setIsTyping(false)
          scrollToBottom()
        }, 1000)
      }, 1500)
    }, 1200)
  }, [messages.length, ticketData.email])

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null)
    setMessages([])
    setIsCreatingTicket(false)
    setTicketStep(0)
    setIsTyping(false)
  }, [])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      if (isCreatingTicket) {
        // Handle ticket creation flow
        if (ticketStep === 2) {
          handleTicketTextInput(inputMessage, 'subject')
        } else if (ticketStep === 3) {
          handleTicketTextInput(inputMessage, 'description')
        } else if (ticketStep === 4) {
          handleTicketTextInput(inputMessage, 'email')
        }
      } else {
        const userMessage: Message = {
          id: messages.length + 1,
          text: inputMessage,
          sender: 'user',
        }
        
        setMessages(prev => [...prev, userMessage])
        scrollToBottom()

        setIsTyping(true)
        scrollToBottom()

        setTimeout(() => {
          const botResponse: Message = {
            id: messages.length + 2,
            text: 'Thank you for your message! Here are some topics that might help:',
            sender: 'bot',
            showContactButton: true,
          }
          setMessages(prev => [...prev, botResponse])
          setIsTyping(false)
          scrollToBottom()
        }, 1200)
      }
      
      setInputMessage('')
    }
  }

  const getIssueTypeLabel = (value: string) => {
    const option = ticketQuestions[0].options.find(opt => opt.value === value)
    return option?.label || value
  }

  const getPriorityLabel = (value: string) => {
    const option = ticketQuestions[1].options.find(opt => opt.value === value)
    return option?.label || value
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
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
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
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      </div>

                      {/* Ticket Form Options */}
                      {message.ticketForm && ticketStep < 2 && (
                        <div className="mt-3 space-y-2">
                          {ticketQuestions[ticketStep].options.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleTicketResponse(
                                ticketQuestions[ticketStep].id,
                                option.value,
                                option.label
                              )}
                              className="w-full text-left p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-md"
                            >
                              <div className="flex items-start gap-2">
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-gray-800">{option.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                                </div>
                                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform duration-300 mt-1" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Ticket Summary & Submit */}
                      {isCreatingTicket && ticketStep === 5 && index === messages.length - 1 && (
                        <div className="mt-3 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 space-y-3">
                          <div className="text-sm">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-gray-600 font-medium min-w-[80px]">Type:</span>
                              <span className="text-gray-800">{getIssueTypeLabel(ticketData.issueType)}</span>
                            </div>
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-gray-600 font-medium min-w-[80px]">Priority:</span>
                              <span className="text-gray-800">{getPriorityLabel(ticketData.priority)}</span>
                            </div>
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-gray-600 font-medium min-w-[80px]">Subject:</span>
                              <span className="text-gray-800">{ticketData.subject}</span>
                            </div>
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-gray-600 font-medium min-w-[80px]">Description:</span>
                              <span className="text-gray-800">{ticketData.description}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-600 font-medium min-w-[80px]">Email:</span>
                              <span className="text-gray-800">{ticketData.email}</span>
                            </div>
                          </div>
                          <button
                            onClick={submitTicket}
                            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <CheckCircle size={18} />
                            Submit Your Request
                          </button>
                        </div>
                      )}

                      {/* Create Ticket Button */}
                      {message.showTicketButton && !isCreatingTicket && (
                        <button
                          onClick={startTicketCreation}
                          className="mt-3 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <Ticket size={16} />
                          Create Ticket
                        </button>
                      )}

                      {/* Navigation Link */}
                      {message.navigationLink && (
                        <Link href={message.navigationLink}>
                          <a className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm transition-all duration-300 hover:scale-105 group">
                            <ExternalLink size={14} className="group-hover:rotate-12 transition-transform duration-300" />
                            Go to Page
                          </a>
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

                {/* AI Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-messageSlide">
                    <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl px-4 py-3 shadow-md">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}

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
                  placeholder={
                    isCreatingTicket 
                      ? ticketStep === 2 
                        ? "Enter ticket subject..." 
                        : ticketStep === 3 
                        ? "Describe your issue..."
                        : ticketStep === 4
                        ? "Enter your email..."
                        : "Type your message..."
                      : "Type your message..."
                  }
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

      {/* Contact Modal */}
      {/* Add a blurred backdrop so the page behind the modal is blurred instead of solid black */}
      {showContactModal && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[55]"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255,255,255,0.03)'
          }}
        />
      )}

      <ContactModal 
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
      />

      {/* Add Custom Animations */}
      <Style global>{`
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

        /* Override common modal overlay (Tailwind classes) to use blur instead of solid black */
        .fixed.inset-0.bg-black.bg-opacity-50 {
          background-color: transparent !important;
          backdrop-filter: blur(6px) !important;
          -webkit-backdrop-filter: blur(6px) !important;
        }

        /* Fallback selectors: some modal implementations use slightly different class combos */
        .fixed.inset-0.bg-black,
        .modal-backdrop,
        .modal-overlay {
          background-color: transparent !important;
          backdrop-filter: blur(6px) !important;
          -webkit-backdrop-filter: blur(6px) !important;
        }
      `}</Style>
    </>
  )
}
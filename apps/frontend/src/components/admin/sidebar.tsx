'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Building2, Users, CreditCard, FileText,
  TrendingUp, Activity, MessageSquare, Settings, BarChart3, 
  Package, X
} from 'lucide-react';

interface MenuItem {
  name: string;
  icon: any;
  path: string;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems: MenuSection[] = [
    {
      section: 'Dashboard',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' }
      ]
    },
    {
      section: 'Sub-Customers',
      items: [
        { name: 'Companies', icon: Building2, path: '/admin/companies' },
        { name: 'Users', icon: Users, path: '/admin/users' }
      ]
    },
    {
      section: 'Subscription',
      items: [
        { name: 'Plans & Billing', icon: CreditCard, path: '/admin/plans' },
        { name: 'Invoices', icon: FileText, path: '/admin/invoices' },
        { name: 'Analytics', icon: TrendingUp, path: '/admin/analytics' }
      ]
    },
    {
      section: 'Usage',
      items: [
        { name: 'Activity Logs', icon: Activity, path: '/admin/logs' }
      ]
    },
    {
      section: 'Support',
      items: [
        { name: 'Tickets', icon: MessageSquare, path: '/admin/tickets' },
        { name: 'Chat', icon: MessageSquare, path: '/admin/chat' }
      ]
    },
    {
      section: 'Reports',
      items: [
        { name: 'Business Reports', icon: BarChart3, path: '/admin/reports' }
      ]
    },
    {
      section: 'Settings',
      items: [
        { name: 'Profile', icon: Users, path: '/admin/profile' },
        { name: 'Branding', icon: Package, path: '/admin/branding' },
        { name: 'Preferences', icon: Settings, path: '/admin/preferences' }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            {/* Section Header */}
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
              {section.section}
            </h3>
            
            {/* Section Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all relative
                      ${isActive 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                    )}
                    
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Upgrade Card */}
        <div className="mt-8 mx-3">
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl p-5 text-center border border-gray-100">
            <div className="relative mb-2">
              <div className="text-5xl">✨</div>
              <div className="text-3xl absolute top-0 right-8 opacity-50">📊</div>
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Add New Customer</h4>
            <p className="text-xs text-gray-600 mb-3">Expand your business</p>
            <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 shadow-sm">
              Add Sub-Customer
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
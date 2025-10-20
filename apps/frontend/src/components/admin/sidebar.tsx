// app/admin/components/admin-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  Users,
  Shield,
  Database,
  Fingerprint,
  FileText,
  Settings,
  HelpCircle,
  Home,
  UserPlus,
  MapPin,
  Briefcase,
  CalendarDays,
  Clock,
  FileCheck,
  Cpu,
  BarChart3,
  Mail,
  Bell,
  Key,
  Lock,
  MessageSquare,
  X,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  category?: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    category: 'Branch Management',
    title: 'All Branches',
    href: '/admin/branches',
    icon: Building2,
  },
  {
    title: 'Add Branch',
    href: '/admin/branches/create',
    icon: Building2,
  },
  {
    title: 'Branch Admins',
    href: '/admin/branches/admins',
    icon: UserPlus,
  },
  {
    title: 'Locations',
    href: '/admin/branches/locations',
    icon: MapPin,
  },
  {
    category: 'User Management',
    title: 'All Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Add User',
    href: '/admin/users/create',
    icon: UserPlus,
  },
  {
    title: 'Import Users',
    href: '/admin/users/import',
    icon: FileCheck,
  },
  {
    title: 'User Logs',
    href: '/admin/users/logs',
    icon: Clock,
  },
  {
    category: 'Roles & Permissions',
    title: 'All Roles',
    href: '/admin/roles',
    icon: Shield,
  },
  {
    title: 'Create Role',
    href: '/admin/roles/create',
    icon: UserPlus,
  },
  {
    title: 'Permissions',
    href: '/admin/roles/permissions',
    icon: Lock,
  },
  {
    title: 'Role Reports',
    href: '/admin/roles/reports',
    icon: FileText,
  },
  {
    category: 'Master Data',
    title: 'Departments',
    href: '/admin/masters/departments',
    icon: Briefcase,
  },
  {
    title: 'Designations',
    href: '/admin/masters/designations',
    icon: Users,
  },
  {
    title: 'Shifts',
    href: '/admin/masters/shifts',
    icon: Clock,
  },
  {
    title: 'Attendance Rules',
    href: '/admin/masters/attendance-rules',
    icon: CalendarDays,
  },
  {
    title: 'Leave Types',
    href: '/admin/masters/leave-types',
    icon: FileCheck,
  },
  {
    title: 'Company Policies',
    href: '/admin/masters/policies',
    icon: FileText,
  },
  {
    category: 'Biometric Devices',
    title: 'All Devices',
    href: '/admin/devices',
    icon: Cpu,
  },
  {
    title: 'Add Device',
    href: '/admin/devices/create',
    icon: Fingerprint,
  },
  {
    title: 'Sync Logs',
    href: '/admin/devices/logs',
    icon: Clock,
  },
  {
    title: 'Device Status',
    href: '/admin/devices/status',
    icon: Activity,
  },
  {
    category: 'Reports & Analytics',
    title: 'Login Reports',
    href: '/admin/reports/logins',
    icon: Users,
  },
  {
    title: 'Device Sync',
    href: '/admin/reports/device-sync',
    icon: Fingerprint,
  },
  {
    title: 'Role Audit',
    href: '/admin/reports/role-audit',
    icon: Shield,
  },
  {
    title: 'Branch Summary',
    href: '/admin/reports/branch-summary',
    icon: Building2,
  },
  {
    category: 'Settings',
    title: 'Company Profile',
    href: '/admin/settings/company',
    icon: Building2,
  },
  {
    title: 'Branding',
    href: '/admin/settings/branding',
    icon: Settings,
  },
  {
    title: 'Email/SMS',
    href: '/admin/settings/notifications',
    icon: Mail,
  },
  {
    title: 'Notification Center',
    href: '/admin/settings/alerts',
    icon: Bell,
  },
  {
    title: 'API Keys',
    href: '/admin/settings/api-keys',
    icon: Key,
  },
  {
    title: 'Security',
    href: '/admin/settings/security',
    icon: Lock,
  },
  {
    category: 'Support Center',
    title: 'Raise Ticket',
    href: '/admin/support/create',
    icon: MessageSquare,
  },
  {
    title: 'My Tickets',
    href: '/admin/support/tickets',
    icon: FileText,
  },
  {
    title: 'Chat Support',
    href: '/admin/support/chat',
    icon: MessageSquare,
  },
];

export function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  // Group items by category
  const groupedItems = navItems.reduce((acc, item) => {
    if (item.category) {
      acc.push({ type: 'category', title: item.category });
    }
    acc.push(item);
    return acc;
  }, [] as any[]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-slate-100 transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-between px-6 shadow-lg flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">ABC Constructions</p>
              <p className="text-xs text-blue-100">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-blue-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="space-y-0 px-3 py-4">
            {groupedItems.map((item, index) => {
              if (item.type === 'category') {
                return (
                  <div key={`category-${index}`} className="px-4 py-3 mt-2 first:mt-0">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {item.title}
                    </p>
                  </div>
                );
              }

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start px-4 py-2.5 text-slate-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors mb-1',
                      isActive(item.href) &&
                        'bg-blue-100 text-blue-700 font-semibold'
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
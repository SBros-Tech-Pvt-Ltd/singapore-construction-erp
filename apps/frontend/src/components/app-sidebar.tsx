"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  BarChart2,
  Settings,
  Layers,
  Globe,
  Mail,
  FileText,
  Database,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Super Admin",
    email: "owner@erp.com",
    avatar: "/avatars/super-admin.jpg",
  },

  // 🧠 Replace old navMain with your real Super Admin menus
  navMain: [
    {
      title: "Dashboard",
      url: "/super-admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Master Management",
      url: "#",
      icon: Layers,
      items: [
        { title: "Pricing Plan Master", url: "/super-admin/masters/pricing-plans" },
        
        { title: "Email Template Master", url: "/super-admin/masters/email-templates" },
        { title: "Country/State Master", url: "/super-admin/masters/country" },
        { title: "System Settings", url: "/super-admin/masters/system-settings" },
      ],
    },
    {
      title: "Customer Management",
      url: "#",
      icon: Building2,
      items: [
        { title: "Tenant List", url: "/super-admin/customers" },
        { title: "Tenant Details", url: "/super-admin/customers/details" },
        { title: "Reseller Companies", url: "/super-admin/customers/resellers" },
        { title: "Schema Monitor", url: "/super-admin/customers/schema-monitor" },
        { title: "Suspend / Reactivate", url: "/super-admin/customers/manage" },
      ],
    },
    {
      title: "Subscription & Billing",
      url: "#",
      icon: CreditCard,
      items: [
        { title: "All Subscriptions", url: "/super-admin/billing/subscriptions" },
        { title: "Billing Analytics", url: "/super-admin/billing/analytics" },
        { title: "Manual Renewal / Upgrade", url: "/super-admin/billing/renew" },
        { title: "Payment Gateway Setup", url: "/super-admin/billing/gateway" },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChart2,
      items: [
        { title: "Tenant Growth Report", url: "/super-admin/reports/tenant-growth" },
        { title: "Revenue Report", url: "/super-admin/reports/revenue" },
        { title: "Usage Report", url: "/super-admin/reports/usage" },
      ],
    },
    {
      title: "Settings",
      url: "/super-admin/settings",
      icon: Settings,
    },
  ],

  // Optional extra sections if you need
  navSecondary: [
    {
      title: "Help & Docs",
      url: "/super-admin/help",
      icon: FileText,
    },
    {
      title: "System Logs",
      url: "/super-admin/logs",
      icon: Database,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/super-admin/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Globe className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ERP Super Admin</span>
                  <span className="truncate text-xs">Software Owner</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

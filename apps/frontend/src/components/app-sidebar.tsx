"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  BarChart2,
  Settings,
  Layers,
  Globe,
  Database,
  HelpCircle,
  DollarSign,
  Mail,
  MapPin,
  Sliders,
  Users,
  Building,
  Activity,
  TrendingUp,
  PieChart,
  BarChart,
  type LucideIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
}

const data = {
  user: {
    name: "Super Admin",
    email: "owner@erp.com",
    avatar: "/avatars/super-admin.jpg",
  },

  navMain: [
    { title: "Dashboard", url: "/super-admin", icon: LayoutDashboard },
  ] as NavItem[],

  masterManagement: [
    { title: "Pricing Plan Master", url: "/super-admin/masters/pricing-plans1", icon: DollarSign },
    { title: "Email Template Master", url: "/super-admin/masters/email-template", icon: Mail },
    { title: "Country/State Master", url: "/super-admin/masters/country-state", icon: MapPin },
    { title: "System Settings", url: "/super-admin/masters/system-settings", icon: Sliders },
  ] as NavItem[],

  customerManagement: [
    { title: "Tenant List", url: "/super-admin/customers/tenant-management", icon: Building },
    { title: "Reseller Companies", url: "/super-admin/customers/resellers", icon: Building2 },
    { title: "Schema Monitor", url: "/super-admin/customers/schema-monitor", icon: Activity },
    { title: "Suspend / Reactivate", url: "/super-admin/customers/manage", icon: Users },
  ] as NavItem[],

  subscriptionBilling: [
    { title: "All Subscriptions", url: "/super-admin/billing/all-subscriptions", icon: CreditCard },
    { title: "Billing Analytics", url: "/super-admin/billing/billing-analytics", icon: PieChart },
    { title: "Manual Renewal / Upgrade", url: "/super-admin/billing/manual-renewal-upgrade", icon: TrendingUp },
    { title: "Payment Gateway Setup", url: "/super-admin/billing/payment-gateway-setup", icon: Layers },
  ] as NavItem[],

  reportsAnalytics: [
    { title: "Tenant Growth Report", url: "/super-admin/report/tenant-growth", icon: BarChart },
    { title: "Revenue Report", url: "/super-admin/report/revenue-report", icon: BarChart2 },
    { title: "Usage Report", url: "/super-admin/report/usage-report", icon: Activity },
  ] as NavItem[],

  navSecondary: [
    { title: "Settings", url: "/super-admin/settings", icon: Settings },
    { title: "Help & Docs", url: "/super-admin/help", icon: HelpCircle },
    { title: "System Logs", url: "/super-admin/logs", icon: Database },
  ] as NavItem[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // highlight even for subroutes
  const isActiveRoute = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`)

  const getItemClass = (isActive: boolean) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
      isActive
        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 dark:bg-blue-900/40 dark:text-blue-300"
        : "hover:bg-muted hover:text-foreground"
    }`

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/super-admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <Globe className="size-5 text-white" />
                </div>
                <span className="text-base font-semibold">ERP Super Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Overview */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isActive = isActiveRoute(item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive} className={getItemClass(isActive)}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Customer Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Customer</SidebarGroupLabel>
          <SidebarMenu>
            {data.customerManagement.map((item) => {
              const isActive = isActiveRoute(item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive} className={getItemClass(isActive)}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Subscription & Billing */}
        <SidebarGroup>
          <SidebarGroupLabel>Subscription & Billing</SidebarGroupLabel>
          <SidebarMenu>
            {data.subscriptionBilling.map((item) => {
              const isActive = isActiveRoute(item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive} className={getItemClass(isActive)}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Reports & Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Reports & Analytics</SidebarGroupLabel>
          <SidebarMenu>
            {data.reportsAnalytics.map((item) => {
              const isActive = isActiveRoute(item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive} className={getItemClass(isActive)}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Master Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Master</SidebarGroupLabel>
          <SidebarMenu>
            {data.masterManagement.map((item) => {
              const isActive = isActiveRoute(item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive} className={getItemClass(isActive)}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

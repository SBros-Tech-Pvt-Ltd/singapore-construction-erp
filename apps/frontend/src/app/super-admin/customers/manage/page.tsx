"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  AlertCircle,
  Lock,
  LockOpen,
  History,
  Eye,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TenantActionModal from "@/components/forms/tenantactionmodal";

export default function SuspendReactivatePage() {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      tenantName: "XYZ HR Tech",
      owner: "admin@xyzhr.com",
      currentStatus: "Suspended",
      reason: "Subscription Expired",
      dateSuspended: "2025-09-30",
      lastPayment: "2025-08-30",
      plan: "Premium",
      history: [
        { date: "2025-09-30", action: "Suspended", reason: "Payment failure", user: "System" },
        { date: "2025-08-15", action: "Payment Reminder Sent", reason: "Upcoming renewal", user: "System" },
      ],
    },
    {
      id: 2,
      tenantName: "ABC Pvt Ltd",
      owner: "admin@abc.com",
      currentStatus: "Active",
      reason: "N/A",
      dateSuspended: null,
      lastPayment: "2025-10-01",
      plan: "Enterprise",
      history: [
        { date: "2025-10-01", action: "Payment Received", reason: "Monthly subscription", user: "System" },
      ],
    },
    {
      id: 3,
      tenantName: "Design Studio Pro",
      owner: "hello@designstudio.com",
      currentStatus: "Pending Suspension",
      reason: "Payment Overdue",
      dateSuspended: null,
      lastPayment: "2025-09-10",
      plan: "Professional",
      history: [
        { date: "2025-10-08", action: "Final Warning Sent", reason: "Payment overdue", user: "System" },
      ],
    },
  ]);

  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const handleManageTenant = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowActionModal(true);
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action} for tenant:`, selectedTenant);
    setShowActionModal(false);
    setSelectedTenant(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <LockOpen className="text-green-500 dark:text-green-400" size={18} />;
      case "Suspended":
        return <Lock className="text-red-500 dark:text-red-400" size={18} />;
      case "Pending Suspension":
        return <AlertCircle className="text-yellow-500 dark:text-yellow-400" size={18} />;
      default:
        return <span>{status}</span>;
    }
  };

  const activeCount = tenants.filter((t) => t.currentStatus === "Active").length;
  const suspendedCount = tenants.filter((t) => t.currentStatus === "Suspended").length;
  const pendingCount = tenants.filter((t) => t.currentStatus === "Pending Suspension").length;

  return (
    <main className="y-auto p-6 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-end items-center gap-2 mb-4">
          
          <div className="flex gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tenants..."
                className="pl-9 pr-4 py-2 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button variant="secondary" className="gap-1">
              <Filter size={16} /> Filter
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Total Tenants</p>
              <p className="text-2xl font-bold">{tenants.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {activeCount}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Suspended</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {suspendedCount}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 border-red-200 dark:border-red-800">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Pending Action</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {pendingCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Tenant Name</th>
                <th className="px-4 py-3 text-left">Owner</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Last Payment</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{tenant.tenantName}</td>
                  <td className="px-4 py-3">{tenant.owner}</td>
                  <td className="px-4 py-3">{getStatusBadge(tenant.currentStatus)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        tenant.plan === "Enterprise"
                          ? "border-purple-300 bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                          : tenant.plan === "Premium"
                          ? "border-blue-300 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : tenant.plan === "Professional"
                          ? "border-green-300 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : "border-gray-300 bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {tenant.reason !== "N/A" ? (
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        {tenant.reason}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {tenant.lastPayment ? (
                      <span>{tenant.lastPayment}</span>
                    ) : (
                      <span className="text-muted-foreground">No payment</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                   

                     <button
                      onClick={() => handleManageTenant(tenant)}
                      className="text-primary hover:text-primary/80 transition"
                      title="View Tenant">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleManageTenant(tenant)}
                      className="text-muted-foreground hover:text-primary transition"
                      title="Edit Tenant">
                      <Pencil size={18} />
                    </button>


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Showing 1–{tenants.length} of {tenants.length} tenants
          </div>
          <div className="font-medium">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tenant Action Modal */}
      {showActionModal && selectedTenant && (
        <TenantActionModal
          tenant={selectedTenant}
          onClose={() => {
            setShowActionModal(false);
            setSelectedTenant(null);
          }}
          onAction={handleAction}
        />
      )}
    </main>
  );
}

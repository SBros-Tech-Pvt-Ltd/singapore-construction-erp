"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Eye,
  Pencil,
} from "lucide-react";
import TenantSchemaLogsView from "@/components/forms/tenantschemaLogsview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TenantSchemaMonitorPage() {
  const [tenants] = useState([
    {
      id: 1,
      tenantName: "ABC Pvt Ltd",
      schemaName: "tenant_abc",
      dbStatus: "Active",
      lastSync: "2025-10-08",
      connection: "Connected",
      logs: [
        { timestamp: "2025-10-08 14:30:00", event: "Schema sync completed", status: "Success", details: "All tables synchronized successfully" },
        { timestamp: "2025-10-08 10:15:00", event: "Connection established", status: "Success", details: "Database connection successful" },
      ],
    },
    {
      id: 2,
      tenantName: "XYZ Corp",
      schemaName: "tenant_xyz",
      dbStatus: "Warning",
      lastSync: "2025-10-07",
      connection: "Retry",
      logs: [
        { timestamp: "2025-10-07 16:20:00", event: "Connection timeout", status: "Warning", details: "Retrying connection in 30 seconds" },
        { timestamp: "2025-10-07 12:10:00", event: "Slow query detected", status: "Warning", details: "Query execution time exceeded 5 seconds" },
      ],
    },
    {
      id: 3,
      tenantName: "HRPro Global",
      schemaName: "tenant_hrpro",
      dbStatus: "Error",
      lastSync: "2025-10-06",
      connection: "Reconnect",
      logs: [
        { timestamp: "2025-10-06 20:15:00", event: "Connection failed", status: "Error", details: "Unable to establish database connection" },
        { timestamp: "2025-10-06 19:45:00", event: "Schema migration failed", status: "Error", details: "Migration rollback initiated" },
      ],
    },
  ]);

  const [showLogsView, setShowLogsView] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleViewLogs = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowLogsView(true);
  };

  const handleEdit = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowLogsView(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="secondary" className="gap-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
            <CheckCircle className="w-3 h-3" /> Active
          </Badge>
        );
      case "Warning":
        return (
          <Badge variant="outline" className="gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
            <AlertTriangle className="w-3 h-3" /> Warning
          </Badge>
        );
      case "Error":
        return (
          <Badge variant="destructive" className="gap-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
            <AlertCircle className="w-3 h-3" /> Error
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getConnectionBadge = (connection: string) => {
    switch (connection) {
      case "Connected":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            Connected
          </Badge>
        );
      case "Retry":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            Retry
          </Badge>
        );
      case "Reconnect":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
            Reconnect
          </Badge>
        );
      default:
        return <Badge>{connection}</Badge>;
    }
  };

  const activeCount = tenants.filter((t) => t.dbStatus === "Active").length;
  const warningCount = tenants.filter((t) => t.dbStatus === "Warning").length;
  const errorCount = tenants.filter((t) => t.dbStatus === "Error").length;

  // Safe date formatting to prevent runtime errors
  const getLastUpdated = () => {
    try {
      return new Date().toLocaleString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return new Date().toISOString().split('T')[0]; // Fallback to ISO date
    }
  };

  return (
    <main className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header - Simplified without heading */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search schemas..."
                className="pl-9 w-56"
              />
            </div>

            <Button variant="outline" className="gap-1">
              <Filter className="w-4 h-4" /> Filter
            </Button>

            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Schemas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tenants.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{warningCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 border-red-200 dark:border-red-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                Errors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{errorCount}</p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Table */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Tenant Name</th>
                <th className="px-4 py-3 text-left">Schema Name</th>
                <th className="px-4 py-3 text-left">DB Status</th>
                <th className="px-4 py-3 text-left">Last Sync</th>
                <th className="px-4 py-3 text-center">Connection</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{tenant.tenantName}</td>
                  <td className="px-4 py-3">
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                      {tenant.schemaName}
                    </code>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(tenant.dbStatus)}</td>
                  <td className="px-4 py-3">{tenant.lastSync}</td>
                  <td className="px-4 py-3 text-center">{getConnectionBadge(tenant.connection)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary/80 transition"
                        onClick={() => handleViewLogs(tenant)}
                        title="View Logs"
                      >
                        <Eye size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary transition"
                        onClick={() => handleEdit(tenant)}
                        title="Edit Schema"
                      >
                        <Pencil size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>Showing 1–{tenants.length} of {tenants.length} schemas</div>
          <div className="font-medium">Last updated: {getLastUpdated()}</div>
        </div>
      </div>

      {/* Logs Modal */}
      {showLogsView && selectedTenant && (
        <TenantSchemaLogsView
          tenant={selectedTenant}
          onClose={() => {
            setShowLogsView(false);
            setSelectedTenant(null);
          }}
        />
      )}
    </main>
  );
}

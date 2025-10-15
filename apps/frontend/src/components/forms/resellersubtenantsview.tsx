"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Building2,
  Eye,
  Lock,
  LockOpen,
  AlertCircle,
  BarChart3,
  Users,
  Activity,
} from "lucide-react";

interface ResellerSubTenantsViewProps {
  reseller: {
    resellerName: string;
    adminEmail: string;
    subCompanies: number;
    status: string;
    subTenants: Array<{
      name: string;
      owner: string;
      status: string;
      plan: string;
      start: string;
      end: string;
    }>;
  };
  onClose: () => void;
}

export default function ResellerSubTenantsView({
  reseller,
  onClose,
}: ResellerSubTenantsViewProps) {
  const total = reseller.subTenants.length;
  const active = reseller.subTenants.filter((t) => t.status === "Active").length;
  const suspended = reseller.subTenants.filter((t) => t.status === "Suspended").length;
  const inactive = reseller.subTenants.filter((t) => t.status === "Inactive").length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background text-foreground rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Building2 className="text-primary" size={30} />
            <div>
              <h2 className="text-2xl font-semibold">{reseller.resellerName}</h2>
              <p className="text-sm text-muted-foreground">
                {reseller.adminEmail} • {reseller.subCompanies} Sub-Companies
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <Badge
              className={`px-4 py-2 text-sm font-medium border ${
                reseller.status === "Active"
                  ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300"
                  : reseller.status === "Suspended"
                  ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300"
                  : "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              Reseller Status: {reseller.status}
            </Badge>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-indigo-500 via-blue-500 to-blue-600 text-white shadow-lg border-none">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-80">Total Companies</p>
                  <Users className="opacity-80" size={20} />
                </div>
                <p className="text-3xl font-bold mt-2">{total}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white shadow-lg border-none">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-80">Active</p>
                  <Activity className="opacity-80" size={20} />
                </div>
                <p className="text-3xl font-bold mt-2">{active}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-400 via-rose-500 to-red-600 text-white shadow-lg border-none">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-80">Suspended</p>
                  <Lock className="opacity-80" size={20} />
                </div>
                <p className="text-3xl font-bold mt-2">{suspended}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-400 via-slate-500 to-gray-600 text-white shadow-lg border-none">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-80">Inactive</p>
                  <AlertCircle className="opacity-80" size={20} />
                </div>
                <p className="text-3xl font-bold mt-2">{inactive}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sub-Companies Table */}
          <Card className="border border-border/80 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="text-primary" size={18} /> Managed Sub-Companies ({total})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-muted-foreground text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3 text-left">Company Name</th>
                      <th className="px-4 py-3 text-left">Owner Email</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Plan</th>
                      <th className="px-4 py-3 text-left">Start Date</th>
                      <th className="px-4 py-3 text-left">End Date</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reseller.subTenants.map((tenant, index) => (
                      <tr
                        key={index}
                        className="border-b border-border hover:bg-muted/40 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">{tenant.name}</td>
                        <td className="px-4 py-3">{tenant.owner}</td>
                        <td className="px-4 py-3">
                          <Badge
                            className={`text-xs px-3 py-1 rounded-full ${
                              tenant.status === "Active"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : tenant.status === "Suspended"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {tenant.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">{tenant.plan}</td>
                        <td className="px-4 py-3">{tenant.start}</td>
                        <td className="px-4 py-3">{tenant.end}</td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:bg-primary/10"
                          >
                            <Eye size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6 bg-border" />

          {/* Footer Actions */}
          <div className="flex justify-between items-center">
            <Button variant="outline">Export List</Button>
            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
              <Button>Manage Reseller</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Lock,
  LockOpen,
  AlertCircle,
  Eye,
  Pencil,
} from "lucide-react";
import TenantRegistrationForm from "@/components/forms/tenentregistrationform";
import TenantDetailsView from "@/components/forms/tenantdetailsview";
import TenantEditDetails from "@/components/forms/tenanteditdetails";

export default function TenantManagementPage() {
  const [tenants, setTenants] = useState([
    {
      name: "ABC Pvt Ltd",
      owner: "admin@abc.com",
      status: "Active",
      plan: "Premium",
      start: "2025-07-02",
      end: "2026-07-01",
    },
    {
      name: "XYZ Corp",
      owner: "hr@xyz.com",
      status: "Suspended",
      plan: "Trial",
      start: "2025-06-15",
      end: "2025-09-15",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsView, setShowDetailsView] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleAddTenant = (formData: any) => {
    console.log("New tenant data:", formData);
    setShowAddForm(false);
  };

  const handleViewTenant = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowDetailsView(true);
  };

  const handleEditTenant = (tenant: any) => {
  setSelectedTenant(tenant);
  setShowEditForm(true); 
};
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
         <div className="flex justify-end items-center gap-2 mb-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-muted-foreground"
                size={18}/>
              <input
                type="text"
                placeholder="Search tenants..."
                className="pl-9 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="flex items-center gap-1 px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition">
              <Filter size={16} /> Filter
            </button>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
            >
              <Plus size={16} /> Add Tenant
            </button>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm text-foreground">
            <thead className="bg-muted text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Tenant Name</th>
                <th className="px-4 py-3 text-left">Owner</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tenants.map((tenant, i) => (
                <tr
                  key={i}
                  className="border-t border-border hover:bg-muted/50 transition">
                  <td className="px-4 py-3 font-medium">{tenant.name}</td>
                  <td className="px-4 py-3">{tenant.owner}</td>
                  <td className="px-4 py-3 text-center">
                   {tenant.status === "Active" ? (
                    <span title="Active">
                    <LockOpen className="text-green-600 w-5 h-5 mx-auto" />
                    </span>
                     ) : tenant.status === "Suspended" ? (
                       <span title="Suspended">
                       <Lock className="text-red-600 w-5 h-5 mx-auto" />
                       </span>
                       ) : (
                        <span title={tenant.status}>
                        <AlertCircle className="text-gray-500 w-5 h-5 mx-auto" />
                        </span>
                        )}
                       </td>

                  <td className="px-4 py-3">{tenant.plan}</td>
                  <td className="px-4 py-3">{tenant.start}</td>
                  <td className="px-4 py-3">{tenant.end}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleViewTenant(tenant)}
                      className="text-primary hover:text-primary/80 transition"
                      title="View Tenant">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditTenant(tenant)}
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

        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>Showing 1-{tenants.length} of {tenants.length} tenants</div>
          <div className="font-medium">Total Tenants: {tenants.length}</div>
        </div>
      </div>
      {showAddForm && (
        <TenantRegistrationForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddTenant}/>
      )}

      {showDetailsView && selectedTenant && (
        <TenantDetailsView
          tenant={selectedTenant}
          onClose={() => {
            setShowDetailsView(false);
            setSelectedTenant(null);
          }}

        />
      )}
{showEditForm && selectedTenant && (
  <TenantEditDetails
    tenant={selectedTenant}
    onClose={() => {
      setShowEditForm(false);
      setSelectedTenant(null);
    }}
   
  />
)}
</main>
  );
}

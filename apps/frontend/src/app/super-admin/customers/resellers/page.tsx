"use client";

import { useState } from "react";
import { Search, Filter, Eye, Lock, LockOpen, AlertCircle, Pencil } from "lucide-react";
import ResellerSubTenantsView from "@/components/forms/resellersubtenantsview";

interface SubTenant {
  name: string;
  owner: string;
  status: string;
  plan: string;
  start: string;
  end: string;
}

interface Reseller {
  id: number;
  resellerName: string;
  adminEmail: string;
  subCompanies: number;
  status: string;
  subTenants: SubTenant[];
}

export default function ResellerCompaniesPage() {
  const [resellers] = useState<Reseller[]>([
    {
      id: 1,
      resellerName: "HRPro Global",
      adminEmail: "hrpro@reseller.com",
      subCompanies: 12,
      status: "Active",
      subTenants: [
        {
          name: "TechCorp Ltd",
          owner: "admin@techcorp.com",
          status: "Active",
          plan: "Premium",
          start: "2025-01-15",
          end: "2026-01-14",
        },
        {
          name: "Design Studio Inc",
          owner: "info@designstudio.com",
          status: "Active",
          plan: "Professional",
          start: "2025-02-01",
          end: "2026-02-01",
        },
        {
          name: "Marketing Pro",
          owner: "contact@marketingpro.com",
          status: "Active",
          plan: "Premium",
          start: "2025-03-10",
          end: "2026-03-09",
        },
        {
          name: "Finance Solutions",
          owner: "admin@financesol.com",
          status: "Suspended",
          plan: "Trial",
          start: "2025-04-05",
          end: "2025-07-05",
        },
        {
          name: "Legal Associates",
          owner: "info@legalassoc.com",
          status: "Active",
          plan: "Professional",
          start: "2025-05-20",
          end: "2026-05-19",
        },
        {
          name: "Health Services Co",
          owner: "admin@healthservices.com",
          status: "Active",
          plan: "Enterprise",
          start: "2025-06-01",
          end: "2026-06-01",
        },
        {
          name: "Education Hub",
          owner: "contact@eduhub.com",
          status: "Active",
          plan: "Professional",
          start: "2025-01-20",
          end: "2026-01-19",
        },
        {
          name: "Retail Chain Pvt",
          owner: "info@retailchain.com",
          status: "Active",
          plan: "Premium",
          start: "2025-02-15",
          end: "2026-02-14",
        },
        {
          name: "Construction Ltd",
          owner: "admin@construction.com",
          status: "Active",
          plan: "Professional",
          start: "2025-03-25",
          end: "2026-03-24",
        },
        {
          name: "Logistics Express",
          owner: "contact@logistics.com",
          status: "Active",
          plan: "Enterprise",
          start: "2025-04-10",
          end: "2026-04-09",
        },
        {
          name: "Food Services Inc",
          owner: "info@foodservices.com",
          status: "Active",
          plan: "Professional",
          start: "2025-05-05",
          end: "2026-05-04",
        },
        {
          name: "Travel Agency Co",
          owner: "admin@travelagency.com",
          status: "Active",
          plan: "Premium",
          start: "2025-06-15",
          end: "2026-06-14",
        },
      ],
    },
    {
      id: 2,
      resellerName: "CloudTech HR",
      adminEmail: "admin@cloudtech.com",
      subCompanies: 5,
      status: "Active",
      subTenants: [
        {
          name: "StartUp Ventures",
          owner: "ceo@startup.com",
          status: "Active",
          plan: "Professional",
          start: "2025-03-01",
          end: "2026-03-01",
        },
        {
          name: "Consulting Group",
          owner: "info@consulting.com",
          status: "Active",
          plan: "Premium",
          start: "2025-03-15",
          end: "2026-03-14",
        },
        {
          name: "Media House",
          owner: "admin@mediahouse.com",
          status: "Active",
          plan: "Professional",
          start: "2025-04-01",
          end: "2026-04-01",
        },
        {
          name: "Engineering Corp",
          owner: "contact@engineering.com",
          status: "Suspended",
          plan: "Trial",
          start: "2025-05-10",
          end: "2025-08-10",
        },
        {
          name: "Security Services",
          owner: "info@security.com",
          status: "Active",
          plan: "Enterprise",
          start: "2025-06-20",
          end: "2026-06-19",
        },
      ],
    },
    {
      id: 3,
      resellerName: "Enterprise Solutions Ltd",
      adminEmail: "contact@entsol.com",
      subCompanies: 8,
      status: "Active",
      subTenants: [
        {
          name: "Banking Corp",
          owner: "admin@banking.com",
          status: "Active",
          plan: "Enterprise",
          start: "2025-01-01",
          end: "2026-01-01",
        },
        {
          name: "Insurance Co",
          owner: "info@insurance.com",
          status: "Active",
          plan: "Premium",
          start: "2025-02-10",
          end: "2026-02-09",
        },
        {
          name: "Real Estate Group",
          owner: "contact@realestate.com",
          status: "Active",
          plan: "Professional",
          start: "2025-03-05",
          end: "2026-03-04",
        },
        {
          name: "Manufacturing Inc",
          owner: "admin@manufacturing.com",
          status: "Active",
          plan: "Premium",
          start: "2025-04-15",
          end: "2026-04-14",
        },
        {
          name: "Pharmaceutical Ltd",
          owner: "info@pharma.com",
          status: "Active",
          plan: "Enterprise",
          start: "2025-05-01",
          end: "2026-05-01",
        },
        {
          name: "Automotive Services",
          owner: "contact@automotive.com",
          status: "Active",
          plan: "Professional",
          start: "2025-06-10",
          end: "2026-06-09",
        },
        {
          name: "Hospitality Group",
          owner: "admin@hospitality.com",
          status: "Suspended",
          plan: "Trial",
          start: "2025-07-01",
          end: "2025-10-01",
        },
        {
          name: "IT Services Corp",
          owner: "info@itservices.com",
          status: "Active",
          plan: "Premium",
          start: "2025-02-20",
          end: "2026-02-19",
        },
      ],
    },
    {
      id: 4,
      resellerName: "Asia HR Partners",
      adminEmail: "partners@asiahr.com",
      subCompanies: 3,
      status: "Inactive",
      subTenants: [
        {
          name: "Export Import Co",
          owner: "admin@exportimport.com",
          status: "Suspended",
          plan: "Professional",
          start: "2025-01-10",
          end: "2026-01-09",
        },
        {
          name: "Shipping Services",
          owner: "info@shipping.com",
          status: "Inactive",
          plan: "Trial",
          start: "2025-03-20",
          end: "2025-06-20",
        },
        {
          name: "Warehouse Solutions",
          owner: "contact@warehouse.com",
          status: "Suspended",
          plan: "Professional",
          start: "2025-05-15",
          end: "2026-05-14",
        },
         ],
    },
  ]);

  const [showSubTenantsView, setShowSubTenantsView] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);

  const handleViewSubTenants = (reseller: Reseller) => {
    setSelectedReseller(reseller);
    setShowSubTenantsView(true);
  };

  return (
    <main className="y-auto p-5 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-end items-center gap-2 mb-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                size={18}/>
              <input
                type="text"
                placeholder="Search resellers..."
                className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors">
          <table className="w-full text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Reseller Name</th>
                <th className="px-4 py-3 text-left">Admin Email</th>
                <th className="px-4 py-3 text-center"># of Sub-Companies</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resellers.map((reseller) => (
                <tr
                  key={reseller.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{reseller.resellerName}</td>
                  <td className="px-4 py-3">{reseller.adminEmail}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                      {reseller.subCompanies}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {reseller.status === "Active" ? (
                      <span title="Active">
                        <LockOpen className="text-green-500 w-5 h-5 mx-auto" />
                      </span>
                    ) : reseller.status === "Inactive" ? (
                      <span title="Inactive">
                        <Lock className="text-red-500 w-5 h-5 mx-auto" />
                      </span>
                    ) : (
                      <span title={reseller.status}>
                        <AlertCircle className="text-gray-400 dark:text-gray-500 w-5 h-5 mx-auto" />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleViewSubTenants(reseller)}
                      className="text-primary hover:text-primary/80 transition"
                      title="View Tenant">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleViewSubTenants(reseller)}
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

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing 1–{resellers.length} of {resellers.length} resellers
          </div>
          <div className="font-medium">
            Total Resellers: {resellers.length}
          </div>
        </div>
      </div>

      {showSubTenantsView && selectedReseller && (
        <ResellerSubTenantsView
          reseller={selectedReseller}
          onClose={() => {
            setShowSubTenantsView(false);
            setSelectedReseller(null);
          }}
        />
      )}
    </main>
  );
}

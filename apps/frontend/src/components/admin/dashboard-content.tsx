'use client';

import { Building2, Users, CreditCard, DollarSign } from 'lucide-react';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import CustomerRow from './CustomerRow';
import PlanItem from './PlanItem';

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sub-Customers"
          value="24"
          subtitle="Companies"
          subtitleValue="18 Active"
          icon={<Building2 className="w-8 h-8" />}
          colorClass="from-blue-400 to-blue-500"
        />
        <StatCard
          title="Active Subscriptions"
          value="18"
          subtitle="Currently Paying"
          subtitleValue="4 Trial"
          icon={<CreditCard className="w-8 h-8" />}
          colorClass="from-emerald-400 to-emerald-500"
        />
        <StatCard
          title="Monthly Revenue"
          value="SGD $12,450"
          subtitle="This Month"
          subtitleValue="+8.2%"
          icon={<DollarSign className="w-8 h-8" />}
          colorClass="from-amber-400 to-orange-400"
        />
        <StatCard
          title="Total Users"
          value="487"
          subtitle="All Companies"
          subtitleValue="38 Active"
          icon={<Users className="w-8 h-8" />}
          colorClass="from-pink-400 to-pink-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sub-Customer Growth */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sub-Customer Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <polyline
                points="20,150 70,130 120,140 170,110 220,125 270,100 320,115 370,95 420,105 470,85 520,95 570,75"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              <polyline
                points="20,180 70,165 120,170 170,155 220,160 270,145 320,155 370,140 420,148 470,135 520,140 570,125"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Plan Distribution</h3>
          <div className="h-48 flex items-center justify-center mb-4">
            <svg className="w-40 h-40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="20" strokeDasharray="105 251" strokeDashoffset="25" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="84 251" strokeDashoffset="-80" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="31 251" strokeDashoffset="-164" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#9ca3af" strokeWidth="20" strokeDasharray="31 251" strokeDashoffset="-195" transform="rotate(-90 50 50)" />
            </svg>
          </div>
          <div className="space-y-2">
            <PlanItem label="Professional" count="10" color="bg-purple-500" />
            <PlanItem label="Basic" count="8" color="bg-blue-500" />
            <PlanItem label="Enterprise" count="3" color="bg-amber-500" />
            <PlanItem label="Free" count="3" color="bg-gray-400" />
          </div>
        </div>
      </div>

      {/* Top Customers and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Customers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Sub-Customers by Revenue</h3>
          <div className="space-y-3">
            <CustomerRow name="TechStart Solutions" revenue="SGD $539" plan="Professional" />
            <CustomerRow name="HealthPlus Medical" revenue="SGD $1,299" plan="Enterprise" />
            <CustomerRow name="EduCorp Learning" revenue="SGD $539" plan="Professional" />
            <CustomerRow name="RetailHub Co" revenue="SGD $1,299" plan="Enterprise" />
            <CustomerRow name="StartupXYZ" revenue="SGD $299" plan="Basic" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem
              action="New customer created"
              description="TechStart joined on Professional plan"
              time="2 hours ago"
              color="bg-green-100 text-green-600"
            />
            <ActivityItem
              action="Plan upgraded"
              description="HealthPlus upgraded to Enterprise"
              time="5 hours ago"
              color="bg-blue-100 text-blue-600"
            />
            <ActivityItem
              action="Payment received"
              description="EduCorp paid SGD $539.10"
              time="1 day ago"
              color="bg-purple-100 text-purple-600"
            />
            <ActivityItem
              action="Support ticket"
              description="New ticket from StartupXYZ"
              time="2 days ago"
              color="bg-orange-100 text-orange-600"
            />
          </div>
        </div>
      </div>

      {/* Upcoming Renewals */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Renewals (Next 30 Days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Plan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Renewal Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Auto-Renew</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['TechStart', 'Professional', '15 Jan 2025', 'SGD $539.10', 'Yes'],
                ['HealthPlus', 'Enterprise', '18 Jan 2025', 'SGD $1,299.00', 'Yes'],
                ['EduCorp', 'Basic', '24 Jan 2025', 'SGD $299.00', 'No'],
                ['StartupXYZ', 'Professional', '28 Jan 2025', 'SGD $539.10', 'Yes']
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{row[0]}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">{row[1]}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{row[2]}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{row[3]}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${row[4] === 'Yes' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      {row[4]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">Send Reminder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
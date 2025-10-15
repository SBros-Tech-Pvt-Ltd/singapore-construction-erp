'use client';

import { Bell, Mail, Search, Menu, LayoutDashboard } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-400 h-16 shadow-md flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:block text-white font-semibold text-lg">Admin Portal</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search sub-customers, users, tickets..."
            className="w-80 pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-white/70" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 text-white hover:bg-white/10 rounded-lg">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Messages */}
        <button className="p-2 text-white hover:bg-white/10 rounded-lg">
          <Mail className="w-6 h-6" />
        </button>

        {/* User Profile */}
        <div className="ml-2 flex items-center gap-2 cursor-pointer">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="hidden md:block text-left">
            <div className="text-white text-sm font-medium">Super Admin</div>
            <div className="text-white/70 text-xs">owner@erp.com</div>
          </div>
        </div>
      </div>
    </header>
  );
}
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleValue: string;
  icon: React.ReactNode;
  colorClass: string;
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  subtitleValue, 
  icon, 
  colorClass 
}: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-xl shadow-sm p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
        <div className="text-white">{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="flex items-center justify-between text-sm opacity-90">
        <span>{subtitle}</span>
        <span className="font-semibold">{subtitleValue}</span>
      </div>
    </div>
  );
}
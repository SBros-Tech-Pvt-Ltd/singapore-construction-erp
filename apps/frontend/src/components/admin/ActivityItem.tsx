import { Activity } from 'lucide-react';

interface ActivityItemProps {
  action: string;
  description: string;
  time: string;
  color: string;
}

export default function ActivityItem({ action, description, time, color }: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
        <Activity className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{action}</div>
        <div className="text-sm text-gray-600">{description}</div>
        <div className="text-xs text-gray-400 mt-1">{time}</div>
      </div>
    </div>
  );
}
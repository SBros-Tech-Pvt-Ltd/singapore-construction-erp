interface CustomerRowProps {
  name: string;
  revenue: string;
  plan: string;
}

export default function CustomerRow({ name, revenue, plan }: CustomerRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <div className="font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{plan} Plan</div>
      </div>
      <div className="text-lg font-bold text-gray-900">
        {revenue}
        <span className="text-sm text-gray-500">/mo</span>
      </div>
    </div>
  );
}
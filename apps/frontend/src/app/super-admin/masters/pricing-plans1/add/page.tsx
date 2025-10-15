'use client';

import { useRouter } from 'next/navigation';
import { PlanForm } from '@/components/pricing/PlanForm';

export default function AddPlanPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    router.push('/superadmin/pricing-plans');
  };

  const handleCancel = () => {
    router.push('/superadmin/pricing-plans');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Pricing Plan</h1>
      <PlanForm 
        isEditMode={false}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

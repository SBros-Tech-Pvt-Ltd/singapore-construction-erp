import { SignUpButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Singapore Construction ERP
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Complete HR, Finance & Payroll Solution for Construction Companies
          </p>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 font-semibold">
              🚧 Coming Soon - Currently in Development
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">HR Management</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Employee Management</li>
              <li>• Recruitment & Onboarding</li>
              <li>• Attendance Tracking</li>
              <li>• Leave Management</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Singapore Compliance</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CPF Calculations</li>
              <li>• GST Management</li>
              <li>• IRAS Integration</li>
              <li>• MOM Compliance</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <SignedOut>
            <div className="flex gap-4 justify-center">
              <SignUpButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                  Get Early Access
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>
          
          <SignedIn>
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <p className="text-green-800 font-semibold">
                ✅ You're signed up! We'll notify you when we launch.
              </p>
            </div>
          </SignedIn>
          
          <p className="text-sm text-gray-500">
            Be the first to know when we launch
          </p>
        </div>

        <div className="mt-12 text-xs text-gray-400">
          <p>Made for Singapore Construction Companies</p>
          <p>Expected Launch: Q2 2024</p>
        </div>
      </div>
    </div>
  );
}
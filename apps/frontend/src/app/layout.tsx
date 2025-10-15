import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Singapore Construction ERP',
  description: 'Complete HR, Finance & Payroll Solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
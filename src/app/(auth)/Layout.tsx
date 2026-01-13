// app/(auth)/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';  // adjust path: from (auth) → up to app/

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Facebook Pro - Connect with friends and the world',
  description: 'A modern social media platform',
  keywords: ['social media', 'facebook', 'social network', 'friends', 'posts'],
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Optional: simple centered wrapper for forms */}
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          {children}
        </div>
      </body>
    </html>
  );
}

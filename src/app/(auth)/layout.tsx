// app/(auth)/layout.tsx
import { Inter } from 'next/font/google';
import '../../globals.css'; // keep path correct

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ONLY a wrapper div here, no <html> or <body>
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 ${inter.className}`}>
      {children}
    </div>
  );
}

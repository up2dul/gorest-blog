import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/common/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gorest Blog | Posts',
  description: 'Simple blog app with gorest.co.in API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <main className="py-24 px-8 sm:px-24 md:px-52 lg:px-64 xl:px-96">
          {children}
        </main>
      </body>
    </html>
  );
}

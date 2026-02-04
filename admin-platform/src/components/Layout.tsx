import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#0a0e1a]">
      <Sidebar currentPath={router.pathname} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

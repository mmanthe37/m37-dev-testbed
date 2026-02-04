import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  currentPath: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Projects', href: '/projects', icon: '🚀' },
  { name: 'Azure Resources', href: '/azure', icon: '☁️' },
  { name: 'GitHub', href: '/github', icon: '🐙' },
  { name: 'Tech Stack', href: '/tech-stack', icon: '🛠️' },
  { name: 'Credentials', href: '/credentials', icon: '🔐' },
  { name: 'Learning', href: '/learning', icon: '📚' },
  { name: 'Deployments', href: '/deployments', icon: '🚢' },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <div className="w-64 bg-[#131925] border-r border-[#1e293b] flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-[#1e293b]">
        <h1 className="text-2xl font-bold gradient-text">M37 DevHub</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-[#1e293b] hover:text-white'
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">MM</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Michael Manthe</p>
            <p className="text-xs text-gray-400">mmanthe37</p>
          </div>
        </div>
      </div>
    </div>
  );
}

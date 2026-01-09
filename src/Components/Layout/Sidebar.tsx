use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Bell, 
  Bookmark, 
  Video, 
  Calendar,
  Settings,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { Avatar } from '@/components/ui/Avatar';
import { getFullName } from '@/utils/helpers';
import { cn } from '@/utils/cn';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { href: '/', label: 'Feed', icon: <Home className="w-5 h-5" /> },
  { href: '/friends', label: 'Friends', icon: <Users className="w-5 h-5" /> },
  { href: '/messages', label: 'Messages', icon: <MessageCircle className="w-5 h-5" /> },
  { href: '/notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
];

const secondaryNavItems: NavItem[] = [
  { href: '/saved', label: 'Saved', icon: <Bookmark className="w-5 h-5" /> },
  { href: '/videos', label: 'Videos', icon: <Video className="w-5 h-5" /> },
  { href: '/events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
  { href: '/trending', label: 'Trending', icon: <TrendingUp className="w-5 h-5" /> },
  { href: '/suggestions', label: 'Friend Suggestions', icon: <UserPlus className="w-5 h-5" /> },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAppSelector(state => state.auth);
  const { sidebarOpen } = useAppSelector(state => state.ui);

  if (!sidebarOpen) return null;

  return (
    <aside className="hidden lg:block w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
      <div className="p-4 space-y-6">
        {/* User Profile Link */}
        {user && (
          <Link
            href={`/profile/${user.username}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            
            <Avatar src={user.avatar} name={getFullName(user)} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {getFullName(user)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                @{user.username}
              </p>
            </div>
          </Link>
        )}

        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 dark:border-dark-700" />

        {/* Secondary Navigation */}
        <nav className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Shortcuts
          </h3>
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              )}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-200 dark:border-dark-700" />

        {/* Secondary Navigation */}
        <nav className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Shortcuts
          </h3>
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              )}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 dark:border-dark-700" />

        {/* Settings */}
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 px-3">
            © 2024 Facebook Pro. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
};



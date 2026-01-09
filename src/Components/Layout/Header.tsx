'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Home, Users, MessageCircle, Bell, Menu, Sun, Moon, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toggleTheme, toggleSidebar } from '@/store/slices/uiSlice';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { getFullName } from '@/utils/helpers';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { theme } = useAppSelector(state => state.ui);
  const { unreadCount } = useAppSelector(state => state.notifications);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-gray-900 dark:text-white">
                Facebook Pro
              </span>
            </Link>
          </div>

          {/* Center Section - Search */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Facebook Pro..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-700 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Navigation Icons */}
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Home"
            >
              <Home className="w-6 h-6" />
            </Link>

            <Link
              href="/friends"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Friends"
            >
              <Users className="w-6 h-6" />
            </Link>

            <Link
              href="/messages"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors relative"
              aria-label="Messages"
            >
              <MessageCircle className="w-6 h-6" />
            </Link>

            <Link
              href="/notifications"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors relative"
              aria-label="Notifications"
            >
                          <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>

            {/* User Menu */}
            {user && (
              <Dropdown
                trigger={
                  <Avatar
                    src={user.avatar}
                    name={getFullName(user)}
                    size="md"
                    className="cursor-pointer"
                  />
                }
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-700">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {getFullName(user)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{user.username}
                  </p>
                </div>

                <DropdownItem
                  onClick={() => router.push(`/profile/${user.username}`)}
                >
                  View Profile
                </DropdownItem>

                <DropdownItem onClick={() => router.push('/settings')}>
                  Settings
                </DropdownItem>

                <div className="border-t border-gray-200 dark:border-dark-700 my-1" />

                <DropdownItem onClick={handleLogout} danger icon={<LogOut className="w-4 h-4" />}>
                  Logout
                </DropdownItem>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

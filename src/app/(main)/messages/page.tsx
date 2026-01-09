'use client';

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="md:col-span-1 border-r border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
            <div className="p-4 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Messages
                </h1>
                <Button size="icon" variant="ghost">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto h-[calc(100%-140px)]">
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No conversations yet
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-4xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Your Messages
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Send private messages to your friends
              </p>
              <Button variant="primary">
                Send Message
              </Button>
            </div>
          </div>
              </div>
      </div>
        </MainLayout>
  );
}



'use client';

import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNotifications, markAsRead } from '@/store/slices/notificationSlice';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { formatDistanceToNow } from '@/utils/helpers';

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { notifications, isLoading } = useAppSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      dispatch(markAsRead(notificationId));
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔔</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                When you get notifications, they'll show up here
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`cursor-pointer transition-colors ${
                  !notification.isRead
                    ? 'bg-primary-50 dark:bg-primary-950 border-primary-200 dark:border-primary-800'
                    : ''
                }`}
                padding="none"
              >
                <button
                  onClick={() => handleNotificationClick(notification._id, notification.isRead)}
                  className="w-full p-4 flex items-start gap-3 text-left"
                >
                  <Avatar
                    src={notification.sender.avatar}
                    name={`${notification.sender.firstName} ${notification.sender.lastName}`}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-gray-100">
                      <span className="font-semibold">
                        {notification.sender.firstName} {notification.sender.lastName}
                      </span>{' '}
                      {notification.message}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                      {formatDistanceToNow(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  )}
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}



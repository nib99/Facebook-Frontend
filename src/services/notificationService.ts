import axios from '@/lib/axios';
import { Notification } from '@/types';

export const getNotifications = async (): Promise<{ notifications: Notification[]; unreadCount: number }> => {
  const { data } = await axios.get('/notifications');
  return data.data;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  await axios.put(`/notifications/${notificationId}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
  await axios.put('/notifications/read-all');
};

export const deleteNotification = async (notificationId: string): Promise<void> => {
  await axios.delete(`/notifications/${notificationId}`);
};

import axios from '@/lib/axios';
import { Conversation, Message } from '@/types';

export const getConversations = async (): Promise<Conversation[]> => {
  const { data } = await axios.get('/messages/conversations');
  return data.data;
};

export const getConversation = async (userId: string): Promise<Conversation> => {
  const { data } = await axios.get(`/messages/conversation/${userId}`);
  return data.data;
};

export const getMessages = async (conversationId: string): Promise<Message[]> => {
  const { data } = await axios.get(`/messages/conversation/${conversationId}/messages`);
  return data.data;
};

export const sendMessage = async (
  conversationId: string,
  content: string,
  attachments?: File[]
): Promise<Message> => {
  const formData = new FormData();
  formData.append('conversationId', conversationId);
  formData.append('content', content);
  
  if (attachments) {
    attachments.forEach(file => {
      formData.append('attachments', file);
    });
  }
  
  const { data } = await axios.post('/messages', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return data.data;
};

export const editMessage = async (messageId: string, content: string): Promise<Message> => {
  const { data } = await axios.put(`/messages/${messageId}`, { content });
  return data.data;
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  await axios.delete(`/messages/${messageId}`);
};

export const addReaction = async (messageId: string, emoji: string): Promise<Message> => {
  const { data } = await axios.post(`/messages/${messageId}/reaction`, { emoji });
  return data.data;
};

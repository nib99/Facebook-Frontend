import axios from '@/lib/axios';
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axios.post('/auth/login', credentials);
  
  // Store token and user
  if (data.success) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
};

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
  const { data } = await axios.post('/auth/register', registerData);
  
  if (data.success) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async (): Promise<{ user: User }> => {
  const { data } = await axios.get('/auth/me');
  return data;
};

export const updateProfile = async (profileData: Partial<User>): Promise<{ user: User }> => {
  const { data } = await axios.put('/users/profile', profileData);
  return data;
};

export const updateAvatar = async (file: File): Promise<{ user: User }> => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const { data } = await axios.put('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return data;
};

export const updateCoverPhoto = async (file: File): Promise<{ user: User }> => {
  const formData = new FormData();
  formData.append('coverPhoto', file);
  
  const { data } = await axios.put('/users/cover-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return data;
};
export const updateCoverPhoto = async (file: File): Promise<{ user: User }> => {
  const formData = new FormData();
  formData.append('coverPhoto', file);
  
  const { data } = await axios.put('/users/cover-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await axios.post('/auth/forgot-password', { email });
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  await axios.put(`/auth/reset-password/${token}`, { password });
};

export const verifyEmail = async (token: string): Promise<void> => {
  await axios.post(`/auth/verify-email/${token}`);
};



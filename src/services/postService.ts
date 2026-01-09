import axios from '@/lib/axios';
import { Post, PaginatedResponse } from '@/types';

export const getFeed = async (page: number = 1): Promise<PaginatedResponse<Post>> => {
  const { data } = await axios.get(`/posts/feed?page=${page}`);
  return data;
};

export const getPost = async (postId: string): Promise<Post> => {
  const { data } = await axios.get(`/posts/${postId}`);
  return data.data;
};

export const createPost = async (postData: FormData): Promise<Post> => {
  const { data } = await axios.post('/posts', postData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

export const updatePost = async (postId: string, postData: Partial<Post>): Promise<Post> => {
  const { data } = await axios.put(`/posts/${postId}`, postData);
  return data.data;
};

export const deletePost = async (postId: string): Promise<void> => {
  await axios.delete(`/posts/${postId}`);
};

export const likePost = async (postId: string): Promise<{ likes: string[]; likesCount: number }> => {
  const { data } = await axios.post(`/posts/${postId}/like`);
  return data.data;
};

export const commentOnPost = async (postId: string, content: string): Promise<any> => {
  const { data } = await axios.post(`/posts/${postId}/comments`, { content });
  return data.data;
};

export const sharePost = async (postId: string, content?: string): Promise<Post> => {
  const { data } = await axios.post(`/posts/${postId}/share`, { content });
  return data.data;
};

export const getUserPosts = async (username: string, page: number = 1): Promise<PaginatedResponse<Post>> => {
  const { data } = await axios.get(`/users/profile/${username}/posts?page=${page}`);
  return data;
};

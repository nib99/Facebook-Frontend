use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { likePost, deletePost } from '@/store/slices/postSlice';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { Post } from '@/types';
import { getFullName, formatDistanceToNow } from '@/utils/helpers';
import toast from 'react-hot-toast';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isOwner = user?._id === post.author._id;
  const hasLiked = user ? post.likes.includes(user._id) : false;

  const handleLike = async () => {
    if (!user || isLiking) return;
    
    setIsLiking(true);
    try {
      await dispatch(likePost(post._id)).unwrap();
    } catch (error) {
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await dispatch(deletePost(post._id)).unwrap();
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <Card className="mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <Avatar
              src={post.author.avatar}
              name={getFullName(post.author)}
              size="md"
            />
          </Link>
          <div>
            <Link 
              href={`/profile/${post.author.username}`}
              className="font-semibold text-gray-900 dark:text-gray-100 hover:underline"
            >
            {getFullName(post.author)}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(post.createdAt)}
            </p>
          </div>
        </div>

        {isOwner && (
          <Dropdown
            trigger={
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            }
          >
            <DropdownItem icon={<Edit className="w-4 h-4" />}>
              Edit Post
            </DropdownItem>
            <DropdownItem
              onClick={handleDelete}
              danger
              icon={<Trash2 className="w-4 h-4" />}
            >
              Delete Post
            </DropdownItem>
          </Dropdown>
        )}
      </div>

      {/* Content */}
      {post.content && (
        <p className="text-gray-900 dark:text-gray-100 mb-3 whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className={`grid gap-2 mb-3 ${
          post.media.length === 1 ? 'grid-cols-1' : 
          post.media.length === 2 ? 'grid-cols-2' :
          post.media.length === 3 ? 'grid-cols-3' :
          'grid-cols-2'
        }`}>
          {post.media.map((mediaUrl, index) => (
            <div
              key={index}
              className="relative aspect-video bg-gray-100 dark:bg-dark-700 rounded-lg overflow-hidden"
            >
              {mediaUrl.includes('video') ? (
                <video
                  src={mediaUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt={`Post media ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                />
              )}
            </div>
          ))}
        </div>
      )}
{/* Stats */}
      <div className="flex items-center justify-between py-2 border-t border-b border-gray-200 dark:border-dark-700 mb-2">
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
          {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          {post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
            hasLiked
              ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
          <span className="font-medium">Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Comment</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
          <div className="flex gap-2">
            {user && (
              <Avatar src={user.avatar} name={getFullName(user)} size="sm" />
            )}
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-full border-0 focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      )}
    </Card>
  );
};

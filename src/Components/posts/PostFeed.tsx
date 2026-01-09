use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFeed } from '@/store/slices/postSlice';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PostCard } from './PostCard';
import { SkeletonPost } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';

export const PostFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, hasMore, page } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchFeed(1));
  }, [dispatch]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFeed(page + 1));
    }
  };

  const lastPostRef = useInfiniteScroll({
    loading: isLoading,
    hasMore,
    onLoadMore: loadMore,
  });

  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-4">
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No posts yet. Be the first to share something!
        </p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={post._id}
          ref={index === posts.length - 1 ? lastPostRef : undefined}
        >
          <PostCard post={post} />
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          You've reached the end!
        </p>
      )}
    </div>
  );
};

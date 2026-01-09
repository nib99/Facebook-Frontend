import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
}) => {
  const baseClasses = 'skeleton bg-gray-200 dark:bg-dark-700';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
    />
  );
};

export const SkeletonPost: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton width="40%" />
          <Skeleton width="30%" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Skeleton width="100%" />
        <Skeleton width="90%" />
        <Skeleton width="95%" />
      </div>

      {/* Image */}
      <Skeleton variant="rectangular" height={300} />

      {/* Actions */}
      <div className="flex gap-4">
        <Skeleton width={80} />
        <Skeleton width={80} />
        <Skeleton width={80} />
      </div>
    </div>
  );
};

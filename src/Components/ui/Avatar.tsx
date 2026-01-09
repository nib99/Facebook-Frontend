import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { getInitials, getInitialsColorClass } from '@/utils/helpers';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  isOnline?: boolean;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-24 h-24 text-3xl',
};

const onlineSizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User avatar',
  name,
  size = 'md',
  className,
  isOnline,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const showInitials = !src || imageError;

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center',
          sizeClasses[size],
          showInitials && name && getInitialsColorClass(name)
        )}
      >
        {showInitials ? (
          <span className="font-semibold text-white">
            {name ? getInitials({ firstName: name.split(' ')[0] || '', lastName: name.split(' ')[1] || '' }) : '?'}
          </span>
        ) : (
          <Image
            src={src!}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        )}
              </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-dark-800',
            onlineSizeClasses[size],
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          )}
        />
      )}
    </div>
  );
};

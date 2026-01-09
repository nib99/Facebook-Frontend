use client';

import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Video, Smile, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createPost } from '@/store/slices/postSlice';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getFullName } from '@/utils/helpers';
import toast from 'react-hot-toast';

export const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    if (validFiles.length !== files.length) {
      toast.error('Only images and videos are allowed');
    }

    // Limit to 10 files
    if (selectedFiles.length + validFiles.length > 10) {
      toast.error('Maximum 10 files allowed');
      return;
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        if (!content.trim() && selectedFiles.length === 0) {
      toast.error('Please add some content or media');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('content', content);
      selectedFiles.forEach(file => {
        formData.append('media', file);
      });

      await dispatch(createPost(formData)).unwrap();
      
      // Reset form
      setContent('');
      setSelectedFiles([]);
      setPreviewUrls([]);
      toast.success('Post created successfully!');
    } catch (error: any) {
      toast.error(error || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="mb-4">
      <form onSubmit={handleSubmit}>
        {/* Input Area */}
        <div className="flex gap-3">
          <Avatar src={user.avatar} name={getFullName(user)} size="md" />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user.firstName}?`}
            className="flex-1 resize-none border-0 focus:ring-0 bg-gray-100 dark:bg-dark-700 rounded-lg p-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-500"
            rows={3}
          />
        </div>

        {/* File Previews */}
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-green-600"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Photo/Video</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-yellow-600"
            >
              <Smile className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Feeling</span>
            </button>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={(!content.trim() && selectedFiles.length === 0) || isSubmitting}
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
};



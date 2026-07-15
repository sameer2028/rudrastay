import { useState } from 'react';
import apiClient from '@/lib/api-client';

interface UseUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export function useUpload(options?: UseUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadMedia = async (file: File, type: 'image' | 'video' = 'image') => {
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `rudrastay/${type}s`); // rudrastay/images or rudrastay/videos

    try {
      const response = await apiClient.post(`/upload/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setProgress(percentCompleted);
        },
      });

      const url = response.data.url;
      if (options?.onSuccess) {
        options.onSuccess(url);
      }
      return url;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Upload failed';
      if (options?.onError) {
        options.onError(errorMessage);
      }
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return { uploadMedia, isUploading, progress };
}

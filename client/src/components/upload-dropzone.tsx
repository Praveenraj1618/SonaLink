import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function UploadDropzone({ onFileSelect, accept = "*", maxSize = 50 }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    setError('');
    
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        // Simulate upload progress
        simulateUpload();
      }
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        simulateUpload();
      }
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setError('');
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <ImageIcon className="w-10 h-10" />;
    }
    return <FileText className="w-10 h-10" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
            ${isDragging 
              ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10' 
              : 'border-border hover:border-primary/50 hover:bg-muted/40'
            }
          `}
        >
          <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : 'scale-100'}`}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <p className="mb-2 text-foreground">
              {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept={accept}
              />
              <Button type="button" variant="outline" className="cursor-pointer gap-2 h-10">
                <Upload className="w-4 h-4" />
                Browse Files
              </Button>
            </label>
            <p className="mt-6 text-xs text-muted-foreground">
              Maximum file size: {maxSize}MB
            </p>
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 border-border rounded-xl p-5 bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-primary">
              {getFileIcon(selectedFile.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium mb-1">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Uploading...
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {uploadProgress}%
                    </p>
                  </div>
                </div>
              )}
              {uploadProgress === 100 && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="text-sm font-medium">Upload complete!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

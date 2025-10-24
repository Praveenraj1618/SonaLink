import React from 'react';
import { ArrowUp, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Material } from '../lib/types';

interface MaterialCardProps {
  material: Material;
  onClick?: () => void;
  onUpvote?: () => void;
}

export function MaterialCard({ material, onClick, onUpvote }: MaterialCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getFileIcon = () => {
    if (material.file_type === 'image') {
      return <ImageIcon className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer group transition-all hover:shadow-lg hover:border-primary/20"
      onClick={onClick}
    >
      {/* Preview Image or Placeholder */}
      {material.preview_url ? (
        <div className="aspect-video bg-muted overflow-hidden relative">
          <img 
            src={material.preview_url} 
            alt={material.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
            {getFileIcon()}
            <span className="text-xs uppercase">{material.file_type}</span>
          </div>
        </div>
      ) : (
        <div className="aspect-video bg-primary/10 relative flex items-center justify-center">
          {getFileIcon()}
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {material.title}
        </h3>
        
        {material.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {material.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {material.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {material.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{material.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={material.uploader.avatar} />
              <AvatarFallback className="text-xs">
                {getInitials(material.uploader.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {material.uploader.name}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpvote?.();
              }}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{material.upvotes}</span>
            </button>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{material.downloads}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {formatDate(material.created_at)}
        </div>
      </div>
    </Card>
  );
}

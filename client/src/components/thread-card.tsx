import React from 'react';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ForumThread } from '../lib/types';

interface ThreadCardProps {
  thread: ForumThread;
  onClick?: () => void;
}

export function ThreadCard({ thread, onClick }: ThreadCardProps) {
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isHot = thread.answers_count > 5;
  const needsHelp = !thread.accepted && thread.answers_count === 0;

  return (
    <Card 
      className="p-5 cursor-pointer group transition-all hover:shadow-lg hover:border-primary/20"
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar className="w-10 h-10 shrink-0">
          <AvatarImage src={thread.user.avatar} />
          <AvatarFallback>
            {getInitials(thread.user.name)}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="line-clamp-2 group-hover:text-primary transition-colors mb-1">
                {thread.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{thread.user.name}</span>
                <span>•</span>
                <span>{formatDate(thread.created_at)}</span>
              </div>
            </div>

            {/* Status Badge */}
            {thread.accepted && (
              <Badge variant="outline" className="shrink-0 border-green-200 bg-green-50 text-green-700">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Solved
              </Badge>
            )}
          </div>

          {/* Body Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {thread.body}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {thread.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span>{thread.answers_count} {thread.answers_count === 1 ? 'answer' : 'answers'}</span>
            </div>
            
            {needsHelp && (
              <Badge variant="outline" className="text-xs">
                Needs help
              </Badge>
            )}
            
            {isHot && (
              <Badge variant="outline" className="text-xs">
                Hot topic
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

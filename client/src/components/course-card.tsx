import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Course } from '../lib/types';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group transition-all hover:shadow-lg hover:border-primary/20"
      onClick={onClick}
    >
      {/* Header */}
      <div className="h-36 bg-primary relative flex items-center justify-center overflow-hidden">
        {/* Course Code */}
        <div className="relative z-10 text-center">
          <div className="text-white px-5 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            {course.code}
          </div>
        </div>

        {/* Joined Badge */}
        {course.joined && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-foreground">
              Joined
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.name}
        </h3>

        {/* Faculty */}
        <p className="text-sm text-muted-foreground mb-3">
          Prof. {course.faculty}
        </p>

        {course.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{course.member_count} members</span>
          </div>
          
          {course.joined ? (
            <Button 
              variant="ghost" 
              size="sm"
              className="group/btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              <span>View</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              Join
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

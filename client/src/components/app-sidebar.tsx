import React from 'react';
import { Home, BookOpen, Search, Settings, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { mockCourses } from '../lib/mock-data';

interface AppSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  const joinedCourses = mockCourses.filter(c => c.joined);

  const isActive = (page: string) => activePage.startsWith(page);

  return (
    <div className="w-64 border-r bg-background flex flex-col h-full">
      {/* Main Navigation */}
      <div className="p-4 space-y-1">
        <Button
          variant={isActive('dashboard') ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onNavigate('dashboard')}
        >
          <Home className="w-4 h-4 mr-3" />
          Dashboard
        </Button>
        <Button
          variant={isActive('search') ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onNavigate('search')}
        >
          <Search className="w-4 h-4 mr-3" />
          Search
        </Button>
      </div>

      <Separator />

      {/* Courses */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm text-muted-foreground">My Courses</h4>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6"
            onClick={() => onNavigate('onboarding')}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="space-y-1">
            {joinedCourses.map((course) => {
              const isActiveCourse = activePage.includes(`course/${course.id}`);
              return (
                <Button
                  key={course.id}
                  variant={isActiveCourse ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => onNavigate(`course/${course.id}`)}
                >
                  <div className="w-2 h-2 rounded-full bg-primary mr-3 shrink-0" />
                  <div className="text-left truncate">
                    <div className={`text-sm truncate ${isActiveCourse ? 'text-foreground font-medium' : ''}`}>
                      {course.code}
                    </div>
                    <div className={`text-xs truncate ${isActiveCourse ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                      {course.name}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="mt-auto">
        <Separator />
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Upload, MessageSquare, Trophy, TrendingUp, Plus, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { MaterialCard } from '../components/material-card';
import { ThreadCard } from '../components/thread-card';
import { mockMaterials, mockThreads, mockCourses } from '../lib/mock-data';
import { useAuth } from '../lib/auth-context';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user } = useAuth();
  const recentMaterials = mockMaterials.slice(0, 3);
  const recentThreads = mockThreads.slice(0, 2);
  const joinedCourses = mockCourses.filter(c => c.joined);

  const quickActions = [
    {
      icon: Upload,
      label: 'Upload Material',
      description: 'Share notes or resources',
      onClick: () => onNavigate('course/301/materials')
    },
    {
      icon: MessageSquare,
      label: 'Ask Question',
      description: 'Get help from peers',
      onClick: () => onNavigate('course/301/forum')
    },
    {
      icon: Trophy,
      label: 'Create Quiz',
      description: 'Test your knowledge',
      onClick: () => onNavigate('course/401/quizzes')
    }
  ];

  const activityFeed = [
    { text: 'You got 15 upvotes this week', time: '2h ago' },
    { text: 'New material in Machine Learning', time: '5h ago' },
    { text: 'Your quiz got 20 attempts', time: '1d ago' }
  ];

  const stats = [
    { title: 'Top Contributor', description: '12 uploads this month' },
    { title: 'Helpful Helper', description: '25 answers given' },
    { title: 'Quiz Master', description: '90% average score' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-8 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 gradient-hero opacity-90 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1611764553921-437fb44f747a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Workspace background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-20 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
            <Avatar className="w-20 h-20 border-4 border-white/30">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-white/20">
                {user ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="mb-2">
                Welcome back, {user?.name?.split(' ')[0]}
              </h1>
              <p className="text-white/90">
                Here's what's happening with your courses today
              </p>
            </div>
          </div>
          
          {/* Streak Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <div>
              <div className="text-sm opacity-90">Current Streak</div>
              <div>7 days active</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Main Content - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className="mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="p-6 cursor-pointer group transition-all hover:shadow-md"
                  onClick={action.onClick}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <action.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="mb-1">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Top Materials */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2>Trending Materials</h2>
              <Button variant="ghost" onClick={() => onNavigate('search')}>
                View All
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {recentMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={() => onNavigate(`course/${material.course_id}/materials/${material.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Recent Discussions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2>Recent Discussions</h2>
              <Button variant="ghost" onClick={() => onNavigate('course/301/forum')}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentThreads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onClick={() => onNavigate(`course/${thread.course_id}/forum/${thread.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <Card className="p-6">
            <h3 className="mb-4">Activity Feed</h3>
            <div className="space-y-4">
              {activityFeed.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-sm mb-1">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Your Courses */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Your Courses</h3>
              <Badge variant="secondary">{joinedCourses.length}</Badge>
            </div>
            <div className="space-y-3">
              {joinedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => onNavigate(`course/${course.id}`)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white flex-shrink-0">
                    <span className="text-xs">{course.code}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.member_count} members</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('onboarding')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Join More Courses
            </Button>
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <h3 className="mb-4">Your Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <p className="mb-0.5">{stat.title}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

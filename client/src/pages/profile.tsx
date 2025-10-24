import React from 'react';
import { Mail, Calendar, Award, Upload, MessageSquare, Trophy } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MaterialCard } from '../components/material-card';
import { ThreadCard } from '../components/thread-card';
import { useAuth } from '../lib/auth-context';
import { mockMaterials, mockThreads, mockCourses } from '../lib/mock-data';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  userId?: number;
}

export function ProfilePage({ onNavigate, userId }: ProfilePageProps) {
  const { user } = useAuth();
  const isOwnProfile = !userId || userId === user?.id;
  
  // In a real app, fetch user data by userId
  const profileUser = user;

  const userMaterials = mockMaterials.filter(m => m.uploader.id === profileUser?.id).slice(0, 3);
  const userThreads = mockThreads.filter(t => t.user.id === profileUser?.id);
  const joinedCourses = mockCourses.filter(c => c.joined);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!profileUser) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Profile Header */}
      <Card className="p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileUser.avatar} />
            <AvatarFallback>
              {getInitials(profileUser.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="mb-1">{profileUser.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profileUser.email}</span>
                </div>
              </div>
              {isOwnProfile && (
                <Button variant="outline" onClick={() => onNavigate('settings')}>
                  Edit Profile
                </Button>
              )}
            </div>

            {profileUser.bio && (
              <p className="text-muted-foreground mb-4">{profileUser.bio}</p>
            )}

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                <Award className="w-3 h-3 mr-1" />
                {profileUser.role || 'Student'}
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                Joined Oct 2025
              </Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Upload className="w-4 h-4 text-primary" />
                </div>
                <div className="mb-1">{profileUser.stats?.uploads || 0}</div>
                <div className="text-xs text-muted-foreground">Uploads</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="mb-1">{profileUser.stats?.answers || 0}</div>
                <div className="text-xs text-muted-foreground">Answers</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Trophy className="w-4 h-4 text-primary" />
                </div>
                <div className="mb-1">{profileUser.stats?.quizzes || 0}</div>
                <div className="text-xs text-muted-foreground">Quizzes</div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="materials">
        <TabsList>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-6">
          {userMaterials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userMaterials.map(material => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={() => onNavigate(`course/${material.course_id}/materials/${material.id}`)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No materials yet</h3>
              <p className="text-muted-foreground mb-6">
                {isOwnProfile ? "You haven't uploaded any materials yet" : "This user hasn't uploaded any materials"}
              </p>
              {isOwnProfile && (
                <Button onClick={() => onNavigate('course/301/materials')}>
                  Upload Material
                </Button>
              )}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          {userThreads.length > 0 ? (
            <div className="space-y-3">
              {userThreads.map(thread => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onClick={() => onNavigate(`course/${thread.course_id}/forum/${thread.id}`)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                {isOwnProfile ? "You haven't posted any discussions yet" : "This user hasn't posted any discussions"}
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinedCourses.map(course => (
              <Card key={course.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate(`course/${course.id}`)}>
                <div className="h-20 bg-primary rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-white">{course.code}</span>
                </div>
                <h4 className="mb-1">{course.name}</h4>
                <p className="text-sm text-muted-foreground">Prof. {course.faculty}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

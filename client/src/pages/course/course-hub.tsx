import React, { useState } from 'react';
import { Users, MessageSquare, Trophy, FileText } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { mockCourses, mockMaterials, mockThreads } from '../../lib/mock-data';
import { MaterialsTab } from './materials-tab';
import { ForumTab } from './forum-tab';
import { MembersTab } from './members-tab';
import { QuizzesTab } from './quizzes-tab';
import { MaterialDetailPage } from './material-detail';

interface CourseHubProps {
  courseId: number;
  onNavigate: (page: string) => void;
  initialTab?: string;
  materialId?: number;
}

export function CourseHub({ courseId, onNavigate, initialTab = 'overview', materialId }: CourseHubProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // If materialId is provided, show material detail
  if (materialId) {
    return <MaterialDetailPage courseId={courseId} materialId={materialId} onNavigate={onNavigate} />;
  }
  
  const course = mockCourses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="p-6">
        <Card className="p-12 text-center">
          <h2 className="mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const courseMaterials = mockMaterials.filter(m => m.course_id === courseId);
  const courseThreads = mockThreads.filter(t => t.course_id === courseId);
  const topMaterials = courseMaterials.slice(0, 3);

  return (
    <div>
      {/* Course Header */}
      <div className="gradient-hero text-white p-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {course.code}
                </Badge>
                {course.joined && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Enrolled
                  </Badge>
                )}
              </div>
              <h1 className="mb-2">{course.name}</h1>
              <p className="text-white/90 mb-4">
                Prof. {course.faculty}
              </p>
              {course.description && (
                <p className="text-white/80 max-w-2xl">
                  {course.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{course.member_count} members</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{courseMaterials.length} materials</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{courseThreads.length} discussions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                  <h2 className="mb-4">Announcements</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4>Mid-term Exam Schedule</h4>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The mid-term examination will be held on October 25th. Topics covered: Units 1-3.
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4>New Assignment Posted</h4>
                        <span className="text-xs text-muted-foreground">5 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Assignment 3 has been posted. Submission deadline: October 30th.
                      </p>
                    </div>
                  </div>
                </Card>

                <div>
                  <h2 className="mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">New material uploaded: Unit 2 Notes</p>
                          <p className="text-xs text-muted-foreground">3 hours ago</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">New discussion: Help with Problem 4.2</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              <div>
                <Card className="p-5 mb-6">
                  <h3 className="mb-4">Top Materials</h3>
                  <div className="space-y-3">
                    {topMaterials.map((material) => (
                      <button
                        key={material.id}
                        onClick={() => onNavigate(`course/${courseId}/materials/${material.id}`)}
                        className="w-full p-3 rounded-lg border hover:bg-muted transition-colors text-left"
                      >
                        <p className="text-sm mb-1 line-clamp-1">{material.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{material.upvotes} upvotes</span>
                          <span>•</span>
                          <span>{material.downloads} downloads</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setActiveTab('materials')}
                  >
                    View All Materials
                  </Button>
                </Card>

                <Card className="p-5">
                  <h3 className="mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      className="w-full justify-start"
                      onClick={() => setActiveTab('materials')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Browse Materials
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('forum')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask a Question
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('quizzes')}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Take a Quiz
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials">
            <MaterialsTab courseId={courseId} onNavigate={onNavigate} />
          </TabsContent>

          <TabsContent value="forum">
            <ForumTab courseId={courseId} onNavigate={onNavigate} />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizzesTab courseId={courseId} onNavigate={onNavigate} />
          </TabsContent>

          <TabsContent value="members">
            <MembersTab courseId={courseId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

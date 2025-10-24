import React, { useState } from 'react';
import { Database, Upload, Users, BookOpen, MessageSquare, Award, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner@2.0.3';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<Record<string, 'idle' | 'loading' | 'success'>>({
    users: 'idle',
    courses: 'idle',
    materials: 'idle',
    forum: 'idle',
    quizzes: 'idle'
  });

  const handleSeedData = async (type: string) => {
    setSeedStatus(prev => ({ ...prev, [type]: 'loading' }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSeedStatus(prev => ({ ...prev, [type]: 'success' }));
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} seeded successfully!`);
  };

  const handleSeedAll = async () => {
    setIsSeeding(true);
    const types = ['users', 'courses', 'materials', 'forum', 'quizzes'];
    
    for (const type of types) {
      await handleSeedData(type);
    }
    
    setIsSeeding(false);
    toast.success('All data seeded successfully!');
  };

  const handleReset = () => {
    setSeedStatus({
      users: 'idle',
      courses: 'idle',
      materials: 'idle',
      forum: 'idle',
      quizzes: 'idle'
    });
    toast.info('Database reset to initial state');
  };

  const seedItems = [
    {
      id: 'users',
      icon: Users,
      title: 'Seed Users',
      description: 'Generate 50 mock users with profiles',
      count: '50 users',
      color: 'text-blue-600'
    },
    {
      id: 'courses',
      icon: BookOpen,
      title: 'Seed Courses',
      description: 'Create 10 courses across departments',
      count: '10 courses',
      color: 'text-purple-600'
    },
    {
      id: 'materials',
      icon: Upload,
      title: 'Seed Materials',
      description: 'Upload 100+ study materials and notes',
      count: '100+ materials',
      color: 'text-green-600'
    },
    {
      id: 'forum',
      icon: MessageSquare,
      title: 'Seed Forum',
      description: 'Generate discussions with replies',
      count: '50 threads',
      color: 'text-orange-600'
    },
    {
      id: 'quizzes',
      icon: Award,
      title: 'Seed Quizzes',
      description: 'Create quizzes with questions',
      count: '20 quizzes',
      color: 'text-pink-600'
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'loading') {
      return (
        <Badge variant="secondary" className="gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" />
          Seeding...
        </Badge>
      );
    }
    if (status === 'success') {
      return (
        <Badge variant="default" className="gap-1 bg-green-600">
          <CheckCircle2 className="w-3 h-3" />
          Complete
        </Badge>
      );
    }
    return <Badge variant="outline">Ready</Badge>;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-5 h-5 text-primary" />
          <h1>Admin Panel</h1>
        </div>
        <p className="text-muted-foreground">
          Seed database with mock data for development and testing
        </p>
      </div>

      {/* Warning Alert */}
      <Alert className="mb-6 border-yellow-500 bg-yellow-50">
        <AlertDescription>
          <strong>Development Only:</strong> This panel is for staging/development environments. 
          Seeding will create or replace mock data.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="mb-1">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Seed all data at once</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isSeeding}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Status
            </Button>
            <Button
              onClick={handleSeedAll}
              disabled={isSeeding}
              className="gradient-hero gradient-pulse"
            >
              <Database className="w-4 h-4 mr-2" />
              {isSeeding ? 'Seeding All...' : 'Seed All Data'}
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 text-center">
          {seedItems.map((item) => (
            <div key={item.id}>
              <div className={`mb-1 ${item.color}`}>
                <item.icon className="w-5 h-5 mx-auto" />
              </div>
              <div className="text-sm">{item.count}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Seed Items Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {seedItems.map((item) => (
          <Card key={item.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4>{item.title}</h4>
                  <StatusBadge status={seedStatus[item.id]} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSeedData(item.id)}
                  disabled={seedStatus[item.id] === 'loading' || isSeeding}
                  className="w-full"
                >
                  {seedStatus[item.id] === 'loading' ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Seeding...
                    </>
                  ) : seedStatus[item.id] === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Reseed
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Seed {item.title.split(' ')[1]}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* API Endpoints Documentation */}
      <Card className="p-6 mt-6">
        <h3 className="mb-4">Seed API Endpoints</h3>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex items-start gap-3">
            <Badge variant="secondary">POST</Badge>
            <div>
              <div className="text-primary">/admin/seed/users</div>
              <div className="text-xs text-muted-foreground">Generate mock users</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary">POST</Badge>
            <div>
              <div className="text-primary">/admin/seed/courses</div>
              <div className="text-xs text-muted-foreground">Create courses with data</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary">POST</Badge>
            <div>
              <div className="text-primary">/admin/seed/all</div>
              <div className="text-xs text-muted-foreground">Seed entire database</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="destructive">DELETE</Badge>
            <div>
              <div className="text-destructive">/admin/reset</div>
              <div className="text-xs text-muted-foreground">Clear all seed data</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { MaterialCard } from '../components/material-card';
import { ThreadCard } from '../components/thread-card';
import { CourseCard } from '../components/course-card';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { EmptyState } from '../components/empty-state';
import { MaterialCardSkeleton, ThreadCardSkeleton, CourseCardSkeleton } from '../components/loading-skeleton';
import { mockMaterials, mockThreads, mockCourses } from '../lib/mock-data';

interface SearchPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

export function SearchPage({ onNavigate, initialQuery = '' }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  // Filter results based on query
  const searchMaterials = mockMaterials.filter(m => 
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.description?.toLowerCase().includes(query.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const searchThreads = mockThreads.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.body.toLowerCase().includes(query.toLowerCase())
  );

  const searchCourses = mockCourses.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase()) ||
    c.faculty.toLowerCase().includes(query.toLowerCase())
  );

  const mockPeople = [
    { id: 1, name: 'Rakks Kumar', role: 'Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakks' },
    { id: 2, name: 'Priya S', role: 'Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' }
  ].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  const totalResults = searchMaterials.length + searchThreads.length + searchCourses.length + mockPeople.length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials, courses, posts, people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11 h-12"
            autoFocus
          />
        </div>
        
        {query && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-muted-foreground">
              {isSearching ? 'Searching...' : `${totalResults} results for "${query}"`}
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      {query ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All <Badge variant="secondary" className="ml-2">{totalResults}</Badge>
            </TabsTrigger>
            <TabsTrigger value="materials">
              Materials <Badge variant="secondary" className="ml-2">{searchMaterials.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="courses">
              Courses <Badge variant="secondary" className="ml-2">{searchCourses.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="posts">
              Posts <Badge variant="secondary" className="ml-2">{searchThreads.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="people">
              People <Badge variant="secondary" className="ml-2">{mockPeople.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8 mt-6">
            {isSearching ? (
              <div className="space-y-6">
                <MaterialCardSkeleton />
                <ThreadCardSkeleton />
                <CourseCardSkeleton />
              </div>
            ) : totalResults === 0 ? (
              <EmptyState
                icon={Search}
                title="No results found"
                description={`No results found for "${query}". Try different keywords.`}
              />
            ) : (
              <>
                {searchMaterials.length > 0 && (
                  <div>
                    <h2 className="mb-4">Materials</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchMaterials.slice(0, 3).map(material => (
                        <MaterialCard
                          key={material.id}
                          material={material}
                          onClick={() => onNavigate(`course/${material.course_id}/materials/${material.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {searchCourses.length > 0 && (
                  <div>
                    <h2 className="mb-4">Courses</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchCourses.map(course => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onClick={() => onNavigate(`course/${course.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {searchThreads.length > 0 && (
                  <div>
                    <h2 className="mb-4">Discussions</h2>
                    <div className="space-y-3">
                      {searchThreads.map(thread => (
                        <ThreadCard
                          key={thread.id}
                          thread={thread}
                          onClick={() => onNavigate(`course/${thread.course_id}/forum/${thread.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {mockPeople.length > 0 && (
                  <div>
                    <h2 className="mb-4">People</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockPeople.map(person => (
                        <Card key={person.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4>{person.name}</h4>
                              <p className="text-sm text-muted-foreground">{person.role}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="materials" className="mt-6">
            {isSearching ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MaterialCardSkeleton />
                <MaterialCardSkeleton />
                <MaterialCardSkeleton />
              </div>
            ) : searchMaterials.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchMaterials.map(material => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    onClick={() => onNavigate(`course/${material.course_id}/materials/${material.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No materials found"
                description={`No materials found for "${query}"`}
              />
            )}
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            {searchCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={() => onNavigate(`course/${course.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No courses found"
                description={`No courses found for "${query}"`}
              />
            )}
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            {searchThreads.length > 0 ? (
              <div className="space-y-3">
                {searchThreads.map(thread => (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    onClick={() => onNavigate(`course/${thread.course_id}/forum/${thread.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No posts found"
                description={`No posts found for "${query}"`}
              />
            )}
          </TabsContent>

          <TabsContent value="people" className="mt-6">
            {mockPeople.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPeople.map(person => (
                  <Card key={person.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4>{person.name}</h4>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View Profile
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No people found"
                description={`No people found for "${query}"`}
              />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="mb-2">Search SonaLink</h3>
          <p className="text-muted-foreground">
            Find materials, courses, discussions, and people
          </p>
        </div>
      )}
    </div>
  );
}

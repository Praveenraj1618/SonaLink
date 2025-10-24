import React, { useState } from 'react';
import { Check, Search, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { CourseCard } from '../components/course-card';
import { mockCourses } from '../lib/mock-data';
import { Course } from '../lib/types';
import { SonaLinkLogo } from '../components/sonalink-logo';

interface OnboardingPageProps {
  onNavigate: (page: string) => void;
}

export function OnboardingPage({ onNavigate }: OnboardingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>(mockCourses);

  const filteredCourses = allCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCourse = (courseId: number) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleFinish = () => {
    // In a real app, this would make an API call to join courses
    console.log('Joining courses:', selectedCourses);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2.5 justify-center mb-6">
            <SonaLinkLogo className="w-14 h-14" />
            <span className="text-3xl" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>SonaLink</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Welcome to the community!</span>
          </div>
          <h1 className="mb-4">Let's Get You Started</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Select the courses you're enrolled in to personalize your experience and connect with classmates
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-5 duration-700 delay-100">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for courses by name, code, or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 shadow-sm"
            />
          </div>
        </div>

        {/* Selected Count */}
        {selectedCourses.length > 0 && (
          <div className="text-center mb-8 animate-in fade-in zoom-in duration-300">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary text-white shadow-lg shadow-primary/25">
              <Check className="w-4 h-4" />
              <span className="font-medium">
                {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className={`relative transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
                selectedCourses.includes(course.id) 
                  ? 'ring-2 ring-primary rounded-xl shadow-lg shadow-primary/10' 
                  : 'hover:scale-[1.02]'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CourseCard
                course={course}
                onClick={() => toggleCourse(course.id)}
              />
              {selectedCourses.includes(course.id) && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="p-12 text-center border-dashed animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse all available courses
            </p>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-8 border-t animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="h-11 px-6"
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleFinish}
            disabled={selectedCourses.length === 0}
            className="h-11 px-8 gap-2 shadow-lg shadow-primary/25"
          >
            <Check className="w-4 h-4" />
            Continue {selectedCourses.length > 0 && `(${selectedCourses.length})`}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          You can always add or remove courses later from your dashboard
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { ThreadCard } from '../../components/thread-card';
import { EmptyState } from '../../components/empty-state';
import { mockThreads } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface ForumTabProps {
  courseId: number;
  onNavigate: (page: string) => void;
}

export function ForumTab({ courseId, onNavigate }: ForumTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({
    title: '',
    body: '',
    tags: ''
  });

  const courseThreads = mockThreads.filter(t => t.course_id === courseId);

  // Filter threads
  const filteredThreads = courseThreads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterBy === 'all' ||
      (filterBy === 'unanswered' && thread.answers_count === 0) ||
      (filterBy === 'solved' && thread.accepted);
    
    return matchesSearch && matchesFilter;
  });

  const handlePostThread = () => {
    if (!newThread.title || !newThread.body) {
      toast.error('Please fill in required fields');
      return;
    }

    toast.success('Question posted successfully!');
    setShowNewThread(false);
    setNewThread({ title: '', body: '', tags: '' });
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Questions</SelectItem>
            <SelectItem value="unanswered">Unanswered</SelectItem>
            <SelectItem value="solved">Solved</SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={showNewThread} onOpenChange={setShowNewThread}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3 pb-4 border-b sticky top-0 bg-background z-10">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="w-5 h-5 text-primary" />
                Ask a Question
              </DialogTitle>
              <DialogDescription>
                Get help from your peers and classmates on course-related topics
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="thread-title">
                  Question Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="thread-title"
                  placeholder="e.g., Help with Transfer Function derivation?"
                  value={newThread.title}
                  onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thread-body">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="thread-body"
                  placeholder="Provide details about your question..."
                  value={newThread.body}
                  onChange={(e) => setNewThread({ ...newThread, body: e.target.value })}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Be specific and provide context to get better answers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thread-tags">Tags (Optional)</Label>
                <Input
                  id="thread-tags"
                  placeholder="e.g., Control Systems, Help"
                  value={newThread.tags}
                  onChange={(e) => setNewThread({ ...newThread, tags: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas to help categorize your question
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" onClick={() => setShowNewThread(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePostThread} className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Post Question
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Stats */}
      <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
        <span>{courseThreads.length} total</span>
        <span>•</span>
        <span>{courseThreads.filter(t => t.answers_count === 0).length} unanswered</span>
        <span>•</span>
        <span>{courseThreads.filter(t => t.accepted).length} solved</span>
      </div>

      {/* Threads List */}
      {filteredThreads.length > 0 ? (
        <div className="space-y-3">
          {filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onClick={() => onNavigate(`course/${courseId}/forum/${thread.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="No discussions found"
          description={
            searchQuery || filterBy !== 'all'
              ? "Try adjusting your filters"
              : "Be the first to start a discussion"
          }
          actionLabel={!searchQuery && filterBy === 'all' ? "Ask Question" : undefined}
          onAction={!searchQuery && filterBy === 'all' ? () => setShowNewThread(true) : undefined}
        />
      )}
    </div>
  );
}

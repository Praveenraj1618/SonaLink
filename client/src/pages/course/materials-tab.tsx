import React, { useState } from 'react';
import { Filter, Grid, List, Plus, Upload as UploadIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { MaterialCard } from '../../components/material-card';
import { EmptyState } from '../../components/empty-state';
import { UploadDropzone } from '../../components/upload-dropzone';
import { mockMaterials } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface MaterialsTabProps {
  courseId: number;
  onNavigate: (page: string) => void;
}

export function MaterialsTab({ courseId, onNavigate }: MaterialsTabProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    tags: '',
    file: null as File | null
  });

  const courseMaterials = mockMaterials.filter(m => m.course_id === courseId);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(courseMaterials.flatMap(m => m.tags))
  );

  // Filter materials
  const filteredMaterials = courseMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => material.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleUpload = () => {
    if (!uploadForm.title || !uploadForm.file) {
      toast.error('Please fill in required fields');
      return;
    }

    // Simulate upload
    toast.success('Material uploaded successfully!');
    setShowUploadModal(false);
    setUploadForm({ title: '', description: '', tags: '', file: null });
  };

  const handleUpvote = (materialId: number) => {
    toast.success('Upvoted!');
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="downloads">Most Downloaded</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="space-y-3 pb-4 border-b sticky top-0 bg-background z-10">
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <UploadIcon className="w-5 h-5 text-primary" />
                  Upload Material
                </DialogTitle>
                <DialogDescription>
                  Share your notes, assignments, or study materials with your classmates to help everyone succeed
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Control Systems - Unit 1 Notes"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the material content and what it covers..."
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., Notes, Unit 1, Control Systems"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas to help others find your material
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>
                    File <span className="text-destructive">*</span>
                  </Label>
                  <UploadDropzone
                    onFileSelect={(file) => setUploadForm({ ...uploadForm, file })}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    maxSize={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} className="gap-2">
                    <UploadIcon className="w-4 h-4" />
                    Upload Material
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
                className="h-auto py-1"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Materials Grid/List */}
      {sortedMaterials.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {sortedMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onClick={() => onNavigate(`course/${courseId}/materials/${material.id}`)}
              onUpvote={() => handleUpvote(material.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Filter}
          title="No materials found"
          description={
            selectedTags.length > 0 || searchQuery
              ? "Try adjusting your filters or search query"
              : "Be the first to upload materials for this course"
          }
          actionLabel={selectedTags.length === 0 && !searchQuery ? "Upload Material" : undefined}
          onAction={selectedTags.length === 0 && !searchQuery ? () => setShowUploadModal(true) : undefined}
        />
      )}
    </div>
  );
}

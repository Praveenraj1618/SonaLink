import React, { useEffect, useState } from 'react';
import { ArrowLeft, ThumbsUp, Download, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Textarea } from '../../components/ui/textarea';
import { PDFPreview } from '../../components/pdf-preview';
import { Comment, Material } from '../../lib/types';
import { apiFetch } from '../../lib/api';
import { toast } from 'sonner@2.0.3';

interface MaterialDetailPageProps {
  courseId: number;
  materialId: number;
  onNavigate: (page: string) => void;
}

export function MaterialDetailPage({ courseId, materialId, onNavigate }: MaterialDetailPageProps) {
  const [material, setMaterial] = useState<Material | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [downloads, setDownloads] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await apiFetch<Material & { comments: Comment[] }>(`/materials/${materialId}`);
        setMaterial(resp);
        setUpvotes(resp.upvotes);
        setDownloads(resp.downloads);
        setComments(resp.comments);
      } catch (e) {
        // noop
      }
    };
    load();
  }, [materialId]);

  if (!material) {
    return (
      <div className="p-6">
        <p>Loading material...</p>
        <Button onClick={() => onNavigate(`course/${courseId}/materials`)}>
          Back to Materials
        </Button>
      </div>
    );
  }

  // Optimistic upvote with rollback
  const handleUpvote = async () => {
    if (isUpvoting) return;
    
    const previousUpvotes = upvotes;
    const previousHasUpvoted = hasUpvoted;
    
    // Optimistic update
    setIsUpvoting(true);
    setHasUpvoted(!hasUpvoted);
    setUpvotes(hasUpvoted ? upvotes - 1 : upvotes + 1);

    try {
      const resp = await apiFetch<{ upvotes: number; user_voted: boolean }>(`/materials/${materialId}/upvote`, { method: 'POST' });
      setUpvotes(resp.upvotes);
      toast.success(hasUpvoted ? 'Upvote removed' : 'Upvoted!');
    } catch (error) {
      // Rollback on error
      setUpvotes(previousUpvotes);
      setHasUpvoted(previousHasUpvoted);
      toast.error('Failed to upvote. Please try again.');
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleDownload = () => {
    setDownloads(downloads + 1);
    toast.success('Download started');
    // In production: GET /materials/:id/download
    window.open(material.file_url, '_blank');
  };

  const handleComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      body: commentText,
      user: { id: 1, name: 'Rakks Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakks' },
      created_at: new Date().toISOString()
    };

    setComments([...comments, newComment]);
    setCommentText('');
    toast.success('Comment posted!');
    // In production: POST /materials/:id/comments
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => onNavigate(`course/${courseId}/materials`)}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Materials
      </Button>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Preview */}
          <PDFPreview
            fileUrl={material.file_url}
            fileName={material.title}
            fileType={material.file_type}
            previewUrl={material.preview_url}
          />

          {/* Comments */}
          <Card className="p-6">
            <h3 className="mb-4">
              Comments <Badge variant="secondary" className="ml-2">{comments.length}</Badge>
            </h3>

            {/* Comment Form */}
            <div className="mb-6">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="mb-3"
              />
              <div className="flex justify-end">
                <Button onClick={handleComment} disabled={!commentText.trim()}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Material Info */}
          <Card className="p-6">
            <h2 className="mb-4">{material.title}</h2>
            
            {material.description && (
              <p className="text-muted-foreground mb-4">{material.description}</p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {material.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleUpvote}
                variant={hasUpvoted ? 'default' : 'outline'}
                className={`w-full transition-all ${isUpvoting ? 'opacity-50' : ''}`}
                disabled={isUpvoting}
              >
                <ThumbsUp className={`w-4 h-4 mr-2 ${hasUpvoted ? 'fill-current' : ''}`} />
                {hasUpvoted ? 'Upvoted' : 'Upvote'} ({upvotes})
              </Button>

              <Button onClick={handleDownload} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download ({downloads})
              </Button>

              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </Card>

          {/* Uploader Info */}
          <Card className="p-6">
            <h4 className="mb-4">Uploaded by</h4>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={material.uploader.avatar} />
                <AvatarFallback>{getInitials(material.uploader.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{material.uploader.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(material.created_at)}
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <h4 className="mb-4">Statistics</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Upvotes</span>
                <span className="font-medium">{upvotes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Downloads</span>
                <span className="font-medium">{downloads}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Comments</span>
                <span className="font-medium">{comments.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

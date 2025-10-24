import React, { useState } from 'react';
import { Trophy, Plus, Play } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { EmptyState } from '../../components/empty-state';
import { QuizCreateModal } from '../../components/quiz-create-modal';
import { QuizAttemptModal } from '../../components/quiz-attempt-modal';
import { mockQuizzes } from '../../lib/mock-data';
import { Quiz } from '../../lib/types';

interface QuizzesTabProps {
  courseId: number;
  onNavigate: (page: string) => void;
}

export function QuizzesTab({ courseId, onNavigate }: QuizzesTabProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [attemptQuiz, setAttemptQuiz] = useState<Quiz | null>(null);
  const courseQuizzes = mockQuizzes.filter(q => q.course_id === courseId);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="mb-1">Quizzes</h2>
          <p className="text-muted-foreground">
            Test your knowledge and challenge your peers
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Quiz
        </Button>
      </div>

      {/* Quizzes Grid */}
      {courseQuizzes.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {courseQuizzes.map((quiz) => (
            <Card key={quiz.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">{quiz.title}</h3>
                  {quiz.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {quiz.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 text-sm">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={quiz.creator.avatar} />
                  <AvatarFallback className="text-xs">
                    {getInitials(quiz.creator.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">{quiz.creator.name}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">
                  {quiz.questions.length} questions
                </Badge>
                <Badge variant="outline">
                  {quiz.attempts} attempts
                </Badge>
                {quiz.avg_score && (
                  <Badge variant="secondary">
                    {quiz.avg_score}% avg score
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {formatDate(quiz.created_at)}
                </span>
                <Button size="sm" onClick={() => setAttemptQuiz(quiz)}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Quiz
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Trophy}
          title="No quizzes yet"
          description="Create a quiz to test knowledge and challenge your classmates"
          actionLabel="Create Quiz"
          onAction={() => setShowCreateModal(true)}
        />
      )}

      {/* Modals */}
      <QuizCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(quizData) => {
          console.log('Quiz created:', quizData);
          // In production: POST /courses/:id/quizzes
        }}
      />

      {attemptQuiz && (
        <QuizAttemptModal
          quiz={attemptQuiz}
          open={!!attemptQuiz}
          onClose={() => setAttemptQuiz(null)}
        />
      )}
    </div>
  );
}

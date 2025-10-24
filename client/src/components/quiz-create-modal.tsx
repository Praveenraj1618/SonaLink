import React, { useState } from 'react';
import { Plus, X, Trash2, FileText, ListChecks } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
}

interface QuizCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (quiz: { title: string; description: string; questions: QuizQuestion[] }) => void;
}

export function QuizCreateModal({ open, onClose, onSubmit }: QuizCreateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { question: '', options: ['', '', '', ''], correct_answer: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correct_answer: 0 }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'question') {
      updated[index].question = value;
    } else if (field === 'correct_answer') {
      updated[index].correct_answer = value;
    }
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    if (questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()))) {
      toast.error('Please fill in all questions and options');
      return;
    }

    onSubmit({ title, description, questions });
    
    // Reset form
    setTitle('');
    setDescription('');
    setQuestions([{ question: '', options: ['', '', '', ''], correct_answer: 0 }]);
    onClose();
    toast.success('Quiz created successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ListChecks className="w-5 h-5 text-primary" />
            Create New Quiz
          </DialogTitle>
          <DialogDescription>
            Create a new quiz by adding questions and multiple choice options. Students can take this quiz to test their knowledge.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-2">
          {/* Quiz Details */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                Quiz Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Data Structures Midterm Practice"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of what this quiz covers..."
                rows={3}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h3 className="flex items-center gap-2">
                  Questions
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                    {questions.length}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add at least one question with multiple choice options
                </p>
              </div>
              <Button onClick={addQuestion} size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((question, qIndex) => (
                <Card key={qIndex} className="p-5 border-l-4 border-l-primary/30 hover:border-l-primary/60 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <Label className="text-base flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                        {qIndex + 1}
                      </span>
                      Question <span className="text-destructive">*</span>
                    </Label>
                    {questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(qIndex)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <Input
                    value={question.question}
                    onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                    placeholder="Enter your question..."
                    className="mb-5"
                  />

                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2 text-muted-foreground">
                      Answer Options <span className="text-destructive">*</span>
                      <span className="text-xs">(Select the correct answer)</span>
                    </Label>
                    <RadioGroup
                      value={question.correct_answer.toString()}
                      onValueChange={(value) => updateQuestion(qIndex, 'correct_answer', parseInt(value))}
                      className="space-y-3"
                    >
                      {question.options.map((option, oIndex) => (
                        <div 
                          key={oIndex} 
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            question.correct_answer === oIndex 
                              ? 'bg-primary/5 border-primary/30' 
                              : 'bg-muted/30 border-transparent hover:border-border'
                          }`}
                        >
                          <RadioGroupItem 
                            value={oIndex.toString()} 
                            id={`q${qIndex}-o${oIndex}`}
                            className="shrink-0"
                          />
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-sm text-muted-foreground shrink-0 w-5">
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            <Input
                              value={option}
                              onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                              placeholder={`Option ${oIndex + 1}`}
                              className="flex-1 h-9"
                            />
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <ListChecks className="w-4 h-4" />
              Create Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

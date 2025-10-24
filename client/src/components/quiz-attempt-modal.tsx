import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Quiz } from '../lib/types';

interface QuizAttemptModalProps {
  quiz: Quiz;
  open: boolean;
  onClose: () => void;
}

export function QuizAttemptModal({ quiz, open, onClose }: QuizAttemptModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correct_answer) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(quiz.questions.length).fill(-1));
    setShowResults(false);
    setScore(0);
  };

  const question = quiz.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== -1;

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl" aria-describedby="quiz-results-description">
          <DialogDescription id="quiz-results-description" className="sr-only">
            Quiz results showing your score and detailed answers
          </DialogDescription>
          <div className="text-center py-8">
            <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
              percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <Trophy className={`w-10 h-10 ${
                percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>

            <h2 className="mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-8">
              You scored <strong className="text-foreground">{score} out of {quiz.questions.length}</strong>
            </p>

            <div className="max-w-md mx-auto mb-8">
              <div className="text-5xl mb-4">{percentage}%</div>
              <Progress value={percentage} className="h-3" />
            </div>

            {/* Detailed Results */}
            <div className="max-w-xl mx-auto space-y-3 mb-8">
              {quiz.questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correct_answer;

                return (
                  <Card key={index} className="p-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="mb-2">
                          <strong>Q{index + 1}:</strong> {q.question}
                        </p>
                        <div className="text-sm space-y-1">
                          {!isCorrect && (
                            <>
                              <p className="text-red-600">
                                Your answer: {q.options[userAnswer]}
                              </p>
                              <p className="text-green-600">
                                Correct answer: {q.options[q.correct_answer]}
                              </p>
                            </>
                          )}
                          {isCorrect && (
                            <p className="text-green-600">
                              ✓ {q.options[userAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleReset}>
                Try Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{quiz.title}</DialogTitle>
          <DialogDescription>
            Answer all questions to complete the quiz
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <Card className="p-6">
            <h3 className="mb-6">{question.question}</h3>

            <RadioGroup
              value={answers[currentQuestion].toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex gap-1">
              {quiz.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    answers[index] !== -1
                      ? 'bg-primary'
                      : index === currentQuestion
                      ? 'bg-primary/30'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

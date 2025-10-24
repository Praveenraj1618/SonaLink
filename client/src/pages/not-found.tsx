import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <div className="text-center max-w-md fade-in">
        {/* Illustration */}
        <div className="mb-8">
          <div className="text-9xl mb-4">🔍</div>
          <h1 className="text-6xl mb-4">404</h1>
          <h2 className="mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={() => onNavigate('dashboard')}>
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

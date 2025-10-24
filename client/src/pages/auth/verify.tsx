import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface VerifyPageProps {
  onNavigate: (page: string) => void;
  token?: string;
}

export function VerifyPage({ onNavigate, token }: VerifyPageProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Simulate API verification
    const timer = setTimeout(() => {
      // Mock: 80% success rate
      setStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 1500);

    return () => clearTimeout(timer);
  }, [token]);

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
    setStatus('loading');
    
    // Retry verification
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center fade-in">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="mb-2">Verifying Your Email</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your account...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mb-2">Email Verified!</h2>
            <p className="text-muted-foreground mb-6">
              Your account has been successfully verified. You can now access all features of SonaLink.
            </p>
            <Button onClick={() => onNavigate('onboarding')} className="w-full">
              Get Started
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="mb-2">Verification Failed</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't verify your email. The link may have expired or is invalid.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleResend} 
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  'Resend Verification Email'
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('login')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { SonaLinkLogo } from '../../components/sonalink-logo';

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!email.endsWith('@sona.ac.in')) {
      setError('Please use your college email');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl border-border/50 backdrop-blur animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-700 delay-150">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="mb-3">Check Your Email</h2>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            We've sent a password reset link to
          </p>
          <p className="text-foreground font-medium mb-8">{email}</p>
          <p className="text-sm text-muted-foreground mb-8">
            Click the link in the email to reset your password. The link will expire in 24 hours.
          </p>
          <div className="space-y-3">
            <Button onClick={() => onNavigate('login')} className="w-full">
              Back to Login
            </Button>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-sm text-primary hover:underline underline-offset-4 w-full transition-all"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => onNavigate('login')}
          className="mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        <Card className="p-8 shadow-xl border-border/50 backdrop-blur">
          <div className="flex items-center gap-2 mb-8">
            <SonaLinkLogo className="w-11 h-11" />
            <span className="text-xl" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>SonaLink</span>
          </div>

          <div className="mb-8">
            <h1 className="mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground leading-relaxed">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-1 duration-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                College Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@sona.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Enter the email address associated with your account
              </p>
            </div>

            <Button type="submit" className="w-full h-11 mt-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Link
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Remember your password?</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('login')}
            >
              Back to Login
            </Button>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help? Contact support@sonalink.edu
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CheckCircle2, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { SonaLinkLogo } from '../../components/sonalink-logo';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
  token?: string;
}

export function ResetPasswordPage({ onNavigate, token }: ResetPasswordPageProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-destructive' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: 'bg-primary' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl border-border/50 backdrop-blur animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-700 delay-150">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="mb-3">Password Reset Successful!</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your password has been successfully reset. You can now login with your new password.
          </p>
          <Button onClick={() => onNavigate('login')} className="w-full h-11">
            Continue to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-xl border-border/50 backdrop-blur">
          <div className="flex items-center gap-2 mb-8">
            <SonaLinkLogo className="w-11 h-11" />
            <span className="text-xl" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>SonaLink</span>
          </div>

          <div className="mb-8">
            <h1 className="mb-2">Reset Password</h1>
            <p className="text-muted-foreground leading-relaxed">
              Choose a strong password to secure your account.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-1 duration-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
                autoComplete="new-password"
                autoFocus
              />
              {formData.password && (
                <div className="space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength:</span>
                    <span className={`font-medium ${
                      passwordStrength.strength >= 75 ? 'text-green-600' :
                      passwordStrength.strength >= 50 ? 'text-primary' :
                      passwordStrength.strength >= 25 ? 'text-yellow-600' :
                      'text-destructive'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1.5">
                Use at least 6 characters with a mix of letters and numbers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={isLoading}
                autoComplete="new-password"
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-destructive flex items-center gap-1.5 mt-1.5">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-11 mt-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Reset Password
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

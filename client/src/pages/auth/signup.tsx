import React, { useState } from 'react';
import { ArrowLeft, Mail, Loader2, User, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../lib/auth-context';
import { SonaLinkLogo } from '../../components/sonalink-logo';

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return email.endsWith('@sona.ac.in');
  };

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

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please use your college email (@sona.ac.in)');
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
      await signup(formData.name, formData.email, formData.password);
      setShowSuccess(true);
      
      // Redirect to onboarding after showing success
      setTimeout(() => {
        onNavigate('onboarding');
      }, 1500);
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl border-border/50 backdrop-blur animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-700 delay-150">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="mb-3">Check Your Email</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We've sent a verification link to <span className="text-foreground font-medium">{formData.email}</span>. 
            Please verify your email to continue.
          </p>
          <Button onClick={() => onNavigate('login')} variant="outline" className="w-full">
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('landing')}
          className="mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        <Card className="p-8 shadow-xl border-border/50 backdrop-blur">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <SonaLinkLogo className="w-11 h-11" />
            <span className="text-xl" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>SonaLink</span>
          </div>

          <div className="mb-8">
            <h1 className="mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join the campus community
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-1 duration-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                College Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@sona.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
                autoComplete="email"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1.5">
                Use your official college email address
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
                autoComplete="new-password"
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('login')}
            >
              Login instead
            </Button>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

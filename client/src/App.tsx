import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/auth-context';
import { Toaster } from './components/ui/sonner';

// Auth Pages
import { LandingPage } from './pages/landing';
import { SignupPage } from './pages/auth/signup';
import { LoginPage } from './pages/auth/login';
import { VerifyPage } from './pages/auth/verify';
import { ForgotPasswordPage } from './pages/auth/forgot-password';
import { ResetPasswordPage } from './pages/auth/reset-password';

// Main Pages
import { OnboardingPage } from './pages/onboarding';
import { DashboardPage } from './pages/dashboard';
import { SearchPage } from './pages/search';
import { ProfilePage } from './pages/profile';
import { SettingsPage } from './pages/settings';
import { NotificationsPage } from './pages/notifications';
import { AdminPage } from './pages/admin';
import { NotFoundPage } from './pages/not-found';

// Course Pages
import { CourseHub } from './pages/course/course-hub';

// Components
import { AppHeader } from './components/app-header';
import { AppSidebar } from './components/app-sidebar';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from './components/ui/sheet';

function Router() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [params, setParams] = useState<Record<string, string>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Auto redirect to dashboard if authenticated and on auth pages
    if (isAuthenticated && ['landing', 'login', 'signup'].includes(currentPage)) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const navigate = (page: string) => {
    // Parse page for parameters (e.g., "course/301" or "search?q=test")
    const [path, query] = page.split('?');
    const pathParts = path.split('/');
    
    setCurrentPage(path);
    
    // Parse query params
    if (query) {
      const queryParams = new URLSearchParams(query);
      const paramsObj: Record<string, string> = {};
      queryParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
      setParams(paramsObj);
    } else {
      setParams({});
    }
  };

  // Public routes
  if (!isAuthenticated) {
    switch (currentPage) {
      case 'signup':
        return <SignupPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'verify':
        return <VerifyPage onNavigate={navigate} token={params.token} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={navigate} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={navigate} token={params.token} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  }

  // Protected routes - App Shell
  const renderPage = () => {
    // Check if it's a course page
    if (currentPage.startsWith('course/')) {
      const pathParts = currentPage.split('/');
      const courseId = parseInt(pathParts[1]);
      const tab = pathParts[2] || 'overview';
      const materialId = pathParts[3] ? parseInt(pathParts[3]) : undefined;
      
      return <CourseHub courseId={courseId} onNavigate={navigate} initialTab={tab} materialId={materialId} />;
    }

    switch (currentPage) {
      case 'onboarding':
        return <OnboardingPage onNavigate={navigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case 'search':
        return <SearchPage onNavigate={navigate} initialQuery={params.q} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'settings':
        return <SettingsPage onNavigate={navigate} />;
      case 'notifications':
        return <NotificationsPage onNavigate={navigate} />;
      case 'admin':
        return <AdminPage onNavigate={navigate} />;
      case '404':
        return <NotFoundPage onNavigate={navigate} />;
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  // Show onboarding without app shell
  if (currentPage === 'onboarding') {
    return <OnboardingPage onNavigate={navigate} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar activePage={currentPage} onNavigate={navigate} />
      </div>

      {/* Mobile Drawer */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-80" aria-describedby="mobile-nav-description">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription id="mobile-nav-description" className="sr-only">
            Main navigation menu for accessing different sections of SonaLink
          </SheetDescription>
          <AppSidebar 
            activePage={currentPage} 
            onNavigate={(page) => {
              navigate(page);
              setIsMobileMenuOpen(false);
            }} 
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader 
          onNavigate={navigate}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

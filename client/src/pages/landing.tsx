import React from 'react';
import { ArrowRight, Upload, MessageSquare, GraduationCap, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SonaLinkLogo } from '../components/sonalink-logo';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

/**
 * SonaLink Landing Page - Modern Blue & Yellow Theme
 * 
 * LAYOUT:
 * - Desktop: 1440px width, max-width 1200px
 * - Mobile: responsive, full-width stacking
 * - Inspired by modern educational platforms
 * 
 * TOKENS:
 * - Colors: primary #2B8FA8 (teal blue), accent #FFB800 (yellow), bg #FAFAFA, surface #FFFFFF
 * - Type: Headings Poppins/Space Grotesk 600/700, Body Inter 400/500
 * - Spacing: 8pt grid (4/8/16/24/32/48)
 * - Radii: 8/12/16/24
 */
export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Upload,
      title: 'Share Materials',
      description: 'Upload notes, slides, and resources. Access peer-shared content for your courses.'
    },
    {
      icon: MessageSquare,
      title: 'Peer Q&A Forums',
      description: 'Ask course questions, get answers from classmates, help each other learn together.'
    },
    {
      icon: GraduationCap,
      title: 'Student Quizzes',
      description: 'Create practice quizzes, test yourself, and prepare together for exams with peers.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
        <div className="container-grid">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-1.5">
              <SonaLinkLogo className="w-9 h-9" />
              <span className="text-lg text-[#1F1F1F]" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
                SonaLink
              </span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#1F1F1F] hover:text-[#2B8FA8] transition-colors">Features</a>
              <a href="#how-it-works" className="text-[#1F1F1F] hover:text-[#2B8FA8] transition-colors">How it Works</a>
              <a href="#contact" className="text-[#1F1F1F] hover:text-[#2B8FA8] transition-colors">Contact</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('login')}
                className="transition-default"
              >
                Login
              </Button>
              <Button 
                onClick={() => onNavigate('signup')}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-default shadow-lg"
              >
                JOIN US
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Feature Cards - Teal + Navy */}
      <section className="relative bg-[#2B8FA8] pb-0">
        <div className="container-grid relative z-10 pb-32 md:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-16 md:pt-24">
            {/* Left: Text Content */}
            <div className="max-w-[600px] relative">
              <p 
                className="text-white mb-5"
                style={{ 
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em'
                }}
              >
                Campus collaboration
              </p>
              
              <h1 
                className="text-white mb-6 leading-[1.1]"
                style={{ 
                  fontFamily: 'Poppins, system-ui, sans-serif', 
                  fontWeight: 700,
                  fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                  letterSpacing: '-0.02em'
                }}
              >
                PEER-TO-PEER LEARNING PLATFORM
              </h1>
              
              <p 
                className="text-white/95 mb-10 leading-relaxed"
                style={{ 
                  fontSize: '1.125rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  lineHeight: '1.7'
                }}
              >
                Our goal is to make campus collaboration work for everyone through materials sharing, peer Q&A, and course communities.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 relative">
                <Button 
                  onClick={() => onNavigate('signup')}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-default shadow-lg"
                  style={{
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, system-ui, sans-serif',
                    fontWeight: 600,
                    borderRadius: '0.5rem'
                  }}
                >
                  Get Started Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('login')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-default"
                  style={{
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, system-ui, sans-serif',
                    fontWeight: 600,
                    borderRadius: '0.5rem'
                  }}
                >
                  Learn More
                </Button>
                
                {/* Yellow shapes positioned to the right of buttons */}
                <div className="absolute right-0 -top-12 pointer-events-none hidden lg:block" aria-hidden="true">
                  <div className="relative">
                    {/* Yellow circle */}
                    <div className="absolute top-0 -right-8 w-12 h-12 bg-[#FFA10A] rounded-full opacity-90" />
                    {/* Yellow rounded square */}
                    <div className="absolute top-16 right-8 w-16 h-16 bg-[#FFA10A] rounded-2xl rotate-12 opacity-90" />
                  </div>
                </div>
              </div>
              
              {/* Pink square positioned to the right of "PLATFORM" text */}
              <div className="absolute -right-4 top-[25%] pointer-events-none hidden lg:block" aria-hidden="true">
                <div className="w-20 h-20 bg-[#FFB8C8] rounded-2xl rotate-12 opacity-90" />
              </div>
            </div>

            {/* Right: Hero Image with Decorative Frame */}
            <div className="relative">
              {/* Decorative orange accent shape behind image */}
              <div className="absolute -top-6 -right-6 w-56 h-56 bg-[#FF6B35] rounded-[60px] rotate-12 z-[1] opacity-90" />
              
              {/* Image card with rounded corners - SMALLER SIZE */}
              <div className="relative z-10 rounded-[40px] overflow-hidden bg-gray-200 shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1645891913640-9a75931c6235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBub3RlYm9va3xlbnwxfHx8fDE3NjEwNjM2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Student studying with notebook"
                  className="w-full h-[280px] lg:h-[340px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave transition from teal to navy */}
        <div className="relative -mt-1">
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
            style={{ height: '120px', display: 'block' }}
          >
            <path 
              d="M0 0L0 60C240 100 480 110 720 90C960 70 1200 30 1440 60L1440 120L0 120L0 0Z" 
              fill="#3B4D61"
            />
          </svg>
        </div>

        {/* Feature Cards - Overlapping navy section */}
        <div className="relative -mt-32 bg-[#3B4D61]">
          <div className="container-grid relative z-20 -mt-24 pt-16">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-6 md:p-8 bg-white border-0 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon - Simple line style */}
                  <div className="mb-5">
                    <feature.icon className="w-12 h-12 text-[#1F1F1F]" strokeWidth={1.3} />
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-lg text-[#1F1F1F] mb-2"
                    style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}
                  >
                    {feature.title}
                  </h3>
                  
                  {/* Small accent line */}
                  <div className="w-12 h-1 bg-[#FFA10A] mb-4 rounded-full" />
                  
                  {/* Description */}
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navy Background Extension - reduced padding to match upper gap */}
      <section className="bg-[#3B4D61] pt-16 pb-16"></section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="container-grid">
          <div className="text-center mb-16">
            <h2 
              className="text-2xl md:text-3xl text-[#1F1F1F] mb-4"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 700 }}
            >
              How it works
            </h2>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto">
              Get started in three simple steps and join your campus community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: '01',
                title: 'Sign up with college email',
                description: 'Join with your college email to connect with your campus community.'
              },
              {
                number: '02',
                title: 'Join your courses',
                description: 'Select the courses you\'re enrolled in to access relevant materials and discussions.'
              },
              {
                number: '03',
                title: 'Share and learn',
                description: 'Upload materials, ask questions, collaborate with peers in your courses.'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 border border-[#E5E7EB] rounded-2xl h-full bg-white hover:shadow-lg transition-shadow">
                  {/* Numbered Badge */}
                  <div 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#2B8FA8] to-[#FFA10A] text-white mb-5" 
                    style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}
                  >
                    {step.number}
                  </div>
                  
                  <h3 
                    className="text-base text-[#1F1F1F] mb-2"
                    style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SonaLink Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-grid">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Students collaborating in group"
                  className="w-full h-[400px] object-cover"
                />
              </Card>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h2 
                className="text-2xl md:text-3xl text-[#1F1F1F] mb-5"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 700 }}
              >
                Built for student success
              </h2>
              
              <p className="text-base text-[#6B7280] mb-7 leading-relaxed">
                SonaLink is designed by students who understand the challenges of campus life. We've created a platform that makes it easy to find study materials, get help from classmates, and stay connected with your courses.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Share and access course materials instantly',
                  'Get answers from peers in your classes',
                  'Create and take practice quizzes together',
                  'Build meaningful academic connections'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFA10A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-base text-[#1F1F1F]">{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg"
                onClick={() => onNavigate('signup')}
                className="bg-[#2B8FA8] hover:bg-[#247a92] text-white transition-default px-7 py-5 rounded-lg"
              >
                Join the community
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-[#2B8FA8] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-20 w-20 h-20 bg-[#FFA10A] rounded-full opacity-40" aria-hidden="true" />
        <div className="absolute bottom-10 left-20 w-16 h-16 bg-[#FFA10A] rounded-2xl rotate-45 opacity-40" aria-hidden="true" />
        
        <div className="container-grid relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 
              className="text-2xl md:text-3xl text-white mb-5"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 700 }}
            >
              Ready to join your campus community?
            </h2>
            
            <p className="text-base text-white/90 mb-8 leading-relaxed">
              Sign up with your college email and start collaborating with peers today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('signup')}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-default px-7 py-5 rounded-lg shadow-lg"
              >
                Sign up with college email
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('login')}
                className="bg-white text-[#2B8FA8] hover:bg-gray-50 transition-default px-7 py-5 rounded-lg border-0"
              >
                Explore demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white py-12">
        <div className="container-grid">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-1.5 mb-4">
                <SonaLinkLogo className="w-9 h-9" />
                <span className="text-lg text-[#1F1F1F]" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
                  SonaLink
                </span>
              </div>
              <p className="text-sm text-[#6B7280]">
                Built by students, for students.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-4 text-[#1F1F1F]" style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}>
                Product
              </h4>
              <ul className="space-y-2 text-base text-[#6B7280]">
                <li><a href="#features" className="hover:text-[#2B8FA8] transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[#2B8FA8] transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-[#1F1F1F]" style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}>
                Contact
              </h4>
              <ul className="space-y-2 text-base text-[#6B7280]">
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">Contact us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-[#1F1F1F]" style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}>
                Legal
              </h4>
              <ul className="space-y-2 text-base text-[#6B7280]">
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#2B8FA8] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E5E7EB] text-center text-base text-[#6B7280]">
            <p>© 2025 SonaLink. Built by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

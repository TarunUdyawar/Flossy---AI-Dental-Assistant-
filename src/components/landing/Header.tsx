"use client"
import React, { useState, useEffect } from 'react';
import { Mic, Calendar, Star, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const FlossyHomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Redirect to dashboard if user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, isLoaded, router]);

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0c14] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render homepage if user is signed in (will redirect)
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 206, 242, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(24, 206, 242, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#18cef2] opacity-10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#38bdf8] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-[rgba(24,206,242,0.2)] bg-[#0a0c14]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-orange-500/50">
                🦷
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">Flossy</span>
            </div>

           

            {/* Auth Buttons */}
            <SignedOut>
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={() => router.push('/sign-in')}
                  className="text-gray-300 hover:text-[#18cef2] transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => router.push('/sign-up')}
                  className="px-4 lg:px-6 py-2 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            </SignedOut>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(24,206,242,0.2)] bg-[#111827]">
            <div className="px-4 py-4 space-y-3">
              
              <SignedOut>
                <div className="pt-3 space-y-2">
                  <button 
                    onClick={() => router.push('/sign-in')}
                    className="w-full text-left text-gray-300 hover:text-[#18cef2]"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => router.push('/sign-up')}
                    className="w-full px-6 py-2 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-lg font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-[#111827] border border-[rgba(24,206,242,0.2)]">
                <span className="w-2 h-2 bg-[#18cef2] rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm text-[#f97316] font-medium">AI-Powered Dental Assistant</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Your dental{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c] animate-pulse">
                  questions
                </span>
                <br />
                answered
                <br />
                instantly
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Chat with our AI dental assistant for instant advice, book smart appointments, and get personalized care recommendations. Available 24/7, no waiting required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => router.push('/sign-up')}
                  className="group flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105 text-sm sm:text-base"
                >
                  <Mic size={18} className="sm:w-5 sm:h-5" />
                  <span>Try voice chat</span>
                </button>
                <button 
                  onClick={() => router.push('/sign-up')}
                  className="flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#111827] border border-[rgba(24,206,242,0.2)] rounded-lg font-medium hover:bg-[#1e293b] hover:border-[#18cef2] transition-all text-sm sm:text-base"
                >
                  <Calendar size={18} className="sm:w-5 sm:h-5" />
                  <span>Book appointment</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#18cef2] to-[#1089bd] border-2 border-[#0a0c14] flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="sm:border-l border-[rgba(24,206,242,0.2)] sm:pl-4">
                  <div className="flex items-center justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="sm:w-4 sm:h-4" fill="#f97316" stroke="#f97316" />
                    ))}
                    <span className="ml-2 font-bold text-white text-sm sm:text-base">4.9/5</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 text-center">Trusted by <span className="text-white font-medium">1,200+</span> patients</p>
                </div>
              </div>
            </div>

            {/* Right Content - Robot Character */}
            <div className="relative h-64 sm:h-96 lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative transform hover:scale-105 transition-transform duration-500 w-full max-w-sm sm:max-w-md">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#18cef2] to-[#f97316] opacity-20 blur-3xl rounded-full"></div>
                
                {/* Robot Image */}
                <div className="relative">
                  <img 
                    src="flossy.png"
                    alt="Flossy Dental Robot" 
                    className="w-full mx-auto drop-shadow-2xl"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-12 h-12 sm:w-20 sm:h-20 border-2 border-[#18cef2] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-16 h-16 sm:w-24 sm:h-24 border-2 border-[#f97316] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scanline Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(24, 206, 242, 0.03) 2px, rgba(24, 206, 242, 0.03) 4px)',
          animation: 'scanline 8s linear infinite'
        }}
      />
    </div>
  );
};

export default FlossyHomePage;
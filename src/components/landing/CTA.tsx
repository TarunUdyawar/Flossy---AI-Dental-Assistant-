'use client'

import React, { useState, useEffect } from 'react';
import { Mic, Calendar, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 600);
    }, 3000);

    return () => clearInterval(waveInterval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#0a0c14] to-[#1a1110] overflow-hidden flex items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#f97316] opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#fb923c] opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#2a2a2a] border border-[rgba(249,115,22,0.3)]">
              <div className="w-2 h-2 bg-[#f97316] rounded-full animate-pulse" />
              <span className="text-sm text-[#f97316] font-medium">Ready When You Are</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-200">Your dental health</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                  journey starts here
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              Join 1,200+ patients who trust our AI for instant guidance and personalized care.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#f97316] to-[#fb923c] hover:from-[#fb923c] hover:to-[#f97316] text-white font-semibold rounded-lg shadow-lg shadow-[#f97316]/30 transition-all duration-300 transform hover:scale-105">
                <Mic size={20} />
                <span>Start free chat</span>
              </button>

              <button className="flex items-center space-x-2 px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-semibold rounded-lg border border-[rgba(249,115,22,0.3)] transition-all duration-300 transform hover:scale-105">
                <Calendar size={20} />
                <span>Book appointment</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                  1,200+
                </div>
                <div className="text-sm text-gray-400">Active patients</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                  24/7
                </div>
                <div className="text-sm text-gray-400">AI support</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                  98%
                </div>
                <div className="text-sm text-gray-400">Satisfaction rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Robot Character */}
          <div className="relative flex items-center justify-center lg:min-h-[600px]">
            {/* Available Badge */}
            <div className="absolute top-8 right-8 lg:right-12 z-20 flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white text-sm font-semibold shadow-lg shadow-green-500/30 animate-pulse">
              <Sparkles size={16} />
              <span>Available 24/7</span>
            </div>

            <div className="relative transform hover:scale-105 transition-transform duration-500">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] to-[#fb923c] opacity-20 blur-3xl rounded-full"></div>
              
              {/* Robot Image */}
              <div className="relative">
                <img 
                  src="CTA.png"
                  alt="Waving Flossy Robot" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>

              {/* Floating Sparkles */}
              <div className="absolute -top-4 right-12 text-3xl animate-bounce">✨</div>
              <div className="absolute top-12 -right-8 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
              <div className="absolute top-32 right-4 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>✨</div>

              {/* Floating Elements */}
              <div className="absolute -bottom-10 -left-10 w-20 h-20 border-2 border-[#f97316] rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-10 w-16 h-16 border-2 border-[#fb923c] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanline Effect */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249, 115, 22, 0.03) 2px, rgba(249, 115, 22, 0.03) 4px)',
        }}
      />
    </section>
  );
};

export default HeroSection;
import React from 'react';
import { Mic, Calendar } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 border-t border-[rgba(24,206,242,0.2)] bg-[#0a0c14]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 206, 242, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(24, 206, 242, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-[#18cef2] opacity-5 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-[#111827] border border-[rgba(24,206,242,0.2)] mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-[#f97316] font-medium">✨ Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            Three steps to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
              better dental health
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Our streamlined process makes dental care accessible, convenient, and stress-free for everyone
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="relative group">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[rgba(24,206,242,0.3)] to-transparent -translate-x-1/2 z-0"></div>
            
            <div className="relative bg-[#111827] border border-[rgba(24,206,242,0.2)] rounded-2xl p-6 sm:p-8 hover:border-[#18cef2] transition-all hover:shadow-lg hover:shadow-[#18cef2]/20 transform hover:-translate-y-2 duration-300">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/50 text-sm sm:text-base">
                1
              </div>

              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#f97316]/20 to-[#fb923c]/20 rounded-2xl flex items-center justify-center border border-[#f97316]/30 group-hover:scale-110 transition-transform">
                  <Mic size={32} className="sm:w-10 sm:h-10 text-[#f97316]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Ask Questions</h3>
              <p className="text-gray-400 text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Chat with our AI assistant about any dental concerns. Get instant answers about symptoms, treatments, and oral health tips.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 sm:px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]">
                  24/7 Available
                </span>
                <span className="px-2 sm:px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]">
                  Instant Response
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[rgba(24,206,242,0.3)] to-transparent -translate-x-1/2 z-0"></div>
            
            <div className="relative bg-[#111827] border border-[rgba(24,206,242,0.2)] rounded-2xl p-6 sm:p-8 hover:border-[#18cef2] transition-all hover:shadow-lg hover:shadow-[#18cef2]/20 transform hover:-translate-y-2 duration-300">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/50 text-sm sm:text-base">
                2
              </div>

              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#f97316]/20 to-[#fb923c]/20 rounded-2xl flex items-center justify-center border border-[#f97316]/30 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Get Expert Advice</h3>
              <p className="text-gray-400 text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Receive personalized recommendations based on thousands of dental cases. Our AI provides professional-grade insights.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 sm:px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]">
                  AI-Powered
                </span>
                <span className="px-2 sm:px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]">
                  Personalized
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="relative bg-[#111827] border border-[rgba(24,206,242,0.2)] rounded-2xl p-6 sm:p-8 hover:border-[#18cef2] transition-all hover:shadow-lg hover:shadow-[#18cef2]/20 transform hover:-translate-y-2 duration-300">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/50 text-sm sm:text-base">
                3
              </div>

              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#f97316]/20 to-[#fb923c]/20 rounded-2xl flex items-center justify-center border border-[#f97316]/30 group-hover:scale-110 transition-transform">
                  <Calendar size={32} className="sm:w-10 sm:h-10 text-[#f97316]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Book & Get Care</h3>
              <p className="text-gray-400 text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Schedule with verified dentists and receive comprehensive follow-up care. Track your progress seamlessly.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 sm:px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]">
                  Verified Doctors
                </span>
                <span className="px-2 sm:px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]">
                  Follow-up Care
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-lg font-medium text-base sm:text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
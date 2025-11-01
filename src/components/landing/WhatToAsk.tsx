'use client'

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const AIConversationsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const questions = [
    {
      id: 1,
      question: "My tooth hurts when I bite down",
      answer: "Get immediate advice on pain management, possible causes, and when to see a dentist urgently",
      tags: ["Instant Response", "Pain Relief"]
    },
    {
      id: 2,
      question: "How much does teeth whitening cost?",
      answer: "Compare treatment options, pricing ranges, and find the best whitening solution for your budget",
      tags: ["Cost Analysis", "Treatment Options"]
    },
    {
      id: 3,
      question: "When should I replace my filling?",
      answer: "Learn about filling lifespan, warning signs of wear, and replacement timing guidance",
      tags: ["Preventive Care", "Maintenance"]
    }
  ];

  return (
    <section className="relative py-20 bg-[#0a0c14] overflow-hidden">
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

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f97316] opacity-5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#18cef2] opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#111827] border border-[rgba(24,206,242,0.2)]">
              <MessageSquare size={16} className="text-[#f97316]" />
              <span className="text-sm text-[#f97316] font-medium">AI-Powered Conversations</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Ask about{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                anything dental
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-400 leading-relaxed">
              From simple questions to complex concerns, our AI delivers expert-level guidance trained on thousands of real dental cases
            </p>

            {/* Common Questions Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-300">Common questions our AI answers:</h3>
              
              {questions.map((item) => (
                <div
                  key={item.id}
                  className="relative group bg-[#111827] border border-[rgba(24,206,242,0.2)] rounded-xl p-6 hover:border-[#18cef2] transition-all hover:shadow-lg hover:shadow-[#18cef2]/20 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Question Icon */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#f97316]/20 to-[#fb923c]/20 rounded-lg flex items-center justify-center border border-[#f97316]/30 mt-1">
                      <MessageSquare size={16} className="text-[#f97316]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#f97316] font-medium mb-2">"{item.question}"</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#1e293b] text-[#f97316] text-xs font-medium rounded-full border border-[rgba(24,206,242,0.2)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#18cef2]/5 to-[#f97316]/5 rounded-xl transition-opacity duration-300 ${hoveredCard === item.id ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Robot Character */}
         <div className="relative flex items-center justify-center lg:min-h-[600px]">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] to-[#18cef2] opacity-20 blur-3xl rounded-full"></div>
              
              {/* Robot Image */}
              <div className="relative">
                <img 
                  src="confused.png"
                  alt="Confused Flossy Robot with Questions" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-10 -left-10 w-20 h-20 border-2 border-[#18cef2] rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-10 w-16 h-16 border-2 border-[#f97316] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanline Effect */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(24, 206, 242, 0.03) 2px, rgba(24, 206, 242, 0.03) 4px)',
        }}
      />
    </section>
  );
};

export default AIConversationsSection;
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#0a0c14]">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(24, 206, 242, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24, 206, 242, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(24, 206, 242, 0.03) 2px, rgba(24, 206, 242, 0.03) 4px)',
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f97316] rounded-full blur-[120px] opacity-15 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#18cef2] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-[#f97316] blur-xl opacity-30 animate-pulse" />
              <h1 className="text-5xl font-bold relative bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#f97316] bg-clip-text text-transparent">
                SIGN UP
              </h1>
            </div>
            <p className="text-gray-400 text-sm tracking-wider uppercase">
              Start Your Dental Care Journey
            </p>
            
            {/* Decorative lines */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#f97316]" />
              <div className="w-2 h-2 border border-[#f97316] rotate-45 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#f97316]" />
            </div>
          </div>

          {/* Auth card container */}
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#f97316] rounded-lg opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-300" />
            
            {/* Card content */}
            <div className="relative bg-[#111827] backdrop-blur-xl rounded-lg p-8 border border-[rgba(24,206,242,0.2)] shadow-2xl">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              
              {/* Clerk SignUp component */}
              <div className="flex justify-center">
                <SignUp 
                  appearance={{
                    elements: {
                      formButtonPrimary: 
                        'bg-gradient-to-r from-[#f97316] to-[#fb923c] hover:from-[#fb923c] hover:to-[#f97316] text-white font-semibold shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300',
                      card: 'bg-transparent shadow-none',
                      rootBox: 'w-full',
                      headerTitle: 'text-white',
                      headerSubtitle: 'text-gray-400',
                      socialButtonsBlockButton: 
                        'border-[rgba(24,206,242,0.2)] hover:border-[#f97316] bg-transparent text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300',
                      formFieldInput: 
                        'bg-[#0a0c14] border-[rgba(24,206,242,0.2)] text-white focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all duration-300',
                      formFieldLabel: 'text-gray-400',
                      footerActionLink: 'text-[#f97316] hover:text-[#fb923c]',
                      identityPreviewText: 'text-white',
                      formFieldInputShowPasswordButton: 'text-[#f97316]',
                      dividerLine: 'bg-[rgba(24,206,242,0.2)]',
                      dividerText: 'text-gray-400',
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 tracking-wider">
              <span className="inline-block w-2 h-2 bg-[#f97316] rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <span>SECURE CONNECTION ESTABLISHED</span>
              <span className="inline-block w-2 h-2 bg-[#f97316] rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
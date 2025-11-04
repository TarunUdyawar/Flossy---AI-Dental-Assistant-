'use client'

import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const PricingSection = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Essential dental appointment booking',
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white',
      features: [
        'Unlimited appointment booking',
        'Find dentists in your area',
        'Basic text chat support',
        'Appointment reminders'
      ]
    },
    {
      id: 'basic',
      name: 'AI Basic',
      price: 9,
      description: 'AI consultations + appointment booking',
      buttonText: 'Start AI Basic',
      buttonStyle: 'bg-gradient-to-r from-[#f97316] to-[#fb923c] hover:from-[#fb923c] hover:to-[#f97316] text-white',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Everything in Free',
        '10 AI voice calls per month',
        'AI dental guidance & advice',
        'Symptom assessment',
        'Priority support',
        'Call history & recordings'
      ]
    },
    {
      id: 'pro',
      name: 'AI Pro',
      price: 19,
      description: 'Unlimited AI consultations',
      buttonText: 'Upgrade to AI Pro',
      buttonStyle: 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white',
      features: [
        'Everything in AI Basic',
        'Unlimited AI voice calls',
        'Advanced AI dental analysis',
        'Personalized care plans',
        '24/7 priority AI support',
        'Detailed health reports'
      ]
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-[#0a0c14] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#f97316] opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#fb923c] opacity-10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-[#1a1a1a] border border-[rgba(249,115,22,0.3)]">
            <Sparkles size={14} className="sm:w-4 sm:h-4 text-[#f97316]" />
            <span className="text-xs sm:text-sm text-[#f97316] font-medium">Simple Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-4">
            Choose your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
              AI dental plan
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Book appointments for free and upgrade for unlimited AI consultations. Perfect for ongoing dental care.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative group ${
                plan.popular ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
        
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-3 sm:px-4 py-1 bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white text-xs font-semibold rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[#f97316] shadow-2xl shadow-[#f97316]/20'
                    : 'border border-[rgba(249,115,22,0.2)] hover:border-[#f97316] hover:shadow-xl hover:shadow-[#f97316]/10'
                }`}
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#f97316]/5 to-[#fb923c]/5 rounded-2xl transition-opacity duration-300 ${
                    hoveredPlan === plan.id || plan.popular ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative z-10 space-y-4 sm:space-y-6">
                  {/* Plan Name */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c]">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 text-sm sm:text-base">/month</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 ${plan.buttonStyle} shadow-lg transform hover:scale-105 text-sm sm:text-base`}
                  >
                    {plan.buttonText}
                  </button>

                  {/* Features */}
                  <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                        <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#f97316]/20 flex items-center justify-center mt-0.5">
                          <Check size={12} className="sm:w-3.5 sm:h-3.5 text-[#f97316]" />
                        </div>
                        <span className="text-gray-300 text-xs sm:text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                {plan.popular && (
                  <>
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#f97316] to-transparent opacity-20 rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#fb923c] to-transparent opacity-20 rounded-tr-full" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-500 text-xs sm:text-sm px-4">
            All plans include secure data encryption and HIPAA-compliant storage
          </p>
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

export default PricingSection;
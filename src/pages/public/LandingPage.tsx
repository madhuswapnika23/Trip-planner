import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrendingDestinations } from '@/components/landing/TrendingDestinations';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <TrendingDestinations />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const BannerSystem = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=300&fit=crop',
      title: 'Teamwork Makes the Dream Work',
      subtitle: 'Collaborate and achieve greatness together',
      bgColor: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=300&fit=crop',
      title: 'Innovation Starts Here',
      subtitle: 'Your ideas shape our future',
      bgColor: 'from-purple-600 to-purple-800'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop',
      title: 'Excellence in Everything',
      subtitle: 'Delivering quality is our commitment',
      bgColor: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=300&fit=crop',
      title: 'Grow With Us',
      subtitle: 'Your success is our priority',
      bgColor: 'from-orange-600 to-orange-800'
    }
  ];

  useEffect(() => {
    if (!isPaused && isVisible) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
    // Return undefined when no interval is created
    return undefined;
  }, [isPaused, isVisible, banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (!isVisible) return null;

  const banner = banners[currentBanner];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div 
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-64 md:h-80">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-75`}></div>
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl opacity-90 drop-shadow">
                {banner.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Close banner"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Next banner"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentBanner 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
        >
          Show Banner
        </button>
      )}
    </div>
  );
};

export default BannerSystem;
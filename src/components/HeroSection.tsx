import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  names: string[];
  date: Date;
}

const HeroSection: React.FC<HeroSectionProps> = ({ names, date }) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/931796/pexels-photo-931796.jpeg)',
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundPosition: `50% ${50 + scrollY * 0.05}%`
        }}
      >
        <div className="absolute inset-0 bg-rose-900 bg-opacity-40 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 backdrop-blur-sm bg-white bg-opacity-20 rounded-lg w-11/12 max-w-2xl transition-all duration-700 hover:bg-opacity-30">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-16 bg-white opacity-70"></div>
          <p className="mx-4 text-white font-serif italic">{formatDate(date)}</p>
          <div className="h-px w-16 bg-white opacity-70"></div>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-serif text-white mb-4 tracking-wide">
          {names[0]} <span className="font-light">&</span> {names[1]}
        </h1>
        
        <div className="flex items-center justify-center my-6">
          <div className="h-px w-12 bg-amber-300"></div>
          <Heart size={28} className="mx-4 text-amber-300 fill-amber-300" />
          <div className="h-px w-12 bg-amber-300"></div>
        </div>
        
        <p className="text-xl text-white font-light max-w-lg mx-auto">
          We invite you to celebrate our wedding day
        </p>
        
        <div className="mt-10">
          <a 
            href="#details" 
            className="inline-block px-8 py-3 bg-white bg-opacity-20 border border-white text-white rounded-full transition-all duration-300 hover:bg-opacity-30 hover:scale-105"
          >
            Explore Details
          </a>
        </div>
      </div>
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
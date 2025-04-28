import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className={`font-serif transition-all duration-300 ${
          scrolled ? 'text-2xl' : 'text-4xl sm:text-5xl'
        } text-rose-700 mb-2`}>
          {title}
        </h1>
        
        <div className="flex items-center justify-center my-2">
          <div className="h-px w-12 bg-amber-400"></div>
          <Heart 
            size={scrolled ? 18 : 24} 
            className="mx-4 text-amber-400 fill-amber-400" 
          />
          <div className="h-px w-12 bg-amber-400"></div>
        </div>
        
        <h2 className={`font-light italic transition-all duration-300 ${
          scrolled ? 'text-sm' : 'text-xl'
        } text-rose-600`}>
          {subtitle}
        </h2>
      </div>
    </header>
  );
};

export default Header;
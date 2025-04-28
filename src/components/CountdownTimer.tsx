import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, isComplete, timeLeft]);

  return (
    <section id="countdown" className="my-16 text-center relative overflow-hidden py-12">
      {/* Decorative elements */}
      <div className="absolute -left-20 top-0 w-40 h-40 rounded-full bg-rose-100 opacity-50"></div>
      <div className="absolute -right-20 bottom-0 w-60 h-60 rounded-full bg-amber-100 opacity-50"></div>
      
      <h2 className="text-3xl sm:text-4xl font-serif text-rose-700 mb-8 relative z-10">
        {isComplete ? "Our Special Day is Here!" : "Counting Down to Our Special Day"}
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 relative z-10">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </div>
      
      {isComplete && (
        <div className="mt-8 animate-fade-in">
          <p className="text-xl text-rose-600 font-serif">It's our wedding day! 💍</p>
        </div>
      )}
    </section>
  );
};

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => {
  // Add useEffect for flip animation
  const [animate, setAnimate] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    if (displayValue !== value) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setAnimate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 perspective relative">
        <div className={`w-full h-full relative ${animate ? 'animate-flip' : ''}`}>
          <div className="absolute w-full h-full bg-white rounded-lg shadow-md border border-amber-100 flex items-center justify-center transform-style-preserve-3d">
            <span className="text-2xl sm:text-3xl font-serif text-rose-700">
              {displayValue.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
      <span className="mt-2 text-sm text-rose-600">{label}</span>
    </div>
  );
};

export default CountdownTimer;
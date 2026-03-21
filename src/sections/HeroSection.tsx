'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-27T20:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVoteNow = () => {
    const element = document.querySelector('#voter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden pt-16"
      style={{
        backgroundImage: 'url("hero.jpg")',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>
      
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center z-10 text-center mt-8 md:mt-12">
        {/* Logo plus discret */}
        <div className="mb-8 md:mb-12">
          <a
            href="#accueil"
            onClick={(e) => scrollToSection(e, '#accueil')}
            className="cursor-pointer inline-block transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Logo E-Vote"
              width={180}
              height={72}
              className="object-contain max-h-[60px] md:max-h-[80px] w-auto h-auto"
            />
          </a>
        </div>

        {/* Countdown Timer dimensionné plus finement */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {[
            { label: 'JOURS', value: timeLeft.days },
            { label: 'HEURES', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDES', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute -inset-1 bg-green-500/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl w-18 h-18 sm:w-26 sm:h-26 transition-all duration-500 hover:border-white/10 hover:bg-white/10 shadow-xl">
                <span className="font-mono text-xl sm:text-4xl font-bold text-green-400 tracking-tighter">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[7px] sm:text-[9px] text-gray-400 tracking-[0.2em] mt-1 font-medium">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RDV Badge plus fine */}
        <div className="inline-flex items-center px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm mb-12">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2.5"></span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-white/90 tracking-[0.15em] uppercase">
            RDV LE 27 MARS 2026
          </span>
        </div>
        
        {/* CTA Button - Plus compact, bords carrés et discret */}
        <div className="w-full max-w-[280px] sm:max-w-xs mx-auto">
          <button
            onClick={handleVoteNow}
            className="group w-full flex items-center justify-between px-6 py-4 bg-green-600 text-white font-bold transition-all duration-300 transform hover:bg-green-700 shadow-lg active:scale-95 border-b-2 border-green-800"
          >
            <span className="text-sm sm:text-base tracking-widest uppercase">
              Je m&apos;engage à voter
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

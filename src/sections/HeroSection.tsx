'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';


const HeroSection = () => {
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
        top: element.offsetTop - 80, // Account for header height
        behavior: 'smooth'
      });
      // setActiveSection(sectionId);
      // setIsMobileMenuOpen(false);
    }
  };
  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat pt-24 md:pt-32"
      style={{
        backgroundImage: 'url("hero.jpg")',
        backgroundSize: '120% auto',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay',
        paddingTop: '6rem' /* Pour compenser le header fixe */
      }}
    >
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative container mx-auto px-4 text-center z-10 pt-4 md:pt-6">
        <div className="mb-8 md:mb-12">
          {/* <h1 className="text-6xl md:text-8xl font-extrabold mb-2">
            <span className="font-serif italic text-green-400 drop-shadow-lg">VOTE</span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 ml-24 md:ml-32">
            <span className="font-sans italic text-green-600">party !</span>
          </h2> */}

          <a
  href="#accueil"
  onClick={(e) => scrollToSection(e, '#accueil')}
  className="cursor-pointer flex justify-center"
>
  <Image
    src="/logo.png"
    alt="Logo E-Vote"
    width={400}
    height={160}
    className="
      object-contain
      transition-transform duration-300 hover:scale-105
      max-h-[200px] md:max-h-[250px] lg:max-h-[300px]
      w-auto h-auto
      mx-auto
    "
  />
</a>


          
          <div className="flex items-center justify-center space-x-8 text-2xl md:text-4xl font-bold text-white mb-6">
            <span className="hover:text-green-300 transition-colors duration-300">DJ SET</span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="hover:text-green-300 transition-colors duration-300">TOMBOLA</span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="hover:text-green-300 transition-colors duration-300">BBQ</span>
          </div>
          
          <div className="text-xl md:text-2xl text-gray-200 font-light tracking-wider mb-8">
            MIX: DJ FAMOUZ, DJVBI, YANN LE KILLER
          </div>
          
          <div className="text-2xl md:text-3xl text-white font-medium mb-2">
            13h00 - 23h00
          </div>
          <div className="text-xl text-white/90 font-light mb-8">
            11 JANVIER • DIMANCHE
          </div>
          
          <div className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Une boisson offerte sur présentation d&apos;une preuve de vote
          </div>
        </div>
        
        {/* Zone 5 EN BAR avec Entrée gratuite */}
        <div className="w-full max-w-md mx-auto mb-12 md:mb-16">
          <div className="relative w-full">
            <div className="bg-black text-white text-xl md:text-2xl font-bold py-3 px-6 w-full text-center">
              ZONE 5 BAR
            </div>
            <div className="absolute -top-2 -right-2 bg-green-400 text-green-900 text-base md:text-lg font-bold py-1.5 px-3 rounded-full transform rotate-6 whitespace-nowrap">
              ENTREE GRATUITE
            </div>
          </div>
        </div>
        
        <div className="w-full px-4 mb-16">
          <button
            onClick={handleVoteNow}
            className="group w-full max-w-md mx-auto flex items-center justify-center px-8 py-5 bg-green-600 text-white font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-xl"
          >
            Je m&apos;engage à voter 
            <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

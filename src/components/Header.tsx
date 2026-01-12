'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { NAV_ITEMS, NavItem } from '@/data/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  // Gestion du scroll pour l'ombre du header et la section active
  useEffect(() => {
    const handleScroll = () => {
      // Update header shadow
      setIsScrolled(window.scrollY > 10);
      
      // Find which section is currently in view
      const sections = ['accueil', 'partis', 'voter', 'resultats'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for header height
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-lg backdrop-blur-sm'
          : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <a href="#accueil" onClick={(e) => scrollToSection(e, '#accueil')} className="cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="Logo E-Vote" 
              width={200} 
              height={80}
              className="w-24 h-24 object-contain -mt-2 -mb-2 hover:opacity-90 transition-opacity"
            />
          </a>
          {/* <a 
            href="#accueil" 
            onClick={(e) => scrollToSection(e, '#accueil')}
            className="text-1xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            Je suis jeune, je m'engage
          </a> */}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation de gauche */}
          <div className="flex items-center space-x-6">
            {NAV_ITEMS.filter(item => item.position === 'left').map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors relative ${isActive ? 'text-green-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {item.name}
                  {isActive && (
                    <span 
                      className="absolute left-3 right-3 -bottom-1 h-0.5 bg-green-600 transition-all duration-300"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Bouton à droite */}
          <div className="flex items-center space-x-4">
            {NAV_ITEMS.filter(item => item.position === 'right').map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={item.className || 'px-4 py-2 text-sm font-medium transition-colors'}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 z-50 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          } transition-opacity duration-300 ease-in-out`}
        >
          {/* Menu Panel with Overlay */}
          <div 
            className={`fixed inset-0 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div 
              className={`
                absolute top-0 right-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl transform
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                transition-transform duration-300 ease-in-out flex flex-col
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 pb-8">
                <div className="flex flex-col space-y-2">
                  {NAV_ITEMS.filter(item => item.position !== 'right').map((item) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          scrollToSection(e, item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-green-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                  
                  {/* Bouton "Je m'engage à voter" en bas du menu mobile */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {NAV_ITEMS.filter(item => item.position === 'right').map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          scrollToSection(e, item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`${item.className} w-full flex justify-center py-3 rounded-lg text-lg font-medium transition-colors duration-200`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { PilotModal } from './PilotModal';

export function OmniNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pilotModalOpen, setPilotModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Threats', href: '#threats' },
    { label: 'Technology', href: '#technology' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Security', href: '#trust' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-omni-black/90 backdrop-blur-lg border-b border-gray-800/50' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-omni-violet to-omni-indigo flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Omni</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setPilotModalOpen(true)}
              className="px-6 py-2.5 bg-omni-violet hover:bg-omni-violet/80
                         text-white font-medium rounded-lg transition-all"
            >
              Request Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-omni-black border-t border-gray-800/50">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPilotModalOpen(true);
              }}
              className="block w-full text-center px-6 py-3 bg-omni-violet hover:bg-omni-violet/80
                         text-white font-medium rounded-lg transition-all mt-4"
            >
              Request Access
            </button>
          </div>
        </div>
      )}

      {/* Pilot Modal */}
      <PilotModal isOpen={pilotModalOpen} onClose={() => setPilotModalOpen(false)} />
    </nav>
  );
}

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ChevronUp } from 'lucide-react';
import { openInstagramProfile, getInstagramUniversalLink } from '@/utils/instagram';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-white/5">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-4">
              <div className="relative w-14 h-14 -mr-2">
                <Image
                  src="/images/logo_transparent.png"
                  alt="Atölye Ağaçkakan"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-primary">Atölye</span>
                <span className="block font-serif text-xs tracking-[0.2em] uppercase text-text-secondary">Ağaçkakan</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              El yapımı yaylı çalgıların ustalıkla buluştuğu yer. Geleneksel teknikler, modern estetik.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-serif text-primary text-lg mb-4">Hızlı Erişim</h4>
            <nav className="flex flex-col items-center gap-2">
              <Link href="#home" className="text-text-secondary hover:text-primary transition-colors text-sm">
                Ana Sayfa
              </Link>
              <Link href="#calgilar" className="text-text-secondary hover:text-primary transition-colors text-sm">
                Portfolyo
              </Link>
              <Link href="#hakkimda" className="text-text-secondary hover:text-primary transition-colors text-sm">
                Hakkımda
              </Link>
              <Link href="#iletisim" className="text-text-secondary hover:text-primary transition-colors text-sm">
                İletişim
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="font-serif text-primary text-lg mb-4">Takip Edin</h4>
            <div className="flex items-center gap-4">
              <a
                href={getInstagramUniversalLink('atolye_agackakann')}
                onClick={(e) => openInstagramProfile('atolye_agackakann', e as any)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
                data-cursor-hover="true"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} Atölye Ağaçkakan. Tüm hakları saklıdır.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-xs group"
            data-cursor-hover="true"
          >
            <span>Yukarı Çık</span>
            <ChevronUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import Link from 'next/link';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-text-secondary text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Atölye Ağaçkakan. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/atolye_agackakann/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-text-secondary hover:text-primary transition-colors duration-300"
            data-cursor-hover="true"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
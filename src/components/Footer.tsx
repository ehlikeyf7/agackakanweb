import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-surface">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-text-primary/70">
          <p className="text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} Atölye Ağaçkakan. Tüm hakları saklıdır.
          </p>
          <div className="flex mt-4 md:mt-0">
            <Link href="https://www.instagram.com/atolye_agackakann/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 hover:text-primary transition-colors">
              Instagram
            </Link>
            {/* Add other social media links here if you have them */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
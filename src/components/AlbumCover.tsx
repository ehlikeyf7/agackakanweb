import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface AlbumCoverProps {
  title: string;
  coverImage: string;
  backImage1?: string; // Artık kullanılmayacak ama interface uyumu için tutuyoruz
  backImage2?: string; // Artık kullanılmayacak
  onClick: () => void;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ title, coverImage, onClick }) => {
  const BLUR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMyMjInLz48L3N2Zz4=';

  return (
    <motion.div
      className="w-full group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface/50 mb-3 sm:mb-6">
        <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        <Image
          src={coverImage}
          alt={`Kapak fotoğrafı: ${title}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transform group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale-[20%] group-hover:grayscale-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR}
        />

        {/* Overlay Button */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Title & Info */}
      <div className="flex flex-col items-start space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <div className="h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
        <p className="text-sm text-text-secondary uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          İncele
        </p>
      </div>
    </motion.div>
  );
};

export default AlbumCover;
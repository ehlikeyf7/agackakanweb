"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ArrowLeft } from 'lucide-react';

interface Album {
  name: string;
  description: string;
  images: string[];
  cover: string;
}

interface AlbumModalProps {
  album: Album;
  onClose: () => void;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ album, onClose }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Klavye kontrolleri
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedMediaIndex !== null) setSelectedMediaIndex(null);
        else onClose();
      }
      if (selectedMediaIndex !== null) {
        if (e.key === 'ArrowLeft') paginate(-1);
        if (e.key === 'ArrowRight') paginate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMediaIndex, onClose]);

  const paginate = (newDirection: number) => {
    if (selectedMediaIndex === null) return;
    const newIndex = (selectedMediaIndex + newDirection + album.images.length) % album.images.length;
    setSelectedMediaIndex(newIndex);
  };

  const isVideo = (path: string) => {
    return path?.toLowerCase().endsWith('.mov') || path?.toLowerCase().endsWith('.mp4');
  };

  const selectedMedia = selectedMediaIndex !== null ? album.images[selectedMediaIndex] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background overflow-y-auto"
        ref={modalRef}
      >
        {/* Navbar benzeri üst bar */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/5 px-4 py-4 md:px-8 flex justify-between items-center shadow-sm pt-safe-top">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surface/50"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Galeriye Dön</span>
          </button>

          <h2 className="text-xl font-serif text-center hidden md:block text-primary">{album.name}</h2>

          <div className="w-24" /> {/* Denge için boşluk */}
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          {/* Mobil Başlık */}
          <div className="md:hidden mb-6 text-center">
            <h2 className="text-2xl font-serif text-primary mb-2">{album.name}</h2>
            <p className="text-sm text-text-secondary">{album.description}</p>
          </div>

          {/* Grid Galeri (Daha düzenli ve anlaşılır) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {album.images.map((media, index) => (
              <motion.div
                key={media}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="aspect-square relative group cursor-pointer rounded-lg overflow-hidden bg-surface border border-white/5 hover:border-primary/30 transition-colors focus-within:ring-2 focus-within:ring-primary/70"
                onClick={() => setSelectedMediaIndex(index)}
              >
                {isVideo(media) ? (
                  <video
                    src={media}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={media}
                    alt={`${album.name} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-100 md:bg-black/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox (Tam Ekran Görüntüleyici) */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/98 flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {/* Lightbox Üst Bar */}
              <div className="flex justify-between items-center p-4 text-white/80">
                <span className="text-sm font-mono">
                  {selectedMediaIndex! + 1} / {album.images.length}
                </span>
                <button
                  onClick={() => setSelectedMediaIndex(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Görüntüyü kapat"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Ana Görüntü Alanı */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden px-2 md:px-12">
                {/* Sol Ok */}
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-2 md:left-4 p-2.5 md:p-3 rounded-full bg-black/30 md:bg-white/5 hover:bg-white/20 text-white transition-all z-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Önceki görsel"
                >
                  <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
                </button>

                <motion.div
                  key={selectedMedia}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {isVideo(selectedMedia) ? (
                    <video
                      src={selectedMedia}
                      controls
                      autoPlay
                      className="max-w-full max-h-full rounded shadow-2xl"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedMedia}
                        alt={`${album.name} - ${selectedMediaIndex! + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  )}
                </motion.div>

                {/* Sağ Ok */}
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-2 md:right-4 p-2.5 md:p-3 rounded-full bg-black/30 md:bg-white/5 hover:bg-white/20 text-white transition-all z-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Sonraki görsel"
                >
                  <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
                </button>
              </div>

              {/* Alt Thumbnail Şeridi (Kullanıcı Dostu Navigasyon) */}
              <div className="h-20 md:h-24 bg-black/50 border-t border-white/10 flex items-center gap-2 px-4 overflow-x-auto snap-x">
                {album.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMediaIndex(idx)}
                    aria-label={`${idx + 1}. görsele geç`}
                    className={`relative flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded overflow-hidden transition-all ${selectedMediaIndex === idx
                      ? 'ring-2 ring-primary opacity-100 scale-105'
                      : 'opacity-40 hover:opacity-100'
                      }`}
                  >
                    {isVideo(img) ? (
                      <video src={img} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlbumModal;
"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithSkeleton from './ImageWithSkeleton';
import ScrollToTopButton from './ScrollToTopButton';
import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

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

const zoomVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15
    }
  },
};

const AlbumModal: React.FC<AlbumModalProps> = ({ album, onClose }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const modalRef = useRef(null);

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
    <>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-surface/90 backdrop-blur-sm z-50 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: 0, opacity: selectedMediaIndex !== null ? 0 : 1 }}
          exit={{ y: "100vh" }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, opacity: { duration: 0.2 } }}
          className="relative bg-surface min-h-screen"
        >
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">{album.name}</h2>
            <p className="text-lg text-center text-text-primary/70 mb-12 max-w-3xl mx-auto">{album.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.images.map((media, index) => (
                <motion.div
                  key={media}
                  layoutId={media}
                  data-cursor-hover="true"
                  className="bg-background rounded-lg shadow-lg overflow-hidden cursor-pointer group focusable relative aspect-square"
                  onClick={() => setSelectedMediaIndex(index)}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedMediaIndex(index) }}
                >
                  {isVideo(media) ? (
                    <>
                      <video
                        src={media}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 opacity-70 group-hover:opacity-100">
                        <PlayCircle className="w-16 h-16 text-white/80" />
                      </div>
                    </>
                  ) : (
                    <ImageWithSkeleton src={media} alt={`${album.name} - ${index + 1}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.button
          onClick={onClose}
          data-cursor-hover="true"
          animate={{ opacity: selectedMediaIndex !== null ? 0 : 1, transition: { duration: 0.2 } }}
          className="absolute top-5 right-5 bg-background/50 rounded-full text-text-primary text-3xl w-12 h-12 flex items-center justify-center font-bold hover:bg-primary hover:text-white transition z-[60] focusable"
          aria-label="Close"
          whileHover={{ scale: 1.1, rotate: 90 }}
        >
          &times;
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            key={selectedMediaIndex}
            variants={zoomVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex justify-center items-center z-[100] p-4 bg-black/80"
            onClick={() => setSelectedMediaIndex(null)}
          >
             <button
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 p-2 rounded-full text-white focusable transition"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.div
              layoutId={selectedMedia}
              className="relative w-auto h-auto max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(selectedMedia) ? (
                <video src={selectedMedia} controls autoPlay muted className="w-auto h-auto max-w-full max-h-[95vh] rounded-lg bg-black" />
              ) : (
                <Image src={selectedMedia} alt="Büyük boy enstrüman fotoğrafı" width={1600} height={1000} className="w-auto h-auto max-w-full max-h-[95vh] rounded-lg" />
              )}
            </motion.div>
             <button
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 p-2 rounded-full text-white focusable transition"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={() => setSelectedMediaIndex(null)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-4xl bg-black/30 rounded-full w-10 h-10 flex items-center justify-center z-[110] hover:bg-black/60 transition-colors focusable"
              aria-label="Kapat"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTopButton targetRef={modalRef} />
    </>
  );
};

export default AlbumModal; 
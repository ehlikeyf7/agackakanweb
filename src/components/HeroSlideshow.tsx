"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlideshowProps {
  images: string[];
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [index, images.length]);

  return (
    <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full shadow-2xl overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Atölye Ağaçkakan Yapım Süreci"
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroSlideshow; 
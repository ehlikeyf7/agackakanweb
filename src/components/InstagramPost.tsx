"use client";

import { useState, useRef, useEffect } from 'react';
import { Instagram, Play, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface InstagramPostProps {
  videoSrc?: string;
  postUrl: string;
  username: string; // Kept for compatibility but might not display prominently
  description: string;
  isMobile?: boolean;
  posterSrc?: string;
}

const InstagramPost = ({ videoSrc, postUrl, username, description, isMobile = false, posterSrc }: InstagramPostProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const openInstagramProfile = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Universal link logic or just simple window.open
    window.open(postUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Mobile autoplay logic
  useEffect(() => {
    if (isMobile && videoRef.current) {
      const video = videoRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(video);
      return () => observer.unobserve(video);
    }
  }, [isMobile]);

  return (
    <motion.div
      className="group relative w-full h-full aspect-[4/5] overflow-hidden rounded-xl bg-surface cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={openInstagramProfile}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Video Layer */}
      <div className="absolute inset-0 bg-black">
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Center Icon (Play / Instagram) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          <Instagram size={32} strokeWidth={1.5} />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">Instagram</span>
          <ArrowUpRight size={16} className="text-white/70" />
        </div>
        <p className="text-white font-serif text-lg leading-snug line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default InstagramPost;
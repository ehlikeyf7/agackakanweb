"use client";

import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Instagram, ArrowUpRight, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface InstagramPostProps {
  videoSrc?: string;
  postUrl: string;
  username: string; // Kept for compatibility but might not display prominently
  description: string;
  isMobile?: boolean;
  posterSrc?: string;
}

const InstagramPost = ({ videoSrc, postUrl, description, isMobile = false, posterSrc }: InstagramPostProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoadedPreview, setHasLoadedPreview] = useState(false);

  useEffect(() => {
    setHasLoadedPreview(false);
    videoRef.current?.load();
  }, [videoSrc]);

  const playVideo = async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pauseVideo = (reset = false) => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    if (reset) videoRef.current.currentTime = 0.1;
    setIsPlaying(false);
  };

  const handleMouseEnter = () => {
    if (!isMobile) playVideo();
  };

  const handleMouseLeave = () => {
    if (!isMobile) pauseVideo(true);
  };

  const handleToggleVideo = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleVideo();
    }
  };

  const handleInstagramClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${description} videosunu oynat veya duraklat`}
      className="group relative block w-full h-full aspect-[4/5] overflow-hidden rounded-xl bg-surface cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleVideo}
      onKeyDown={handleKeyDown}
      whileHover={isMobile ? undefined : { y: -5 }}
      transition={{ duration: 0.3 }}
      data-cursor-hover="true"
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
            poster={posterSrc || undefined}
            className={`w-full h-full object-cover transition-opacity duration-700 ${hasLoadedPreview || isPlaying ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`}
            onLoadedMetadata={() => {
              if (videoRef.current && !posterSrc) {
                videoRef.current.currentTime = 0.1;
              }
            }}
            onLoadedData={() => setHasLoadedPreview(true)}
            onSeeked={() => setHasLoadedPreview(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>
      {!hasLoadedPreview && !posterSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#21170f] via-black to-[#050505]" />
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-75 group-hover:opacity-55 transition-opacity duration-500" />

      {/* Center Icon (Play / Instagram) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          {isPlaying ? <Pause size={28} strokeWidth={1.5} /> : <Play size={28} strokeWidth={1.5} className="ml-1" />}
        </div>
      </div>

      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${description} gönderisini Instagram'da aç`}
        onClick={handleInstagramClick}
        className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/80 backdrop-blur-md transition-colors hover:text-primary"
      >
        <Instagram size={18} strokeWidth={1.7} />
      </a>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center justify-between mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">Video</span>
          <ArrowUpRight size={16} className="text-white/70" />
        </div>
        <p className="text-white font-serif text-base sm:text-lg leading-snug line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default InstagramPost;
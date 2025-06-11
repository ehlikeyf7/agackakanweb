"use client";

import { useState, useRef, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';

interface InstagramPostProps {
  videoSrc?: string;
  imageSrc?: string;
  postUrl: string;
  username: string;
  description: string;
  isMobile?: boolean;
  posterSrc?: string;
}

const InstagramPost = ({ videoSrc, imageSrc, postUrl, username, description, isMobile = false, posterSrc }: InstagramPostProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isMobile && videoRef.current) {
      const video = videoRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(error => console.error("Video autoplay failed:", error));
          } else {
            video.pause();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(video);

      return () => {
        if (video) {
          observer.unobserve(video);
        }
      };
    }
  }, [isMobile]);


  return (
    <div 
      className="flex flex-col h-full w-full bg-surface/50 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border border-accent/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="p-3 border-b border-accent/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5">
              <div className="bg-background h-full w-full rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-text-primary" />
              </div>
          </div>
          <a href={postUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-text-primary hover:underline">
            @{username}
          </a>
        </div>
      </div>
      
      {/* Video or Image */}
      <a href={postUrl} target="_blank" rel="noopener noreferrer" className="block cursor-pointer aspect-square relative bg-black">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted
            playsInline
            poster={posterSrc}
            className="w-full h-full object-cover"
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={description}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 300px, 33vw"
          />
        ) : null}
      </a>

      {/* Footer Icons & Description */}
      <div className="p-3 mt-auto space-y-3 flex-grow flex flex-col justify-end">
        <div className="flex items-center gap-4 text-text-secondary">
          <Heart className="w-6 h-6 hover:text-red-500 transition-colors" />
          <MessageCircle className="w-6 h-6 hover:text-text-primary transition-colors" />
          <Send className="w-6 h-6 hover:text-text-primary transition-colors" />
        </div>
        <div className="text-sm text-text-primary">
            <a href={postUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">@{username}</a>
            <span className="ml-2">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default InstagramPost; 
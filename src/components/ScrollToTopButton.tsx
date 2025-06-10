'use client';

import { useEffect, useState, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopButtonProps {
  targetRef?: RefObject<HTMLElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ targetRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetElement = targetRef?.current || window;
    const scrollContainer = targetRef?.current || document.documentElement;

    const toggleVisibility = () => {
      if (scrollContainer.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    targetElement.addEventListener('scroll', toggleVisibility);
    return () => {
      targetElement.removeEventListener('scroll', toggleVisibility);
    };
  }, [targetRef]);

  const scrollToTop = () => {
    const scrollContainer = targetRef?.current || window;
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          data-cursor-hover="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 bg-primary/80 backdrop-blur-sm text-background w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-colors z-[60] focusable"
          aria-label="Yukarı çık"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton; 
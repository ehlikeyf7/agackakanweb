'use client';

import { useState, useEffect } from 'react';
import { motion, MotionStyle } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
        if (e.target instanceof Element && e.target.closest('[data-cursor-hover="true"]')) {
            setIsHovering(true);
        }
    };

    const handleMouseOut = (e: MouseEvent) => {
        if (e.target instanceof Element && e.target.closest('[data-cursor-hover="true"]')) {
            setIsHovering(false);
        }
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: '#C0A080', // primary color
    },
    hover: {
        height: 64,
        width: 64,
        scale: 1.2,
        backgroundColor: '#FFFFFF',
    },
  };
  
  const cursorStyle: MotionStyle = {
      mixBlendMode: 'difference',
      x: position.x - (isHovering ? 32 : 16),
      y: position.y - (isHovering ? 32 : 16),
  }

  const dotVariants = {
    default: {
        x: position.x - 4,
        y: position.y - 4,
        backgroundColor: '#C0A080', // primary color
    },
  }

  return (
    <>
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
            variants={cursorVariants}
            style={cursorStyle}
            animate={isHovering ? 'hover' : 'default'}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.div 
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
            variants={dotVariants}
            animate="default"
            transition={{ type: 'spring', stiffness: 800, damping: 30 }}
        />
    </>
  );
};

export default CustomCursor; 
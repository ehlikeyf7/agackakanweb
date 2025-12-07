import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    isScrolled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

export const Logo = ({
    className = "",
    isScrolled = false,
    size = 'md',
    showText = true
}: LogoProps) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10 md:w-14 md:h-14',
        lg: 'w-16 h-16 md:w-20 md:h-20'
    };

    const textSizeClasses = {
        sm: { title: 'text-base', subtitle: 'text-[10px]' },
        md: { title: 'text-lg md:text-xl', subtitle: 'text-[10px] md:text-xs' },
        lg: { title: 'text-2xl md:text-3xl', subtitle: 'text-xs md:text-sm' }
    };

    return (
        <div className={`flex items-center ${className}`}>
            {/* Logo Image - Transparent */}
            <motion.div
                className={`relative ${sizeClasses[size]} flex items-center justify-center flex-shrink-0 -mr-1`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Image
                    src="/images/logo_transparent.png"
                    alt="Atölye Ağaçkakan Logo"
                    fill
                    className="object-contain drop-shadow-[0_2px_8px_rgba(192,160,128,0.5)]"
                    sizes="(max-width: 768px) 40px, 56px"
                    priority
                />
            </motion.div>

            {/* Text */}
            {showText && (
                <div className="flex flex-col">
                    <span className={`font-serif ${textSizeClasses[size].title} leading-none tracking-wide font-bold transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                        Atölye
                    </span>
                    <span className={`font-serif ${textSizeClasses[size].subtitle} leading-tight tracking-[0.15em] uppercase opacity-80 transition-colors duration-300 ${isScrolled ? 'text-text-primary' : 'text-gray-300'}`}>
                        Ağaçkakan
                    </span>
                </div>
            )}
        </div>
    );
};

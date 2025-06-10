import Image from 'next/image';
import { motion } from 'framer-motion';

interface AlbumCoverProps {
  title: string;
  coverImage: string;
  onClick: () => void;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ title, coverImage, onClick }) => {
  return (
    <motion.div
      className="relative rounded-lg shadow-xl overflow-hidden cursor-pointer group h-80 md:h-96"
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { y: 0 },
        hover: { y: -8 },
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div className="absolute inset-0 overflow-hidden">
      <Image 
        src={coverImage} 
        alt={`Kapak fotoğrafı: ${title}`} 
        fill 
        style={{ objectFit: 'cover' }} 
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
      />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
        <motion.h3 
            className="text-3xl font-serif text-white tracking-wide drop-shadow-md"
            variants={{
                rest: { opacity: 0.8, y: 10 },
                hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {title}
        </motion.h3>
      </div>
    </motion.div>
  );
};

export default AlbumCover; 
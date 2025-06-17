import Image from 'next/image';
import { motion } from 'framer-motion';

interface AlbumCoverProps {
  title: string;
  coverImage: string;
  backImage1?: string;
  backImage2?: string;
  onClick: () => void;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ title, coverImage, backImage1, backImage2, onClick }) => {
  return (
    <motion.div
      className="w-full flex justify-center py-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div
        onClick={onClick}
        className="relative group cursor-pointer h-80 md:h-96 w-[90%] transition-transform duration-300 ease-in-out hover:-translate-y-2"
      >
        {/* Arka Kart 1 */}
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-surface transform -rotate-6 overflow-hidden">
          {backImage1 && (
            <Image src={backImage1} alt="" fill style={{ objectFit: 'cover' }} className="opacity-50" />
          )}
        </div>
        {/* Arka Kart 2 */}
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-surface transform rotate-6 overflow-hidden">
           {backImage2 && (
            <Image src={backImage2} alt="" fill style={{ objectFit: 'cover' }} className="opacity-50" />
          )}
        </div>
        
        {/* Ana Kart */}
        <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
      <Image 
        src={coverImage} 
        alt={`Kapak fotoğrafı: ${title}`} 
        fill 
        style={{ objectFit: 'cover' }} 
        className="group-hover:scale-105 transition-transform duration-500"
      />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
            <h3 className="text-3xl font-serif text-white tracking-wide drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumCover; 
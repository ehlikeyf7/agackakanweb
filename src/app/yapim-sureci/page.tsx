"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const processImages = [
  // This list is created from the files you provided.
  // Note: File names with special characters or spaces might need encoding, but these look fine.
  '0608 (1)(1).jpg', '0608 (1).jpg', '1.JPG', '2.jpg', '3.jpg', '4.jpg', '5.jpg', 
  '6.jpg', '7 (2).JPG', '7.JPG', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', 
  '13.jpg', '14.jpg', '15 (2).jpg', '15.jpg', '16.JPG', '17.JPEG', '18.JPG', 
  '19.jpg', '20.jpg', '21.jpg', '22.jpg', 'IMG_2983.JPG', 'IMG_E2898.JPG', 
  'KYDP2727.JPG', 'NFJK6531.JPG'
].map(img => `/images/yapim_asamasi/${img}`);

const ProcessPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-surface py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">Yapım Süreci</h1>
        <p className="text-lg text-center text-text-primary/80 mt-4 mb-12 max-w-2xl mx-auto">
          Bir enstrümanın hayata geliş hikayesi... Ham ağaçtan atölyedeki son notasına kadar olan yolculuğunu gösteren anlar.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {processImages.map((image, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-lg shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative w-full aspect-square">
                 <Image src={image} alt={`Yapım Aşaması ${index + 1}`} fill style={{ objectFit: 'cover' }} className="group-hover:scale-110 transition-transform duration-500"/>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Büyük boy yapım aşaması fotoğrafı" width={1200} height={800} className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-background rounded-full text-text-primary text-3xl w-10 h-10 flex items-center justify-center font-bold hover:bg-surface transition"
              aria-label="Close"
            >
              &times;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProcessPage; 
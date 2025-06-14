"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HakkimdaModalProps {
  onClose: () => void;
}

const HakkimdaModal: React.FC<HakkimdaModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-surface/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
                <Image 
                    src="/images/yapim_asamasi/1.JPG"
                    alt="Hasan Aşıroğlu - Luthier"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-all duration-500"
                />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-serif text-primary mb-6">
                  Hakkımda
                </h2>
                <div className="space-y-4 text-text-secondary font-serif text-left">
                  <p>
                    Merhaba, ben Hasan. Çalgı yapımına olan tutkum, küçük yaşlarda
                    amcamın bağlama yapım atölyesi olan Güven Saz Evi&apos;nde
                    filizlendi. Çocukluk yıllarımın ve tatillerimin büyük bir kısmını
                    bu atölyenin büyülü atmosferinde, ahşabın ve müziğin birleştiği o
                    eşsiz dünyayı keşfederek geçirdim.
                  </p>
                  <p>
                    Lise eğitimimin ardından bu tutkumu akademik bir kariyere
                    dönüştürmeye karar verdim ve Zonguldak Bülent Ecevit Üniversitesi
                    Devlet Konservatuvarı&apos;nda Yaylı Çalgılar Yapımı Bölümü&apos;ne
                    başladım. 2010-2014 yılları arasında tamamladığım bu eğitimle,
                    bölümün ilk mezunlarından biri olma onurunu yaşadım.
                  </p>
                  <p>
                    Mezuniyetimin ardından, tutkuyla bağlı olduğum yaylı çalgıların yapımı, onarımı ve 
                    bakımına odaklanarak sanatımı icra etmeye devam ediyorum.
                  </p>
                </div>
            </div>
        </div>

        <motion.button
          onClick={onClose}
          data-cursor-hover="true"
          className="absolute top-4 right-4 bg-background/50 rounded-full text-text-primary text-3xl w-10 h-10 flex items-center justify-center font-bold hover:bg-primary hover:text-white transition z-50 focusable"
          aria-label="Kapat"
          whileHover={{ scale: 1.1, rotate: 90 }}
        >
          &times;
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HakkimdaModal; 
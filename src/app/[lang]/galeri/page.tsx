"use client";

import { useState } from "react";
import Image from 'next/image';

const instruments = [
  {
    id: 1,
    title: 'Model "Stradivarius"',
    description: 'Klasik İtalyan ekolünden ilham alan, zengin ve parlak tonlara sahip bir keman.',
    imageUrl: 'https://images.unsplash.com/photo-1612225332248-a9ce9af3441f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Model "Guarneri"',
    description: 'Derin ve güçlü ses karakteriyle öne çıkan, solo performanslar için ideal bir enstrüman.',
    imageUrl: 'https://images.unsplash.com/photo-1582294209598-12d6a3773504?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Modern Tasarım Viyola',
    description: 'Geleneksel formların dışına çıkan, ergonomik ve estetik bir tasarıma sahip viyola.',
    imageUrl: 'https://images.unsplash.com/photo-1605018600133-1b96d934b3f2?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Barok Keman',
    description: 'Tarihi performans pratiklerine uygun olarak otantik materyallerle üretilmiştir.',
    imageUrl: 'https://images.unsplash.com/photo-1598154151493-238435767d64?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Beş Telli Çello',
    description: 'Geniş bir ses aralığı sunan, hem klasik hem de çağdaş müzik için uygun beş telli model.',
    imageUrl: 'https://images.unsplash.com/photo-1585258322421-344c3319a073?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Özel Sipariş Keman',
    description: 'Müzisyenin istekleri ve fiziksel özelliklerine göre kişiye özel olarak tasarlanmıştır.',
    imageUrl: 'https://images.unsplash.com/photo-1558983182-34383a54d4e2?q=80&w=1974&auto=format&fit=crop',
  },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-surface py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">Galerim</h1>
        <p className="text-lg text-center text-text-primary/80 mt-4 mb-12 max-w-2xl mx-auto">
          Tamamlanmış eserlerimden bir seçki. Her biri, saatler süren emeğin ve tutkunun birer meyvesidir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instruments.map((instrument) => (
            <div
              key={instrument.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(instrument.imageUrl)}
            >
              <div className="relative w-full h-72">
                 <Image src={instrument.imageUrl} alt={instrument.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary">{instrument.title}</h2>
                <p className="mt-2 text-text-primary/80">{instrument.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Enlarged instrument" width={1200} height={800} className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-background rounded-full p-1 text-text-primary text-3xl w-10 h-10 flex items-center justify-center font-bold hover:bg-surface transition"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
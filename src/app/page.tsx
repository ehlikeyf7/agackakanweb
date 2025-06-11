"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import toast from 'react-hot-toast';
import AlbumCover from '@/components/AlbumCover';
import AlbumModal from '@/components/AlbumModal';
import HakkimdaModal from '@/components/HakkimdaModal';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import InstagramPost from '@/components/InstagramPost';
import { ChevronUp, Mail, Instagram as InstagramIcon } from "lucide-react";
import { FaArrowDown } from 'react-icons/fa';

interface AlbumData {
  name: string;
  images: string[];
  cover: string;
}

const albums: AlbumData[] = [
  {
    name: "2024 Messiah",
    images: [
      "/images/2024_messiah/1.png",
      "/images/2024_messiah/2.png",
      "/images/2024_messiah/3.png",
      "/images/2024_messiah/A4 (2).png",
      "/images/2024_messiah/A4 (3).png",
      "/images/2024_messiah/A4 (4).png",
      "/images/2024_messiah/IMG_3140.jpeg",
      "/images/2024_messiah/DHGA5340.mp4",
    ],
    cover: "/images/2024_messiah/A4 (3).png",
  },
  {
    name: "Cello",
    images: [
      "/images/cello/IMG_0179.JPG",
      "/images/cello/IMG_0180.JPG",
      "/images/cello/IMG_0202.JPG",
      "/images/cello/IMG_0265.JPG",
      "/images/cello/IMG_0423.JPG",
      "/images/cello/IMG_0443.JPG",
      "/images/cello/IMG_0454.JPG",
      "/images/cello/IMG_0498.JPG",
      "/images/cello/IMG_0500.JPG",
      "/images/cello/IMG_0658.JPG",
      "/images/cello/IMG_0661.JPG",
      "/images/cello/IMG_0678.JPG",
      "/images/cello/IMG_0679.JPG",
      "/images/cello/IMG_0681.JPG",
      "/images/cello/IMG_0686.JPG",
      "/images/cello/IMG_0687.JPG",
      "/images/cello/IMG_0691.JPG",
      "/images/cello/IMG_1034.JPG",
      "/images/cello/IMG_1071.JPG",
      "/images/cello/IMG_1075.JPG",
      "/images/cello/IMG_1077.JPG",
      "/images/cello/IMG_1088.JPG",
      "/images/cello/IMG_1095.JPG",
      "/images/cello/IMG_1132.JPG",
      "/images/cello/IMG_1133.JPG",
      "/images/cello/IMG_1144.JPG",
      "/images/cello/IMG_1145.JPG",
      "/images/cello/IMG_1203.JPG",
      "/images/cello/IMG_1223.JPG",
      "/images/cello/IMG_1224.JPG",
      "/images/cello/IMG_1225.JPG",
      "/images/cello/IMG_1231.JPG",
      "/images/cello/IMG_1233.JPG",
      "/images/cello/IMG_1234.JPG",
      "/images/cello/IMG_1240.JPG",
      "/images/cello/IMG_1613.JPG",
      "/images/cello/IMG_1617.JPG",
      "/images/cello/IMG_1625.JPG",
      "/images/cello/IMG_1626.JPG",
      "/images/cello/IMG_1630.JPG",
      "/images/cello/IMG_1631.JPG",
      "/images/cello/IMG_1632.JPG",
      "/images/cello/IMG_1641.JPG",
      "/images/cello/IMG_1644.JPG",
      "/images/cello/IMG_1647.JPG",
      "/images/cello/IMG_1648.JPG",
      "/images/cello/IMG_1650.JPG",
      "/images/cello/IMG_1651.JPG",
      "/images/cello/IMG_1652.JPG",
      "/images/cello/IMG_1654.JPG",
      "/images/cello/IMG_1655.JPG",
      "/images/cello/IMG_1656.JPG",
      "/images/cello/IMG_1657.JPG",
      "/images/cello/IMG_1658.JPG",
    ],
    cover: "/images/cello/IMG_1651.JPG",
  },
  {
    name: "Dut Keman",
    images: [
      "/images/dut_keman/IMG_0766.JPG",
      "/images/dut_keman/IMG_0773.JPG",
      "/images/dut_keman/IMG_0775.JPG",
      "/images/dut_keman/IMG_0777.JPG",
      "/images/dut_keman/IMG_0783.JPG",
      "/images/dut_keman/IMG_0786.JPG",
      "/images/dut_keman/IMG_1108.JPG",
      "/images/dut_keman/IMG_1111.JPG",
      "/images/dut_keman/IMG_1113.JPG",
      "/images/dut_keman/IMG_1115.JPG",
      "/images/dut_keman/IMG_1118.JPG",
      "/images/dut_keman/IMG_1120.JPG",
      "/images/dut_keman/IMG_1125.JPG",
      "/images/dut_keman/IMG_1126.JPG",
      "/images/dut_keman/IMG_1146.JPG",
      "/images/dut_keman/IMG_1148.JPG",
      "/images/dut_keman/IMG_1150.JPG",
      "/images/dut_keman/IMG_1163.JPG",
      "/images/dut_keman/IMG_1164.JPG",
      "/images/dut_keman/IMG_1168.JPG",
      "/images/dut_keman/IMG_1169.JPG",
      "/images/dut_keman/IMG_1170.JPG",
      "/images/dut_keman/IMG_1172.JPG",
      "/images/dut_keman/IMG_1173.JPG",
      "/images/dut_keman/IMG_1200.JPG",
      "/images/dut_keman/IMG_1201.JPG",
      "/images/dut_keman/IMG_1220.JPG",
      "/images/dut_keman/IMG_1247.JPG",
      "/images/dut_keman/IMG_1267.JPG",
      "/images/dut_keman/IMG_1269.JPG",
      "/images/dut_keman/IMG_1291.JPG",
      "/images/dut_keman/IMG_1292.JPG",
      "/images/dut_keman/IMG_1295.JPG",
      "/images/dut_keman/IMG_1303.JPG",
      "/images/dut_keman/IMG_1304.JPG",
      "/images/dut_keman/IMG_1305.JPG",
      "/images/dut_keman/IMG_1307.JPG",
      "/images/dut_keman/IMG_1308.JPG",
      "/images/dut_keman/IMG_1311.JPG",
      "/images/dut_keman/IMG_1312.JPG",
      "/images/dut_keman/IMG_1316.JPG",
      "/images/dut_keman/IMG_1330.JPG",
      "/images/dut_keman/IMG_1334.JPG",
      "/images/dut_keman/IMG_1356.JPG",
      "/images/dut_keman/IMG_1357.JPG",
      "/images/dut_keman/IMG_1358.JPG",
      "/images/dut_keman/IMG_1488.JPG",
      "/images/dut_keman/IMG_1492.JPG",
      "/images/dut_keman/IMG_1493.JPG",
      "/images/dut_keman/IMG_1494.JPG",
      "/images/dut_keman/IMG_1495.JPG",
      "/images/dut_keman/IMG_1496.JPG",
      "/images/dut_keman/IMG_1497.JPG",
      "/images/dut_keman/IMG_1498.JPG",
      "/images/dut_keman/IMG_1661.JPG",
      "/images/dut_keman/IMG_1742.JPG",
      "/images/dut_keman/IMG_1743.JPG",
      "/images/dut_keman/IMG_1751.JPG",
      "/images/dut_keman/IMG_1754.JPG",
      "/images/dut_keman/IMG_1760.JPG",
      "/images/dut_keman/IMG_1763.JPG",
      "/images/dut_keman/IMG_1765.JPG",
      "/images/dut_keman/IMG_1767.JPG",
      "/images/dut_keman/IMG_1784.JPG",
      "/images/dut_keman/IMG_1785.JPG",
    ],
    cover: "/images/dut_keman/IMG_1767.JPG",
  },
  {
    name: "2014 Messiah",
    images: [
      "/images/2014_messiah/IMG_0850.JPG",
      "/images/2014_messiah/IMG_0852.JPG",
      "/images/2014_messiah/IMG_1242.JPG",
      "/images/2014_messiah/IMG_1243.JPG",
      "/images/2014_messiah/IMG_1250.JPG",
      "/images/2014_messiah/IMG_1253.JPG",
      "/images/2014_messiah/IMG_1256.JPG",
      "/images/2014_messiah/IMG_1258.JPG",
      "/images/2014_messiah/IMG_1263.JPG",
      "/images/2014_messiah/IMG_1272.JPG",
      "/images/2014_messiah/IMG_1275.JPG",
      "/images/2014_messiah/IMG_1278.JPG",
      "/images/2014_messiah/IMG_1280.JPG",
      "/images/2014_messiah/IMG_1285.JPG",
      "/images/2014_messiah/IMG_1288.JPG",
      "/images/2014_messiah/IMG_1289.JPG",
      "/images/2014_messiah/IMG_1296.JPG",
      "/images/2014_messiah/IMG_1297.JPG",
      "/images/2014_messiah/IMG_1369.JPG",
      "/images/2014_messiah/IMG_1371.JPG",
      "/images/2014_messiah/IMG_1379.JPG",
      "/images/2014_messiah/IMG_1381.JPG",
      "/images/2014_messiah/IMG_1413.JPG",
      "/images/2014_messiah/IMG_1425.JPG",
      "/images/2014_messiah/IMG_1426.JPG",
      "/images/2014_messiah/IMG_1427.JPG",
      "/images/2014_messiah/IMG_1444.JPG",
      "/images/2014_messiah/IMG_1479.JPG",
      "/images/2014_messiah/IMG_1480.JPG",
      "/images/2014_messiah/IMG_1481.JPG",
      "/images/2014_messiah/IMG_1482.JPG",
      "/images/2014_messiah/IMG_1483.JPG",
      "/images/2014_messiah/IMG_1484.JPG",
      "/images/2014_messiah/IMG_1485.JPG",
      "/images/2014_messiah/IMG_1486.JPG",
      "/images/2014_messiah/IMG_1487.JPG",
      "/images/2014_messiah/IMG_1499.JPG",
      "/images/2014_messiah/IMG_1662.JPG",
      "/images/2014_messiah/IMG_1663.JPG",
      "/images/2014_messiah/IMG_1712.JPG",
      "/images/2014_messiah/IMG_1716.JPG",
      "/images/2014_messiah/IMG_1719.JPG",
      "/images/2014_messiah/IMG_1721.JPG",
      "/images/2014_messiah/IMG_1724.JPG",
      "/images/2014_messiah/IMG_1728.JPG",
      "/images/2014_messiah/IMG_1729.JPG",
      "/images/2014_messiah/IMG_1738.JPG",
      "/images/2014_messiah/IMG_1770.JPG",
      "/images/2014_messiah/IMG_1772.JPG",
      "/images/2014_messiah/IMG_1775.JPG",
    ],
    cover: "/images/2014_messiah/IMG_1772.JPG",
  },
  {
    name: "Atölyeden Kareler",
  images: [
      "/images/yapim_asamasi/0608 (1)(1).jpg",
      "/images/yapim_asamasi/0608 (1).jpg",
      "/images/yapim_asamasi/1.JPG",
      "/images/yapim_asamasi/3.jpg",
      "/images/yapim_asamasi/4.jpg",
      "/images/yapim_asamasi/5.jpg",
      "/images/yapim_asamasi/6.jpg",
      "/images/yapim_asamasi/7 (2).JPG",
      "/images/yapim_asamasi/7.JPG",
      "/images/yapim_asamasi/8.jpg",
      "/images/yapim_asamasi/9.jpg",
      "/images/yapim_asamasi/10.jpg",
      "/images/yapim_asamasi/11.jpg",
      "/images/yapim_asamasi/12.jpg",
      "/images/yapim_asamasi/13.jpg",
      "/images/yapim_asamasi/14.jpg",
      "/images/yapim_asamasi/15 (2).jpg",
      "/images/yapim_asamasi/15.jpg",
      "/images/yapim_asamasi/16.JPG",
      "/images/yapim_asamasi/17.JPEG",
      "/images/yapim_asamasi/18.JPG",
      "/images/yapim_asamasi/19.jpg",
      "/images/yapim_asamasi/20.jpg",
      "/images/yapim_asamasi/21.jpg",
      "/images/yapim_asamasi/22.jpg",
      "/images/yapim_asamasi/IMG_2983.JPG",
      "/images/yapim_asamasi/IMG_E2898.JPG",
      "/images/yapim_asamasi/KYDP2727.JPG",
      "/images/yapim_asamasi/NFJK6531.JPG",
    ],
    cover: "/images/yapim_asamasi/0608 (1)(1).jpg",
  }
];

export default function Home() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [isHakkimdaOpen, setIsHakkimdaOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const calgilarRef = useRef<HTMLElement>(null);

  const instagramPosts = [
    {
      videoSrc: '/videos/2024_Messiah.mp4',
      posterSrc: '/videos/posters/2024_Messiah.jpg',
      postUrl: 'https://www.instagram.com/atolye_agackakann/',
      description: "2024 'Messiah' Kemanı"
    },
    {
      videoSrc: '/videos/Restorasyon.mp4',
      posterSrc: '/videos/posters/Restorasyon.jpg',
      postUrl: 'https://www.instagram.com/atolye_agackakann/',
      description: "Restorasyon Süreci"
    },
    {
      videoSrc: '/videos/Varnish.mp4',
      posterSrc: '/videos/posters/Varnish.jpg',
      postUrl: 'https://www.instagram.com/atolye_agackakann/',
      description: "Cila Aşaması"
    },
  ];

  useEffect(() => {
    const isModalOpen = selectedAlbum !== null || isHakkimdaOpen;
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAlbum, isHakkimdaOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '50%']);

  const title = "Atölye Ağaçkakan";
  const titleWords = title.split(" ");

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const scrollToCalgilar = () => {
    calgilarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Mesajınız gönderiliyor...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Mesajınız başarıyla gönderildi!', { id: toastId });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Bir hata oluştu.');
      }
    } catch (error: any) {
      toast.error(`Hata: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} id="home" className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-background relative">
        <div className="flex flex-col items-center justify-center p-8 md:p-16 text-center z-10">
          <motion.h1 
            className="text-5xl lg:text-7xl font-serif text-primary leading-tight mb-4"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, index) => (
              <motion.span 
                key={index}
                className="inline-block mr-4"
                variants={titleWordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg lg:text-xl mb-8 max-w-lg mx-auto text-text-secondary"
          >
            Geleneksel el işçiliği ve modern estetiğin buluştuğu, tınısı ve karakteriyle eşsiz yaylı enstrümanlar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-2"
          >
            <Link href="/#calgilar" data-cursor-hover="true" className="relative text-accent hover:text-primary transition-colors duration-300 text-lg group py-2 focusable">
              <span>Çalgılar</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            <button onClick={() => setIsHakkimdaOpen(true)} data-cursor-hover="true" className="relative text-accent hover:text-primary transition-colors duration-300 text-lg group py-2 focusable">
              <span>Hakkımda</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </button>
            <Link href="/#iletisim" data-cursor-hover="true" className="relative text-accent hover:text-primary transition-colors duration-300 text-lg group py-2 focusable">
              <span>İletişim</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            <a href="https://www.instagram.com/atolye_agackakann/" data-cursor-hover="true" target="_blank" rel="noopener noreferrer" className="relative text-accent hover:text-primary transition-colors duration-300 text-lg group py-2 focusable">
              <span>Instagram</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
          </motion.div>
        </div>
        <div className="relative h-[60vh] md:h-screen overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              style={{ y: parallaxY }}
            >
              <Image 
                  src="/images/dut_keman/IMG_1767.JPG"
                  alt="Atölye Ağaçkakan el yapımı dut keman"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
              />
            </motion.div>
        </div>
        <div 
            onClick={scrollToCalgilar}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer group flex flex-col items-center gap-2"
            data-cursor-hover="true"
        >
            <motion.div
                className="w-16 h-16 border-2 border-primary/50 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300"
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            >
                <FaArrowDown className="text-primary text-3xl transform group-hover:scale-110 transition-transform" />
            </motion.div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <motion.section 
        ref={calgilarRef}
        id="calgilar" 
        className="bg-surface py-20 md:py-32 relative z-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-primary mb-12">Çalgılar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {albums.map((album) => (
              <AlbumCover
                key={album.name}
                title={album.name}
                coverImage={album.cover}
                onClick={() => setSelectedAlbum(album)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Instagram Section */}
      <motion.section 
        id="instagram" 
        className="bg-background py-20 md:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-primary mb-12">Atölyeden Anlar</h2>
          {isMobile ? (
            <motion.div 
              className="relative overflow-hidden w-full h-[450px]"
              onHoverStart={(e) => {
                const target = e.target as HTMLElement;
                const marquee = target.closest('.flex');
                if (marquee) {
                  // Here we would pause the animation, which requires a more complex setup with useAnimation controls
                }
              }}
               onHoverEnd={(e) => {
                const target = e.target as HTMLElement;
                const marquee = target.closest('.flex');
                if (marquee) {
                  // Here we would resume the animation
                }
              }}
            >
              <motion.div
                className="flex gap-4 absolute"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  ease: 'linear',
                  duration: 30,
                  repeat: Infinity,
                }}
                onHoverStart={ (e) => (e.target as HTMLElement).style.animationPlayState = 'paused' }
                onHoverEnd={ (e) => (e.target as HTMLElement).style.animationPlayState = 'running' }
              >
                {[...instagramPosts, ...instagramPosts].map((post, index) => (
                  <div key={index} className="w-[300px] h-full flex-shrink-0"
                    onTouchStart={(e) => {
                        if(e.currentTarget.parentElement) e.currentTarget.parentElement.style.animationPlayState = 'paused'
                    }}
                    onTouchEnd={(e) => {
                        if(e.currentTarget.parentElement) e.currentTarget.parentElement.style.animationPlayState = 'running'
                    }}
                  >
                    <InstagramPost
                      isMobile
                      videoSrc={post.videoSrc}
                      posterSrc={post.posterSrc}
                      postUrl={post.postUrl}
                      username="atolye_agackakann"
                      description={post.description}
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {instagramPosts.map((post, index) => (
                <div key={index} className="flex">
                  <InstagramPost
                    videoSrc={post.videoSrc}
                    posterSrc={post.posterSrc}
                    postUrl={post.postUrl}
                    username="atolye_agackakann"
                    description={post.description}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <a 
              href="https://www.instagram.com/atolye_agackakann/" 
              data-cursor-hover="true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1 focusable text-lg"
            >
                <InstagramIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
                <span>Instagram'da Daha Fazlası</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* İletişim Section */}
      <motion.section 
        id="iletisim" 
        className="bg-surface py-20 md:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-primary mb-12">İletişim</h2>
          <div className="max-w-3xl mx-auto bg-background p-8 md:p-12 rounded-lg shadow-xl">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label className="block text-text-primary text-sm font-bold mb-2" htmlFor="name">Adınız Soyadınız</label>
                <input 
                  className="shadow-inner appearance-none border border-accent/20 rounded w-full py-3 px-4 bg-background text-text-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent" 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="Adınız Soyadınız" 
                  value={formData.name}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="mb-6">
                <label className="block text-text-primary text-sm font-bold mb-2" htmlFor="email">E-posta Adresiniz</label>
                <input 
                  className="shadow-inner appearance-none border border-accent/20 rounded w-full py-3 px-4 bg-background text-text-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent" 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="email@example.com" 
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-8">
                <label className="block text-text-primary text-sm font-bold mb-2" htmlFor="message">Mesajınız</label>
                <textarea 
                  className="shadow-inner appearance-none border border-accent/20 rounded w-full py-3 px-4 bg-background text-text-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent h-40" 
                  id="message"
                  name="message" 
                  placeholder="Mesajınızı buraya yazın..."
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button 
                  data-cursor-hover="true"
                  className="bg-primary hover:bg-primary-dark text-background font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-400 focusable" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedAlbum && (
          <AlbumModal
            album={selectedAlbum}
            onClose={() => setSelectedAlbum(null)}
          />
        )}
        {isHakkimdaOpen && (
          <HakkimdaModal onClose={() => setIsHakkimdaOpen(false)} />
        )}
      </AnimatePresence>
      <ScrollToTopButton />
    </>
  );
} 
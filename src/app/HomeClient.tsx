"use client";

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

// Components
import Navbar from '@/components/Navbar';
import AlbumCover from '@/components/AlbumCover';
import AlbumModal from '@/components/AlbumModal';
import AboutSection from '@/components/AboutSection';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import InstagramPost from '@/components/InstagramPost';
import Footer from '@/components/Footer';

// Icons & Utils
import { ChevronUp, Mail, Instagram as InstagramIcon, ArrowUpRight } from "lucide-react";
import { FaArrowDown } from 'react-icons/fa';
import { openInstagramProfile, getInstagramUniversalLink } from '@/utils/instagram';

interface AlbumData {
  name: string;
  description: string;
  images: string[];
  cover: string;
}

const albums: AlbumData[] = [
  {
    name: "2025 Keman",
    description: "2025 yılında tamamlanan yeni keman modelim. Seçilmiş Avrupa akçaağaç ve ladin ile, modern işçilik ve geleneksel ses estetiğini buluşturur.",
    images: [
      "/images/2025_violin/1.png",
      "/images/2025_violin/2.png",
      "/images/2025_violin/3.png",
      "/images/2025_violin/4.png",
      "/images/2025_violin/5.png",
      "/images/2025_violin/6.png",
      "/images/2025_violin/7.jpg",
    ],
    cover: "/images/2025_violin/1.png",
  },
  {
    name: "2024 Messiah",
    description: "Antonio Stradivari'nin 1716 tarihli 'Messiah' kemanının form yapısı referans alınarak, kaliteli Avrupa akçaağacı ve ladini ile üretilmiştir. Cila olarak, eskitme stilinde bir yağ cilası uygulanmıştır.",
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
    name: "Çello",
    description: "2014 yılında, Antonio Stradivari'nin 1711 tarihli 'Duport' çellosunun form yapısı model alınarak üretilmiştir.",
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
    description: "Barok ve modern tasarımlardan ilhamla, form yapısı tarafımdan tasarlanan bu özel çalgıda, akçaağaç yerine geleneksel Türk halk müziği enstrümanlarında sıklıkla tercih edilen dut ağacı kullanılmıştır. Dut ve ladin ağaçları arasındaki ton dengesini sağlamak amacıyla özel bir alkol cilası uygulanmıştır.",
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
    description: "Antonio Stradivari'nin 1716 tarihli 'Messiah' kemanının form yapısı referans alınarak, kaliteli yerli akçaağaç ve ladin ile üretilmiştir. Cila olarak, geleneksel bir alkol cilası uygulanmıştır.",
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
    description: "Bir enstrümanın hayata geliş anları. Kesimden cilaya, her bir detayın özenle işlendiği yapım sürecinden kesitler.",
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

export default function HomeClient() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero slideshow images
  const heroImages = [
    "/images/2025_violin/1.png",
    "/images/2014_messiah/IMG_1772.JPG",
    "/images/dut_keman/IMG_1767.JPG",
    "/images/cello/IMG_1651.JPG",
    "/images/yapim_asamasi/0608 (1)(1).jpg",
  ];

  // Parallax effect for Hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const slugify = (text: string) => (
    text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/â|î|û/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  );

  const openAlbum = (album: AlbumData) => {
    setSelectedAlbum(album);
    const params = new URLSearchParams(searchParams ?? undefined);
    params.set('album', slugify(album.name));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    const params = new URLSearchParams(searchParams ?? undefined);
    params.delete('album');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const instagramPosts = [
    { videoSrc: '/videos/2024_Messiah.mp4', posterSrc: '', postUrl: 'https://www.instagram.com/atolye_agackakann/', description: "2024 'Messiah' Kemanı" },
    { videoSrc: '/videos/Restorasyon.mp4', postUrl: 'https://www.instagram.com/atolye_agackakann/', description: "Restorasyon Süreci" },
    { videoSrc: '/videos/Varnish.mp4', postUrl: 'https://www.instagram.com/atolye_agackakann/', description: "Cila Aşaması" },
    { videoSrc: '/videos/Violin_f_hole.mp4', posterSrc: '', postUrl: 'https://www.instagram.com/atolye_agackakann/', description: "F deliği kesimi" },
  ];

  useEffect(() => {
    const isModalOpen = selectedAlbum !== null;
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAlbum]);

  useEffect(() => {
    const albumSlug = searchParams?.get('album');
    if (!albumSlug) return;
    const found = albums.find(a => slugify(a.name) === albumSlug);
    if (found) setSelectedAlbum(found);
  }, [searchParams]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Hero slideshow auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Mesajınız gönderiliyor...');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) {
        toast.success('Mesajınız başarıyla gönderildi!', { id: toastId });
        setFormData({ name: '', email: '', message: '', website: '' });
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
      <Navbar />

      {/* Modern Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Slideshow Background with Parallax */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-10" />

          {/* Slideshow Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="Atölye Ağaçkakan"
                fill
                className="object-cover object-center"
                priority={currentImageIndex === 0}
                quality={85}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slideshow Indicators */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? 'bg-primary w-6'
                  : 'bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Görsel ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Watermark Logo - Large, Semi-transparent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] md:w-[40vw] md:h-[40vw] md:max-w-[500px] md:max-h-[500px]">
            <Image
              src="/images/logo_transparent.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 tracking-tight gradient-text-gold"
          >
            Atölye Ağaçkakan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-base md:text-xl lg:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto px-2"
          >
            Geleneksel el işçiliği ve modern estetiğin buluştuğu, tınısı ve karakteriyle eşsiz yaylı enstrümanlar.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">Keşfet</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaArrowDown className="text-white/60 text-xl" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section (New) */}
      <AboutSection />

      {/* Gallery Section */}
      <motion.section
        id="calgilar"
        className="bg-surface py-20 md:py-32 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 gradient-text-gold">Portfolyo</h2>
            <div className="w-16 sm:w-24 h-1 bg-primary mx-auto opacity-30" />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
            {albums.map((album) => (
              <AlbumCover
                key={album.name}
                title={album.name}
                coverImage={album.cover}
                backImage1={album.images[1]}
                backImage2={album.images[2]}
                onClick={() => openAlbum(album)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Instagram Section */}
      <motion.section
        id="instagram"
        className="bg-background py-16 sm:py-20 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 gradient-text-gold">Atölyeden Anlar</h2>
              <p className="text-text-secondary max-w-xl text-sm sm:text-base md:text-lg font-light">
                Bir enstrümanın ruhunu bulduğu o sessiz ve büyülü anlar. Yapım sürecinden kesitler.
              </p>
            </div>

            <a
              href={getInstagramUniversalLink('atolye_agackakann')}
              onClick={(e) => openInstagramProfile('atolye_agackakann', e)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-text-primary hover:text-primary transition-colors group"
            >
              <span className="uppercase tracking-widest text-sm">Tümünü Gör</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Video Grid - same style as Portfolio */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <InstagramPost
                  isMobile={isMobile}
                  videoSrc={post.videoSrc}
                  posterSrc={post.posterSrc}
                  postUrl={post.postUrl}
                  username="atolye_agackakann"
                  description={post.description}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 md:hidden text-center">
            <a
              href={getInstagramUniversalLink('atolye_agackakann')}
              onClick={(e) => openInstagramProfile('atolye_agackakann', e)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-surface border border-white/10 text-primary font-medium py-3 px-6 rounded-full text-sm sm:text-base active:scale-95 transition-transform"
            >
              <InstagramIcon size={16} />
              <span>Instagram'da Takip Et</span>
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
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 gradient-text-gold">İletişime Geçin</h2>
              <p className="text-text-secondary text-lg mb-8 font-light leading-relaxed">
                Özel siparişleriniz, restorasyon talepleriniz veya sadece tanışmak için...<br />
                Atölyemizin kapısı sanata değer veren herkese açıktır.
              </p>
            </div>

            <div className="bg-background p-8 md:p-10 rounded-2xl shadow-2xl border border-white/5">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleFormChange} />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="name">Adınız Soyadınız</label>
                  <input
                    className="w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    id="name" name="name" type="text" placeholder="Adınız Soyadınız" value={formData.name} onChange={handleFormChange} autoComplete="name" required
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="email">E-posta Adresiniz</label>
                  <input
                    className="w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    id="email" name="email" type="email" placeholder="ornek@email.com" value={formData.email} onChange={handleFormChange} autoComplete="email" required
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="message">Mesajınız</label>
                  <textarea
                    className="w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all h-32 resize-none"
                    id="message" name="message" placeholder="Mesajınızı buraya yazın..." value={formData.message} onChange={handleFormChange} required
                  ></textarea>
                </div>

                <button
                  data-cursor-hover="true"
                  className="w-full bg-primary hover:bg-primary-dark text-background font-bold py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedAlbum && (
          <AlbumModal album={selectedAlbum} onClose={closeAlbum} />
        )}
      </AnimatePresence>

      <Footer />
      <ScrollToTopButton />
    </>
  );
}

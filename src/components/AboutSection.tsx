"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section id="hakkimda" className="py-20 md:py-32 bg-surface relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:mr-auto overflow-hidden rounded-sm">
                            <Image
                                src="/images/yapim_asamasi/1.JPG"
                                alt="Hasan Aşıroğlu - Luthier"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Frame Border Effect */}
                            <div className="absolute inset-4 border border-white/20 pointer-events-none" />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 md:right-10 bg-background p-6 shadow-2xl border border-white/5 max-w-[200px] hidden md:block">
                            <p className="font-serif text-primary text-4xl font-bold mb-1">10+</p>
                            <p className="text-xs text-text-secondary uppercase tracking-wider">Yıllık Tecrübe & Tutku</p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
                            <span className="gradient-text-gold">Ahşabın Ruhuna</span> <br />
                            <span className="text-text-primary">Dokunan Eller</span>
                        </h2>

                        <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light">
                            <p>
                                Merhaba, ben <span className="text-accent">Hasan Aşıroğlu</span>. Çalgı yapımına olan tutkum, küçük yaşlarda
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
                                bakımına odaklanarak sanatımı icra etmeye devam ediyorum. Her enstrüman, benim için yeni bir hikaye ve keşif yolculuğudur.
                            </p>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 flex gap-12">
                            <div>
                                <span className="block text-2xl font-serif text-white mb-1">2014</span>
                                <span className="text-sm text-text-secondary uppercase tracking-wider">Mezuniyet</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-serif text-white mb-1">ZBEÜ</span>
                                <span className="text-sm text-text-secondary uppercase tracking-wider">Devlet Konservatuvarı</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import CustomCursor from '@/components/CustomCursor'
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.atolyeagackakan.art';
const title = 'Atölye Ağaçkakan | Yaylı Çalgı Yapımı & Restorasyonu';
const description = 'Atölye Ağaçkakan - Geleneksel el işçiliği ve modern estetiğin buluştuğu, tınısı ve karakteriyle eşsiz yaylı enstrümanlar. El yapımı keman, viyola, çello yapımı, restorasyonu ve tamiri.';
const keywords = [
  "Atölye Ağaçkakan",
  "Hasan AŞIROĞLU",
  "luthier",
  "yaylı çalgı tamiri",
  "keman restorasyonu",
  "el yapımı çalgı",
  "el yapımı keman",
  "keman tamiri",
  "viyolonsel tamiri",
  "çalgı yapımcısı",
  "keman yapımı",
  "restorasyon",
  "luthiery"
];

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  authors: [{ name: 'Hasan AŞIROĞLU' }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo_transparent.png',
    apple: '/images/logo_transparent.png',
  },
  openGraph: {
    title: title,
    description: description,
    url: siteUrl,
    siteName: 'Atölye Ağaçkakan',
    images: [
      {
        url: `/images/dut_keman/IMG_1767.JPG`,
        width: 1200,
        height: 800,
        alt: 'Atölye Ağaçkakan el yapımı dut keman',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [`/images/dut_keman/IMG_1767.JPG`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: "Atölye Ağaçkakan | Yaylı Çalgı Yapımı",
  description: description,
  image: `${siteUrl}/images/dut_keman/IMG_1767.JPG`,
  '@id': siteUrl,
  url: siteUrl,
  jobTitle: 'Luthier',
  additionalType: "http://www.productontology.org/id/Musical_instrument_making",
  serviceType: [
    "Keman Tamiri",
    "Keman Restorasyonu",
    "Yaylı Çalgı Tamiri",
    "El Yapımı Keman",
    "El Yapımı Çalgı"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-on-surface antialiased md:cursor-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: 'red',
                secondary: 'white',
              }
            }
          }}
        />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}



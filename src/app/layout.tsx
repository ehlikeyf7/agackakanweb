import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display, Lato } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from '@/components/CustomCursor'
import { Toaster } from 'react-hot-toast';

// Configure fonts
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cormorant',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.atolyeagackakan.com';
const title = 'Hasan AŞIROĞLU - Yaylı Çalgı Yapımı, Tamiri ve Restorasyonu';
const description = 'Hasan AŞIROĞLU tarafından el yapımı keman ve diğer yaylı çalgılar. Keman restorasyonu, yaylı çalgı tamiri ve bakımı konusunda uzman luthier. Geleneksel yöntemlerle modern estetiği birleştiren özgün tasarımlar.';
const keywords = [
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
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 style=%22font-family:serif;fill:%23C0A080;%22>A</text></svg>',
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
  name: "Hasan AŞIROĞLU | Luthier",
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
  ],
  address: {
    "@type": "PostalAddress",
    "addressLocality": "Ankara",
    "addressCountry": "TR"
  },
  telephone: "+90-555-555-5555" // TODO: Gerçek telefon numarası ile değiştirilmeli
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-background text-on-surface antialiased cursor-none">
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
      </body>
    </html>
  )
} 
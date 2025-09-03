import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Basit IP bazlı rate limit (hafıza içi - vercel edge değil, node runtime)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 dakika
const RATE_LIMIT_MAX = 5; // dakika başına 5 istek
const ipHits: Map<string, { count: number; windowStart: number }> = new Map();

function isRateLimited(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// Girdi doğrulama şeması
const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  website: z.string().optional().default(''), // honeypot
});

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || undefined;
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Geçersiz girdi.', issues: parsed.error.issues }, { status: 400 });
  }
  const { name, email, message, website } = parsed.data;
  // Honeypot: bot doldurursa reddet
  if (website && website.trim().length > 0) {
    return NextResponse.json({ message: 'İstek reddedildi.' }, { status: 200 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use the App Password here
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'hsn.asiroglu@gmail.com',
    subject: `Yeni Mesaj: ${safeName} - Atölye Ağaçkakan Web Sitesi`,
    html: `
      <h2>Atölye Ağaçkakan Web Sitesinden Yeni Bir Mesaj Aldınız</h2>
      <p><strong>Gönderen:</strong> ${safeName}</p>
      <p><strong>E-posta:</strong> ${safeEmail}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${safeMessage.replace(/\n/g, '<br/>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'E-posta başarıyla gönderildi!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'E-posta gönderilirken bir hata oluştu.' }, { status: 500 });
  }
} 
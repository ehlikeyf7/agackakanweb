import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

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
    subject: `Yeni Mesaj: ${name} - Atölye Ağaçkakan Web Sitesi`,
    html: `
      <h2>Atölye Ağaçkakan Web Sitesinden Yeni Bir Mesaj Aldınız</h2>
      <p><strong>Gönderen:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${message}</p>
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
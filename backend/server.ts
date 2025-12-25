
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// Cast express.json() to any to bypass environment-specific type mismatch with app.use overloads
app.use(express.json() as any);

// Simple storage for subscribers
const subscribers: Set<string> = new Set();

// Minimal anti-spam middleware using 'any' for req and res to resolve missing property errors on express types
const antiSpam = (req: any, res: any, next: NextFunction) => {
  if (req.body && req.body.website_url) {
    return res.status(400).json({ error: 'Potential spam detected.' });
  }
  next();
};

// Route handler using 'any' for req and res to bypass missing 'body', 'status', and 'json' property errors
app.post('/api/contact', antiSpam, async (req: any, res: any) => {
  const { name, email, message, company, budget } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.log(`Contact inquiry from ${name} <${email}>`);

  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"AlbShift System" <${process.env.SMTP_USER}>`,
        to: "leads@albshift.com",
        replyTo: email,
        subject: `[Project Lead] ${company || 'New Inquiry'} - ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nBudget: ${budget || 'N/A'}\n\nMessage:\n${message}`,
      });
    }

    res.json({ ok: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Could not send inquiry. Please try again later.' });
  }
});

// Subscription handler using 'any' for req and res to ensure compatibility with the express environment
app.post('/api/subscribe', antiSpam, (req: any, res: any) => {
  const { email } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  
  subscribers.add(email);
  console.log(`Subscriber added: ${email}. Total: ${subscribers.size}`);
  res.json({ ok: true, message: 'Successfully subscribed.' });
});

app.listen(port, () => {
  console.log(`AlbShift Backend running on port ${port}`);
});

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import sgMail from '@sendgrid/mail';

const app = express();
const port = Number(process.env.PORT) || 3001;

const requiredEnv = ['SENDGRID_API_KEY', 'QUOTE_TO_EMAIL', 'QUOTE_FROM_EMAIL'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  console.warn(
    `[api] Missing env: ${missing.join(', ')}. POST /api/quote will return 503 until configured.`,
  );
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/quote', async (req, res) => {
  if (missing.length) {
    return res.status(503).json({ ok: false, message: 'Email service is not configured.' });
  }

  const { name, email, phone, address, serviceType, preferredDate, message, website } =
    req.body ?? {};

  if (website) {
    return res.json({ ok: true });
  }

  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push('name');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');
  if (!phone || String(phone).trim().length < 7) errors.push('phone');
  if (!address || String(address).trim().length < 5) errors.push('address');
  if (!serviceType) errors.push('serviceType');
  if (!message || String(message).trim().length < 10) errors.push('message');

  if (errors.length) {
    return res.status(400).json({ ok: false, message: 'Invalid quote request.', fields: errors });
  }

  const subject = `Quote request — ${name} (${serviceType})`;
  const text = [
    `New quote request for ${process.env.SITE_NAME ?? 'Patriot Tree Care'}`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `Service: ${serviceType}`,
    preferredDate ? `Preferred visit: ${preferredDate}` : null,
    '',
    'Message:',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await sgMail.send({
      to: process.env.QUOTE_TO_EMAIL,
      from: process.env.QUOTE_FROM_EMAIL,
      replyTo: email,
      subject,
      text,
    });
    res.json({ ok: true, message: 'Quote request sent.' });
  } catch (err) {
    console.error('[api] SendGrid error', err);
    res.status(502).json({ ok: false, message: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});

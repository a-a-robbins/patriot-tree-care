import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3001;
const SMTP2GO_API_URL = 'https://api.smtp2go.com/v3/email/send';

const requiredEnv = ['SMTP2GO_API_KEY', 'QUOTE_TO_EMAIL', 'QUOTE_FROM_EMAIL'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  console.warn(
    `[api] Missing env: ${missing.join(', ')}. POST /api/quote will return 503 until configured.`,
  );
}

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

async function sendQuoteEmail({ to, from, replyTo, subject, text }) {
  const response = await fetch(SMTP2GO_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.SMTP2GO_API_KEY,
      to: [to],
      sender: from,
      subject,
      text_body: text,
      custom_headers: [{ header: 'Reply-To', value: replyTo }],
    }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok || body?.data?.failed > 0) {
    const detail = body?.data?.failures?.[0]?.error || body?.data?.error || response.statusText;
    throw new Error(detail || 'SMTP2GO request failed');
  }

  return body;
}

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
    await sendQuoteEmail({
      to: process.env.QUOTE_TO_EMAIL,
      from: process.env.QUOTE_FROM_EMAIL,
      replyTo: email,
      subject,
      text,
    });
    res.json({ ok: true, message: 'Quote request sent.' });
  } catch (err) {
    console.error('[api] SMTP2GO error', err);
    res.status(502).json({ ok: false, message: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});

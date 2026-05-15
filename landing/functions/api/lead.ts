interface Env {
  RESEND_API_KEY: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
}

interface LeadBody {
  email?: string;
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  if (body.website && body.website.trim() !== '') {
    return json({ ok: true });
  }

  const email = (body.email || '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }

  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const country = request.headers.get('cf-ipcountry') || 'unknown';
  const ua = request.headers.get('user-agent') || 'unknown';
  const ref = request.headers.get('referer') || 'direct';
  const ts = new Date().toISOString();

  const to = env.LEAD_TO_EMAIL || 'contatorafaeleleoterio@gmail.com';
  const from = env.LEAD_FROM_EMAIL || 'DoceGestar Leads <leads@docegestar.com.br>';

  const subject = `Novo lead DoceGestar: ${email}`;
  const html = `
    <h2>Novo lead da landing page</h2>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <hr>
    <p style="color:#666;font-size:12px">
      <strong>IP:</strong> ${escapeHtml(ip)}<br>
      <strong>País:</strong> ${escapeHtml(country)}<br>
      <strong>Referrer:</strong> ${escapeHtml(ref)}<br>
      <strong>User-Agent:</strong> ${escapeHtml(ua)}<br>
      <strong>Data:</strong> ${ts}
    </p>
  `;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html, reply_to: email }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('resend_error', r.status, detail);
      return json({ ok: false, error: 'send_failed' }, 502);
    }
  } catch (err) {
    console.error('resend_exception', err);
    return json({ ok: false, error: 'send_exception' }, 502);
  }

  return json({ ok: true });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c] as string));
}

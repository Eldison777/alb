
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { query } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Security headers
app.use(helmet() as any);

// CORS — restrict to allowed origins
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }) as any);

app.use(express.json() as any);

// Rate limiters
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

app.use('/api/admin/login', authLimiter as any);
app.use('/api/contact', formLimiter as any);
app.use('/api/subscribe', formLimiter as any);
app.use('/api/', generalLimiter as any);

// --- Anti-spam middleware ---
const antiSpam = (req: any, res: any, next: NextFunction) => {
  if (req.body && req.body.website_url) {
    return res.status(400).json({ error: 'Potential spam detected.' });
  }
  next();
};

// --- Auth middleware ---
const requireAuth = async (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  try {
    const result = await query(
      'SELECT id FROM admin_sessions WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    next();
  } catch {
    return res.status(500).json({ error: 'Auth check failed' });
  }
};

// =====================
// AUTH ROUTES
// =====================

app.post('/api/admin/login', async (req: any, res: any) => {
  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'Admin password not configured on server.' });
  }
  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid password.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  try {
    await query(
      'INSERT INTO admin_sessions (token, expires_at) VALUES ($1, $2)',
      [token, expiresAt.toISOString()]
    );
    res.json({ ok: true, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

app.post('/api/admin/logout', requireAuth, async (req: any, res: any) => {
  const token = req.headers.authorization!.slice(7);
  try {
    await query('DELETE FROM admin_sessions WHERE token = $1', [token]);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Logout failed.' });
  }
});

// =====================
// DASHBOARD
// =====================

app.get('/api/admin/dashboard/counts', requireAuth, async (_req: any, res: any) => {
  try {
    const [blogs, projects, team, faqs] = await Promise.all([
      query('SELECT COUNT(*) FROM blog_posts'),
      query('SELECT COUNT(*) FROM projects'),
      query('SELECT COUNT(*) FROM team_members'),
      query('SELECT COUNT(*) FROM faqs'),
    ]);
    res.json({
      blog: Number(blogs.rows[0].count),
      projects: Number(projects.rows[0].count),
      team: Number(team.rows[0].count),
      faqs: Number(faqs.rows[0].count),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch counts.' });
  }
});

// =====================
// PUBLIC API ROUTES
// =====================

app.get('/api/blog', async (_req: any, res: any) => {
  try {
    const result = await query(
      'SELECT * FROM blog_posts WHERE is_published = true ORDER BY sort_order ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts.' });
  }
});

app.get('/api/blog/:id', async (req: any, res: any) => {
  try {
    const result = await query(
      'SELECT * FROM blog_posts WHERE id = $1 AND is_published = true',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post.' });
  }
});

app.get('/api/projects', async (_req: any, res: any) => {
  try {
    const result = await query(
      'SELECT * FROM projects WHERE is_published = true ORDER BY sort_order ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

app.get('/api/team', async (_req: any, res: any) => {
  try {
    const result = await query(
      'SELECT * FROM team_members WHERE is_published = true ORDER BY sort_order ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members.' });
  }
});

app.get('/api/faqs', async (_req: any, res: any) => {
  try {
    const result = await query(
      'SELECT * FROM faqs WHERE is_published = true ORDER BY sort_order ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs.' });
  }
});

// =====================
// ADMIN CRUD: BLOG
// =====================

app.get('/api/admin/blog', requireAuth, async (_req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM blog_posts ORDER BY sort_order ASC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts.' });
  }
});

app.get('/api/admin/blog/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post.' });
  }
});

app.post('/api/admin/blog', requireAuth, async (req: any, res: any) => {
  const { title_en, title_sq, category, date, author, image_url, content_en, content_sq, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `INSERT INTO blog_posts (title_en, title_sq, category, date, author, image_url, content_en, content_sq, sort_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [title_en, title_sq || '', category || 'Build', date, author, image_url || '', content_en || '', content_sq || '', sort_order || 0, is_published !== false]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post.' });
  }
});

app.put('/api/admin/blog/:id', requireAuth, async (req: any, res: any) => {
  const { title_en, title_sq, category, date, author, image_url, content_en, content_sq, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `UPDATE blog_posts SET title_en=$1, title_sq=$2, category=$3, date=$4, author=$5, image_url=$6, content_en=$7, content_sq=$8, sort_order=$9, is_published=$10, updated_at=NOW()
       WHERE id=$11 RETURNING *`,
      [title_en, title_sq || '', category || 'Build', date, author, image_url || '', content_en || '', content_sq || '', sort_order || 0, is_published !== false, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post.' });
  }
});

app.delete('/api/admin/blog/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post.' });
  }
});

// =====================
// ADMIN CRUD: PROJECTS
// =====================

app.get('/api/admin/projects', requireAuth, async (_req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

app.get('/api/admin/projects/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project.' });
  }
});

app.post('/api/admin/projects', requireAuth, async (req: any, res: any) => {
  const { title_en, title_sq, client_en, client_sq, result_en, result_sq, tags, image_url, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `INSERT INTO projects (title_en, title_sq, client_en, client_sq, result_en, result_sq, tags, image_url, sort_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [title_en, title_sq || '', client_en, client_sq || '', result_en, result_sq || '', tags || [], image_url || '', sort_order || 0, is_published !== false]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

app.put('/api/admin/projects/:id', requireAuth, async (req: any, res: any) => {
  const { title_en, title_sq, client_en, client_sq, result_en, result_sq, tags, image_url, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `UPDATE projects SET title_en=$1, title_sq=$2, client_en=$3, client_sq=$4, result_en=$5, result_sq=$6, tags=$7, image_url=$8, sort_order=$9, is_published=$10, updated_at=NOW()
       WHERE id=$11 RETURNING *`,
      [title_en, title_sq || '', client_en, client_sq || '', result_en, result_sq || '', tags || [], image_url || '', sort_order || 0, is_published !== false, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

app.delete('/api/admin/projects/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

// =====================
// ADMIN CRUD: TEAM
// =====================

app.get('/api/admin/team', requireAuth, async (_req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM team_members ORDER BY sort_order ASC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members.' });
  }
});

app.get('/api/admin/team/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM team_members WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team member.' });
  }
});

app.post('/api/admin/team', requireAuth, async (req: any, res: any) => {
  const { name, role_en, role_sq, bio_en, bio_sq, image_url, grid_size, twitter_url, linkedin_url, github_url, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `INSERT INTO team_members (name, role_en, role_sq, bio_en, bio_sq, image_url, grid_size, twitter_url, linkedin_url, github_url, sort_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [name, role_en, role_sq || '', bio_en || '', bio_sq || '', image_url || '', grid_size || 'lg:col-span-1 lg:row-span-1', twitter_url || '', linkedin_url || '', github_url || '', sort_order || 0, is_published !== false]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team member.' });
  }
});

app.put('/api/admin/team/:id', requireAuth, async (req: any, res: any) => {
  const { name, role_en, role_sq, bio_en, bio_sq, image_url, grid_size, twitter_url, linkedin_url, github_url, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `UPDATE team_members SET name=$1, role_en=$2, role_sq=$3, bio_en=$4, bio_sq=$5, image_url=$6, grid_size=$7, twitter_url=$8, linkedin_url=$9, github_url=$10, sort_order=$11, is_published=$12, updated_at=NOW()
       WHERE id=$13 RETURNING *`,
      [name, role_en, role_sq || '', bio_en || '', bio_sq || '', image_url || '', grid_size || 'lg:col-span-1 lg:row-span-1', twitter_url || '', linkedin_url || '', github_url || '', sort_order || 0, is_published !== false, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member.' });
  }
});

app.delete('/api/admin/team/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('DELETE FROM team_members WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member.' });
  }
});

// =====================
// ADMIN CRUD: FAQS
// =====================

app.get('/api/admin/faqs', requireAuth, async (_req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM faqs ORDER BY sort_order ASC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs.' });
  }
});

app.get('/api/admin/faqs/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM faqs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQ.' });
  }
});

app.post('/api/admin/faqs', requireAuth, async (req: any, res: any) => {
  const { question_en, question_sq, answer_en, answer_sq, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `INSERT INTO faqs (question_en, question_sq, answer_en, answer_sq, sort_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [question_en, question_sq || '', answer_en, answer_sq || '', sort_order || 0, is_published !== false]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ.' });
  }
});

app.put('/api/admin/faqs/:id', requireAuth, async (req: any, res: any) => {
  const { question_en, question_sq, answer_en, answer_sq, sort_order, is_published } = req.body;
  try {
    const result = await query(
      `UPDATE faqs SET question_en=$1, question_sq=$2, answer_en=$3, answer_sq=$4, sort_order=$5, is_published=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [question_en, question_sq || '', answer_en, answer_sq || '', sort_order || 0, is_published !== false, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ.' });
  }
});

app.delete('/api/admin/faqs/:id', requireAuth, async (req: any, res: any) => {
  try {
    const result = await query('DELETE FROM faqs WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ.' });
  }
});

// =====================
// EXISTING ROUTES
// =====================

app.post('/api/contact', antiSpam, async (req: any, res: any) => {
  const { name, email, message, company, budget } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465,
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
    res.status(500).json({ error: 'Could not send inquiry. Please try again later.' });
  }
});

app.post('/api/subscribe', antiSpam, async (req: any, res: any) => {
  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  try {
    await query('INSERT INTO subscribers (email) VALUES ($1)', [email]);
    res.json({ ok: true, message: 'Successfully subscribed.' });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'This email is already subscribed.' });
    }
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Clean up expired admin sessions every hour
setInterval(async () => {
  try { await query('DELETE FROM admin_sessions WHERE expires_at < NOW()'); } catch {}
}, 60 * 60 * 1000);

app.listen(port, () => {
  console.log(`AlbShift Backend running on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 8080);
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-before-production';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@emaus.com.br').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const PASTOR_EMAIL = (process.env.PASTOR_EMAIL || 'evandro@bethesda.com.br').trim().toLowerCase();
const PASTOR_PASSWORD = process.env.PASTOR_PASSWORD || '';
const RECEPTION_EMAIL = (process.env.RECEPTION_EMAIL || 'mariana@bethesda.com.br').trim().toLowerCase();
const RECEPTION_PASSWORD = process.env.RECEPTION_PASSWORD || '';

if (!DATABASE_URL) {
  console.error('DATABASE_URL não foi configurada.');
  process.exit(1);
}
if (JWT_SECRET === 'change-this-secret-before-production') {
  console.warn('JWT_SECRET ainda está com o valor de desenvolvimento. Troque no Railway antes de produção.');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000
});

const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN.split(',').map(value => value.trim()), credentials: true }));
app.use(express.json({ limit: '2mb' }));

function slugify(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `igreja-${Date.now()}`;
}

function cents(value) {
  return Math.round(Number(value || 0) * 100);
}

function moneyFromCents(value) {
  return Number(value || 0) / 100;
}

function safeUser(row) {
  if (!row) return null;
  return { id: row.id, churchId: row.church_id, name: row.name, email: row.email, role: row.role, status: row.status, permissions: row.permissions || [] };
}

function signUser(user) {
  return jwt.sign({ sub: user.id, role: user.role, churchId: user.church_id || null, email: user.email }, JWT_SECRET, { expiresIn: '12h' });
}

async function query(text, params = []) {
  return pool.query(text, params);
}

async function audit(actor, action, payload = {}, churchId = actor?.church_id || null) {
  await query('INSERT INTO audit_events (actor_id, church_id, action, payload) VALUES ($1, $2, $3, $4)', [actor?.id || null, churchId, action, JSON.stringify(payload)]);
}

function auth(requiredRoles = []) {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : '';
      if (!token) return res.status(401).json({ error: 'Autenticação necessária.' });
      const claims = jwt.verify(token, JWT_SECRET);
      const result = await query('SELECT * FROM users WHERE id = $1 AND status = $2', [claims.sub, 'active']);
      const user = result.rows[0];
      if (!user) return res.status(401).json({ error: 'Usuário não encontrado ou bloqueado.' });
      if (requiredRoles.length && !requiredRoles.includes(user.role)) return res.status(403).json({ error: 'Permissão insuficiente.' });
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
    }
  };
}

function churchScope(req, requestedChurchId) {
  if (req.user.role === 'platform_admin') return requestedChurchId || null;
  return req.user.church_id;
}

function requireChurch(req, res, next) {
  const churchId = req.params.churchId || req.body.churchId || req.query.churchId;
  if (req.user.role !== 'platform_admin' && churchId && churchId !== req.user.church_id) return res.status(403).json({ error: 'Acesso limitado à igreja correspondente.' });
  req.churchId = churchScope(req, churchId);
  next();
}

app.get('/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, service: 'emaus-api', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ ok: false, error: 'Banco de dados indisponível.' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'emaus-api' }));

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!email || !password) return res.status(400).json({ error: 'Informe login e senha.' });
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || user.status !== 'active' || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Login ou senha inválidos.' });
  await audit(user, 'login');
  res.json({ token: signUser(user), user: safeUser(user) });
});

app.get('/api/me', auth(), async (req, res) => {
  res.json({ user: safeUser(req.user) });
});

app.get('/api/admin/summary', auth(['platform_admin']), async (req, res) => {
  const [churches, revenue, expenses, people] = await Promise.all([
    query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'active')::int AS active, COUNT(*) FILTER (WHERE status = 'blocked')::int AS blocked FROM churches"),
    query("SELECT COALESCE(SUM(monthly_price_cents), 0)::int AS cents FROM churches WHERE status = 'active'"),
    query('SELECT COALESCE(SUM(amount_cents), 0)::int AS cents FROM expenses WHERE expense_date >= date_trunc(\'month\', CURRENT_DATE)'),
    query("SELECT COALESCE(SUM(member_count), 0)::int AS total FROM churches WHERE status = 'active'")
  ]);
  res.json({ churches: churches.rows[0], monthlyRevenue: moneyFromCents(revenue.rows[0].cents), monthlyExpenses: moneyFromCents(expenses.rows[0].cents), activePeople: people.rows[0].total });
});

app.get('/api/admin/churches', auth(['platform_admin']), async (req, res) => {
  const result = await query(`SELECT c.*, p.name AS plan_name, p.member_limit, p.user_limit FROM churches c LEFT JOIN plans p ON p.id = c.plan_id ORDER BY c.created_at DESC`);
  res.json({ churches: result.rows });
});

app.post('/api/admin/churches', auth(['platform_admin']), async (req, res) => {
  const name = String(req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Nome da igreja é obrigatório.' });
  const planId = String(req.body.planId || 'essencial');
  const plan = (await query('SELECT * FROM plans WHERE id = $1 AND active = TRUE', [planId])).rows[0];
  if (!plan) return res.status(400).json({ error: 'Plano não encontrado.' });
  const slug = `${slugify(name)}-${crypto.randomBytes(3).toString('hex')}`;
  const trialDays = 30;
  const church = (await query(`INSERT INTO churches (name, slug, city, phone, pastors, plan_id, status, member_count, monthly_price_cents, trial_started_at, trial_ends_at)
    VALUES ($1, $2, $3, $4, $5, $6, 'trial', 0, $7, NOW(), NOW() + ($8 || ' days')::interval) RETURNING *`, [name, slug, req.body.city || 'Brasil', req.body.phone || '', req.body.pastors || '', plan.id, plan.price_cents, trialDays])).rows[0];
  await audit(req.user, 'church_created', { churchId: church.id, planId: plan.id }, church.id);
  res.status(201).json({ church });
});

app.patch('/api/admin/churches/:churchId/status', auth(['platform_admin']), async (req, res) => {
  const status = req.body.status === 'blocked' ? 'blocked' : 'active';
  const result = await query('UPDATE churches SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [status, req.params.churchId]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Igreja não encontrada.' });
  await audit(req.user, status === 'blocked' ? 'church_blocked' : 'church_released', { churchId: req.params.churchId }, req.params.churchId);
  res.json({ church: result.rows[0] });
});

app.get('/api/admin/plans', auth(['platform_admin']), async (req, res) => {
  const result = await query('SELECT * FROM plans WHERE active = TRUE ORDER BY price_cents ASC');
  res.json({ plans: result.rows.map(plan => ({ ...plan, price: moneyFromCents(plan.price_cents) })) });
});

app.put('/api/admin/plans', auth(['platform_admin']), async (req, res) => {
  const plans = Array.isArray(req.body.plans) ? req.body.plans : [];
  if (plans.length !== 3) return res.status(400).json({ error: 'A Emaús deve manter três planos ativos.' });
  for (const plan of plans) {
    await query(`UPDATE plans SET name = $1, price_cents = $2, member_limit = $3, user_limit = $4, description = $5, features = $6, updated_at = NOW() WHERE id = $7`, [plan.name, cents(plan.price), Number(plan.memberLimit), Number(plan.userLimit), plan.description || '', JSON.stringify(plan.features || []), plan.id]);
  }
  await audit(req.user, 'plans_updated', { count: plans.length });
  const result = await query('SELECT * FROM plans WHERE active = TRUE ORDER BY price_cents ASC');
  res.json({ plans: result.rows });
});

app.get('/api/admin/finance', auth(['platform_admin']), async (req, res) => {
  const result = await query('SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC LIMIT 100');
  res.json({ expenses: result.rows.map(item => ({ ...item, amount: moneyFromCents(item.amount_cents) })) });
});

app.post('/api/admin/expenses', auth(['platform_admin']), async (req, res) => {
  const description = String(req.body.description || '').trim();
  const amountCents = cents(req.body.amount);
  if (!description || amountCents <= 0) return res.status(400).json({ error: 'Descrição e valor são obrigatórios.' });
  const result = await query('INSERT INTO expenses (description, category, amount_cents, created_by) VALUES ($1, $2, $3, $4) RETURNING *', [description, req.body.category || 'Outro', amountCents, req.user.id]);
  await audit(req.user, 'expense_created', { expenseId: result.rows[0].id, amount: moneyFromCents(amountCents) });
  res.status(201).json({ expense: result.rows[0] });
});

app.get('/api/church/settings', auth(['church_admin', 'reception']), requireChurch, async (req, res) => {
  const result = await query('SELECT * FROM churches WHERE id = $1', [req.churchId]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Igreja não encontrada.' });
  res.json({ church: result.rows[0] });
});

app.put('/api/church/settings', auth(['church_admin']), requireChurch, async (req, res) => {
  const result = await query(`UPDATE churches SET name = COALESCE(NULLIF($1, ''), name), city = COALESCE(NULLIF($2, ''), city), phone = $3, pastors = $4, description = $5, logo_url = $6, updated_at = NOW() WHERE id = $7 RETURNING *`, [req.body.name || '', req.body.city || '', req.body.phone || '', req.body.pastors || '', req.body.description || '', req.body.logoUrl || '', req.churchId]);
  await audit(req.user, 'church_settings_updated', { fields: ['name', 'city', 'phone', 'pastors', 'description', 'logoUrl'] }, req.churchId);
  res.json({ church: result.rows[0] });
});

app.get('/api/church/visitors', auth(['church_admin', 'reception']), requireChurch, async (req, res) => {
  const result = await query('SELECT * FROM visitors WHERE church_id = $1 ORDER BY visit_date DESC, created_at DESC LIMIT 500', [req.churchId]);
  res.json({ visitors: result.rows });
});

app.post('/api/church/visitors', auth(['church_admin', 'reception']), requireChurch, async (req, res) => {
  const name = String(req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Nome do visitante é obrigatório.' });
  const result = await query(`INSERT INTO visitors (church_id, name, family_name, family_members, arrival_type, phone, visit_date, service, invited_by, notes, responsible, created_by)
    VALUES ($1, $2, $3, $4, $5, COALESCE($6, ''), COALESCE($7, CURRENT_DATE), COALESCE($8, 'Culto de Celebração'), COALESCE($9, ''), COALESCE($10, ''), $11, $12) RETURNING *`, [req.churchId, name, req.body.familyName || '', JSON.stringify(req.body.familyMembers || [name]), req.body.arrivalType || 'Sozinho', req.body.phone || '', req.body.visitDate || null, req.body.service || 'Culto de Celebração', req.body.invitedBy || '', req.body.notes || '', req.user.name, req.user.id]);
  await query('UPDATE churches SET member_count = member_count + 1, updated_at = NOW() WHERE id = $1', [req.churchId]);
  await audit(req.user, 'visitor_created', { visitorId: result.rows[0].id }, req.churchId);
  res.status(201).json({ visitor: result.rows[0] });
});

app.get('/api/audit', auth(['platform_admin']), async (req, res) => {
  const result = await query('SELECT * FROM audit_events ORDER BY created_at DESC LIMIT 200');
  res.json({ events: result.rows });
});

async function ensureColumnCompatibility() {
  await query("ALTER TABLE churches ADD COLUMN IF NOT EXISTS founder_price_freeze BOOLEAN NOT NULL DEFAULT FALSE");
}

async function seed() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await query(schema);
  await ensureColumnCompatibility();
  const plans = [
    ['essencial', 'Essencial', 4990, 100, 5, 'Para igrejas que estão começando a organizar o cuidado.', ['Acolhimento', 'Visitantes e famílias', 'Agenda', 'Relatórios essenciais']],
    ['cuidado', 'Cuidado', 9990, 300, 12, 'Para igrejas em crescimento.', ['Tudo do Essencial', 'Comunicação avançada', 'Relatórios avançados', 'Identidade personalizada']],
    ['rede', 'Rede', 17990, 800, 25, 'Para igrejas maiores e redes.', ['Tudo do Cuidado', 'Até 3 unidades', 'Indicadores financeiros', 'Gestão avançada']]
  ];
  for (const plan of plans) await query(`INSERT INTO plans (id, name, price_cents, member_limit, user_limit, description, features) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`, [...plan.slice(0, 6), JSON.stringify(plan[6])]);
  const existing = (await query('SELECT * FROM churches WHERE slug = $1', ['bethesda'])).rows[0];
  const church = existing || (await query(`INSERT INTO churches (name, slug, city, phone, pastors, description, plan_id, status, member_count, monthly_price_cents)
    VALUES ('Bethesda', 'bethesda', 'Itaboraí • RJ', '', 'Evandro e Simone', 'Um lugar para pertencer, crescer e viver a fé em comunidade.', 'cuidado', 'active', 246, 9990) RETURNING *`)).rows[0];
  if (ADMIN_PASSWORD) await seedUser(ADMIN_EMAIL, 'Administrador da plataforma', ADMIN_PASSWORD, 'platform_admin', null, []);
  if (PASTOR_PASSWORD) await seedUser(PASTOR_EMAIL, 'Evandro e Simone', PASTOR_PASSWORD, 'church_admin', church.id, ['church_settings', 'acolhimento']);
  if (RECEPTION_PASSWORD) await seedUser(RECEPTION_EMAIL, 'Mariana Alves', RECEPTION_PASSWORD, 'reception', church.id, ['acolhimento']);
}

async function seedUser(email, name, password, role, churchId, permissions) {
  const hash = await bcrypt.hash(password, 12);
  await query(`INSERT INTO users (name, email, password_hash, role, church_id, permissions) VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, church_id = EXCLUDED.church_id, permissions = EXCLUDED.permissions, updated_at = NOW()`, [name, email, hash, role, churchId, JSON.stringify(permissions)]);
}

async function start() {
  try {
    await seed();
    app.listen(PORT, '0.0.0.0', () => console.log(`Emaús API online na porta ${PORT}`));
  } catch (error) {
    console.error('Falha ao iniciar Emaús API:', error);
    process.exit(1);
  }
}

start();

const STATE_KEY = 'batesda-platform-state-v1';
const ADMIN_SESSION_KEY = 'emaus-admin-session';
const ADMIN_BACKUP_KEY = 'emaus-admin-backups-v1';
const ADMIN_EMAIL = 'admin@emaus.com.br';
const ADMIN_PASSWORD = 'Emaus@123';
const TODAY = '2026-09-06';

const DEFAULT_PLANS = [
  { id: 'essencial', name: 'Essencial', price: 49.90, members: 100, users: 5, description: 'Para igrejas que estão começando a organizar o cuidado.', features: ['Até 100 pessoas ativas', 'Acolhimento, visitantes e famílias', 'Agenda e relatórios essenciais', 'Até 5 acessos administrativos', 'Todos os recursos incluídos'] },
  { id: 'cuidado', name: 'Cuidado', price: 99.90, members: 300, users: 12, description: 'Para igrejas em crescimento com equipes e ministérios ativos.', features: ['Até 300 pessoas ativas', 'Tudo do Essencial', 'Comunicação e relatórios avançados', 'Identidade visual personalizada', 'Até 12 acessos administrativos'] },
  { id: 'rede', name: 'Rede', price: 179.90, members: 800, users: 25, description: 'Para igrejas maiores, redes e operações com várias equipes.', features: ['Até 800 pessoas ativas', 'Tudo do Cuidado', 'Até 3 congregações ou unidades', 'Indicadores financeiros e gestão avançada', 'Até 25 acessos administrativos'] }
];

const DEFAULT_POLICY = {
  trialDays: 30,
  founderChurches: 40,
  founderUsed: 0,
  priceFreezeMonths: 12,
  additionalFees: false,
  billingNote: 'Sem cobrança por usuário, mensagem, congregação extra ou módulo adicional.'
};

const DEFAULT_FINANCE = {
  months: [
    { label: 'Abr', income: 980, expense: 410 },
    { label: 'Mai', income: 1320, expense: 520 },
    { label: 'Jun', income: 1680, expense: 690 },
    { label: 'Jul', income: 2130, expense: 760 },
    { label: 'Ago', income: 2640, expense: 910 },
    { label: 'Set', income: 3190, expense: 1120 }
  ],
  transactions: [
    { id: 'expense-1', description: 'Servidor e infraestrutura', category: 'Tecnologia', amount: 680, date: '05 set 2026' },
    { id: 'expense-2', description: 'Comunicação e suporte', category: 'Operação', amount: 290, date: '03 set 2026' },
    { id: 'expense-3', description: 'Design e conteúdo', category: 'Marketing', amount: 150, date: '28 ago 2026' }
  ]
};

let currentView = 'overview';
let addChurchOpen = false;
let state = loadState();

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function money(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function number(value) {
  return Number(value || 0).toLocaleString('pt-BR');
}

function numeric(value) {
  return Number(String(value ?? '').replace(/\./g, '').replace(',', '.')) || 0;
}

function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'IG';
}

function normalizePlan(value, plans = state.platformPlans || DEFAULT_PLANS) {
  const rawValue = String(value || '').toLowerCase();
  const aliases = { crescimento: 'cuidado', comunidade: 'rede' };
  const raw = aliases[rawValue] || rawValue;
  const found = plans.find(plan => plan.id === raw || plan.name.toLowerCase() === raw);
  return found ? found.id : 'essencial';
}

function getPlan(id, plans = state.platformPlans || DEFAULT_PLANS) {
  return plans.find(plan => plan.id === id) || plans[0];
}

function normalizeChurch(church, plans = state.platformPlans || DEFAULT_PLANS) {
  const knownPeople = Number(church.memberCount ?? church.members ?? 0);
  const inferredPlan = church.plan || (knownPeople > 300 ? 'rede' : knownPeople > 100 ? 'cuidado' : 'essencial');
  const planId = normalizePlan(inferredPlan, plans);
  const plan = getPlan(planId, plans);
  return {
    ...church,
    name: church.name || 'Igreja sem nome',
    city: church.city || 'Brasil',
    initials: church.initials || initials(church.name),
    plan: planId,
    memberLimit: Number.isFinite(Number(church.memberLimit)) ? Number(church.memberLimit) : plan.members,
    memberCount: Number.isFinite(Number(church.memberCount)) ? Number(church.memberCount) : Number(church.members || 0),
    status: church.status === 'Bloqueada' ? 'Bloqueada' : (church.status || 'Ativa'),
    monthlyValue: Number.isFinite(Number(church.monthlyValue)) ? Number(church.monthlyValue) : plan.price,
    billingStatus: church.billingStatus || 'Em dia',
    nextDue: church.nextDue || '10 set 2026'
  };
}

function loadState() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STATE_KEY) || 'null'); } catch (error) { saved = null; }
  const base = saved && Array.isArray(saved.churches) ? saved : {
    activeChurchId: 'batesda',
    churches: [{ id: 'batesda', name: 'Bethesda', city: 'Itaboraí • RJ', initials: 'BE', logoSymbol: 'B', logoImage: 'bethesda-logo.png', plan: 'cuidado', status: 'Ativa', memberCount: 246, monthlyValue: 99.90, billingStatus: 'Em dia', nextDue: '10 set 2026' }],
    visitors: [],
    receptionUsers: []
  };
  const plans = base.platformPricingVersion === 3 && Array.isArray(base.platformPlans) && base.platformPlans.length
    ? DEFAULT_PLANS.map(defaultPlan => {
        const savedPlan = base.platformPlans.find(plan => plan.id === defaultPlan.id);
        return { ...defaultPlan, ...(savedPlan || {}), features: Array.isArray(savedPlan?.features) && savedPlan.features.length ? savedPlan.features : defaultPlan.features };
      })
    : clone(DEFAULT_PLANS);
  const policy = { ...DEFAULT_POLICY, ...(base.platformPolicy || {}), trialDays: 30, founderChurches: 40, founderUsed: Math.max(0, Number(base.platformPolicy?.founderUsed || 0)), priceFreezeMonths: 12, additionalFees: false };
  const loadedState = { ...base, platformPricingVersion: 3, platformPlans: plans, platformPolicy: policy, platformFinance: base.platformFinance || clone(DEFAULT_FINANCE) };
  loadedState.churches = loadedState.churches.map(church => normalizeChurch(church, plans));
  loadedState.platformFinance.months = Array.isArray(loadedState.platformFinance.months) && loadedState.platformFinance.months.length ? loadedState.platformFinance.months : clone(DEFAULT_FINANCE.months);
  loadedState.platformFinance.transactions = Array.isArray(loadedState.platformFinance.transactions) ? loadedState.platformFinance.transactions : clone(DEFAULT_FINANCE.transactions);
  return loadedState;
}

function createBackup(reason) {
  let history = [];
  try { history = JSON.parse(localStorage.getItem(ADMIN_BACKUP_KEY) || '[]'); } catch (error) { history = []; }
  history.unshift({ id: `admin-backup-${Date.now()}`, createdAt: new Date().toISOString(), reason, state: clone(state) });
  try { localStorage.setItem(ADMIN_BACKUP_KEY, JSON.stringify(history.slice(0, 30))); } catch (error) { console.info('Backup administrativo indisponível.', error); }
}

function saveState(reason = 'Alteração administrativa salva') {
  state.platformPricingVersion = 3;
  state.platformPolicy = { ...DEFAULT_POLICY, ...(state.platformPolicy || {}) };
  state.churches = state.churches.map(normalizeChurch);
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  createBackup(reason);
}

function toast(message) {
  const el = document.querySelector('#adminToast');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  window.setTimeout(() => el.classList.add('hidden'), 4200);
}

function isLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
}

function showLogin() {
  document.querySelector('#adminLoginView').classList.remove('hidden');
  document.querySelector('#adminAppView').classList.add('hidden');
}

function showApp() {
  document.querySelector('#adminLoginView').classList.add('hidden');
  document.querySelector('#adminAppView').classList.remove('hidden');
  render();
}

function activeChurches() {
  return state.churches.filter(church => church.status !== 'Bloqueada');
}

function recurringRevenue() {
  return activeChurches().reduce((total, church) => total + Number(church.monthlyValue || getPlan(church.plan)?.price || 0), 0);
}

function currentExpenses() {
  return (state.platformFinance.transactions || []).reduce((total, item) => total + Number(item.amount || 0), 0);
}

function monthMax() {
  return Math.max(...state.platformFinance.months.flatMap(month => [Number(month.income || 0), Number(month.expense || 0)]), 1);
}

function renderKpis() {
  const active = activeChurches().length;
  const revenue = recurringRevenue();
  const expense = currentExpenses();
  const people = activeChurches().reduce((total, church) => total + Number(church.memberCount || 0), 0);
  return `<div class="kpi-grid">
    <article class="kpi-card"><span class="kpi-icon">◈</span><small>Igrejas ativas</small><strong>${number(active)}</strong><span>${number(state.churches.length)} organizações cadastradas</span></article>
    <article class="kpi-card copper"><span class="kpi-icon">R$</span><small>Receita mensal prevista</small><strong>${money(revenue)}</strong><span>planos ativos</span></article>
    <article class="kpi-card green"><span class="kpi-icon">↑</span><small>Resultado operacional</small><strong>${money(revenue - expense)}</strong><span>receita menos gastos registrados</span></article>
    <article class="kpi-card blue"><span class="kpi-icon">◎</span><small>Pessoas gerenciadas</small><strong>${number(people)}</strong><span>cadastros ativos nas igrejas</span></article>
  </div>`;
}

function renderChart() {
  const max = monthMax();
  return `<div class="chart">${state.platformFinance.months.map(month => `<div class="chart-column"><div class="chart-bars"><i class="chart-bar" style="height:${Math.max(4, Number(month.income || 0) / max * 100)}%" title="Receita: ${money(month.income)}"></i><i class="chart-bar expense" style="height:${Math.max(4, Number(month.expense || 0) / max * 100)}%" title="Gastos: ${money(month.expense)}"></i></div></div>`).join('')}</div><div class="chart-labels">${state.platformFinance.months.map(month => `<span>${esc(month.label)}</span>`).join('')}</div>`;
}

function renderOverview() {
  const revenue = recurringRevenue();
  const expense = currentExpenses();
  const recent = state.churches.slice(0, 5);
  return `<section class="page-head"><div><span class="eyebrow">CENTRAL DO ADMINISTRADOR</span><h1>Visão geral</h1><p>Controle as organizações, os planos e a saúde financeira da plataforma Emaús.</p></div><div class="page-actions"><button class="btn" data-admin-view="finance">Ver finanças</button><button class="btn btn-gold" data-admin-view="churches">Gerenciar igrejas</button></div></section>
  ${renderPolicyBanner()}
  ${renderKpis()}
  <div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>Receita e gastos</h2><p>Visão demonstrativa dos últimos seis meses.</p></div><div class="legend"><span><i></i>Receita</span><span><i class="expense"></i>Gastos</span></div></div><div class="panel-body">${renderChart()}</div></section><section class="panel"><div class="panel-head"><div><h2>Resumo operacional</h2><p>Indicadores da administração central.</p></div></div><div class="panel-body"><div class="summary-list"><div class="summary-row"><span>Receita mensal prevista</span><strong>${money(revenue)}</strong></div><div class="summary-row"><span>Gastos registrados</span><strong class="negative">${money(expense)}</strong></div><div class="summary-row"><span>Resultado estimado</span><strong class="positive">${money(revenue - expense)}</strong></div><div class="summary-row"><span>Contas bloqueadas</span><strong>${number(state.churches.filter(church => church.status === 'Bloqueada').length)}</strong></div><div class="summary-row"><span>Backups administrativos</span><strong>${getBackupCount()}</strong></div></div></div></section></div>
  <section class="panel" style="margin-top:16px;"><div class="panel-head"><div><h2>Organizações recentes</h2><p>Ative ou bloqueie cada igreja e acompanhe o limite de pessoas do plano.</p></div><button class="btn btn-small" data-admin-view="churches">Ver todas</button></div><div class="table-wrap">${renderChurchTable(recent)}</div></section>`;
}

function getBackupCount() {
  try { const history = JSON.parse(localStorage.getItem(ADMIN_BACKUP_KEY) || '[]'); return history.length; } catch (error) { return 0; }
}

function renderChurchTable(churches) {
  if (!churches.length) return '<div class="empty">Nenhuma igreja cadastrada.</div>';
  return `<table><thead><tr><th>Organização</th><th>Plano</th><th>Status</th><th>Pessoas ativas</th><th>Mensalidade</th><th>Ações</th></tr></thead><tbody>${churches.map(church => {
    const plan = getPlan(church.plan);
    const isBlocked = church.status === 'Bloqueada';
    const memberCount = Number(church.memberCount || 0);
    const limit = Number(church.memberLimit || plan?.members || 0);
    const percentage = limit ? Math.min(100, memberCount / limit * 100) : 0;
    return `<tr><td><div class="church-cell"><div class="church-avatar">${church.logoImage ? `<img src="${esc(church.logoImage)}" alt="">` : esc(church.initials || initials(church.name))}</div><div class="church-meta"><strong>${esc(church.name)}</strong><small>${esc(church.city)}</small></div></div></td><td><strong>${esc(plan?.name || church.plan)}</strong><br><small style="color:var(--muted-2);">até ${number(limit)} pessoas</small>${church.founderPriceFreeze ? '<br><small class="founder-label">Preço congelado por 12 meses</small>' : ''}</td><td><span class="status ${isBlocked ? 'blocked' : 'active'}">${isBlocked ? 'Bloqueada' : 'Ativa'}</span></td><td><div class="member-meter"><div class="member-meter-line"><span>${number(memberCount)} / ${number(limit)}</span><strong>${Math.round(percentage)}%</strong></div><div class="meter"><i style="width:${percentage}%"></i></div></div></td><td>${money(church.monthlyValue || plan?.price)}</td><td><div class="row-actions"><button class="table-btn ${isBlocked ? 'gold' : 'danger'}" data-admin-action="toggle-church" data-id="${esc(church.id)}">${isBlocked ? 'Liberar' : 'Bloquear'}</button></div></td></tr>`;
  }).join('')}</tbody></table>`;
}
function renderChurches() {
  return `<section class="page-head"><div><span class="eyebrow">ORGANIZAÇÕES</span><h1>Igrejas cadastradas</h1><p>Gerencie o acesso, os planos e a situação de cada igreja.</p></div><div class="page-actions"><button class="btn btn-gold" data-admin-action="toggle-add-church">${addChurchOpen ? 'Fechar cadastro' : '+ Adicionar igreja'}</button></div></section>
  ${addChurchOpen ? `<section class="add-panel"><h3>Nova igreja</h3><p>O administrador cria a organização e libera o primeiro plano de acesso.</p><form data-admin-form="church"><div class="form-grid"><div class="field"><label for="newChurchName">Nome da igreja *</label><input id="newChurchName" name="name" required placeholder="Ex.: Igreja Esperança"></div><div class="field"><label for="newChurchCity">Cidade e estado</label><input id="newChurchCity" name="city" placeholder="Ex.: Niterói • RJ"></div><div class="field"><label for="newChurchPlan">Plano inicial</label><select id="newChurchPlan" name="plan">${state.platformPlans.map(plan => `<option value="${esc(plan.id)}">${esc(plan.name)} · ${money(plan.price)}/mês · até ${number(plan.members)} pessoas</option>`).join('')}</select></div><div class="field"><label for="newChurchAdmin">Responsável</label><input id="newChurchAdmin" name="admin" placeholder="Nome do pastor"></div></div><p class="founder-form-note">Se ainda houver vaga, esta igreja será marcada entre as 40 primeiras e terá o valor congelado por 12 meses.</p><div class="form-actions"><button type="button" class="btn" data-admin-action="toggle-add-church">Cancelar</button><button type="submit" class="btn btn-gold">Salvar igreja</button></div></form></section>` : ''}
  <section class="panel"><div class="panel-head"><div><h2>Todas as organizações</h2><p>${number(state.churches.length)} igreja${state.churches.length === 1 ? '' : 's'} no controle administrativo.</p></div><span class="status active">${number(activeChurches().length)} ativas</span></div><div class="table-wrap">${renderChurchTable(state.churches)}</div></section>`;
}

function renderPolicyBanner() {
  const policy = state.platformPolicy || DEFAULT_POLICY;
  const remaining = Math.max(0, Number(policy.founderChurches || 0) - Number(policy.founderUsed || 0));
  return `<section class="policy-banner"><div class="policy-mark">✓</div><div><strong>Oferta de lançamento da Emaús</strong><p>${number(policy.trialDays)} dias grátis · as primeiras ${number(policy.founderChurches)} igrejas têm o valor congelado por ${number(policy.priceFreezeMonths)} meses · sem cobranças adicionais.</p></div><span class="policy-badge">${number(remaining)} vagas restantes</span></section>`;
}

function renderPlans() {
  return `<section class="page-head"><div><span class="eyebrow">MONETIZAÇÃO</span><h1>Planos e preços</h1><p>Três planos simples, com limite claro de pessoas ativas e sem taxas adicionais escondidas.</p></div><div class="page-actions"><button class="btn btn-gold" data-admin-action="save-plans-top">Salvar tabela de preços</button></div></section>
  ${renderPolicyBanner()}
  <section class="panel"><div class="panel-head"><div><h2>Tabela de preços da Emaús</h2><p>Valores iniciais sugeridos para o mercado brasileiro. O administrador pode editar e salvar.</p></div><span class="status active">Editável</span></div><div class="panel-body"><form data-admin-form="plans"><div class="table-wrap"><table class="plan-table"><thead><tr><th>Plano</th><th>Mensalidade</th><th>Pessoas ativas</th><th>Acessos</th></tr></thead><tbody>${state.platformPlans.map(plan => `<tr><td><input name="name_${esc(plan.id)}" value="${esc(plan.name)}" aria-label="Nome do plano"></td><td><input name="price_${esc(plan.id)}" value="${esc(plan.price)}" type="number" min="0" step="0.01" aria-label="Preço mensal"></td><td><input name="members_${esc(plan.id)}" value="${esc(plan.members)}" type="number" min="1" step="25" aria-label="Limite de pessoas ativas"></td><td><input name="users_${esc(plan.id)}" value="${esc(plan.users)}" type="number" min="1" step="1" aria-label="Limite de acessos"></td></tr>`).join('')}</tbody></table></div><div class="form-actions"><button type="submit" class="btn btn-gold">Salvar alterações</button></div></form></div></section>
  <div class="plan-card-grid">${state.platformPlans.map((plan, index) => `<article class="plan-card ${index === 1 ? 'highlight' : ''}"><h3>${esc(plan.name)}</h3><div class="plan-price">${money(plan.price)} <small>/ mês</small></div><div class="plan-limits"><span>Até <strong>${number(plan.members)}</strong> pessoas ativas</span><span><strong>${number(plan.users)}</strong> acessos da equipe</span></div><p>${esc(plan.description || 'Plano da plataforma Emaús.')}</p><ul class="plan-points">${(plan.features || []).map(feature => `<li>${esc(feature)}</li>`).join('')}</ul></article>`).join('')}</div>`;
}
function renderFinance() {
  const revenue = recurringRevenue();
  const expense = currentExpenses();
  return `<section class="page-head"><div><span class="eyebrow">FINANCEIRO</span><h1>Ganhos e gastos</h1><p>Acompanhe a receita prevista, as despesas e o resultado da administração.</p></div><div class="page-actions"><button class="btn btn-gold" data-admin-action="focus-expense">+ Registrar gasto</button></div></section>
  <div class="kpi-grid"><article class="kpi-card copper"><span class="kpi-icon">R$</span><small>Ganhos mensais</small><strong>${money(revenue)}</strong><span>assinaturas ativas</span></article><article class="kpi-card"><span class="kpi-icon">◇</span><small>Gastos registrados</small><strong>${money(expense)}</strong><span>operação demonstrativa</span></article><article class="kpi-card green"><span class="kpi-icon">↑</span><small>Saldo estimado</small><strong>${money(revenue - expense)}</strong><span>resultado operacional</span></article><article class="kpi-card blue"><span class="kpi-icon">%</span><small>Margem estimada</small><strong>${revenue ? `${Math.round((revenue - expense) / revenue * 100)}%` : '0%'}</strong><span>sobre a receita</span></article></div>
  <div class="finance-grid"><section class="panel"><div class="panel-head"><div><h2>Desempenho financeiro</h2><p>Comparação mensal de receitas e gastos.</p></div><div class="legend"><span><i></i>Receita</span><span><i class="expense"></i>Gastos</span></div></div><div class="panel-body">${renderChart()}</div></section><section class="panel"><div class="panel-head"><div><h2>Registrar gasto</h2><p>Todos os campos possuem salvamento explícito.</p></div></div><div class="panel-body"><form data-admin-form="expense"><div class="field"><label for="expenseDescription">Descrição *</label><input id="expenseDescription" name="description" required placeholder="Ex.: Hospedagem da API"></div><div class="field" style="margin-top:12px;"><label for="expenseCategory">Categoria</label><select id="expenseCategory" name="category"><option>Tecnologia</option><option>Operação</option><option>Marketing</option><option>Equipe</option><option>Outro</option></select></div><div class="field" style="margin-top:12px;"><label for="expenseAmount">Valor (R$) *</label><input id="expenseAmount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0,00"></div><div class="form-actions"><button class="btn btn-gold" type="submit">Salvar gasto</button></div></form></div></section></div>
  <section class="panel" style="margin-top:16px;"><div class="panel-head"><div><h2>Gastos registrados</h2><p>Histórico financeiro mantido pelo administrador.</p></div></div><div class="panel-body"><div class="transaction-list">${state.platformFinance.transactions.length ? state.platformFinance.transactions.map(item => `<div class="transaction"><div class="transaction-icon">−</div><div class="transaction-copy"><strong>${esc(item.description)}</strong><span>${esc(item.category)} · ${esc(item.date)}</span></div><div class="transaction-value">− ${money(item.amount)}</div></div>`).join('') : '<div class="empty">Nenhum gasto registrado.</div>'}</div></div></section>`;
}

function render() {
  document.querySelectorAll('[data-admin-view]').forEach(button => button.classList.toggle('active', button.dataset.adminView === currentView));
  const content = document.querySelector('#adminContent');
  const renderers = { overview: renderOverview, churches: renderChurches, plans: renderPlans, finance: renderFinance };
  content.innerHTML = (renderers[currentView] || renderOverview)();
}

function setView(view) {
  if (!['overview', 'churches', 'plans', 'finance'].includes(view)) return;
  currentView = view;
  if (view !== 'churches') addChurchOpen = false;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChurch(id) {
  const church = state.churches.find(item => item.id === id);
  if (!church) return;
  const willBlock = church.status !== 'Bloqueada';
  const question = willBlock ? `Bloquear o acesso da ${church.name}?` : `Liberar novamente o acesso da ${church.name}?`;
  if (!window.confirm(question)) return;
  church.status = willBlock ? 'Bloqueada' : 'Ativa';
  saveState(willBlock ? `Igreja ${church.name} bloqueada` : `Igreja ${church.name} liberada`);
  render();
  toast(willBlock ? `${church.name} foi bloqueada.` : `${church.name} foi liberada.`);
}

function savePlans(form) {
  const data = new FormData(form);
  state.platformPlans = state.platformPlans.map(plan => ({
    ...plan,
    name: String(data.get(`name_${plan.id}`) || plan.name).trim(),
    price: numeric(data.get(`price_${plan.id}`)),
    members: numeric(data.get(`members_${plan.id}`)),
    users: numeric(data.get(`users_${plan.id}`))
  }));
  state.churches = state.churches.map(church => {
    const plan = getPlan(normalizePlan(church.plan));
    return { ...church, monthlyValue: plan.price, memberLimit: plan.members };
  });
  saveState('Tabela de preços atualizada');
  render();
  toast('Tabela de preços salva e backup automático realizado.');
}

function saveExpense(form) {
  const data = new FormData(form);
  const description = String(data.get('description') || '').trim();
  const amount = numeric(data.get('amount'));
  if (!description || amount <= 0) return toast('Informe a descrição e um valor válido.');
  state.platformFinance.transactions.unshift({ id: `expense-${Date.now()}`, description, category: String(data.get('category') || 'Outro'), amount, date: '06 set 2026' });
  const currentMonth = state.platformFinance.months[state.platformFinance.months.length - 1];
  if (currentMonth) currentMonth.expense = Number(currentMonth.expense || 0) + amount;
  saveState(`Gasto registrado: ${description}`);
  render();
  toast('Gasto salvo e backup automático realizado.');
}

function addChurch(form) {
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  if (!name) return toast('Informe o nome da igreja.');
  const planId = String(data.get('plan') || 'essencial');
  const plan = getPlan(planId);
  const policy = state.platformPolicy || DEFAULT_POLICY;
  const founderPriceFreeze = Number(policy.founderUsed || 0) < Number(policy.founderChurches || 40);
  if (founderPriceFreeze) policy.founderUsed = Number(policy.founderUsed || 0) + 1;
  const church = normalizeChurch({ id: `church-${Date.now()}`, name, city: String(data.get('city') || 'Brasil').trim(), initials: initials(name), logoSymbol: initials(name).slice(0, 2), logoImage: '', plan: plan.id, status: 'Ativa', memberLimit: plan.members, memberCount: 0, monthlyValue: plan.price, billingStatus: 'Em dia', nextDue: '10 set 2026', adminName: String(data.get('admin') || '').trim(), founderPriceFreeze, founderPlanPrice: founderPriceFreeze ? plan.price : null });
  state.churches.push(church);
  saveState(`Nova igreja cadastrada: ${name}`);
  addChurchOpen = false;
  render();
  toast(`${name} foi cadastrada e liberada.`);
}

function handleClick(event) {
  const nav = event.target.closest('[data-admin-view]');
  if (nav) { event.preventDefault(); setView(nav.dataset.adminView); return; }
  const action = event.target.closest('[data-admin-action]');
  if (!action) return;
  event.preventDefault();
  const type = action.dataset.adminAction;
  if (type === 'toggle-add-church') { addChurchOpen = !addChurchOpen; render(); return; }
  if (type === 'toggle-church') { toggleChurch(action.dataset.id); return; }
  if (type === 'save-plans-top') { document.querySelector('[data-admin-form="plans"]')?.requestSubmit(); return; }
  if (type === 'focus-expense') { document.querySelector('#expenseDescription')?.focus(); return; }
}

function handleSubmit(event) {
  const form = event.target.closest('[data-admin-form]');
  if (!form) return;
  event.preventDefault();
  const type = form.dataset.adminForm;
  if (type === 'login') {
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim().toLowerCase();
    const password = String(data.get('password') || '');
    const error = document.querySelector('#adminLoginError');
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      error.textContent = 'Login ou senha administrativa incorretos.';
      error.classList.remove('hidden');
      return;
    }
    error.classList.add('hidden');
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    showApp();
    return;
  }
  if (type === 'church') addChurch(form);
  if (type === 'plans') savePlans(form);
  if (type === 'expense') saveExpense(form);
}

function init() {
  document.querySelector('#adminEmail').value = ADMIN_EMAIL;
  document.querySelector('#adminLoginForm').dataset.adminForm = 'login';
  document.addEventListener('click', handleClick);
  document.addEventListener('submit', handleSubmit);
  document.querySelector('#adminLogout').addEventListener('click', () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    showLogin();
  });
  if (isLoggedIn()) showApp(); else showLogin();
}

init();

const ICON = (name, className = 'icon') => `<svg class="${className}"><use href="#icon-${name}"></use></svg>`;
const PLATFORM_NAME = 'Emaús';
const STORAGE_KEY = 'batesda-platform-state-v1';
const TODAY = '2026-09-04';
const DEFAULT_APPEARANCE = { theme: 'light', font: 'editorial', primary: '#d7a84b', accent: '#b86f45' };
const PALETTES = {
  batesda: { label: 'Dourado & cobre', primary: '#d7a84b', accent: '#b86f45' },
  oceano: { label: 'Oceano & areia', primary: '#5b8396', accent: '#c88955' },
  olive: { label: 'Oliva & bronze', primary: '#9b9b5a', accent: '#8b623d' },
  vinho: { label: 'Vinho & dourado', primary: '#b35d62', accent: '#d19a4e' }
};

const defaultState = {
  activeView: 'dashboard',
  activeChurchId: 'batesda',
  settingsSection: 'organization',
  currentUser: { name: 'Evandro & Simone', role: 'Pastor da igreja', roleKey: 'church_admin' },
  metrics: {
    visits: 38,
    returns: 18,
    reach: 246,
    announcements: 12
  },
  churches: [
    { id: 'batesda', name: 'Bethesda', city: 'Itaboraí • RJ', phone: '(21) 00000-0000', pastors: 'Evandro e Simone', description: 'Um lugar para pertencer, crescer e viver a fé em comunidade.', initials: 'BE', logoSymbol: 'B', logoImage: 'bethesda-logo.png', appearance: { ...DEFAULT_APPEARANCE }, members: 246, status: 'Ativa', plan: 'Essencial' }
  ],
  visitors: [
    { id: 'v-1', name: 'Ana Clara Nogueira', familyName: 'Família Nogueira', familyMembers: ['Ana Clara Nogueira', 'Paulo Nogueira', 'Lara Nogueira'], arrivalType: 'Família', phone: '(21) 99842-1874', date: '2026-09-02', service: 'Culto de Celebração', neighborhood: 'Centro', invitedBy: 'Mariana Alves', status: 'Novo', responsible: 'Recepção', notes: 'Veio com a família.', consent: true },
    { id: 'v-2', name: 'Marcos Vinícius Ribeiro', familyName: '', familyMembers: ['Marcos Vinícius Ribeiro'], arrivalType: 'Sozinho', phone: '(21) 99118-4420', date: '2026-08-30', service: 'Culto da Família', neighborhood: 'Manilha', invitedBy: 'João Pedro', status: 'Contatado', responsible: 'Pr. Evandro', notes: 'Agradeceu a recepção.', consent: true },
    { id: 'v-3', name: 'Júlia Souza', familyName: '', familyMembers: ['Júlia Souza', 'Carlos Souza'], arrivalType: 'Em casal', phone: '(21) 99731-9002', date: '2026-08-23', service: 'Culto de Celebração', neighborhood: 'Outeiro', invitedBy: 'Camila Martins', status: 'Retornou', responsible: 'Simone', notes: 'Retornou no encontro de quarta.', consent: true },
    { id: 'v-4', name: 'Rafael Oliveira', familyName: '', familyMembers: ['Rafael Oliveira'], arrivalType: 'Com amigos', phone: '(21) 98877-2106', date: '2026-08-16', service: 'Culto de Celebração', neighborhood: 'Nancilândia', invitedBy: '—', status: 'Novo', responsible: 'Recepção', notes: '', consent: true },
    { id: 'v-5', name: 'Camila Martins', familyName: '', familyMembers: ['Camila Martins'], arrivalType: 'Família', phone: '(21) 99612-7361', date: '2026-08-09', service: 'Santa Ceia', neighborhood: 'Centro', invitedBy: 'Equipe de louvor', status: 'Integrado', responsible: 'Líder de célula', notes: 'Participa da célula do Centro.', consent: true }
  ],
  announcements: [
    { id: 'a-1', title: 'Culto de Celebração', body: 'Neste domingo, às 19h. Convide alguém especial para estar conosco.', audience: 'Toda a igreja', channels: ['Push', 'WhatsApp'], date: '04 set 2026', status: 'Enviado', reach: '246 pessoas', tone: 'gold' },
    { id: 'a-2', title: 'Encontro de Mulheres', body: 'Uma noite de comunhão, palavra e cuidado. Inscrições abertas na recepção.', audience: 'Ministério de Mulheres', channels: ['Push', 'E-mail'], date: '02 set 2026', status: 'Enviado', reach: '64 pessoas', tone: 'copper' },
    { id: 'a-3', title: 'Escala de setembro', body: 'A escala dos obreiros já está disponível para consulta.', audience: 'Obreiros', channels: ['Push'], date: '30 ago 2026', status: 'Enviado', reach: '31 pessoas', tone: 'gold' }
  ],
  events: [
    { id: 'e-1', title: 'Culto de Celebração', date: '2026-09-06', time: '19:00', location: 'Templo principal', type: 'Culto', audience: 'Toda a igreja' },
    { id: 'e-2', title: 'Encontro de Mulheres', date: '2026-09-12', time: '18:30', location: 'Salão social', type: 'Encontro', audience: 'Ministério de Mulheres' },
    { id: 'e-3', title: 'Culto de Ensino', date: '2026-09-16', time: '19:30', location: 'Templo principal', type: 'Culto', audience: 'Toda a igreja' },
    { id: 'e-4', title: 'Café com líderes', date: '2026-09-19', time: '08:30', location: 'Sala de reuniões', type: 'Liderança', audience: 'Lideranças' }
  ],
  receptionUsers: [
    { id: 'r-1', name: 'Mariana Alves', role: 'Recepção', roleKey: 'reception', churchId: 'batesda', login: 'mariana@bethesda.com.br', password: '123456', phone: '(21) 99704-2118', passwordStatus: 'Ativa', status: 'Ativo', lastAccess: 'Hoje, 10:42', permissions: ['acolhimento'], initials: 'MA', tone: 'copper' },
    { id: 'r-2', name: 'João Pedro', role: 'Obreiro', roleKey: 'reception', churchId: 'batesda', login: 'joao@bethesda.com.br', password: '123456', phone: '(21) 99634-1822', passwordStatus: 'Ativa', status: 'Ativo', lastAccess: 'Domingo, 18:21', permissions: ['acolhimento'], initials: 'JP', tone: 'olive' }
  ],
  leaders: [
    { id: 'l-1', name: 'Evandro', role: 'Pastor titular', phone: '(21) 99921-4421', group: 'Administração', initials: 'EV', tone: 'gold' },
    { id: 'l-2', name: 'Simone', role: 'Pastora e cuidado', phone: '(21) 99812-7310', group: 'Acolhimento', initials: 'SI', tone: 'copper' },
    { id: 'l-3', name: 'João Pedro', role: 'Líder de obreiros', phone: '(21) 99634-1822', group: 'Obreiros', initials: 'JP', tone: 'olive' },
    { id: 'l-4', name: 'Mariana Alves', role: 'Líder de recepção', phone: '(21) 99704-2118', group: 'Recepção', initials: 'MA', tone: 'dark' },
    { id: 'l-5', name: 'Camila Martins', role: 'Líder de célula', phone: '(21) 99572-3188', group: 'Célula Centro', initials: 'CM', tone: 'copper' },
    { id: 'l-6', name: 'Daniel Souza', role: 'Ministério de louvor', phone: '(21) 99280-4471', group: 'Louvor', initials: 'DS', tone: 'olive' }
  ],
  activity: [
    { type: 'visitor', name: 'Ana Clara Nogueira', text: 'foi cadastrada como nova visitante.', time: 'Hoje, 10:42', initials: 'AN', tone: 'copper' },
    { type: 'announcement', name: 'Culto de Celebração', text: 'foi enviado para toda a igreja.', time: 'Hoje, 09:15', initials: 'CC', tone: 'gold' },
    { type: 'return', name: 'Júlia Souza', text: 'retornou pela segunda vez.', time: 'Ontem, 20:18', initials: 'JS', tone: 'olive' },
    { type: 'event', name: 'Encontro de Mulheres', text: 'foi adicionado à agenda.', time: '01 set, 14:06', initials: 'EM', tone: 'dark' }
  ]
};

let state = loadState();
let pendingLogoImage = null;
const viewHistory = [];

const viewMeta = {
  dashboard: { label: 'Início' },
  acolhimento: { label: 'Acolhimento' },
  visitors: { label: 'Visitantes' },
  pulpit: { label: 'Modo púlpito' },
  communication: { label: 'Comunicação' },
  agenda: { label: 'Agenda' },
  leaders: { label: 'Lideranças' },
  settings: { label: 'Configurações' }
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.visitors && saved.events && saved.churches) {
      const merged = { ...structuredClone(defaultState), ...saved, currentUser: { ...defaultState.currentUser, ...(saved.currentUser || {}) }, metrics: { ...defaultState.metrics, ...(saved.metrics || {}) } };
      merged.visitors = merged.visitors.map(visitor => {
        const defaultVisitor = defaultState.visitors.find(item => item.id === visitor.id);
        return {
          ...visitor,
          familyName: visitor.familyName || defaultVisitor?.familyName || '',
          familyMembers: Array.isArray(visitor.familyMembers) && visitor.familyMembers.length ? visitor.familyMembers : (defaultVisitor?.familyMembers || [visitor.name]),
          arrivalType: visitor.arrivalType || defaultVisitor?.arrivalType || 'Sozinho',
          announced: Boolean(visitor.announced)
        };
      });
      merged.churches = merged.churches.map(church => ({
        ...church,
        name: church.id === 'batesda' ? 'Bethesda' : church.name,
        initials: church.id === 'batesda' ? 'BE' : (church.initials || initials(church.name)),
        logoSymbol: church.logoSymbol || (church.id === 'batesda' ? 'B' : initials(church.name).slice(0, 2)),
        logoImage: church.id === 'batesda' ? 'bethesda-logo.png' : (church.logoImage || ''),
        phone: church.phone || '(21) 00000-0000',
        pastors: church.pastors || 'Evandro e Simone',
        description: church.description || 'Um lugar para pertencer, crescer e viver a fé em comunidade.',
        appearance: { ...DEFAULT_APPEARANCE, ...(church.appearance || {}) }
      }));
      merged.receptionUsers = (merged.receptionUsers || []).map((user, index) => ({
        ...user,
        roleKey: user.roleKey || 'reception',
        churchId: user.churchId || 'batesda',
        login: (user.login || `${slugify(user.name)}@${slugify(defaultState.churches[0]?.name || 'igreja')}.com.br`).replace(/@batesda\.com\.br$/i, '@bethesda.com.br'),
        password: user.password || (/^(mariana|joao)@(batesda|bethesda)\.com\.br$/i.test(String(user.login || '')) ? '123456' : ''),
        passwordStatus: user.passwordStatus || 'Ativa',
        permissions: Array.isArray(user.permissions) && user.permissions.length ? user.permissions : ['acolhimento']
      }));
      return merged;
    }
  } catch (error) {
    console.info('Iniciando uma nova área de trabalho.', error);
  }
  return structuredClone(defaultState);
}

const BACKUP_STORAGE_KEY = 'batesda-platform-backups-v1';
const BACKUP_LIMIT = 30;

function getBackupHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY));
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.info('Não foi possível ler os backups automáticos.', error);
    return [];
  }
}

function persistBackupHistory(history) {
  for (let limit = history.length; limit > 0; limit -= 1) {
    try {
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(history.slice(0, limit)));
      return true;
    } catch (error) {
      // Se o navegador atingir o limite do armazenamento, conserva as versões mais recentes.
    }
  }
  return false;
}

function createAutomaticBackup(reason = 'Alteração salva') {
  const snapshot = structuredClone(state);
  const history = getBackupHistory();
  history.unshift({
    id: `backup-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    reason,
    churchId: state.activeChurchId,
    state: snapshot
  });
  const saved = persistBackupHistory(history.slice(0, BACKUP_LIMIT));
  if (!saved) console.info('Não foi possível criar o backup automático.');
  return saved;
}

function formatBackupDate(date) {
  if (!date) return 'ainda não realizado';
  try {
    return new Date(date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  } catch (error) {
    return 'agora';
  }
}

function saveState(reason = 'Alteração salva') {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    createAutomaticBackup(reason);
  } catch (error) {
    console.info('Não foi possível salvar o protótipo.', error);
  }
}

function $(selector, root = document) { return root.querySelector(selector); }
function $$(selector, root = document) { return [...root.querySelectorAll(selector)]; }
function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}
function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || '—';
}
function iconTone(tone = 'gold') {
  return tone === 'copper' ? 'avatar-copper' : tone === 'olive' ? 'avatar-olive' : tone === 'dark' ? 'avatar-dark' : 'avatar-gold';
}
function parseDate(date) {
  return new Date(`${date}T12:00:00`);
}
function formatDateShort(date) {
  if (!date) return '—';
  const d = parseDate(date);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '').replace(' de ', ' ');
}
function formatDateLong(date) {
  if (!date) return '—';
  const d = parseDate(date);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
function monthLabel(date) {
  return parseDate(date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^./, char => char.toUpperCase());
}
function statusClass(status) {
  return ({ 'Novo': 'status-new', 'Contatado': 'status-contacted', 'Retornou': 'status-returned', 'Integrado': 'status-integrated' }[status] || 'status-new');
}
function getActiveChurch() {
  return state.churches.find(church => church.id === state.activeChurchId) || state.churches[0];
}
function isPlatformAdmin() {
  return state.currentUser?.roleKey === 'platform_admin';
}
function getCurrentReceptionAccess() {
  if (state.currentUser?.roleKey !== 'reception') return null;
  const users = state.receptionUsers || [];
  return users.find(user => (user.id === state.currentUser.receptionUserId || user.login === state.currentUser.login || user.name === state.currentUser.name) && (!user.churchId || user.churchId === state.activeChurchId)) || null;
}
function canAccessAcolhimento() {
  if (state.currentUser?.roleKey !== 'reception') return true;
  const access = getCurrentReceptionAccess();
  return Boolean(access && access.status !== 'Bloqueado' && (access.permissions || []).includes('acolhimento'));
}
function slugify(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'igreja';
}
function receptionLink(church = getActiveChurch()) {
  const pathname = window.location?.pathname || '/';
  const basePath = pathname.endsWith('/') ? pathname : pathname.slice(0, pathname.lastIndexOf('/') + 1);
  return `${window.location.origin}${basePath}recepcao.html`;
}
function churchLogoText(church) {
  return String(church?.logoSymbol || (church?.id === 'batesda' ? 'B' : initials(church?.name || 'B'))).trim().slice(0, 2).toUpperCase() || 'B';
}
function normalizeHex(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value || '')) ? String(value).toLowerCase() : fallback;
}
function hexToRgb(hex) {
  const value = normalizeHex(hex, '#000000').slice(1);
  return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16) };
}
function mixHex(first, second, secondWeight = .5) {
  const a = hexToRgb(first); const b = hexToRgb(second); const weight = Math.max(0, Math.min(1, secondWeight));
  const channel = key => Math.round(a[key] * (1 - weight) + b[key] * weight).toString(16).padStart(2, '0');
  return `#${channel('r')}${channel('g')}${channel('b')}`;
}
function applyAppearance() {
  const church = getActiveChurch();
  const appearance = { ...DEFAULT_APPEARANCE, ...(church?.appearance || {}) };
  const primary = normalizeHex(appearance.primary, DEFAULT_APPEARANCE.primary);
  const accent = normalizeHex(appearance.accent, DEFAULT_APPEARANCE.accent);
  const preference = ['light', 'dark', 'auto'].includes(appearance.theme) ? appearance.theme : 'light';
  const resolved = preference === 'auto' ? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preference;
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.setProperty('--gold', primary);
  root.style.setProperty('--gold-2', mixHex(primary, '#ffffff', .22));
  root.style.setProperty('--gold-soft', resolved === 'dark' ? mixHex(primary, '#181817', .68) : mixHex(primary, '#ffffff', .86));
  root.style.setProperty('--copper', accent);
  root.style.setProperty('--copper-soft', resolved === 'dark' ? mixHex(accent, '#181817', .67) : mixHex(accent, '#ffffff', .87));
  const fontMap = {
    editorial: { sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', display: 'Georgia, "Times New Roman", serif' },
    modern: { sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', display: 'Inter, ui-sans-serif, system-ui, sans-serif' },
    classic: { sans: 'Trebuchet MS, Arial, sans-serif', display: 'Georgia, "Times New Roman", serif' },
    clean: { sans: 'Arial, Helvetica, sans-serif', display: 'Arial, Helvetica, sans-serif' }
  };
  const fonts = fontMap[appearance.font] || fontMap.editorial;
  root.style.setProperty('--font-sans', fonts.sans);
  root.style.setProperty('--font-display', fonts.display);
}
function applyAppearanceFromControls() {
  const church = getActiveChurch();
  if (!church) return;
  church.appearance = {
    ...DEFAULT_APPEARANCE,
    ...(church.appearance || {}),
    theme: $('#appearanceTheme')?.value || church.appearance?.theme || DEFAULT_APPEARANCE.theme,
    font: $('#appearanceFont')?.value || church.appearance?.font || DEFAULT_APPEARANCE.font,
    primary: normalizeHex($('#appearancePrimary')?.value, church.appearance?.primary || DEFAULT_APPEARANCE.primary),
    accent: normalizeHex($('#appearanceAccent')?.value, church.appearance?.accent || DEFAULT_APPEARANCE.accent)
  };
  const primaryText = $('[data-color-text="appearancePrimary"]');
  const accentText = $('[data-color-text="appearanceAccent"]');
  if (primaryText) primaryText.value = church.appearance.primary.toUpperCase();
  if (accentText) accentText.value = church.appearance.accent.toUpperCase();
  applyAppearance();
  saveState();
}
function applyPalette(key) {
  const palette = PALETTES[key];
  if (!palette) return;
  if ($('#appearancePrimary')) $('#appearancePrimary').value = palette.primary;
  if ($('#appearanceAccent')) $('#appearanceAccent').value = palette.accent;
  applyAppearanceFromControls();
  showToast(`Paleta “${palette.label}” aplicada nesta igreja.`);
}
function updateLogoMark(textId, imageId, church) {
  const text = document.getElementById(textId);
  const image = document.getElementById(imageId);
  if (text) { text.textContent = churchLogoText(church); text.hidden = Boolean(church?.logoImage); }
  if (image) {
    image.hidden = !church?.logoImage;
    if (church?.logoImage) { image.src = church.logoImage; image.alt = `${church.name} — logo`; }
  }
}
function visitorCountByStatus(status) {
  return state.visitors.filter(visitor => visitor.status === status).length;
}
function getFamilyMembers(visitor) {
  const members = Array.isArray(visitor?.familyMembers) && visitor.familyMembers.length ? visitor.familyMembers : [visitor?.name];
  return [...new Set(members.filter(Boolean).map(member => String(member).trim()).filter(Boolean))];
}
function familySummary(visitor) {
  const members = getFamilyMembers(visitor);
  if (members.length <= 1) return '';
  const label = visitor.familyName || `${members.length} pessoas`;
  return `<span class="family-summary">${ICON('users')} ${esc(label)} · ${members.map(esc).join(', ')}</span>`;
}
function arrivalIcon(type) {
  return ({ 'Sozinho': 'user-round', 'Com amigos': 'sparkle', 'Em casal': 'heart', 'Família': 'users' }[type] || 'users');
}
function arrivalTone(type) {
  return ({ 'Sozinho': 'alone', 'Com amigos': 'friends', 'Em casal': 'couple', 'Família': 'family' }[type] || 'family');
}
function arrivalPill(type = 'Sozinho') {
  return `<span class="arrival-pill arrival-${arrivalTone(type)}">${ICON(arrivalIcon(type))} ${esc(type)}</span>`;
}
function visitorCountByArrival(type) {
  return state.visitors.filter(visitor => (visitor.arrivalType || 'Sozinho') === type).length;
}
function familyNamesForVisitors(visitors) {
  return [...new Set(visitors.flatMap(getFamilyMembers))];
}
function namesAsSentence(names) {
  const clean = [...new Set(names.filter(Boolean))];
  if (!clean.length) return '';
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} e ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')} e ${clean[clean.length - 1]}`;
}
function visitorAnnouncementGroups(visitors = []) {
  return visitors.map(visitor => {
    const type = visitor.arrivalType || 'Sozinho';
    const label = type === 'Família' ? (visitor.familyName || 'Família') : type === 'Em casal' ? 'Casal' : type === 'Com amigos' ? 'Amigos' : 'Sozinho';
    return { label, type, names: getFamilyMembers(visitor) };
  }).filter(group => group.names.length);
}
function renderVisitorAnnouncementGroups(visitors = []) {
  return visitorAnnouncementGroups(visitors).map(group => `<div class="announcement-preview-line"><span class="announcement-preview-label">${arrivalPill(group.type)}</span><strong>${esc(group.label)}:</strong><span>${esc(namesAsSentence(group.names))}</span></div>`).join('');
}
function buildVisitorAnnouncement(visitors) {
  const groups = visitorAnnouncementGroups(visitors);
  const churchName = getActiveChurch()?.name || 'nossa igreja';
  const lines = groups.map(group => `${group.label}: ${namesAsSentence(group.names)}`);
  return {
    title: groups.length ? 'Sejam bem-vindos, visitantes!' : 'Boas-vindas aos visitantes',
    body: groups.length ? `Recebemos com alegria os nossos visitantes:\n${lines.join('\n')}\nSejam muito bem-vindos à ${churchName}!` : `Recebemos novos visitantes com alegria. Sejam muito bem-vindos à ${churchName}!`
  };
}
function familyMemberRow(value = '', index = 1) {
  return `<div class="family-member-row"><span class="family-member-number">${index}</span><input class="input" name="familyMembers" value="${esc(value)}" placeholder="Nome completo do familiar"><button type="button" class="table-action family-remove" data-action="remove-family-member" aria-label="Remover pessoa">${ICON('x')}</button></div>`;
}
function dateDay(date) { return parseDate(date).getDate(); }
function dateMonth(date) { return parseDate(date).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase(); }
function sortedEvents() { return [...state.events].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)); }
function escapeCSV(value) { return `"${String(value ?? '').replace(/"/g, '""')}"`; }

function applySettingsSection(section = state.settingsSection || 'organization') {
  const validSections = ['organization', 'notifications', 'team', 'saas'];
  state.settingsSection = validSections.includes(section) ? section : 'organization';
  $$('.settings-nav button').forEach(button => button.classList.toggle('active', button.dataset.settingsSection === state.settingsSection));
  $$('.settings-panels [data-settings-panel]').forEach(panel => {
    panel.classList.toggle('is-hidden', panel.dataset.settingsPanel !== state.settingsSection);
  });
}

function render() {
  applyAppearance();
  updateShell();
  const content = $('#appContent');
  if (!content) return;
  if (state.activeView === 'acolhimento' && !canAccessAcolhimento()) state.activeView = 'dashboard';
  const renderers = { dashboard: renderDashboard, acolhimento: renderAcolhimento, visitors: renderVisitors, pulpit: renderPulpit, communication: renderCommunication, agenda: renderAgenda, leaders: renderLeaders, settings: renderSettings };
  content.innerHTML = (renderers[state.activeView] || renderDashboard)();
  updateShell();
  if (state.activeView === 'settings') applySettingsSection();
}

function updateShell() {
  const meta = viewMeta[state.activeView] || viewMeta.dashboard;
  const current = $('#breadcrumbCurrent');
  if (current) current.textContent = meta.label;
  const church = getActiveChurch();
  const churchName = $('#activeChurchName');
  if (churchName) churchName.textContent = church?.name || 'Bethesda';
  const sidebarBrandName = $('#sidebarBrandName');
  if (sidebarBrandName) sidebarBrandName.textContent = church?.name || 'Bethesda';
  const topbarChurchName = $('#topbarChurchName');
  if (topbarChurchName) topbarChurchName.textContent = church?.name || 'Bethesda';
  document.title = `${church?.name || 'Bethesda'} · ${PLATFORM_NAME}`;
  const userName = state.currentUser?.name || 'Evandro & Simone';
  const userRole = state.currentUser?.role || 'Pastor da igreja';
  if ($('#sidebarUserName')) $('#sidebarUserName').textContent = userName;
  if ($('#sidebarUserRole')) $('#sidebarUserRole').textContent = userRole;
  if ($('#topProfileName')) $('#topProfileName').textContent = userName;
  if ($('#topProfileRole')) $('#topProfileRole').textContent = userRole;
  const sidebarChurchSymbol = $('#sidebarChurchSymbol');
  if (sidebarChurchSymbol) sidebarChurchSymbol.textContent = church?.logoImage ? (church.initials || initials(church.name)) : churchLogoText(church);
  updateLogoMark('sidebarLogoSymbol', 'sidebarLogoImage', church);
  updateLogoMark('topbarLogoSymbol', 'topbarLogoImage', church);
  $$('.nav-item, .mobile-nav-item').forEach(button => button.classList.toggle('active', button.dataset.view === state.activeView));
  const acolhimentoAvailable = canAccessAcolhimento();
  $$('[data-view="acolhimento"]').forEach(button => {
    button.classList.toggle('is-hidden', !acolhimentoAvailable);
    button.setAttribute('aria-hidden', String(!acolhimentoAvailable));
  });
  const backButton = $('#backBtn');
  if (backButton) {
    const canGoBack = state.activeView !== 'dashboard';
    backButton.classList.toggle('is-hidden', !canGoBack);
    backButton.setAttribute('aria-hidden', String(!canGoBack));
    backButton.tabIndex = canGoBack ? 0 : -1;
  }
}

function renderDashboard() {
  const church = getActiveChurch();
  const events = sortedEvents();
  const chartValues = [38, 44, 41, 52, 48, 60, 54, 67, 63, 71, 69, 82];
  return `
    <section class="page-head">
      <div>
        <span class="eyebrow">Sexta-feira, 04 de setembro de 2026</span>
        <h1>Bom dia, Evandro & Simone <span class="heading-sparkle">${ICON('sparkle')}</span></h1>
        <p>Uma visão clara para cuidar melhor das pessoas e da sua igreja.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" data-view="acolhimento"><span>${ICON('heart')}</span> Acolhimento</button>
        <button class="btn btn-gold" data-action="new-visitor"><span>${ICON('plus')}</span> Novo visitante</button>
      </div>
    </section>

    <div class="welcome-banner">
      <div class="welcome-copy"><div class="welcome-icon">${ICON('sparkle')}</div><div><strong>O cuidado começa na chegada.</strong><p>Há <b>${visitorCountByStatus('Novo')}</b> visitantes esperando um primeiro contato hoje.</p></div></div>
      <button class="btn btn-quiet welcome-action" data-view="pulpit">Abrir modo púlpito ${ICON('arrow-up-right')}</button>
    </div>

    <section class="stat-grid">
      ${statCard('Visitantes este mês', state.metrics.visits, '+18,4%', 'vs. mês anterior', 'users', 'copper', false, 'visits')}
      ${statCard('Retornos confirmados', state.metrics.returns, '+6,2%', 'da base de visitantes', 'refresh', 'gold', false, 'returns')}
      ${statCard('Alcance da comunidade', state.metrics.reach, '+12,8%', 'pessoas alcançadas', 'send', 'green', false, 'reach')}
      ${statCard('Próximo culto', events[0] ? `${String(dateDay(events[0].date)).padStart(2, '0')}/${String(parseDate(events[0].date).getMonth() + 1).padStart(2, '0')}` : '—', events[0]?.time || '—', events[0]?.title || 'Nenhum evento agendado', 'calendar', 'dark', true, 'next')}
    </section>

    <div class="dashboard-grid">
      <div class="side-stack">
        <section class="panel activity-panel"><div class="panel-header"><div class="panel-heading"><h2>Atividade recente</h2><p>O que está acontecendo na ${esc(church.name)}</p></div><button class="panel-link" data-view="visitors">Ver tudo ${ICON('arrow-up-right')}</button></div><ul class="activity-list">${renderActivityItems()}</ul></section>
        <section class="panel upcoming-panel"><div class="panel-header"><div class="panel-heading"><h2>Próximos eventos</h2><p>Programação da igreja</p></div><button class="panel-link" data-view="agenda">Agenda ${ICON('arrow-up-right')}</button></div><div class="event-list">${events.slice(0, 3).map(renderEventRow).join('')}</div></section>
      </div>
    </div>

    <section class="panel chart-panel growth-panel">
      <div class="panel-header"><div class="panel-heading"><h2>Visão de crescimento</h2><p>Visitantes registrados nas últimas 12 semanas</p></div><div class="chart-legend"><span class="legend-key"><i class="legend-dot"></i> Visitantes</span><span class="legend-key"><i class="legend-dot copper"></i> Retornos</span></div></div>
      <div class="chart-wrap"><div class="chart-y"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div><div class="chart-area"><div class="chart-grid"><span></span><span></span><span></span><span></span><span></span></div><div class="bars">${chartValues.map((value, index) => `<div class="bar-group"><i class="bar copper" style="height:${Math.max(12, value * .55)}%"></i><i class="bar gold" style="height:${value}%"></i></div>`).join('')}</div><div class="x-labels"><span>Jun 14</span><span>Jun 28</span><span>Jul 12</span><span>Jul 26</span><span>Ago 09</span><span>Ago 23</span><span>Set 04</span></div></div></div>
      <div class="chart-footer"><span>Este mês</span><strong>${state.metrics.visits} visitantes</strong><span class="stat-trend">${ICON('arrow-up-right')} 18,4%</span></div>
    </section>
  `;
}

function statCard(label, value, trendOrSubtitle, subtitleOrIcon, icon, tone = 'gold', special = false, metric = '') {
  const interactive = metric ? 'stat-card-interactive' : '';
  const actionAttrs = metric ? `data-action="open-metric" data-metric="${esc(metric)}" role="button" tabindex="0" aria-label="Abrir detalhes de ${esc(label)}"` : '';
  const openIcon = metric ? `<span class="stat-open">${ICON('arrow-up-right')}</span>` : '';
  if (special) {
    return `<article class="stat-card ${interactive}" ${actionAttrs}><div class="stat-top"><span class="stat-label">${esc(label)}</span><span class="stat-icon ${tone}">${ICON(icon)}</span></div><div class="stat-number">${esc(value)}</div><div class="stat-bottom"><span class="stat-trend copper">${esc(trendOrSubtitle)}</span><span>${esc(subtitleOrIcon)}</span></div>${openIcon}</article>`;
  }
  return `<article class="stat-card ${interactive}" ${actionAttrs}><div class="stat-top"><span class="stat-label">${esc(label)}</span><span class="stat-icon ${tone}">${ICON(icon)}</span></div><div class="stat-number">${esc(value)}</div><div class="stat-bottom"><span class="stat-trend">${ICON('arrow-up-right')} ${esc(trendOrSubtitle)}</span><span>${esc(subtitleOrIcon)}</span></div>${openIcon}</article>`;
}

function renderActivityItems() {
  return state.activity.slice(0, 4).map(item => `<li class="activity-item"><div class="activity-avatar ${iconTone(item.tone)}">${esc(item.initials)}</div><div class="activity-content"><p><strong>${esc(item.name)}</strong> ${esc(item.text)}</p><span class="activity-time">${esc(item.time)}</span></div></li>`).join('');
}

function renderAcolhimento() {
  const church = getActiveChurch();
  const pending = pendingPulpitVisitors();
  const recent = state.visitors.slice(0, 8);
  const groups = visitorAnnouncementGroups(recent);
  const messageVisitors = pending.length ? pending : recent.slice(0, 4);
  const suggestedMessage = buildVisitorAnnouncement(messageVisitors);
  const totalPeople = recent.reduce((total, visitor) => total + getFamilyMembers(visitor).length, 0);
  const groupMarkup = groups.length ? groups.map(group => `<div class="acolhimento-group-row"><div class="acolhimento-group-icon arrival-${arrivalTone(group.type)}">${ICON(arrivalIcon(group.type))}</div><div class="acolhimento-group-copy"><div class="acolhimento-group-title">${arrivalPill(group.type)}<strong>${esc(group.label)}</strong></div><p>${esc(namesAsSentence(group.names))}</p></div></div>`).join('') : `<div class="empty-state"><div class="icon-tile">${ICON('users')}</div><h3>Nenhum cadastro ainda</h3><p>Os visitantes cadastrados na recepção aparecerão aqui.</p></div>`;
  return `
    <section class="page-head"><div><span class="eyebrow">RECEPÇÃO · ACOLHIMENTO</span><h1>Acolhimento</h1><p>Uma visão simples para a equipe receber cada pessoa pelo nome e respeitar seus grupos.</p></div><div class="page-actions"><button class="btn btn-secondary" data-action="announce-visitors">${ICON('megaphone')} Preparar mensagem</button><button class="btn btn-gold" data-action="new-visitor">${ICON('plus')} Novo visitante</button></div></section>
    <section class="welcome-banner acolhimento-welcome"><div class="welcome-copy"><div class="welcome-icon">${ICON('heart')}</div><div><strong>Todos os cadastros da recepção chegam a esta aba.</strong><p>Famílias, casais, amigos e visitantes individuais ficam organizados para facilitar o cuidado e o anúncio.</p></div></div><span class="access-scope-badge">ACESSO DA RECEPÇÃO</span></section>
    <div class="section-grid acolhimento-layout"><section class="panel acolhimento-message-panel"><div class="panel-header"><div class="panel-heading"><h2>Mensagem sugerida</h2><p>${pending.length ? `${pending.length} cadastro${pending.length === 1 ? '' : 's'} novo${pending.length === 1 ? '' : 's'} para anunciar` : 'Mensagem baseada nos cadastros mais recentes'}</p></div><span class="status-pill ${pending.length ? 'status-new' : 'status-integrated'}">${pending.length ? 'Pendente' : 'Em dia'}</span></div><div class="acolhimento-message-box"><span class="scope-label">PRÉVIA PARA A IGREJA</span><p>${esc(suggestedMessage.body)}</p></div><div class="acolhimento-panel-actions"><button class="btn btn-secondary" data-action="announce-visitors">${ICON('send')} Editar mensagem</button><button class="btn btn-quiet" data-view="pulpit">${ICON('expand')} Modo púlpito</button></div></section><section class="panel info-card acolhimento-summary"><div class="card-topline"><div><h3>Resumo da recepção</h3><p>Cadastros disponíveis para o acolhimento.</p></div><div class="icon-tile copper">${ICON('users')}</div></div><div class="split-stat"><div><small>Pessoas</small><strong>${totalPeople}</strong></div><div><small>Grupos</small><strong>${groups.length}</strong></div><div><small>Novos</small><strong>${pending.length}</strong></div></div><button class="btn btn-secondary btn-full" style="margin-top:22px;" data-view="visitors">${ICON('users')} Ver cadastros</button></section></div>
    <section class="panel acolhimento-groups-panel"><div class="panel-header"><div class="panel-heading"><h2>Visitantes por grupo</h2><p>Os nomes permanecem juntos para facilitar o entendimento dos pastores e da recepção.</p></div><span class="panel-link">${ICON('shield')} Igreja: ${esc(church.name)}</span></div><div class="acolhimento-group-list">${groupMarkup}</div></section>
  `;
}

function renderEventRow(event) {
  return `<div class="event-row"><div class="event-date"><strong>${String(dateDay(event.date)).padStart(2, '0')}</strong><span>${esc(dateMonth(event.date))}</span></div><div class="event-info"><strong>${esc(event.title)}</strong><span>${ICON('clock')} ${esc(event.time)} · ${esc(event.location)}</span></div><span class="event-tag">${esc(event.type)}</span></div>`;
}

function renderVisitors() {
  const church = getActiveChurch();
  const newCount = visitorCountByStatus('Novo');
  const returned = visitorCountByStatus('Retornou') + visitorCountByStatus('Integrado');
  return `
    <section class="page-head"><div><span class="eyebrow">RELACIONAMENTO</span><h1>Visitantes</h1><p>Receba, acompanhe e cuide de cada nova história que chega à ${esc(church.name)}.</p></div><div class="page-actions"><button class="btn btn-secondary" data-action="announce-visitors">${ICON('megaphone')} Preparar anúncio</button><button class="btn btn-secondary" data-view="pulpit">${ICON('expand')} Modo púlpito</button><button class="btn btn-gold" data-action="new-visitor">${ICON('plus')} Novo visitante</button></div></section>
    <section class="stat-grid"><article class="stat-card"><div class="stat-top"><span class="stat-label">Novos para acompanhar</span><span class="stat-icon copper">${ICON('clipboard-check')}</span></div><div class="stat-number">${newCount}</div><div class="stat-bottom"><span>precisam de atenção</span></div></article><article class="stat-card"><div class="stat-top"><span class="stat-label">Retornaram</span><span class="stat-icon green">${ICON('refresh')}</span></div><div class="stat-number">${returned}</div><div class="stat-bottom"><span class="stat-trend">${ICON('arrow-up-right')} 9,4%</span><span>neste mês</span></div></article><article class="stat-card"><div class="stat-top"><span class="stat-label">Total no mês</span><span class="stat-icon gold">${ICON('users')}</span></div><div class="stat-number">${state.metrics.visits}</div><div class="stat-bottom"><span>cadastros realizados</span></div></article><article class="stat-card"><div class="stat-top"><span class="stat-label">Taxa de retorno</span><span class="stat-icon dark">${ICON('check-circle')}</span></div><div class="stat-number">47,4%</div><div class="stat-bottom"><span class="stat-trend">${ICON('arrow-up-right')} 4,8%</span><span>vs. mês anterior</span></div></article></section>
    <section class="panel arrival-overview"><div class="panel-header"><div class="panel-heading"><h2>Como chegaram à ${esc(church.name)}</h2><p>Identificação rápida para o cuidado e o anúncio dos pastores.</p></div><span class="panel-link">${ICON('shield')} Informação da recepção</span></div><div class="arrival-grid"><div class="arrival-card arrival-alone"><div class="arrival-card-icon">${ICON('user-round')}</div><div><strong>${visitorCountByArrival('Sozinho')}</strong><span>Sozinho</span></div></div><div class="arrival-card arrival-friends"><div class="arrival-card-icon">${ICON('sparkle')}</div><div><strong>${visitorCountByArrival('Com amigos')}</strong><span>Com amigos</span></div></div><div class="arrival-card arrival-couple"><div class="arrival-card-icon">${ICON('heart')}</div><div><strong>${visitorCountByArrival('Em casal')}</strong><span>Em casal</span></div></div><div class="arrival-card arrival-family"><div class="arrival-card-icon">${ICON('users')}</div><div><strong>${visitorCountByArrival('Família')}</strong><span>Família</span></div></div></div></section>
    <section class="panel table-panel"><div class="panel-header"><div class="panel-heading"><h2>Todos os visitantes</h2><p>${state.visitors.length} registros recentes na área de trabalho</p></div><button class="btn btn-secondary" data-action="filter-help">${ICON('filter')} Filtros</button></div><div class="toolbar" style="padding: 0 21px;"><div class="toolbar-left"><div class="input-wrap">${ICON('search')}<input class="input" id="visitorSearch" type="search" placeholder="Buscar por nome ou telefone" autocomplete="off"></div></div><div class="toolbar-right"><select class="select" id="visitorArrival" aria-label="Filtrar como chegou"><option value="">Como chegou?</option><option value="Sozinho">Sozinho</option><option value="Com amigos">Com amigos</option><option value="Em casal">Em casal</option><option value="Família">Família</option></select><select class="select" id="visitorStatus" aria-label="Filtrar status"><option value="">Todos os status</option><option value="Novo">Novos</option><option value="Contatado">Contatados</option><option value="Retornou">Retornaram</option><option value="Integrado">Integrados</option></select></div></div><div class="table-scroll"><table><thead><tr><th>Visitante</th><th>Como veio</th><th>Data da visita</th><th>Contato</th><th>Status</th><th>Responsável</th><th></th></tr></thead><tbody id="visitorRows">${renderVisitorRows()}</tbody></table></div></section>
  `;
}

function renderVisitorRows() {
  const search = ($('#visitorSearch')?.value || '').trim().toLowerCase();
  const statusFilter = $('#visitorStatus')?.value || '';
  const arrivalFilter = $('#visitorArrival')?.value || '';
  const visitors = state.visitors.filter(visitor => {
    const matchesSearch = !search || `${visitor.name} ${visitor.phone} ${getFamilyMembers(visitor).join(' ')}`.toLowerCase().includes(search);
    const matchesStatus = !statusFilter || visitor.status === statusFilter;
    const matchesArrival = !arrivalFilter || (visitor.arrivalType || 'Sozinho') === arrivalFilter;
    return matchesSearch && matchesStatus && matchesArrival;
  });
  if (!visitors.length) return `<tr><td colspan="7"><div class="empty-state"><div class="icon-tile">${ICON('search')}</div><h3>Nenhum visitante encontrado</h3><p>Tente mudar o termo de busca ou o filtro selecionado.</p></div></td></tr>`;
  return visitors.map(visitor => `<tr><td><div class="person-cell"><div class="avatar ${iconTone(visitor.status === 'Novo' ? 'copper' : visitor.status === 'Retornou' ? 'olive' : 'dark')}">${esc(initials(visitor.name))}</div><div><strong>${esc(visitor.name)}</strong><span>${esc(visitor.service)}</span>${familySummary(visitor)}</div></div></td><td>${arrivalPill(visitor.arrivalType || 'Sozinho')}</td><td>${esc(formatDateShort(visitor.date))}</td><td>${esc(visitor.phone || 'Sem telefone')}</td><td><span class="status-pill ${statusClass(visitor.status)}">${esc(visitor.status)}</span></td><td>${esc(visitor.responsible)}</td><td><button class="table-action" data-action="visitor-detail" data-id="${esc(visitor.id)}" aria-label="Ver detalhes de ${esc(visitor.name)}">${ICON('more')}</button></td></tr>`).join('');
}

function pendingPulpitVisitors() {
  return state.visitors.filter(visitor => visitor.status === 'Novo' && !visitor.announced);
}

function renderPulpitPerson(visitor) {
  const members = getFamilyMembers(visitor);
  const heading = members.length > 1 ? (visitor.familyName || `${members.length} pessoas juntas`) : visitor.name;
  return `<article class="pulpit-person"><div class="pulpit-person-top"><span class="arrival-pill arrival-${arrivalTone(visitor.arrivalType || 'Sozinho')}">${ICON(arrivalIcon(visitor.arrivalType || 'Sozinho'))} ${esc(visitor.arrivalType || 'Sozinho')}</span><span class="pulpit-person-date">${esc(formatDateShort(visitor.date))}</span></div><h3>${esc(heading)}</h3>${members.length > 1 ? `<div class="pulpit-names">${members.map((member, index) => `<div class="pulpit-name"><span>${String(index + 1).padStart(2, '0')}</span><strong>${esc(member)}</strong></div>`).join('')}</div>` : `<div class="pulpit-single-name">${ICON('user-round')} <strong>${esc(members[0] || visitor.name)}</strong></div>`}<p class="pulpit-service">${esc(visitor.service)}${visitor.invitedBy && visitor.invitedBy !== '—' ? ` · convidado por ${esc(visitor.invitedBy)}` : ''}</p></article>`;
}

function renderPulpitGroup(type, visitors) {
  if (!visitors.length) return '';
  return `<section class="pulpit-group"><div class="pulpit-group-head"><div class="pulpit-group-title"><span class="arrival-group-icon arrival-${arrivalTone(type)}">${ICON(arrivalIcon(type))}</span><div><h2>${esc(type)}</h2><p>${visitors.length === 1 ? '1 cadastro' : `${visitors.length} cadastros`}</p></div></div><span class="pulpit-group-count">${visitors.reduce((total, visitor) => total + getFamilyMembers(visitor).length, 0)} ${visitors.reduce((total, visitor) => total + getFamilyMembers(visitor).length, 0) === 1 ? 'pessoa' : 'pessoas'}</span></div><div class="pulpit-people">${visitors.map(renderPulpitPerson).join('')}</div></section>`;
}

function renderPulpit() {
  const pending = pendingPulpitVisitors();
  const names = familyNamesForVisitors(pending);
  const grouped = ['Sozinho', 'Com amigos', 'Em casal', 'Família'].map(type => renderPulpitGroup(type, pending.filter(visitor => (visitor.arrivalType || 'Sozinho') === type))).join('');
  return `
    <section class="pulpit-hero"><div class="pulpit-hero-top"><div><span class="pulpit-live">${ICON('megaphone')} MODO PÚLPITO · ATUALIZADO AGORA</span><h1>Visitantes para anunciar</h1><p>Uma tela limpa para os pastores consultarem no púlpito e darem as boas-vindas com carinho.</p></div><div class="pulpit-hero-actions"><button class="pulpit-outline-btn" data-action="fullscreen-pulpit">${ICON('expand')} Tela cheia</button><button class="pulpit-gold-btn" data-action="announce-visitors">${ICON('send')} Preparar mensagem</button></div></div><div class="pulpit-stats"><div><strong>${names.length}</strong><span>pessoas para receber</span></div><i></i><div><strong>${pending.length}</strong><span>cadastros novos</span></div><i></i><div><strong>${pending.filter(visitor => getFamilyMembers(visitor).length > 1).length}</strong><span>grupos ou famílias</span></div></div></section>
    <div class="pulpit-instruction"><span class="pulpit-instruction-icon">${ICON('check-circle')}</span><div><strong>Leia os nomes abaixo durante o culto</strong><p>Os visitantes estão separados por como chegaram. Depois do anúncio, marque tudo como apresentado.</p></div>${pending.length ? `<button class="btn btn-primary" data-action="mark-pulpit-announced">${ICON('check')} Marcar como apresentados</button>` : ''}</div>
    ${pending.length ? `<div class="pulpit-groups">${grouped}</div>` : `<section class="pulpit-empty"><div class="icon-tile green">${ICON('check-circle')}</div><h2>Tudo em dia por aqui</h2><p>Não há visitantes pendentes para anunciar. Novos cadastros aparecerão automaticamente nesta tela.</p><button class="btn btn-gold" data-action="new-visitor">${ICON('plus')} Cadastrar visitante</button></section>`}
  `;
}

function renderCommunication() {
  return `
    <section class="page-head"><div><span class="eyebrow">CONEXÃO</span><h1>Comunicação</h1><p>Leve a palavra certa para as pessoas certas, no momento certo.</p></div><div class="page-actions"><button class="btn btn-secondary" data-action="channel-settings">${ICON('settings')} Canais</button><button class="btn btn-gold" data-action="new-announcement">${ICON('plus')} Novo aviso</button></div></section>
    <section class="stat-grid"><article class="stat-card"><div class="stat-top"><span class="stat-label">Avisos enviados</span><span class="stat-icon gold">${ICON('megaphone')}</span></div><div class="stat-number">${state.metrics.announcements}</div><div class="stat-bottom"><span class="stat-trend">${ICON('arrow-up-right')} 14,2%</span><span>este mês</span></div></article><article class="stat-card"><div class="stat-top"><span class="stat-label">Taxa de leitura</span><span class="stat-icon green">${ICON('check-circle')}</span></div><div class="stat-number">86%</div><div class="stat-bottom"><span>média dos canais</span></div></article><article class="stat-card"><div class="stat-top"><span class="stat-label">Pessoas alcançadas</span><span class="stat-icon copper">${ICON('send')}</span></div><div class="stat-number">${state.metrics.reach}</div><div class="stat-bottom"><span>membros e visitantes</span></div></article><article class="stat-card"><div class="stat-top"><span class="stat-label">Canais ativos</span><span class="stat-icon dark">${ICON('smartphone')}</span></div><div class="stat-number">3</div><div class="stat-bottom"><span>Push · WhatsApp · E-mail</span></div></article></section>
    <div class="section-grid"><section class="panel"><div class="panel-header"><div class="panel-heading"><h2>Últimos avisos</h2><p>Histórico de comunicações da igreja</p></div><button class="panel-link" data-action="new-announcement">Criar aviso ${ICON('plus')}</button></div><div class="announcement-list" style="padding: 0 22px 22px;">${state.announcements.map(renderAnnouncement).join('')}</div></section><section class="panel info-card"><div class="card-topline"><div><h3>Alcance por canal</h3><p>Veja como a mensagem chega à comunidade.</p></div><div class="icon-tile gold">${ICON('send')}</div></div><div class="split-stat"><div><small>Notificação push</small><strong>92%</strong></div><div><small>WhatsApp</small><strong>78%</strong></div><div><small>E-mail</small><strong>54%</strong></div></div><div class="mini-progress"><span style="width: 86%"></span></div><p class="field-note" style="margin-top: 12px;">A combinação de canais aumenta a chance de cada aviso ser visto.</p><button class="btn btn-secondary btn-full" style="margin-top: 19px;" data-action="channel-settings">${ICON('settings')} Configurar canais</button></section></div>
  `;
}

function renderAnnouncement(item) {
  const tone = item.tone === 'copper' ? 'copper' : '';
  return `<article class="announcement-card"><div class="announcement-icon ${tone}">${ICON(item.tone === 'copper' ? 'users' : 'megaphone')}</div><div class="announcement-body"><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p><div class="announcement-meta"><span class="channel-pill">${ICON('users')} ${esc(item.audience)}</span>${item.channels.map(channel => `<span class="channel-pill">${channel === 'WhatsApp' ? ICON('whatsapp') : channel === 'E-mail' ? ICON('mail') : ICON('smartphone')} ${esc(channel)}</span>`).join('')}</div></div><div class="announcement-side"><span class="announcement-status">${esc(item.status)}</span><span class="announcement-date">${esc(item.date)}</span><span class="announcement-date">${esc(item.reach)}</span></div></article>`;
}

function renderAgenda() {
  const church = getActiveChurch();
  const monthDate = '2026-09-01';
  const firstDay = parseDate(monthDate).getDay();
  const daysInMonth = new Date(2026, 9, 0).getDate();
  const daysInPrevMonth = new Date(2026, 8, 0).getDate();
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push(`<div class="calendar-day muted">${daysInPrevMonth - i}</div>`);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `2026-09-${String(day).padStart(2, '0')}`;
    const hasEvent = state.events.some(event => event.date === date);
    const today = date === TODAY;
    cells.push(`<div class="calendar-day ${today ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">${day}</div>`);
  }
  let nextDay = 1;
  while (cells.length < 42) cells.push(`<div class="calendar-day muted">${nextDay++}</div>`);
  return `
    <section class="page-head"><div><span class="eyebrow">PROGRAMAÇÃO</span><h1>Agenda</h1><p>Uma visão simples de tudo o que está acontecendo na ${esc(church.name)}.</p></div><div class="page-actions"><button class="btn btn-secondary" data-action="export-events">${ICON('download')} Exportar agenda</button><button class="btn btn-gold" data-action="new-event">${ICON('plus')} Novo evento</button></div></section>
    <div class="agenda-layout"><section class="panel agenda-card"><div class="month-header"><button class="icon-btn" aria-label="Mês anterior" data-action="calendar-prev">${ICON('chevron-right')}</button><h2>Setembro 2026</h2><div class="month-header-actions"><button class="btn btn-secondary" data-action="today">Hoje</button><button class="icon-btn" aria-label="Próximo mês" data-action="calendar-next">${ICON('chevron-right')}</button></div></div><div class="weekdays"><span>DOM</span><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span></div><div class="calendar-grid">${cells.join('')}</div><div class="agenda-events"><h3>Eventos desta semana</h3>${sortedEvents().slice(0, 4).map(event => `<div class="agenda-event"><div class="event-date"><strong>${String(dateDay(event.date)).padStart(2, '0')}</strong><span>${esc(dateMonth(event.date))}</span></div><div class="event-info"><strong>${esc(event.title)}</strong><span>${ICON('clock')} ${esc(event.time)} · ${esc(event.location)}</span></div><span class="event-tag">${esc(event.type)}</span></div>`).join('')}</div></section><div class="side-stack"><section class="panel info-card"><div class="card-topline"><div><h3>Próximo encontro</h3><p>O que vem a seguir na agenda.</p></div><div class="icon-tile copper">${ICON('calendar')}</div></div>${renderNextEvent(sortedEvents()[0])}</section><section class="panel info-card"><div class="card-topline"><div><h3>Resumo da agenda</h3><p>Programação organizada por categoria.</p></div><div class="icon-tile gold">${ICON('clipboard-check')}</div></div><div class="split-stat"><div><small>Cultos</small><strong>${state.events.filter(event => event.type === 'Culto').length}</strong></div><div><small>Encontros</small><strong>${state.events.filter(event => event.type !== 'Culto').length}</strong></div><div><small>Este mês</small><strong>${state.events.length}</strong></div></div><button class="btn btn-secondary btn-full" style="margin-top: 22px;" data-action="new-event">${ICON('plus')} Adicionar evento</button></section></div></div>
  `;
}

function renderNextEvent(event) {
  if (!event) return `<div class="empty-state"><h3>Nenhum evento</h3><p>Adicione o primeiro compromisso da igreja.</p></div>`;
  return `<div style="display:flex;align-items:center;gap:13px;padding: 4px 0 8px;"><div class="event-date" style="width:48px;height:51px;"><strong style="font-size:19px;">${String(dateDay(event.date)).padStart(2, '0')}</strong><span>${esc(dateMonth(event.date))}</span></div><div class="event-info"><strong style="font-size:13px;">${esc(event.title)}</strong><span style="font-size:10px;margin-top:6px;">${ICON('clock')} ${esc(event.time)}</span><span style="font-size:10px;margin-top:5px;">${ICON('map-pin')} ${esc(event.location)}</span></div></div><div class="mini-progress"><span style="width: 72%"></span></div><p class="field-note" style="margin-top: 9px;">${esc(event.audience)} · programação publicada</p>`;
}

function renderLeaders() {
  const church = getActiveChurch();
  return `
    <section class="page-head"><div><span class="eyebrow">EQUIPE</span><h1>Lideranças</h1><p>As pessoas que ajudam a cuidar da ${esc(church.name)} todos os dias.</p></div><div class="page-actions"><button class="btn btn-secondary" data-action="export-leaders">${ICON('download')} Exportar equipe</button><button class="btn btn-gold" data-action="new-leader">${ICON('plus')} Adicionar líder</button></div></section>
    <div class="welcome-banner"><div class="welcome-copy"><div class="welcome-icon">${ICON('users')}</div><div><strong>Uma equipe alinhada cuida melhor.</strong><p>Gerencie permissões e mantenha cada ministério conectado.</p></div></div><button class="btn btn-quiet welcome-action" data-view="settings">Gerenciar permissões ${ICON('arrow-up-right')}</button></div>
    <div class="leader-grid">${state.leaders.map(leader => `<article class="leader-card"><div class="leader-head"><div class="avatar ${iconTone(leader.tone)}">${esc(leader.initials)}</div><div><strong>${esc(leader.name)}</strong><span>${esc(leader.role)}</span></div><button class="table-action" style="margin-left:auto;" data-action="leader-detail" data-id="${esc(leader.id)}" aria-label="Ver líder">${ICON('more')}</button></div><div class="leader-contact">${ICON('smartphone')} ${esc(leader.phone)}</div><div class="leader-footer"><span>Ministério / grupo</span><span class="role-pill">${esc(leader.group)}</span></div></article>`).join('')}</div>
  `;
}

function renderReceptionUsers() {
  const users = state.receptionUsers || [];
  if (!users.length) return `<div class="empty-state"><div class="icon-tile">${ICON('users')}</div><h3>Nenhum acesso de recepção</h3><p>Adicione o primeiro obreiro ou membro autorizado.</p></div>`;
  return users.map(user => `<div class="team-user-row"><div class="avatar ${iconTone(user.tone || 'dark')}">${esc(user.initials || initials(user.name))}</div><div class="team-user-copy"><strong>${esc(user.name)}</strong><span>${esc(user.role)} · ${esc(user.login || 'login pendente')}</span><small>Último acesso: ${esc(user.lastAccess || 'ainda não acessou')}</small><small class="team-access-note">${ICON('heart')} Aba Acolhimento liberada</small></div><span class="team-status ${user.status === 'Bloqueado' ? 'team-status-blocked' : ''}">${esc(user.status === 'Bloqueado' ? 'Bloqueado' : (user.passwordStatus || 'Ativa'))}</span><button class="table-action" data-action="reception-detail" data-id="${esc(user.id)}" aria-label="Ver acesso de ${esc(user.name)}">${ICON('more')}</button></div>`).join('');
}

function renderSettings() {
  pendingLogoImage = null;
  const church = getActiveChurch();
  const churchLogo = church.logoImage || '';
  const churchPhone = church.phone || '(21) 00000-0000';
  const churchPastors = church.pastors || 'Evandro e Simone';
  const churchDescription = church.description || 'Um lugar para pertencer, crescer e viver a fé em comunidade.';
  const appearance = { ...DEFAULT_APPEARANCE, ...(church.appearance || {}) };
  const organizationManagement = isPlatformAdmin() ? `<section class="settings-card saas-card" data-settings-panel="saas"><div class="saas-content"><div class="settings-card-header" style="border:0;padding-bottom:0;margin-bottom:0;"><div><h2>Pronto para outras igrejas</h2><p>A administração da plataforma gerencia organizações, planos e responsáveis.</p></div><div class="icon-tile gold">${ICON('crown')}</div></div><div class="plan-line"><span class="plan-badge">Administrador da plataforma</span><span>${state.churches.length} organização${state.churches.length === 1 ? '' : 'ões'} cadastrada${state.churches.length === 1 ? '' : 's'}</span></div><div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;"><div><strong style="font-size:12px;">Área de organizações</strong><p class="field-note" style="margin-top:5px;">Cadastre novas igrejas, planos e responsáveis em um único painel.</p></div><button class="btn btn-primary" data-action="new-church">${ICON('plus')} Adicionar igreja</button></div></div></section><section class="settings-card" data-settings-panel="saas"><div class="settings-card-header"><div><h2>Igrejas cadastradas</h2><p>Organizações disponíveis nesta conta administradora.</p></div><span class="status-pill status-integrated">${state.churches.length} ativa${state.churches.length === 1 ? '' : 's'}</span></div><div class="tenant-list">${state.churches.map(ch => `<div class="tenant-row"><div class="tenant-logo">${esc(ch.initials || initials(ch.name))}</div><div class="tenant-copy"><strong>${esc(ch.name)}</strong><span>${esc(ch.city)} · ${esc(ch.members || 0)} pessoas alcançadas</span></div><span class="tenant-status">${esc(ch.status || 'Ativa')}</span><button class="table-action" data-action="switch-church" data-id="${esc(ch.id)}" aria-label="Abrir ${esc(ch.name)}">${ICON('chevron-right')}</button></div>`).join('')}</div></section>` : `<section class="settings-card pastor-scope-card" data-settings-panel="organization"><div class="settings-card-header"><div><h2>Acesso da sua igreja</h2><p>Você está conectado como pastor e administra somente os dados desta organização.</p></div><div class="icon-tile copper">${ICON('shield')}</div></div><div class="pastor-scope-grid"><div><span class="scope-label">IGREJA ATIVA</span><strong>${esc(church.name)}</strong><p>${esc(church.city)} · identidade, visitantes e avisos desta igreja.</p></div><span class="access-scope-badge">PASTOR DA IGREJA</span></div><div class="scope-note"><span>${ICON('check-circle')}</span><p><strong>Você pode editar o nome e o logo</strong> desta igreja em “Identidade da igreja”. As outras igrejas e seus dados ficam protegidos e são administrados pelo administrador da plataforma.</p></div></section>`;
  const backupHistory = getBackupHistory();
  const latestBackup = backupHistory[0];
  const backupCard = `<section class="settings-card backup-settings-card" data-settings-panel="organization"><div class="settings-card-header"><div><h2>Backup automático</h2><p>Uma cópia é criada a cada alteração salva na plataforma.</p></div><span class="backup-status"><span></span> ATIVO</span></div><div class="backup-summary"><div class="backup-summary-icon">${ICON('shield')}</div><div><strong>Dados protegidos automaticamente</strong><p>Último backup: ${esc(formatBackupDate(latestBackup?.createdAt))}</p></div><span class="backup-version-count">${backupHistory.length} ${backupHistory.length === 1 ? 'versão guardada' : 'versões guardadas'}</span></div><p class="field-note backup-note">As versões recentes incluem visitantes, famílias, avisos, agenda, equipe e identidade da ${esc(church.name)}.</p></section>`;
  return `
    <section class="page-head"><div><span class="eyebrow">ÁREA ADMINISTRATIVA</span><h1>Configurações</h1><p>Personalize a experiência da ${esc(church.name)} e prepare sua igreja para crescer.</p></div><div class="page-actions"><button class="btn btn-secondary" data-action="open-public-page">${ICON('external')} Ver página pública</button><button class="btn btn-gold" data-action="save-settings">${ICON('check')} Salvar alterações</button></div></section>
    <div class="settings-layout"><aside class="settings-nav"><button class="active" data-settings-section="organization">${ICON('building')} Igreja</button><button data-settings-section="notifications">${ICON('bell')} Notificações</button><button data-settings-section="team">${ICON('users')} Equipe e acesso</button>${isPlatformAdmin() ? `<button data-settings-section="saas">${ICON('crown')} Plataforma SaaS</button>` : ''}</aside><div class="settings-panels">
      <section class="settings-card" data-settings-panel="organization"><div class="settings-card-header"><div><h2>Identidade da igreja</h2><p>O pastor ou administrador desta igreja pode editar estas informações.</p></div><div style="display:flex;align-items:center;gap:9px;"><span class="access-scope-badge">${isPlatformAdmin() ? 'ADMIN DA PLATAFORMA' : 'PASTOR DA IGREJA'}</span><div class="icon-tile gold">${ICON('building')}</div></div></div><form data-form="organization"><div class="logo-editor"><div class="logo-preview" id="logoPreview"><span id="settingsLogoSymbol" ${churchLogo ? 'hidden' : ''}>${esc(churchLogoText(church))}</span><img id="settingsLogoImage" src="${esc(churchLogo)}" alt="Logo atual da igreja" ${churchLogo ? '' : 'hidden'}></div><div class="logo-editor-copy"><div class="form-field"><label for="churchLogoSymbol">Símbolo ou iniciais</label><input class="input" id="churchLogoSymbol" name="logoSymbol" maxlength="2" value="${esc(churchLogoText(church))}" placeholder="Ex.: B"></div><div class="file-upload-field"><label class="file-label" for="churchLogoFile">${ICON('download')} Enviar imagem do logo</label><input id="churchLogoFile" name="logoFile" type="file" accept="image/png,image/jpeg,image/webp" class="file-input"></div><button type="button" class="btn btn-quiet logo-remove" data-action="remove-logo">Usar somente o símbolo de texto</button><p class="field-note">O logo escolhido aparece ao lado de “Início” e da lupa.</p></div></div><div class="form-grid"><div class="form-field"><label for="churchName">Nome da igreja</label><input class="input" id="churchName" name="churchName" value="${esc(church.name)}"></div><div class="form-field"><label for="churchCity">Cidade e estado</label><input class="input" id="churchCity" name="churchCity" value="${esc(church.city)}"></div><div class="form-field"><label for="pastorName">Pastores responsáveis</label><input class="input" id="pastorName" name="pastorName" value="${esc(churchPastors)}"></div><div class="form-field"><label for="churchPhone">Telefone principal</label><input class="input" id="churchPhone" name="churchPhone" type="tel" value="${esc(churchPhone)}" placeholder="(21) 99999-9999"></div><div class="form-field full"><label for="churchDescription">Mensagem de boas-vindas</label><textarea class="textarea" id="churchDescription" name="churchDescription" rows="3">${esc(churchDescription)}</textarea><p class="field-note">A identidade visual da ${esc(church.name)} usa fundo preto/chumbo com dourado e cobre.</p></div></div></form></section>
      <section class="settings-card appearance-settings" data-settings-panel="organization"><div class="settings-card-header"><div><h2>Aparência da igreja</h2><p>O pastor pode personalizar o visual desta igreja sem afetar outras organizações.</p></div><div class="icon-tile gold">${ICON('sparkle')}</div></div><div class="form-grid"><div class="form-field"><label for="appearanceTheme">Tema</label><select class="select" id="appearanceTheme" data-appearance-control><option value="light" ${appearance.theme === 'light' ? 'selected' : ''}>Claro</option><option value="dark" ${appearance.theme === 'dark' ? 'selected' : ''}>Escuro</option><option value="auto" ${appearance.theme === 'auto' ? 'selected' : ''}>Automático</option></select><p class="field-note">Aplica-se ao painel do pastor e da equipe.</p></div><div class="form-field"><label for="appearanceFont">Fonte principal</label><select class="select" id="appearanceFont" data-appearance-control><option value="editorial" ${appearance.font === 'editorial' ? 'selected' : ''}>Editorial</option><option value="modern" ${appearance.font === 'modern' ? 'selected' : ''}>Moderna</option><option value="classic" ${appearance.font === 'classic' ? 'selected' : ''}>Clássica</option><option value="clean" ${appearance.font === 'clean' ? 'selected' : ''}>Limpa</option></select><p class="field-note">Escolha uma personalidade para a sua igreja.</p></div><div class="form-field"><label for="appearancePrimary">Cor principal</label><div class="color-control"><input type="color" id="appearancePrimary" value="${esc(appearance.primary)}" data-appearance-control><input class="input color-value" value="${esc(appearance.primary.toUpperCase())}" data-color-text="appearancePrimary" maxlength="7" aria-label="Código da cor principal"></div></div><div class="form-field"><label for="appearanceAccent">Cor de destaque</label><div class="color-control"><input type="color" id="appearanceAccent" value="${esc(appearance.accent)}" data-appearance-control><input class="input color-value" value="${esc(appearance.accent.toUpperCase())}" data-color-text="appearanceAccent" maxlength="7" aria-label="Código da cor de destaque"></div></div></div><div class="palette-block"><div><label>Paletas rápidas</label><p class="field-note">Comece por uma combinação e ajuste as cores se quiser.</p></div><div class="palette-list">${Object.entries(PALETTES).map(([key, palette]) => `<button type="button" class="palette-swatch" data-action="apply-palette" data-palette="${key}" title="${esc(palette.label)}"><span style="background:${palette.primary}"></span><i style="background:${palette.accent}"></i><small>${esc(palette.label)}</small></button>`).join('')}</div></div><div class="appearance-preview"><div class="preview-copy"><span class="eyebrow">PRÉVIA</span><strong>Assim a ${esc(church.name)} aparece para sua equipe</strong><p>As mudanças são aplicadas imediatamente e ficam salvas nesta igreja.</p></div><div class="preview-chip">${ICON('check')} Personalizado</div></div></section>
      ${backupCard}
      <section class="settings-card" data-settings-panel="notifications"><div class="settings-card-header"><div><h2>Preferências de notificação</h2><p>Escolha como a equipe recebe as informações importantes.</p></div><div class="icon-tile copper">${ICON('bell')}</div></div><div class="toggle-row"><div class="toggle-copy"><strong>Novo visitante para o pastor</strong><span>Enviar um alerta quando a recepção finalizar um cadastro.</span></div><button class="toggle on" data-toggle="pastorAlert" aria-label="Alternar alerta ao pastor"></button></div><div class="toggle-row"><div class="toggle-copy"><strong>Resumo diário da igreja</strong><span>Receba um resumo com visitantes, avisos e eventos do dia.</span></div><button class="toggle on" data-toggle="dailySummary" aria-label="Alternar resumo diário"></button></div><div class="toggle-row"><div class="toggle-copy"><strong>Confirmação de leitura</strong><span>Registrar quando uma pessoa visualizar um aviso.</span></div><button class="toggle on" data-toggle="readReceipt" aria-label="Alternar confirmação de leitura"></button></div></section>
      <section class="settings-card team-settings-card" data-settings-panel="team"><div class="settings-card-header"><div><h2>Equipe e acesso</h2><p>Convide obreiros e membros para ajudar na portaria com segurança.</p></div><div class="icon-tile copper">${ICON('users')}</div></div><div class="reception-link-card"><div class="reception-link-copy"><span class="scope-label">LINK DA RECEPÇÃO</span><strong>${esc(receptionLink(church))}</strong><p>Depois de abrir o link, o obreiro entra com seu login e senha. Cada acesso é individual e protegido.</p></div><button class="btn btn-primary" data-action="copy-reception-link">${ICON('external')} Copiar link</button></div><div class="team-list-header"><div><h3>Acessos da recepção</h3><p>Todos os acessos cadastrados recebem a aba Acolhimento e podem cadastrar visitantes.</p></div><button class="btn btn-gold" data-action="new-reception">${ICON('plus')} Adicionar acesso</button></div><div class="team-list">${renderReceptionUsers()}</div></section>
      ${organizationManagement}
    </div></div>
  `;
}

function openModal(type, data = {}) {
  const backdrop = $('#modalBackdrop');
  const title = $('#modalTitle');
  const eyebrow = $('#modalEyebrow');
  const body = $('#modalBody');
  if (!backdrop || !title || !body) return;
  let content = '';
  let modalTitle = '';
  let modalEyebrow = 'BETHESDA';
  if (type === 'metric') {
    const metric = data.metric;
    if (metric === 'visits') {
      modalTitle = 'Visitantes este mês';
      modalEyebrow = 'DETALHES DO RELACIONAMENTO';
      content = `<div class="metric-modal-hero"><div class="metric-modal-number">${esc(state.metrics.visits)}</div><div><strong>pessoas cadastradas</strong><span>${ICON('arrow-up-right')} 18,4% em relação ao mês anterior</span></div></div><div class="metric-breakdown"><div><span>Novos</span><strong>${visitorCountByStatus('Novo')}</strong></div><div><span>Contatados</span><strong>${visitorCountByStatus('Contatado')}</strong></div><div><span>Grupos/famílias</span><strong>${state.visitors.filter(visitor => getFamilyMembers(visitor).length > 1).length}</strong></div></div><h3 class="metric-section-title">Cadastros recentes</h3><div class="metric-list">${state.visitors.slice(0, 4).map(visitor => `<div class="metric-list-row"><div class="avatar avatar-copper">${esc(initials(visitor.name))}</div><div class="metric-list-copy"><strong>${esc(visitor.familyName || visitor.name)}</strong><span>${esc(formatDateShort(visitor.date))} · ${esc(visitor.service)}</span>${getFamilyMembers(visitor).length > 1 ? `<small>${getFamilyMembers(visitor).map(esc).join(', ')}</small>` : ''}</div>${arrivalPill(visitor.arrivalType || 'Sozinho')}</div>`).join('')}</div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-gold" data-view="visitors">Ver visitantes ${ICON('arrow-up-right')}</button></div>`;
    } else if (metric === 'returns') {
      modalTitle = 'Retornos confirmados';
      modalEyebrow = 'ACOMPANHAMENTO';
      const returnedVisitors = state.visitors.filter(visitor => ['Retornou', 'Integrado'].includes(visitor.status));
      content = `<div class="metric-modal-hero metric-hero-green"><div class="metric-modal-number">${esc(state.metrics.returns)}</div><div><strong>retornos confirmados</strong><span>${ICON('arrow-up-right')} 6,2% em relação ao mês anterior</span></div></div><div class="metric-breakdown"><div><span>Retornaram</span><strong>${visitorCountByStatus('Retornou')}</strong></div><div><span>Integrados</span><strong>${visitorCountByStatus('Integrado')}</strong></div><div><span>Taxa de retorno</span><strong>47,4%</strong></div></div><h3 class="metric-section-title">Pessoas em acompanhamento</h3><div class="metric-list">${(returnedVisitors.length ? returnedVisitors : state.visitors).slice(0, 4).map(visitor => `<div class="metric-list-row"><div class="avatar avatar-olive">${esc(initials(visitor.name))}</div><div class="metric-list-copy"><strong>${esc(visitor.name)}</strong><span>${esc(visitor.responsible)} · ${esc(formatDateShort(visitor.date))}</span></div><span class="status-pill ${statusClass(visitor.status)}">${esc(visitor.status)}</span></div>`).join('')}</div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-gold" data-view="visitors">Abrir acompanhamento ${ICON('arrow-up-right')}</button></div>`;
    } else if (metric === 'reach') {
      modalTitle = 'Alcance da comunidade';
      modalEyebrow = 'COMUNICAÇÃO';
      content = `<div class="metric-modal-hero metric-hero-copper"><div class="metric-modal-number">${esc(state.metrics.reach)}</div><div><strong>pessoas alcançadas</strong><span>${ICON('arrow-up-right')} 12,8% neste mês</span></div></div><h3 class="metric-section-title">Alcance por canal</h3><div class="channel-metric"><div><span>${ICON('smartphone')} Notificações push</span><strong>92%</strong></div><div class="metric-progress"><i style="width:92%"></i></div></div><div class="channel-metric"><div><span>${ICON('whatsapp')} WhatsApp</span><strong>78%</strong></div><div class="metric-progress"><i style="width:78%"></i></div></div><div class="channel-metric"><div><span>${ICON('mail')} E-mail</span><strong>54%</strong></div><div class="metric-progress"><i style="width:54%"></i></div></div><div class="metric-tip">${ICON('sparkle')} A combinação de canais ajuda a manter a comunidade informada.</div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-gold" data-view="communication">Ver comunicação ${ICON('arrow-up-right')}</button></div>`;
    } else {
      const nextEvent = sortedEvents()[0];
      modalTitle = 'Próximo culto';
      modalEyebrow = 'AGENDA DA IGREJA';
      content = `<div class="metric-modal-hero metric-hero-dark"><div class="metric-modal-number">${nextEvent ? String(dateDay(nextEvent.date)).padStart(2, '0') : '—'}</div><div><strong>${nextEvent ? esc(nextEvent.title) : 'Nenhum evento'}</strong><span>${nextEvent ? `${esc(formatDateLong(nextEvent.date))} · ${esc(nextEvent.time)}` : 'Adicione um novo evento à agenda'}</span></div></div>${nextEvent ? `<div class="metric-event-detail"><div>${ICON('clock')}<span>${esc(nextEvent.time)}</span></div><div>${ICON('map-pin')}<span>${esc(nextEvent.location)}</span></div><div>${ICON('users')}<span>${esc(nextEvent.audience)}</span></div></div>` : ''}<div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-gold" data-view="agenda">Abrir agenda ${ICON('arrow-up-right')}</button></div>`;
    }
  } else if (type === 'visitor') {
    modalTitle = 'Novo visitante';
    modalEyebrow = 'RECEPÇÃO';
    content = `<form data-form="visitor"><div class="form-grid"><div class="form-field full"><label for="visitorName">Nome completo do visitante principal *</label><input class="input" id="visitorName" name="name" required placeholder="Ex.: João da Silva"></div><div class="form-field"><label for="visitorPhone">Telefone / WhatsApp</label><input class="input" id="visitorPhone" name="phone" placeholder="(21) 99999-9999"></div><div class="form-field"><label for="visitorDate">Data da visita *</label><input class="input" id="visitorDate" name="date" type="date" value="${TODAY}" required></div><div class="form-field"><label for="visitorService">Culto ou evento</label><select class="select" id="visitorService" name="service"><option>Culto de Celebração</option><option>Culto da Família</option><option>Culto de Ensino</option><option>Santa Ceia</option><option>Outro evento</option></select></div><div class="form-field"><label for="visitorArrivalType">Como veio? *</label><select class="select" id="visitorArrivalType" name="arrivalType" required><option>Sozinho</option><option>Com amigos</option><option>Em casal</option><option>Família</option></select></div><div class="form-field"><label for="visitorNeighborhood">Bairro ou cidade</label><input class="input" id="visitorNeighborhood" name="neighborhood" placeholder="Ex.: Centro, Itaboraí"></div><div class="form-field"><label for="visitorFamilyName">Nome do grupo / família</label><input class="input" id="visitorFamilyName" name="familyName" placeholder="Ex.: Família Nogueira"></div><div class="form-field"><label for="visitorInvitedBy">Quem convidou?</label><input class="input" id="visitorInvitedBy" name="invitedBy" placeholder="Nome ou equipe"></div><div class="form-field full"><label for="visitorNotes">Observações</label><textarea class="textarea" id="visitorNotes" name="notes" placeholder="Algum detalhe importante para o cuidado?" rows="3"></textarea></div><div class="form-field full"><label class="family-toggle"><input type="checkbox" id="registerFamily" name="registerFamily" data-family-toggle><span><strong>Cadastrar pessoas que vieram juntas</strong><small>Assim todos os nomes ficam visíveis para os pastores anunciarem à igreja.</small></span></label></div><div class="form-field full family-fields is-hidden" id="familyFields"><div class="family-register-head"><div><label>Nomes para anunciar</label><p class="field-note">O visitante principal já será incluído automaticamente. Adicione um nome completo por linha.</p></div><button type="button" class="btn btn-secondary btn-small" data-action="add-family-member">${ICON('plus')} Adicionar pessoa</button></div><div id="familyMemberList">${familyMemberRow('', 1)}</div></div></div><label class="checkbox-line"><input type="checkbox" name="consent" required checked><span>O visitante autorizou o contato da igreja para acompanhamento e informações sobre a comunidade.</span></label><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-gold">${ICON('check')} Salvar visitante</button></div></form>`;
  } else if (type === 'announcement') {
    const announcementVisitors = Array.isArray(data.visitors) ? data.visitors : [];
    const hasVisitorAnnouncement = announcementVisitors.length > 0;
    const announcementDefaults = hasVisitorAnnouncement ? buildVisitorAnnouncement(announcementVisitors) : { title: '', body: '' };
    const announcementPreview = hasVisitorAnnouncement ? `<div class="announcement-preview-card"><div class="announcement-preview-head">${ICON('users')} Prévia por grupo</div>${renderVisitorAnnouncementGroups(announcementVisitors)}</div>` : '';
    modalTitle = hasVisitorAnnouncement ? 'Anunciar visitantes' : 'Novo aviso';
    modalEyebrow = hasVisitorAnnouncement ? 'ACOLHIMENTO' : 'COMUNICAÇÃO';
    content = `<form data-form="announcement"><div class="form-grid"><div class="form-field full"><label for="announcementTitle">Título do aviso *</label><input class="input" id="announcementTitle" name="title" value="${esc(announcementDefaults.title)}" required placeholder="Ex.: Culto de domingo"></div>${announcementPreview}<div class="form-field full"><label for="announcementBody">Mensagem *</label><textarea class="textarea" id="announcementBody" name="body" required placeholder="Escreva uma mensagem clara e acolhedora..." rows="4">${esc(announcementDefaults.body)}</textarea></div><div class="form-field"><label for="announcementAudience">Enviar para</label><select class="select" id="announcementAudience" name="audience"><option>Toda a igreja</option><option>Obreiros</option><option>Lideranças</option><option>Ministério de Mulheres</option><option>Jovens</option><option>Recepção</option></select></div><div class="form-field"><label for="announcementMode">Quando enviar</label><select class="select" id="announcementMode" name="mode"><option value="now">Enviar agora</option><option value="scheduled">Agendar envio</option></select></div><div class="form-field full"><label>Canais de envio</label><div class="radio-grid"><div class="radio-card"><input type="checkbox" id="channelPush" name="channels" value="Push" checked><label for="channelPush">${ICON('smartphone')} Push</label></div><div class="radio-card"><input type="checkbox" id="channelWhatsapp" name="channels" value="WhatsApp" checked><label for="channelWhatsapp">${ICON('whatsapp')} WhatsApp</label></div><div class="radio-card"><input type="checkbox" id="channelEmail" name="channels" value="E-mail"><label for="channelEmail">${ICON('mail')} E-mail</label></div></div></div></div><div class="checkbox-line" style="margin-top:16px;"><span style="color:var(--copper);">${ICON('shield')}</span><span>No produto final, os envios serão registrados e respeitarão as permissões de cada organização.</span></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-gold">${ICON('send')} Publicar aviso</button></div></form>`;
  } else if (type === 'event') {
    modalTitle = 'Novo evento';
    modalEyebrow = 'AGENDA';
    content = `<form data-form="event"><div class="form-grid"><div class="form-field full"><label for="eventTitle">Nome do evento *</label><input class="input" id="eventTitle" name="title" required placeholder="Ex.: Culto de Celebração"></div><div class="form-field"><label for="eventDate">Data *</label><input class="input" id="eventDate" name="date" type="date" value="2026-09-20" required></div><div class="form-field"><label for="eventTime">Horário *</label><input class="input" id="eventTime" name="time" type="time" value="19:00" required></div><div class="form-field"><label for="eventType">Categoria</label><select class="select" id="eventType" name="type"><option>Culto</option><option>Encontro</option><option>Festividade</option><option>Liderança</option><option>Outro</option></select></div><div class="form-field"><label for="eventLocation">Local</label><input class="input" id="eventLocation" name="location" value="Templo principal"></div><div class="form-field full"><label for="eventAudience">Público</label><select class="select" id="eventAudience" name="audience"><option>Toda a igreja</option><option>Lideranças</option><option>Obreiros</option><option>Ministério de Mulheres</option><option>Jovens</option></select></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-gold">${ICON('calendar')} Adicionar evento</button></div></form>`;
  } else if (type === 'church') {
    modalTitle = 'Adicionar igreja';
    modalEyebrow = 'PLATAFORMA SAAS';
    content = `<form data-form="church"><div class="form-grid"><div class="form-field full"><label for="newChurchName">Nome da igreja *</label><input class="input" id="newChurchName" name="name" required placeholder="Ex.: Igreja Esperança"></div><div class="form-field"><label for="newChurchCity">Cidade e estado</label><input class="input" id="newChurchCity" name="city" placeholder="Ex.: Niterói • RJ"></div><div class="form-field"><label for="newChurchAdmin">Responsável principal</label><input class="input" id="newChurchAdmin" name="admin" placeholder="Nome do pastor"></div><div class="form-field full"><p class="field-note">Cada igreja terá seus usuários, visitantes, avisos e configurações separados. Este é o princípio de uma plataforma SaaS multi-tenant.</p></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-gold">${ICON('building')} Criar organização</button></div></form>`;
  } else if (type === 'reception') {
    modalTitle = 'Adicionar acesso de recepção';
    modalEyebrow = 'EQUIPE DA IGREJA';
    content = `<form data-form="reception"><div class="form-grid"><div class="form-field full"><label for="receptionName">Nome do obreiro ou membro *</label><input class="input" id="receptionName" name="name" required placeholder="Ex.: Maria Oliveira"></div><div class="form-field"><label for="receptionLogin">Login de acesso *</label><input class="input" id="receptionLogin" name="login" type="email" autocomplete="username" required placeholder="nome@igreja.com.br"></div><div class="form-field"><label for="receptionRole">Função</label><select class="select" id="receptionRole" name="role"><option>Recepção</option><option>Obreiro</option><option>Membro autorizado</option></select></div><div class="form-field"><label for="receptionPhone">Telefone</label><input class="input" id="receptionPhone" name="phone" placeholder="(21) 99999-9999"></div><div class="form-field"><label for="receptionPassword">Senha de acesso *</label><input class="input" id="receptionPassword" name="password" type="password" autocomplete="new-password" minlength="6" required placeholder="Mínimo de 6 caracteres"></div><div class="form-field"><label for="receptionPasswordConfirm">Confirmar senha *</label><input class="input" id="receptionPasswordConfirm" name="passwordConfirm" type="password" autocomplete="new-password" minlength="6" required placeholder="Repita a senha"></div><div class="form-field full"><div class="scope-note" style="margin:0;"><span>${ICON('shield')}</span><p><strong>Defina a senha neste cadastro.</strong> O obreiro usará o login e esta senha para entrar na recepção e acessar a aba <strong>Acolhimento</strong>. A senha não fica visível depois de salva.</p></div></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-gold">${ICON('users')} Salvar acesso</button></div></form>`;
  } else if (type === 'reception-detail') {
    const receptionUser = (state.receptionUsers || []).find(item => item.id === data.id);
    if (!receptionUser) return;
    modalTitle = receptionUser.name;
    modalEyebrow = 'ACESSO DA RECEPÇÃO';
    content = `<div class="person-cell" style="padding-bottom:18px;border-bottom:1px solid #f0ede7;"><div class="avatar avatar-copper" style="width:46px;height:46px;">${esc(receptionUser.initials || initials(receptionUser.name))}</div><div><strong style="font-size:14px;">${esc(receptionUser.name)}</strong><span style="font-size:10px;margin-top:5px;">${esc(receptionUser.role)} · ${esc(receptionUser.status || 'Ativo')}</span></div></div><div class="form-grid" style="margin-top:20px;"><div class="form-field"><label>Login</label><div style="font-size:11px;color:var(--ink);">${esc(receptionUser.login || 'Não informado')}</div></div><div class="form-field"><label>Status da senha</label><div><span class="status-pill ${receptionUser.passwordStatus === 'Ativa' ? 'status-integrated' : 'status-contacted'}">${esc(receptionUser.passwordStatus || 'Ativa')}</span></div></div><div class="form-field full"><label>Abas liberadas</label><div class="permission-list"><span class="access-permission">${ICON('heart')} Acolhimento</span><p class="field-note">Esta aba fica disponível para todos os acessos cadastrados na recepção.</p></div></div><div class="form-field full"><div class="scope-note" style="margin:0;"><span>${ICON('shield')}</span><p>Por segurança, a senha atual nunca fica visível para o pastor. Use “Definir nova senha” para trocar a senha do acesso.</p></div></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-secondary" data-action="reset-reception-password" data-id="${esc(receptionUser.id)}">${ICON('refresh')} Definir nova senha</button>${receptionUser.status === 'Bloqueado' ? `<button type="button" class="btn btn-gold" data-action="toggle-reception-access" data-id="${esc(receptionUser.id)}">${ICON('check')} Reativar acesso</button>` : `<button type="button" class="btn btn-secondary" data-action="toggle-reception-access" data-id="${esc(receptionUser.id)}">${ICON('shield')} Bloquear acesso</button>`}<button type="button" class="btn btn-danger" data-action="delete-reception-access" data-id="${esc(receptionUser.id)}">${ICON('x')} Excluir acesso</button></div>`;
  } else if (type === 'visitor-detail') {
    const visitor = state.visitors.find(item => item.id === data.id);
    if (!visitor) return;
    modalTitle = visitor.name;
    modalEyebrow = 'DETALHES DO VISITANTE';
    const familyMembers = getFamilyMembers(visitor);
    content = `<div class="person-cell" style="padding-bottom:18px;border-bottom:1px solid #f0ede7;"><div class="avatar avatar-copper" style="width:46px;height:46px;">${esc(initials(visitor.name))}</div><div><strong style="font-size:14px;">${esc(visitor.name)}</strong><span style="font-size:10px;margin-top:5px;">Visitou em ${esc(formatDateLong(visitor.date))}</span></div></div><div class="form-grid" style="margin-top:20px;"><div class="form-field"><label>Telefone</label><div style="font-size:11px;color:var(--ink);">${esc(visitor.phone || 'Não informado')}</div></div><div class="form-field"><label>Status</label><div><span class="status-pill ${statusClass(visitor.status)}">${esc(visitor.status)}</span></div></div><div class="form-field"><label>Como veio</label><div>${arrivalPill(visitor.arrivalType || 'Sozinho')}</div></div><div class="form-field"><label>Culto ou evento</label><div style="font-size:11px;color:var(--ink);">${esc(visitor.service)}</div></div><div class="form-field"><label>Responsável</label><div style="font-size:11px;color:var(--ink);">${esc(visitor.responsible)}</div></div><div class="form-field full"><label>${esc(visitor.familyName || 'Pessoas que vieram juntas')}</label><div class="family-detail-list">${familyMembers.map((member, index) => `<div class="family-detail-item"><span>${index + 1}</span>${esc(member)}</div>`).join('')}</div><p class="field-note" style="margin-top:7px;">Todos os nomes ficam disponíveis para o anúncio dos pastores à igreja.</p></div><div class="form-field full"><label>Observações</label><div style="padding:11px;border-radius:9px;background:var(--paper);color:var(--muted);font-size:10px;line-height:1.5;">${esc(visitor.notes || 'Sem observações registradas.')}</div></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-primary" data-action="announce-visitor" data-id="${esc(visitor.id)}">${ICON('megaphone')} Preparar anúncio</button>${visitor.status === 'Novo' ? `<button type="button" class="btn btn-gold" data-action="mark-contacted" data-id="${esc(visitor.id)}">${ICON('check')} Marcar como contatado</button>` : `<button type="button" class="btn btn-primary" data-action="visitor-message" data-id="${esc(visitor.id)}">${ICON('send')} Registrar contato</button>`}</div>`;
  } else if (type === 'notifications') {
    modalTitle = 'Notificações';
    modalEyebrow = 'CENTRAL DE ALERTAS';
    content = `<div style="display:flex;flex-direction:column;gap:10px;"><div class="announcement-card" style="padding:13px;"><div class="announcement-icon copper">${ICON('users')}</div><div class="announcement-body"><h3>Novo visitante cadastrado</h3><p>Ana Clara Nogueira foi cadastrada pela recepção.</p><div class="announcement-meta"><span class="announcement-date">Hoje, 10:42</span></div></div></div><div class="announcement-card" style="padding:13px;"><div class="announcement-icon">${ICON('megaphone')}</div><div class="announcement-body"><h3>Aviso publicado</h3><p>O comunicado “Culto de Celebração” alcançou toda a igreja.</p><div class="announcement-meta"><span class="announcement-date">Hoje, 09:15</span></div></div></div><div class="announcement-card" style="padding:13px;"><div class="announcement-icon" style="background:var(--success-soft);color:var(--success);">${ICON('check-circle')}</div><div class="announcement-body"><h3>Backup concluído</h3><p>Os dados da organização foram protegidos com sucesso.</p><div class="announcement-meta"><span class="announcement-date">Ontem, 23:00</span></div></div></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Marcar tudo como lido</button><button type="button" class="btn btn-gold" data-action="close-modal">Fechar</button></div>`;
  } else if (type === 'search') {
    modalTitle = `Buscar na ${getActiveChurch()?.name || 'igreja'}`;
    modalEyebrow = 'BUSCA RÁPIDA';
    content = `<div class="input-wrap" style="width:100%;">${ICON('search')}<input class="input" id="globalSearch" style="width:100%;padding-left:36px;" autofocus placeholder="Visitante, aviso, evento ou líder"></div><div id="globalSearchResults" style="margin-top:15px;"></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button></div>`;
  } else if (type === 'channels') {
    modalTitle = 'Canais de envio';
    modalEyebrow = 'COMUNICAÇÃO';
    content = `<div class="toggle-row"><div class="toggle-copy"><strong>Notificações push</strong><span>Entrega rápida no celular de quem instalou a PWA.</span></div><button class="toggle on" data-toggle="push" aria-label="Alternar notificações push"></button></div><div class="toggle-row"><div class="toggle-copy"><strong>WhatsApp oficial</strong><span>Envio para listas autorizadas da organização.</span></div><button class="toggle on" data-toggle="whatsapp" aria-label="Alternar WhatsApp"></button></div><div class="toggle-row"><div class="toggle-copy"><strong>E-mail</strong><span>Uma alternativa para comunicados e documentos.</span></div><button class="toggle on" data-toggle="email" aria-label="Alternar e-mail"></button></div><div class="modal-actions"><button type="button" class="btn btn-gold" data-action="close-modal">Concluir</button></div>`;
  } else if (type === 'leader') {
    modalTitle = 'Adicionar liderança';
    modalEyebrow = 'EQUIPE';
    content = `<form data-form="leader"><div class="form-grid"><div class="form-field full"><label for="leaderName">Nome completo *</label><input class="input" id="leaderName" name="name" required placeholder="Ex.: Maria Oliveira"></div><div class="form-field"><label for="leaderRole">Função</label><input class="input" id="leaderRole" name="role" placeholder="Ex.: Líder de jovens"></div><div class="form-field"><label for="leaderPhone">Telefone</label><input class="input" id="leaderPhone" name="phone" placeholder="(21) 99999-9999"></div><div class="form-field full"><label for="leaderGroup">Ministério / grupo</label><input class="input" id="leaderGroup" name="group" placeholder="Ex.: Jovens"></div></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-gold">${ICON('users')} Adicionar líder</button></div></form>`;
  }
  title.textContent = modalTitle;
  eyebrow.textContent = modalEyebrow;
  body.innerHTML = content;
  backdrop.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setTimeout(() => { const autofocus = $('#modalBody input[autofocus], #modalBody input:not([type="checkbox"]):not([type="radio"])'); autofocus?.focus(); }, 50);
  if (type === 'search') bindGlobalSearch();
}

function closeModal() {
  $('#modalBackdrop')?.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function updateLogoPreview() {
  const church = getActiveChurch();
  const symbol = ($('#churchLogoSymbol')?.value || churchLogoText(church)).trim().slice(0, 2).toUpperCase() || 'B';
  const text = $('#settingsLogoSymbol');
  const image = $('#settingsLogoImage');
  const source = pendingLogoImage !== null ? pendingLogoImage : (church?.logoImage || '');
  if (text) { text.textContent = symbol; text.hidden = Boolean(source); }
  if (image) { image.hidden = !source; if (source) { image.src = source; image.alt = `${church?.name || 'Igreja'} — logo`; } }
}

function handleLogoFile(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) return showToast('Escolha uma imagem PNG, JPG ou WEBP.', 'error');
  if (file.size > 2 * 1024 * 1024) return showToast('A imagem do logo deve ter no máximo 2 MB.', 'error');
  const reader = new FileReader();
  reader.onload = () => { pendingLogoImage = String(reader.result || ''); updateLogoPreview(); showToast('Logo carregado. Clique em “Salvar alterações” para aplicar.'); };
  reader.readAsDataURL(file);
}

function showToast(message, kind = 'success') {
  const stack = $('#toastStack');
  if (!stack) return;
  const toast = document.createElement('div');
  toast.className = `toast ${kind === 'error' ? 'is-error' : ''}`;
  toast.innerHTML = `<span class="toast-icon">${ICON(kind === 'error' ? 'x' : 'check')}</span><span>${esc(message)}</span>`;
  stack.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(6px)'; setTimeout(() => toast.remove(), 250); }, 3600);
}

function handleSubmit(event) {
  const form = event.target.closest('form[data-form]');
  if (!form) return;
  event.preventDefault();
  const formType = form.dataset.form;
  const data = new FormData(form);
  if (formType === 'visitor') {
    const name = String(data.get('name') || '').trim();
    if (!name) return showToast('Informe o nome do visitante.', 'error');
    const additionalFamilyMembers = data.getAll('familyMembers').map(member => String(member).trim()).filter(Boolean);
    const familyMembers = [...new Set([name, ...additionalFamilyMembers])];
    const visitor = { id: `v-${Date.now()}`, name, familyName: String(data.get('familyName') || '').trim(), familyMembers, arrivalType: String(data.get('arrivalType') || 'Sozinho'), announced: false, phone: String(data.get('phone') || '').trim(), date: String(data.get('date') || TODAY), service: String(data.get('service') || 'Culto'), neighborhood: String(data.get('neighborhood') || '').trim(), invitedBy: String(data.get('invitedBy') || '').trim(), status: 'Novo', responsible: 'Recepção', notes: String(data.get('notes') || '').trim(), consent: true };
    state.visitors.unshift(visitor);
    state.metrics.visits += 1;
    state.activity.unshift({ type: 'visitor', name: visitor.familyName || visitor.name, text: familyMembers.length > 1 ? `foi cadastrada com ${familyMembers.length} pessoas da família.` : 'foi cadastrada como nova visitante.', time: 'Agora', initials: initials(visitor.familyName || visitor.name), tone: 'copper' });
    saveState(); closeModal(); render(); showToast(`Visitante ${visitor.name} cadastrado. O pastor foi avisado.`);
  } else if (formType === 'announcement') {
    const title = String(data.get('title') || '').trim();
    const body = String(data.get('body') || '').trim();
    const channels = data.getAll('channels');
    if (!title || !body) return showToast('Preencha o título e a mensagem do aviso.', 'error');
    if (!channels.length) return showToast('Escolha pelo menos um canal de envio.', 'error');
    const announcement = { id: `a-${Date.now()}`, title, body, audience: String(data.get('audience') || 'Toda a igreja'), channels, date: '04 set 2026', status: data.get('mode') === 'scheduled' ? 'Agendado' : 'Enviado', reach: data.get('mode') === 'scheduled' ? 'Programado' : `${state.metrics.reach} pessoas`, tone: 'gold' };
    state.announcements.unshift(announcement);
    state.metrics.announcements += 1;
    state.activity.unshift({ type: 'announcement', name: title, text: data.get('mode') === 'scheduled' ? 'foi agendado.' : 'foi enviado para o público selecionado.', time: 'Agora', initials: initials(title), tone: 'gold' });
    saveState(); closeModal(); render(); showToast(data.get('mode') === 'scheduled' ? 'Aviso agendado com sucesso.' : 'Aviso publicado e enviado com sucesso.');
  } else if (formType === 'event') {
    const title = String(data.get('title') || '').trim();
    if (!title) return showToast('Informe o nome do evento.', 'error');
    const eventItem = { id: `e-${Date.now()}`, title, date: String(data.get('date') || TODAY), time: String(data.get('time') || '19:00'), location: String(data.get('location') || 'Templo principal'), type: String(data.get('type') || 'Outro'), audience: String(data.get('audience') || 'Toda a igreja') };
    state.events.push(eventItem);
    state.events.sort((a, b) => a.date.localeCompare(b.date));
    state.activity.unshift({ type: 'event', name: title, text: 'foi adicionado à agenda.', time: 'Agora', initials: initials(title), tone: 'dark' });
    saveState(); closeModal(); render(); showToast('Evento adicionado à agenda.');
  } else if (formType === 'church') {
    const name = String(data.get('name') || '').trim();
    if (!name) return showToast('Informe o nome da igreja.', 'error');
    const church = { id: `church-${Date.now()}`, name, city: String(data.get('city') || 'Brasil'), phone: '', pastors: String(data.get('admin') || ''), description: 'Um lugar para pertencer, crescer e viver a fé em comunidade.', initials: initials(name), logoSymbol: initials(name).slice(0, 2), logoImage: '', appearance: { ...DEFAULT_APPEARANCE }, members: 0, status: 'Ativa', plan: 'Essencial' };
    state.churches.push(church);
    state.activeChurchId = church.id;
    saveState(); closeModal(); render(); showToast(`${name} foi adicionada como nova organização.`);
  } else if (formType === 'leader') {
    const name = String(data.get('name') || '').trim();
    if (!name) return showToast('Informe o nome da liderança.', 'error');
    state.leaders.push({ id: `l-${Date.now()}`, name, role: String(data.get('role') || 'Líder'), phone: String(data.get('phone') || 'Não informado'), group: String(data.get('group') || 'A definir'), initials: initials(name), tone: 'dark' });
    saveState(); closeModal(); render(); showToast(`${name} foi adicionada à equipe.`);
  } else if (formType === 'reception') {
    const name = String(data.get('name') || '').trim();
    const login = String(data.get('login') || '').trim().toLowerCase();
    const password = String(data.get('password') || '');
    const passwordConfirm = String(data.get('passwordConfirm') || '');
    if (!name) return showToast('Informe o nome do obreiro ou membro.', 'error');
    if (!login) return showToast('Informe um e-mail para o login.', 'error');
    if (password.length < 6) return showToast('A senha deve ter pelo menos 6 caracteres.', 'error');
    if (password !== passwordConfirm) return showToast('A confirmação da senha não confere.', 'error');
    state.receptionUsers = state.receptionUsers || [];
    const duplicateLogin = state.receptionUsers.some(user => String(user.login || '').toLowerCase() === login && user.id !== state.currentUser?.receptionUserId);
    if (duplicateLogin) return showToast('Este login já está cadastrado na recepção.', 'error');
    state.receptionUsers.push({ id: `r-${Date.now()}`, name, login, password, role: String(data.get('role') || 'Recepção'), roleKey: 'reception', churchId: state.activeChurchId, phone: String(data.get('phone') || 'Não informado'), passwordStatus: 'Ativa', status: 'Ativo', permissions: ['acolhimento'], lastAccess: 'ainda não acessou', initials: initials(name), tone: 'dark' });
    saveState(); closeModal(); render(); showToast(`Acesso de ${name} salvo. Já é possível entrar com esse login e senha.`);
  } else if (formType === 'organization') {
    const church = getActiveChurch();
    church.name = String(data.get('churchName') ?? church.name).trim() || church.name;
    church.city = String(data.get('churchCity') ?? church.city).trim() || church.city;
    church.pastors = String(data.get('pastorName') ?? church.pastors ?? '').trim();
    church.phone = String(data.get('churchPhone') ?? church.phone ?? '').trim();
    church.description = String(data.get('churchDescription') ?? church.description ?? '').trim();
    church.logoSymbol = String(data.get('logoSymbol') || church.logoSymbol || initials(church.name)).trim().slice(0, 2).toUpperCase();
    church.initials = initials(church.name);
    if (pendingLogoImage !== null) church.logoImage = pendingLogoImage;
    pendingLogoImage = null;
    saveState('Identidade e telefone da igreja atualizados');
    render(); showToast('Nome, telefone e identidade visual da igreja atualizados. Backup automático realizado.');
  }
}

function markContacted(id) {
  const visitor = state.visitors.find(item => item.id === id);
  if (!visitor) return;
  visitor.status = 'Contatado';
  visitor.responsible = 'Pr. Evandro';
  state.activity.unshift({ type: 'return', name: visitor.name, text: 'foi marcado para acompanhamento.', time: 'Agora', initials: initials(visitor.name), tone: 'olive' });
  saveState(); closeModal(); render(); showToast(`${visitor.name} agora está em acompanhamento.`);
}

function prepareVisitorAnnouncement(id) {
  const visitor = state.visitors.find(item => item.id === id);
  if (!visitor) return;
  closeModal();
  openModal('announcement', { visitors: [visitor] });
}

function announceNewVisitors() {
  const newVisitors = pendingPulpitVisitors();
  if (!newVisitors.length) return showToast('Não há visitantes pendentes para anunciar.', 'error');
  openModal('announcement', { visitors: newVisitors });
}

function markPulpitAnnounced() {
  const pending = pendingPulpitVisitors();
  if (!pending.length) return showToast('Não há visitantes pendentes para marcar.', 'error');
  pending.forEach(visitor => { visitor.announced = true; });
  saveState();
  render();
  showToast(`${pending.length === 1 ? 'Visitante marcado' : 'Visitantes marcados'} como apresentado${pending.length === 1 ? '' : 's'} à igreja.`);
}

function togglePulpitFullscreen() {
  const target = $('.pulpit-hero')?.parentElement || document.documentElement;
  if (!document.fullscreenElement) {
    target.requestFullscreen?.().catch(() => showToast('A tela cheia não está disponível neste navegador.', 'error'));
  } else {
    document.exitFullscreen?.();
  }
}

function resetReceptionPassword(id) {
  const receptionUser = (state.receptionUsers || []).find(item => item.id === id);
  if (!receptionUser) return;
  const password = window.prompt(`Defina uma nova senha para ${receptionUser.name} (mínimo de 6 caracteres):`);
  if (password === null) return;
  if (password.length < 6) return showToast('A senha deve ter pelo menos 6 caracteres.', 'error');
  const confirmation = window.prompt('Confirme a nova senha:');
  if (confirmation === null) return;
  if (password !== confirmation) return showToast('A confirmação da senha não confere.', 'error');
  receptionUser.password = password;
  receptionUser.passwordStatus = 'Ativa';
  saveState();
  closeModal();
  render();
  showToast(`Nova senha definida para ${receptionUser.name}.`);
}

function toggleReceptionAccess(id) {
  const receptionUser = (state.receptionUsers || []).find(item => item.id === id);
  if (!receptionUser) return;
  const willBlock = receptionUser.status !== 'Bloqueado';
  const message = willBlock ? `Bloquear o acesso de ${receptionUser.name}?` : `Reativar o acesso de ${receptionUser.name}?`;
  if (!window.confirm(message)) return;
  receptionUser.status = willBlock ? 'Bloqueado' : 'Ativo';
  saveState();
  closeModal();
  render();
  showToast(willBlock ? `Acesso de ${receptionUser.name} bloqueado.` : `Acesso de ${receptionUser.name} reativado.`);
}

function deleteReceptionAccess(id) {
  const receptionUser = (state.receptionUsers || []).find(item => item.id === id);
  if (!receptionUser) return;
  if (!window.confirm(`Excluir o acesso de ${receptionUser.name}? Os visitantes cadastrados por ele não serão apagados.`)) return;
  state.receptionUsers = state.receptionUsers.filter(item => item.id !== id);
  saveState();
  closeModal();
  render();
  showToast(`Acesso de ${receptionUser.name} excluído.`);
}

function switchChurch(id) {
  const church = state.churches.find(item => item.id === id);
  if (!church) return;
  if (!isPlatformAdmin() && id !== state.activeChurchId) return showToast('Você só pode acessar os dados da sua própria igreja.', 'error');
  state.activeChurchId = id;
  saveState(); closeModal(); render(); showToast(`Área da ${church.name} selecionada.`);
}

function exportVisitors() {
  const headers = ['Nome principal', 'Família ou grupo', 'Como veio', 'Nomes para anunciar', 'Telefone', 'Data da visita', 'Culto ou evento', 'Bairro', 'Status', 'Responsável'];
  const rows = state.visitors.map(visitor => [visitor.name, visitor.familyName, visitor.arrivalType || 'Sozinho', getFamilyMembers(visitor).join(' | '), visitor.phone, visitor.date, visitor.service, visitor.neighborhood, visitor.status, visitor.responsible]);
  const csv = [headers, ...rows].map(row => row.map(escapeCSV).join(';')).join('\n');
  downloadBlob(`visitantes-${slugify(getActiveChurch()?.name || 'igreja')}-${TODAY}.csv`, `\ufeff${csv}`, 'text/csv;charset=utf-8;');
  showToast('Planilha de visitantes exportada.');
}

async function copyReceptionLink() {
  const link = receptionLink(getActiveChurch());
  try {
    await navigator.clipboard.writeText(link);
    showToast('Link da recepção copiado.');
  } catch {
    const helper = document.createElement('textarea');
    helper.value = link; document.body.appendChild(helper); helper.select(); document.execCommand('copy'); helper.remove();
    showToast('Link da recepção copiado.');
  }
}

function exportEvents() {
  const headers = ['Evento', 'Data', 'Horário', 'Local', 'Categoria', 'Público'];
  const rows = sortedEvents().map(event => [event.title, event.date, event.time, event.location, event.type, event.audience]);
  const csv = [headers, ...rows].map(row => row.map(escapeCSV).join(';')).join('\n');
  downloadBlob(`agenda-${slugify(getActiveChurch()?.name || 'igreja')}-${TODAY}.csv`, `\ufeff${csv}`, 'text/csv;charset=utf-8;');
  showToast('Agenda exportada.');
}

function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function bindGlobalSearch() {
  const input = $('#globalSearch');
  input?.addEventListener('input', () => {
    const term = input.value.trim().toLowerCase();
    const results = $('#globalSearchResults');
    if (!results) return;
    if (!term) { results.innerHTML = `<p class="field-note">Comece digitando para buscar visitantes, avisos, eventos ou líderes.</p>`; return; }
    const items = [
      ...state.visitors.map(item => ({ type: 'Visitante', title: item.name, meta: `${item.arrivalType || 'Sozinho'} · ${getFamilyMembers(item).join(', ')}`, action: 'visitor-detail', id: item.id })),
      ...state.announcements.map(item => ({ type: 'Aviso', title: item.title, meta: item.audience, action: 'go-communication' })),
      ...state.events.map(item => ({ type: 'Evento', title: item.title, meta: `${formatDateShort(item.date)} · ${item.time}`, action: 'go-agenda' })),
      ...state.leaders.map(item => ({ type: 'Liderança', title: item.name, meta: item.role, action: 'go-leaders' }))
    ].filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(term)).slice(0, 6);
    results.innerHTML = items.length ? items.map(item => `<button class="tenant-row" style="width:100%;border:1px solid #f0ede7;background:#fff;text-align:left;" data-action="${item.action}" ${item.id ? `data-id="${esc(item.id)}"` : ''}><div class="tenant-logo">${esc(item.type.slice(0, 2).toUpperCase())}</div><div class="tenant-copy"><strong>${esc(item.title)}</strong><span>${esc(item.type)} · ${esc(item.meta)}</span></div>${ICON('chevron-right')}</button>`).join('') : `<div class="empty-state"><div class="icon-tile">${ICON('search')}</div><h3>Nada encontrado</h3><p>Tente outro termo.</p></div>`;
  });
}

function setView(view, options = {}) {
  if (!viewMeta[view]) return;
  if (view === 'acolhimento' && !canAccessAcolhimento()) {
    showToast('Seu acesso de recepção está bloqueado ou não possui a aba Acolhimento.', 'error');
    return;
  }
  if (!options.fromHistory && state.activeView !== view) viewHistory.push(state.activeView);
  closeModal();
  state.activeView = view;
  saveState();
  render();
  $('#sidebar')?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  const previousView = viewHistory.pop() || 'dashboard';
  setView(previousView, { fromHistory: true });
}

function handleAction(actionEl) {
  const action = actionEl.dataset.action;
  switch (action) {
    case 'new-visitor': openModal('visitor'); break;
    case 'open-metric': openModal('metric', { metric: actionEl.dataset.metric }); break;
    case 'new-announcement': openModal('announcement'); break;
    case 'new-event': openModal('event'); break;
    case 'new-church': if (!isPlatformAdmin()) showToast('Somente o administrador da plataforma pode cadastrar outra igreja.', 'error'); else openModal('church'); break;
    case 'new-leader': openModal('leader'); break;
    case 'visitor-detail': openModal('visitor-detail', { id: actionEl.dataset.id }); break;
    case 'announce-visitors': announceNewVisitors(); break;
    case 'announce-visitor': prepareVisitorAnnouncement(actionEl.dataset.id); break;
    case 'mark-pulpit-announced': markPulpitAnnounced(); break;
    case 'fullscreen-pulpit': togglePulpitFullscreen(); break;
    case 'add-family-member': {
      const list = $('#familyMemberList');
      if (!list) break;
      const nextIndex = list.querySelectorAll('.family-member-row').length + 1;
      list.insertAdjacentHTML('beforeend', familyMemberRow('', nextIndex));
      list.lastElementChild?.querySelector('input')?.focus();
      break;
    }
    case 'remove-family-member': {
      const row = actionEl.closest('.family-member-row');
      const list = $('#familyMemberList');
      if (!row || !list) break;
      if (list.querySelectorAll('.family-member-row').length === 1) {
        const input = row.querySelector('input');
        if (input) input.value = '';
      } else {
        row.remove();
        list.querySelectorAll('.family-member-number').forEach((number, index) => { number.textContent = index + 1; });
      }
      break;
    }
    case 'mark-contacted': markContacted(actionEl.dataset.id); break;
    case 'visitor-message': showToast('O registro de contato ficará disponível na próxima etapa.', 'success'); break;
    case 'close-modal': closeModal(); break;
    case 'go-back': goBack(); break;
    case 'export': exportVisitors(); break;
    case 'export-events': exportEvents(); break;
    case 'export-leaders': showToast('Lista de lideranças exportada.'); break;
    case 'notification': openModal('notifications'); break;
    case 'channel-settings': openModal('channels'); break;
    case 'filter-help': showToast('Use a busca e o seletor de status para filtrar os visitantes.'); break;
    case 'calendar-prev': showToast('O calendário completo ficará disponível na próxima etapa.'); break;
    case 'calendar-next': showToast('O calendário completo ficará disponível na próxima etapa.'); break;
    case 'today': showToast('Você está visualizando setembro de 2026.'); break;
    case 'open-public-page': showToast('A página pública da igreja será conectada na próxima etapa.'); break;
    case 'remove-logo': pendingLogoImage = ''; updateLogoPreview(); showToast('O símbolo de texto será usado como logo.'); break;
    case 'apply-palette': applyPalette(actionEl.dataset.palette); break;
    case 'new-reception': openModal('reception'); break;
    case 'copy-reception-link': copyReceptionLink(); break;
    case 'reception-detail': openModal('reception-detail', { id: actionEl.dataset.id }); break;
    case 'reset-reception-password': resetReceptionPassword(actionEl.dataset.id); break;
    case 'toggle-reception-access': toggleReceptionAccess(actionEl.dataset.id); break;
    case 'delete-reception-access': deleteReceptionAccess(actionEl.dataset.id); break;
    case 'save-settings': {
      applyAppearanceFromControls();
      $('[data-form="organization"]')?.requestSubmit();
      break;
    }
    case 'leader-detail': showToast('Perfil de liderança selecionado.'); break;
    case 'go-communication': closeModal(); setView('communication'); break;
    case 'go-agenda': closeModal(); setView('agenda'); break;
    case 'go-leaders': closeModal(); setView('leaders'); break;
    case 'switch-church': switchChurch(actionEl.dataset.id); break;
    case 'logout': showToast('A sessão de demonstração continua ativa.'); break;
    default: break;
  }
}

function init() {
  applyAppearance();
  if (!getBackupHistory().length) saveState('Backup inicial');
  render();
  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-view]');
    if (nav) { event.preventDefault(); setView(nav.dataset.view); return; }
    const action = event.target.closest('[data-action]');
    if (action) { event.preventDefault(); handleAction(action); return; }
    const settingsSection = event.target.closest('[data-settings-section]');
    if (settingsSection) { applySettingsSection(settingsSection.dataset.settingsSection); showToast(`Seção “${settingsSection.textContent.trim()}” aberta.`); return; }
    const toggle = event.target.closest('[data-toggle]');
    if (toggle) { toggle.classList.toggle('on'); return; }
    if (event.target === $('#modalBackdrop')) closeModal();
  });
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('input', event => {
    if (event.target.id === 'visitorSearch') { const rows = $('#visitorRows'); if (rows) rows.innerHTML = renderVisitorRows(); }
    if (event.target.id === 'churchLogoSymbol') updateLogoPreview();
    if (event.target.matches('[data-appearance-control][type="color"]')) {
      const text = $(`[data-color-text="${event.target.id}"]`);
      if (text) text.value = event.target.value.toUpperCase();
      applyAppearanceFromControls();
    }
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'visitorStatus' || event.target.id === 'visitorArrival') { const rows = $('#visitorRows'); if (rows) rows.innerHTML = renderVisitorRows(); }
    if (event.target.matches('[data-family-toggle]')) { $('#familyFields')?.classList.toggle('is-hidden', !event.target.checked); }
    if (event.target.id === 'visitorArrivalType' && event.target.value !== 'Sozinho') {
      const familyToggle = $('#registerFamily');
      if (familyToggle) { familyToggle.checked = true; $('#familyFields')?.classList.remove('is-hidden'); }
    }
    if (event.target.id === 'churchLogoFile') handleLogoFile(event.target.files?.[0]);
    if (event.target.matches('[data-appearance-control]')) {
      if (event.target.type === 'color') {
        const text = $(`[data-color-text="${event.target.id}"]`);
        if (text) text.value = event.target.value.toUpperCase();
      }
      applyAppearanceFromControls();
    }
    if (event.target.matches('[data-color-text]')) {
      const colorInput = document.getElementById(event.target.dataset.colorText);
      const valid = normalizeHex(event.target.value, '');
      if (!valid) {
        showToast('Digite uma cor no formato #RRGGBB.', 'error');
        if (colorInput) event.target.value = colorInput.value.toUpperCase();
      } else {
        if (colorInput) colorInput.value = valid;
        event.target.value = valid.toUpperCase();
        applyAppearanceFromControls();
      }
    }
  });
  $('#modalClose')?.addEventListener('click', closeModal);
  $('#mobileMenu')?.addEventListener('click', () => $('#sidebar')?.classList.add('open'));
  $('#sidebarClose')?.addEventListener('click', () => $('#sidebar')?.classList.remove('open'));
  $('#churchSwitcher')?.addEventListener('click', () => openModal('churches'));
  $('#notificationBtn')?.addEventListener('click', () => openModal('notifications'));
  $('#searchTrigger')?.addEventListener('click', () => openModal('search'));
  $('#logoutBtn')?.addEventListener('click', () => showToast('A sessão de demonstração continua ativa.'));
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openModal('search'); }
    if ((event.key === 'Enter' || event.key === ' ') && document.activeElement?.matches('[data-action="open-metric"]')) { event.preventDefault(); document.activeElement.click(); }
    if (event.key === 'Escape') closeModal();
  });
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {}));
}

// Modal de troca de organização, mantido separado para não misturar com o cadastro de uma nova igreja.
const originalOpenModal = openModal;
openModal = function(type, data = {}) {
  if (type !== 'churches') return originalOpenModal(type, data);
  const backdrop = $('#modalBackdrop');
  if (!isPlatformAdmin()) {
    const activeChurch = getActiveChurch();
    $('#modalTitle').textContent = 'Igreja atual';
    $('#modalEyebrow').textContent = 'ACESSO DO PASTOR';
    $('#modalBody').innerHTML = `<div class="scope-note" style="margin:0;"><span>${ICON('shield')}</span><p><strong>${esc(activeChurch.name)}</strong><br>Você está conectado como pastor desta igreja. O administrador da plataforma gerencia as demais organizações.</p></div><div class="tenant-row" style="margin-top:14px;"><div class="tenant-logo">${esc(activeChurch.initials || initials(activeChurch.name))}</div><div class="tenant-copy"><strong>${esc(activeChurch.name)}</strong><span>${esc(activeChurch.city)} · igreja ativa</span></div><span class="tenant-status">${ICON('check')}</span></div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-gold" data-view="settings">Editar nome e logo</button></div>`;
    backdrop.classList.remove('hidden'); document.body.classList.add('modal-open');
    return;
  }
  $('#modalTitle').textContent = 'Trocar igreja';
  $('#modalEyebrow').textContent = 'ORGANIZAÇÕES';
  $('#modalBody').innerHTML = `<p class="field-note" style="margin-bottom:14px;">Cada organização possui seus próprios dados e permissões.</p><div class="tenant-list">${state.churches.map(church => `<button class="tenant-row" style="width:100%;border:1px solid ${church.id === state.activeChurchId ? '#e2c785' : '#f0ede7'};background:${church.id === state.activeChurchId ? 'var(--gold-soft)' : '#fff'};text-align:left;" data-action="switch-church" data-id="${esc(church.id)}"><div class="tenant-logo">${esc(church.initials || initials(church.name))}</div><div class="tenant-copy"><strong>${esc(church.name)}</strong><span>${esc(church.city)} · ${church.id === state.activeChurchId ? 'Igreja ativa' : 'Selecionar organização'}</span></div>${church.id === state.activeChurchId ? `<span class="tenant-status">${ICON('check')}</span>` : ICON('chevron-right')}</button>`).join('')}</div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">Fechar</button><button type="button" class="btn btn-gold" data-action="new-church">${ICON('plus')} Adicionar igreja</button></div>`;
  backdrop.classList.remove('hidden'); document.body.classList.add('modal-open');
};

init();

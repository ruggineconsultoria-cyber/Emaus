const STATE_KEY = 'batesda-platform-state-v1';
const BACKUP_KEY = 'batesda-platform-backups-v1';
const BACKUP_LIMIT = 30;
const SESSION_KEY = 'emaus-reception-session';
const TODAY = new Date().toISOString().slice(0, 10);

const fallbackState = {
  activeChurchId: 'batesda',
  metrics: { visits: 0, returns: 0, reach: 0, announcements: 0 },
  churches: [{ id: 'batesda', name: 'Bethesda', city: 'Itaboraí • RJ', initials: 'BE', logoSymbol: 'B', logoImage: 'bethesda-logo.png' }],
  visitors: [],
  activity: [],
  receptionUsers: [
    { id: 'r-1', name: 'Mariana Alves', role: 'Recepção', login: 'mariana@bethesda.com.br', status: 'Ativo', permissions: ['acolhimento'] },
    { id: 'r-2', name: 'João Pedro', role: 'Obreiro', login: 'joao@bethesda.com.br', status: 'Ativo', permissions: ['acolhimento'] }
  ]
};

let state = loadState();
let currentUser = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY));
    if (saved && Array.isArray(saved.churches)) {
      return {
        ...fallbackState,
        ...saved,
        metrics: { ...fallbackState.metrics, ...(saved.metrics || {}) },
        churches: (saved.churches.length ? saved.churches : fallbackState.churches).map(church => church.id === 'batesda' ? { ...church, name: 'Bethesda', initials: 'BE', logoImage: 'bethesda-logo.png' } : church),
        visitors: Array.isArray(saved.visitors) ? saved.visitors : [],
        activity: Array.isArray(saved.activity) ? saved.activity : [],
        receptionUsers: (Array.isArray(saved.receptionUsers) && saved.receptionUsers.length ? saved.receptionUsers : fallbackState.receptionUsers).map(user => ({ ...user, login: String(user.login || '').replace(/@batesda\.com\.br$/i, '@bethesda.com.br'), permissions: Array.isArray(user.permissions) && user.permissions.length ? user.permissions : ['acolhimento'] }))
      };
    }
  } catch (error) {
    console.info('Iniciando uma nova recepção.', error);
  }
  return JSON.parse(JSON.stringify(fallbackState));
}

function getChurch() {
  return state.churches.find(church => church.id === state.activeChurchId) || state.churches[0] || fallbackState.churches[0];
}

function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'B';
}

function uniqueNames(names) {
  return [...new Set(names.map(name => String(name || '').trim()).filter(Boolean))];
}

function namesAsSentence(names) {
  const clean = uniqueNames(names);
  if (!clean.length) return '';
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} e ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')} e ${clean[clean.length - 1]}`;
}

function groupLabel(type, familyName) {
  if (type === 'Família') return familyName || 'Família';
  if (type === 'Em casal') return 'Casal';
  if (type === 'Com amigos') return 'Amigos';
  return 'Sozinho';
}

function getFormValues() {
  const form = document.querySelector('#visitorForm');
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const type = String(data.get('arrivalType') || 'Sozinho');
  const additionalNames = [...document.querySelectorAll('input[name="familyMember"]')].map(input => input.value);
  const members = uniqueNames([name, ...additionalNames]);
  return {
    name,
    type,
    familyName: String(data.get('familyName') || '').trim(),
    members,
    message: members.length ? `${groupLabel(type, String(data.get('familyName') || '').trim())}: ${namesAsSentence(members)}` : `${groupLabel(type, String(data.get('familyName') || '').trim())}: informe o nome do visitante.`
  };
}

function updatePreview() {
  const values = getFormValues();
  const church = getChurch();
  const lines = values.name ? `${values.message}\nSejam muito bem-vindos à ${church.name}!` : `${values.message}`;
  document.querySelector('#messagePreview').textContent = lines;
}

function showFamilyFields(force = false) {
  const checkbox = document.querySelector('#registerGroup');
  const arrival = document.querySelector('#visitorArrival');
  const fields = document.querySelector('#familyFields');
  const shouldShow = force || checkbox.checked || arrival.value !== 'Sozinho';
  fields.classList.toggle('hidden', !shouldShow);
  checkbox.checked = shouldShow;
  if (shouldShow && !document.querySelector('input[name="familyMember"]')) addFamilyMember();
  updatePreview();
}

function addFamilyMember() {
  const list = document.querySelector('#familyList');
  const row = document.createElement('div');
  row.className = 'family-row';
  row.innerHTML = '<input name="familyMember" placeholder="Nome da outra pessoa"><button class="remove-member" type="button" aria-label="Remover pessoa">×</button>';
  list.appendChild(row);
  row.querySelector('input').focus();
  updatePreview();
}

function persistBackup(reason) {
  const snapshot = JSON.parse(JSON.stringify(state));
  let history = [];
  try {
    const saved = JSON.parse(localStorage.getItem(BACKUP_KEY));
    history = Array.isArray(saved) ? saved : [];
  } catch (error) {
    history = [];
  }
  history.unshift({ id: `backup-${Date.now()}`, createdAt: new Date().toISOString(), reason, churchId: state.activeChurchId, state: snapshot });
  for (let limit = Math.min(history.length, BACKUP_LIMIT); limit > 0; limit -= 1) {
    try {
      localStorage.setItem(BACKUP_KEY, JSON.stringify(history.slice(0, limit)));
      return true;
    } catch (error) {
      // Conserva as versões anteriores caso o navegador esteja sem espaço.
    }
  }
  return false;
}

function saveReceptionState(reason = 'Cadastro feito pela recepção') {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  persistBackup(reason);
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  window.setTimeout(() => toast.classList.add('hidden'), 4200);
}

function renderChurchIdentity() {
  const church = getChurch();
  const logo = document.querySelector('#churchLogo');
  document.querySelector('#churchName').textContent = church.name || 'Bethesda';
  document.querySelector('#footerChurchName').textContent = church.name || 'Bethesda';
  document.querySelector('#churchCity').textContent = `${church.city || 'Sua cidade'} · área de acolhimento`;
  document.title = `Recepção · ${church.name || 'Bethesda'}`;
  if (church.logoImage) {
    const logoSource = /^(data:|https?:|\/)/i.test(church.logoImage) ? church.logoImage : `../${church.logoImage.replace(/^\.\//, '')}`;
    logo.innerHTML = `<img src="${logoSource}" alt="Logo da ${church.name}">`;
  } else {
    logo.textContent = church.logoSymbol || initials(church.name);
  }
}

function showLoggedInView(user) {
  currentUser = user;
  sessionStorage.setItem(SESSION_KEY, user.id);
  document.querySelector('#loginView').classList.add('hidden');
  document.querySelector('#appView').classList.remove('hidden');
  document.querySelector('#logoutButton').classList.remove('hidden');
  document.querySelector('#welcomeTitle').textContent = `Olá, ${user.name.split(' ')[0]}!`;
  renderChurchIdentity();
  document.querySelector('#visitorDate').value = TODAY;
  updatePreview();
}

function showLoggedOutView() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);
  document.querySelector('#loginView').classList.remove('hidden');
  document.querySelector('#appView').classList.add('hidden');
  document.querySelector('#logoutButton').classList.add('hidden');
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.querySelector('#loginEmail').value.trim().toLowerCase();
  const password = document.querySelector('#loginPassword').value;
  const message = document.querySelector('#loginMessage');
  const user = (state.receptionUsers || []).find(item => String(item.login || '').toLowerCase() === email);
  const hasPermission = user && (!Array.isArray(user.permissions) || user.permissions.includes('acolhimento'));
  if (!password || !user || user.status === 'Bloqueado' || !hasPermission) {
    message.textContent = user?.status === 'Bloqueado' ? 'Este acesso está bloqueado. Fale com o pastor da igreja.' : 'Confira o login cadastrado na recepção e tente novamente.';
    message.classList.remove('hidden');
    return;
  }
  message.classList.add('hidden');
  showLoggedInView(user);
}

function handleVisitorSubmit(event) {
  event.preventDefault();
  const values = getFormValues();
  if (!values.name) return showToast('Informe o nome principal do visitante.');
  const form = document.querySelector('#visitorForm');
  const data = new FormData(form);
  const church = getChurch();
  const visitor = {
    id: `v-${Date.now()}`,
    name: values.name,
    familyName: String(data.get('familyName') || '').trim(),
    familyMembers: values.members.length ? values.members : [values.name],
    arrivalType: values.type,
    announced: false,
    phone: String(data.get('phone') || '').trim(),
    date: String(data.get('date') || TODAY),
    service: String(data.get('service') || 'Culto de Celebração'),
    neighborhood: '',
    invitedBy: String(data.get('invitedBy') || '').trim(),
    status: 'Novo',
    responsible: currentUser?.name || 'Recepção',
    notes: String(data.get('notes') || '').trim(),
    consent: true,
    churchId: church.id
  };
  state.visitors = Array.isArray(state.visitors) ? state.visitors : [];
  state.visitors.unshift(visitor);
  state.metrics = { visits: 0, returns: 0, reach: 0, announcements: 0, ...(state.metrics || {}) };
  state.metrics.visits += 1;
  state.activity = Array.isArray(state.activity) ? state.activity : [];
  state.activity.unshift({ type: 'visitor', name: visitor.familyName || visitor.name, text: visitor.familyMembers.length > 1 ? `foi cadastrada com ${visitor.familyMembers.length} pessoas do grupo.` : 'foi cadastrada como nova visitante.', time: 'Agora', initials: initials(visitor.familyName || visitor.name), tone: 'copper' });
  saveReceptionState('Novo visitante cadastrado pela recepção');
  document.querySelector('#successText').textContent = `${values.message}. O pastor já poderá visualizar este cadastro no Acolhimento.`;
  document.querySelector('#successMessage').classList.remove('hidden');
  form.reset();
  document.querySelector('#visitorDate').value = TODAY;
  document.querySelector('#familyList').innerHTML = '';
  document.querySelector('#familyFields').classList.add('hidden');
  updatePreview();
  showToast('Visitante salvo e backup automático realizado.');
}

function init() {
  renderChurchIdentity();
  document.querySelector('#loginForm').addEventListener('submit', handleLogin);
  document.querySelector('#visitorForm').addEventListener('submit', handleVisitorSubmit);
  document.querySelector('#visitorForm').addEventListener('input', () => {
    document.querySelector('#successMessage').classList.add('hidden');
    updatePreview();
  });
  document.querySelector('#visitorArrival').addEventListener('change', () => showFamilyFields());
  document.querySelector('#registerGroup').addEventListener('change', () => showFamilyFields());
  document.querySelector('#addMember').addEventListener('click', addFamilyMember);
  document.querySelector('#familyList').addEventListener('click', event => {
    if (!event.target.matches('.remove-member')) return;
    event.target.closest('.family-row').remove();
    updatePreview();
  });
  document.querySelector('#clearForm').addEventListener('click', () => {
    document.querySelector('#visitorForm').reset();
    document.querySelector('#visitorDate').value = TODAY;
    document.querySelector('#familyList').innerHTML = '';
    document.querySelector('#familyFields').classList.add('hidden');
    document.querySelector('#successMessage').classList.add('hidden');
    updatePreview();
  });
  document.querySelector('#logoutButton').addEventListener('click', showLoggedOutView);
  document.querySelector('#loginEmail').value = 'mariana@bethesda.com.br';
  document.querySelector('#visitorDate').value = TODAY;
  const sessionUserId = sessionStorage.getItem(SESSION_KEY);
  const sessionUser = (state.receptionUsers || []).find(user => user.id === sessionUserId && user.status !== 'Bloqueado');
  if (sessionUser) showLoggedInView(sessionUser);
  else showLoggedOutView();
  updatePreview();
}

document.addEventListener('DOMContentLoaded', init);

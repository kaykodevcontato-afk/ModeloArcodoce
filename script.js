/* =========================================================
   ARCO DOCES — interações simples (sem servidor).
   Pedidos são enviados pelo WhatsApp; o site NÃO processa pagamentos.
   ========================================================= */
'use strict';

const WHATSAPP = '5587991286601';
const STORAGE_KEY = 'arco-doces-pedido-v1';

const PRODUCTS = [
  { id: 'coco-ralado', name: 'Coco Ralado', img: 'assets/coco-ralado.webp' },
  { id: 'coco-caramelizado', name: 'Coco Caramelizado', img: 'assets/coco-caramelizado.webp' },
  { id: 'coco-amendoim-caramelizado', name: 'Coco Ralado com Amendoim e Caramelizado', img: 'assets/coco-amendoim-caramelizado.webp' },
  { id: 'coco-amendoim', name: 'Coco Ralado com Amendoim', img: 'assets/coco-amendoim.webp' },
  { id: 'coco-amendoim-cortado', name: 'Coco com Amendoim Cortado', img: 'assets/coco-amendoim-cortado.webp' },
  { id: 'coco-uva-passas', name: 'Coco com Uva Passas', img: 'assets/coco-uva-passas.webp' },
  { id: 'coco-frutas-cristalizadas', name: 'Coco com Frutas Cristalizadas', img: 'assets/coco-frutas-cristalizadas.webp' },
  { id: 'coco-doce-de-leite', name: 'Coco com Doce de Leite', img: 'assets/coco-doce-de-leite.webp' }
];

const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const cartDialog = document.getElementById('cart-dialog');
const cartItems = document.getElementById('cart-items');
const openCart = document.getElementById('open-cart');
const cartCount = document.getElementById('cart-count');
const sendCart = document.getElementById('send-cart');
const noteField = document.getElementById('cart-note');
const toast = document.getElementById('toast');
let toastTimer;

// Carrinho local: nenhum dado pessoal é enviado a um servidor.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    const clean = {};
    for (const product of PRODUCTS) {
      const n = Number(saved[product.id]);
      if (Number.isInteger(n) && n > 0) clean[product.id] = Math.min(99, n);
    }
    return clean;
  } catch {
    return {};
  }
}
let cart = loadCart();

function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* armazenamento desativado */ }
}
function totalUnits() { return Object.values(cart).reduce((a,b) => a+b, 0); }
function setQuantity(id, amount) {
  if (!PRODUCTS.some(item => item.id === id)) return;
  const n = Math.max(0, Math.min(99, Number(amount) || 0));
  if (n === 0) delete cart[id]; else cart[id] = n;
  saveCart();
  renderCart();
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function renderCart() {
  const count = totalUnits();
  cartCount.textContent = String(count);
  openCart.setAttribute('aria-label', `Abrir pedido, ${count} ${count === 1 ? 'item' : 'itens'}`);
  sendCart.disabled = count === 0;
  cartItems.replaceChildren();
  if (!count) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Seu pedido está vazio. Adicione seus sabores favoritos!';
    cartItems.appendChild(empty);
    return;
  }
  for (const product of PRODUCTS) {
    const qty = cart[product.id] || 0;
    if (!qty) continue;
    const row = document.createElement('div');
    row.className = 'cart-item';
    const photo = document.createElement('img');
    photo.src = product.img;
    photo.alt = '';
    photo.width = 74;
    photo.height = 72;
    const body = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = product.name;
    const controls = document.createElement('div');
    controls.className = 'cart-controls';
    const minus = document.createElement('button');
    minus.type = 'button';
    minus.className = 'qty-btn';
    minus.textContent = '−';
    minus.dataset.action = 'minus';
    minus.dataset.id = product.id;
    minus.setAttribute('aria-label', `Diminuir quantidade de ${product.name}`);
    const amount = document.createElement('span');
    amount.className = 'cart-qty';
    amount.textContent = String(qty);
    amount.setAttribute('aria-label', `${qty} unidade(s)`);
    const plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'qty-btn';
    plus.textContent = '+';
    plus.dataset.action = 'plus';
    plus.dataset.id = product.id;
    plus.setAttribute('aria-label', `Aumentar quantidade de ${product.name}`);
    plus.disabled = qty >= 99;
    controls.append(minus, amount, plus);
    body.append(title, controls);
    row.append(photo, body);
    cartItems.appendChild(row);
  }
}

// Filtrar sabores sem perder os itens do pedido.
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = selected !== 'todos' && card.dataset.category !== selected;
    });
  });
});

// Pedido pela galeria.
document.querySelectorAll('[data-add]').forEach(button => {
  button.addEventListener('click', () => {
    const product = PRODUCTS.find(item => item.id === button.dataset.add);
    if (!product) return;
    setQuantity(product.id, (cart[product.id] || 0) + 1);
    showToast(`${product.name} adicionado ao pedido!`);
  });
});

// Janela lateral do carrinho.
openCart.addEventListener('click', () => {
  if (typeof cartDialog.showModal === 'function') cartDialog.showModal();
  else cartDialog.setAttribute('open', '');
});
document.getElementById('close-cart').addEventListener('click', () => cartDialog.close());
cartDialog.addEventListener('click', event => {
  if (event.target === cartDialog) cartDialog.close();
});
cartItems.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = button.dataset.id;
  const delta = button.dataset.action === 'plus' ? 1 : -1;
  setQuantity(id, (cart[id] || 0) + delta);
});
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = {};
  saveCart();
  renderCart();
  showToast('Seu pedido foi limpo.');
});

// Apenas cria o texto do pedido e abre o contato oficial.
sendCart.addEventListener('click', () => {
  if (!totalUnits()) return;
  const lines = PRODUCTS.filter(p => cart[p.id]).map(p => `• ${cart[p.id]}x ${p.name}`);
  const note = noteField.value.trim();
  const message = [
    'Olá, Arco Doces! Gostaria de fazer este pedido:',
    '',
    ...lines,
    '',
    ...(note ? [`Observações: ${note}`, ''] : []),
    'Podem me informar valores, disponibilidade e condições de entrega?'
  ].join('\n');
  const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(link, '_blank', 'noopener,noreferrer');
});

// Menu para telas pequenas.
navToggle.addEventListener('click', () => {
  const isOpen = !siteNav.classList.contains('open');
  siteNav.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
}));

renderCart();


// Evita que o botão flutuante cubra o rodapé em telas menores.
const footer = document.querySelector('.footer');
if (footer && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.some(entry => entry.isIntersecting);
    openCart.classList.toggle('near-footer', visible);
  }, { threshold: 0.08 });
  observer.observe(footer);
}

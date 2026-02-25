/* ============================================
   FITLAB — JavaScript
   Shopping basket + page logic
   ============================================ */

// ── Products catalogue ──────────────────────
const PRODUCTS = [

  // ── PEDs ──
  { id: 1,  cat: 'PEDs', name: 'Testosterone Enanthate 250mg',  emoji: '💪', grad: 'g1', price: 29.99, desc: 'Pharmaceutical grade testosterone enanthate, 10ml vial.' },
  { id: 2,  cat: 'PEDs', name: 'Trenbolone Acetate 100mg',      emoji: '💪', grad: 'g2', price: 39.99, desc: 'High-purity trenbolone acetate, 10ml vial.' },
  { id: 3,  cat: 'PEDs', name: 'Anavar 10mg (60 tabs)',         emoji: '💪', grad: 'g3', price: 34.99, desc: 'Oxandrolone tablets, 60 count.' },
  { id: 4,  cat: 'PEDs', name: 'Dianabol 10mg (100 tabs)',      emoji: '💪', grad: 'g4', price: 24.99, desc: 'Methandrostenolone tablets, 100 count.' },
  { id: 5,  cat: 'PEDs', name: 'Winstrol 10mg (100 tabs)',      emoji: '💪', grad: 'g5', price: 29.99, desc: 'Stanozolol tablets, 100 count.' },

  // ── GLP1 ──
  { id: 6,  cat: 'GLP1', name: 'Semaglutide 2.4mg Pen',        emoji: '💉', grad: 'g6', price: 89.99, desc: 'Pre-filled injection pen, 4-week supply.' },
  { id: 7,  cat: 'GLP1', name: 'Tirzepatide 5mg Pen',           emoji: '💉', grad: 'g7', price: 99.99, desc: 'Pre-filled injection pen, 4-week supply.' },
  { id: 8,  cat: 'GLP1', name: 'Liraglutide 6mg Pen',           emoji: '💉', grad: 'g8', price: 79.99, desc: 'Pre-filled injection pen, 4-week supply.' },

  // ── MEDS ──
  { id: 9,  cat: 'MEDS', name: 'Modafinil 200mg (30 tabs)',     emoji: '💊', grad: 'g1', price: 24.99, desc: 'Cognitive enhancement, 30 count.' },
  { id: 10, cat: 'MEDS', name: 'Melanotan II 10mg',             emoji: '💊', grad: 'g2', price: 19.99, desc: 'Lyophilised powder, single vial.' },
  { id: 11, cat: 'MEDS', name: 'BPC-157 5mg',                   emoji: '💊', grad: 'g3', price: 29.99, desc: 'Peptide for recovery, lyophilised vial.' },
  { id: 12, cat: 'MEDS', name: 'TB-500 5mg',                    emoji: '💊', grad: 'g4', price: 34.99, desc: 'Thymosin beta-4 peptide, lyophilised vial.' },

  // ── VIAGRA ──
  { id: 13, cat: 'VIAGRA', name: 'Sildenafil 100mg (8 tabs)',   emoji: '🔵', grad: 'g5', price: 14.99, desc: 'Generic Viagra, 8 count.' },
  { id: 14, cat: 'VIAGRA', name: 'Tadalafil 20mg (8 tabs)',     emoji: '🔵', grad: 'g6', price: 16.99, desc: 'Generic Cialis, 8 count.' },
  { id: 15, cat: 'VIAGRA', name: 'Vardenafil 20mg (8 tabs)',    emoji: '🔵', grad: 'g7', price: 18.99, desc: 'Generic Levitra, 8 count.' },

  // ── ANCILLARIES ──
  { id: 16, cat: 'ANCILLARIES', name: 'Arimidex 1mg (28 tabs)',        emoji: '🛡️', grad: 'g8', price: 19.99, desc: 'Anastrozole, estrogen control.' },
  { id: 17, cat: 'ANCILLARIES', name: 'Nolvadex 20mg (30 tabs)',       emoji: '🛡️', grad: 'g1', price: 14.99, desc: 'Tamoxifen, PCT essential.' },
  { id: 18, cat: 'ANCILLARIES', name: 'Clomid 50mg (30 tabs)',         emoji: '🛡️', grad: 'g2', price: 14.99, desc: 'Clomiphene citrate, PCT essential.' },
  { id: 19, cat: 'ANCILLARIES', name: 'HCG 5000iu',                    emoji: '🛡️', grad: 'g3', price: 24.99, desc: 'Human chorionic gonadotropin.' },
  { id: 20, cat: 'ANCILLARIES', name: 'Liver Support Complex (60 caps)', emoji: '🛡️', grad: 'g4', price: 12.99, desc: 'TUDCA + NAC liver protection.' },

];

// ── Product images ──────────────────────────
// Fitness-themed Unsplash images
const PRODUCT_IMGS = (function () {
  var F1 = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop&q=80'; // gym weights
  var F2 = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop&q=80'; // gym workout
  var F3 = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop&q=80'; // fitness person
  var F4 = 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop&q=80'; // dumbbells
  var F5 = 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=600&fit=crop&q=80'; // athletic
  var F6 = 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=600&fit=crop&q=80'; // supplements
  var F7 = 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=600&h=600&fit=crop&q=80'; // pills/capsules
  return {
    1:  { u: F1, p: 'center'  },
    2:  { u: F2, p: '30% 50%' },
    3:  { u: F3, p: '50% 30%' },
    4:  { u: F4, p: '70% 50%' },
    5:  { u: F5, p: 'center'  },
    6:  { u: F6, p: '30% 30%' },
    7:  { u: F7, p: '50% 50%' },
    8:  { u: F1, p: '70% 30%' },
    9:  { u: F2, p: '50% 70%' },
    10: { u: F3, p: '30% 70%' },
    11: { u: F4, p: '70% 70%' },
    12: { u: F5, p: '30% 50%' },
    13: { u: F6, p: '70% 50%' },
    14: { u: F7, p: '50% 30%' },
    15: { u: F1, p: '30% 30%' },
    16: { u: F2, p: '70% 30%' },
    17: { u: F3, p: '50% 70%' },
    18: { u: F4, p: '30% 70%' },
    19: { u: F5, p: '70% 70%' },
    20: { u: F6, p: 'center'  },
  };
}());

// ── Category display config ───────────────────
const CAT_ORDER = [
  'PEDs',
  'GLP1',
  'MEDS',
  'VIAGRA',
  'ANCILLARIES',
];

const CAT_ICONS = {
  'PEDs':         '💪',
  'GLP1':         '💉',
  'MEDS':         '💊',
  'VIAGRA':       '🔵',
  'ANCILLARIES':  '🛡️',
};

// ── Apply dashboard product overrides, deletions, renames & added products ──
(function () {
  try {
    const ov       = JSON.parse(localStorage.getItem('fitlab_product_overrides')) || {};
    const deleted  = JSON.parse(localStorage.getItem('fitlab_deleted_products'))  || [];
    const catNames = JSON.parse(localStorage.getItem('fitlab_cat_names'))         || {};
    const added    = JSON.parse(localStorage.getItem('fitlab_added_products'))    || [];

    // 1. Remove deleted products (reverse splice keeps indices stable)
    for (var i = PRODUCTS.length - 1; i >= 0; i--) {
      if (deleted.includes(PRODUCTS[i].id)) PRODUCTS.splice(i, 1);
    }

    // 2. Apply name / price / category overrides
    PRODUCTS.forEach(function (p) {
      if (ov[p.id]) {
        if (ov[p.id].name  !== undefined) p.name  = ov[p.id].name;
        if (ov[p.id].price !== undefined) p.price = ov[p.id].price;
        if (ov[p.id].cat   !== undefined) p.cat   = ov[p.id].cat;
      }
    });

    // 3. Rename categories in CAT_ORDER, PRODUCTS and CAT_ICONS
    if (Object.keys(catNames).length) {
      for (var j = 0; j < CAT_ORDER.length; j++) {
        if (catNames[CAT_ORDER[j]]) CAT_ORDER[j] = catNames[CAT_ORDER[j]];
      }
      PRODUCTS.forEach(function (p) {
        if (catNames[p.cat]) p.cat = catNames[p.cat];
      });
      Object.keys(catNames).forEach(function (orig) {
        var display = catNames[orig];
        if (CAT_ICONS[orig] !== undefined && CAT_ICONS[display] === undefined) {
          CAT_ICONS[display] = CAT_ICONS[orig];
        }
      });
    }

    // 4. Push user-added products into PRODUCTS (skip any that were later deleted)
    added.forEach(function (ap) {
      if (!deleted.includes(ap.id)) {
        PRODUCTS.push(ap);
        if (!CAT_ORDER.includes(ap.cat)) CAT_ORDER.push(ap.cat);
      }
    });
  } catch (e) {
    console.error('[FitLab] Failed to apply dashboard overrides — products shown in default state:', e);
  }
}());

// ── Basket (localStorage) ───────────────────
const KEY = 'fitlab_basket';

function getBasket()  { return JSON.parse(localStorage.getItem(KEY)) || []; }
function saveBasket(b){ localStorage.setItem(KEY, JSON.stringify(b)); refreshBadge(); }
function clearBasket(){ localStorage.removeItem(KEY); refreshBadge(); }
function basketCount(){ return getBasket().reduce((n, i) => n + i.qty, 0); }
function basketTotal(){ return getBasket().reduce((n, i) => n + i.price * i.qty, 0); }
function fmt(n)       { return '£' + n.toFixed(2); }

function addToBasket(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const b = getBasket();
  const existing = b.find(x => x.id === id);
  if (existing) { existing.qty += 1; } else { b.push({ ...p, qty: 1 }); }
  saveBasket(b);
}

function removeFromBasket(id) { saveBasket(getBasket().filter(x => x.id !== id)); }

function changeQty(id, delta) {
  const b = getBasket();
  const item = b.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { saveBasket(b.filter(x => x.id !== id)); } else { saveBasket(b); }
}

// ── Badge ────────────────────────────────────
function refreshBadge() {
  const badge = document.getElementById('basket-badge');
  if (!badge) return;
  const n = basketCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
  if (n > 0) { badge.classList.add('pop'); setTimeout(() => badge.classList.remove('pop'), 300); }
}

// ── Toast ────────────────────────────────────
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('show')); });
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 2600);
}

// ── Mobile nav ───────────────────────────────
function initNav() {
  const btn   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) links.classList.remove('open');
  });
}

// ── Shared: product card HTML ─────────────────
function productCardHTML(p, btnLabel = '+ Add to Basket') {
  const stock   = JSON.parse(localStorage.getItem('fitlab_stock')) || {};
  const qty     = stock[p.id] !== undefined ? stock[p.id] : 50;
  const oos     = qty <= 0;
  const img     = PRODUCT_IMGS[p.id];
  const imgHTML = img
    ? `<img src="${img.u}" alt="${p.name}" class="prod-beach-img" loading="lazy"
           style="object-position:${img.p}"
           onerror="this.style.display='none'" />`
    : `<span>${p.emoji}</span>`;
  return `
    <div class="product-card${oos ? ' out-of-stock' : ''}">
      <div class="product-img ${p.grad}">${imgHTML}</div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">${fmt(p.price)}</div>
          ${oos
            ? '<span class="oos-badge">Out of Stock</span>'
            : `<button class="add-btn" data-id="${p.id}">${btnLabel}</button>`}
        </div>
      </div>
    </div>`;
}

function attachAddHandlers(container, btnLabel) {
  container.addEventListener('click', e => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    const id    = +btn.dataset.id;
    const stock = JSON.parse(localStorage.getItem('fitlab_stock')) || {};
    const qty   = stock[id] !== undefined ? stock[id] : 50;
    if (qty <= 0) { showToast('Sorry, this product is out of stock'); return; }
    addToBasket(id);
    const p = PRODUCTS.find(x => x.id === id);
    showToast(`✓ ${p.name} added to basket`);
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.classList.add('confirm');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('confirm'); }, 1400);
  });
}

// ══════════════════════════════════════════════
//  PAGE: PRODUCTS (grouped by category)
// ══════════════════════════════════════════════
function initProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  // Group products by category
  const grouped = {};
  PRODUCTS.forEach(p => {
    if (!grouped[p.cat]) grouped[p.cat] = [];
    grouped[p.cat].push(p);
  });

  container.innerHTML = CAT_ORDER
    .filter(cat => grouped[cat])
    .map(cat => `
      <div class="cat-section">
        <h2 class="cat-title"><span class="cat-icon">${CAT_ICONS[cat] || ''}</span>${cat}</h2>
        <div class="products-grid">
          ${grouped[cat].map(p => productCardHTML(p)).join('')}
        </div>
      </div>
    `).join('');

  attachAddHandlers(container, '+ Add to Basket');
}

// ── Featured products on home page ───────────
function initFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = [PRODUCTS[0], PRODUCTS[5], PRODUCTS[12]]; // Test Enanthate, Semaglutide, Sildenafil
  grid.innerHTML = featured.map(p => productCardHTML(p, '+ Add')).join('');
  attachAddHandlers(grid, '+ Add');
}

// ══════════════════════════════════════════════
//  PAGE: BASKET
// ══════════════════════════════════════════════
function renderBasket() {
  const list    = document.getElementById('basket-list');
  const summary = document.getElementById('basket-summary');
  const empty   = document.getElementById('basket-empty');
  if (!list) return;

  const basket = getBasket();

  if (basket.length === 0) {
    list.innerHTML = '';
    if (summary) summary.style.display = 'none';
    if (empty)   empty.style.display   = 'block';
    return;
  }

  if (summary) summary.style.display = '';
  if (empty)   empty.style.display   = 'none';

  list.innerHTML = basket.map(item => `
    <div class="basket-item" data-id="${item.id}">
      <div class="basket-item-img ${item.grad}">${item.emoji}</div>
      <div class="basket-item-info">
        <div class="basket-item-name">${item.name}</div>
        <div class="basket-item-price">${fmt(item.price)} each</div>
      </div>
      <div class="basket-item-controls">
        <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        <button class="remove-btn" data-action="remove" data-id="${item.id}" title="Remove">✕</button>
      </div>
    </div>
  `).join('');

  const subtotal = basketTotal();
  const delivery = 5.00;
  const total    = subtotal + delivery;

  const subEl = document.getElementById('sum-subtotal');
  const delEl = document.getElementById('sum-delivery');
  const totEl = document.getElementById('sum-total');
  if (subEl) subEl.textContent = fmt(subtotal);
  if (delEl) delEl.textContent = 'from ' + fmt(delivery);
  if (totEl) totEl.textContent = fmt(total);
}

function initBasket() {
  const list = document.getElementById('basket-list');
  if (!list) return;
  renderBasket();
  list.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id  = +btn.dataset.id;
    const act = btn.dataset.action;
    if (act === 'inc')    changeQty(id, +1);
    if (act === 'dec')    changeQty(id, -1);
    if (act === 'remove') removeFromBasket(id);
    renderBasket();
  });
}

// ══════════════════════════════════════════════
//  PAGE: CHECKOUT  (Stripe Payment Element via Cloud Function)
// ══════════════════════════════════════════════
var STRIPE_FUNCTION_URL = 'YOUR_STRIPE_FUNCTION_URL';
var ROYAL_MAIL_FUNCTION_URL = 'YOUR_ROYAL_MAIL_FUNCTION_URL';
var STRIPE_PK = 'YOUR_STRIPE_PUBLISHABLE_KEY';

function getSelectedDelivery() {
  var sel = document.querySelector('input[name="delivery-type"]:checked');
  if (sel && sel.value === 'international') return { type: 'international', label: 'International', charge: 15.00 };
  return { type: 'uk', label: 'UK', charge: 5.00 };
}

function updateCheckoutTotals() {
  var coSub  = document.getElementById('co-subtotal');
  var coDel  = document.getElementById('co-delivery');
  var coTot  = document.getElementById('co-total');
  var coLbl  = document.getElementById('co-delivery-label');
  var subtotal = basketTotal();
  var del      = getSelectedDelivery();
  var total    = subtotal + del.charge;
  if (coSub) coSub.textContent = fmt(subtotal);
  if (coDel) coDel.textContent = fmt(del.charge);
  if (coTot) coTot.textContent = fmt(total);
  if (coLbl) coLbl.textContent = '(' + del.label + ')';

  // Update delivery option label highlight
  document.querySelectorAll('.delivery-option').forEach(function (lbl) {
    var radio = lbl.querySelector('input[type="radio"]');
    if (radio && radio.checked) lbl.classList.add('selected');
    else lbl.classList.remove('selected');
  });
}

// ── Shared: save order + show confirmation ──────
function completeOrder(pending, paymentIntent) {
  var wrapper = document.getElementById('checkout-wrapper');
  var success = document.getElementById('order-success');

  var newOrder = {
    id:           pending.orderId,
    date:         new Date().toISOString(),
    customer:     pending.customer,
    items:        pending.basket,
    subtotal:     pending.subtotal,
    delivery:     pending.delivery,
    deliveryType: pending.deliveryType,
    total:        pending.total,
    paymentMethod: 'card',
    stripePaymentIntentId: paymentIntent.id,
    stripeStatus: paymentIntent.status,
    cardBrand: '',
    cardLast4: ''
  };

  if (paymentIntent.payment_method && typeof paymentIntent.payment_method === 'object') {
    if (paymentIntent.payment_method.card) {
      newOrder.cardBrand = paymentIntent.payment_method.card.brand || '';
      newOrder.cardLast4 = paymentIntent.payment_method.card.last4 || '';
    }
  }

  var orders = JSON.parse(localStorage.getItem('fitlab_orders')) || [];
  orders.push(newOrder);
  localStorage.setItem('fitlab_orders', JSON.stringify(orders));
  if (typeof saveOrderToCloud === 'function') saveOrderToCloud(newOrder);

  // Reduce stock
  var stock = JSON.parse(localStorage.getItem('fitlab_stock')) || {};
  pending.basket.forEach(function (item) {
    var cur = stock[item.id] !== undefined ? stock[item.id] : 50;
    stock[item.id] = Math.max(0, cur - item.qty);
  });
  localStorage.setItem('fitlab_stock', JSON.stringify(stock));
  if (typeof saveStockToCloud === 'function') saveStockToCloud(stock);

  // Populate confirmation page
  var cOrderId  = document.getElementById('confirm-order-id');
  var cItems    = document.getElementById('confirm-items');
  var cSubtotal = document.getElementById('confirm-subtotal');
  var cDelivery = document.getElementById('confirm-delivery');
  var cDelType  = document.getElementById('confirm-delivery-type');
  var cTotal    = document.getElementById('confirm-total');
  var cEstimate = document.getElementById('confirm-estimate-text');

  if (cOrderId) cOrderId.textContent = pending.orderId;
  if (cItems) {
    cItems.innerHTML = pending.basket.map(function (i) {
      return '<div class="confirm-item">' +
        '<span class="confirm-item-name">' + i.name + ' <span class="confirm-item-qty">&times; ' + i.qty + '</span></span>' +
        '<span class="confirm-item-price">' + fmt(i.price * i.qty) + '</span>' +
        '</div>';
    }).join('');
  }
  if (cSubtotal) cSubtotal.textContent = fmt(pending.subtotal);
  if (cDelivery) cDelivery.textContent = fmt(pending.delivery);
  if (cDelType)  cDelType.textContent  = pending.deliveryType === 'international' ? '(International)' : '(UK)';
  if (cTotal)    cTotal.textContent    = fmt(pending.total);
  if (cEstimate) {
    cEstimate.textContent = pending.deliveryType === 'international'
      ? 'Estimated delivery: 7\u201314 working days'
      : 'Estimated delivery: 3\u20135 working days';
  }

  // Show tracking section with order ID
  var cTrackSection = document.getElementById('confirm-tracking-section');
  if (cTrackSection) {
    cTrackSection.style.display = 'block';
    var trackOrderSpan = document.getElementById('track-order-id');
    if (trackOrderSpan) trackOrderSpan.textContent = pending.orderId;
  }

  // Auto-submit order to Royal Mail Click & Drop (fire-and-forget)
  try {
    fetch(ROYAL_MAIL_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: newOrder })
    }).catch(function (e) { console.warn('[Royal Mail] Auto-submit failed:', e.message); });
  } catch (e) { console.warn('[Royal Mail] Auto-submit error:', e.message); }

  localStorage.removeItem('fitlab_pending_order');
  clearBasket();
  if (wrapper) wrapper.style.display = 'none';
  if (success) success.classList.add('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Handle redirect return (Klarna, Clearpay) ──────
function handlePaymentRedirectReturn() {
  var params = new URLSearchParams(window.location.search);
  var clientSecret    = params.get('payment_intent_client_secret');
  var redirectStatus  = params.get('redirect_status');
  if (!clientSecret) return false;

  // Clean the URL immediately so refresh doesn't re-trigger
  window.history.replaceState({}, '', window.location.pathname);

  var wrapper = document.getElementById('checkout-wrapper');
  var success = document.getElementById('order-success');

  if (redirectStatus !== 'succeeded') {
    showToast('Payment was not completed. Please try again.');
    return true;
  }

  // Retrieve pending order saved before redirect
  var pending = JSON.parse(localStorage.getItem('fitlab_pending_order'));
  if (!pending) {
    showToast('Order data not found. Please contact us if you were charged.');
    return true;
  }

  if (typeof Stripe === 'undefined') return true;

  var stripe = Stripe(STRIPE_PK);
  stripe.retrievePaymentIntent(clientSecret).then(function (result) {
    if (result.error) {
      showToast('Could not verify payment. Please contact us.');
      return;
    }
    var pi = result.paymentIntent;
    if (pi.status === 'succeeded') {
      completeOrder(pending, pi);
    } else if (pi.status === 'processing') {
      completeOrder(pending, pi);
    } else {
      showToast('Payment was not completed. Please try again.');
    }
  });

  if (wrapper) wrapper.style.display = 'none';
  return true;
}

function initCheckout() {
  const wrapper = document.getElementById('checkout-wrapper');
  if (!wrapper) return;

  // ── Check for redirect return (Klarna, Clearpay, etc.) ──
  if (handlePaymentRedirectReturn()) return;

  const coList = document.getElementById('co-list');
  const basket = getBasket();

  if (coList) {
    coList.innerHTML = basket.length === 0
      ? '<p style="color:var(--muted);font-size:.875rem">Your basket is empty.</p>'
      : basket.map(i => `
          <div class="co-item">
            <div>
              <div class="co-item-name">${i.name}</div>
              <div class="co-item-qty">× ${i.qty}</div>
            </div>
            <div class="co-item-price">${fmt(i.price * i.qty)}</div>
          </div>`).join('');
  }

  // Listen for delivery option changes
  document.querySelectorAll('input[name="delivery-type"]').forEach(function (radio) {
    radio.addEventListener('change', updateCheckoutTotals);
  });

  // Initial totals render
  updateCheckoutTotals();

  // ── Stripe Payment Element Setup ──────────────
  var stripe, elements;

  if (typeof Stripe !== 'undefined') {
    stripe = Stripe(STRIPE_PK);

    var del      = getSelectedDelivery();
    var subtotal = basketTotal();
    var total    = subtotal + del.charge;

    elements = stripe.elements({
      mode: 'payment',
      amount: Math.round(total * 100),
      currency: 'gbp',
      appearance: {
        theme: 'night',
        variables: {
          colorPrimary: '#00b4d8',
          colorText: '#e0e0e0',
          colorDanger: '#ff1744',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          borderRadius: '8px',
          colorBackground: '#141422'
        }
      }
    });

    var paymentElement = elements.create('payment', {
      layout: 'tabs'
    });
    paymentElement.mount('#stripe-payment-element');

    // Update Stripe Elements amount when delivery option changes
    document.querySelectorAll('input[name="delivery-type"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        var d = getSelectedDelivery();
        var s = basketTotal();
        elements.update({ amount: Math.round((s + d.charge) * 100) });
      });
    });
  }

  const placeBtn    = document.getElementById('place-order-btn');
  const paymentErrs = document.getElementById('payment-errors');

  // ── Rate limiting for order submission ──────────
  var orderAttempts = [];
  var ORDER_MAX = 10;
  var ORDER_WINDOW = 60000;

  if (placeBtn) {
    placeBtn.addEventListener('click', async () => {
      var now = Date.now();
      orderAttempts = orderAttempts.filter(t => now - t < ORDER_WINDOW);
      if (orderAttempts.length >= ORDER_MAX) {
        showToast('Too many order attempts. Please wait a moment.');
        return;
      }
      orderAttempts.push(now);

      // Validate customer details
      const nameEl     = document.getElementById('cust-name');
      const emailEl    = document.getElementById('cust-email');
      const phoneEl    = document.getElementById('cust-phone');
      const addressEl  = document.getElementById('cust-address');
      const cityEl     = document.getElementById('cust-city');
      const postcodeEl = document.getElementById('cust-postcode');
      const countryEl  = document.getElementById('cust-country');
      if (nameEl     && !nameEl.value.trim())     { showToast('Please enter your full name');      nameEl.focus();     return; }
      if (emailEl    && !emailEl.value.trim())    { showToast('Please enter your email address');  emailEl.focus();    return; }
      if (phoneEl    && !phoneEl.value.trim())    { showToast('Please enter your phone number');   phoneEl.focus();    return; }
      if (addressEl  && !addressEl.value.trim())  { showToast('Please enter your street address'); addressEl.focus();  return; }
      if (cityEl     && !cityEl.value.trim())     { showToast('Please enter your city');           cityEl.focus();     return; }
      if (postcodeEl && !postcodeEl.value.trim()) { showToast('Please enter your postcode');       postcodeEl.focus(); return; }
      if (countryEl  && !countryEl.value.trim())  { showToast('Please enter your country');        countryEl.focus();  return; }
      if (basket.length === 0) { showToast('Your basket is empty'); return; }

      // Validate payment element
      var submitResult = await elements.submit();
      if (submitResult.error) {
        if (paymentErrs) paymentErrs.textContent = submitResult.error.message;
        return;
      }
      if (paymentErrs) paymentErrs.textContent = '';

      placeBtn.disabled = true;
      placeBtn.textContent = 'Processing payment\u2026';

      try {
        const del       = getSelectedDelivery();
        const subtotal  = basketTotal();
        const delivery  = del.charge;
        const total     = subtotal + delivery;
        const orderId   = 'ORD-' + Date.now().toString(36).toUpperCase();
        const amountInPence = Math.round(total * 100);

        // Step 1: Create PaymentIntent via Cloud Function
        const piResponse = await fetch(STRIPE_FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountInPence,
            orderId: orderId,
            customerEmail: emailEl ? emailEl.value.trim() : '',
            customerName:  nameEl  ? nameEl.value.trim()  : ''
          })
        });

        const piData = await piResponse.json();
        if (!piResponse.ok || !piData.clientSecret) {
          throw new Error(piData.error || 'Could not initiate payment');
        }

        // Step 2: Save pending order (needed for redirect-based methods)
        var pendingOrder = {
          orderId:      orderId,
          basket:       basket.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
          subtotal:     subtotal,
          delivery:     delivery,
          deliveryType: del.type,
          total:        total,
          customer: {
            name:     nameEl     ? nameEl.value.trim()     : '',
            email:    emailEl    ? emailEl.value.trim()    : '',
            phone:    phoneEl    ? phoneEl.value.trim()    : '',
            address:  addressEl  ? addressEl.value.trim()  : '',
            city:     cityEl     ? cityEl.value.trim()     : '',
            postcode: postcodeEl ? postcodeEl.value.trim().toUpperCase() : '',
            country:  countryEl  ? countryEl.value.trim()  : ''
          }
        };
        localStorage.setItem('fitlab_pending_order', JSON.stringify(pendingOrder));

        // Step 3: Confirm payment
        var returnUrl = window.location.href.split('?')[0];
        const { paymentIntent, error } = await stripe.confirmPayment({
          elements: elements,
          clientSecret: piData.clientSecret,
          confirmParams: {
            return_url: returnUrl,
            payment_method_data: {
              billing_details: {
                name:  nameEl  ? nameEl.value.trim()  : '',
                email: emailEl ? emailEl.value.trim() : '',
                phone: phoneEl ? phoneEl.value.trim() : '',
                address: {
                  line1:       addressEl  ? addressEl.value.trim()  : '',
                  city:        cityEl     ? cityEl.value.trim()     : '',
                  postal_code: postcodeEl ? postcodeEl.value.trim().toUpperCase() : '',
                  country:     del.type === 'uk' ? 'GB' : (countryEl ? countryEl.value.trim() : '')
                }
              }
            }
          },
          redirect: 'if_required'
        });

        if (error) {
          localStorage.removeItem('fitlab_pending_order');
          if (paymentErrs) paymentErrs.textContent = error.message;
          showToast(error.message || 'Payment failed. Please try again.');
          placeBtn.disabled = false;
          placeBtn.textContent = 'Pay & Place Order \u2192';
          return;
        }

        // Non-redirect payment succeeded (card, Apple Pay, Google Pay, Link)
        if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
          completeOrder(pendingOrder, paymentIntent);
        } else {
          localStorage.removeItem('fitlab_pending_order');
          showToast('Payment was not completed. Please try again.');
          placeBtn.disabled = false;
          placeBtn.textContent = 'Pay & Place Order \u2192';
        }

      } catch (err) {
        console.error('[Checkout] Payment error:', err);
        localStorage.removeItem('fitlab_pending_order');
        showToast(err.message || 'Payment error. Please try again.');
        placeBtn.disabled = false;
        placeBtn.textContent = 'Pay & Place Order \u2192';
      }
    });
  }
}

// ── Order Tracking Lookup ────────────────────
function initTrackingLookup() {
  var trackBtn = document.getElementById('track-lookup-btn');
  var trackInput = document.getElementById('track-lookup-input');
  var trackResult = document.getElementById('track-lookup-result');
  if (!trackBtn || !trackInput) return;

  trackBtn.addEventListener('click', function () {
    var orderId = trackInput.value.trim().toUpperCase();
    if (!orderId) { trackResult.innerHTML = '<p style="color:var(--danger)">Please enter your order ID.</p>'; return; }

    trackBtn.disabled = true;
    trackBtn.textContent = 'Looking up…';
    trackResult.innerHTML = '';

    if (typeof getTrackingFromCloud === 'function') {
      getTrackingFromCloud(orderId).then(function (data) {
        if (data && data.trackingNumber) {
          trackResult.innerHTML =
            '<div class="track-result-card">' +
              '<div class="track-result-label">Tracking Number</div>' +
              '<div class="track-result-number">' + data.trackingNumber + '</div>' +
              '<a href="https://www.royalmail.com/track-your-item#/tracking-results/' + encodeURIComponent(data.trackingNumber) + '" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:0.75rem;display:inline-block">Track on Royal Mail →</a>' +
            '</div>';
        } else {
          trackResult.innerHTML =
            '<div class="track-result-card">' +
              '<p>No tracking information available yet for <strong>' + orderId + '</strong>.</p>' +
              '<p style="font-size:0.85rem;color:var(--muted);margin-top:0.5rem">Your tracking number will be available once your order has been dispatched.</p>' +
            '</div>';
        }
        trackBtn.disabled = false;
        trackBtn.textContent = 'Track Order';
      }).catch(function () {
        trackResult.innerHTML = '<p style="color:var(--danger)">Could not look up tracking. Please try again.</p>';
        trackBtn.disabled = false;
        trackBtn.textContent = 'Track Order';
      });
    } else {
      trackResult.innerHTML = '<p style="color:var(--muted)">Tracking service is not available right now. Please try again later.</p>';
      trackBtn.disabled = false;
      trackBtn.textContent = 'Track Order';
    }
  });

  trackInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') trackBtn.click();
  });
}

// ── Apply Firestore products to PRODUCTS array (exact names, no modification) ──
function applyFirestoreProducts(cloudProducts) {
  if (!cloudProducts || !Object.keys(cloudProducts).length) return;
  PRODUCTS.forEach(function (p) {
    var cp = cloudProducts[String(p.id)];
    if (cp) {
      if (cp.name  !== undefined) p.name  = cp.name;
      if (cp.price !== undefined) p.price = cp.price;
      if (cp.cat   !== undefined) p.cat   = cp.cat;
      if (cp.desc  !== undefined) p.desc  = cp.desc;
      if (cp.emoji !== undefined) p.emoji = cp.emoji;
    }
  });
}

// ── Boot ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  refreshBadge();
  initNav();

  var hasSyncFn = typeof syncProductsFromCloud === 'function';
  if (!hasSyncFn) {
    console.warn('[FitLab] syncProductsFromCloud not available — firebase-config.js may not be loaded. Check script order and CSP.');
  }

  // Fetch products from Firestore with 5-second timeout
  var ready = hasSyncFn
    ? Promise.race([
        syncProductsFromCloud(),
        new Promise(function (resolve) {
          setTimeout(function () {
            console.warn('[FitLab] Firestore fetch timed out after 5 seconds — showing fallback names');
            resolve({});
          }, 5000);
        })
      ])
    : Promise.resolve({});

  ready.then(function (cloudProducts) {
    var count = cloudProducts ? Object.keys(cloudProducts).length : 0;
    if (count === 0) {
      console.warn('[FitLab] No products loaded from Firestore — displaying hardcoded names');
    } else {
      console.log('[FitLab] Applying', count, 'product names from Firestore');
    }
    applyFirestoreProducts(cloudProducts);
    initFeatured();
    initProducts();
    initBasket();
    initCheckout();
    initTrackingLookup();
  });
});

/* ============================================
   THE FIT SHOP — Dashboard Core
   Shared constants and helpers used by all
   section files. Only edit this file to add
   a new shared utility — never put section
   logic here.
   ============================================ */

// ── Constants ────────────────────────────────
// Password is stored as a SHA-256 hash — never store plaintext passwords in code
const DASH_PASSWORD_HASH = '97e46a6a8232b1d6505fb43faca701839d6dece9b0f1ae38971c4841c50a0043';

// Utility: hash a string with SHA-256 and return hex
async function hashPassword(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
const SESSION_KEY           = 'fitshop_dash_session';
const ORDERS_KEY            = 'fitshop_orders';
const STOCK_KEY             = 'fitshop_stock';
const COSTS_KEY             = 'fitshop_costs';
const STATUS_KEY            = 'fitshop_order_statuses';
const PRODUCT_OVERRIDES_KEY = 'fitshop_product_overrides';
const CAT_NAMES_KEY         = 'fitshop_cat_names';
const ADDED_PRODS_KEY       = 'fitshop_added_products';
const DELETED_PRODS_KEY     = 'fitshop_deleted_products';
const TRACKING_KEY          = 'fitshop_order_tracking';
const ROYAL_MAIL_KEY        = 'fitshop_order_royal_mail';
const RM_FUNCTION_URL       = 'YOUR_ROYAL_MAIL_FUNCTION_URL';
const RM_LABEL_URL          = 'YOUR_ROYAL_MAIL_LABEL_URL';
const STATUS_OPTIONS = [
  { value: 'pending',    label: '🕐 Pending'    },
  { value: 'processing', label: '⚙️ Processing' },
  { value: 'dispatched', label: '🚚 Dispatched' },
  { value: 'delivered',  label: '✅ Delivered'  },
];

// ── Shared helpers ────────────────────────────
function fmt(n) { return '£' + Number(n || 0).toFixed(2); }

function getOrders()           { return JSON.parse(localStorage.getItem(ORDERS_KEY))            || []; }
function getStatuses()         { return JSON.parse(localStorage.getItem(STATUS_KEY))            || {}; }
function saveStatuses(s)       { localStorage.setItem(STATUS_KEY, JSON.stringify(s)); }
function getProductOverrides() { return JSON.parse(localStorage.getItem(PRODUCT_OVERRIDES_KEY)) || {}; }
function saveProductOverrides(o){
  localStorage.setItem(PRODUCT_OVERRIDES_KEY, JSON.stringify(o));
  // Also save each modified product to Firestore products collection
  if (typeof saveProductToCloud === 'function') {
    Object.keys(o).forEach(function (id) {
      var p = PRODUCTS.find(function (x) { return x.id === +id; });
      if (p) saveProductToCloud(p);
    });
  }
}
function getCatNames()         { return JSON.parse(localStorage.getItem(CAT_NAMES_KEY))         || {}; }
function saveCatNames(n)       { localStorage.setItem(CAT_NAMES_KEY, JSON.stringify(n)); }
function getAddedProducts()    { return JSON.parse(localStorage.getItem(ADDED_PRODS_KEY))       || []; }
function saveAddedProducts(a)  { localStorage.setItem(ADDED_PRODS_KEY, JSON.stringify(a)); }

function getStock() {
  const saved = JSON.parse(localStorage.getItem(STOCK_KEY)) || {};
  const out   = {};
  PRODUCTS.forEach(function (p) {
    out[p.id] = saved[p.id] !== undefined ? saved[p.id] : 50;
  });
  return out;
}

function getCosts() {
  const saved = JSON.parse(localStorage.getItem(COSTS_KEY)) || {};
  const out   = {};
  PRODUCTS.forEach(function (p) {
    out[p.id] = saved[p.id] !== undefined ? saved[p.id] : parseFloat((p.price * 0.5).toFixed(2));
  });
  return out;
}

function saveStock(s) { localStorage.setItem(STOCK_KEY, JSON.stringify(s)); }
function saveCosts(c) { localStorage.setItem(COSTS_KEY, JSON.stringify(c)); }

function getTracking()         { return JSON.parse(localStorage.getItem(TRACKING_KEY))   || {}; }
function saveTrackingLocal(t)  { localStorage.setItem(TRACKING_KEY, JSON.stringify(t)); }
function getRoyalMailStatuses(){ return JSON.parse(localStorage.getItem(ROYAL_MAIL_KEY)) || {}; }

function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === '1'; }

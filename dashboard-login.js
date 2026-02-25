/* ============================================
   FITLAB — Login & Init
   Handles password login, session management,
   tab switching, and booting all sections.
   ============================================ */

function showDashboard() {
  document.getElementById('dash-login').style.display = 'none';
  document.getElementById('dash-app').style.display   = 'block';
  initDashboard();
}

function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
}

// ── Login rate limiting ───────────────────────
var loginAttempts = [];
var LOGIN_MAX_ATTEMPTS = 5;
var LOGIN_WINDOW_MS = 60000; // 1 minute

// ── Login button ──────────────────────────────
document.getElementById('dash-login-btn').addEventListener('click', async function () {
  // Rate limit login attempts
  var now = Date.now();
  loginAttempts = loginAttempts.filter(function (t) { return now - t < LOGIN_WINDOW_MS; });
  if (loginAttempts.length >= LOGIN_MAX_ATTEMPTS) {
    document.getElementById('login-error').textContent = 'Too many login attempts. Please wait 1 minute.';
    return;
  }
  loginAttempts.push(now);

  const val = document.getElementById('dash-password').value;
  const hashed = await hashPassword(val);
  if (hashed === DASH_PASSWORD_HASH) {
    sessionStorage.setItem(SESSION_KEY, '1');
    showDashboard();
  } else {
    document.getElementById('login-error').textContent = 'Incorrect password. Please try again.';
    document.getElementById('dash-password').value = '';
    document.getElementById('dash-password').focus();
  }
});

document.getElementById('dash-password').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.getElementById('dash-login-btn').click();
});

document.getElementById('dash-logout').addEventListener('click', doLogout);

// ── Tab switching ─────────────────────────────
document.querySelectorAll('.dash-tab-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.dash-tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.dash-panel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// ── Init — loads every section with error isolation ──────
async function initDashboard() {
  // Sync cloud → localStorage before rendering any section
  if (typeof syncOrdersFromCloud === 'function') {
    try {
      await syncOrdersFromCloud();
      await syncStatusesFromCloud();
      await syncStockFromCloud();
      if (typeof syncCostsFromCloud === 'function') await syncCostsFromCloud();
      if (typeof syncTrackingFromCloud === 'function') await syncTrackingFromCloud();
      if (typeof syncRoyalMailFromCloud === 'function') await syncRoyalMailFromCloud();
    } catch (e) {
      console.error('[FitLab Dashboard] Cloud sync failed, using local data:', e);
    }
  }

  var sections = [
    { name: 'Stock',            fn: renderStock            },
    { name: 'Orders',           fn: renderOrders           },
    { name: 'Customers',        fn: renderCustomers        },
    { name: 'P&L',              fn: renderPL               },
    { name: 'Products',         fn: renderProducts         },
    { name: 'Popular Products', fn: renderPopular          },
    { name: 'Category Editor',  fn: renderCategoryEditor   },
    { name: 'Add Product Form', fn: initAddProductForm     },
    { name: 'Security Log',     fn: startSecurityPolling   },
  ];

  sections.forEach(function (section) {
    try {
      section.fn();
    } catch (e) {
      console.error('[FitLab Dashboard] ' + section.name + ' failed to load:', e);
    }
  });

  // Start real-time listeners — dashboard auto-updates when new orders arrive
  if (typeof listenOrdersRealtime === 'function') {
    listenOrdersRealtime(function () {
      try { renderOrders(); }   catch (e) { /* already logged */ }
      try { renderCustomers(); } catch (e) { /* already logged */ }
      try { renderPL(); }       catch (e) { /* already logged */ }
      try { renderPopular(); }  catch (e) { /* already logged */ }
    });
  }
  if (typeof listenStatusesRealtime === 'function') {
    listenStatusesRealtime(function () {
      try { renderOrders(); } catch (e) { /* already logged */ }
    });
  }
  if (typeof listenStockRealtime === 'function') {
    listenStockRealtime(function () {
      try { renderStock(); } catch (e) { /* already logged */ }
    });
  }
  if (typeof listenTrackingRealtime === 'function') {
    listenTrackingRealtime(function () {
      try { renderOrders(); } catch (e) { /* already logged */ }
    });
  }
}

// ── Auto-unlock if session already active ─────
if (isLoggedIn()) showDashboard();

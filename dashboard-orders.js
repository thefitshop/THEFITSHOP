/* ============================================
   FITLAB — Orders Section
   Edit ONLY this file for orders changes.
   ============================================ */

function renderOrders() {
  try {
    const orders   = getOrders().slice().reverse();
    const statuses = getStatuses();
    const tracking = getTracking();
    const rmStatuses = getRoyalMailStatuses();
    const tbody    = document.getElementById('orders-tbody');
    const empty    = document.getElementById('orders-empty');
    const wrap     = document.getElementById('orders-table-wrap');
    const countEl  = document.getElementById('order-count');

    countEl.textContent = `${orders.length} order${orders.length !== 1 ? 's' : ''}`;

    if (orders.length === 0) {
      wrap.style.display  = 'none';
      empty.style.display = 'block';
      return;
    }
    wrap.style.display  = 'block';
    empty.style.display = 'none';

    tbody.innerHTML = orders.map(function (o) {
      const d        = new Date(o.date);
      const dateStr  = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr  = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      const items    = o.items.map(function (i) { return i.name + ' ×' + i.qty; }).join('<br>');
      var payBadge;
      if (o.stripeStatus === 'succeeded') {
        var cardInfo = o.cardLast4
          ? (o.cardBrand || 'Card').charAt(0).toUpperCase() + (o.cardBrand || 'card').slice(1) + ' ····' + o.cardLast4
          : 'Card';
        payBadge = '<span class="badge badge-paid">✅ Paid — ' + cardInfo + '</span>';
      } else if (o.cardLast4) {
        payBadge = '<span class="badge badge-card">💳 ' + (o.cardBrand || 'Card').charAt(0).toUpperCase() + (o.cardBrand || 'card').slice(1) + ' ····' + o.cardLast4 + '</span>';
      } else if (o.paymentMethod === 'cash') {
        payBadge = '<span class="badge badge-cash">💵 Cash</span>';
      } else {
        payBadge = '<span class="badge badge-card">💳 Card</span>';
      }
      const cur  = statuses[o.id] || 'pending';
      const opts = STATUS_OPTIONS.map(function (s) {
        return `<option value="${s.value}"${s.value === cur ? ' selected' : ''}>${s.label}</option>`;
      }).join('');
      const addr = o.customer && o.customer.address
        ? `<span style="font-size:0.75rem;color:var(--muted)">${o.customer.address}, ${o.customer.city || ''} ${o.customer.postcode || ''}</span>`
        : '';

      var delType = o.deliveryType === 'international' ? '🌍 International' : '🇬🇧 UK';
      var custCountry = (o.customer && o.customer.country) ? '<br><span style="font-size:0.75rem;color:var(--muted)">' + o.customer.country + '</span>' : '';

      // Tracking column
      var trackNum = tracking[o.id] || '';
      var trackingHTML = '<div class="tracking-cell">' +
        '<input type="text" class="tracking-input" data-order-id="' + o.id + '" value="' + trackNum + '" placeholder="Enter tracking #" />' +
        '<button class="tracking-save-btn" data-order-id="' + o.id + '">Save</button>' +
        (trackNum ? '<a href="https://www.royalmail.com/track-your-item#/tracking-results/' + encodeURIComponent(trackNum) + '" target="_blank" rel="noopener" class="tracking-link">Track</a>' : '') +
        '</div>';

      // Royal Mail column
      var rmStatus = rmStatuses[o.id];
      var rmHTML;
      if (rmStatus && rmStatus.status === 'submitted') {
        rmHTML = '<span class="badge badge-ok">✅ Sent</span>' +
          '<button class="rm-label-btn" data-order-id="' + o.id + '">🏷️ Label</button>';
      } else {
        rmHTML = '<button class="rm-send-btn" data-order-id="' + o.id + '">📦 Send to RM</button>';
      }

      return `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${dateStr}<br><span style="font-size:0.75rem;color:var(--muted)">${timeStr}</span></td>
        <td>
          <strong>${(o.customer && o.customer.name) || '—'}</strong><br>
          <span style="font-size:0.75rem;color:var(--muted)">${(o.customer && o.customer.email) || ''}</span><br>
          <span style="font-size:0.75rem;color:var(--muted)">${(o.customer && o.customer.phone) || ''}</span><br>
          ${addr}${custCountry}
        </td>
        <td style="font-size:0.82rem;color:var(--muted)">${items}</td>
        <td>
          <strong>${fmt(o.total)}</strong><br>
          <span style="font-size:0.75rem;color:var(--muted)">${delType} ${fmt(o.delivery || 0)} delivery</span>
        </td>
        <td>${payBadge}</td>
        <td><select class="status-select s-${cur}" data-order-id="${o.id}">${opts}</select></td>
        <td>${trackingHTML}</td>
        <td>${rmHTML}</td>
      </tr>`;
    }).join('');

    // Status dropdowns
    tbody.querySelectorAll('.status-select').forEach(function (sel) {
      sel.onchange = function () {
        const s = getStatuses();
        s[sel.dataset.orderId] = sel.value;
        saveStatuses(s);
        sel.className = 'status-select s-' + sel.value;
        if (typeof saveStatusToCloud === 'function') saveStatusToCloud(sel.dataset.orderId, sel.value);
      };
    });

    // Tracking save buttons
    tbody.querySelectorAll('.tracking-save-btn').forEach(function (btn) {
      btn.onclick = function () {
        var orderId = btn.dataset.orderId;
        var input = tbody.querySelector('.tracking-input[data-order-id="' + orderId + '"]');
        if (!input) return;
        var num = input.value.trim();
        var t = getTracking();
        t[orderId] = num;
        saveTrackingLocal(t);
        if (typeof saveTrackingToCloud === 'function') saveTrackingToCloud(orderId, num);
        btn.textContent = '✓';
        setTimeout(function () { btn.textContent = 'Save'; }, 1200);
        renderOrders();
      };
    });

    // Royal Mail send buttons
    tbody.querySelectorAll('.rm-send-btn').forEach(function (btn) {
      btn.onclick = function () {
        var orderId = btn.dataset.orderId;
        var order = orders.find(function (o) { return o.id === orderId; });
        if (!order) return;
        btn.disabled = true;
        btn.textContent = 'Sending…';
        fetch(RM_FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: order })
        }).then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.success === true) {
              var rm = getRoyalMailStatuses();
              rm[orderId] = { status: 'submitted', sentAt: new Date().toISOString() };
              localStorage.setItem(ROYAL_MAIL_KEY, JSON.stringify(rm));
              renderOrders();
            } else {
              var errMsg = data.error || 'Unknown error';
              if (data.details) errMsg += '\n\nRoyal Mail response:\n' + JSON.stringify(data.details, null, 2);
              if (data.responseBody) errMsg += '\n\nRaw response:\n' + data.responseBody;
              alert(errMsg);
              btn.disabled = false;
              btn.textContent = '📦 Send to RM';
            }
          }).catch(function (err) {
            alert('Failed to send to Royal Mail: ' + err.message);
            btn.disabled = false;
            btn.textContent = '📦 Send to RM';
          });
      };
    });

    // Royal Mail label buttons
    tbody.querySelectorAll('.rm-label-btn').forEach(function (btn) {
      btn.onclick = function () {
        var orderId = btn.dataset.orderId;
        btn.disabled = true;
        btn.textContent = 'Loading…';
        fetch(RM_LABEL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderId })
        }).then(function (res) {
          var contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/pdf')) {
            return res.blob().then(function (blob) {
              var url = URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
              a.download = 'label-' + orderId + '.pdf';
              a.click();
              URL.revokeObjectURL(url);
            });
          }
          return res.json().then(function (data) {
            if (data.clickDropUrl) {
              window.open(data.clickDropUrl, '_blank');
            } else {
              alert('Label generated. Check Click & Drop.');
            }
          });
        }).catch(function (err) {
          alert('Label error: ' + err.message);
        }).finally(function () {
          btn.disabled = false;
          btn.textContent = '🏷️ Label';
        });
      };
    });

  } catch (e) {
    console.error('[Orders] Render error:', e);
  }
}

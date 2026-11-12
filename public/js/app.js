(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const sidebar = $('#sidebar');
  $('#menuToggle')?.addEventListener('click', () => sidebar?.classList.toggle('open'));
  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 760 && sidebar?.classList.contains('open') && !sidebar.contains(event.target) && !event.target.closest('#menuToggle')) {
      sidebar.classList.remove('open');
    }
  });

  // Dismissible notices / toast messages
  $$('.toast-close').forEach((button) => button.addEventListener('click', () => button.closest('.toast')?.remove()));
  function toast(message, type = 'success') {
    const existing = $('.toast-client');
    existing?.remove();
    const node = document.createElement('div');
    node.className = `toast toast-client ${type === 'error' ? 'toast-error' : ''}`;
    const symbol = document.createElement('span');
    symbol.textContent = type === 'error' ? '!' : '✓';
    const text = document.createElement('span');
    text.textContent = message;
    const close = document.createElement('button');
    close.className = 'toast-close'; close.type = 'button'; close.textContent = '×';
    close.addEventListener('click', () => node.remove());
    node.append(symbol, text, close);
    document.body.appendChild(node);
    window.setTimeout(() => node.remove(), 4200);
  }

  // Employee directory search, filters and add-employee modal
  const employeeSearch = $('#employeeSearch');
  const departmentFilter = $('#departmentFilter');
  const statusFilter = $('#statusFilter');
  const employeeRows = $('#employeeRows');
  function filterEmployees() {
    if (!employeeRows) return;
    const query = (employeeSearch?.value || '').trim().toLowerCase();
    const department = departmentFilter?.value || '';
    const status = statusFilter?.value || '';
    let visible = 0;
    $$('tr', employeeRows).forEach((row) => {
      const matchesText = row.textContent.toLowerCase().includes(query);
      const matchesDepartment = !department || row.dataset.department === department;
      const matchesStatus = !status || row.dataset.status === status;
      const show = matchesText && matchesDepartment && matchesStatus;
      row.hidden = !show;
      if (show) visible++;
    });
    if ($('#employeeCount')) $('#employeeCount').textContent = visible;
    if ($('#directoryFoot')) $('#directoryFoot').textContent = `Showing ${visible} matching sample employees`;
  }
  [employeeSearch, departmentFilter, statusFilter].filter(Boolean).forEach((field) => field.addEventListener('input', filterEmployees));
  $('#clearFilters')?.addEventListener('click', () => {
    if (employeeSearch) employeeSearch.value = '';
    if (departmentFilter) departmentFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    filterEmployees();
  });
  const modal = $('#employeeModal');
  const openModal = () => { modal?.classList.add('open'); modal?.setAttribute('aria-hidden', 'false'); $('input[name="name"]', modal)?.focus(); };
  const closeModal = () => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden', 'true'); };
  $('#addEmployeeBtn')?.addEventListener('click', openModal);
  $('#closeEmployeeModal')?.addEventListener('click', closeModal);
  $('#cancelEmployeeModal')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  $('#employeeForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const initials = values.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    const row = document.createElement('tr');
    row.dataset.department = values.department; row.dataset.status = 'Active';
    const cells = [
      `<div class="person-cell"><span class="avatar avatar-soft">${initials}</span><span class="person-copy"><strong>${escapeHtml(values.name)}</strong><small>${escapeHtml(values.email)} · PH-DEMO</small></span></div>`,
      escapeHtml(values.department), escapeHtml(values.designation), '09 Nov 2026', '<span class="status status-success"><i></i>Active</span>', '<button class="icon-button row-menu" aria-label="Employee actions">•••</button>'
    ];
    cells.forEach((content) => { const cell = document.createElement('td'); cell.innerHTML = content; row.appendChild(cell); });
    employeeRows?.prepend(row);
    form.reset(); closeModal(); filterEmployees();
    toast('Employee added to this frontend demo.');
  });
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  }

  // Manager leave-review panel. Decisions are local to this browser demo.
  const detailPanel = $('#requestDetail');
  const leaveList = $('#requestList');
  if (detailPanel && leaveList && Array.isArray(window.orvella_LEAVES)) {
    let selectedId = window.orvella_LEAVES.find((request) => request.status === 'Pending')?.id || window.orvella_LEAVES[0]?.id;
    const renderDetail = () => {
      const request = window.orvella_LEAVES.find((item) => item.id === selectedId);
      if (!request) return;
      const pending = request.status === 'Pending';
      detailPanel.innerHTML = `
        <div class="request-detail-content">
          <div class="detail-title-row"><div><span class="eyebrow">REQUEST ${escapeHtml(request.id)}</span><h2 style="margin-top:7px">Request details</h2></div><span class="status status-${pending ? 'warning' : 'success'}"><i></i>${escapeHtml(request.status)}</span></div>
          <div class="detail-employee"><span class="avatar avatar-purple">${escapeHtml(request.initials)}</span><div class="detail-employee-copy"><strong>${escapeHtml(request.name)}</strong><small>${escapeHtml(request.department)} · Employee</small></div></div>
          <div class="detail-facts"><div class="fact-card"><small>LEAVE TYPE</small><strong>${escapeHtml(request.type)}</strong></div><div class="fact-card"><small>DURATION</small><strong>${request.days} ${request.days === 1 ? 'day' : 'working days'}</strong></div><div class="fact-card"><small>FROM</small><strong>${escapeHtml(request.start)}</strong></div><div class="fact-card"><small>TO</small><strong>${escapeHtml(request.end)}</strong></div></div>
          <div class="balance-after"><div><strong>Annual leave balance after approval</strong><small>Estimated remaining balance for this employee</small></div><b>12 days</b></div>
          <div><span class="eyebrow">EMPLOYEE NOTE</span><div class="quote-block" style="margin-top:8px">“${escapeHtml(request.note)}”</div></div>
          ${pending ? `<div class="comment-field"><label for="managerComment">Manager comment (optional)</label><textarea id="managerComment" placeholder="Add a note for the employee…"></textarea></div><div class="decision-actions"><button type="button" class="button button-primary" data-decision="Approved">✓ Approve request</button><button type="button" class="button button-danger" data-decision="Rejected">Reject request</button></div>` : `<div class="queue-note"><span class="note-icon">✓</span><span><strong>Request ${escapeHtml(request.status.toLowerCase())}</strong><small>This is a local demo state. Refreshing the page restores the sample data.</small></span></div>`}
        </div>`;
    };
    const updateCards = () => {
      window.orvella_LEAVES.forEach((request) => {
        const card = $(`[data-request-id="${request.id}"]`, leaveList);
        if (!card) return;
        card.classList.toggle('selected', request.id === selectedId);
        const status = $('.status', card);
        if (status) { status.className = `status status-${request.status === 'Pending' ? 'warning' : 'success'}`; status.innerHTML = `<i></i>${escapeHtml(request.status)}`; }
      });
      const count = window.orvella_LEAVES.filter((request) => request.status === 'Pending').length;
      if ($('#pendingCount')) $('#pendingCount').textContent = count;
      const queueCount = $('.queue-count'); if (queueCount) queueCount.textContent = `${count} pending`;
    };
    leaveList.addEventListener('click', (event) => {
      const card = event.target.closest('[data-request-id]');
      if (!card) return;
      selectedId = card.dataset.requestId; renderDetail(); updateCards();
    });
    detailPanel.addEventListener('click', (event) => {
      const button = event.target.closest('[data-decision]');
      if (!button) return;
      const request = window.orvella_LEAVES.find((item) => item.id === selectedId);
      if (!request || request.status !== 'Pending') return;
      request.status = button.dataset.decision;
      renderDetail(); updateCards();
      toast(`Request ${request.status.toLowerCase()} in this demo.`);
    });
    renderDetail(); updateCards();
  }

  // Demo team-calendar placeholder action
  $('#teamCalendarBtn')?.addEventListener('click', () => toast('Team calendar view can be connected as the next module.'));
})();

// ============================================
// Al Barook Building - Admin Dashboard
// OPTION B: Full-Stack with Backend API
// ============================================

const API_URL = 'https://your-backend-url.onrender.com/api';
let currentUser = null;
let currentPage = 'dashboard';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setupEventListeners();
});

// ============================================
// AUTHENTICATION
// ============================================

function checkAuth() {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('currentUser');
  
  if (token && user) {
    currentUser = JSON.parse(user);
    showDashboard();
    displayUserName();
  } else {
    showLoginPage();
  }
}

function displayUserName() {
  const userNameEl = document.getElementById('userName');
  if (currentUser) {
    userNameEl.textContent = currentUser.name || currentUser.email;
  }
}

function showLoginPage() {
  document.getElementById('loginPage').classList.add('active');
  document.querySelector('.sidebar').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginPage').classList.remove('active');
  document.querySelector('.sidebar').style.display = 'flex';
  document.querySelector('.main-content').style.marginLeft = '250px';
  navigateTo('dashboard');
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Register Form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.getAttribute('data-page');
      navigateTo(page);
    });
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  // Form Submissions
  document.getElementById('flatForm')?.addEventListener('submit', saveFlatHandler);
  document.getElementById('tenantForm')?.addEventListener('submit', saveTenantHandler);
  document.getElementById('rentForm')?.addEventListener('submit', saveRentHandler);
  document.getElementById('expenseForm')?.addEventListener('submit', saveExpenseHandler);
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const role = document.getElementById('loginRole').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      currentUser = data.user;
      showDashboard();
      displayUserName();
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your connection.');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Registration successful! Please login.');
      toggleRegister();
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed');
  }
}

function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  currentUser = null;
  showLoginPage();
}

function toggleRegister() {
  document.getElementById('loginForm').style.display = 
    document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = 
    document.getElementById('registerForm').style.display === 'none' ? 'block' : 'none';
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show selected page
  document.getElementById(page)?.classList.add('active');
  
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  
  // Update page title
  const titles = {
    'dashboard': 'Dashboard',
    'flats': 'Flats',
    'tenants': 'Tenants',
    'rent': 'Rent Collection',
    'expenses': 'Expenses',
    'reminders': 'Reminders',
    'reports': 'Reports'
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  
  currentPage = page;
  
  // Load page data
  if (page === 'dashboard') loadDashboard();
  if (page === 'flats') loadFlats();
  if (page === 'tenants') loadTenants();
  if (page === 'rent') loadRentCollection();
  if (page === 'expenses') loadExpenses();
  if (page === 'reminders') loadReminders();
  if (page === 'reports') loadReports();
}

// ============================================
// DASHBOARD
// ============================================

async function loadDashboard() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/dashboard/summary`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    
    if (response.ok) {
      document.getElementById('occupiedCount').textContent = data.occupiedFlats || 0;
      document.getElementById('rentCollected').textContent = `AED ${data.rentCollectedThisMonth || 0}`;
      document.getElementById('expensesTotal').textContent = `AED ${data.expensesThisMonth || 0}`;
      
      loadPendingRent();
    }
  } catch (error) {
    console.error('Dashboard load error:', error);
  }
}

async function loadPendingRent() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/rent/pending`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const rentList = await response.json();
    const container = document.getElementById('pendingRentList');
    
    if (rentList.length === 0) {
      container.innerHTML = '<p>No pending rent payments</p>';
    } else {
      container.innerHTML = rentList.map(rent => `
        <div style="padding: 1rem; border-bottom: 1px solid #eee;">
          <strong>Flat ${rent.flatNumber}</strong> - ${rent.tenantName}
          <div style="color: #ef4444; font-weight: bold;">AED ${rent.amount}</div>
          <small style="color: #999;">Due: ${new Date(rent.dueDate).toLocaleDateString()}</small>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Pending rent error:', error);
  }
}

// ============================================
// FLATS MANAGEMENT
// ============================================

async function loadFlats() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/flats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const flats = await response.json();
    const tbody = document.getElementById('flatsList');
    
    tbody.innerHTML = flats.map(flat => `
      <tr>
        <td>${flat.flatNumber}</td>
        <td>${flat.floor}</td>
        <td>${flat.type}</td>
        <td>
          <span class="badge ${flat.status === 'occupied' ? 'badge-paid' : 'badge-pending'}">
            ${flat.status}
          </span>
        </td>
        <td>AED ${flat.monthlyRent}</td>
        <td>${flat.tenant || '-'}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteFlatHandler(${flat._id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Flats load error:', error);
  }
}

function openFlatForm() {
  document.getElementById('flatModal').classList.add('active');
}

function closeFlatForm() {
  document.getElementById('flatModal').classList.remove('active');
  document.getElementById('flatForm').reset();
}

async function saveFlatHandler(e) {
  e.preventDefault();
  
  const flat = {
    flatNumber: document.getElementById('flatNumber').value,
    floor: document.getElementById('flatFloor').value,
    type: document.getElementById('flatType').value,
    monthlyRent: document.getElementById('flatRent').value
  };

  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/flats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(flat)
    });

    if (response.ok) {
      alert('Flat added successfully!');
      closeFlatForm();
      loadFlats();
    }
  } catch (error) {
    console.error('Save flat error:', error);
  }
}

async function deleteFlatHandler(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/flats/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      alert('Flat deleted!');
      loadFlats();
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
}

// ============================================
// TENANTS MANAGEMENT
// ============================================

async function loadTenants() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/tenants`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const tenants = await response.json();
    const tbody = document.getElementById('tenantsList');
    
    tbody.innerHTML = tenants.map(tenant => `
      <tr>
        <td>${tenant.name}</td>
        <td>${tenant.email}</td>
        <td>${tenant.phone}</td>
        <td>${tenant.flatNumber}</td>
        <td>${new Date(tenant.leaseStart).toLocaleDateString()}</td>
        <td>${new Date(tenant.leaseEnd).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteTenantHandler(${tenant._id})">Delete</button>
        </td>
      </tr>
    `).join('');
    
    populateFlatSelects();
  } catch (error) {
    console.error('Tenants load error:', error);
  }
}

function openTenantForm() {
  document.getElementById('tenantModal').classList.add('active');
}

function closeTenantForm() {
  document.getElementById('tenantModal').classList.remove('active');
  document.getElementById('tenantForm').reset();
}

async function saveTenantHandler(e) {
  e.preventDefault();
  
  const tenant = {
    name: document.getElementById('tenantName').value,
    email: document.getElementById('tenantEmail').value,
    phone: document.getElementById('tenantPhone').value,
    flatNumber: document.getElementById('tenantFlat').value,
    leaseStart: document.getElementById('tenantLeaseStart').value,
    leaseEnd: document.getElementById('tenantLeaseEnd').value
  };

  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/tenants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(tenant)
    });

    if (response.ok) {
      alert('Tenant added successfully!');
      closeTenantForm();
      loadTenants();
    }
  } catch (error) {
    console.error('Save tenant error:', error);
  }
}

async function deleteTenantHandler(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    const token = localStorage.getItem('authToken');
    await fetch(`${API_URL}/tenants/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    loadTenants();
  } catch (error) {
    console.error('Delete error:', error);
  }
}

async function populateFlatSelects() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/flats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const flats = await response.json();
    
    ['tenantFlat', 'rentFlat'].forEach(selectId => {
      const select = document.getElementById(selectId);
      if (select) {
        select.innerHTML = flats.map(flat => 
          `<option value="${flat.flatNumber}">${flat.flatNumber}</option>`
        ).join('');
      }
    });
  } catch (error) {
    console.error('Populate flats error:', error);
  }
}

// ============================================
// RENT COLLECTION
// ============================================

async function loadRentCollection() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/rent`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const rentRecords = await response.json();
    const tbody = document.getElementById('rentList');
    
    tbody.innerHTML = rentRecords.map(rent => `
      <tr>
        <td>${rent.flatNumber}</td>
        <td>${rent.tenantName}</td>
        <td>AED ${rent.expectedRent}</td>
        <td>AED ${rent.amountReceived}</td>
        <td><span class="badge badge-${rent.status}">${rent.status}</span></td>
        <td>${rent.dateReceived ? new Date(rent.dateReceived).toLocaleDateString() : '-'}</td>
        <td><button class="btn btn-danger" onclick="deleteRentHandler(${rent._id})">Delete</button></td>
      </tr>
    `).join('');
    
    populateFlatSelects();
  } catch (error) {
    console.error('Rent load error:', error);
  }
}

function openRentForm() {
  document.getElementById('rentModal').classList.add('active');
}

function closeRentForm() {
  document.getElementById('rentModal').classList.remove('active');
  document.getElementById('rentForm').reset();
}

async function saveRentHandler(e) {
  e.preventDefault();
  
  const rent = {
    flatNumber: document.getElementById('rentFlat').value,
    amountReceived: document.getElementById('rentAmount').value,
    dateReceived: document.getElementById('rentDate').value,
    paymentMethod: document.getElementById('rentMethod').value
  };

  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/rent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rent)
    });

    if (response.ok) {
      alert('Rent payment recorded!');
      closeRentForm();
      loadRentCollection();
    }
  } catch (error) {
    console.error('Save rent error:', error);
  }
}

async function deleteRentHandler(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    const token = localStorage.getItem('authToken');
    await fetch(`${API_URL}/rent/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    loadRentCollection();
  } catch (error) {
    console.error('Delete error:', error);
  }
}

// ============================================
// EXPENSES MANAGEMENT
// ============================================

async function loadExpenses() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/expenses`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const expenses = await response.json();
    const tbody = document.getElementById('expensesList');
    
    tbody.innerHTML = expenses.map(exp => `
      <tr>
        <td>${exp.category}</td>
        <td>${exp.description}</td>
        <td>AED ${exp.amount}</td>
        <td>${new Date(exp.date).toLocaleDateString()}</td>
        <td>${exp.vendor || '-'}</td>
        <td><span class="badge badge-pending">${exp.status}</span></td>
        <td><button class="btn btn-danger" onclick="deleteExpenseHandler(${exp._id})">Delete</button></td>
      </tr>
    `).join('');
    
    // Update expense summary
    updateExpenseSummary(expenses);
  } catch (error) {
    console.error('Expenses load error:', error);
  }
}

function updateExpenseSummary(expenses) {
  const categories = ['Plumbing', 'Carpenter', 'Electrical', 'Painting'];
  
  categories.forEach(cat => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    
    const id = `${cat.toLowerCase()}Total`;
    const el = document.getElementById(id);
    if (el) el.textContent = `AED ${total}`;
  });
}

function openExpenseForm() {
  document.getElementById('expenseModal').classList.add('active');
}

function closeExpenseForm() {
  document.getElementById('expenseModal').classList.remove('active');
  document.getElementById('expenseForm').reset();
}

async function saveExpenseHandler(e) {
  e.preventDefault();
  
  const expense = {
    category: document.getElementById('expenseCategory').value,
    description: document.getElementById('expenseDesc').value,
    amount: document.getElementById('expenseAmount').value,
    date: document.getElementById('expenseDate').value,
    vendor: document.getElementById('expenseVendor').value
  };

  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(expense)
    });

    if (response.ok) {
      alert('Expense recorded!');
      closeExpenseForm();
      loadExpenses();
    }
  } catch (error) {
    console.error('Save expense error:', error);
  }
}

async function deleteExpenseHandler(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    const token = localStorage.getItem('authToken');
    await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    loadExpenses();
  } catch (error) {
    console.error('Delete error:', error);
  }
}

// ============================================
// REMINDERS
// ============================================

async function loadReminders() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/reminders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const reminders = await response.json();
    const tbody = document.getElementById('remindersList');
    
    tbody.innerHTML = reminders.map(rem => `
      <tr>
        <td>${rem.flatNumber}</td>
        <td>${rem.tenantName}</td>
        <td>${rem.email}</td>
        <td>AED ${rem.monthlyRent}</td>
        <td><span class="badge badge-${rem.paymentStatus}">${rem.paymentStatus}</span></td>
        <td>${rem.lastReminder ? new Date(rem.lastReminder).toLocaleDateString() : 'Never'}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Reminders load error:', error);
  }
}

async function sendAllReminders() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/reminders/send-all`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    alert(`Reminders sent to ${data.count} tenants!`);
    loadReminders();
  } catch (error) {
    console.error('Send reminders error:', error);
    alert('Failed to send reminders');
  }
}

// ============================================
// REPORTS
// ============================================

async function loadReports() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/reports/monthly`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const report = await response.json();
    const container = document.getElementById('reportSummary');
    
    container.innerHTML = `
      <div style="display: grid; gap: 1rem;">
        <div><strong>Total Rent Collected:</strong> AED ${report.rentCollected}</div>
        <div><strong>Total Expenses:</strong> AED ${report.expenses}</div>
        <div><strong>Net Profit:</strong> AED ${report.rentCollected - report.expenses}</div>
        <div><strong>Occupancy Rate:</strong> ${report.occupancyRate}%</div>
        <div><strong>Pending Payments:</strong> AED ${report.pendingPayments}</div>
      </div>
    `;
  } catch (error) {
    console.error('Reports load error:', error);
  }
}

function downloadReport() {
  alert('Report download feature coming soon!');
}

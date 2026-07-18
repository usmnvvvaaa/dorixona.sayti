let cart = [];

function loadCart() {
    const stored = localStorage.getItem("pharmacyCart");
    if (stored) {
        cart = JSON.parse(stored);
    }
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("pharmacyCart", JSON.stringify(cart));
}

function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('#cartCount');
    countElements.forEach(el => {
        if (el) el.textContent = count;
    });
    
    const container = document.getElementById('cartItemsContainer');
    if (container) {
        if (cart.length === 0) {
            container.innerHTML = '<p class="text-center text-muted py-4"><i class="fas fa-shopping-cart fa-2x mb-2 d-block"></i>Savat bo\'sh</p>';
        } else {
            container.innerHTML = cart.map(item => `
                <div class="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                    <img src="${item.image}" class="rounded" style="width: 60px; height: 60px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/60x60?text=Med'">
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">${item.price.toLocaleString()} so'm</small>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="fw-bold">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElements = document.querySelectorAll('#cartTotalAmount');
    totalElements.forEach(el => {
        if (el) el.textContent = total.toLocaleString() + " so'm";
    });
}

function openCartModal() {
    updateCartUI();
    const modalElement = document.getElementById('cartModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Savatingiz bo'sh!");
        return;
    }
    
    const user = getLoggedInUser();
    const customerName = user ? user.name + " " + user.lastName : "Mehmon";
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
        id: Date.now(),
        customer: customerName,
        amount: totalAmount,
        status: "Kutilyapti",
        date: new Date().toISOString().split('T')[0]
    };
    
    const orders = getOrders();
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    alert(`Buyurtma qabul qilindi!\nSumma: ${totalAmount.toLocaleString()} so'm\nTez orada admin bilan bog'lanamiz.`);
    
    cart = [];
    saveCart();
    updateCartUI();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (modal) modal.hide();
}


function renderAllProducts() {
    const products = getProducts();
    const container = document.getElementById('products-row');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="col">
            <div class="card product-card h-100" onclick="goToProduct(${product.id})">
                <div class="card-img-top-wrapper">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=MedPharm'">
                </div>
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${getCategoryName(product.category)}</span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-primary fw-bold fs-4">${product.price.toLocaleString()} so'm</p>
                    <p class="card-text small text-muted">${product.description ? product.description.substring(0, 60) + "..." : "Sifatli va sertifikatlangan dori"}</p>
                    <button class="btn btn-success w-100" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Savatga qo'shish
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderProductsByCategory(category) {
    const products = getProducts();
    const filtered = products.filter(p => p.category === category);
    const container = document.getElementById('products-row');
    if (!container) return;
    
    container.innerHTML = filtered.map(product => `
        <div class="col">
            <div class="card product-card h-100" onclick="goToProduct(${product.id})">
                <div class="card-img-top-wrapper">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=MedPharm'">
                </div>
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${getCategoryName(product.category)}</span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-primary fw-bold fs-4">${product.price.toLocaleString()} so'm</p>
                    <button class="btn btn-success w-100" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Savatga qo'shish
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


function handleSearch() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const category = document.getElementById('catFilter')?.value || "";
    const priceRange = document.getElementById('priceFilter')?.value || "";
    
    let products = getProducts();
    
    if (searchTerm) {
        products = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    }
    if (category) {
        products = products.filter(p => p.category === category);
    }
    if (priceRange) {
        if (priceRange === '0-50000') products = products.filter(p => p.price <= 50000);
        else if (priceRange === '50000-100000') products = products.filter(p => p.price > 50000 && p.price <= 100000);
        else if (priceRange === '100000+') products = products.filter(p => p.price > 100000);
    }
    
    const container = document.getElementById('products-row');
    if (container) {
        container.innerHTML = products.map(product => `
            <div class="col">
                <div class="card product-card h-100" onclick="goToProduct(${product.id})">
                    <div class="card-img-top-wrapper">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=MedPharm'">
                    </div>
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${getCategoryName(product.category)}</span>
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-primary fw-bold fs-4">${product.price.toLocaleString()} so'm</p>
                        <button class="btn btn-success w-100" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Savatga qo'shish
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function handleFilters() {
    handleSearch();
}

function getCategoryName(cat) {
    const names = {
        antibiotik: "Antibiotik",
        ogriq: "Og'riq qoldiruvchi",
        vitamin: "Vitaminlar",
        yurak: "Yurak preparatlari",
        gormon: "Gormonlar",
        antivirus: "Antivirus"
    };
    return names[cat] || cat;
}

function goToProduct(id) {
    if (isLoggedIn()) {
        window.location.href = `singlePage.html?id=${id}`;
    } else {
        window.location.href = "signIn.html";
    }
}


function handleMedicineSave() {
    const name = document.getElementById('medName')?.value.trim();
    const category = document.getElementById('medCategory')?.value;
    const price = parseInt(document.getElementById('medPrice')?.value);
    const image = document.getElementById('medImage')?.value.trim();
    const description = document.getElementById('medDesc')?.value.trim();
    const messageEl = document.getElementById('adminMessage');
    
    if (!name || !price) {
        if (messageEl) messageEl.innerHTML = '<div class="alert alert-danger">Nomi va narxni to\'ldiring!</div>';
        return;
    }
    
    const newProduct = {
        name, category, price, 
        image: image || "https://via.placeholder.com/300x200?text=MedPharm",
        description: description || "Sifatli va sertifikatlangan dori preparati."
    };
    
    saveProduct(newProduct);
    if (messageEl) messageEl.innerHTML = '<div class="alert alert-success">Dori qo\'shildi!</div>';
    
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

function handleUserSave() {
    const name = document.getElementById('userName')?.value.trim();
    const lastName = document.getElementById('userLastName')?.value.trim();
    const email = document.getElementById('userEmail')?.value.trim();
    const username = document.getElementById('userUsername')?.value.trim();
    const password = document.getElementById('userPassword')?.value.trim();
    const role = document.getElementById('userRole')?.value;
    const messageEl = document.getElementById('userMessage');
    
    if (!name || !lastName || !email || !username || !password) {
        if (messageEl) messageEl.innerHTML = '<div class="alert alert-danger">Barcha maydonlarni to\'ldiring!</div>';
        return;
    }
    
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        if (messageEl) messageEl.innerHTML = '<div class="alert alert-danger">Bu username band!</div>';
        return;
    }
    
    saveUser({ name, lastName, email, username, password, role });
    if (messageEl) messageEl.innerHTML = '<div class="alert alert-success">Foydalanuvchi yaratildi!</div>';
    
    document.getElementById('userName').value = "";
    document.getElementById('userLastName').value = "";
    document.getElementById('userEmail').value = "";
    document.getElementById('userUsername').value = "";
    document.getElementById('userPassword').value = "";
}

function updateStats() {
    const products = getProducts();
    const users = getUsers();
    const statProducts = document.getElementById('statProducts');
    const statCustomers = document.getElementById('statCustomers');
    if (statProducts) statProducts.textContent = products.length;
    if (statCustomers) statCustomers.textContent = users.length;
}

function updateOrdersTable() {
    const orders = getOrders();
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = orders.slice().reverse().map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>${order.amount.toLocaleString()} so'm</td>
            <td><span class="badge ${order.status === 'Yakunlangan' ? 'bg-success' : order.status === 'Jarayonda' ? 'bg-warning' : 'bg-secondary'}">${order.status}</span></td>
        </tr>
    `).join('');
}


document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateStats();
    updateOrdersTable();
    
   
    if (document.getElementById('products-row') && window.location.pathname.includes('index.html')) {
        renderAllProducts();
    }
});
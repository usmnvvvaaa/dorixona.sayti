function showTab(tab) {
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('visible');
        document.getElementById('registerForm').classList.remove('visible');
        document.querySelectorAll('.tab-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === 0);
        });
        document.getElementById('loginError').textContent = '';
    } else {
        document.getElementById('registerForm').classList.add('visible');
        document.getElementById('loginForm').classList.remove('visible');
        document.querySelectorAll('.tab-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === 1);
        });
        document.getElementById('registerError').textContent = '';
        document.getElementById('registerSuccess').textContent = '';
    }
}

function handleLogin() {
    if (isLoggedIn()) {
        window.location.href = "index.html";
        return;
    }
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorEl = document.getElementById('loginError');
    
    if (!username || !password) {
        errorEl.textContent = "Iltimos, username va parolni kiriting!";
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        errorEl.textContent = "";
        window.location.href = "index.html";
    } else {
        errorEl.textContent = "Username yoki parol noto'g'ri!";
        document.getElementById('loginPassword').value = "";
    }
}

function handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const errorEl = document.getElementById('registerError');
    const successEl = document.getElementById('registerSuccess');
    
    errorEl.textContent = "";
    successEl.textContent = "";
    
    if (!name || !lastName || !email || !username || !password) {
        errorEl.textContent = "Barcha maydonlarni to'ldiring!";
        return;
    }
    
    if (password.length < 4) {
        errorEl.textContent = "Parol kamida 4 belgidan iborat bo'lishi kerak!";
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorEl.textContent = "Email manzili noto'g'ri!";
        return;
    }
    
    const users = getUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        errorEl.textContent = "Bu username allaqachon band!";
        return;
    }
    
    if (users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase())) {
        errorEl.textContent = "Bu email allaqachon ro'yxatdan o'tgan!";
        return;
    }
    
    const newUser = { name, lastName, email, username, password, role: "o'quvchi" };
    saveUser(newUser);
    
    successEl.textContent = `Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi "${username}" bilan kiring.`;
    
    document.getElementById('regName').value = "";
    document.getElementById('regLastName').value = "";
    document.getElementById('regEmail').value = "";
    document.getElementById('regUsername').value = "";
    document.getElementById('regPassword').value = "";
    
    setTimeout(() => {
        showTab('login');
        document.getElementById('loginUsername').value = username;
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    if (isLoggedIn()) {
        window.location.href = "index.html";
    }
});
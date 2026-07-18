document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("authBtn");
    if (!authBtn) return;
    
    if (isLoggedIn()) {
        const user = getLoggedInUser();
        // If user is admin (role === "ustoz"), ensure there's a top-level Admin nav item
        const navList = document.querySelector('#navbarNav .navbar-nav');
        if (user.role === "ustoz" && navList && !document.getElementById('adminNavItem')) {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.id = 'adminNavItem';
            li.innerHTML = `<a class="nav-link btn btn-outline-light px-3" href="#" data-bs-toggle="modal" data-bs-target="#adminModal"><i class="fas fa-shield-alt"></i> Admin panel</a>`;
            navList.insertBefore(li, navList.firstChild);
        }

        authBtn.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user-circle"></i> ${user.name}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-user"></i> Profil</a></li>
                    ${user.role === "ustoz" ? `<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#adminModal"><i class="fas fa-shield-alt"></i> Admin panel</a></li>` : ""}
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Chiqish</a></li>
                </ul>
            </div>
        `;
    } else {
        authBtn.innerHTML = `<a href="signIn.html" class="btn btn-outline-light"><i class="fas fa-key"></i> Kirish</a>`;
    }
});
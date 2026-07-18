const DEFAULT_PRODUCTS = [
    { 
        id: 1, 
        name: "Amoksitsillin 500mg", 
        category: "antibiotik", 
        price: 45000, 
        image: "https://ozerki.ru/_next/image/?url=https%3A%2F%2Fozerki.ru%2Fer-pics%2Fimages%2Fgoods%2F399705%2Fmain&w=768&q=90", 
        description: "Keng spektrli antibiotik. Bakterial infektsiyalarni davolashda samarali." 
    },
    { 
        id: 2, 
        name: "Paratsetamol 500mg", 
        category: "ogriq", 
        price: 59999, 
        image: "https://samson-pharma.ru/_next/image/?url=https%3A%2F%2Fpics.erkapharm.com%2Fimages%2Fgoods%2F304483%2F1.jpg&w=732&q=90", 
        description: "Og'riq qoldiruvchi va isitma tushiruvchi vosita." 
    },
    { 
        id: 3, 
        name: "Vitamin C 1000mg", 
        category: "vitamin", 
        price: 89999, 
        image: "https://msk.bb-shop.ru/image/cache/300-300/data/RavNutrition%20/vitc.png", 
        description: "Immunitetni mustahkamlovchi vitamin kompleksi." 
    },
    { 
        id: 4, 
        name: "Aspirin 100mg", 
        category: "yurak", 
        price: 101999, 
        image: "https://www.uralnii.ru/upload/iblock/c94/c94ec89a80654af40ec9a294c890365c.jpeg", 
        description: "Yurak-qon tomir kasalliklarining oldini olish uchun." 
    },
    { 
        id: 5, 
        name: "Biosulin", 
        category: "gormon", 
        price: 119990, 
        image: "https://cdn.rigla.ru/media/catalog/product/cache/afad95d7734d2fa6d0a8ba78597182b7/4/4/4459461-4-f-9-4-4f9440a90aa67f284cf7e4593474086f7d763daf_4459461.jpg", 
        description: "Qandli diabetni davolashda ishlatiladigan insulin preparati." 
    },
    { 
        id: 6, 
        name: "Oseltamivir", 
        category: "antivirus", 
        price: 129990, 
        image: "https://cdn.stolichki.ru/s/drugs/medium/76/76751_784645.png", 
        description: "Virusga qarshi preparat, grippni davolashda samarali." 
    },
    { 
        id: 7, 
        name: "Salbutamol", 
        category: "antibiotik", 
        price: 229990, 
        image: "https://s-zdorovie.ru/upload/resize_cache/iblock/634/1500_10000_15dee48d3b2619f9ecf06cd20c2a670fb/pjsujskx5pkqphvlwr8rioabxjzlfno1.png", 
        description: "Nafas yo'llari kasalliklarida bronxodilatator." 
    },
    { 
        id: 8, 
        name: "MIG 400", 
        category: "ogriq", 
        price: 29990, 
        image: "https://static.onlinetrade.ru/img/items/m/berlin_chemie_mig_400_tab._p.p.o._400mg_10_1102463_1.jpeg", 
        description: "Kuchli og'riq qoldiruvchi, migren uchun samarali." 
    },
    { 
        id: 9, 
        name: "Zodak", 
        category: "gormon", 
        price: 59990, 
        image: "https://uteka.ru/media/big/3/c7/3c7f21be40fdbe3c07d315bfe24a362e.jpg", 
        description: "Allergiyaga qarshi antigistamin preparat." 
    },
    { 
        id: 10, 
        name: "Ibuklin", 
        category: "ogriq", 
        price: 119990, 
        image: "https://cdn.rigla.ru/media/catalog/product/cache/afad95d7734d2fa6d0a8ba78597182b7/5/0/5004700-b-b-0-d-bb0d6073895221d319358cc6015c9bb13fc8b237_5004700.jpg", 
        description: "Yallig'lanishga qarshi va og'riq qoldiruvchi vosita." 
    },
    { 
        id: 11, 
        name: "Arbidol", 
        category: "antivirus", 
        price: 75000, 
        image: "https://cdn.stolichki.ru/s/drugs/medium/20/20343_821421.png", 
        description: "Immunostimulyator va antiviral preparat." 
    },
    { 
        id: 12, 
        name: "Vitamin D3", 
        category: "vitamin", 
        price: 35000, 
        image: "https://avatars.mds.yandex.net/i?id=c2802ac2942fc431e3d7c91e5f44433e7da1adf0-3920892-images-thumbs&n=13",
        description: "Suyak va immunitet tizimi uchun muhim vitamin." 
    }
];


function getProducts() {
    const stored = localStorage.getItem("products");
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.error("Products parse error", error);
        }
    }
    localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
}

function saveProduct(newProduct) {
    const products = getProducts();
    const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    newProduct.id = nextId;
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    return newProduct;
}

function updateProduct(updatedProduct) {
    const products = getProducts();
    const updatedList = products.map(product => {
        if (product.id === updatedProduct.id) {
            return { ...product, ...updatedProduct };
        }
        return product;
    });
    localStorage.setItem("products", JSON.stringify(updatedList));
    return updatedProduct;
}

function deleteProduct(productId) {
    const products = getProducts();
    const updatedList = products.filter(product => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(updatedList));
    return updatedList;
}


const DEFAULT_ORDERS = [
    { id: 101, customer: "Akbarjon", amount: 450000, status: "Yakunlangan", date: "2026-01-09" },
    { id: 102, customer: "Sardorjon", amount: 130000, status: "Jarayonda", date: "2026-01-05" },
    { id: 103, customer: "Feruza", amount: 250000, status: "Kutilyapti", date: "2025-09-26" }
];

function getOrders() {
    const stored = localStorage.getItem("orders");
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.error("Orders parse error", error);
        }
    }
    localStorage.setItem("orders", JSON.stringify(DEFAULT_ORDERS));
    return [...DEFAULT_ORDERS];
}

function saveOrder(newOrder) {
    const orders = getOrders();
    const nextId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 101;
    newOrder.id = nextId;
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
}


const DEFAULT_USERS = [
    { id: 1, name: "Admin", lastName: "User", email: "admin@medpharm.uz", username: "admin8", password: "12345678", role: "ustoz" },
    { id: 2, name: "John", lastName: "Doe", email: "john@example.com", username: "john", password: "1234", role: "o'quvchi" }
];

function getUsers() {
    const stored = localStorage.getItem("registeredUsers");
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem("registeredUsers", JSON.stringify(DEFAULT_USERS));
    return [...DEFAULT_USERS];
}

function saveUser(newUser) {
    const users = getUsers();
    newUser.id = users.length + 1;
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function deleteUser(userId) {
    const users = getUsers();
    const updatedList = users.filter(user => user.id !== userId);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedList));
    return updatedList;
}


function isLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
}

function getLoggedInUser() {
    const data = localStorage.getItem("loggedInUser");
    return data ? JSON.parse(data) : null;
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

function requireAuth(targetUrl) {
    if (isLoggedIn()) {
        window.location.href = targetUrl;
    } else {
        window.location.href = "signIn.html";
    }
}
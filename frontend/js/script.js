// ===== KING Store - JavaScript =====

// تحديث عدد المنتجات في السلة
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// إضافة منتج إلى السلة
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({...product, quantity: product.quantity || 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('تمت إضافة المنتج إلى السلة بنجاح! ✓');
}

// عرض إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// تحميل المنتجات المميزة في الصفحة الرئيسية
async function loadFeaturedProducts() {
    try {
        const response = await fetch('/api/products?limit=4');
        const products = await response.json();
        const container = document.getElementById('featuredProducts');
        
        if (container) {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <span class="price">${product.price} ريال</span>
                    <button class="btn btn-secondary btn-small" onclick="handleQuickAdd(${JSON.stringify(product).replace(/"/g, '&quot;')})">أضف للسلة</button>
                `;
                container.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('خطأ في تحميل المنتجات المميزة:', error);
    }
}

// إضافة سريعة من صفحة الرئيسية
function handleQuickAdd(product) {
    product.quantity = 1;
    addToCart(product);
}

// تحديث عدد السلة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

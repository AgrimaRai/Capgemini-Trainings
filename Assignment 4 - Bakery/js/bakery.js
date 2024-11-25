// Product Constructor
function BakeryItem(id, name, price, weight, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.image = image;
}

// Cart Constructor
function Cart() {
    this.items = [];
}

Cart.prototype.addItem = function(item) {
    console.log('Adding item:', item); // Debug log
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        this.items.push({ ...item, quantity: 1 });
    }
    console.log('Current cart items:', this.items); // Debug log
    this.updateCart();
};

Cart.prototype.removeItem = function(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateCart();
};

Cart.prototype.getTotal = function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

Cart.prototype.updateCart = function() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartContainer || !cartTotal) {
        console.error('Cart containers not found!');
        return;
    }

    cartContainer.innerHTML = this.items.map(item => `
        <div class="cart-item">
            <p>${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="cart.removeItem(${item.id})" class="remove-btn">Remove</button>
        </div>
    `).join('');
    
    cartTotal.textContent = `Total: ₹${this.getTotal().toFixed(2)}`;
    console.log('Cart updated:', this.items); // Debug log
};

// Sample products data
const bakeryProducts = [
    new BakeryItem(1, "Belgian Chocolate Cake", 899, "1.5 kg", 
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"),
    new BakeryItem(2, "Cheesy Butter Croissant", 89, "80 g", 
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500"),
    new BakeryItem(3, "Delicious Apple Pie", 599, "1 kg", 
        "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=500"),
    new BakeryItem(4, "Fresh Blueberry Muffin", 129, "120 g", 
        "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500"),
    new BakeryItem(5, "French Baguette", 79, "250 g", 
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500"),
    new BakeryItem(6, "New York Cheesecake", 799, "1.2 kg", 
        "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500")
];

// Initialize cart
const cart = new Cart();

// Display products
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) {
        console.error('Products container not found!');
        return;
    }

    productsContainer.innerHTML = bakeryProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" 
                onerror="this.src='https://raw.githubusercontent.com/Kalvium-Program/bakery-images/main/default-bakery.jpg'">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price.toFixed(2)}</p>
            <p>Weight: ${product.weight}</p>
            <button onclick="addToCart(${product.id})" class="add-btn">Add to Cart</button>
        </div>
    `).join('');
}

// Add this new function to handle adding items to cart
function addToCart(productId) {
    console.log('Adding product with ID:', productId); // Debug log
    const product = bakeryProducts.find(item => item.id === productId);
    if (product) {
        console.log('Found product:', product); // Debug log
        cart.addItem(product);
    } else {
        console.error('Product not found:', productId);
    }
}

// Initialize the application
window.onload = function() {
    console.log('Application initialized'); // Debug log
    displayProducts();
    // Verify cart initialization
    console.log('Cart initialized:', cart);
}; 
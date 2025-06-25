document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = [];

    function openCart() {
        cartSidebar.classList.add('is-open');
        cartOverlay.classList.add('is-visible');
    }

    function closeCart() {
        cartSidebar.classList.remove('is-open');
        cartOverlay.classList.remove('is-visible');
    }

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const img = button.getAttribute('data-img');

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, img, quantity: 1 });
            }

            updateCart();
        });
    });
    
    function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            totalItems += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item'; 
            
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="cart-item-remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    cartTotal.innerText = `$${total.toFixed(2)}`;
    cartCount.innerText = totalItems;
}

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };
    updateCart();
});
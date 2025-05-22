document.addEventListener('DOMContentLoaded', () => {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Menu items data
    const menuItems = {
        'Hot Coffee': [
            { name: 'Espresso', price: 100 },
            { name: 'Black Coffee', price: 90 },
            { name: 'Café Latte', price: 120 },
            { name: 'Cappuccino', price: 130 }
        ],
        'Cold Coffee': [
            { name: 'Cold Brew', price: 140 },
            { name: 'Frappe', price: 160 },
            { name: 'Iced Americano', price: 110 }
        ],
        'Tea': [
            { name: 'Masala Chai', price: 70 },
            { name: 'Green Tea', price: 80 },
            { name: 'Ginger Tea', price: 75 },
            { name: 'Cardamom Tea', price: 85 },
            { name: 'Tulsi Tea', price: 90 }
        ],
        'Desserts': [
            { name: 'Blueberry Cheesecake', price: 160 },
            { name: 'Caramel Pudding', price: 150 },
            { name: 'Choco Lava Cake', price: 170 },
            { name: 'Vanilla Ice Cream', price: 120 },
            { name: 'Brownie Sundae', price: 180 },
            { name: 'Chocolate Mousse', price: 160 },
            { name: 'Tiramisu', price: 200 }
        ]
    };

    // Function to update localStorage
    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to add item to cart
    function addToCart(itemName, itemPrice) {
        const existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        updateLocalStorage();
        updateCartDisplay();
    }

    // Function to clear cart
    function clearCart() {
        cart = [];
        updateLocalStorage();
        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-section');
        if (!cartContainer) return;

        const cartItemsDiv = cartContainer.querySelector('div');
        cartItemsDiv.innerHTML = '';

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        } else {
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                const itemElement = document.createElement('p');
                itemElement.textContent = `${item.name} x${item.quantity} - ₹${itemTotal}`;
                cartItemsDiv.appendChild(itemElement);
            });
            const totalElement = document.createElement('h3');
            totalElement.textContent = `Total: ₹${total}`;
            cartItemsDiv.appendChild(totalElement);
        }
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.menu-category button').forEach(button => {
        button.addEventListener('click', () => {
            const itemElement = button.parentElement;
            const itemName = itemElement.childNodes[0].textContent.trim();
            const itemPrice = parseInt(itemElement.childNodes[2].textContent.replace('₹', ''));
            addToCart(itemName, itemPrice);
        });
    });

    // Add event listener to "Clear Cart" button
    const clearCartButton = document.querySelector('.cart-section button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    // Add event listener to "View Cart" button
    const viewCartButton = document.querySelector('.view-cart-button');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', () => {
            window.location.href = 'CART.html';
        });
    }

    // Update cart display on page load
    updateCartDisplay();
});
function removeCartItem(productName, itemId) {
    fetch('/cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: productName })
    })
    .then(response => response.json())
    .then(data => {
        // Remove only the specific item from DOM
        document.getElementById('item-' + itemId).remove();
        
        // Update cart count and total
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            // If no items left, show empty cart message
            document.getElementById('cart-items').innerHTML = 
                '<div class="empty-cart-message">' +
                '<p>Your cart is empty</p>' +
                '<p><a href="/browse">Continue shopping</a></p>' +
                '</div>';
            document.querySelector('.cart-summary').style.display = 'none';
        } else {
            // Update the count
            document.querySelector('.cart-count').textContent = cartItems.length + 'x';
            
            // Recalculate total
            let total = 0;
            document.querySelectorAll('.cart-item-price').forEach(priceElement => {
                total += parseFloat(priceElement.textContent);
            });
            document.getElementById('cart-total-amount').textContent = total.toFixed(2);
        }
    });
}
let products = [];
        
// Fetch products when page loads
document.addEventListener('DOMContentLoaded', function() {
    // We'll simulate fetching products from the server
    // In a real app, you would fetch this from your Flask backend
    fetch('/static/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            // Initially show all products
            displaySearchResults(products);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            // Fallback to hardcoded products if fetch fails
            products = [
                {
                    "id": 1,
                    "name": "Eco Black",
                    "category": "Dress",
                    "material": "Recycled black",
                    "description": "Made from recycled materials, tear resistant",
                    "price": 89.99,
                    "image": "product1.jpg"
                },
                {
                    "id": 2,
                    "name": "Ocean Blue",
                    "category": "Dress",
                    "material": "Transparent",
                    "description": "Inspired by ocean waves, size: XS-XL",
                    "price": 75.50,
                    "image": "product2.jpg"
                },
                {
                    "id": 3,
                    "name": "News Print",
                    "category": "Skirt",
                    "material": "Recycled paper",
                    "description": "Made from recycled newspapers",
                    "price": 45.00,
                    "image": "product3.jpg"
                },
                {
                    "id": 4,
                    "name": "Green Leaf",
                    "category": "Top",
                    "material": "Organic cotton",
                    "description": "100% sustainable materials",
                    "price": 55.00,
                    "image": "product4.jpg"
                }
            ];
            displaySearchResults(products);
        });
    
    // Set up search input event listeners
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length > 0) {
            // Filter products based on search query
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.category.toLowerCase().includes(query) || 
                product.material.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
            
            // Display search results
            displaySearchResults(filteredProducts);
            
            // Show search suggestions
            displaySearchSuggestions(query);
        } else {
            // If search is empty, show all products
            displaySearchResults(products);
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target !== searchInput) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Show suggestions when focusing on search input
    searchInput.addEventListener('focus', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length > 0) {
            displaySearchSuggestions(query);
        }
    });
});

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No products found</div>';
        return;
    }
    
    let html = '';
    results.forEach(product => {
        html += `
            <div class="product-card">
                <div class="product-image">
                    <img src="/static/images/${product.image}" alt="${product.name}" onerror="this.src='/static/images/placeholder.jpg'" class="product-image">
                </div>
                <div class="product-details">
                    <div class="product-name">"${product.name}"</div>
                    <div class="product-category">Category: ${product.category}</div>
                    <div class="product-color">Material: ${product.material}</div>
                    <div class="product-price">Price: ${product.price} NOK</div>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

function displaySearchSuggestions(query) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    // Get unique categories, materials, etc. that match the query
    const categories = [...new Set(products
        .filter(p => p.category.toLowerCase().includes(query))
        .map(p => p.category))];
        
    const materials = [...new Set(products
        .filter(p => p.material.toLowerCase().includes(query))
        .map(p => p.material))];
        
    const names = [...new Set(products
        .filter(p => p.name.toLowerCase().includes(query))
        .map(p => p.name))];
    
    // Limit suggestions to top 5
    const suggestions = [
        ...names.map(name => ({ type: 'name', value: name })),
        ...categories.map(category => ({ type: 'category', value: category })),
        ...materials.map(material => ({ type: 'material', value: material }))
    ].slice(0, 5);
    
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    let html = '';
    suggestions.forEach(suggestion => {
        html += `
            <div class="suggestion-item" onclick="applySuggestion('${suggestion.value}')">
                <span class="suggestion-icon">🔍</span>
                <span>${suggestion.value}</span>
            </div>
        `;
    });
    
    suggestionsContainer.innerHTML = html;
    suggestionsContainer.style.display = 'block';
}

function applySuggestion(value) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = value;
    
    // Trigger the search
    const event = new Event('input', { bubbles: true });
    searchInput.dispatchEvent(event);
    
    // Hide suggestions
    document.getElementById('search-suggestions').style.display = 'none';
}
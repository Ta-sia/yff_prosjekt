document.addEventListener('DOMContentLoaded', function() {
    // animasjon for hoved side
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // vidIO
    const videoContainer = document.querySelector('.video-container');
    const watchBtn = document.querySelector('.watch-btn');
    
    if (videoContainer && watchBtn) {
        const overlay = document.createElement('div');
        overlay.classList.add('video-overlay');
        videoContainer.prepend(overlay);
        
        // Sjør video
        function playVideo() {
            // HAr skal vi lage code for kjøring video, men for det trenger vi å lage video
            // For demonstration
            const placeholderVideo = document.querySelector('.placeholder-video');
            placeholderVideo.innerHTML = '<p>Videoen spilles av...</p>';
            placeholderVideo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            placeholderVideo.style.padding = '20px';
            placeholderVideo.style.color = 'white';
            
            // Sletut video overlay
            overlay.remove();
        }
        
        // Kjør video på klikk
        videoContainer.addEventListener('click', function(e) {
            if (e.target !== watchBtn && !watchBtn.contains(e.target)) {
                playVideo();
            }
        });
        
        watchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            playVideo();
        });
    }
    
    // Bildekarusell
    const productsContainer = document.querySelector('.products-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const productCards = document.querySelectorAll('.product-card');
    
    if (leftArrow && rightArrow && productsContainer && productCards.length > 0) {
        const totalProducts = productCards.length; // 7
        const visibleProducts = 3;
        const cardWidth = productCards[0].offsetWidth + 20;
        let currentIndex = 0;

        // Kloner
        function setupInfiniteScroll() {
            for (let i = 0; i < visibleProducts; i++) {
                const firstClone = productCards[i].cloneNode(true);
                const lastClone = productCards[totalProducts - 1 - i].cloneNode(true);
                
                productsContainer.appendChild(firstClone);
                productsContainer.insertBefore(lastClone, productCards[0]);
            }
            
            productsContainer.scrollLeft = visibleProducts * cardWidth;
            
            setupCartButtons();
        }
        
        // Søppel
        function setupCartButtons() {
            const allAddToCartButtons = document.querySelectorAll('.add-to-cart');
            allAddToCartButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('h3').textContent;
                    const productPrice = productCard.querySelector('.price').textContent;
                    
                    const product = {
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    };
                    
                    addToCart(product);
                    
                    this.textContent = '✓';
                    setTimeout(() => {
                        this.textContent = '🛒';
                    }, 1000);
                });
            });
        }
        
        setupInfiniteScroll();
        
        function scrollLeft() {
            currentIndex--;
            
            productsContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
            
            if (currentIndex < 0) {
                setTimeout(() => {
                    productsContainer.scrollLeft = (totalProducts + currentIndex) * cardWidth;
                    currentIndex = totalProducts - 1;
                }, 300);
            }
        }
        
        function scrollRight() {
            currentIndex++;
            
            productsContainer.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
            
            if (currentIndex >= totalProducts) {
                setTimeout(() => {
                    productsContainer.scrollLeft = visibleProducts * cardWidth;
                    currentIndex = 0;
                }, 300);
            }
        }
        
        leftArrow.addEventListener('click', scrollLeft);
        rightArrow.addEventListener('click', scrollRight);
        
        productsContainer.addEventListener('scroll', function() {
        });
    }
    
    // Funksjon for å legge til produkt i handlekurv
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('ecoTrendCart')) || [];
        
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('ecoTrendCart', JSON.stringify(cart));
        
        updateCartCounter();
    }
    
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('ecoTrendCart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        console.log(`Varer i handlekurven din: ${totalItems}`);
    }
    
    // Tilbake melding
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (email && message) {
                // KONEKT MED SERVER HER, MEN I FREMTIDEN
                console.log('Send inn skjemaet:', { email, message });
                
                this.reset();
                alert('Takk for spørsmålet ditt! Vi vil kontakte deg så snart som mulig.');
            } else {
                alert('Vennligst fyll ut alle feltene i skjemaet.');
            }
        });
    }
});
// Shopping Cart
function addToCart(name, price) {
    fetch('/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}

function removeFromCart(name) {
    fetch('/cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    const videoContainer = document.querySelector('.video-container');
    const watchBtn = document.querySelector('.watch-btn');

    if (videoContainer && watchBtn) {
        const overlay = document.createElement('div');
        overlay.classList.add('video-overlay');
        videoContainer.prepend(overlay);

        // Bare kjør video én gang
        let videoStarted = false;

        function playVideo() {
            if (videoStarted) return;
            videoStarted = true;

            const placeholder = document.querySelector('.placeholder-video');
            placeholder.innerHTML = `
                <video width="640" height="360" controls autoplay>
                    <source src="../static/video/EcoTrend Webside Reklame.MOV" type="video/mp4">
                    Nettleseren din støtter ikke HTML5 video.
                </video>
            `;

            overlay.remove();
        }

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
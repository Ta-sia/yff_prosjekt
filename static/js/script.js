document.addEventListener('DOMContentLoaded', function() {
    // Анимация элементов при загрузке страницы
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Функциональность видео
    const videoContainer = document.querySelector('.video-container');
    const watchBtn = document.querySelector('.watch-btn');
    
    if (videoContainer && watchBtn) {
        // Добавляем оверлей для видео
        const overlay = document.createElement('div');
        overlay.classList.add('video-overlay');
        videoContainer.prepend(overlay);
        
        // Функция для запуска видео
        function playVideo() {
            // В реальном проекте здесь будет код для запуска видео
            // Для демонстрации просто меняем стиль и текст
            const placeholderVideo = document.querySelector('.placeholder-video');
            placeholderVideo.innerHTML = '<p>Видео воспроизводится...</p>';
            placeholderVideo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            placeholderVideo.style.padding = '20px';
            placeholderVideo.style.color = 'white';
            
            // Удаляем оверлей
            overlay.remove();
        }
        
        // Запуск видео по клику на контейнер или кнопку
        videoContainer.addEventListener('click', function(e) {
            // Проверяем, что клик был не на кнопке (чтобы избежать двойного срабатывания)
            if (e.target !== watchBtn && !watchBtn.contains(e.target)) {
                playVideo();
            }
        });
        
        watchBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            playVideo();
        });
    }
    
    // Функциональность слайдера продуктов
    const productsContainer = document.querySelector('.products-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const productCards = document.querySelectorAll('.product-card');
    
    if (leftArrow && rightArrow && productsContainer && productCards.length > 0) {
        // Расчет ширины для прокрутки (показываем по 3 карточки)
        const cardWidth = productCards[0].offsetWidth + 20; // Ширина карточки + отступ
        const visibleCards = 3; // Количество видимых карточек
        let currentIndex = 0;
        const maxIndex = productCards.length - visibleCards;
        
        // Функция для обновления видимости стрелок
        function updateArrowsVisibility() {
            leftArrow.style.visibility = currentIndex <= 0 ? 'hidden' : 'visible';
            rightArrow.style.visibility = currentIndex >= maxIndex ? 'hidden' : 'visible';
        }
        
        // Инициализация видимости стрелок
        updateArrowsVisibility();
        
        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                productsContainer.scrollTo({
                    left: cardWidth * currentIndex,
                    behavior: 'smooth'
                });
                updateArrowsVisibility();
            }
        });
        
        rightArrow.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                productsContainer.scrollTo({
                    left: cardWidth * currentIndex,
                    behavior: 'smooth'
                });
                updateArrowsVisibility();
            }
        });
    }
    
    // Добавление товара в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Предотвращаем всплытие события
            
            // Получаем информацию о товаре
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Создаем объект товара
            const product = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
            
            // Сохраняем в localStorage (имитация корзины)
            addToCart(product);
            
            // Анимация добавления в корзину
            this.textContent = '✓';
            setTimeout(() => {
                this.textContent = '🛒';
            }, 1000);
        });
    });
    
    // Функция для добавления товара в корзину
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('ecoTrendCart')) || [];
        
        // Проверяем, есть ли уже такой товар в корзине
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        
        if (existingProductIndex > -1) {
            // Если товар уже есть, увеличиваем количество
            cart[existingProductIndex].quantity += 1;
        } else {
            // Если товара нет, добавляем его
            cart.push(product);
        }
        
        // Сохраняем обновленную корзину
        localStorage.setItem('ecoTrendCart', JSON.stringify(cart));
        
        // Обновляем счетчик товаров в корзине (если он есть)
        updateCartCounter();
    }
    
    // Функция для обновления счетчика товаров в корзине
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('ecoTrendCart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Здесь можно добавить код для обновления счетчика в интерфейсе
        console.log(`Товаров в корзине: ${totalItems}`);
    }
    
    // Форма обратной связи
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (email && message) {
                // Здесь будет код для отправки данных на сервер
                // В будущем можно интегрировать с Python
                console.log('Отправка формы:', { email, message });
                
                // Очищаем форму и показываем сообщение об успехе
                this.reset();
                alert('Спасибо за ваш вопрос! Мы свяжемся с вами в ближайшее время.');
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }
});
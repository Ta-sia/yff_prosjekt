document.addEventListener('DOMContentLoaded', function() {
    // Анимация элементов при загрузке страницы
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Функциональность слайдера продуктов
    const productsContainer = document.querySelector('.products-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const productCards = document.querySelectorAll('.product-card');
    
    if (leftArrow && rightArrow && productsContainer) {
        // Расчет ширины для прокрутки
        const cardWidth = productCards[0].offsetWidth + 20; // Ширина карточки + отступ
        
        leftArrow.addEventListener('click', () => {
            productsContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
        
        rightArrow.addEventListener('click', () => {
            productsContainer.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
    }
    
    // Добавление товара в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
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
    
    // Подготовка для будущей интеграции с Python
    // Функция для получения данных с сервера
    async function fetchDataFromServer(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            return null;
        }
    }
    
    // Пример использования (закомментирован для будущего использования)
    /*
    fetchDataFromServer('/api/products')
        .then(data => {
            if (data) {
                // Обработка полученных данных
                console.log('Получены данные о продуктах:', data);
            }
        });
    */
});
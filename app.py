# Простой Python файл для будущей интеграции
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

# Заглушка для данных о продуктах (в будущем можно заменить на базу данных)
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
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/startside')
def startside():
    return render_template('startside.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

# API для получения данных о продуктах
@app.route('/api/products')
def get_products():
    return jsonify(products)

# API для получения данных о конкретном продукте
@app.route('/api/products/<int:product_id>')
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# API для обработки формы обратной связи
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # Здесь можно добавить код для сохранения данных или отправки email
    print(f"Получено сообщение от {data.get('email')}: {data.get('message')}")
    return jsonify({"success": True, "message": "Message received"})

if __name__ == '__main__':
    app.run(debug=True)
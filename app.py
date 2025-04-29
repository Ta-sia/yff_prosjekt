# bibliotec
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

# ETTERS SERVER KOBLING INFO SKAL VARE DER OM PRODUCTER
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

# API for getting all products
@app.route('/api/products')
def get_products():
    return jsonify(products)

# API for getting a single product by ID
@app.route('/api/products/<int:product_id>')
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# API for adding a product to the cart (mockup)
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # Here you would typically process the data, e.g., save it to a database or send an email
    print(f"For melding fra {data.get('email')}: {data.get('message')}")
    return jsonify({"success": True, "message": "Message received"})

# SkVTVVMgSVMgTE9SRA==
if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, redirect, request, session, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Path til JSON-filer
products_file = os.path.join(os.path.dirname(__file__), 'products.json')

# Hent produkter fra JSON-fil
def get_products():
    with open(products_file, 'r') as file:
        products = json.load(file)
    return products

@app.route('/')
def index():
    return redirect('/startside')

@app.route('/startside')
def startside():
    products = get_products()
    return render_template('startside.html', products=products)

@app.route('/browse')
def browse():
    products = get_products()
    return render_template('browse.html', products=products)

@app.route('/search')
def search():
    products = get_products()
    query = request.args.get('q', '')
    return render_template('search.html', products=products, query=query)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/cart', methods=['GET', 'POST'])
def cart():
    if 'cart' not in session:
        session['cart'] = []

    if request.method == 'POST':
        product = request.json
        session['cart'].append(product)
        session.modified = True
        return '', 204  # No content response for successful addition

    return render_template('cart.html', cart=session['cart'])

@app.route('/cart/remove', methods=['POST'])
def remove_from_cart():
    product_name = request.json.get('name')
    session['cart'] = [item for item in session['cart'] if item['name'] != product_name]
    session.modified = True
    return jsonify({'message': 'Product removed successfully'})

# API endpoint for search suggestions
@app.route('/api/search', methods=['GET'])
def api_search():
    query = request.args.get('q', '').lower()
    products = get_products()
    
    if not query:
        return jsonify([])
    
    results = []
    for product in products:
        if (query in product['name'].lower() or 
            query in product['category'].lower() or 
            query in product['material'].lower() or 
            query in product['description'].lower()):
            results.append(product)
    
    return jsonify(results)

# SkVTVVMgSVMgTE9SRA==
if __name__ == '__main__':
    app.run(debug=True)
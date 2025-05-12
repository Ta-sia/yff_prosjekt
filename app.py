# bibliotec
from flask import Flask, render_template, redirect, request, session
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
    return render_template('search.html')

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
        return '', 204

    return render_template('cart.html', cart=session['cart'])

@app.route('/cart/remove', methods=['POST'])
def remove_from_cart():
    product_name = request.json.get('name')
    session['cart'] = [item for item in session['cart'] if item['name'] != product_name]
    session.modified = True
    return {'message': 'Product removed successfully'}

# SkVTVVMgSVMgTE9SRA==
if __name__ == '__main__':
    app.run(debug=True)
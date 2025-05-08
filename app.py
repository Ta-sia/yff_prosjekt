# bibliotec
from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

products_file = os.path.join(os.path.dirname(__file__), 'products.json')

# Hent produkter fra JSON-fil
def get_products():
    with open(products_file, 'r') as file:
        products = json.load(file)
    return products

@app.route('/')
def index():
    products = get_products()
    return render_template('browse.html', products=products)

@app.route('/startside')
def startside():
    products = get_products()
    return render_template('startside.html', products=products)

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

# SkVTVVMgSVMgTE9SRA==
if __name__ == '__main__':
    app.run(debug=True)
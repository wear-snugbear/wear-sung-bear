from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
# CORS allows your React app to talk to this server
CORS(app)

# 1. Homepage route so you don't get a 404 when testing in browser
@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "success", "message": "Snugbear Backend is running!"})

# 2. API route to serve your JSON data
@app.route('/api/products', methods=['GET'])
def get_products():
    # Looks for products.json in the same folder as app.py
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'products.json')
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Runs on port 5000
    app.run(debug=True, port=5000)
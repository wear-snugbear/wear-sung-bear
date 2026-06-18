from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import uuid
import smtplib
from datetime import datetime
from email.message import EmailMessage
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables (ensure your .env file is in the backend folder)
load_dotenv()

app = Flask(__name__)
CORS(app)

# --- Database Setup ---
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(
    mongo_uri,
    tls=True,
    tlsAllowInvalidCertificates=True, # Bypasses strict cert validation
    tlsAllowInvalidHostnames=True,   # Bypasses hostname checking
    serverSelectionTimeoutMS=5000,   # Shorter timeout to fail fast
    connectTimeoutMS=10000,
    socketTimeoutMS=10000
)

# Test the connection immediately on startup
try:
    client.admin.command('ping')
    print("Connection to MongoDB established successfully!")
except Exception as e:
    print(f"Connection Error: {e}")

db = client['snugbear_db']

# --- Configuration ---
EMAIL_ADDRESS = os.getenv('EMAIL_USER', 'ruhela.kritika777@gmail.com')
EMAIL_PASSWORD = os.getenv('EMAIL_PASS', 'rgahdwwyyeoifmvo')

def send_order_confirmation(user_email, order_id):
    if not user_email: return
    
    msg = EmailMessage()
    msg['Subject'] = 'Order Confirmed! - Snugbear Store 🧸'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = user_email
    
    html_content = f"""
    <html>
      <body style="font-family: sans-serif; color: #4D3A2A;">
        <h2>Yay! Your Snuggles are on the way! 🧸</h2>
        <p>Your order (ID: <strong>{order_id}</strong>) has been placed successfully.</p>
        <a href="http://localhost:5173/track-order" style="background: #6D442C; color: white; padding: 10px; text-decoration: none; border-radius: 5px;">Track Order</a>
      </body>
    </html>
    """
    msg.add_alternative(html_content, subtype='html')
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
    except Exception as e:
        print(f"SMTP Error: {e}")

# --- Routes ---

@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(db.products.find({}, {'_id': 0})) 
    return jsonify(products)

@app.route('/api/checkout', methods=['POST'])
def checkout():
    order = request.get_json()
    if not order: return jsonify({"error": "No data"}), 400
    
    # Adding metadata for professional management
    order['order_id'] = str(uuid.uuid4())[:8]
    order['status'] = 'Processing'
    order['created_at'] = datetime.utcnow()
    
    db.orders.insert_one(order)
    send_order_confirmation(order.get('email'), order['order_id'])
    
    return jsonify({"message": "Order placed!", "order_id": order['order_id']}), 201

@app.route('/api/orders/<email>', methods=['GET'])
def get_orders_by_email(email):
    # Sorting by date (newest first)
    user_orders = list(db.orders.find({"email": {"$regex": email, "$options": "i"}}, {'_id': 0}).sort("created_at", -1))
    return jsonify(user_orders)

@app.route('/api/admin/orders', methods=['GET'])
def get_all_orders():
    # Fetch all orders sorted by date
    orders = list(db.orders.find({}, {'_id': 0}).sort("created_at", -1))
    return jsonify(orders)

@app.route('/api/admin/orders/<order_id>', methods=['PATCH'])
def update_order(order_id):
    data = request.get_json()
    result = db.orders.update_one({"order_id": order_id}, {"$set": {"status": data.get('status')}})
    
    if result.modified_count > 0:
        return jsonify({"message": "Status updated"}), 200
    return jsonify({"error": "Order not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
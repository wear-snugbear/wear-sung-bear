from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import uuid
import smtplib
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)

# --- Configuration ---
# REMEMBER: Use an App Password if using Gmail!
EMAIL_ADDRESS = 'your-email@gmail.com' 
EMAIL_PASSWORD = 'your-app-password' 

def get_data_path(filename):
    return os.path.join(os.path.dirname(__file__), 'data', filename)

def send_order_confirmation(user_email, order_id):
    """Sends a confirmation email to the user."""
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD or EMAIL_PASSWORD == 'your-app-password':
        print("Skipping email: Configuration missing.")
        return

    msg = EmailMessage()
    msg['Subject'] = 'Order Confirmed! - Snugbear Store 🧸'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = user_email
    
    track_link = f"http://localhost:5173/track-order" 
    
    msg.set_content(f"""
    Hi there! 
    
    Your order has been placed successfully! 
    Your Order ID is: {order_id}
    
    You can track your order status here: {track_link}
    
    Thank you for shopping with Snugbear!
    """)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
            print(f"Confirmation email sent to {user_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "success", "message": "Snugbear Backend is running!"})

@app.route('/api/products', methods=['GET'])
def get_products():
    file_path = get_data_path('products.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/checkout', methods=['POST'])
def checkout():
    order = request.json
    order['order_id'] = str(uuid.uuid4())[:8] 
    
    file_path = get_data_path('orders.json')
    
    # Load/Create order list
    orders = []
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                orders = json.load(f)
        except:
            orders = []
            
    orders.append(order)
    
    try:
        # Save to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(orders, f, indent=4)
        
        # Trigger email (now safe due to config check inside the function)
        send_order_confirmation(order['email'], order['order_id'])
        
        return jsonify({"message": "Order placed!", "order_id": order['order_id']}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders/<email>', methods=['GET'])
def get_orders_by_email(email):
    file_path = get_data_path('orders.json')
    if not os.path.exists(file_path):
        return jsonify([]), 200
        
    with open(file_path, 'r', encoding='utf-8') as f:
        orders = json.load(f)
    
    user_orders = [o for o in orders if o.get('email') == email]
    return jsonify(user_orders)

if __name__ == '__main__':
    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    app.run(debug=True, port=5000)
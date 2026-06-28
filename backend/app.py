from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import uuid
import smtplib
from datetime import datetime, timezone
from email.message import EmailMessage
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- Database Setup ---
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri, tls=True, tlsAllowInvalidCertificates=True)
db = client['snugbear_db']

# --- Email Configuration ---
EMAIL_ADDRESS = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASS')

def send_order_confirmation(user_email, order_id):
    if not user_email or not EMAIL_ADDRESS or not EMAIL_PASSWORD:
        return

    msg = EmailMessage()
    msg['Subject'] = 'Order Confirmed! - Snugbear Store 🧸'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = user_email
    
    # Modern, framed HTML email template
    html_content = f"""
    <html>
      <body style="font-family: 'Segoe UI', sans-serif; color: #4D3A2A; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #6D442C;">Yay! Your Snuggles are on the way! 🧸</h2>
        <p>Hi there,</p>
        <p>Your order (ID: <strong>{order_id}</strong>) has been placed successfully and is now being prepared for shipment.</p>
        <div style="margin: 25px 0;">
            <a href="https://wear-snug-bear.netlify.app/track-order" 
               style="background: #FF8580; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Track Your Order
            </a>
        </div>
        <p>Thank you for shopping with us!</p>
        <p>Warmly,<br><strong>The Snugbear Team</strong></p>
      </body>
    </html>
    """
    msg.add_alternative(html_content, subtype='html')
    
    try:
        with smtplib.SMTP('smtp.gmail.com', 587, timeout=10) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
            print(f"Professional confirmation email sent to {user_email}")
    except Exception as e:
        print(f"SMTP Error: {e}")
# --- Routes ---

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Snugbear Backend is running!"})

@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(db.products.find({}, {'_id': 0})) 
    return jsonify(products)

@app.route('/api/checkout', methods=['POST', 'OPTIONS'])
def checkout():
    if request.method == "OPTIONS":
        return jsonify({}), 200
        
    order = request.json 
    if not order:
        return jsonify({"error": "No data provided"}), 400

    # Calculate total
    # In app.py - inside the checkout route
    if 'total' not in order or order['total'] == 0:
        order['total'] = sum(float(item.get('price', 0)) * int(item.get('quantity', 1)) for item in order.get('cart', []))
    
    order['order_id'] = str(uuid.uuid4())[:8]
    order['status'] = 'Processing'
    order['created_at'] = datetime.now(timezone.utc)
    
    # Save to Database
    try:
        db.orders.insert_one(order)
    except Exception as e:
        return jsonify({"error": "Database error"}), 500
    
    # --- ADD THIS BACK: Trigger the email function ---
    try:
        send_order_confirmation(order.get('email'), order['order_id'])
    except Exception as e:
        print(f"Email failed, but order saved: {e}")
    # --------------------------------------------------
    
    return jsonify({"message": "Order created!", "tracking_id": order['order_id']}), 201

@app.route('/api/orders/<email>', methods=['GET'])
def get_orders_by_email(email):
    user_orders = list(db.orders.find({"email": {"$regex": email, "$options": "i"}}, {'_id': 0}).sort("created_at", -1))
    return jsonify(user_orders)

@app.route('/api/admin/orders', methods=['GET'])
def get_all_orders():
    orders = list(db.orders.find({}, {'_id': 0}).sort("created_at", -1))
    return jsonify(orders)

@app.route('/api/admin/orders/<order_id>', methods=['PATCH'])
def update_order(order_id):
    data = request.get_json()
    result = db.orders.update_one({"order_id": order_id}, {"$set": {"status": data.get('status')}})
    if result.modified_count > 0:
        return jsonify({"message": "Status updated"}), 200
    return jsonify({"error": "Order not found"}), 404

# Route to submit the form
@app.route('/api/community/founding-circle', methods=['POST', 'OPTIONS'])
def founding_circle():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    data = request.json
    try:
        db.founding_circle.insert_one({
            "order_id": data.get('order_id', 'N/A'),
            "email": data.get('email'),
            "instagram": data.get('instagram', 'N/A'),
            "productName": "Pending Selection", # Default value for community signups
            "submitted_at": datetime.now(timezone.utc)
        })
        return jsonify({"message": "Successfully joined!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# The claim_gift route you already have is fine! 
# It saves to founding_circle with "order_id": "Gift-Claimed"

# # Route for Admin to see the entries
# @app.route('/api/admin/founding-circle', methods=['GET'])
# def get_founding_circle():
#     entries = list(db.founding_circle.find({}, {'_id': 0}).sort("submitted_at", 1))
#     return jsonify(entries)

@app.route('/api/offers', methods=['GET'])
def get_current_offer():
    # Adding {'_id': 0} ensures it doesn't break JSON serialization
    offer = db.offers.find_one({"is_active": True}, {'_id': 0})
    
    # Handle case where no offer is found
    if not offer:
        return jsonify({"active_offer": "No active offers", "description": "Check back later!"}), 404
        
    return jsonify(offer)

@app.route('/api/claim-gift', methods=['POST', 'OPTIONS'])
def claim_gift():
    if request.method == "OPTIONS": return jsonify({}), 200
    
    data = request.json
    email = data.get('email')
    
    # Try to find an existing entry by email and update it
    result = db.founding_circle.update_one(
        {"email": email}, 
        {
            "$set": {
                "productName": data.get('productName'),
                "productId": data.get('productId'),
                "claimed_at": datetime.now(timezone.utc)
            }
        }
    )
    
    # If no existing entry was found by email, insert a new one
    if result.matched_count == 0:
        db.founding_circle.insert_one({
            "email": email,
            "productName": data.get('productName'),
            "productId": data.get('productId'),
            "order_id": data.get('order_id', 'N/A'),
            "instagram": data.get('instagram', 'N/A'),
            "claimed_at": datetime.now(timezone.utc)
        })
        
    return jsonify({"message": "Success"}), 200

@app.route('/api/admin/claimed-gifts', methods=['GET'])
def get_claimed_gifts():
    # Retrieves all documents from the 'claimed_gifts' collection
    gifts = list(db.claimed_gifts.find({}, {'_id': 0}).sort("claimed_at", -1))
    return jsonify(gifts)


@app.route('/api/admin/founding-circle', methods=['GET'])
def get_founding_circle():
    # Pymongo: Fetching from MongoDB
    entries = list(db.founding_circle.find({}, {'_id': 0}))
    return jsonify(entries)

# Route for Admin to clear Claimed Gifts
# Route for Admin to clear Claimed Gifts
@app.route('/api/admin/reset-claimed-gifts', methods=['DELETE'])
def reset_claimed_gifts():
    db.claimed_gifts.delete_many({}) 
    return jsonify({"message": "Claimed gifts cleared successfully!"}), 200

# Route for Admin to clear Founding Circle
@app.route('/api/admin/reset-founding-circle', methods=['DELETE'])
def reset_founding_circle():
    db.founding_circle.delete_many({})
    return jsonify({"message": "Founding Circle cleared successfully!"}), 200

if __name__ == '__main__':
    # Render will provide a PORT environment variable. 
    # If not provided (like when running locally), default to 5000.
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
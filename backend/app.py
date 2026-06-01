from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql://king_user:king_password_123@db:5432/king_store'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ===== Models =====
class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255))
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'image': self.image,
            'stock': self.stock
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(100), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'customer_email': self.customer_email,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }

# ===== API Routes =====

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running! 👑'})

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        limit = request.args.get('limit', None, type=int)
        category = request.args.get('category', None, type=str)
        
        query = Product.query
        
        if category:
            query = query.filter_by(category=category)
        
        if limit:
            products = query.limit(limit).all()
        else:
            products = query.all()
        
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'المنتج غير موجود'}), 404
        return jsonify(product.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        new_product = Product(
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            category=data.get('category'),
            image=data.get('image'),
            stock=data.get('stock', 0)
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        new_order = Order(
            customer_name=data.get('customer_name'),
            customer_email=data.get('customer_email'),
            total_price=data.get('total_price')
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'error': 'الطلب غير موجود'}), 404
        return jsonify(order.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== Error Handlers =====
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'الصفحة غير موجودة'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'خطأ في الخادم'}), 500

# ===== Initialize Database =====
def init_db():
    with app.app_context():
        db.create_all()
        # Add sample products
        if Product.query.count() == 0:
            sample_products = [
                Product(
                    name='KING Classic T-Shirt',
                    description='تي شيرت كلاسيكي مطبوع باسم KING',
                    price=99.99,
                    category='men',
                    image='https://via.placeholder.com/300x300?text=KING+T-Shirt',
                    stock=50
                ),
                Product(
                    name='KING Premium Hoodie',
                    description='هودي فاخرة مطبوعة باسم KING',
                    price=199.99,
                    category='men',
                    image='https://via.placeholder.com/300x300?text=KING+Hoodie',
                    stock=30
                ),
                Product(
                    name='KING Women Dress',
                    description='فستان نسائي أنيق مطبوع باسم KING',
                    price=149.99,
                    category='women',
                    image='https://via.placeholder.com/300x300?text=KING+Dress',
                    stock=25
                ),
                Product(
                    name='KING Kids Collection',
                    description='ملابس أطفال مريحة مطبوعة باسم KING',
                    price=79.99,
                    category='kids',
                    image='https://via.placeholder.com/300x300?text=KING+Kids',
                    stock=40
                ),
                Product(
                    name='KING Baseball Cap',
                    description='قبعة بيسبول مطبوعة باسم KING',
                    price=59.99,
                    category='accessories',
                    image='https://via.placeholder.com/300x300?text=KING+Cap',
                    stock=60
                )
            ]
            for product in sample_products:
                db.session.add(product)
            db.session.commit()

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)

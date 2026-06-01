-- Create KING Store Database

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255),
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data
INSERT INTO products (name, description, price, category, image, stock) VALUES
    ('KING Classic T-Shirt', 'تي شيرت كلاسيكي مطبوع باسم KING', 99.99, 'men', 'https://via.placeholder.com/300x300?text=KING+T-Shirt', 50),
    ('KING Premium Hoodie', 'هودي فاخرة مطبوعة باسم KING', 199.99, 'men', 'https://via.placeholder.com/300x300?text=KING+Hoodie', 30),
    ('KING Women Dress', 'فستان نسائي أنيق مطبوع باسم KING', 149.99, 'women', 'https://via.placeholder.com/300x300?text=KING+Dress', 25),
    ('KING Kids Collection', 'ملابس أطفال مريحة مطبوعة باسم KING', 79.99, 'kids', 'https://via.placeholder.com/300x300?text=KING+Kids', 40),
    ('KING Baseball Cap', 'قبعة بيسبول مطبوعة باسم KING', 59.99, 'accessories', 'https://via.placeholder.com/300x300?text=KING+Cap', 60);

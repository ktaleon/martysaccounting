CREATE DATABASE capstone;

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE product(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date_added DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_name VARCHAR(255) NOT NULL,
    product_size VARCHAR(255) NOT NULL,
    product_type VARCHAR(255),
    product_package VARCHAR(255),
    product_price INTEGER NOT NULL
);
('', '', '', '', ),
ALTER TABLE product ADD new_column_name column_definition;
INSERT INTO product ()
INSERT INTO product (product_name, product_size, product_type, product_package, product_price) 
VALUES ('longganisa', 'regular', 'original', 'pack', 24),
('longganisa', 'regular', 'spicy', 'pack', 25),
('longganisa large', 'large', 'original', 'pack', 28),
('longganisa', 'large', 'spicy', 'pack', 30),
('longganisa', 'regular', 'smoked', 'pack', 25),
('longganisa', 'regular', 'original', 'tie', 32),
('longganisa', 'large', 'original', 'tie', 36),
('longganisa', 'regular', 'spicy', 'tie', 34),
('longganisa', 'large', 'spicy', 'tie', 38),
('chorizo', 'small', 'original', 'tie', 44),
('chorizo', 'large', 'original', 'tie', 44),
('chorizo', 'large', 'spicy', 'tie', 46),
('lumpia', 'regular', 'original', 'pack', 35),
('chicharon', 'regular', 'original', 'pack', 13);

SELECT id FROM product WHERE product_name = '${product_name}' AND product_size = '${product_size}' AND product_type = '${product_type}' AND product_package = '${product_package}' 

CREATE TABLE productsold(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date_sold DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    amount_sold INTEGER NOT NULL,
    product_id uuid NOT NULL,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
            REFERENCES "product" (id),
    user_id uuid NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES "users" (id)
);

CREATE TABLE expenses(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date_added DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ingredients INTEGER NOT NULL,
    salary INTEGER NOT NULL,
    utilities INTEGER NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES "users" (id)
);
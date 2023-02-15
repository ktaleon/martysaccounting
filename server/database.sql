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

CREATE TABLE productsold(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_of_sale SERIAL NOT NULL,
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
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwtGenerator = require("./utils/jwtGenerator");
const validInfo = require("./middleware/validinfo");
const authorization = require("./middleware/authorization");

//middleware//
app.use(cors());
app.use(express.json());

//Routes//
//Create User Account//
app.post("/register", validInfo, async (req, res) => {
    try {
        const {first_name, last_name, user_email, user_password} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE user_email = '${user_email}'`);
        if(user.rows.length !== 0){
            return res.status(401).send("user already exists");
        };

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(user_password, salt);

        const newUser = await pool.query
        (`INSERT INTO users (first_name,last_name,user_email,user_password) VALUES ('${first_name}', '${last_name}', '${user_email}', '${bcryptPassword}') RETURNING *`);

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});
    }
    catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Login User Account//
app.post("/login", validInfo, async (req, res) => {
    try {
        const {user_email, user_password} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE user_email = '${user_email}'`);

        if (user.rows.length === 0){
            return res.status(401). json("Password or Email is incorrect");
        }
        
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
        
        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect");
        }
        const token = jwtGenerator(user.rows[0].id);

        res.json({token});
        console.log({token});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//Authorization
app.get("/is-verify", authorization, async (req, res)  => {
    try {
        res.json(true);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

//Products Route
app.post("/products", authorization, async (req, res) => {
    try {
        const {product_name, product_size, product_type, product_package, amount_sold} = req.body;
        const products = await pool.query(`SELECT id FROM product WHERE product_name = '${product_name}' AND product_size = '${product_size}' AND product_type = '${product_type}' AND product_package = '${product_package}'`);
        res.json(products.rows[0].id);
        const sold = await pool.query(`INSERT INTO productsold (amount_sold,product_id,user_id) VALUES ('${amount_sold}', '${products.rows[0].id}', '${req.user}') RETURNING *`);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

app.get("/products", authorization, async (req, res) => {
    try {
        const product = await pool.query(`SELECT * FROM product`);
        res.json(product.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
});

app.post("/expenses", authorization, async (req, res) => {
    try {
        const {ingredients, salary, utilities} = req.body;
        console.log(req.body)
        const expenses = await pool.query(`INSERT INTO expenses (ingredients, salary, utilities, user_id) VALUES ('${ingredients}', '${salary}', '${utilities}', '${req.user}') RETURNING *`);
        console.log(expenses.rows[0])
        res.json(expenses.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})
app.get("/expenses", authorization, async (req, res) => {
    try {
        const expenses = await pool.query(`SELECT * FROM expenses`);
        res.json(expenses.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.get("/data",authorization, async (req, res) => {
    try{
        const productsold = await pool.query(`SELECT * FROM productsold INNER JOIN product ON product.id = productsold.product_id`);
        // const expenses = await pool.query(`SELECT * FROM expenses`);
        // const product = await pool.query(`SELECT * FROM product`);
        // if (product.rows.id === productsold.rows.product_id) {
        //     console.log(product.rows.product_price)
        //     res.json(product.rows.product_price)
        // }
        console.log(productsold.rows)
        res.json(productsold.rows);
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }1
});
app.get("/id", authorization, async (req, res) => {
    try {
        const user = await pool.query(`SELECT user_id FROM users WHERE user_id = '${req.user}'`);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
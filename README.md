Hello! My Name is Karl Taleon and This is my Capstone Project, Marty's Accounting System.

The Purpose of this project is to provide my father's small business a simple accounting system that any of his employees can use.

Features:

1. Login system for the owner and employees.
2. Graph that shows data on how much is being sold per day
3. Full list of Products and can also add more products in the future.
4. Inputs for daily sold products.
5. Inputs for expenses.

Technologies Used:

- React
- NodeJS
- JavaScript
- HTML
- CSS
- ChartJS
- PostgreSQL
- Toastify

Installation Instructions:

# Clone The Repository

# Open in Visual Studio

# Install the Dependencies for Server

    - Open Terminal
    - CD into server
    - Type into the command line "npm init"
    - Press enter until completed
    - Type into the command line "npm i express pg cors"

# Create a local Database

    - Open SQL shell
    - Login to your database
    - Open the 'database.sql' file
    - Copy 'CREATE DATABASE capstone;' and paste into the command line of SQL shell. (note: you can change "capstone" to anything you want)
    - After creating the database type into the command line "\c capstone" (or your custom name of the database)
    - Individually Copy all the CREATE TABLEs from the 'database.sql' file into the command line to create your tables

# Conneting the Database and the Server

    - Create a 'db.js' file
    - Copy and paste the following into your 'db.js' file:

        const Pool = require('pg').Pool;

        const pool = new Pool({
            user: '(your postgres username)',
            password: '(your postgres password)',
            host: 'localhost',
            port: 5432,
            database: 'capstone',
        });

        module.exports = pool;

# Install the dependencies for Client

    - Open a new terminal
    - CD into client
    - Type into the command line 'npm install'

# Turning on the project

    - Open a new terminal
    - CD into server
    - type into the command line 'nodemon start'
    - Open a new terminal
    - CD into client
    - type into the command line 'npm start'

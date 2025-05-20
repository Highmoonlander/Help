-- Create database
CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    category VARCHAR(50),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample books
INSERT INTO books (title, author, price, description, image_url, category, stock) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 'A classic novel about the American Dream', 'images/gatsby.jpg', 'Fiction', 25),
('To Kill a Mockingbird', 'Harper Lee', 10.99, 'A novel about racial injustice', 'images/mockingbird.jpg', 'Fiction', 30),
('1984', 'George Orwell', 9.99, 'A dystopian novel', 'images/1984.jpg', 'Science Fiction', 20),
('The Hobbit', 'J.R.R. Tolkien', 14.99, 'A fantasy novel', 'images/hobbit.jpg', 'Fantasy', 15),
('Pride and Prejudice', 'Jane Austen', 8.99, 'A romantic novel', 'images/pride.jpg', 'Romance', 22),
('The Catcher in the Rye', 'J.D. Salinger', 11.99, 'A coming-of-age novel', 'images/catcher.jpg', 'Fiction', 18),
('The Lord of the Rings', 'J.R.R. Tolkien', 24.99, 'An epic fantasy trilogy', 'images/lotr.jpg', 'Fantasy', 12),
('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 15.99, 'A fantasy novel', 'images/harry.jpg', 'Fantasy', 35);
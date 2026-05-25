-- MySQL Database Schema for 3D Developer Portfolio
-- Developer: Mukhe Murali Avinash

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 1. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack VARCHAR(255) NOT NULL,
    github_link VARCHAR(255),
    live_demo VARCHAR(255),
    architecture_diagram TEXT,
    screenshots TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    proficiency_percentage INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Initial Projects Data
INSERT INTO projects (title, description, tech_stack, github_link, live_demo, architecture_diagram, screenshots) VALUES
('Blood Bank Management System', 'A full-stack blood donation platform connecting donors, hospitals, and blood banks. Streamlines request approval, donor eligibility tracking, and real-time inventory management.', 'Java, Spring Boot, React.js, MySQL, REST APIs', 'https://github.com/MuraliAvinash13', '', 'Client (React) -> Load Balancer -> Service Instance (Spring Boot Gateway) -> Microservices (Donor Service, Inventory Service) -> MySQL DB', 'Dashboard, Donor Form, Inventory Table'),
('Pharmacy Ordering Management System', 'A comprehensive supply chain and order management solution for pharmacies and distributors. Features role-based access control, batch tracking, automated order invoicing, and inventory notifications.', 'React.js, Node.js, Express.js, MongoDB, REST APIs', 'https://github.com/MuraliAvinash13', '', 'Client (React) -> Gateway/Reverse Proxy -> Pharmacy Service -> Auth Service -> Inventory Service -> MongoDB', 'Login Screen, Inventory Catalog, Invoicing Dashboard'),
('Grayscale Image Colorization AI', 'A deep learning application that takes grayscale images and applies natural, realistic colorizations using a Convolutional Neural Network (CNN) and Generative Adversarial Networks (GANs).', 'Python, TensorFlow/Keras, Flask, OpenCV, React.js', 'https://github.com/MuraliAvinash13', '', 'User Interface (React) -> API Endpoint (Flask) -> Deep Learning Inference Pipeline (PyTorch/TensorFlow) -> CDN Cache -> Returned Colorized Image', 'Inference Dashboard, Before-After Slider, Custom Settings'),
('Futuristic 3D Developer Portfolio', 'A high-fidelity space command theme portfolio website showcasing professional experience, interactive skill planets, floating 3D crystals, and an AI chat assistant.', 'React.js, Vite, Three.js, React Three Fiber, Framer Motion, GSAP, Tailwind CSS, Spring Boot, MySQL', 'https://github.com/MuraliAvinash13', '', 'Browser Frontend (React Three Fiber, GSAP) -> REST API Gateway (Spring Boot) -> Database Layer (MySQL) + AVA Chat Agent Engine', '3D Universe Canvas, Skills Galaxy, Experience Stations, AVA Chat Interface');

-- Seed Initial Skills Data
INSERT INTO skills (name, category, proficiency_percentage) VALUES
('Java', 'Backend', 90),
('Spring Boot', 'Backend', 85),
('Node.js', 'Backend', 75),
('React.js', 'Frontend', 85),
('Vite', 'Frontend', 80),
('Tailwind CSS', 'Frontend', 90),
('Three.js', 'Frontend', 70),
('MySQL', 'Database', 85),
('MongoDB', 'Database', 80),
('AI & Deep Learning', 'AI', 70),
('Machine Learning', 'AI', 75);

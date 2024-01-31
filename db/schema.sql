DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department INT,
    salary INT,
    FOREIGN KEY (department)REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_titles VARCHAR(30) NOT NULL,
    department INT,
    salaries INT,
    manager INT,
    FOREIGN KEY (department) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (salaries) REFERENCES roles(id) ON DELETE SET NULL
);
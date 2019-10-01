CREATE DATABASE  usuarios_db;

USE usuarios_db;

CREATE TABLE usuarios(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(180),
    apellidos VARCHAR(180),
    cedula VARCHAR(50),
    correo varchar(180),
    telefono varchar(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE usuarios;
-- Insertar más usuarios
INSERT INTO usuarios (nombre, email, password) VALUES
('Carlos García', 'carlos@example.com', 'password789'),
('Ana Torres', 'ana@example.com', 'password012'),
('Luis Fernández', 'luis@example.com', 'password345'),
('Laura Gómez', 'laura@example.com', 'password678'),
('Pedro Sánchez', 'pedro@example.com', 'password901'),
('Sofía Díaz', 'sofia@example.com', 'password234'),
('Diego Herrera', 'diego@example.com', 'password567'),
('Elena Ruiz', 'elena@example.com', 'password890');

-- Insertar más productos
INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Producto C', 'Descripción del Producto C', 15.00, 80),
('Producto D', 'Descripción del Producto D', 25.00, 60),
('Producto E', 'Descripción del Producto E', 30.00, 40),
('Producto F', 'Descripción del Producto F', 5.00, 200),
('Producto G', 'Descripción del Producto G', 50.00, 30),
('Producto H', 'Descripción del Producto H', 12.50, 90),
('Producto I', 'Descripción del Producto I', 22.00, 70),
('Producto J', 'Descripción del Producto J', 8.00, 150);

-- Insertar más pedidos
INSERT INTO pedidos (usuario_id, total) VALUES
(2, 50.00),
(3, 75.00),
(4, 40.00),
(5, 100.00),
(6, 60.00),
(7, 85.00),
(8, 55.00),
(1, 95.00);

-- Insertar detalles de pedidos
INSERT INTO pedido_detalles (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(2, 3, 1, 15.00),
(2, 4, 2, 25.00),
(3, 5, 1, 30.00),
(3, 6, 2, 5.00),
(4, 7, 2, 50.00),
(4, 8, 1, 12.50),
(5, 9, 3, 22.00),
(5, 10, 5, 8.00),
(6, 1, 2, 10.00),
(6, 3, 1, 15.00),
(7, 2, 1, 20.00),
(7, 5, 2, 30.00),
(8, 4, 3, 25.00),
(8, 6, 4, 5.00);

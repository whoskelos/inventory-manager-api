CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE dispositivos (
    dispositivo_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    modelo VARCHAR(255),
    fabricante VARCHAR(255),
    serial_number VARCHAR(255),
    sistema_operativo VARCHAR(255),
    cpu VARCHAR(255),
    ram VARCHAR(255),
    almacenamiento VARCHAR(255),
    estado VARCHAR(255),
    imagen VARCHAR(255),
    CONSTRAINT tipo_not_empty CHECK (tipo <> '')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_ticket VARCHAR(255) NOT NULL,
    urgencia VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    adjunto VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE licencias (
    licencia_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_programa VARCHAR(255) NOT NULL,
    nombre_empresa_programa VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha_compra DATE NOT NULL,
    fecha_renovacion DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;




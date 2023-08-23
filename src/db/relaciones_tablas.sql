# Tabla asignacion dispositivos

CREATE TABLE asignacion_dispositivos (
	asignacion_dispositivo_id INT AUTO_INCREMENT PRIMARY KEY,
    dispositivo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_asignacion DATE NOT NULL
) ENGINE=InnoDB;

ALTER TABLE asignacion_dispositivos
ADD CONSTRAINT fk_ad_dispositivos
FOREIGN KEY (dispositivo_id) REFERENCES dispositivos (dispositivo_id);

ALTER TABLE asignacion_dispositivos
ADD CONSTRAINT fk_ad_usuarios
FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id);

# Tabla asignacion licencias

CREATE TABLE asignacion_licencias (
	asignacion_licencia_id INT AUTO_INCREMENT PRIMARY KEY,
    licencia_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_asignacion DATE NOT NULL
) ENGINE=InnoDB;

ALTER TABLE asignacion_licencias
ADD CONSTRAINT fk_al_licencias
FOREIGN KEY (licencia_id) REFERENCES licencias (licencia_id);

ALTER TABLE asignacion_licencias
ADD CONSTRAINT fk_al_usuarios
FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id);

# Tabla asignacion licencias
CREATE TABLE asignacion_tickets (
    asignacion_ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_asignacion DATE NOT NULL
) ENGINE=InnoDB;

ALTER TABLE asignacion_tickets
ADD CONSTRAINT fk_at_tickets
FOREIGN KEY (ticket_id) REFERENCES tickets (ticket_id);

ALTER TABLE asignacion_tickets
ADD CONSTRAINT fk_at_usuarios
FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id);


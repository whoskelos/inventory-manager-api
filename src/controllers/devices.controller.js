import { pool } from "../db.js";

export const obtenerDispositivos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM dispositivos");
        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal",
        });
    }
};

export const crearDispositivo = async (req, res) => {
    const {
        tipo,
        modelo,
        fabricante,
        serial_number,
        sistema_operativo,
        cpu,
        ram,
        almacenamiento,
        estado,
        imagen,
    } = req.body;
    try {
        // TODO: COMPROBAR SI ESE DISPOSITIVO YA EXISTE
        const [rows] = await pool.query(
            "INSERT INTO dispositivos (tipo, modelo, fabricante, serial_number, sistema_operativo, cpu, ram, almacenamiento, estado, imagen) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [
                tipo,
                modelo,
                fabricante,
                serial_number,
                sistema_operativo,
                cpu,
                ram,
                almacenamiento,
                estado,
                imagen,
            ]
        );
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

export const asignarDispositivo = async (req, res) => {
    const { dispositivo_id, usuario_id } = req.body;
    const fechaAsignacion = new Date().toISOString().slice(0, 10);
    try {
        // TODO: COMPROBAR SI ESE DISPOSITIVO NO HA SIDO YA ASIGNADO
        const [rows] = await pool.query(
            "INSERT INTO asignacion_dispositivos (dispositivo_id, usuario_id, fecha_asignacion) VALUES (?,?,?)",
            [dispositivo_id, usuario_id, fechaAsignacion]
        );

        res.status(200).json({
            message: "Dispositivo asignado correctamente",
            rows,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al asignar dispositivo",
        });
    }
};

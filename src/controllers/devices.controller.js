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
        usuario_id
    } = req.body;
    try {
        // TODO: COMPROBAR SI ESE DISPOSITIVO YA EXISTE
        const [rows] = await pool.query(
            "INSERT INTO dispositivos (tipo, modelo, fabricante, serial_number, sistema_operativo, cpu, ram, almacenamiento, estado, imagen, usuario_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
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
                usuario_id
            ]
        );
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

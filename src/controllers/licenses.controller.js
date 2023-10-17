import { pool } from "../db.js";

export const obtenerLicencias = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM licencias");
        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message: "algo fue mal",
        });
    }
};

export const crearLicencia = async (req, res) => {
    const { nombre_programa, nombre_empresa_programa, estado } = req.body;
    // es la fecha en el momento que se inserta la licencia en la bbdd
    const fecha_compra = new Date().toISOString().slice(0, 10);
    const fecha_actual = new Date();
    fecha_actual.setFullYear(fecha_actual.getFullYear() + 1);
    // es la misma fecha de compra pero aumentada + 1 year
    const fecha_renovacion = fecha_actual.toISOString().slice(0, 10);
    try {
        const [rows] = await pool.query(
            "INSERT INTO licencias (nombre_programa, nombre_empresa_programa, estado, fecha_compra, fecha_renovacion) VALUES (?,?,?,?,?)",
            [
                nombre_programa,
                nombre_empresa_programa,
                estado,
                fecha_compra,
                fecha_renovacion,
            ]
        );
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};

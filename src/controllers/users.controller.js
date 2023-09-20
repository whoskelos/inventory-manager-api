import { pool } from "../db.js";
import bcrypt from "bcrypt";



export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

export const obtenerUnUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE usuario_id = ?",
            [id]
        );
        if (rows.length <= 0)
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

export const crearUsuario = async (req, res) => {
    const { body, file } = req;
    try {
        // Verificar si el usuario ya existe
        const [existingUserRows] = await pool.query(
            "SELECT email from usuarios WHERE email = ?",
            [body.email]
        );

        if (existingUserRows.length > 0)
            return res.status(400).json({
                message: `Ya existe un usuario con el email: ${body.email}.`,
            });

        // Hashear passwd
        const hashedPasswd = await bcrypt.hash(body.passwd, 10);
        if (file) {
            let url = `http://localhost:3000/images/${file.filename}`;
            const [rows] = await pool.query(
                "INSERT INTO usuarios (nombre, apellidos, email, passwd, rol, fecha_nacimiento, foto_usuario) VALUES (?,?,?,?,?,?,?)",
                [
                    body.nombre,
                    body.apellidos,
                    body.email,
                    hashedPasswd,
                    body.rol,
                    body.fecha_nacimiento,
                    url,
                ]
            );
            res.send({
                id: rows.insertId,
                nombre: body.nombre,
                apellidos: body.apellidos,
                email: body.email,
                foto_usuario: url,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

export const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, email, rol, fecha_nacimiento, foto_usuario } =
        req.body;
    try {
        const [result] = await pool.query(
            "UPDATE usuarios SET nombre = IFNULL(?,nombre), apellidos = IFNULL(?,apellidos), email = IFNULL(?,email), rol = IFNULL(?,rol), fecha_nacimiento = IFNULL(?,fecha_nacimiento), foto_usuario = IFNULL(?,foto_usuario) WHERE usuario_id = ?",
            [nombre, apellidos, email, rol, fecha_nacimiento, foto_usuario, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "Usuario no encontrado",
            });

        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE usuario_id = ?",
            [id]
        );
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            "DELETE FROM usuarios WHERE usuario_id = ?",
            [id]
        );

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: "Usuario no encontrado",
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal :(",
        });
    }
};

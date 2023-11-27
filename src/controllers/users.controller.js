import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from "fs";

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
    const { nombre, apellidos, email, passwd, rol, fecha_nacimiento, puesto } =
        req.body;
    const { file } = req;
    console.log(file);

    try {
        // Verificamos si el usuario ya existe
        const [existingUserRows] = await pool.query(
            "SELECT email from usuarios WHERE email = ?",
            [email]
        );

        if (existingUserRows.length > 0) {
            return res.status(400).json({
                message: `Ya existe un usuario con el email: ${email}.`,
            });
        } else {
            // Hasheamos password
            const hashedPasswd = await bcrypt.hash(passwd, 10);
            if (file) {
                if (file.size > 1572864) {
                    return res.status(400).json({
                        message: "La imagen debe ser inferior a 1.5MB",
                    });
                }
                if (
                    file.mimetype !== "image/png" ||
                    file.mimetype !== "image/jpeg"
                ) {
                    return res.status(400).json({
                        message: "La imagen debe tener formato PNG o JPG",
                    });
                }
                //const nombreFoto = file.originalname;
                const foto = fs.readFileSync(
                    join(__dirname, `../static/images/${file.filename}`)
                );
                const [rows] = await pool.query(
                    "INSERT INTO usuarios (nombre, apellidos, email, passwd, rol, fecha_nacimiento, foto_usuario, puesto) VALUES (?,?,?,?,?,?,?,?)",
                    [
                        nombre,
                        apellidos,
                        email,
                        hashedPasswd,
                        rol,
                        fecha_nacimiento,
                        foto,
                        puesto,
                    ]
                );
                res.status(201).send({
                    id: rows.insertId,
                    nombre: nombre,
                    apellidos: apellidos,
                    email: email,
                });
            } else {
                let defaultFoto = fs.readFileSync(
                    join(__dirname, `../static/images/default.png`)
                );
                const [rows] = await pool.query(
                    "INSERT INTO usuarios (nombre, apellidos, email, passwd, rol, fecha_nacimiento, foto_usuario, puesto) VALUES (?,?,?,?,?,?,?,?)",
                    [
                        nombre,
                        apellidos,
                        email,
                        hashedPasswd,
                        rol,
                        fecha_nacimiento,
                        defaultFoto,
                        puesto,
                    ]
                );
                res.status(201).send({
                    id: rows.insertId,
                    nombre: nombre,
                    apellidos: apellidos,
                    email: email,
                });
            }
        }
    } catch (error) {
        console.log(error.message);
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

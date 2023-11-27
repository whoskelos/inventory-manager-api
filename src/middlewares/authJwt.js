import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { pool } from "../db.js";
config();

/**
 * 
 * @param {*} req "x-access-token" lleva el token que permitira realizar la peticion
 * @param {status} res devuelve code 400 o 500 dependiendo del resultado de la peticion
 * @param {*} next Continua a la siguiente funcion 
 * @returns http status 
 */
export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    try {
        if (!token)
            return res.status(403).json({
                message: "No hay un token valido",
            });

        const decoded = jwt.verify(token, process.env.SECRET);
        req.userEmail = decoded.user;
        const [userFound] = await pool.query(
            "SELECT email, rol FROM usuarios WHERE email = ?",
            [decoded.user]
        );

        if (userFound <= 0)
            return res.status(404).json({
                message: "Usuario no encontrado",
            });

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Acceso no autorizado",
        });
    }
};

export const isModerator = async (req, res, next) => {
    const [userFound] = await pool.query(
        "SELECT email, rol FROM usuarios WHERE email = ?",
        [req.userEmail]
    );
    if (userFound[0].rol === "moderador") {
        next();
        return;
    }

    return res.status(403).json({
        message: 'Requiere un rol de moderador'
    })
};

export const isAdmin = async (req, res, next) => {
    const [userFound] = await pool.query(
        "SELECT email, rol FROM usuarios WHERE email = ?",
        [req.userEmail]
    );
    if (userFound[0].rol === "admin") {
        next();
        return;
    }

    return res.status(403).json({
        message: 'Requiere un rol de admin'
    })
};

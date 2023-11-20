import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const iniciarSesion = async (req, res) => {
    const { email, passwd } = req.body;
    const messages = [];
    const [userFound] = await pool.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );
    if (userFound.length <= 0) {
        messages.push(`El usuario ${email} no existe`);
        return res.status(400).json({
            message: messages,
        });
    }
    const match = await bcrypt.compare(passwd, userFound[0].passwd);
    if (!match) {
        messages.push("Password incorrecta");
        return res.status(400).json({
            message: messages,
        });
    }

    const token = jwt.sign(
        {
            user: userFound[0].email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        user: userFound[0].nombre,
        rol: userFound[0].rol,
        token,
    });
};

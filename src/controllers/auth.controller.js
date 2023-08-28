import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const iniciarSesion = async (req, res) => {
    const { email, passwd } = req.body;
    const [userFound] = await pool.query(
        "SELECT email, passwd FROM usuarios WHERE email = ?",
        [email]
    );
    if (userFound.length <= 0)
        return res.status(400).json({
            message: `El usuario ${email} no existe`,
        });

    const match = await bcrypt.compare(passwd, userFound[0].passwd);
    if (!match)
        return res.status(400).json({
            token: null,
            message: "Password incorrecta",
        });

    const token = jwt.sign(
        {
            user: userFound[0].email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        token,
    });
};



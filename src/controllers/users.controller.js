import { pool } from '../db.js'

export const obtenerUsuarios = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuarios')
    res.send(rows)
}

export const obtenerUnUsuario = async (req,res) => {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })
    
    res.json(rows[0])
}

export const crearUsuario = async (req, res) => {
    const { nombre, apellidos, email, passwd, rol, fecha_nacimiento } = req.body
    const [rows] = await pool.query('INSERT INTO usuarios (nombre, apellidos, email, passwd, rol, fecha_nacimiento) VALUES (?,?,?,?,?,?)', [nombre, apellidos, email, passwd, rol, fecha_nacimiento])
    res.send({
        id: rows.insertId,
        nombre,
        apellidos,
        email
    })
}

export const editarUsuario = (req, res) => res.send('editando usuario')

export const eliminarUsuario = (req, res) => res.send('eliminando usuario')
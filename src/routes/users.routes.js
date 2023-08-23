import { Router } from 'express'
import { crearUsuario, obtenerUsuarios, editarUsuario, eliminarUsuario, obtenerUnUsuario } from '../controllers/users.controller.js'
const router = Router()

router.get('/usuarios', obtenerUsuarios)

router.get('/usuarios/:id', obtenerUnUsuario)

router.post('/usuarios', crearUsuario)

router.put('/usuarios/:id', editarUsuario)

router.delete('/usuarios/:id', eliminarUsuario)

export default router
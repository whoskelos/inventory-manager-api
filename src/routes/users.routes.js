import { Router } from 'express'
import { crearUsuario, obtenerUsuarios, editarUsuario, eliminarUsuario, obtenerUnUsuario } from '../controllers/users.controller.js'
import { isAdmin, isModerator, verifyToken } from '../middlewares/authJwt.js'

const router = Router()

router.get('/usuarios', verifyToken, obtenerUsuarios)

router.get('/usuarios/:id', verifyToken, obtenerUnUsuario)

router.post('/usuarios', [verifyToken, isAdmin], crearUsuario)

router.patch('/usuarios/:id',[verifyToken, isModerator], editarUsuario)

router.delete('/usuarios/:id', [verifyToken, isAdmin], eliminarUsuario)

export default router
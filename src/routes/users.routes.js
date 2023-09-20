import { Router } from 'express'
import { crearUsuario, obtenerUsuarios, editarUsuario, eliminarUsuario, obtenerUnUsuario } from '../controllers/users.controller.js'
import { isAdmin, isModerator, verifyToken } from '../middlewares/authJwt.js'
import multer from 'multer'
import storage from '../config/multer.js'

const uploader = multer({storage})

const router = Router()

router.get('/usuarios', verifyToken, obtenerUsuarios)

router.get('/usuarios/:id', verifyToken, obtenerUnUsuario)

router.post('/usuarios', [verifyToken, isAdmin, uploader.single('file')], crearUsuario)

router.patch('/usuarios/:id',[verifyToken, isModerator], editarUsuario)

router.delete('/usuarios/:id', [verifyToken, isAdmin], eliminarUsuario)

export default router
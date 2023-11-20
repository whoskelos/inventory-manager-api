import { Router } from "express";
import {
    crearUsuario,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario,
    obtenerUnUsuario,
} from "../controllers/users.controller.js";
import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt.js";
import multer from "multer";
import storage from "../config/multer.js";

const uploader = multer({ storage });

const router = Router();

router.get("/usuarios", obtenerUsuarios);

router.get("/usuarios/:id", verifyToken ,obtenerUnUsuario);
/**
 *  TODO: sacar el middleware de la imagen a otro archivo
 * TODO: verificar si hay token antes de crear usuario */ 
router.post("/usuarios", [uploader.single("file")], crearUsuario);

router.patch("/usuarios/:id", [verifyToken, isModerator], editarUsuario);

router.delete("/usuarios/:id", [verifyToken, isAdmin], eliminarUsuario);

export default router;

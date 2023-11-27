import { Router } from "express";
import {
    crearUsuario,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario,
    obtenerUnUsuario,
} from "../controllers/users.controller.js";
import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt.js";

import fileUpload from "../config/multer.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);

router.get("/usuarios/:id", verifyToken, obtenerUnUsuario);

router.post("/usuarios", [fileUpload], crearUsuario);

router.patch("/usuarios/:id", [verifyToken, isModerator], editarUsuario);

router.delete("/usuarios/:id", [verifyToken, isAdmin], eliminarUsuario);

export default router;

import { Router } from "express";

import { crearDispositivo, obtenerDispositivos, asignarDispositivo } from "../controllers/devices.controller.js";

const router = Router();

router.get("/dispositivos", obtenerDispositivos)
router.post("/dispositivos", crearDispositivo);
router.post("/dispositivos/asignar", asignarDispositivo);

export default router;

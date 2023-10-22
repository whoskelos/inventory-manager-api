import { Router } from "express";

import { crearDispositivo, obtenerDispositivos } from "../controllers/devices.controller.js";

const router = Router();

router.get("/dispositivos", obtenerDispositivos)
router.post("/dispositivos", crearDispositivo);

export default router;

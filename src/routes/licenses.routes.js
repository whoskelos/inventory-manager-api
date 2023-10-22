import { Router } from "express";

import { obtenerLicencias, crearLicencia, asignarLicencia } from "../controllers/licenses.controller.js";

const router = Router()

router.get("/licencias", obtenerLicencias)
router.post("/licencias", crearLicencia)
router.post("/licencias/asignar", asignarLicencia)

export default router

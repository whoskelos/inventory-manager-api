import { Router } from "express";

import { obtenerLicencias, crearLicencia } from "../controllers/licenses.controller.js";

const router = Router()

router.get("/licencias", obtenerLicencias)
router.post("/licencias", crearLicencia)

export default router

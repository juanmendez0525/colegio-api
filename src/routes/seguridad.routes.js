// src/routes/seguridad.routes.js

const { Router } = require('express');
const router = Router();
// 💡 NOTA: La ruta a controllers es correcta
const seguridadController = require('../controllers/seguridad.controller'); 

// ENDPOINT: GET /api/seguridad/contrasena
router.get('/contrasena', seguridadController.getContrasenaAdmin);

module.exports = router;
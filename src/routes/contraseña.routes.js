const { Router } = require('express');
const router = Router();
const acudienteCtrl = require('../controllers/contraseña.controller');

router.get('/', contraseñaCtrl.getContraseña);


module.exports = router;
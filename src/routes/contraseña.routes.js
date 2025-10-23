const { Router } = require('express');
const router = Router();
const contraseñaCtrl = require('../controllers/contraseña.controller');

router.get('/', contraseñaCtrl.getContraseña);


module.exports = router;
const { Router } = require('express');
const router = Router();
const contrasenaCtrl = require('../controllers/contrasena.controller');

router.get('/', contrasenaCtrl.getContrasena);


module.exports = router;
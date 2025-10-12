// src/routes/acudientes.routes.js
const { Router } = require('express');
const router = Router();
const acudienteCtrl = require('../controllers/acudientes.controller');

router.get('/', acudienteCtrl.getAcudientes);
router.get('/:id', acudienteCtrl.getAcudienteById);
router.post('/', acudienteCtrl.createAcudiente);
router.put('/:id', acudienteCtrl.updateAcudiente);
router.delete('/:id', acudienteCtrl.deleteAcudiente);

module.exports = router;
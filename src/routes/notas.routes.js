// src/routes/notas.routes.js
const { Router } = require('express');
const router = Router();
const notaCtrl = require('../controllers/notas.controller');

router.get('/', notaCtrl.getNotas);
router.get('/:id', notaCtrl.getNotaById);
router.post('/', notaCtrl.createNota);
router.put('/:id', notaCtrl.updateNota);
router.delete('/:id', notaCtrl.deleteNota);

module.exports = router;
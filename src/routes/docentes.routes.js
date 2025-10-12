// src/routes/docentes.routes.js
const { Router } = require('express');
const router = Router();
const docenteCtrl = require('../controllers/docentes.controller');

router.get('/', docenteCtrl.getDocentes);
router.get('/:id', docenteCtrl.getDocenteById);
router.post('/', docenteCtrl.createDocente);
router.put('/:id', docenteCtrl.updateDocente);
router.delete('/:id', docenteCtrl.deleteDocente);

module.exports = router; 

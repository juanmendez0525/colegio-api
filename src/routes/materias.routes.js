 
// src/routes/materias.routes.js
const { Router } = require('express');
const router = Router();
const materiaCtrl = require('../controllers/materias.controller');

router.get('/', materiaCtrl.getMaterias);
router.get('/:id', materiaCtrl.getMateriaById);
router.post('/', materiaCtrl.createMateria);
router.put('/:id', materiaCtrl.updateMateria);
router.delete('/:id', materiaCtrl.deleteMateria);

module.exports = router;
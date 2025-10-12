// src/routes/estudiantes.routes.js
const { Router } = require('express');
const router = Router();
const estudianteCtrl = require('../controllers/estudiantes.controller');

router.get('/', estudianteCtrl.getEstudiantes);
router.get('/:id', estudianteCtrl.getEstudianteById);
router.post('/', estudianteCtrl.createEstudiante);
router.put('/:id', estudianteCtrl.updateEstudiante);
router.delete('/:id', estudianteCtrl.deleteEstudiante);

module.exports = router; 

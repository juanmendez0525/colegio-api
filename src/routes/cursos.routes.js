 
// src/routes/cursos.routes.js
const { Router } = require('express');
const router = Router();
const cursoCtrl = require('../controllers/cursos.controller');

router.get('/', cursoCtrl.getCursos);
router.get('/:id', cursoCtrl.getCursoById);
router.post('/', cursoCtrl.createCurso);
router.put('/:id', cursoCtrl.updateCurso);
router.delete('/:id', cursoCtrl.deleteCurso);

module.exports = router;
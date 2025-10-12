// src/routes/grados.routes.js
const { Router } = require('express');
const router = Router();
const gradoCtrl = require('../controllers/grados.controller');

router.get('/', gradoCtrl.getGrados);
router.get('/:id', gradoCtrl.getGradoById);
router.post('/', gradoCtrl.createGrado);
router.put('/:id', gradoCtrl.updateGrado);
router.delete('/:id', gradoCtrl.deleteGrado);

module.exports = router; 

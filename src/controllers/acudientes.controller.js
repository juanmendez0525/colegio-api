// src/controllers/acudientes.controller.js
const db = require('../../db/db');

// Obtener todos los acudientes
const getAcudientes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM acudientes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener acudientes:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener acudientes.' });
    }
};

// Obtener un acudiente por ID
const getAcudienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM acudientes WHERE id_acudiente = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Acudiente no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener acudiente por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo acudiente con ID basado en el máximo existente + 1
const createAcudiente = async (req, res) => {
    const { nombre, apellido, telefono, correo, parentesco } = req.body;

    try {
        // Validar campos obligatorios
        if (!nombre || !apellido || !telefono || !correo || !parentesco) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Calcular el siguiente ID
        const idResult = await db.query('SELECT COALESCE(MAX(id_acudiente), 0) + 1 AS next_id FROM acudientes');
        const nextId = idResult.rows[0].next_id;

        // Insertar el nuevo acudiente con el ID calculado
        const result = await db.query(
            `INSERT INTO acudientes (id_acudiente, nombre, apellido, telefono, correo, parentesco)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [nextId, nombre, apellido, telefono, correo, parentesco]
        );

        res.status(201).json({
            message: `Acudiente creado exitosamente con ID ${nextId}.`,
            acudiente: result.rows[0],
        });
    } catch (error) {
        console.error('Error al crear acudiente:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el acudiente.' });
    }
};


// Actualizar un acudiente
const updateAcudiente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo, parentesco } = req.body;

    try {
        const result = await db.query(
            `UPDATE acudientes 
             SET nombre = $1, apellido = $2, telefono = $3, correo = $4, parentesco = $5
             WHERE id_acudiente = $6
             RETURNING *`,
            [nombre, apellido, telefono, correo, parentesco, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Acudiente no encontrado para actualizar.' });
        }

        res.json({
            message: 'Acudiente actualizado exitosamente.',
            acudiente: result.rows[0],
        });
    } catch (error) {
        console.error('Error al actualizar acudiente:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
    }
};

// Eliminar un acudiente
const deleteAcudiente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM acudientes WHERE id_acudiente = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Acudiente no encontrado para eliminar.' });
        }

        res.json({
            message: 'Acudiente eliminado exitosamente.',
            acudiente: result.rows[0],
        });
    } catch (error) {
        console.error('Error al eliminar acudiente:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar acudiente.' });
    }
};

module.exports = {
    getAcudientes,
    getAcudienteById,
    createAcudiente,
    updateAcudiente,
    deleteAcudiente,
};

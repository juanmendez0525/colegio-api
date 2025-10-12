// src/controllers/docentes.controller.js
const db = require('../../db/db');

// Obtener todos los docentes
const getDocentes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM docentes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener docentes:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener docentes.' });
    }
};

// Obtener un docente por ID
const getDocenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM docentes WHERE id_docente = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Docente no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener docente por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo docente
// Crear un nuevo docente con ID basado en el máximo existente + 1
const createDocente = async (req, res) => {
    const { nombre, apellido, documento, correo, telefono, materia } = req.body;

    try {
        // Validar que todos los campos obligatorios estén presentes
        if (!nombre || !apellido || !documento || !correo || !telefono || !materia) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Obtener el máximo ID actual y calcular el siguiente
        const idResult = await db.query('SELECT COALESCE(MAX(id_docente), 0) + 1 AS next_id FROM docentes');
        const nextId = idResult.rows[0].next_id;

        // Insertar el docente con el nuevo ID
        const result = await db.query(
            `INSERT INTO docentes (id_docente, nombre, apellido, documento, correo, telefono, materia)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [nextId, nombre, apellido, documento, correo, telefono, materia]
        );

        res.status(201).json({
            message: `Docente creado exitosamente con ID ${nextId}.`,
            docente: result.rows[0],
        });
    } catch (error) {
        console.error('Error al crear docente:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear docente.' });
    }
};


// Actualizar un docente
const updateDocente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, documento, correo, telefono, materia } = req.body;
    try {
        const result = await db.query(
            `UPDATE docentes SET 
             nombre = $1, apellido = $2, documento = $3, correo = $4, 
             telefono = $5, materia = $6
             WHERE id_docente = $7 RETURNING *`,
            [nombre, apellido, documento, correo, telefono, materia, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Docente no encontrado para actualizar.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar docente:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
    }
};

// Eliminar un docente
const deleteDocente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM docentes WHERE id_docente = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Docente no encontrado para eliminar.' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error al eliminar docente:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar docente.' });
    }
};

module.exports = {
    getDocentes,
    getDocenteById,
    createDocente,
    updateDocente,
    deleteDocente,
}; 

 
// src/controllers/estudiantes.controller.js
const db = require('../../db/db');

// Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM estudiantes ');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener estudiantes.' });
    }
};

// Obtener un estudiante por ID
const getEstudianteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM estudiantes WHERE id_estudiante = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener estudiante por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo estudiante
// Crear un nuevo estudiante con ID basado en el máximo existente + 1
const createEstudiante = async (req, res) => {
    const { nombre, apellido, documento, genero, id_acudiente, id_grado, id_cursos } = req.body;

    try {
        // Validar campos obligatorios
        if (!nombre || !apellido || !documento || !genero || !id_acudiente || !id_grado || !id_cursos) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Calcular el siguiente ID
        const idResult = await db.query('SELECT COALESCE(MAX(id_estudiante), 0) + 1 AS next_id FROM estudiantes');
        const nextId = idResult.rows[0].next_id;

        // Insertar el nuevo estudiante con el ID calculado
        const result = await db.query(
            `INSERT INTO estudiantes (id_estudiante, nombre, apellido, documento, genero, id_acudiente, id_grado, id_cursos)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [nextId, nombre, apellido, documento, genero, id_acudiente, id_grado, id_cursos]
        );

        res.status(201).json({
            message: `Estudiante creado exitosamente con ID ${nextId}.`,
            estudiante: result.rows[0],
        });
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear estudiante.' });
    }
};


// Actualizar un estudiante
const updateEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, documento, genero, id_acudiente, id_grado, id_cursos } = req.body;
    try {
        const result = await db.query(
            `UPDATE estudiantes SET 
             nombre = $1, apellido = $2, documento = $3, genero = $4, 
             id_acudiente = $5, id_grado = $6, id_cursos = $7
             WHERE id_estudiante = $8 RETURNING *`,
            [nombre, apellido, documento, genero, id_acudiente, id_grado, id_cursos, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado para actualizar.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
    }
};

// Eliminar un estudiante
const deleteEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM estudiantes WHERE id_estudiante = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado para eliminar.' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar estudiante.' });
    }
};

module.exports = {
    getEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
};
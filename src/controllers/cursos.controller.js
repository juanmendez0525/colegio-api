// src/controllers/cursos.controller.js
const db = require('../../db/db');

// Obtener todos los cursos
const getCursos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cursos ORDER BY id_cursos ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener los cursos.' });
    }
};

// Obtener un curso por ID
const getCursoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM cursos WHERE id_cursos = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo curso
// Crear un nuevo curso con ID basado en el máximo existente + 1
const createCurso = async (req, res) => {
    const { nom_cursos } = req.body;

    try {
        if (!nom_cursos) {
            return res.status(400).json({ message: 'El nombre del curso es obligatorio.' });
        }

        // Obtener el máximo ID actual y sumarle 1
        const idResult = await db.query('SELECT COALESCE(MAX(id_cursos), 0) + 1 AS next_id FROM cursos');
        const nextId = idResult.rows[0].next_id;

        // Insertar el curso con el nuevo ID calculado
        const result = await db.query(
            `INSERT INTO cursos (id_cursos, nom_cursos)
             VALUES ($1, $2)
             RETURNING *`,
            [nextId, nom_cursos]
        );

        res.status(201).json({
            message: `Curso creado exitosamente`,
            curso: result.rows[0],
        });
    } catch (error) {
        console.error('Error al crear curso:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el curso.' });
    }
};


// Actualizar un curso
const updateCurso = async (req, res) => {
    const { id } = req.params;
    const { nom_cursos } = req.body;

    try {
        if (!nom_cursos) {
            return res.status(400).json({ message: 'El nombre del curso es obligatorio para actualizar.' });
        }

        const result = await db.query(
            `UPDATE cursos
             SET nom_cursos = $1
             WHERE id_cursos = $2
             RETURNING *`,
            [nom_cursos, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Curso no encontrado para actualizar.' });
        }

        res.json({
            message: 'Curso actualizado exitosamente.',
            curso: result.rows[0],
        });
    } catch (error) {
        console.error('Error al actualizar curso:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el curso.' });
    }
};

// Eliminar un curso
const deleteCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM cursos WHERE id_cursos = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Curso no encontrado para eliminar.' });
        }

        res.json({
            message: 'Curso eliminado exitosamente.',
            curso: result.rows[0],
        });
    } catch (error) {
        console.error('Error al eliminar curso:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el curso.' });
    }
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
};


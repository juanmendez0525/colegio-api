// src/controllers/materias.controller.js
const db = require('../../db/db');

// Obtener todas las materias
const getMaterias = async (req, res) => {
    try {
        // Se utiliza JOIN para obtener el nombre del docente que imparte la materia
        const result = await db.query(
            `SELECT 
                m.id_materia, 
                m.nombre_materia, 
                m.id_docente,
                d.nombre AS nombre_docente,
                d.apellido AS apellido_docente
             FROM materias m
             LEFT JOIN docentes d ON m.id_docente = d.id_docente
             ORDER BY m.nombre_materia`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener materias:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener materias.' });
    }
};

// Obtener una materia por ID
const getMateriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            `SELECT 
                m.id_materia, 
                m.nombre_materia, 
                m.id_docente,
                d.nombre AS nombre_docente,
                d.apellido AS apellido_docente
             FROM materias m
             LEFT JOIN docentes d ON m.id_docente = d.id_docente
             WHERE m.id_materia = $1`, 
             [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener materia por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear una nueva materia
// Crear una nueva materia con ID calculado (MAX + 1)
const createMateria = async (req, res) => {
    const { nombre_materia, id_docente } = req.body;

    try {
        // Validar campos requeridos
        if (!nombre_materia || !id_docente) {
            return res.status(400).json({ message: 'El nombre de la materia y el ID del docente son obligatorios.' });
        }

        // Obtener el próximo ID disponible
        const idResult = await db.query('SELECT COALESCE(MAX(id_materia), 0) + 1 AS next_id FROM materias');
        const nextId = idResult.rows[0].next_id;

        // Insertar la nueva materia con el ID calculado
        const result = await db.query(
            `INSERT INTO materias (id_materia, nombre_materia, id_docente)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nextId, nombre_materia, id_docente]
        );

        res.status(201).json({
            message: `Materia creada exitosamente con ID ${nextId}.`,
            materia: result.rows[0],
        });

    } catch (error) {
        console.error('Error al crear materia:', error);

        // Manejo especial de errores comunes
        if (error.code === '23503') {
            return res.status(400).json({ message: 'El docente especificado no existe.' });
        }

        res.status(500).json({ message: 'Error interno del servidor al crear materia.' });
    }
};


// Actualizar una materia
const updateMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre_materia, id_docente } = req.body;
    try {
        const result = await db.query(
            `UPDATE materias SET 
             nombre_materia = $1, id_docente = $2
             WHERE id_materia = $3 RETURNING *`,
            [nombre_materia, id_docente, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Materia no encontrada para actualizar.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        // Un error común aquí es la violación de la clave foránea si id_docente no existe
        console.error('Error al actualizar materia:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
    }
};

// Eliminar una materia
const deleteMateria = async (req, res) => {
    const { id } = req.params;
    try {
        // Considera que si otras tablas (como 'calificaciones' o 'horarios')
        // referencian esta materia, la eliminación podría fallar.
        const result = await db.query('DELETE FROM materias WHERE id_materia = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Materia no encontrada para eliminar.' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error al eliminar materia:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar materia.' });
    }
};

module.exports = {
    getMaterias,
    getMateriaById,
    createMateria,
    updateMateria,
    deleteMateria,
}; 
